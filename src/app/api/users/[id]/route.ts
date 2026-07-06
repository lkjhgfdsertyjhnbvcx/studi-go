import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const snap = await adminDb.collection("users").doc(id).get();
        if (!snap.exists) return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
        const { password, ...safeUser } = snap.data() as any;
        return NextResponse.json({ id: snap.id, ...safeUser });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!id) return NextResponse.json({ error: "ユーザーIDが必要です" }, { status: 400 });

        await adminDb.collection("users").doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[DELETE /api/users/[id]]", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
