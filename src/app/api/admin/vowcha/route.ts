// 運営：VOWCHA連携の概要取得・設定更新
import { NextResponse } from "next/server";
import { initializeAdmin } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";
import {
    VOWCHA_REFERRALS, VOWCHA_INVOICES, VOWCHA_SETTINGS_COLLECTION, VOWCHA_SETTINGS_DOC,
    DEFAULT_VOWCHA_SETTINGS, type VowchaSettings,
} from "@/lib/vowcha";

export const dynamic = "force-dynamic";

export async function GET() {
    const denied = await requirePlatformAdmin();
    if (denied) return denied;

    try {
        const db = initializeAdmin();
        const [settingsSnap, referralsSnap, invoicesSnap] = await Promise.all([
            db.collection(VOWCHA_SETTINGS_COLLECTION).doc(VOWCHA_SETTINGS_DOC).get(),
            db.collection(VOWCHA_REFERRALS).orderBy("createdAt", "desc").get(),
            db.collection(VOWCHA_INVOICES).orderBy("issuedAt", "desc").get(),
        ]);

        const settings: VowchaSettings = settingsSnap.exists
            ? { ...DEFAULT_VOWCHA_SETTINGS, ...(settingsSnap.data() as Partial<VowchaSettings>) }
            : DEFAULT_VOWCHA_SETTINGS;

        return NextResponse.json({
            settings,
            referrals: referralsSnap.docs.map((d) => d.data()),
            invoices: invoicesSnap.docs.map((d) => d.data()),
        });
    } catch (error: any) {
        console.error("【VOWCHA概要APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const denied = await requirePlatformAdmin();
    if (denied) return denied;

    try {
        const body = await request.json();
        const patch: Partial<VowchaSettings> = {
            referralFee: Number(body.referralFee) || 0,
            taxRate: Number(body.taxRate ?? 10),
            paymentTermsDays: Number(body.paymentTermsDays ?? 30),
            activaName: body.activaName ?? DEFAULT_VOWCHA_SETTINGS.activaName,
            activaAddress: body.activaAddress ?? "",
            jocollaName: body.jocollaName ?? DEFAULT_VOWCHA_SETTINGS.jocollaName,
            jocollaAddress: body.jocollaAddress ?? "",
            invoiceRegistrationNumber: body.invoiceRegistrationNumber ?? "",
            bankInfo: body.bankInfo ?? "",
            updatedAt: new Date().toISOString(),
        };

        const db = initializeAdmin();
        await db.collection(VOWCHA_SETTINGS_COLLECTION).doc(VOWCHA_SETTINGS_DOC).set(patch, { merge: true });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("【VOWCHA設定APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
