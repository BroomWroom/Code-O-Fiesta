import { NextRequest, NextResponse } from 'next/server';
import { successResponse } from '@/app/api/_lib/response';
import connectDB from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    return successResponse({ status: 'ok', database: 'connected' });
  } catch {
    return NextResponse.json({ message: 'Service unavailable' }, { status: 503 });
  }
}
