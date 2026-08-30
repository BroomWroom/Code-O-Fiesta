import { NextRequest, NextResponse } from 'next/server';
import { getTeamResults } from '@/app/api/_services/leaderboard.service';
import { successResponse, errorResponse } from '@/app/api/_lib/response';
import { requireAuthentication } from '@/app/api/_lib/authorization';

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuthentication(req);
    if (!user.teamId) {
      return NextResponse.json({ message: 'User is not part of a team' }, { status: 400 });
    }
    const results = await getTeamResults(user.teamId);
    return successResponse(results);
  } catch (error) {
    return errorResponse(error);
  }
}
