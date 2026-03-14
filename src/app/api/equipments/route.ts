import { NextResponse } from "next/server";
import { getStudioByIdFromFirestore, saveStudioToFirestore } from "@/lib/db-firestore";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const studioId = searchParams.get("studioId");
        if (!studioId) return NextResponse.json({ error: "studioIdが必要です" }, { status: 400 });

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        return NextResponse.json(studio.equipmentOptions ?? []);
    } catch (error) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studioId, name, price, priceType } = body;

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        const newEquipment = {
            name: name || "新規オプション機材",
            pricePerHour: parseInt(price) || 500,
        };

        const updated = { ...studio, equipmentOptions: [...(studio.equipmentOptions ?? []), newEquipment] };
        await saveStudioToFirestore(updated);
        return NextResponse.json(newEquipment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { studioId, originalName, name, price } = body;

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        const updatedEquipments = (studio.equipmentOptions ?? []).map((e) =>
            e.name === originalName ? { ...e, name, pricePerHour: parseInt(price) || 0 } : e
        );

        await saveStudioToFirestore({ ...studio, equipmentOptions: updatedEquipments });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const studioId = searchParams.get("studioId");
        const name = searchParams.get("name");

        if (!studioId || !name) return NextResponse.json({ error: "studioId・nameが必要です" }, { status: 400 });

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        const updated = (studio.equipmentOptions ?? []).filter((e) => e.name !== name);
        await saveStudioToFirestore({ ...studio, equipmentOptions: updated });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
