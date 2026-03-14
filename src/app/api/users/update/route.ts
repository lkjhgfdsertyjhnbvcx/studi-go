import { NextResponse } from "next/server";
import { getUserByIdFromFirestore, saveUserToFirestore } from "@/lib/db-firestore";

export async function PUT(request: Request) {
    return handleUpdate(request);
}

export async function POST(request: Request) {
    return handleUpdate(request);
}

async function handleUpdate(request: Request) {
    try {
        const body = await request.json();
        const userId = body.userId || body.id;
        const { name, phone, email, address } = body;

        if (!userId) {
            return NextResponse.json({ error: "userIdが必要です" }, { status: 400 });
        }

        const user = await getUserByIdFromFirestore(userId);
        if (!user) return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });

        const updated = { ...user, name, phone, email, address };
        await saveUserToFirestore(updated);

        const { password, ...safeUser } = updated;
        return NextResponse.json({ success: true, ...safeUser });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
