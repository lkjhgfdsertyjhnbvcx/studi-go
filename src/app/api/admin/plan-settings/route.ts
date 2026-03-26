// /api/admin/plan-settings - プラン定義の読み書き（Admin SDK使用）
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

const COLLECTION = "settings";
const DOC_ID = "planConfig";

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

// 古い3プラン構成かどうかを判定する関数
function isOldPlanConfig(data: any): boolean {
    if (!Array.isArray(data.plans)) return true;
    const planIds = data.plans.map((p: any) => p.id);
    const hasNewPlans = ["free", "light", "standard", "pro"].every(id => planIds.includes(id));
    if (!hasNewPlans) return true;
    if (Array.isArray(data.options)) {
        const hasSms = data.options.some((o: any) => o.name === "SMS通知" || o.id === "sms");
        if (hasSms) return true;
    }
    return false;
}

export async function GET() {
    try {
        const ref = adminDb.collection(COLLECTION).doc(DOC_ID);
        const snap = await ref.get();

        if (!snap.exists) {
            await ref.set(DEFAULT_CONFIG);
            return NextResponse.json(DEFAULT_CONFIG);
        }
        const data = snap.data()!;

        // 古い3プラン構成の場合、自動的にデフォルト4プランに上書きする
        if (isOldPlanConfig(data)) {
            console.log("[plan-settings GET] 古いプラン構成を検出。デフォルト4プランに自動修正します。");
            await ref.set(DEFAULT_CONFIG);
            return NextResponse.json(DEFAULT_CONFIG);
        }

        return NextResponse.json({
            plans: Array.isArray(data.plans) ? data.plans : DEFAULT_CONFIG.plans,
            options: Array.isArray(data.options) ? data.options : DEFAULT_CONFIG.options,
        });
    } catch (error: any) {
        console.error("[plan-settings GET] Error:", error);
        // エラー時でもデフォルトを返す（ページがクラッシュしないように）
        return NextResponse.json(DEFAULT_CONFIG);
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const ref = adminDb.collection(COLLECTION).doc(DOC_ID);

        // reset=true の場合、デフォルト設定に戻す
        if (body.reset === true) {
            await ref.set(DEFAULT_CONFIG);
            return NextResponse.json({ success: true, data: DEFAULT_CONFIG });
        }

        await ref.set({
            plans: Array.isArray(body.plans) ? body.plans : [],
            options: Array.isArray(body.options) ? body.options : [],
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[plan-settings PUT] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
