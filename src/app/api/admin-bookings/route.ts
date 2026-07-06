import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { getApiAuth } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // 認可: 店舗ユーザーは自店舗の予約のみ、プラットフォーム管理者は全件
        const auth = await getApiAuth();
        if (!auth.isAdmin && !auth.studioId) {
            return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
        }

        const query = auth.studioId
            ? adminDb.collection("bookings").where("studioId", "==", auth.studioId)
            : adminDb.collection("bookings");
        const snapshot = await query.get();
        const bookings = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json(bookings.sort((a: any, b: any) => {
            const ta = a.createdAt?.toDate?.() ?? new Date(a.createdAt ?? 0);
            const tb = b.createdAt?.toDate?.() ?? new Date(b.createdAt ?? 0);
            return tb.getTime() - ta.getTime();
        }));
    } catch (error: any) {
        console.error("bookings GET error:", error.message);
        // Firestore権限エラーの場合は空配列を返す（ダッシュボードがクラッシュしないように）
        if (error.message?.includes("permission")) {
            return NextResponse.json([]);
        }
        return NextResponse.json({ error: `取得失敗: ${error.message}` }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const auth = await getApiAuth();
        if (!auth.isAdmin && !auth.studioId) {
            return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
        }
        const body = await request.json();
        if (!body.id || !body.status) {
            return NextResponse.json({ error: "idとstatusが必要です" }, { status: 400 });
        }
        // 店舗ユーザーは自店舗の予約のみ変更可
        if (auth.studioId) {
            const snap = await adminDb.collection("bookings").doc(body.id).get();
            if (!snap.exists || snap.data()?.studioId !== auth.studioId) {
                return NextResponse.json({ error: "この予約を操作する権限がありません" }, { status: 403 });
            }
        }
        await adminDb.collection("bookings").doc(body.id).update({ status: body.status });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("booking update error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const auth = await getApiAuth();
        if (!auth.isAdmin && !auth.studioId) {
            return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
        }
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "IDが必要です" }, { status: 400 });

        // 店舗ユーザーは自店舗の予約のみ削除可
        if (auth.studioId) {
            const snap = await adminDb.collection("bookings").doc(id).get();
            if (!snap.exists || snap.data()?.studioId !== auth.studioId) {
                return NextResponse.json({ error: "この予約を操作する権限がありません" }, { status: 403 });
            }
        }
        await adminDb.collection("bookings").doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("booking delete error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
