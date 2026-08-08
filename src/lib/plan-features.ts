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

// ===== プラン別の機能マップ（PDF全機能一覧に完全準拠） =====
const FEATURE_MAP: Record<FeatureKey, Record<PlanKey, boolean>> = {
    // ── 予約管理 ──
    booking_calendar:       { free: true,  light: true,  standard: true,  pro: true  },
    booking_manual:         { free: true,  light: true,  standard: true,  pro: true  },
    booking_cancel:         { free: true,  light: true,  standard: true,  pro: true  },
    blocked_slots:          { free: true,  light: true,  standard: true,  pro: true  },
    booking_csv_export:     { free: false, light: true,  standard: true,  pro: true  }, // Light+
    booking_csv_import:     { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    recurring_booking:      { free: false, light: false, standard: false, pro: true  }, // Pro
    // ── 顧客管理 ──
    // 顧客一覧そのものは全プランで使える（公開しているプラン比較表でも「顧客管理 ✓」）。
    // フリーは PLAN_LIMITS.customerListLimit（50件）で表示件数を絞る。
    customer_list:          { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン（フリーは50件まで）
    customer_search:        { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    customer_detail:        { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン（予約履歴閲覧）
    customer_rank:          { free: false, light: false, standard: false, pro: true  }, // Pro
    // ── 決済・売上 ──
    stripe_payment:         { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン（Freeは手数料5%）
    sales_report:           { free: false, light: true,  standard: true,  pro: true  }, // Light+
    monthly_report:         { free: false, light: true,  standard: true,  pro: true  }, // Light+（売上レポートに含む）
    invoice_receipt:        { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    sales_target:           { free: false, light: true,  standard: true,  pro: true  }, // Light+（予実管理）
    // ── 顧客データ ──
    customer_csv_export:    { free: false, light: true,  standard: true,  pro: true  }, // Light+
    customer_csv_import:    { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    booking_history:        { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    // ── マーケティング ──
    blacklist:              { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    coupon:                 { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン（Freeは一部制限あり）
    student_discount:       { free: false, light: true,  standard: true,  pro: true  }, // Light+
    reservation_benefit:    { free: false, light: true,  standard: true,  pro: true  }, // Light+（その他割引設定）
    voucha:                 { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン（利用登録が必要）
    // ── 店舗設定 ──
    payment_method:         { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    top_page_listing:       { free: false, light: false, standard: true,  pro: true  }, // Standard+（優先掲載）
    equipment_options:      { free: false, light: true,  standard: true,  pro: true  }, // Light+
    multi_room:             { free: false, light: true,  standard: true,  pro: true  }, // Light+
    // ── 予約（ユーザー向け設定） ──
    personal_practice:      { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    booking_confirm_email:  { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    auto_reminder_email:    { free: false, light: false, standard: true,  pro: true  }, // Standard+
    waitlist:               { free: false, light: false, standard: false, pro: true  }, // Pro
    // ── 決済（ユーザー向け） ──
    credit_card_payment:    { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    split_payment:          { free: false, light: true,  standard: true,  pro: true  }, // Light+（260808変更）
    coupon_apply:           { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    activa_usage:           { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン（ACTIVA登録ユーザー対象）
    // ── スタッフ管理 ──
    staff_account:          { free: false, light: true,  standard: true,  pro: true  }, // Light+
    staff_permission:       { free: false, light: true,  standard: true,  pro: true  }, // Light+
    staff_schedule:         { free: false, light: true,  standard: true,  pro: true  }, // Light+
    // 260808: 承認時に仮パスワードを発行し「スタッフ管理から変更してください」と
    // 案内する運用にしたため、パスワード変更をプランで塞ぐと
    // フリー店舗が仮パスワードのまま変えられなくなる。全プランで開放する。
    // 「スタッフを追加できるか」は staff_account 側で引き続き制限する。
    staff_password:         { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン（自分のパスワード変更）
    // ── 通知・メール ──
    email_notification:     { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    promo_email_template:   { free: false, light: false, standard: false, pro: true  }, // Pro（販促メール）
    // ── ブランディング・デザイン ──
    email_template_design:  { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン（メールテンプレート設定）
    page_design:            { free: false, light: true,  standard: true,  pro: true  }, // Light+
    // ── 分析 ──
    heatmap:                { free: false, light: false, standard: true,  pro: true  }, // Standard+
    kpi_analysis:           { free: false, light: true,  standard: true,  pro: true  }, // Light+
    // ── 外部連携 ──
    line_login:             { free: false, light: false, standard: false, pro: true  }, // Pro標準。Light/Standardは買い切りオプション(line_booking_opt)で利用可
    api_access:             { free: false, light: false, standard: false, pro: true  }, // Pro
    // ── サポート ──
    basic_support:          { free: true,  light: true,  standard: true,  pro: true  }, // 全プラン
    priority_support:       { free: false, light: false, standard: false, pro: true  }, // Pro
    setup_support:          { free: false, light: false, standard: false, pro: true  }, // オプション（別途¥12,000）
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
    // 260808: フリーのルーム上限を 1 → 5（ライトと同じ）に緩和。
    // 2部屋以上のスタジオが「試すことすらできない」状態で、乗り換え検討層を
    // 入口で失っていた。差別化は部屋数ではなく、手数料と運営機能で行う。
    free:     { roomLimit: 5,        locationLimit: 1,        bookingFeeRate: 0.05, showLogo: true,  customerListLimit: 50       },
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
    { id: "custom_domain", name: "カスタムドメイン",   content: "独自ドメインで運用",       price: 1000,  billingType: "monthly" },
    { id: "setup_support",  name: "店舗設定サポート",   content: "初期設定・登録代行",       price: 12000, billingType: "once" },
    { id: "api_access_opt", name: "API連携オプション",  content: "外部システムとのAPI連携",   price: 3000,  billingType: "monthly", note: "Proプラン限定" },
    { id: "line_booking_opt", name: "LINE予約・連携",  content: "お客様がLINEログインで予約", price: 9500,  billingType: "once", note: "ライト・スタンダード向け（プロは標準で込み）" },
];

// LINE予約・連携 買い切りオプションのID（ゲーティング判定で参照）
export const LINE_BOOKING_OPTION_ID = "line_booking_opt";

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
/**
 * 店舗ごとの機能例外。studios.featureOverrides に持たせる。
 * true = プランに関わらず使える / false = プランで使えても封じる
 */
export type FeatureOverrides = Partial<Record<FeatureKey, boolean>>;

export function canUseFeature(
    planKey: string | null | undefined,
    feature: FeatureKey,
    overrides?: FeatureOverrides | null,
): boolean {
    // 店舗ごとの例外を最優先する。
    //
    // 260808: プラン制限は仕様としては最初からあったが実装されていなかった。
    // あとから実装すると、すでにその機能を使って公開している店舗
    // （T.I.G Sounds のロゴ・背景、機材オプション）を巻き込んでしまう。
    // 日付での線引きより、店舗ごとのフラグのほうが後から融通が利くため
    // こちらを採用した。「乗り換え特典としてこの機能だけ開放する」等にも使える。
    const o = overrides?.[feature];
    if (typeof o === "boolean") return o;

    const plan = normalizePlanKey(planKey);
    return FEATURE_MAP[feature]?.[plan] ?? false;
}

/**
 * 店舗がLINE予約・連携を利用できるか。
 * - プロ: 標準で利用可（FEATURE_MAPのline_loginがpro=true）
 * - ライト/スタンダード: 買い切りオプション(line_booking_opt)を購入していれば利用可
 * - フリー: 利用不可
 */
export function canUseLineBooking(
    planKey: string | null | undefined,
    planOptions?: string[] | null
): boolean {
    const plan = normalizePlanKey(planKey);
    if (canUseFeature(plan, "line_login")) return true; // プロ標準
    if (plan === "free") return false;                  // フリーは購入不可
    return Array.isArray(planOptions) && planOptions.includes(LINE_BOOKING_OPTION_ID);
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
