import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 🌟 本来はログインユーザーのセッションから取得しますが、
    // 現状はテスト用に最初のユーザーを想定する等の処理
    const user = await (prisma as any).user.findFirst();
    if (!user) return NextResponse.json({ error: "ユーザーデータがありません" }, { status: 404 });

    const bookings = await (prisma as any).booking.findMany({
      where: { userId: user.id },
      // 🌟 部屋とその店舗の情報を取得
      include: {
        studio: {
          include: { store: true }
        }
      }
    });

    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error('Fetch my-bookings error:', error);
    return NextResponse.json(
      { error: "予約情報の取得に失敗しました" },
      { status: 500 }
    );
  }
}
