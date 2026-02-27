import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 店舗メールアドレスで検索
        const store = await prisma.store.findUnique({
            where: { email: body.email }
        });

        // パスワード確認（簡易版）
        if (store && store.password === body.password) {
            return NextResponse.json({
                success: true,
                storeId: store.id,
                name: store.name
            });
        }

        return NextResponse.json({ error: "認証失敗" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}