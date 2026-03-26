// /api/admin/plan-settings - プラン定義の読み書き（Client SDK使用）
import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SETTINGS_DOC_PATH = "settings/planConfig";

const DEFAULT_CONFIG = {
    plans: [
        { id: "free",     name: "フリー",       price: 0,     color: "#9ca3af", description: "お試し利用向け（1ルームまで）",          features: ["予約管理", "顧客管理", "メール通知", "クーポン発行", "1ルーム / 1拠点", "予約手数料5%"] },
        { id: "light",    name: "ライト",       price: 2980,  color: "#22c55e", description: "小規模スタジオ向け（5ルームまで）",      features: ["予約管理", "顧客管理", "メール通知", "売上レポート（基本）", "スタッフ管理", "ページデザイン変更", "5ルーム / 1拠点"] },
        { id: "standard", name: "スタンダード", price: 5980,  color: "#f97316", description: "中規模スタジオ向け（15ルーム / 2拠点）", features: ["ライトの全機能", "クーポン発行", "CSV出力", "自動リマインダーメール", "稼働率ヒートマップ", "トップページ優先掲載", "15ルーム / 2拠点"] },
        { id: "pro",      name: "プロ",         price: 12800, color: "#eab308", description: "大規模・複数拠点向け（無制限）",         features: ["スタンダードの全機能", "LINEログイン", "直前割引・タイムセール", "顧客ランク管理", "キャンセル待ち", "定期予約（月額会員）", "請求書払い対応", "優先サポート", "API連携", "ルーム・拠点無制限"] },
    ],
    options: [
        { id: "custom_domain",  name: "カスタムドメイン",   price: 1000,  billingType: "monthly" },
        { id: "setup_support",  name: "店舗設定サポート",   price: 12000, billingType: "once" },
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
