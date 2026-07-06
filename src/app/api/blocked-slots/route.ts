import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export interface BlockedSlot {
    id: string;
    studioId: string;
    roomName: string;       // 対象部屋（"all" = 全部屋）
    date: string;           // "2026-04-10"
    startTime: string;      // "13:00"
    endTime: string;        // "17:00"
    reason: string;         // "メンテナンス", "レッスン" など
    teacher?: string;       // 先生・担当者名
    memo?: string;          // 内部メモ
    createdBy: string;      // 作成したスタッフ名
    createdAt: string;
}

// GET: スタジオのブロック枠を取得
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const studioId = searchParams.get("studioId");

        if (!studioId) {
            return NextResponse.json({ error: "studioId is required" }, { status: 400 });
        }

        const snapshot = await adminDb.collection("blockedSlots").get();
        const slots = snapshot.docs
            .map(d => ({ id: d.id, ...d.data() } as BlockedSlot))
            .filter(s => s.studioId === studioId);

        return NextResponse.json(slots);
    } catch (error: any) {
        console.error("blockedSlots GET error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: ブロック枠を作成
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studioId, roomName, date, startTime, endTime, reason, teacher, memo, createdBy } = body;

        if (!studioId || !date || !startTime || !endTime) {
            return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
        }

        // startTime < endTime バリデーション
        const [sh, sm] = startTime.split(":").map(Number);
        const [eh, em] = endTime.split(":").map(Number);
        if (sh * 60 + sm >= eh * 60 + em) {
            return NextResponse.json({ error: "終了時間は開始時間より後にしてください" }, { status: 400 });
        }

        const id = crypto.randomUUID();
        const newSlot: BlockedSlot = {
            id,
            studioId,
            roomName: roomName || "all",
            date,
            startTime,
            endTime,
            reason: reason || "メンテナンス",
            teacher: teacher || "",
            memo: memo || "",
            createdBy: createdBy || "",
            createdAt: new Date().toISOString(),
        };

        await adminDb.collection("blockedSlots").doc(id).set(newSlot);
        return NextResponse.json({ success: true, slot: newSlot });
    } catch (error: any) {
        console.error("blockedSlots POST error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: ブロック枠を削除
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "id is required" }, { status: 400 });
        }

        await adminDb.collection("blockedSlots").doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("blockedSlots DELETE error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
