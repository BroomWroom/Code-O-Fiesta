import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';

import {
  getAuthenticatedUser,
  getUserTeam,
} from '@/app/api/_services/problem.service';
import Problem from '@/models/Problem';
import Round from '@/models/Round';
import TeamRound from '@/models/TeamRound';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ roundNumber: string }> },
) {
  try {
    const { roundNumber } = await params;
    const parsedRoundNumber = Number(roundNumber);

    if (!Number.isInteger(parsedRoundNumber) || parsedRoundNumber !== 1) {
      return NextResponse.json({ error: 'This endpoint only supports Round 1' }, { status: 400 });
    }

    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const team = await getUserTeam((user as any)._id as Types.ObjectId);
    if (!team) {
      return NextResponse.json({ error: 'No team found for this user' }, { status: 404 });
    }

    const round = await Round.findOne({ roundNumber: parsedRoundNumber }).select('_id').lean();
    if (!round) {
      return NextResponse.json({ error: 'Round 1 not found' }, { status: 404 });
    }

    const teamRound = await TeamRound.findOne({
      teamId: (team as any)._id as Types.ObjectId,
      roundId: (round as any)._id as Types.ObjectId,
    }).lean();

    const assignedEntries = teamRound?.round1?.problems ?? [];
    if (!assignedEntries.length) {
      return NextResponse.json([]);
    }

    const objectIds = assignedEntries
      .map((entry: any) => entry?.problemId)
      .filter(Boolean)
      .map((problemId: Types.ObjectId | string) => new Types.ObjectId(problemId));

    const problems = await Problem.find({ _id: { $in: objectIds } }).lean();
    const problemMap = new Map(
      problems.map((problem: any) => [problem._id.toString(), problem]),
    );

    const normalizedProblems = assignedEntries
      .map((entry: any) => {
        const problem = problemMap.get(entry?.problemId?.toString());
        if (!problem) return null;

        return {
          id: problem._id.toString(),
          title: problem.title,
          difficulty: String(problem.difficulty ?? 'easy').toLowerCase(),
          points: 50,
          statement: problem.description,
          examples: problem.examples ?? [],
          constraints: Array.isArray(problem.constraints)
            ? problem.constraints
            : typeof problem.constraints === 'string'
              ? [problem.constraints]
              : [],
          timeLimit: 1000,
          memoryLimit: 256000,
          roundNumber: problem.roundNumber,
          status: entry?.status ?? 'PENDING',
        };
      })
      .filter(Boolean);

    return NextResponse.json(normalizedProblems);
  } catch (error: unknown) {
    console.error('[GET /api/rounds/[roundNumber]/questions]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
