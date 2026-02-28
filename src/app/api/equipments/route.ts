import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 🌟 Prismaの型ズレを回避するため as any を使用
    const equipments = await (prisma as any).equipment.findMany({ 
      orderBy: { id: 'asc' } 
    });

    
    
    return NextResponse.json(equipments);
  } catch (error: any) {
    console.error('Fetch equipments error:', error);
    return NextResponse.json(
      { error: "取得失敗" }, 
      { status: 500 }
    );
  }
}
