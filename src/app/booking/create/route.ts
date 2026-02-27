import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newBooking = await prisma.booking.create({
            data: {
                storeId: parseInt(data.storeId),
                studioId: data.studioId,
                studioName: data.studioName,
                date: data.date,
                startTime: data.startTime,
                totalPrice: data.totalPrice,
            }
        });
        return NextResponse.json({ success: true, bookingId: newBooking.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}