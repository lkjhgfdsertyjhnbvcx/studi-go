import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const store = await prisma.store.create({
            data: { name: body.name }
        });
        return NextResponse.json(store);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}