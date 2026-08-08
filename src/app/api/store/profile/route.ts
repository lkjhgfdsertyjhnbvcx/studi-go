// 店舗の基本情報（店名・会社名・代表者・住所・電話・URL）の更新。
//
// 260807: 認証チェックが無く、body の id を差し替えるだけで**任意の店舗の情報を
// 書き換えられる**状態だった（IDOR）。/api/store/update-full と同じく、
// 管理者 or 当該スタジオのオーナーに限定する。
import { NextResponse } from "next/server";
import { getStudioByIdFromFirestore, saveStudioToFirestore } from "@/lib/db-firestore";
import { getApiAuth } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const auth = await getApiAuth();
        const body = await request.json();
        const { id, name, companyName, ownerName, address, tel, url } = body;

        if (!id) return NextResponse.json({ error: "IDが必要です" }, { status: 400 });

        if (!auth.isAdmin && auth.studioId !== id) {
            return NextResponse.json({ error: "権限がありません" }, { status: 403 });
        }

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