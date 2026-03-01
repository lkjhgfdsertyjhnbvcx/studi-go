import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 🌟 Prismaの型ズレを回避して予約を新規作成
    const newBooking = await (prisma as any).booking.create({
      data: {
        storeId: parseInt(data.storeId),
        studioId: data.studioId,
        userId: data.userId,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        totalPrice: parseFloat(data.totalPrice),
        status: 'Pending', // 支払待ち
        isPaid: false,
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
