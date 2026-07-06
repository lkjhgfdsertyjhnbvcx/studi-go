import { NextResponse } from "next/server";
import { getAllBookingsFromFirestore, getStudioByIdFromFirestore } from "@/lib/db-firestore";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const studioId = searchParams.get("studioId");

        if (!studioId) return NextResponse.json({ error: "studioIdが必要です" }, { status: 400 });

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        // 今月分に限定（従来は全期間累積で、売上・稼働率が月次にならず膨張していた）
        const now = new Date(Date.now() + 9 * 60 * 60 * 1000); // JST
        const monthPrefix = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;

        const allBookings = await getAllBookingsFromFirestore();
        const bookings = allBookings.filter(
            (b) =>
                b.studioId === studioId &&
                b.status !== "cancelled" &&
                (b.date || "").startsWith(monthPrefix)
        );

        // "confirmed"(Stripe決済済) も売上に含める（従来は "active" のみで決済済み分が漏れていた）
        const paidBookings = bookings.filter((b) => b.status === "active" || b.status === "confirmed");
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