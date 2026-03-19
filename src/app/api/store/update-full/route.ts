import { NextResponse } from "next/server";
import { saveStudioToFirestore } from "@/lib/db-firestore";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        if (!data.id) return NextResponse.json({ error: "Missing studio id" }, { status: 400 });
        // SAVE ALL のたびに updatedAt を更新（運営管理画面の更新状況に反映される）
        const dataWithTimestamp = { ...data, updatedAt: new Date().toISOString() };
        await saveStudioToFirestore(dataWithTimestamp);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[update-full] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}