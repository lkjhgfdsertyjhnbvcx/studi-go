import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

// バックアップ用データ取得（プラットフォーム管理者のみ）
export async function GET() {
    try {
        const denied = await requirePlatformAdmin();
        if (denied) return denied;

        const [studiosSnap, bookingsSnap] = await Promise.all([
            adminDb.collection("studios").get(),
            adminDb.collection("bookings").get(),
        ]);

        const studios = studiosSnap.docs.map(doc => doc.data());
        const bookings = bookingsSnap.docs.map(doc => doc.data());

        return NextResponse.json({ studios, bookings });
    } catch (error: any) {
        console.error("[admin/backup GET]", error?.message || error);
        return NextResponse.json({ error: error?.message || "バックアップデータの取得に失敗しました" }, { status: 500 });
    }
}
