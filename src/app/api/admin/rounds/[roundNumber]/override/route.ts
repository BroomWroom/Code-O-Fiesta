import { NextRequest, NextResponse } from 'next/server';
import { overrideRoundState } from '@/app/api/_services/admin.service';
import { successResponse, errorResponse } from '@/app/api/_lib/response';
import { requireAdmin } from '@/app/api/_lib/authorization';
import { overrideRoundStateSchema } from '@/app/api/_validators/admin';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ roundNumber: string }> }
) {
  try {
    await requireAdmin(req);
    const resolvedParams = await params;
    const roundNumber = parseInt(resolvedParams.roundNumber, 10);
    if (isNaN(roundNumber)) {
      return NextResponse.json({ message: 'Invalid round number' }, { status: 400 });
    }

    const body = await req.json();
    const parsed = overrideRoundStateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid request body', issues: parsed.error.issues }, { status: 400 });
    }

    const result = await overrideRoundState(roundNumber, parsed.data);
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
