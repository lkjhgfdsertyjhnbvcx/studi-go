import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const store = await prisma.store.findFirst({ include: { studios: true } });
        if (!store) throw new Error("店舗データがありません");

        // キャンセル以外のすべての予約を取得
        const bookings = await prisma.booking.findMany({
            where: { status: { not: 'キャンセル' } },
            include: { user: true }
        });

        // 💰 売上・未入金の計算
        const paidBookings = bookings.filter(b => b.status === '支払い済み');
        const actualSales = paidBookings.reduce((sum, b) => sum + b.totalPrice, 0);

        const unpaidBookings = bookings.filter(b => b.status === '未入金（当日払い）');
        const unpaidSales = unpaidBookings.reduce((sum, b) => sum + b.totalPrice, 0);

        // 👥 利用人数と単価の計算
        const bookingCount = bookings.length;
        const averagePrice = bookingCount > 0 ? Math.round((actualSales + unpaidSales) / bookingCount) : 0;
        const uniqueUsers = new Set(bookings.map(b => b.userId)).size;

        // ⏱️ 稼働率の計算（※仮に1日12時間営業×30日×スタジオ数 をMAX稼働として計算）
        const totalBookedMs = bookings.reduce((sum, b) => sum + (new Date(b.endTime).getTime() - new Date(b.startTime).getTime()), 0);
        const totalBookedHours = totalBookedMs / (1000 * 60 * 60);
        const studioCount = store.studios.length || 1;
        const maxHours = 12 * 30 * studioCount;
        const occupancyRate = maxHours > 0 ? Math.round((totalBookedHours / maxHours) * 100) : 0;

        return NextResponse.json({
            targetSales: store.targetSales > 0 ? store.targetSales : 300000, // 未設定なら仮で30万円を目標に
            actualSales,
            unpaidSales,
            averagePrice,
            bookingCount,
            uniqueUsers,
            occupancyRate,
            totalBookedHours
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}