import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, companyName, ownerName, address, tel, url } = body;

    // 🌟 Prismaの型チェックを回避して店舗情報を更新
    const updatedStore = await (prisma as any).store.update({
      where: { id: parseInt(id) },
      data: {
        name,
        companyName,
        ownerName,
        address,
        tel,
        url,
      },
    });

    return NextResponse.json({ success: true, store: updatedStore });
  } catch (error: any) {
    console.error('Update store profile error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
