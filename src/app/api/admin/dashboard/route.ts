import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        // 1. 店舗一覧を、紐づく予約データ（売上計算用）と一緒に取得
        const stores = await (prisma as any).store.findMany({
            include: {
                bookings: true,
            },
        });

        // 2. ユーザー総数を取得
        const userCount = await prisma.user.count();

        // 3. 全予約データを取得して、売上と消込状況を計算
       const allBookings = await (prisma as any).booking.findMany();

        // 総売上（すべての予約の合計金額 = 売掛含む）
        const totalRevenue = allBookings.reduce((sum, b) => sum + b.totalPrice, 0);

        // 入金済み売上（isPaid が true のもの = Stripe消込済み）
        const paidRevenue = allBookings
            .filter((b) => b.isPaid === true)
            .reduce((sum, b) => sum + b.totalPrice, 0);

        // 未入金売上（売掛金 = 総売上 - 入金済み）
        const unpaidRevenue = totalRevenue - paidRevenue;

        // 4. 店舗ごとのデータを整形
        const storeStats = stores.map((store) => {
            // 店舗ごとの総売上
            const storeTotal = store.bookings.reduce((sum, b) => sum + b.totalPrice, 0);

            return {
                id: store.id,
                name: store.name,
                revenue: storeTotal,
                status: "稼働中", // 必要に応じて動的に変更可能
            };
        });

        // 5. 監督のダッシュボードに必要な全データを返す
        return NextResponse.json({
            stores: storeStats,
            totalRevenue: totalRevenue,
            paidRevenue: paidRevenue,
            unpaidRevenue: unpaidRevenue,
            userCount: userCount,
            storeCount: stores.length,
        });

    } catch (error: any) {
        console.error("Dashboard API Error:", error);
        return NextResponse.json(
            { error: "データの取得に失敗しました: " + error.message },
            { status: 500 }
        );
    }
}
