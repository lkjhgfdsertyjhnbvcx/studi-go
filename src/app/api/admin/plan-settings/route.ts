// /api/admin/plan-settings - プラン定義の読み書き（Client SDK使用）
import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SETTINGS_DOC_PATH = "settings/planConfig";

const DEFAULT_CONFIG = {
    plans: [
        { id: "free",     name: "フリー",       price: 0,     color: "#9ca3af", description: "お試し利用向け（1ルームまで）",          features: ["予約カレンダー・手動予約", "Stripe決済（手数料5%）", "顧客一覧・予約履歴", "クーポン発行（一部制限）", "VOUCHA連携", "予約確認メール", "ブラックリスト"] },
        { id: "light",    name: "ライト",       price: 2980,  color: "#22c55e", description: "小規模スタジオ向け（5ルームまで）",      features: ["フリーの全機能（手数料なし）", "売上レポート・予実管理", "CSVエクスポート", "スタッフ管理", "機材管理", "学割・キャンペーン", "ページデザイン変更", "KPIダッシュボード"] },
        { id: "standard", name: "スタンダード", price: 5980,  color: "#f97316", description: "中規模スタジオ向け（15ルーム / 2拠点）", features: ["ライトの全機能", "複数拠点管理（2拠点）", "ヒートマップ分析", "自動リマインドメール", "トップページ優先掲載"] },
        { id: "pro",      name: "プロ",         price: 12800, color: "#eab308", description: "大規模・複数拠点向け（無制限）",         features: ["スタンダードの全機能", "LINE連携", "API連携", "顧客ランク", "キャンセル待ち", "定期予約", "直前割引", "優先サポート", "ルーム・拠点無制限"] },
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
        const ref = doc(db, "settings", "planConfig");
        const snap = await getDoc(ref);
        if (!snap.exists()) {
            // ドキュメントがない → デフォルトを返す（書き込みは保存ボタンで行う）
            return NextResponse.json(DEFAULT_CONFIG);
        }
        const data = snap.data();

        // 古い3プラン構成の場合、デフォルト4プランを返す（Firestoreは上書きせず表示だけ切り替える）
        if (isOldPlanConfig(data)) {
            console.log("[plan-settings GET] 古いプラン構成を検出。デフォルト4プランを返します。");
            return NextResponse.json(DEFAULT_CONFIG);
        }

        return NextResponse.json({
            plans: Array.isArray(data.plans) ? data.plans : DEFAULT_CONFIG.plans,
            options: Array.isArray(data.options) ? data.options : DEFAULT_CONFIG.options,
        });
    } catch (error: any) {
        console.error("[plan-settings GET]", error);
        return NextResponse.json(DEFAULT_CONFIG);
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const ref = doc(db, "settings", "planConfig");

        // reset=true の場合、デフォルト設定を保存
        if (body.reset === true) {
            await setDoc(ref, DEFAULT_CONFIG);
            return NextResponse.json({ success: true, data: DEFAULT_CONFIG });
        }

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
