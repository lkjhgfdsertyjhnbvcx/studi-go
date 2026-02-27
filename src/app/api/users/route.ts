import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 顧客一覧を読み込む（GET）
export async function GET() {
    try {
        let users = await prisma.user.findMany({
            orderBy: { registeredAt: 'desc' } // 登録日が新しい順
        });

        // テスト用：誰も顧客がいない場合は、ダミーデータを1件作成する
        if (users.length === 0) {
            await prisma.user.create({
                data: {
                    name: "テスト 太郎",
                    email: "taro.test@example.com",
                    phone: "090-1234-5678",
                    totalSpent: 12500, // 過去の利用金額
                    isBlacklisted: false,
                }
            });
            users = await prisma.user.findMany({ orderBy: { registeredAt: 'desc' } });
        }

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

// 顧客のブラックリスト設定を更新する（PUT）
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(body.id) },
            data: { isBlacklisted: body.isBlacklisted }
        });
        return NextResponse.json(updatedUser);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}