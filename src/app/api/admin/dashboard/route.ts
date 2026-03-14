import { NextResponse } from "next/server";
import { getAllStudiosFromFirestore, getAllBookingsFromFirestore, getAllUsersFromFirestore } from "@/lib/db-firestore";

export async function GET() {
    try {
        const [studios, allBookings, users] = await Promise.all([
            getAllStudiosFromFirestore(),
            getAllBookingsFromFirestore(),
            getAllUsersFromFirestore(),
        ]);

        const totalRevenue = allBookings.reduce((sum, b) => sum + b.totalPrice, 0);

        const storeStats = studios.map((studio) => {
            const studioBookings = allBookings.filter((b) => b.studioId === studio.id);
            const revenue = studioBookings.reduce((sum, b) => sum + b.totalPrice, 0);
            return {
                id: studio.id,
                name: studio.storeName,
                revenue,
                status: "稼働中",
            };
        });

        return NextResponse.json({
            stores: storeStats,
            totalRevenue,
            paidRevenue: totalRevenue,
            unpaidRevenue: 0,
            userCount: users.length,
            storeCount: studios.length,
        });
    } catch (error: any) {
        console.error("Dashboard API Error:", error);
        return NextResponse.json(
            { error: "データの取得に失敗しました: " + error.message },
            { status: 500 }
        );
    }
}