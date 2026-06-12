// 運営：紹介料請求書の発行（未請求の選択店舗をまとめて1枚に）
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { initializeAdmin } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";
import {
    VOWCHA_REFERRALS, VOWCHA_INVOICES, VOWCHA_SETTINGS_COLLECTION, VOWCHA_SETTINGS_DOC,
    DEFAULT_VOWCHA_SETTINGS, type VowchaReferral, type VowchaSettings, type VowchaInvoice,
} from "@/lib/vowcha";

export const dynamic = "force-dynamic";

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
        const settingsSnap = await db.collection(VOWCHA_SETTINGS_COLLECTION).doc(VOWCHA_SETTINGS_DOC).get();
        const settings: VowchaSettings = settingsSnap.exists
            ? { ...DEFAULT_VOWCHA_SETTINGS, ...(settingsSnap.data() as Partial<VowchaSettings>) }
            : DEFAULT_VOWCHA_SETTINGS;

        const snaps = await Promise.all(ids.map((id) => db.collection(VOWCHA_REFERRALS).doc(id).get()));
        const referrals = snaps
            .filter((s) => s.exists)
            .map((s) => s.data() as VowchaReferral)
            .filter((r) => !r.invoiceId); // 二重請求防止

        if (referrals.length === 0) {
            return NextResponse.json({ error: "未請求の店舗がありません（すでに請求書発行済みです）" }, { status: 400 });
        }

        // 請求書番号: VW-YYYYMM-連番
        const now = new Date();
        const ym = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
        const countSnap = await db.collection(VOWCHA_INVOICES).where("invoiceNo", ">=", `VW-${ym}-`).where("invoiceNo", "<=", `VW-${ym}-999`).get();
        const seq = String(countSnap.size + 1).padStart(3, "0");
        const invoiceNo = `VW-${ym}-${seq}`;

        const items = referrals.map((r) => ({ referralId: r.id, storeName: r.storeName, fee: settings.referralFee }));
        const subtotal = items.reduce((sum, i) => sum + i.fee, 0);
        const tax = Math.floor(subtotal * settings.taxRate / 100);
        const due = new Date(now.getTime() + settings.paymentTermsDays * 24 * 60 * 60 * 1000);

        const invoice: VowchaInvoice = {
            id: uuidv4(),
            invoiceNo,
            items,
            subtotal,
            tax,
            total: subtotal + tax,
            taxRate: settings.taxRate,
            status: "issued",
            issuedAt: now.toISOString(),
            dueDate: due.toISOString().slice(0, 10),
            paidAt: null,
        };

        const batch = db.batch();
        batch.set(db.collection(VOWCHA_INVOICES).doc(invoice.id), invoice);
        for (const r of referrals) {
            batch.update(db.collection(VOWCHA_REFERRALS).doc(r.id), { invoiceId: invoice.id });
        }
        await batch.commit();

        return NextResponse.json({ success: true, invoice });
    } catch (error: any) {
        console.error("【VOWCHA請求書発行APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
