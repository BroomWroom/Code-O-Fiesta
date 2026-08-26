import { NextResponse } from 'next/server';

function analyzeCPCode(code: string, language: string, customInput?: string) {
  const normalized = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*|#.*/g, ''); // strip comments

  // --- 1. COMPILATION ERRORS (CE) ---
  
  // A. Braces Balance Check
  const openBraces = (code.match(/\{/g) || []).length;
  const closeBraces = (code.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    return {
      status: 'compilation_error',
      stdout: '',
      stderr: `error: reached end of file while parsing (unmatched braces: { is ${openBraces}, } is ${closeBraces})`,
      exitCode: 1,
      timeMs: 0,
      memoryKb: 0,
      matchesExpected: false,
    };
  }

  // B. Parentheses Balance Check
  const openParens = (code.match(/\(/g) || []).length;
  const closeParens = (code.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    return {
      status: 'compilation_error',
      stdout: '',
      stderr: `error: expected ')' - unmatched parenthesis`,
      exitCode: 1,
      timeMs: 0,
      memoryKb: 0,
      matchesExpected: false,
    };
  }

  // C. Java public class Main requirements
  if (language === 'java') {
    if (code.includes('public class') && !code.includes('public class Main')) {
      const match = code.match(/public class\s+(\w+)/);
      const className = match ? match[1] : 'Unknown';
      return {
        status: 'compilation_error',
        stdout: '',
        stderr: `error: class ${className} is public, should be declared in a file named Main.java (please rename class to 'Main')`,
        exitCode: 1,
        timeMs: 0,
        memoryKb: 0,
        matchesExpected: false,
      };
    }
  }

  // D. Semicolon Checks for C++/Java/JavaScript
  if (language === 'cpp' || language === 'java' || language === 'javascript') {
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      
      const isStatement = trimmed.includes('=') || trimmed.includes('print') || trimmed.includes('cout') || trimmed.includes('return') || trimmed.includes('log(');
      const isControl = trimmed.startsWith('if') || trimmed.startsWith('for') || trimmed.startsWith('while') || trimmed.startsWith('class') || trimmed.startsWith('public') || trimmed.startsWith('import') || trimmed.startsWith('#include') || trimmed.startsWith('using') || trimmed.endsWith('{') || trimmed.endsWith('}') || trimmed === '';
      
      if (isStatement && !isControl && !trimmed.endsWith(';')) {
        let err = `error: expected ';' at line ${i + 1}\n    ${lines[i].trim()}`;
        return {
          status: 'compilation_error',
          stdout: '',
          stderr: err,
          exitCode: 1,
          timeMs: 0,
          memoryKb: 0,
          matchesExpected: false,
        };
      }
    }
  }

  // E. Python indentation / syntax
  if (language === 'python') {
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (trimmed.startsWith('def ') && !trimmed.endsWith(':')) {
        return {
          status: 'compilation_error',
          stdout: '',
          stderr: `SyntaxError: expected ':' at end of function declaration on line ${i + 1}\n    ${lines[i].trim()}`,
          exitCode: 1,
          timeMs: 0,
          memoryKb: 0,
          matchesExpected: false,
        };
      }
    }
  }

  // --- 2. RUNTIME ERRORS (RE) ---
  
  // A. Division by zero
  if (/\/\s*0(?!\\d)/.test(normalized)) {
    return {
      status: 'runtime_error',
      stdout: '',
      stderr: language === 'java' 
        ? 'Exception in thread "main" java.lang.ArithmeticException: / by zero\n\tat Main.main(Main.java:5)'
        : 'Runtime Error: Division by zero (SIGFPE)',
      exitCode: 136,
      timeMs: 5,
      memoryKb: 1024,
      matchesExpected: false,
    };
  }

  // B. Index out of bounds trigger
  if (normalized.includes('IndexOutOfBounds') || normalized.includes('ArrayIndexOutOfBounds') || normalized.includes('out_of_range')) {
    return {
      status: 'runtime_error',
      stdout: '',
      stderr: 'IndexOutOfBoundException: Index 10 out of bounds for length 5\n\tat Main.main(Main.java:6)',
      exitCode: 1,
      timeMs: 8,
      memoryKb: 2048,
      matchesExpected: false,
    };
  }

  // --- 3. TIME LIMIT EXCEEDED (TLE) ---
  if (normalized.includes('while(true)') || normalized.includes('while (true)') || normalized.includes('for(;;)') || normalized.includes('for (;;)') || normalized.includes('infinite_loop')) {
    return {
      status: 'time_limit_exceeded',
      stdout: '',
      stderr: 'Time Limit Exceeded: Execution terminated after 1000ms',
      exitCode: 124,
      timeMs: 1000,
      memoryKb: 4096,
      matchesExpected: false,
    };
  }

  // --- 4. MEMORY LIMIT EXCEEDED (MLE) ---
  if (normalized.includes('100000000') || normalized.includes('new int[999999]') || normalized.includes('new int[10000000]')) {
    return {
      status: 'memory_limit_exceeded',
      stdout: '',
      stderr: 'Memory Limit Exceeded: Out of Memory',
      exitCode: 137,
      timeMs: 150,
      memoryKb: 512000,
      matchesExpected: false,
    };
  }

  // --- 5. WRONG ANSWER (WA) / EXPECTED OUTPUTS ---
  const hasLengthLogic = normalized.includes('length') || normalized.includes('len(') || normalized.includes('size()');

  // Extract prints
  const printMatches: string[] = [];
  const jsRegex = /console\.log\(\s*["']([^"']*)["']\s*\)/g;
  const pyRegex = /print\(\s*["']([^"']*)["']\s*\)/g;
  const javaRegex = /System\.out\.print(?:ln)?\(\s*["']([^"']*)["']\s*\)/g;
  const cppRegex = /cout\s*<<\s*["']([^"']*)["']/g;

  let match;
  while ((match = jsRegex.exec(code)) !== null) printMatches.push(match[1]);
  while ((match = pyRegex.exec(code)) !== null) printMatches.push(match[1]);
  while ((match = javaRegex.exec(code)) !== null) printMatches.push(match[1]);
  while ((match = cppRegex.exec(code)) !== null) printMatches.push(match[1]);

  if (customInput) {
    const lines = customInput.split('\n');
    const outputLines = lines.map((line: string) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (hasLengthLogic && trimmed.length > 10) {
        return `${trimmed[0]}${trimmed.length - 2}${trimmed[trimmed.length - 1]}`;
      }
      return trimmed;
    });

    const stdout = outputLines.join('\n');
    const hasLongWord = lines.some((l: string) => l.trim().length > 10);
    const matchesExpected = !(hasLongWord && !hasLengthLogic);

    return {
      status: matchesExpected ? 'success' : 'wrong_answer',
      stdout: printMatches.length > 0 ? printMatches.join('\n') : stdout,
      stderr: '',
      exitCode: 0,
      timeMs: 45,
      memoryKb: 2048,
      matchesExpected,
    };
  }

  if (printMatches.length > 0) {
    const stdout = printMatches.join('\n');
    const expectedOutput = hasLengthLogic ? 'word\nl10n\ni18n\np43s' : 'word\nlocalization\ninternationalization\npneumonoultramicroscopicsilicovolcanoconiosis';
    const matchesExpected = stdout.trim() === expectedOutput;

    return {
      status: matchesExpected ? 'success' : 'wrong_answer',
      stdout,
      stderr: '',
      exitCode: 0,
      timeMs: 42,
      memoryKb: 2048,
      matchesExpected,
    };
  }

  return {
    status: 'success',
    stdout: hasLengthLogic ? 'word\nl10n\ni18n\np43s' : 'word\nlocalization\ninternationalization\npneumonoultramicroscopicsilicovolcanoconiosis',
    stderr: '',
    exitCode: 0,
    timeMs: 40,
    memoryKb: 2048,
    matchesExpected: hasLengthLogic,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, language, customInput } = body;

    // Simulate compiler run latency
    await new Promise(resolve => setTimeout(resolve, 600));

    const result = analyzeCPCode(code, language, customInput);

    // Map status into compiler panel structure
    return NextResponse.json({
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      timeMs: result.timeMs,
      memoryKb: result.memoryKb,
      matchesExpected: result.matchesExpected,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
