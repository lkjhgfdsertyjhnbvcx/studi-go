import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 🌟 複数形の booking テーブルから一覧を取得
    // Prisma Client の同期ズレ回避のため as any を使用
    const bookings = await (prisma as any).booking.findMany({
      include: { studio: true },
      orderBy: { startTime: 'asc' },
    });

    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
