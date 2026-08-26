import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Submission from '@/models/Submission';

declare global {
  var submissionCache: Map<string, { code: string; language: string; problemId: string }> | undefined;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { problemId, code, language } = body;

    let submissionId = `sub_${Date.now()}`;

    if (process.env.MONGODB_URI) {
      try {
        await connectDB();
        
        // Mock teamId, userId, roundId since auth is mock
        const mongoose = require('mongoose');
        const teamId = new mongoose.Types.ObjectId();
        const userId = new mongoose.Types.ObjectId();
        const roundId = new mongoose.Types.ObjectId();
        
        const count = await Submission.countDocuments({ problemId });

        const sub = await Submission.create({
          teamId,
          userId,
          roundId,
          problemId: new mongoose.Types.ObjectId(problemId.length === 24 ? problemId : undefined),
          sourceCode: code,
          language,
          submissionNumber: count + 1,
          verdict: 'ACCEPTED', // Pre-mock verdict
        });

        submissionId = sub._id.toString();
      } catch (dbErr) {
        console.error('Failed to save submission to DB, returning mock ID:', dbErr);
      }
    }

    // Cache the submission code and metadata for dynamic judging during polling
    if (!globalThis.submissionCache) {
      globalThis.submissionCache = new Map();
    }
    globalThis.submissionCache.set(submissionId, { code, language, problemId });

    return NextResponse.json({ submissionId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
