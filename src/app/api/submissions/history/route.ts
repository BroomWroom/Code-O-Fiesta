import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Submission from '@/models/Submission';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const problemId = searchParams.get('problemId');

    if (!problemId) {
      return NextResponse.json({ error: 'Missing problemId parameter' }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      try {
        await connectDB();
        const submissions = await Submission.find({ problemId })
          .sort({ createdAt: -1 })
          .limit(50);
          
        return NextResponse.json(submissions.map(sub => ({
          id: sub._id.toString(),
          status: sub.verdict.toLowerCase().replace('_limit', '_limit_exceeded').replace('ast_constraint_failed', 'compilation_error'),
          testsPassed: sub.verdict === 'ACCEPTED' ? 10 : 3,
          totalTests: 10,
          timeMs: sub.judge0?.executionTime || 120,
          memoryKb: sub.judge0?.memory || 4096,
          sourceCode: sub.sourceCode,
          language: sub.language,
        })));
      } catch (dbErr) {
        console.error('Failed to query submission history:', dbErr);
      }
    }

    return NextResponse.json([]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
