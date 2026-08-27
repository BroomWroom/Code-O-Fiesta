import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { roundErrorResponse, roundService } from '../../../_services/round.service';
import { parseRound2Params } from '../../../_validators/round';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ roundNumber: string }> },
) {
  try {
    const roundNumber = await parseRound2Params(context.params);
    const actor = await roundService.resolveActor(request);
    const scoped = { roundNumber, actor };

    await roundService.applyLazyPhaseHandover(scoped);
    const questions = await roundService.getQuestions(scoped);

    return NextResponse.json(questions);
  } catch (error) {
    return roundErrorResponse(error);
  }
}
