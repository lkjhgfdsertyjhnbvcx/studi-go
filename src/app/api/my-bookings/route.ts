import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const user = await prisma.user.findFirst();
        if (!user) return NextResponse.json({ error: "ユーザーデータがありません" }, { status: 404 });

        const bookings = await prisma.booking.findMany({
            where: { userId: user.id },
            // 🌟 ここで「部屋」とその「店舗」の情報を両方取ってくる！
            include: {
                studio: {
                    include: { store: true }
                }
            },
            orderBy: { startTime: 'desc' }
        });

        return NextResponse.json({ user, bookings });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const canceledBooking = await prisma.booking.update({
            where: { id: parseInt(body.id) },
            data: { status: 'キャンセル' }
        });
        return NextResponse.json(canceledBooking);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}