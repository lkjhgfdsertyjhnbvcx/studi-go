import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "IDが必要です" }, { status: 400 });

    // 🌟 Prismaの型チェックを回避して店舗詳細を取得
    const store = await (prisma as any).store.findUnique({
      where: { id: parseInt(id) },
      include: { studios: true }
    });

    if (!store) return NextResponse.json({ error: "店舗が見つかりません" }, { status: 404 });

    return NextResponse.json(store);
  } catch (error: any) {
    console.error('Fetch store detail error:', error);
    return NextResponse.json(
      { error: "取得失敗" },
      { status: 500 }
    );
  }
}
