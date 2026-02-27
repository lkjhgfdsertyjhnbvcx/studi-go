import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const studios = await prisma.studio.findMany({
            include: { store: true } // 店舗情報も一緒に取る
        });
        return NextResponse.json(studios);
    } catch (error) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}