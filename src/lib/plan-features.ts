/**
 * Studi-Go プラン機能マップ
 * 全機能一覧表（PDF）に完全対応したプラン定義・機能ゲーティングユーティリティ
 */

// ===== プランID定義 =====
export type PlanKey = "free" | "light" | "standard" | "pro";

// ===== 機能フラグキー =====
export type FeatureKey =
    // ── 予約管理 ──
    | "booking_calendar"         // リアルタイム予約カレンダー
    | "booking_manual"           // 予約の手動作成・編集
    | "booking_cancel"           // 予約キャンセル処理
    | "blocked_slots"            // ブロック枠（メンテナンス・レッスン等）
    | "booking_csv_export"       // 予約データCSVエクスポート
    | "booking_csv_import"       // 予約データCSVインポート
    | "recurring_booking"        // 定期予約／月額会員
    // ── 管理・集計 ──
    | "customer_list"            // 顧客一覧表示
    | "customer_search"          // 顧客検索
    | "customer_detail"          // 顧客詳細（利用履歴）
    | "customer_rank"            // 顧客ランク管理
    // ── 決済・売上 ──
    | "stripe_payment"           // Stripe決済連携
    | "sales_report"             // 売上レポート
    | "monthly_report"           // 月次レポート
    | "invoice_receipt"          // 請求書・領収書発行
    | "sales_target"             // 売上目標設定
    // ── 顧客管理 ──
    | "customer_csv_export"      // 顧客データCSVエクスポート
    | "customer_csv_import"      // 顧客データCSVインポート
    | "booking_history"          // 予約履歴閲覧
    // ── マーケティング ──
    | "blacklist"                // ブラックリスト機能
    | "coupon"                   // クーポン発行
    | "student_discount"         // 学割設定
    | "reservation_benefit"      // 予約特典設定
    | "voucha"                   // VOUCHA連携
    // ── 店舗設定 ──
    | "payment_method"           // 支払方法設定
    | "top_page_listing"         // トップページ掲載
    | "equipment_options"        // 機材・オプション追加
    | "multi_room"               // 複数部屋管理
    // ── 予約（ユーザー向け設定） ──
    | "personal_practice"        // 個人練習設定
    | "booking_confirm_email"    // 予約確定メール送信
    | "auto_reminder_email"      // 自動リマインドメール
    | "waitlist"                 // キャンセル待ち登録
    // ── 決済（ユーザー向け） ──
    | "credit_card_payment"      // クレジットカード決済
    | "split_payment"            // 割り勘決済（バンドメンバー）
    | "coupon_apply"             // クーポン適用
    | "activa_usage"             // ACTIVA利用
    // ── スタッフ管理 ──
    | "staff_account"            // スタッフアカウント追加
    | "staff_permission"         // 権限管理
    | "staff_schedule"           // スタッフスケジュール管理
    | "staff_password"           // パスワード管理
    // ── 通知・メール ──
    | "email_notification"       // 予約確認メール自動送信
    | "promo_email_template"     // 販促メールテンプレート
    // ── ブランディング・デザイン ──
    | "email_template_design"    // メールテンプレート変更
    | "page_design"              // ページカラー・ロゴ変更
    // ── 分析 ──
    | "heatmap"                  // ヒートマップ分析
    | "kpi_analysis"             // KPI分析
    // ── 外部連携 ──
    | "line_login"               // LINE連携
    | "api_access"               // API連携
    // ── サポート ──
    | "basic_support"            // 通常サポート
    | "priority_support"         // 優先サポート
    | "setup_support";           // 導入支援

// ===== プラン別の機能マップ =====
const FEATURE_MAP: Record<FeatureKey, Record<PlanKey, boolean>> = {
    // ── 予約管理 ──
    booking_calendar:       { free: true,  light: true,  standard: true,  pro: true  },
    booking_manual:         { free: true,  light: true,  standard: true,  pro: true  },
    booking_cancel:         { free: true,  light: true,  standard: true,  pro: true  },
    blocked_slots:          { free: true,  light: true,  standard: true,  pro: true  },
    booking_csv_export:     { free: false, light: true,  standard: true,  pro: true  },
    booking_csv_import:     { free: false, light: true,  standard: true,  pro: true  },
    recurring_booking:      { free: false, light: false, standard: false, pro: true  },
    // ── 管理・集計 ──
    customer_list:          { free: true,  light: true,  standard: true,  pro: true  },
    customer_search:        { free: true,  light: true,  standard: true,  pro: true  },
    customer_detail:        { free: false, light: true,  standard: true,  pro: true  },
    customer_rank:          { free: false, light: false, standard: false, pro: true  },
    // ── 決済・売上 ──
    stripe_payment:         { free: false, light: true,  standard: true,  pro: true  },
    sales_report:           { free: false, light: true,  standard: true,  pro: true  },
    monthly_report:         { free: false, light: false, standard: true,  pro: true  },
    invoice_receipt:        { free: false, light: false, standard: true,  pro: true  },
    sales_target:           { free: false, light: false, standard: true,  pro: true  },
    // ── 顧客管理 ──
    customer_csv_export:    { free: false, light: true,  standard: true,  pro: true  },
    customer_csv_import:    { free: false, light: true,  standard: true,  pro: true  },
    booking_history:        { free: true,  light: true,  standard: true,  pro: true  },
    // ── マーケティング ──
    blacklist:              { free: true,  light: true,  standard: true,  pro: true  },
    coupon:                 { free: false, light: false, standard: true,  pro: true  },
    student_discount:       { free: false, light: false, standard: true,  pro: true  },
    reservation_benefit:    { free: false, light: false, standard: true,  pro: true  },
    voucha:                 { free: false, light: false, standard: false, pro: true  },
    // ── 店舗設定 ──
    payment_method:         { free: true,  light: true,  standard: true,  pro: true  },
    top_page_listing:       { free: true,  light: true,  standard: true,  pro: true  },
    equipment_options:      { free: false, light: true,  standard: true,  pro: true  },
    multi_room:             { free: false, light: true,  standard: true,  pro: true  },
    // ── 予約（ユーザー向け設定） ──
    personal_practice:      { free: false, light: false, standard: true,  pro: true  },
    booking_confirm_email:  { free: false, light: true,  standard: true,  pro: true  },
    auto_reminder_email:    { free: false, light: false, standard: true,  pro: true  },
    waitlist:               { free: false, light: false, standard: false, pro: true  },
    // ── 決済（ユーザー向け） ──
    credit_card_payment:    { free: false, light: true,  standard: true,  pro: true  },
    split_payment:          { free: false, light: true,  standard: true,  pro: true  },
    coupon_apply:           { free: false, light: false, standard: true,  pro: true  },
    activa_usage:           { free: false, light: false, standard: false, pro: true  },
    // ── スタッフ管理 ──
    staff_account:          { free: false, light: false, standard: true,  pro: true  },
    staff_permission:       { free: false, light: false, standard: true,  pro: true  },
    staff_schedule:         { free: false, light: false, standard: true,  pro: true  },
    staff_password:         { free: false, light: false, standard: true,  pro: true  },
    // ── 通知・メール ──
    email_notification:     { free: false, light: true,  standard: true,  pro: true  },
    promo_email_template:   { free: false, light: false, standard: false, pro: true  },
    // ── ブランディング・デザイン ──
    email_template_design:  { free: false, light: false, standard: true,  pro: true  },
    page_design:            { free: false, light: true,  standard: true,  pro: true  },
    // ── 分析 ──
    heatmap:                { free: false, light: false, standard: true,  pro: true  },
    kpi_analysis:           { free: false, light: false, standard: true,  pro: true  },
    // ── 外部連携 ──
    line_login:             { free: false, light: false, standard: false, pro: true  },
    api_access:             { free: false, light: false, standard: false, pro: true  },
    // ── サポート ──
    basic_support:          { free: true,  light: true,  standard: true,  pro: true  },
    priority_support:       { free: false, light: false, standard: false, pro: true  },
    setup_support:          { free: false, light: false, standard: false, pro: true  },
};

// ===== プラン別の制限値 =====
export interface PlanLimits {
    roomLimit: number;       // ルーム数上限 (Infinity = 無制限)
    locationLimit: number;   // 拠点数上限
    bookingFeeRate: number;  // 予約手数料率 (0.05 = 5%)
    showLogo: boolean;       // Studi-Goロゴ表示
    customerListLimit: number; // 顧客一覧表示上限 (Infinity = 無制限)
}

const PLAN_LIMITS: Record<PlanKey, PlanLimits> = {
    free:     { roomLimit: 1,        locationLimit: 1,        bookingFeeRate: 0.05, showLogo: true,  customerListLimit: 50       },
    light:    { roomLimit: 5,        locationLimit: 1,        bookingFeeRate: 0,    showLogo: false, customerListLimit: 200      },
    standard: { roomLimit: 15,       locationLimit: 2,        bookingFeeRate: 0,    showLogo: false, customerListLimit: Infinity },
    pro:      { roomLimit: Infinity, locationLimit: Infinity, bookingFeeRate: 0,    showLogo: false, customerListLimit: Infinity },
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
    { id: "light",    name: "ライト",       price: 4980,  color: "#22c55e", emoji: "🟢", description: "小規模スタジオ向け（5ルームまで）" },
    { id: "standard", name: "スタンダード", price: 9800,  color: "#f97316", emoji: "🟠", description: "中規模スタジオ向け（15ルーム / 2拠点）" },
    { id: "pro",      name: "プロ",         price: 14800, color: "#eab308", emoji: "🟡", description: "大規模・複数拠点向け（無制限）" },
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
    { id: "custom_domain", name: "カスタムドメイン",   content: "独自ドメインで運用",       price: 1000,  billingType: "monthly" },
    { id: "setup_support",  name: "店舗設定サポート",   content: "初期設定・登録代行",       price: 12000, billingType: "once" },
    { id: "api_access_opt", name: "API連携オプション",  content: "外部システムとのAPI連携",   price: 3000,  billingType: "monthly", note: "Proプラン限定" },
];

// ===== 機能の表示名（比較表用） =====
export const FEATURE_LABELS: Record<FeatureKey, string> = {
    // 予約管理
    booking_calendar:      "リアルタイム予約カレンダー",
    booking_manual:        "予約の手動作成・編集",
    booking_cancel:        "予約キャンセル処理",
    blocked_slots:         "ブロック枠（メンテナンス・レッスン等）",
    booking_csv_export:    "予約データCSVエクスポート",
    booking_csv_import:    "予約データCSVインポート",
    recurring_booking:     "定期予約／月額会員",
    // 管理・集計
    customer_list:         "顧客一覧表示",
    customer_search:       "顧客検索",
    customer_detail:       "顧客詳細（利用履歴）",
    customer_rank:         "顧客ランク管理",
    // 決済・売上
    stripe_payment:        "Stripe決済連携",
    sales_report:          "売上レポート",
    monthly_report:        "月次レポート",
    invoice_receipt:       "請求書・領収書発行",
    sales_target:          "売上目標設定",
    // 顧客管理
    customer_csv_export:   "顧客データCSVエクスポート",
    customer_csv_import:   "顧客データCSVインポート",
    booking_history:       "予約履歴閲覧",
    // マーケティング
    blacklist:             "ブラックリスト機能",
    coupon:                "クーポン発行",
    student_discount:      "学割設定",
    reservation_benefit:   "予約特典設定",
    voucha:                "VOUCHA連携",
    // 店舗設定
    payment_method:        "支払方法設定",
    top_page_listing:      "トップページ掲載",
    equipment_options:     "機材・オプション追加",
    multi_room:            "複数部屋管理",
    // 予約（ユーザー向け設定）
    personal_practice:     "個人練習設定",
    booking_confirm_email: "予約確定メール送信",
    auto_reminder_email:   "自動リマインドメール",
    waitlist:              "キャンセル待ち登録",
    // 決済（ユーザー向け）
    credit_card_payment:   "クレジットカード決済",
    split_payment:         "割り勘決済（バンドメンバー）",
    coupon_apply:          "クーポン適用",
    activa_usage:          "ACTIVA利用",
    // スタッフ管理
    staff_account:         "スタッフアカウント追加",
    staff_permission:      "権限管理",
    staff_schedule:        "スタッフスケジュール管理",
    staff_password:        "パスワード管理",
    // 通知・メール
    email_notification:    "予約確認メール自動送信",
    promo_email_template:  "販促メールテンプレート",
    // ブランディング・デザイン
    email_template_design: "メールテンプレート変更",
    page_design:           "ページカラー・ロゴ変更",
    // 分析
    heatmap:               "ヒートマップ分析",
    kpi_analysis:          "KPI分析",
    // 外部連携
    line_login:            "LINE連携",
    api_access:            "API連携",
    // サポート
    basic_support:         "通常サポート（メール）",
    priority_support:      "優先サポート",
    setup_support:         "導入支援",
};

// ===== 機能カテゴリ（比較表のセクション） =====
export const FEATURE_CATEGORIES: { title: string; keys: FeatureKey[] }[] = [
    {
        title: "予約管理",
        keys: ["booking_calendar", "booking_manual", "booking_cancel", "blocked_slots", "booking_csv_export", "booking_csv_import", "recurring_booking"],
    },
    {
        title: "管理・集計",
        keys: ["customer_list", "customer_search", "customer_detail", "customer_rank"],
    },
    {
        title: "決済・売上",
        keys: ["stripe_payment", "sales_report", "monthly_report", "invoice_receipt", "sales_target"],
    },
    {
        title: "顧客管理",
        keys: ["customer_csv_export", "customer_csv_import", "booking_history"],
    },
    {
        title: "マーケティング",
        keys: ["blacklist", "coupon", "student_discount", "reservation_benefit", "voucha"],
    },
    {
        title: "店舗設定",
        keys: ["payment_method", "top_page_listing", "equipment_options", "multi_room"],
    },
    {
        title: "予約設定",
        keys: ["personal_practice", "booking_confirm_email", "auto_reminder_email", "waitlist"],
    },
    {
        title: "決済機能",
        keys: ["credit_card_payment", "split_payment", "coupon_apply", "activa_usage"],
    },
    {
        title: "スタッフ管理",
        keys: ["staff_account", "staff_permission", "staff_schedule", "staff_password"],
    },
    {
        title: "通知・メール",
        keys: ["email_notification", "promo_email_template"],
    },
    {
        title: "ブランディング・デザイン",
        keys: ["email_template_design", "page_design"],
    },
    {
        title: "分析",
        keys: ["heatmap", "kpi_analysis"],
    },
    {
        title: "外部連携",
        keys: ["line_login", "api_access"],
    },
    {
        title: "サポート",
        keys: ["basic_support", "priority_support", "setup_support"],
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
    if (plan !== "free" && trialEndDate && isInFreeTrial(trialEndDate)) {
        return plan;
    }
    return plan;
}
