import { NextResponse } from "next/server";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export interface EquipmentRental {
    id: string;
    studioId: string;
    equipmentName: string;  // 機材名
    roomName?: string;      // 使用ルーム
    date: string;           // "2026-04-10"
    startTime: string;      // "13:00"
    endTime: string;        // "17:00"
    customerName: string;   // お客様名 or 内部利用者名
    purpose: string;        // "レンタル", "内部利用", "イベント" など
    memo?: string;
    createdBy: string;
    createdAt: string;
}

// GET: スタジオの機材貸出一覧を取得
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const studioId = searchParams.get("studioId");
        if (!studioId) return NextResponse.json({ error: "studioId is required" }, { status: 400 });

        const snapshot = await getDocs(collection(db, "equipmentRentals"));
        const rentals = snapshot.docs
            .map(d => ({ id: d.id, ...d.data() } as EquipmentRental))
            .filter(r => r.studioId === studioId);

        return NextResponse.json(rentals);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: 機材貸出を登録
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studioId, equipmentName, roomName, date, startTime, endTime, customerName, purpose, memo, createdBy } = body;

        if (!studioId || !equipmentName || !date || !startTime || !endTime || !customerName) {
            return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
        }

        const [sh, sm] = startTime.split(":").map(Number);
        const [eh, em] = endTime.split(":").map(Number);
        if (sh * 60 + sm >= eh * 60 + em) {
            return NextResponse.json({ error: "終了時間は開始時間より後にしてください" }, { status: 400 });
        }

        const id = crypto.randomUUID();
        const rental: EquipmentRental = {
            id, studioId, equipmentName,
            roomName: roomName || "",
            date, startTime, endTime,
            customerName,
            purpose: purpose || "レンタル",
            memo: memo || "",
            createdBy: createdBy || "",
            createdAt: new Date().toISOString(),
        };

        await setDoc(doc(db, "equipmentRentals", id), rental);
        return NextResponse.json({ success: true, rental });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: 機材貸出を削除
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

        await deleteDoc(doc(db, "equipmentRentals", id));
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
