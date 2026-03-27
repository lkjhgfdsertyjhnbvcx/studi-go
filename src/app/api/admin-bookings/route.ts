import { NextResponse } from "next/server";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const snapshot = await getDocs(collection(db, "bookings"));
        const bookings = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json(bookings.sort((a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
    } catch (error: any) {
        console.error("bookings GET error:", error.message);
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        if (!body.id || !body.status) {
            return NextResponse.json({ error: "idとstatusが必要です" }, { status: 400 });
        }
        await updateDoc(doc(db, "bookings", body.id), { status: body.status });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("booking update error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "IDが必要です" }, { status: 400 });

        await deleteDoc(doc(db, "bookings", id));
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("booking delete error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
