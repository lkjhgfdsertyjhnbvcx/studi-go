import { NextResponse } from "next/server";
import { saveStudioToFirestore } from "@/lib/db-firestore";
import { createEmptyStudio } from "@/lib/db-studio";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newStudio = {
            ...createEmptyStudio(),
            storeName: body.name,
        };

        await saveStudioToFirestore(newStudio);
        return NextResponse.json({ id: newStudio.id, name: newStudio.storeName });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
