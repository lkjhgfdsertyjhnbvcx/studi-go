import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * 割り勘の支払期限切れをチェックして自動キャンセルするCRONジョブ
 * 期限を過ぎても status が 'Pending' のままの予約を 'Cancelled' にする
 */
export async function GET() {
  try {
    const now = new Date();

    // 1. 期限切れの予約を取得
    // Prismaの型チェックを回避するため as any を使用
    const expiredReservations = await (prisma as any).reservation.findMany({
      where: {
        status: 'Pending',
        paymentDeadline: {
          lt: now, // 現在時刻より前（期限切れ）
        },
      },
      include: {
        splitPayments: true,
      } as any,
    });

    let cancelledCount = 0;

    // 2. 該当する予約をキャンセル処理
    for (const res of expiredReservations) {
      await (prisma as any).reservation.update({
        where: { id: res.id },
        data: { status: 'Cancelled' },
      });
      cancelledCount++;
    }

    return NextResponse.json({
      success: true,
      message: `${cancelledCount} 件の期限切れ予約をキャンセルしました。`,
    });
  } catch (error: any) {
    console.error('CRON Timeout Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
