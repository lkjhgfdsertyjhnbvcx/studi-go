import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 🌟 Prismaの型チェックを回避して、スタジオ一覧と所属店舗の情報を取得
    const studios = await (prisma as any).studio.findMany({
      include: { store: true } // 店舗情報も一緒に取る
    });
    
    return NextResponse.json(studios);
  } catch (error: any) {
    console.error('Fetch studios error:', error);
    return NextResponse.json(
      { error: "スタジオ情報の取得に失敗しました" }, 
      { status: 500 }
    );
  }
}
