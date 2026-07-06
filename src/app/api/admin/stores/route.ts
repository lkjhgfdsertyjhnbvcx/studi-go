import { NextResponse } from "next/server";
import { saveStudioToFirestore } from "@/lib/db-firestore";
import { createEmptyStudio } from "@/lib/db-studio";
import { requirePlatformAdmin } from "@/lib/api-auth";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newStudio = {
            ...createEmptyStudio(),
            storeName: body.name,
        };

        await saveStudioToFirestore(newStudio);
        return NextResponse.json({ id: newStudio.id, name: newStudio.storeName });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 店舗の表示・決済フラグ更新（プラットフォーム管理者のみ）
export async function PATCH(request: Request) {
    try {
        const denied = await requirePlatformAdmin();
        if (denied) return denied;
        const { id, ...fields } = await request.json();
        if (!id || typeof id !== "string") {
            return NextResponse.json({ error: "idが必要です" }, { status: 400 });
        }
        // 許可フィールドのみ（ホワイトリスト）
        const ALLOWED = ["allowCash", "allowOnlineStripe", "showMap", "showRooms", "showEquipment", "showReviews", "showGallery", "showSNS"];
        const updates: Record<string, boolean> = {};
        for (const k of ALLOWED) {
            if (k in fields) updates[k] = !!fields[k];
        }
        if (Object.keys(updates).length === 0) {
            return NextResponse.json({ error: "更新項目がありません" }, { status: 400 });
        }
        await adminDb.collection("studios").doc(id).update(updates);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
