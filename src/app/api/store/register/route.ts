import { NextResponse } from "next/server";
import { saveStudioToFirestore } from "@/lib/db-firestore";
import { createEmptyStudio } from "@/lib/db-studio";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newStudio = {
            ...createEmptyStudio(),
            storeName: body.name,
            email: body.email,
            staff: [
                {
                    id: crypto.randomUUID(),
                    name: body.name,
                    email: body.email,
                    password: body.password,
                    role: "admin" as const,
                    createdAt: new Date().toISOString(),
                },
            ],
        };

        await saveStudioToFirestore(newStudio);

        return NextResponse.json({ success: true, store: { id: newStudio.id, name: newStudio.storeName } });
    } catch (error: any) {
        console.error("【APIエラー詳細】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}