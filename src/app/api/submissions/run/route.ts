import { NextResponse } from 'next/server';
import { submitCode, LANGUAGE_IDS } from '@/lib/judge0';
import connectDB from '@/lib/db';
import Problem from '@/models/Problem';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, language, customInput, problemId } = body;

    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
    }
    
    let cpu_time_limit = 2.0;
    let memory_limit = 128000;
    
    if (problemId && process.env.MONGODB_URI) {
      try {
        await connectDB();
        const problem = await Problem.findById(problemId);
        if (problem) {
          cpu_time_limit = problem.cpuTimeLimit || 2.0;
          memory_limit = problem.memoryLimit || 128000;
        }
      } catch (e) {
        console.error('Error fetching problem limits for run:', e);
      }
    }

    // Submit to Judge0 and wait for the result
    let result = await submitCode({
      source_code: code,
      language_id: languageId,
      stdin: customInput || '',
      cpu_time_limit,
      memory_limit,
    }, true);

    // If Judge0 returns asynchronously or is still processing, poll for completion
    if (!result.status || result.status.id === 1 || result.status.id === 2) {
      if (!result.token) {
        throw new Error('Judge0 returned incomplete response without a token');
      }
      
      const { getBatchSubmissions } = await import('@/lib/judge0');
      let attempts = 0;
      const maxAttempts = 15; // 15 seconds max wait
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const batch = await getBatchSubmissions([result.token]);
        
        if (batch.submissions && batch.submissions.length > 0) {
          const sub = batch.submissions[0];
          if (sub.status && sub.status.id !== 1 && sub.status.id !== 2) {
            result = sub;
            break;
          }
        }
        attempts++;
      }
      
      if (!result.status || result.status.id === 1 || result.status.id === 2) {
        throw new Error('Execution timed out while waiting for Judge0');
      }
    }

    // Map Judge0 status to IDE expected format
    // Judge0 status mapping:
    // 3: Accepted
    // 4: Wrong Answer
    // 5: Time Limit Exceeded
    // 6: Compilation Error
    // 7, 8, 9, 10, 11, 12: Runtime Errors
    let status = 'success';
    let exitCode = 0;
    
    if (result.status.id === 6) {
      status = 'compilation_error';
      exitCode = 1;
    } else if (result.status.id === 5) {
      status = 'time_limit_exceeded';
      exitCode = 124;
    } else if (result.status.id >= 7 && result.status.id <= 12) {
      status = 'runtime_error';
      exitCode = 136;
    }

    const decodeBase64 = (str: string | null) => str ? Buffer.from(str, 'base64').toString('utf-8') : '';

    return NextResponse.json({
      stdout: decodeBase64(result.stdout),
      stderr: decodeBase64(result.stderr) || decodeBase64(result.compile_output) || decodeBase64(result.message),
      exitCode,
      timeMs: parseFloat(result.time || '0') * 1000,
      memoryKb: result.memory || 0,
      matchesExpected: false, // Run endpoint doesn't grade against expected
    });
  } catch (err: any) {
    console.error('Judge0 Run Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
