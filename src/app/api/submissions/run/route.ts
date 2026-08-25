import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, language, customInput } = body;

    // Simulate compilation delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simple execution simulator
    const isSuccess = !code.includes('syntax_error') && !code.includes('compile_error');
    
    if (!isSuccess) {
      return NextResponse.json({
        stdout: '',
        stderr: 'Compilation failed: SyntaxError on line 4',
        exitCode: 1,
        timeMs: 0,
        memoryKb: 0,
        matchesExpected: false,
      });
    }

    return NextResponse.json({
      stdout: customInput ? `Processed: ${customInput}` : 'Processed output: 12\n34\n',
      stderr: '',
      exitCode: 0,
      timeMs: 45,
      memoryKb: 2048,
      matchesExpected: true,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
