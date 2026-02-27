import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        // 全ての店舗と、それに紐づくスタジオを取得
        const stores = await prisma.store.findMany({
            include: { studios: true },
            orderBy: { id: 'asc' }
        });
        return NextResponse.json(stores);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}