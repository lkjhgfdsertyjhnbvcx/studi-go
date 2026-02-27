import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("受信データ:", body);

        // 必須項目をしっかり埋めて作成
        const newStore = await prisma.store.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
                prefecture: "未設定",
                address: "未設定",
            }
        });

        return NextResponse.json({ success: true, store: newStore });
    } catch (error: any) {
        console.error("【APIエラー詳細】:", error.message);
        // 画面に「本当の理由」を届ける
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}