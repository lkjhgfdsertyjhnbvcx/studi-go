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
    campaign?: string;      // 乗り換えキャンペーン等（例: "switch-2m" = 有料プラン2ヶ月無料）
    // ---- 申込フォーム（studigo_apply.html）由来の情報 ----
    // onboard でメール未入力のまま提出されても連絡できるよう、申込時の連絡先を保持する。
    // 希望プランは承認時に studios.planRequested として引き継ぎ、運営が課金設定後に
    // planKey を引き上げる運用にする（申告だけで有料機能を開放しないため）。
    applicationId?: string;
    contactName?: string;
    contactEmail?: string;
    planRequested?: string;
    planOptions?: string;
    planPayMethod?: string;
    // ---- 承認時に発行したログイン情報の控え（運営専用） ----
    // studios 側にはハッシュしか残らないため、案内メールが失敗したときの
    // 復旧手段としてここに平文を控える。storeIntakes は Admin SDK 経由でしか読めない。
    // 店舗がパスワードを変更したら不要なので、運営側で消して構わない。
    issuedLoginEmail?: string;
    issuedTempPassword?: string;
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
        // advanceDays / advanceHours の 0 は「制限なし」。
        // 既定で 1日 を入れていると、店舗が触らないまま
        // 「翌日分しか個人練習を受け付けない」設定で公開されてしまう。
        personalPracticeSettings: { enabled: true, maxPeople: 2, advanceDays: 0, advanceHours: 0 },
        studentDiscount: { enabled: false, discountType: "amount", value: 0 },
        otherDiscounts: [],
        useActivaCoupon: true,
    };
}

/**
 * 公開に足るだけの内容が入っているかを検証する。
 *
 * 背景（260807）:
 *   提出APIは storeName / address / phone しか見ておらず、承認画面のボタンも住所だけを
 *   条件にしていた。そのため
 *     - 部屋0件のまま承認 → rooms:[] / studioCount:0 の「予約できない店舗ページ」が公開される
 *     - 基本料金0円のまま承認 → getPriceForTime が 0 を返し **¥0 の予約が成立する**
 *   という抜けがあった。提出時と承認時の両方でここを通す。
 *
 * @param opts.hasFallbackEmail 申込フォーム由来の連絡先メールがある場合は true。
 *   その場合 onboard 側のメール未入力は許容する（承認時にそちらへログイン情報を送る）。
 */
export function validateIntakeForPublish(
    data: IntakeData | null | undefined,
    opts: { hasFallbackEmail?: boolean } = {},
): string[] {
    const errors: string[] = [];
    if (!data) return ["入力内容がありません"];

    if (!data.storeName?.trim()) errors.push("店舗名を入力してください");
    if (!data.address?.trim()) errors.push("住所を入力してください");
    if (!data.phone?.trim()) errors.push("電話番号を入力してください");
    if (!data.email?.trim() && !opts.hasFallbackEmail) {
        errors.push("メールアドレスを入力してください（管理画面のログインIDになります）");
    }

    const rooms = data.rooms ?? [];
    if (rooms.length === 0) {
        errors.push("スタジオ（部屋）を1つ以上登録してください。0件のままだと予約を受け付けられません");
    }
    rooms.forEach((r, i) => {
        const label = r.name?.trim() ? `「${r.name.trim()}」` : `${i + 1}番目の部屋`;
        if (!r.name?.trim()) errors.push(`${label}の名前を入力してください`);

        const slots = [
            ...(r.pricing?.weekday ?? []),
            ...(r.pricing?.saturday ?? []),
            ...(r.pricing?.sundayHoliday ?? []),
        ];
        const hasSlotPrice = slots.some((s) => Number(s?.price) > 0);
        // 基本料金は「時間帯別料金に当てはまらないとき」のフォールバックなので、
        // 0円のまま公開すると穴の時間帯が ¥0 予約になる。どちらかではなく基本料金を必須にする。
        if (!(Number(r.basePrice) > 0)) {
            errors.push(
                hasSlotPrice
                    ? `${label}の基本料金が0円です。時間帯別料金に当てはまらない時間が¥0になるため、基本料金を設定してください`
                    : `${label}の料金を設定してください（基本料金が0円です）`,
            );
        }
        slots.forEach((s) => {
            const [sh, sm] = String(s?.start ?? "").split(":").map(Number);
            const [eh, em] = String(s?.end ?? "").split(":").map(Number);
            if (!Number.isFinite(sh) || !Number.isFinite(eh)) {
                errors.push(`${label}の時間帯別料金「${s?.start ?? ""}〜${s?.end ?? ""}」の時刻が読み取れません`);
                return;
            }
            const start = sh * 60 + (sm || 0);
            const end = eh * 60 + (em || 0);
            // 「22:00〜01:00」「22:00〜00:00」のような深夜またぎは音楽スタジオでは普通の設定。
            // getPriceForTime（studio/[id]）も end<=start を +24時間として扱うので、
            // ここで逆転扱いにすると提出も承認もできなくなる。
            // 開始と終了が同じ（0分の枠）だけを弾く。
            if (end === start) {
                errors.push(`${label}の時間帯別料金「${s.start}〜${s.end}」は開始と終了が同じです`);
            }
        });
    });

    return errors;
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

/**
 * onboard は「何日前 / 何時間前から予約可」を advanceDays / advanceHours で入力させるが、
 * 予約時の検証（src/actions/booking.ts）と BookingModal は
 * reservationWindowType / reservationWindowValue を読む。
 * ここで変換しないと undefined との比較になって条件が常に false になり、
 * 「1日前から受付」と設定しても半年先まで予約できてしまう。
 */
function toStudioPersonalPractice(p: IntakePersonalPractice) {
    const days = Number(p?.advanceDays ?? 0);
    const hours = Number(p?.advanceHours ?? 0);
    const base = {
        enabled: p?.enabled !== false,
        maxPeople: Number(p?.maxPeople ?? 2),
        // 入力値そのものも残す（onboard の再表示・運営確認用）
        advanceDays: days,
        advanceHours: hours,
        ...(p?.pricePerHour ? { pricePerHour: Number(p.pricePerHour) } : {}),
    };

    // 0 は「制限なし」。reservationWindowType を付けずに返すことで、
    // 予約側（actions/booking.ts / BookingModal）の受付期間チェックを素通りさせる。
    // ここで安易に既定値を入れると「◯日前より先の個人練習は予約不可」が
    // 店舗の意図と無関係に効いてしまう。
    if (days <= 0 && hours <= 0) return base;

    const useDays = days > 0;
    return {
        ...base,
        reservationWindowType: (useDays ? "days" : "hours") as "days" | "hours",
        reservationWindowValue: useDays ? days : hours,
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
        personalPracticeSettings: toStudioPersonalPractice(data.personalPracticeSettings),
        studentDiscount: data.studentDiscount,
        otherDiscounts: data.otherDiscounts,
        useActivaCoupon: data.useActivaCoupon !== false,
        designSettings: {
            logoSize: 100,
            backgroundColor: "#000000",
            backgroundType: data.bgImageUrl ? "image" : "color",
            // undefined を混ぜると Admin SDK の set() が throw する
            // （ignoreUndefinedProperties 未設定）。背景画像は任意項目なので
            // 未設定のときはキーごと落とす。
            ...(data.bgImageUrl ? { backgroundImageUrl: data.bgImageUrl } : {}),
        },
        isPublished: true, // 運営が確認・承認した時点で公開
        createdAt: new Date().toISOString(),
    };

    return profile as unknown as StudioProfile & { isPublished: boolean };
}
