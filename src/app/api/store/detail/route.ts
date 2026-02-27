import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "IDが必要です" }, { status: 400 });

        const store = await prisma.store.findUnique({
            where: { id: parseInt(id) },
            include: { studios: true }
        });

        return NextResponse.json(store);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}