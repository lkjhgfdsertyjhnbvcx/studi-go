import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
    try {
        const snapshot = await adminDb.collection("bookings").get();
        const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(bookings.sort((a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
    } catch (error) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        if (!body.id || !body.status) {
            return NextResponse.json({ error: "idとstatusが必要です" }, { status: 400 });
        }
        await adminDb.collection("bookings").doc(body.id).update({ status: body.status });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("booking update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "IDが必要です" }, { status: 400 });

        await adminDb.collection("bookings").doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("booking delete error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
