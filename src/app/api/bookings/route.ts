import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
            include: { studio: true },
            orderBy: { startTime: 'asc' }
        });
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 🌟 ユーザーがいなければ「システム用」を即座に作成
        let user = await prisma.user.findFirst({
            where: { email: "system@studi-go.com" }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: "system@studi-go.com",
                    name: "店舗メンテナンス枠",
                    totalSpent: 0
                }
            });
        }

        const newBooking = await prisma.booking.create({
            data: {
                startTime: new Date(body.startTime),
                endTime: new Date(body.endTime),
                totalPrice: parseInt(body.totalPrice || "0"),
                status: body.status || "予約済み",
                userId: user.id, // 必ず存在するユーザーIDを紐付け
                studioId: parseInt(body.studioId),
            }
        });

        return NextResponse.json(newBooking);
    } catch (error: any) {
        console.error("Booking Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}