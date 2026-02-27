import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const config = await prisma.adminConfig.findFirst();
        return NextResponse.json(config || { adCode: "" });
    } catch (error) {
        return NextResponse.json({ adCode: "" });
    }
}

export async function POST(request: Request) {
    try {
        const { adCode } = await request.json();
        const updated = await prisma.adminConfig.upsert({
            where: { id: 1 },
            update: { adCode },
            create: { id: 1, adCode }
        });
        return NextResponse.json({ success: true, config: updated });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}