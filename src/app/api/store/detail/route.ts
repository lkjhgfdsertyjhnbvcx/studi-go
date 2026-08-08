import { NextResponse } from "next/server";
import { getStudioByIdFromFirestore, getAllBookingsFromFirestore } from "@/lib/db-firestore";
import { getApiAuth } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "IDが必要です" }, { status: 400 });

        const studio = await getStudioByIdFromFirestore(id);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        const allBookings = await getAllBookingsFromFirestore();
        const studioBookings = allBookings
            .filter((b) => b.studioId === id && b.status !== "cancelled")
            .map((b) => ({
                id: b.id,
                studioName: (studio.rooms ?? []).find((r: any) => r.id === b.roomName)?.name ?? b.roomName ?? "",
                date: b.date,
                startTime: b.startTime,
                totalPrice: b.totalPrice,
            }));

        // このエンドポイントは2つの用途を兼ねている:
        //   1) 公開の店舗ページ /studio/[id]（未ログインの一般ユーザー）
        //   2) 店舗ダッシュボード（スタッフ・ブラックリストの編集に使う）
        // 260807まで認証チェックが無く、スタジオ文書をそのまま返していたため、
        // staff[].password（ハッシュ）や blacklist が URL を知るだけで取得できた。
        // オーナー／運営のときだけ完全な内容を返し、それ以外には機密項目を落とす。
        //
        // stripeAccountStatus は公開ページがオンライン決済の可否判定に使うため残す
        // （アカウントIDそのものは公開側では不要なので落とす）。
        const auth = await getApiAuth();
        const isOwner = auth.isAdmin || auth.studioId === id;

        if (isOwner) {
            return NextResponse.json({ ...studio, bookings: studioBookings });
        }

        const {
            staff: _staff,
            blacklist: _blacklist,
            stripeAccountId: _stripeAccountId,
            ...safeStudio
        } = studio as Record<string, any>;

        return NextResponse.json({
            ...safeStudio,
            bookings: studioBookings,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}