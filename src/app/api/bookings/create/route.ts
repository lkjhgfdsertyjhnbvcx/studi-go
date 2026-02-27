import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // 🌟 複数形の bookings テーブル（リレーション）に保存
        const newBooking = await prisma.booking.create({
            data: {
                storeId: parseInt(data.storeId),
                studioId: parseInt(data.studioId),
                studioName: data.studioName,
                date: data.date,
                startTime: parseInt(data.startTime),
                totalPrice: parseInt(data.totalPrice),
            }
        });

        return NextResponse.json({ success: true, bookingId: newBooking.id });
    } catch (error: any) {
        console.error("Booking Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}