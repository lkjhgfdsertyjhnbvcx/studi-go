// 運営：VOWCHA利用ON（useActivaCoupon）の店舗を紹介料管理に同期
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { initializeAdmin } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";
import { VOWCHA_REFERRALS, type VowchaReferral } from "@/lib/vowcha";

export const dynamic = "force-dynamic";

export async function POST() {
    const denied = await requirePlatformAdmin();
    if (denied) return denied;

    try {
        const db = initializeAdmin();
        const [studiosSnap, referralsSnap] = await Promise.all([
            db.collection("studios").get(),
            db.collection(VOWCHA_REFERRALS).get(),
        ]);

        const existing = new Set(referralsSnap.docs.map((d) => (d.data() as VowchaReferral).studioId));
        const now = new Date().toISOString();
        let added = 0;

        const batch = db.batch();
        for (const doc of studiosSnap.docs) {
            const s = doc.data() as any;
            if (s.useActivaCoupon !== true || existing.has(doc.id)) continue;
            const id = uuidv4();
            const referral: VowchaReferral = {
                id,
                studioId: doc.id,
                storeName: s.storeName || "",
                postalCode: s.postalCode || "",
                address: s.address || "",
                phone: s.phone || "",
                email: s.email || "",
                contactPerson: s.contactPerson || s.manager || "",
                consentAt: s.createdAt || now,
                source: "sync",
                createdAt: now,
                exportedAt: null,
                invoiceId: null,
            };
            batch.set(db.collection(VOWCHA_REFERRALS).doc(id), referral);
            added++;
        }
        if (added > 0) await batch.commit();

        return NextResponse.json({ success: true, added });
    } catch (error: any) {
        console.error("【VOWCHA同期APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
