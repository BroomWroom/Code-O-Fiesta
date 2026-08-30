import { NextRequest, NextResponse } from 'next/server';

import { requireAuthentication } from '@/app/api/_lib/authorization';
import { errorResponse } from '@/app/api/_lib/response';
import { getRoundStatus } from '@/app/api/_services/round-status.service';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roundNumber: string }> },
) {
  try {
    await requireAuthentication(request);

    const { roundNumber } = await params;
    const parsedRoundNumber = Number(roundNumber);
    if (!Number.isInteger(parsedRoundNumber)) {
      return NextResponse.json({ message: 'Invalid round number' }, { status: 400 });
    }

    const status = await getRoundStatus(parsedRoundNumber);
    return NextResponse.json(status);
  } catch (error) {
    return errorResponse(error);
  }
}
