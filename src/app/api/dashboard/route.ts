import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. 店舗とスタジオ情報を取得
    // Prismaの型ズレを回避するため as any を使用
    const store = await (prisma as any).store.findFirst({ 
      include: { studios: true } 
    } as any);

    if (!store) throw new Error("店舗データがありません");

    // 2. キャンセル以外のすべての予約を取得
    const bookings = await (prisma as any).booking.findMany({
      where: {
        status: { not: 'Cancelled' }
      },
      include: {
        studio: true,
        user: true
      }
    } as any);

    // 3. 統計計算 (TypeScriptの型エラー回避のため引数に :any を使用)
    const totalRevenue = bookings.reduce((sum: any, b: any) => sum + b.totalPrice, 0);
    const pendingAmount = bookings
      .filter((b: any) => !b.isPaid)
      .reduce((sum: any, b: any) => sum + b.totalPrice, 0);

    return NextResponse.json({
      storeName: store.name,
      studiosCount: store.studios.length,
      totalBookings: bookings.length,
      totalRevenue,
      pendingAmount,
      recentBookings: bookings.slice(0, 5) // 直近5件
    });
  } catch (error: any) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
