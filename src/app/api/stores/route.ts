import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * 全店舗の一覧を取得するAPI
 * トップページなどで、店舗リストを表示するために使用
 */
export async function GET() {
  try {
    // 🌟 Prismaの型ズレを回避して、全店舗とスタジオ情報を取得
    const stores = await (prisma as any).store.findMany({
      include: { studios: true },
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(stores);
  } catch (error: any) {
    console.error('Fetch stores error:', error);
    return NextResponse.json(
      { error: "店舗一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
}
