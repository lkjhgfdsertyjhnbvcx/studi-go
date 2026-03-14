import { NextResponse } from "next/server";
import { getUserByIdFromFirestore, saveUserToFirestore } from "@/lib/db-firestore";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
    try {
        const { userId, bandName, leaderName } = await request.json();
        if (!userId || !bandName || !leaderName) {
            return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
        }
        const user = await getUserByIdFromFirestore(userId);
        if (!user) return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });

        const newBand = { id: uuidv4(), bandName, leaderName, createdAt: new Date().toISOString() };
        const updatedUser = { ...user, bands: [...(user.bands || []), newBand] };
        await saveUserToFirestore(updatedUser);
        return NextResponse.json({ success: true, band: newBand });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
