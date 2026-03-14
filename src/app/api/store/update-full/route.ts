import { NextResponse } from "next/server";
import { saveStudioToFirestore } from "@/lib/db-firestore";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        if (!data.id) return NextResponse.json({ error: "Missing studio id" }, { status: 400 });
        await saveStudioToFirestore(data);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[update-full] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}