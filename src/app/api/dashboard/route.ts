import { NextResponse } from "next/server";
import { getAllBookingsFromFirestore, getStudioByIdFromFirestore } from "@/lib/db-firestore";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const studioId = searchParams.get("studioId");

        if (!studioId) return NextResponse.json({ error: "studioIdが必要です" }, { status: 400 });

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        const allBookings = await getAllBookingsFromFirestore();
        const bookings = allBookings.filter(
            (b) => b.studioId === studioId && b.status !== "cancelled"
        );

        const paidBookings = bookings.filter((b) => b.status === "active");
        const actualSales = paidBookings.reduce((sum, b) => sum + b.totalPrice, 0);
        const bookingCount = bookings.length;
        const averagePrice = bookingCount > 0 ? Math.round(actualSales / bookingCount) : 0;
        const uniqueUsers = new Set(bookings.map((b) => b.userId)).size;

        // 稼働率計算（1日12時間×30日×部屋数をMAXとして）
        const roomCount = studio.rooms.length || 1;
        const maxHours = 12 * 30 * roomCount;
        const totalBookedHours = bookings.reduce((sum, b) => sum + b.durationHours, 0);
        const occupancyRate = maxHours > 0 ? Math.round((totalBookedHours / maxHours) * 100) : 0;

        return NextResponse.json({
            targetSales: studio.monthlyRevenueTarget ?? 300000,
            actualSales,
            unpaidSales: 0,
            averagePrice,
            bookingCount,
            uniqueUsers,
            occupancyRate,
            totalBookedHours,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}