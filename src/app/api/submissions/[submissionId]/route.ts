import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Submission from '@/models/Submission';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ submissionId: string }> }
) {
  try {
    const { submissionId } = await params;
    
    // Default mockup response
    let verdictResult: any = {
      id: submissionId,
      status: 'accepted',
      testsPassed: 10,
      totalTests: 10,
      timeMs: 76,
      memoryKb: 3124,
      pointsEarned: 50,
      constraintViolations: []
    };

    if (process.env.MONGODB_URI) {
      try {
        await connectDB();
        if (submissionId.length === 24) {
          const sub = await Submission.findById(submissionId);
          if (sub) {
            const code = sub.sourceCode || '';
            const violations = [];
            
            // Generate simulated violations if loops are written
            if (code.includes('for') || code.includes('while')) {
              const lineIndex = code.split('\n').findIndex(l => l.includes('for') || l.includes('while')) + 1;
              violations.push({
                constraintId: 'ouroboros',
                line: lineIndex > 0 ? lineIndex : 3,
                column: 5,
                message: 'Loops detected (for/while) in recursion-only mode.'
              });
            }

            if (code.split('\n').length > 30) {
              violations.push({
                constraintId: 'shortAndSweet',
                line: 31,
                column: 1,
                message: 'Source code exceeds standard length bounds.'
              });
            }

            verdictResult = {
              id: sub._id.toString(),
              status: sub.verdict === 'ACCEPTED' ? 'accepted' : 'wrong_answer',
              testsPassed: sub.verdict === 'ACCEPTED' ? 10 : 3,
              totalTests: 10,
              timeMs: sub.judge0?.executionTime || 82,
              memoryKb: sub.judge0?.memory || 4096,
              pointsEarned: sub.verdict === 'ACCEPTED' ? 50 : 0,
              constraintViolations: violations
            };
          }
        }
      } catch (dbErr) {
        console.error('Failed to query submission details from DB:', dbErr);
      }
    } else {
      // In non-db mock mode, check custom violations to allow frontend verification
      // If code contains the word "for" or "while", simulate a violation!
      // We don't have direct access to "code" in GET unless cached, but wait, 
      // let's check: can we just mock check the URL search parameters or standard mock?
      // Since it's a mock without DB, let's return some sample violations sometimes to prove highlight works!
      verdictResult.constraintViolations = [
        {
          constraintId: 'ouroboros',
          line: 5,
          column: 3,
          message: 'Loop statements (for/while) are prohibited under active constraints.'
        }
      ];
    }

    return NextResponse.json(verdictResult);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
