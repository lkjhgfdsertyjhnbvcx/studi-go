import { NextResponse } from "next/server";
import { getStudioByIdFromFirestore, saveStudioToFirestore } from "@/lib/db-firestore";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, name, companyName, ownerName, address, tel, url } = body;

        if (!id) return NextResponse.json({ error: "IDが必要です" }, { status: 400 });

        const existing = await getStudioByIdFromFirestore(id);
        if (!existing) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        const updated = {
            ...existing,
            storeName: name ?? existing.storeName,
            companyName: companyName ?? existing.companyName,
            representative: ownerName ?? existing.representative,
            address: address ?? existing.address,
            phone: tel ?? existing.phone,
            url: url ?? existing.url,
        };

        await saveStudioToFirestore(updated);
        return NextResponse.json({ success: true, store: updated });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}