import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 🌟 Prismaの型チェックを回避してスタッフ一覧を取得
    const staffs = await (prisma as any).staff.findMany({ 
      orderBy: { id: 'asc' } 
    });
    return NextResponse.json(staffs);
  } catch (error: any) {
    console.error('Fetch staff error:', error);
    return NextResponse.json(
      { error: "取得失敗" }, 
      { status: 500 }
    );
  }
}
