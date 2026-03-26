/**
 * Studi-Go プラン機能マップ
 * 画像の比較表に完全対応したプラン定義・機能ゲーティングユーティリティ
 */

// ===== プランID定義 =====
export type PlanKey = "free" | "light" | "standard" | "pro";

// ===== 機能フラグキー =====
export type FeatureKey =
    // 基本機能
    | "booking_management"
    | "customer_management"
    | "email_notification"
    | "coupon"
    | "csv_export"
    | "sales_report_basic"
    | "staff_management"
    | "auto_reminder_email"
    | "page_design"
    | "line_login"
    // 上位機能
    | "heatmap"
    | "top_page_priority"
    | "flash_discount"
    // プロ限定
    | "customer_rank"
    | "waitlist"
    | "recurring_booking"
    | "invoice_payment"
    | "priority_support"
    | "api_access";

// ===== プラン別の機能マップ =====
const FEATURE_MAP: Record<FeatureKey, Record<PlanKey, boolean>> = {
    // ── 基本機能 ──
    booking_management:   { free: true,  light: true,  standard: true,  pro: true  },
    customer_management:  { free: true,  light: true,  standard: true,  pro: true  },
    email_notification:   { free: true,  light: true,  standard: true,  pro: true  },
    coupon:               { free: true,  light: false, standard: true,  pro: true  },
    csv_export:           { free: false, light: false, standard: true,  pro: true  },
    sales_report_basic:   { free: false, light: true,  standard: true,  pro: true  },
    staff_management:     { free: false, light: true,  standard: true,  pro: true  },
    auto_reminder_email:  { free: false, light: false, standard: true,  pro: true  },
    page_design:          { free: false, light: true,  standard: true,  pro: true  },
    line_login:           { free: false, light: false, standard: false, pro: true  },
    // ── 上位機能 ──
    heatmap:              { free: false, light: false, standard: true,  pro: true  },
    top_page_priority:    { free: false, light: false, standard: true,  pro: true  },
    flash_discount:       { free: false, light: false, standard: false, pro: true  },
    // ── プロ限定 ──
    customer_rank:        { free: false, light: false, standard: false, pro: true  },
    waitlist:             { free: false, light: false, standard: false, pro: true  },
    recurring_booking:    { free: false, light: false, standard: false, pro: true  },
    invoice_payment:      { free: false, light: false, standard: false, pro: true  },
    priority_support:     { free: false, light: false, standard: false, pro: true  },
    api_access:           { free: false, light: false, standard: false, pro: true  },
};

// ===== プラン別の制限値 =====
export interface PlanLimits {
    roomLimit: number;       // ルーム数上限 (Infinity = 無制限)
    locationLimit: number;   // 拠点数上限
    bookingFeeRate: number;  // 予約手数料率 (0.05 = 5%)
    showLogo: boolean;       // Studi-Goロゴ表示
}

const PLAN_LIMITS: Record<PlanKey, PlanLimits> = {
    free:     { roomLimit: 1,        locationLimit: 1,        bookingFeeRate: 0.05, showLogo: true  },
    light:    { roomLimit: 5,        locationLimit: 1,        bookingFeeRate: 0,    showLogo: false },
    standard: { roomLimit: 15,       locationLimit: 2,        bookingFeeRate: 0,    showLogo: false },
    pro:      { roomLimit: Infinity, locationLimit: Infinity, bookingFeeRate: 0,    showLogo: false },
};

// ===== プラン基本情報 =====
export interface PlanInfo {
    id: PlanKey;
    name: string;
    price: number;
    color: string;
    emoji: string;
    description: string;
}

export const PLAN_DEFINITIONS: PlanInfo[] = [
    { id: "free",     name: "フリー",       price: 0,     color: "#9ca3af", emoji: "🔓", description: "お試し利用向け（1ルームまで）" },
    { id: "light",    name: "ライト",       price: 2980,  color: "#22c55e", emoji: "🟢", description: "小規模スタジオ向け（5ルームまで）" },
    { id: "standard", name: "スタンダード", price: 5980,  color: "#f97316", emoji: "🟠", description: "中規模スタジオ向け（15ルーム / 2拠点）" },
    { id: "pro",      name: "プロ",         price: 12800, color: "#eab308", emoji: "🟡", description: "大規模・複数拠点向け（無制限）" },
];

// ===== オプション定義 =====
export interface PlanOption {
    id: string;
    name: string;
    content: string;
    price: number;
    billingType: "monthly" | "once";
    note?: string;
}

export const PLAN_OPTIONS: PlanOption[] = [
    { id: "custom_domain", name: "カスタムドメイン", content: "独自ドメインで運用", price: 1000,  billingType: "monthly" },
    { id: "setup_support",  name: "店舗設定サポート", content: "初期設定・登録代行", price: 12000, billingType: "once" },
];

// ===== 機能の表示名（比較表用） =====
export const FEATURE_LABELS: Record<FeatureKey, string> = {
    booking_management:  "予約管理",
    customer_management: "顧客管理",
    email_notification:  "メール通知（確認）",
    coupon:              "クーポン発行",
    csv_export:          "CSV出力",
    sales_report_basic:  "売上レポート（基本）",
    staff_management:    "スタッフ管理",
    auto_reminder_email: "自動リマインダーメール",
    page_design:         "ページデザイン変更",
    line_login:          "LINEログイン",
    heatmap:             "稼働率ヒートマップ",
    top_page_priority:   "トップページ優先掲載",
    flash_discount:      "直前割引・タイムセール",
    customer_rank:       "顧客ランク管理",
    waitlist:            "キャンセル待ち機能",
    recurring_booking:   "定期予約（月額会員）",
    invoice_payment:     "請求書払い対応",
    priority_support:    "優先サポート",
    api_access:          "API連携",
};

// ===== 機能カテゴリ（比較表のセクション） =====
export const FEATURE_CATEGORIES: { title: string; keys: FeatureKey[] }[] = [
    {
        title: "基本機能",
        keys: ["booking_management", "customer_management", "email_notification", "coupon", "csv_export", "sales_report_basic", "staff_management", "auto_reminder_email", "page_design", "line_login"],
    },
    {
        title: "上位機能",
        keys: ["heatmap", "top_page_priority", "flash_discount"],
    },
    {
        title: "プロ限定",
        keys: ["customer_rank", "waitlist", "recurring_booking", "invoice_payment", "priority_support", "api_access"],
    },
];

// ===== ユーティリティ関数 =====

/** 有効なPlanKeyかどうかを判定 */
export function isValidPlanKey(key: string | null | undefined): key is PlanKey {
    return key === "free" || key === "light" || key === "standard" || key === "pro";
}

/** planKeyを正規化（不正値はfreeにフォールバック） */
export function normalizePlanKey(key: string | null | undefined): PlanKey {
    return isValidPlanKey(key) ? key : "free";
}

/** 指定プランで機能が使えるかチェック */
export function canUseFeature(planKey: string | null | undefined, feature: FeatureKey): boolean {
    const plan = normalizePlanKey(planKey);
    return FEATURE_MAP[feature]?.[plan] ?? false;
}

/** 指定プランの制限値を取得 */
export function getPlanLimits(planKey: string | null | undefined): PlanLimits {
    return PLAN_LIMITS[normalizePlanKey(planKey)];
}

/** 指定プランの基本情報を取得 */
export function getPlanInfo(planKey: string | null | undefined): PlanInfo {
    const key = normalizePlanKey(planKey);
    return PLAN_DEFINITIONS.find(p => p.id === key) || PLAN_DEFINITIONS[0];
}

/** 無料トライアル中かどうかを判定 */
export function isInFreeTrial(trialEndDate: string | null | undefined): boolean {
    if (!trialEndDate) return false;
    return new Date(trialEndDate) > new Date();
}

/** 店舗の有効プランを取得（トライアル考慮） */
export function getEffectivePlan(
    planKey: string | null | undefined,
    trialEndDate?: string | null
): PlanKey {
    const plan = normalizePlanKey(planKey);
    // トライアル中なら設定されたプランを有効とする
    if (plan !== "free" && trialEndDate && isInFreeTrial(trialEndDate)) {
        return plan;
    }
    return plan;
}
