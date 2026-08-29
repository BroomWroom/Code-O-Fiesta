import { submitBatch, getBatchSubmissions, LANGUAGE_IDS, Judge0Submission, Judge0Result } from '@/lib/judge0';

export type Verdict = 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'COMPILATION_ERROR' | 'RUNTIME_ERROR' | 'PENDING' | 'EXECUTED';

export type TestCaseResult = {
  caseNumber: number;
  verdict: Verdict;
  input?: string;
  expectedOutput?: string;
  actualOutput?: string;
  stderr?: string;
  compileOutput?: string;
  executionTime?: number;
  memory?: number;
  matchesExpected?: boolean;
};

export type ExecutionMode = 'custom' | 'examples' | 'submit';

export interface ExecuteParams {
  sourceCode: string;
  language: string;
  testCases: { input: string; expectedOutput?: string }[];
  cpuTimeLimit?: number;
  memoryLimit?: number;
  mode: ExecutionMode;
}

export function normalizeOutput(output: string | null | undefined): string {
  if (!output) return '';
  // Split into lines, trim trailing whitespace from each line
  const lines = output.split(/\r?\n/).map(line => line.trimEnd());
  // Remove trailing empty lines
  while (lines.length > 0 && lines[lines.length - 1] === '') {
    lines.pop();
  }
  return lines.join('\n');
}

export function compareOutputs(actual: string | null | undefined, expected: string | null | undefined): boolean {
  return normalizeOutput(actual) === normalizeOutput(expected);
}

export function calculateVerdict(results: TestCaseResult[]): Verdict {
  if (results.length === 0) return 'PENDING';

  let hasWA = false;
  let hasTLE = false;
  let hasRE = false;
  
  for (const res of results) {
    if (res.verdict === 'COMPILATION_ERROR') return 'COMPILATION_ERROR';
    if (res.verdict === 'TIME_LIMIT_EXCEEDED') hasTLE = true;
    else if (res.verdict === 'RUNTIME_ERROR') hasRE = true;
    else if (res.verdict === 'WRONG_ANSWER') hasWA = true;
  }
  
  if (hasTLE) return 'TIME_LIMIT_EXCEEDED';
  if (hasRE) return 'RUNTIME_ERROR';
  if (hasWA) return 'WRONG_ANSWER';
  
  return 'ACCEPTED';
}

function mapJudge0StatusToVerdict(statusId: number, matchesExpected: boolean, mode: ExecutionMode): Verdict {
  // 3: Accepted, 4: Wrong Answer, 5: Time Limit Exceeded, 6: Compilation Error, 7-12: Runtime Error
  if (statusId === 6) return 'COMPILATION_ERROR';
  if (statusId === 5) return 'TIME_LIMIT_EXCEEDED';
  if (statusId >= 7 && statusId <= 12) return 'RUNTIME_ERROR';
  
  if (statusId === 3) {
    if (mode === 'custom') return 'EXECUTED';
    return matchesExpected ? 'ACCEPTED' : 'WRONG_ANSWER';
  }
  
  if (statusId === 4) return 'WRONG_ANSWER'; // Judge0's own WA (if we let it check)
  
  return 'PENDING';
}

export async function executeTestCases(params: ExecuteParams): Promise<TestCaseResult[]> {
  const languageId = LANGUAGE_IDS[params.language];
  if (!languageId) throw new Error('Unsupported language');

  const submissions: Judge0Submission[] = params.testCases.map(tc => ({
    source_code: params.sourceCode,
    language_id: languageId,
    stdin: tc.input || '',
    expected_output: undefined, // We compare manually
    cpu_time_limit: params.cpuTimeLimit || 2.0,
    memory_limit: params.memoryLimit || 128000,
  }));

  const batchResult = await submitBatch(submissions);
  const tokens = batchResult.map(res => res.token);

  // Poll for results
  let attempts = 0;
  const maxAttempts = 15;
  let finalSubmissions: Judge0Result[] = [];
  
  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const batch = await getBatchSubmissions(tokens);
    const subs = batch.submissions;
    
    const allDone = subs.every(sub => sub.status && sub.status.id !== 1 && sub.status.id !== 2);
    if (allDone) {
      finalSubmissions = subs;
      break;
    }
    attempts++;
  }

  if (finalSubmissions.length === 0) {
    throw new Error('Execution timed out while waiting for Judge0');
  }

  const decodeBase64 = (str: string | null) => str ? Buffer.from(str, 'base64').toString('utf-8') : '';

  return finalSubmissions.map((res, idx) => {
    const tc = params.testCases[idx];
    const stdout = decodeBase64(res.stdout);
    const stderr = decodeBase64(res.stderr);
    const compileOutput = decodeBase64(res.compile_output);
    
    let matchesExpected = true;
    if (params.mode !== 'custom' && tc.expectedOutput !== undefined) {
      matchesExpected = compareOutputs(stdout, tc.expectedOutput);
    }

    const verdict = mapJudge0StatusToVerdict(res.status.id, matchesExpected, params.mode);

    return {
      caseNumber: idx + 1,
      verdict,
      input: tc.input,
      expectedOutput: params.mode !== 'custom' ? tc.expectedOutput : undefined,
      actualOutput: stdout,
      stderr,
      compileOutput,
      executionTime: res.time ? parseFloat(res.time) * 1000 : 0,
      memory: res.memory || 0,
      matchesExpected,
    };
  });
}
