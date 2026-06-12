// VOWCHA（ACTIVA社）連携：紹介料・請求書・売掛管理の共通型
export const VOWCHA_REFERRALS = "vowchaReferrals";
export const VOWCHA_INVOICES = "vowchaInvoices";
export const VOWCHA_SETTINGS_COLLECTION = "config";
export const VOWCHA_SETTINGS_DOC = "vowcha";

export interface VowchaSettings {
    referralFee: number;          // 紹介料単価（円/店舗・税抜）
    taxRate: number;              // 消費税率（%）
    activaName: string;           // 請求先名
    activaAddress?: string;
    jocollaName: string;          // 発行元名
    jocollaAddress?: string;
    invoiceRegistrationNumber?: string; // 適格請求書発行事業者番号（T番号）
    bankInfo?: string;            // 振込先
    paymentTermsDays: number;     // 支払期限（発行から日数）
    updatedAt?: string;
}

export const DEFAULT_VOWCHA_SETTINGS: VowchaSettings = {
    referralFee: 10000,
    taxRate: 10,
    activaName: "株式会社ACTIVA",
    activaAddress: "",
    jocollaName: "株式会社JOCOLLA Studi-Go事業部",
    jocollaAddress: "",
    invoiceRegistrationNumber: "",
    bankInfo: "",
    paymentTermsDays: 30,
};

// 紹介対象店舗（VOWCHA同意済み店舗）
export interface VowchaReferral {
    id: string;
    studioId: string;
    storeName: string;
    postalCode?: string;
    address?: string;
    phone?: string;
    email?: string;
    contactPerson?: string;
    consentAt: string;            // VOWCHA利用同意日時
    source: "intake" | "sync" | "manual";
    createdAt: string;
    exportedAt?: string | null;   // ACTIVAへの情報提供（CSV出力）日時
    invoiceId?: string | null;    // 紹介料を計上した請求書ID
}

export interface VowchaInvoiceItem {
    referralId: string;
    storeName: string;
    fee: number; // 税抜
}

export interface VowchaInvoice {
    id: string;
    invoiceNo: string;            // 例: VW-202606-001
    items: VowchaInvoiceItem[];
    subtotal: number;             // 税抜合計
    tax: number;
    total: number;                // 税込合計
    taxRate: number;
    status: "issued" | "paid";    // 発行済み（売掛） / 入金済み
    issuedAt: string;
    dueDate: string;
    paidAt?: string | null;
    note?: string;
}

export function referralStatus(r: VowchaReferral): "未提供" | "提供済" | "請求済" {
    if (r.invoiceId) return "請求済";
    if (r.exportedAt) return "提供済";
    return "未提供";
}
