// 運営：請求書の取得・入金消込・取消
import { NextResponse } from "next/server";
import { initializeAdmin } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";
import {
    VOWCHA_REFERRALS, VOWCHA_INVOICES, VOWCHA_SETTINGS_COLLECTION, VOWCHA_SETTINGS_DOC,
    DEFAULT_VOWCHA_SETTINGS, type VowchaInvoice, type VowchaSettings,
} from "@/lib/vowcha";

export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const denied = await requirePlatformAdmin();
    if (denied) return denied;

    try {
        const { id } = await params;
        const db = initializeAdmin();
        const [snap, settingsSnap] = await Promise.all([
            db.collection(VOWCHA_INVOICES).doc(id).get(),
            db.collection(VOWCHA_SETTINGS_COLLECTION).doc(VOWCHA_SETTINGS_DOC).get(),
        ]);
        if (!snap.exists) return NextResponse.json({ error: "請求書が見つかりません" }, { status: 404 });

        const settings: VowchaSettings = settingsSnap.exists
            ? { ...DEFAULT_VOWCHA_SETTINGS, ...(settingsSnap.data() as Partial<VowchaSettings>) }
            : DEFAULT_VOWCHA_SETTINGS;

        return NextResponse.json({ invoice: snap.data(), settings });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 入金消込（status: paid）/ 差戻し（status: issued）
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const denied = await requirePlatformAdmin();
    if (denied) return denied;

    try {
        const { id } = await params;
        const body = await request.json();
        const status = body.status as "issued" | "paid";
        if (status !== "issued" && status !== "paid") {
            return NextResponse.json({ error: "不正なステータスです" }, { status: 400 });
        }

        const db = initializeAdmin();
        await db.collection(VOWCHA_INVOICES).doc(id).update({
            status,
            paidAt: status === "paid" ? new Date().toISOString() : null,
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 請求書の取消（紹介料レコードを未請求に戻す）
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const denied = await requirePlatformAdmin();
    if (denied) return denied;

    try {
        const { id } = await params;
        const db = initializeAdmin();
        const snap = await db.collection(VOWCHA_INVOICES).doc(id).get();
        if (!snap.exists) return NextResponse.json({ error: "請求書が見つかりません" }, { status: 404 });
        const invoice = snap.data() as VowchaInvoice;

        const batch = db.batch();
        for (const item of invoice.items) {
            batch.update(db.collection(VOWCHA_REFERRALS).doc(item.referralId), { invoiceId: null });
        }
        batch.delete(db.collection(VOWCHA_INVOICES).doc(id));
        await batch.commit();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
