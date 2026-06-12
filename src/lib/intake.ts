// 店舗セットアップ（招待リンク方式）の共通型・変換ロジック
import { v4 as uuidv4 } from "uuid";
import type { StudioProfile } from "./db-studio";

export type IntakeStatus = "pending" | "in_progress" | "submitted" | "approved";

// 既存ダッシュボード（StoreDashboardContent）と同じ料金形式
export interface IntakeTimeSlot {
    start: string; // "10:00"
    end: string;   // "18:00"
    price: number;
}

export interface IntakeRoomPricing {
    weekday: IntakeTimeSlot[];
    saturday: IntakeTimeSlot[];
    sundayHoliday: IntakeTimeSlot[];
}

export interface IntakeRoom {
    id: string;
    name: string;
    description?: string;
    basePrice: number;                    // 基本料金（1時間・時間帯別未設定の時間に適用）
    startType?: "0min" | "30min";         // 予約開始タイミング
    pricing: IntakeRoomPricing;           // 時間帯別料金（任意）
    images: string[];
    // 旧形式（互換用・新規入力では未使用）
    saturdayPrice?: number;
    sundayPrice?: number;
}

export interface IntakeEquipment {
    name: string;
    pricePerHour: number;
    priceType: "per_use" | "per_hour";
    quantity?: number;
    category?: "amp" | "drums" | "mic" | "pa" | "guitar" | "bass" | "keys" | "other";
}

export interface IntakeDiscount {
    name: string;
    enabled: boolean;
    discountType: "amount" | "percentage";
    value: number;
}

export interface IntakePersonalPractice {
    enabled: boolean;
    maxPeople: number;
    pricePerHour?: number;   // 未設定なら通常料金
    advanceDays?: number;    // 何日前から予約可
    advanceHours?: number;   // 何時間前から予約可
}

export interface IntakeData {
    storeName: string;
    companyName?: string;
    representative?: string;
    contactPerson?: string;
    postalCode?: string;
    address: string;
    phone: string;
    email: string;
    url?: string;
    invoiceNumber?: string;  // インボイス登録番号（T番号）
    businessHours: { weekday: string; saturday: string; sundayHoliday: string };
    closedDays?: string;     // 定休日
    parkingInfo?: string;    // 駐車場情報
    appealPoint?: string;
    logoUrl?: string;
    bgImageUrl?: string;
    images: string[];
    rooms: IntakeRoom[];
    equipmentOptions: IntakeEquipment[];
    personalPracticeSettings: IntakePersonalPractice;
    studentDiscount: { enabled: boolean; discountType: "amount" | "percentage"; value: number };
    otherDiscounts: IntakeDiscount[];
    // VOWCHAクーポン（ACTIVA社への店舗情報提供に同意）。デフォルトON・任意で外せる
    useActivaCoupon: boolean;
}

export interface StoreIntake {
    id: string;             // 招待トークン（URLの一部）
    label: string;          // 運営が招待時につける店舗名（仮）
    note?: string;
    status: IntakeStatus;
    data: IntakeData | null;
    createdAt: string;
    updatedAt: string;
    submittedAt?: string;
    approvedAt?: string;
    studioId?: string;      // 承認後に紐付く studios のID
}

export const INTAKE_COLLECTION = "storeIntakes";

export function emptyPricing(): IntakeRoomPricing {
    return { weekday: [], saturday: [], sundayHoliday: [] };
}

export function emptyIntakeData(label: string): IntakeData {
    return {
        storeName: label,
        address: "",
        phone: "",
        email: "",
        businessHours: { weekday: "10:00-22:00", saturday: "10:00-22:00", sundayHoliday: "10:00-22:00" },
        images: [],
        rooms: [],
        equipmentOptions: [],
        personalPracticeSettings: { enabled: true, maxPeople: 2, advanceDays: 1, advanceHours: 2 },
        studentDiscount: { enabled: false, discountType: "amount", value: 0 },
        otherDiscounts: [],
        useActivaCoupon: true,
    };
}

/** 旧形式の下書きデータを最新形式に補完（フォーム表示用） */
export function normalizeIntakeData(data: Partial<IntakeData> | null, label: string): IntakeData {
    const base = emptyIntakeData(label);
    if (!data) return base;
    return {
        ...base,
        ...data,
        businessHours: { ...base.businessHours, ...(data.businessHours || {}) },
        images: data.images || [],
        rooms: (data.rooms || []).map((r) => ({
            ...r,
            pricing: {
                weekday: r.pricing?.weekday || [],
                saturday: r.pricing?.saturday || (r.saturdayPrice != null ? [{ start: "00:00", end: "24:00", price: r.saturdayPrice }] : []),
                sundayHoliday: r.pricing?.sundayHoliday || (r.sundayPrice != null ? [{ start: "00:00", end: "24:00", price: r.sundayPrice }] : []),
            },
            images: r.images || [],
        })),
        equipmentOptions: data.equipmentOptions || [],
        personalPracticeSettings: { ...base.personalPracticeSettings, ...(data.personalPracticeSettings || {}) },
        studentDiscount: { ...base.studentDiscount, ...(data.studentDiscount || {}) },
        otherDiscounts: data.otherDiscounts || [],
        useActivaCoupon: data.useActivaCoupon !== false, // 未設定はON扱い
    };
}

/** 提出された入力内容から StudioProfile を生成（承認時に使用） */
export function intakeToStudioProfile(raw: IntakeData): StudioProfile & { isPublished: boolean } {
    const data = normalizeIntakeData(raw, raw.storeName || "");

    const rooms = data.rooms.map((r) => ({
        id: r.id || uuidv4(),
        name: r.name,
        description: r.description || "",
        images: r.images || [],
        basePrice: r.basePrice || 0,
        startType: r.startType || "0min",
        // 既存ダッシュボード・予約画面と同じ TimeSlot[] 形式
        pricing: {
            weekday: r.pricing.weekday,
            saturday: r.pricing.saturday,
            sundayHoliday: r.pricing.sundayHoliday,
        },
    }));

    const equipmentOptions = data.equipmentOptions.map((e) => ({
        name: e.name,
        pricePerHour: e.pricePerHour || 0,
        priceType: e.priceType || "per_hour",
        quantity: e.quantity ?? 1,
        category: e.category || "other",
        status: "active",
    }));

    const profile = {
        id: uuidv4(),
        storeName: data.storeName,
        companyName: data.companyName || "",
        representative: data.representative || "",
        representativeEmail: "",
        manager: data.contactPerson || "",
        contactPerson: data.contactPerson || "",
        postalCode: data.postalCode || "",
        address: data.address,
        phone: data.phone,
        email: data.email,
        invoiceNumber: data.invoiceNumber || "",
        businessHours: data.businessHours,
        closedDays: data.closedDays || "",
        parkingInfo: data.parkingInfo || "",
        url: data.url || "",
        appealPoint: data.appealPoint || "",
        logoUrl: data.logoUrl || "",
        bgImageUrl: data.bgImageUrl || "",
        images: data.images,
        studioCount: rooms.length,
        rooms,
        equipmentOptions,
        personalPracticeSettings: data.personalPracticeSettings,
        studentDiscount: data.studentDiscount,
        otherDiscounts: data.otherDiscounts,
        useActivaCoupon: data.useActivaCoupon !== false,
        designSettings: {
            logoSize: 100,
            backgroundColor: "#000000",
            backgroundType: data.bgImageUrl ? "image" : "color",
            backgroundImageUrl: data.bgImageUrl || undefined,
        },
        isPublished: true, // 運営が確認・承認した時点で公開
        createdAt: new Date().toISOString(),
    };

    return profile as unknown as StudioProfile & { isPublished: boolean };
}
