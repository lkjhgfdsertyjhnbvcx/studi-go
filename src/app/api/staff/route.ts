import { NextResponse } from "next/server";
import { getStudioByIdFromFirestore, saveStudioToFirestore } from "@/lib/db-firestore";
import { v4 as uuidv4 } from "uuid";

function getStudioId(request: Request) {
    const { searchParams } = new URL(request.url);
    return searchParams.get("studioId") ?? "";
}

export async function GET(request: Request) {
    try {
        const studioId = getStudioId(request);
        if (!studioId) return NextResponse.json({ error: "studioIdが必要です" }, { status: 400 });

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        const safeStaff = (studio.staff ?? []).map(({ password, ...s }) => s);
        return NextResponse.json(safeStaff);
    } catch (error) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studioId, name, email, phone, role, password } = body;

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        const newStaff = {
            id: uuidv4(),
            name: name || "新規スタッフ",
            email: email || "",
            phone: phone || "",
            password: password || "",
            role: role || "staff" as const,
            createdAt: new Date().toISOString(),
        };

        const updated = { ...studio, staff: [...(studio.staff ?? []), newStaff] };
        await saveStudioToFirestore(updated);

        const { password: _pw, ...safeStaff } = newStaff;
        return NextResponse.json(safeStaff);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { studioId, id, name, email, phone, role } = body;

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        const updatedStaff = (studio.staff ?? []).map((s) =>
            s.id === id ? { ...s, name, email, phone, role } : s
        );

        await saveStudioToFirestore({ ...studio, staff: updatedStaff });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const studioId = searchParams.get("studioId");

        if (!id || !studioId) return NextResponse.json({ error: "id・studioIdが必要です" }, { status: 400 });

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        const updatedStaff = (studio.staff ?? []).filter((s) => s.id !== id);
        await saveStudioToFirestore({ ...studio, staff: updatedStaff });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
