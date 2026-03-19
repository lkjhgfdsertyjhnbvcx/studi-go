import { NextResponse } from "next/server";
import { getUserByIdFromFirestore } from "@/lib/db-firestore";
import { adminDb, initializeAdmin } from "@/lib/firebase-admin";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const user = await getUserByIdFromFirestore(id);
        if (!user) return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
        const { password, ...safeUser } = user as any;
        return NextResponse.json(safeUser);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!id) return NextResponse.json({ error: "ユーザーIDが必要です" }, { status: 400 });

        // AdminSDKを使ってFirestoreセキュリティルールをバイパスして削除
        initializeAdmin();
        if (!adminDb) throw new Error("Firebase Admin not initialized");
        await adminDb.collection("users").doc(id).delete();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[DELETE /api/users/[id]]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
