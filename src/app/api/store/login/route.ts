import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 🌟 Prismaの型ズレを回避して店舗データを検索
        const store = await (prisma as any).store.findUnique({
            where: { email: body.email }
        });

        if (!store || store.password !== body.password) {
            return NextResponse.json({ error: "ログイン失敗" }, { status: 401 });
        }

        return NextResponse.json({
            id: store.id,
            name: store.name,
            email: store.email
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
