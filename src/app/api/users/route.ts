import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 🌟 as any を使って、項目の名前がズレていても強制的に取得
    let users = await (prisma as any).user.findMany({
      orderBy: { id: 'desc' } // 確実に存在するID順で並べる
    });

    // 顧客が一人もいない場合のテスト用処理
    if (users.length === 0) {
      const testUser = await (prisma as any).user.create({
        data: {
          name: "テスト 太郎",
          email: "test@example.com",
          tel: "090-0000-0000"
        }
      });
      users = [testUser];
    }

    return NextResponse.json(users);
  } catch (error: any) {
    console.error('Fetch users error:', error);
    return NextResponse.json(
      { error: "顧客情報の取得に失敗しました" }, 
      { status: 500 }
    );
  }
}
