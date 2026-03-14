import { NextResponse } from "next/server";
import { getAllStudiosFromFirestore } from "@/lib/db-firestore";

export async function GET() {
    try {
        const studios = await getAllStudiosFromFirestore();

        // トップページが期待する形式に変換
        const stores = studios.map((studio) => ({
            id: studio.id,
            name: studio.storeName,
            prefecture: studio.address?.split("　")[0] ?? "",
            address: studio.address ?? "",
            description: studio.appealPoint ?? "",
            image: studio.images?.[0] ?? "",
            logoUrl: studio.logoUrl ?? "",
            studios: studio.rooms.map((r) => ({
                id: r.id,
                name: r.name,
                pricePerHour: r.basePrice,
            })),
        }));

        return NextResponse.json(stores);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}