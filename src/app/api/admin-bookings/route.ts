import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 予約一覧を全件取得（GET）
export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                user: true,   // 誰の予約か
                studio: true  // どの部屋か
            },
            orderBy: { startTime: 'desc' } // 新しい予約順
        });
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

// 予約のステータス（キャンセル・入金済み等）を更新（PUT）
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const updatedBooking = await prisma.booking.update({
            where: { id: parseInt(body.id) },
            data: { status: body.status }
        });
        return NextResponse.json(updatedBooking);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 予約データ自体を完全に削除（DELETE）
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) throw new Error("IDが指定されていません");

        await prisma.booking.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}