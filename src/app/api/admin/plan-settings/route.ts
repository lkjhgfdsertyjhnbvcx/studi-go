// /api/admin/plan-settings - プラン定義の読み書き（Client SDK使用）
import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SETTINGS_DOC_PATH = "settings/planConfig";

const DEFAULT_CONFIG = {
    plans: [
        { id: "basic",    name: "ベーシック",    price: 3000,  color: "#6b7280", description: "小規模スタジオ向け",    features: ["予約管理", "顧客管理", "決済機能"] },
        { id: "standard", name: "スタンダード",  price: 8000,  color: "#7c3aed", description: "成長中のスタジオ向け",   features: ["予約管理", "顧客管理", "決済機能", "クーポン発行", "分析レポート"] },
        { id: "premium",  name: "プレミアム",    price: 15000, color: "#f59e0b", description: "大規模・複数拠点向け",   features: ["予約管理", "顧客管理", "決済機能", "クーポン発行", "分析レポート", "SMS通知", "専任サポート"] },
    ],
    options: [
        { id: "sms",           name: "SMS通知",         price: 1000 },
        { id: "custom_domain", name: "カスタムドメイン", price: 2000 },
        { id: "api_access",    name: "API連携",          price: 3000 },
    ]
};

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const ref = doc(db, "settings", "planConfig");
        const snap = await getDoc(ref);
        if (!snap.exists()) {
            return NextResponse.json(DEFAULT_CONFIG);
        }
        const data = snap.data();
        // Defensive: ensure plans and options arrays exist
        return NextResponse.json({
            plans: Array.isArray(data.plans) ? data.plans : DEFAULT_CONFIG.plans,
            options: Array.isArray(data.options) ? data.options : DEFAULT_CONFIG.options,
        });
    } catch (error: any) {
        console.error("[plan-settings GET]", error);
        // Return defaults on any error so the page doesn't crash
        return NextResponse.json(DEFAULT_CONFIG);
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const ref = doc(db, "settings", "planConfig");
        await setDoc(ref, {
            plans: Array.isArray(body.plans) ? body.plans : [],
            options: Array.isArray(body.options) ? body.options : [],
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[plan-settings PUT]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
