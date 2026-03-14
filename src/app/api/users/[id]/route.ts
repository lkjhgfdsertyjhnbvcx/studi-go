import { NextResponse } from "next/server";
import { getUserByIdFromFirestore } from "@/lib/db-firestore";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const user = await getUserByIdFromFirestore(id);
        if (!user) return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
        const { password, ...safeUser } = user;
        return NextResponse.json(safeUser);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
