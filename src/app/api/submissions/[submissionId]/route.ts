import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Submission from '@/models/Submission';

declare global {
  var submissionCache: Map<string, { code: string; language: string; problemId: string }> | undefined;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ submissionId: string }> }
) {
  try {
    const { submissionId } = await params;
    
    let code = '';
    let language = 'cpp';
    let problemId = '';

    // 1. Attempt to fetch from Database
    if (process.env.MONGODB_URI) {
      try {
        await connectDB();
        if (submissionId.length === 24) {
          const sub = await Submission.findById(submissionId);
          if (sub) {
            code = sub.sourceCode || '';
            language = sub.language || 'cpp';
            problemId = sub.problemId?.toString() || '';
          }
        }
      } catch (dbErr) {
        console.error('Failed to query submission details from DB:', dbErr);
      }
    }

    // 2. Fallback to memory cache
    if (!code && globalThis.submissionCache) {
      const cached = globalThis.submissionCache.get(submissionId);
      if (cached) {
        code = cached.code;
        language = cached.language;
        problemId = cached.problemId;
      }
    }

    // Default mock code if absolutely nothing was found
    if (!code) {
      code = '# write your code here\nprint("localization")';
    }

    const normalized = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*|#.*/g, ''); // strip comments

    // --- STATIC GRADINGS ---
    let status: string = 'accepted';
    let testsPassed = 5;
    let totalTests = 5;
    let timeMs = 72;
    let memoryKb = 3420;
    let compilerError = '';
    let failedTest: any = null;

    // A. Braces Balance Check
    const openBraces = (code.match(/\{/g) || []).length;
    const closeBraces = (code.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      status = 'compilation_error';
      testsPassed = 0;
      compilerError = `error: reached end of file while parsing (unmatched braces: { is ${openBraces}, } is ${closeBraces})\nUnclosed braces found in code structure.`;
    }
    // B. Parentheses Balance Check
    else if ((code.match(/\(/g) || []).length !== (code.match(/\)/g) || []).length) {
      status = 'compilation_error';
      testsPassed = 0;
      compilerError = `error: expected ')' - unmatched parenthesis\nSyntax error: check balance of '(' and ')'`;
    }
    // C. Java public class Main requirements
    else if (language === 'java' && code.includes('public class') && !code.includes('public class Main')) {
      const match = code.match(/public class\s+(\w+)/);
      const className = match ? match[1] : 'Unknown';
      status = 'compilation_error';
      testsPassed = 0;
      compilerError = `error: class ${className} is public, should be declared in a file named Main.java (please rename class to 'Main')`;
    }
    // D. Semicolon Checks for C++/Java/JavaScript
    else {
      let semicolonError = false;
      if (language === 'cpp' || language === 'java' || language === 'javascript') {
        const lines = code.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const trimmed = lines[i].trim();
          
          const isStatement = trimmed.includes('=') || trimmed.includes('print') || trimmed.includes('cout') || trimmed.includes('return') || trimmed.includes('log(');
          const isControl = trimmed.startsWith('if') || trimmed.startsWith('for') || trimmed.startsWith('while') || trimmed.startsWith('class') || trimmed.startsWith('public') || trimmed.startsWith('import') || trimmed.startsWith('#include') || trimmed.startsWith('using') || trimmed.endsWith('{') || trimmed.endsWith('}') || trimmed === '';
          
          if (isStatement && !isControl && !trimmed.endsWith(';')) {
            status = 'compilation_error';
            testsPassed = 0;
            compilerError = `Compilation failed at line ${i + 1}:\n    ${lines[i].trim()}\n` + ' '.repeat(lines[i].trim().length) + '^ expected Semicolon (;)';
            semicolonError = true;
            break;
          }
        }
      }

      if (!semicolonError) {
        // E. Python indentation / syntax
        if (language === 'python') {
          const lines = code.split('\n');
          for (let i = 0; i < lines.length; i++) {
            const trimmed = lines[i].trim();
            if (trimmed.startsWith('def ') && !trimmed.endsWith(':')) {
              status = 'compilation_error';
              testsPassed = 0;
              compilerError = `SyntaxError: expected ':' on line ${i + 1}\n    ${lines[i].trim()}`;
              break;
            }
          }
        }
      }
    }

    // F. Division by zero (Runtime Error)
    if (status === 'accepted' && /\/\s*0(?!\\d)/.test(normalized)) {
      status = 'runtime_error';
      testsPassed = 1;
      compilerError = language === 'java'
        ? 'Exception in thread "main" java.lang.ArithmeticException: / by zero\n\tat Main.main(Main.java:5)'
        : 'Runtime Error: Division by zero (SIGFPE)';
      timeMs = 6;
    }
    // G. ArrayIndexOutOfBoundsException (Runtime Error)
    else if (status === 'accepted' && (normalized.includes('IndexOutOfBounds') || normalized.includes('ArrayIndexOutOfBounds') || normalized.includes('out_of_range'))) {
      status = 'runtime_error';
      testsPassed = 2;
      compilerError = 'IndexOutOfBoundException: Index 10 out of bounds for length 5\n\tat Main.main(Main.java:6)';
      timeMs = 12;
    }
    // H. Infinite loops (Time Limit Exceeded)
    else if (status === 'accepted' && (normalized.includes('while(true)') || normalized.includes('while (true)') || normalized.includes('for(;;)') || normalized.includes('for (;;)') || normalized.includes('infinite_loop'))) {
      status = 'time_limit_exceeded';
      testsPassed = 3;
      timeMs = 1000;
    }
    // I. Array size limit (Memory Limit Exceeded)
    else if (status === 'accepted' && (normalized.includes('100000000') || normalized.includes('new int[999999]') || normalized.includes('new int[10000000]'))) {
      status = 'memory_limit_exceeded';
      testsPassed = 4;
      memoryKb = 524288;
    }
    // J. Wrong Answer Check (Logic verification)
    else if (status === 'accepted') {
      const hasLengthLogic = normalized.includes('length') || normalized.includes('len(') || normalized.includes('size()');
      
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

      if (printMatches.length > 0) {
        const stdout = printMatches.join('\n');
        const expectedOutput = hasLengthLogic ? 'word\nl10n\ni18n\np43s' : 'word\nlocalization\ninternationalization\npneumonoultramicroscopicsilicovolcanoconiosis';
        const matchesExpected = stdout.trim() === expectedOutput;

        if (!matchesExpected) {
          status = 'wrong_answer';
          testsPassed = 1;
          failedTest = {
            index: 2,
            input: 'localization',
            expected: 'l10n',
            actual: stdout.split('\n')[1] || stdout || '(empty)'
          };
        }
      } else if (!hasLengthLogic) {
        status = 'wrong_answer';
        testsPassed = 1;
        failedTest = {
          index: 2,
          input: 'localization',
          expected: 'l10n',
          actual: 'localization'
        };
      }
    }

    // K. Round 3 active constraint violation scans
    const violations: any[] = [];
    if (code.includes('for') || code.includes('while')) {
      const lineIndex = code.split('\n').findIndex(l => l.includes('for') || l.includes('while')) + 1;
      violations.push({
        constraintId: 'ouroboros',
        line: lineIndex > 0 ? lineIndex : 3,
        column: 5,
        message: 'Loops detected (for/while) in Ouroboros recursion-only mode.'
      });
    }

    if (code.split('\n').length > 30) {
      violations.push({
        constraintId: 'shortAndSweet',
        line: 31,
        column: 1,
        message: 'Source code exceeds standard 30 lines limit constraint.'
      });
    }

    return NextResponse.json({
      id: submissionId,
      status,
      testsPassed,
      totalTests,
      timeMs,
      memoryKb,
      pointsEarned: status === 'accepted' ? 50 : 0,
      compilerError: status === 'compilation_error' || status === 'runtime_error' ? compilerError : undefined,
      failedTest: status === 'wrong_answer' ? failedTest : undefined,
      constraintViolations: violations
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
