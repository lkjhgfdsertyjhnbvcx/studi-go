// 運営：選択した店舗情報をACTIVA向けCSVとして出力し、提供済みにマーク
import { NextResponse } from "next/server";
import { initializeAdmin } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";
import { VOWCHA_REFERRALS, type VowchaReferral } from "@/lib/vowcha";

export const dynamic = "force-dynamic";

function csvEscape(v: string): string {
    if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
    return v;
}

export async function POST(request: Request) {
    const denied = await requirePlatformAdmin();
    if (denied) return denied;

    try {
        const body = await request.json();
        const ids: string[] = body.ids || [];
        if (ids.length === 0) {
            return NextResponse.json({ error: "店舗が選択されていません" }, { status: 400 });
        }

        const db = initializeAdmin();
        const snaps = await Promise.all(ids.map((id) => db.collection(VOWCHA_REFERRALS).doc(id).get()));
        const referrals = snaps.filter((s) => s.exists).map((s) => s.data() as VowchaReferral);

        const header = ["店舗名", "郵便番号", "住所", "電話番号", "メールアドレス", "担当者", "VOWCHA同意日", "Studi-Go店舗ID"];
        const rows = referrals.map((r) => [
            r.storeName, r.postalCode || "", r.address || "", r.phone || "", r.email || "",
            r.contactPerson || "", (r.consentAt || "").slice(0, 10), r.studioId,
        ].map(csvEscape).join(","));
        // ExcelでのUTF-8文字化け防止のためBOM付き
        const csv = "﻿" + [header.join(","), ...rows].join("\n");

        // 提供済みマーク
        const now = new Date().toISOString();
        const batch = db.batch();
        for (const r of referrals) {
            batch.update(db.collection(VOWCHA_REFERRALS).doc(r.id), { exportedAt: r.exportedAt || now });
        }
        await batch.commit();

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="vowcha_stores_${now.slice(0, 10)}.csv"`,
            },
        });
    } catch (error: any) {
        console.error("【VOWCHA CSVエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
