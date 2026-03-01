import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 🌟 as any を使って、IDの型（数字か文字列か）によるエラーを完全に回避
    const updatedUser = await (prisma as any).user.update({
      where: { id: body.id || 1 }, // bodyにIDがあればそれ、なければ1を使用
      data: {
        name: body.name,
        email: body.email,
        tel: body.tel || body.phone, // 両方の可能性に対応
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
