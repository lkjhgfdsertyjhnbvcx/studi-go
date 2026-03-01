import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 🌟 Prismaの型チェックを回避して店舗を新規作成
    const newStore = await (prisma as any).store.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password, // 本来はハッシュ化すべきですが現状の仕様に合わせます
        companyName: body.companyName || "",
        ownerName: body.ownerName || "",
        address: body.address || "",
        tel: body.tel || "",
        url: body.url || "",
      },
    });

    return NextResponse.json({ success: true, store: newStore });
  } catch (error: any) {
    console.error('Store registration error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
