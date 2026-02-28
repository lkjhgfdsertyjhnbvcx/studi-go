import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 🌟 複数形の bookings テーブル（リレーション）に保存
    // Prisma Client の同期ズレを回避するため as any を使用
    const newBooking = await (prisma as any).booking.create({
      data: {
        storeId: parseInt(data.storeId),
        studioId: parseInt(data.studioId),
        userId: data.userId, // もしあれば。認証があればそちらから取得
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        totalPrice: parseFloat(data.totalPrice),
        isPaid: false, // デフォルトは未入金
        status: 'Pending',
        stripePaymentId: data.stripePaymentId || null,
      },
    });

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error: any) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
