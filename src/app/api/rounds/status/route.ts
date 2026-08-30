import { NextRequest, NextResponse } from 'next/server';

import { requireAuthentication } from '@/app/api/_lib/authorization';
import { errorResponse } from '@/app/api/_lib/response';
import { getAllRoundsStatus } from '@/app/api/_services/round-status.service';

export const dynamic = 'force-dynamic';

// Bulk status for all three rounds in one call — used by the participant
// navbar so it doesn't have to poll /api/rounds/[n]/status three times.
// Backed by the same getAllRoundsStatus() the per-round route uses.
export async function GET(request: NextRequest) {
  try {
    await requireAuthentication(request);
    const rounds = await getAllRoundsStatus();
    return NextResponse.json({ rounds });
  } catch (error) {
    return errorResponse(error);
  }
}
