"use client";
import React, { useEffect, useState } from "react";
import { uploadImageToStorage } from "@/lib/uploadImage";
import { parseBusinessHours, describeBusinessHours } from "@/lib/business-hours";
import { parseSlotTime } from "@/lib/time-slots";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PlanGate } from "@/components/PlanGate";
import { canUseFeature, getPlanLimits, normalizePlanKey, type FeatureKey } from "@/lib/plan-features";
import CsvColumnMapper, { type ColumnMapping, type TargetField } from "@/components/CsvColumnMapper";

// ===== CSVファイル読み取りユーティリティ（Shift-JIS自動検出） =====
function readCsvFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            const buf = ev.target?.result as ArrayBuffer;
            const bytes = new Uint8Array(buf);
            // BOM検出: UTF-8 BOM (EF BB BF) or UTF-16 LE (FF FE)
            const isUtf8Bom = bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF;
            // Shift-JIS検出: 0x80-0x9F or 0xE0-0xEF の範囲のバイトが多ければShift-JIS
            let sjisLike = 0;
            for (let i = 0; i < Math.min(bytes.length, 500); i++) {
                if ((bytes[i] >= 0x81 && bytes[i] <= 0x9F) || (bytes[i] >= 0xE0 && bytes[i] <= 0xEF)) sjisLike++;
            }
            const encoding = (!isUtf8Bom && sjisLike > 5) ? "shift_jis" : "utf-8";
            const decoder = new TextDecoder(encoding);
            resolve(decoder.decode(buf));
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}

// ===== CSVマッピング用フィールド定義 =====
const CUSTOMER_TARGET_FIELDS: TargetField[] = [
    { key: "name", label: "顧客名", required: false, aliases: ["名前", "氏名", "name", "顧客名", "お名前", "ご利用者名", "利用者名", "氏名（漢字）", "フルネーム", "予約者名"] },
    { key: "email", label: "メールアドレス", required: false, aliases: ["メール", "メールアドレス", "email", "e-mail", "mail", "Eメール", "連絡先メール"] },
    { key: "phone", label: "電話番号", required: false, aliases: ["電話", "電話番号", "phone", "tel", "携帯", "携帯番号", "連絡先"] },
    { key: "memo", label: "メモ/備考", required: false, aliases: ["メモ", "備考", "memo", "note", "notes", "コメント", "ノート", "特記事項", "備考（ユーザ）", "備考（ショップ）"] },
    { key: "lineUserId", label: "LINE ID", required: false, aliases: ["lineid", "line_id", "line id", "ラインid", "lineユーザーid", "line"] },
];

const BOOKING_TARGET_FIELDS: TargetField[] = [
    { key: "date", label: "予約日（※時刻込みでもOK）", required: true, aliases: ["日付", "予約日", "date", "利用日", "ご利用日", "年月日", "使用日", "予約開始時刻"] },
    { key: "startTime", label: "開始時間（日付列に時刻があれば不要）", required: false, aliases: ["開始時間", "時間", "start", "starttime", "開始", "利用開始", "入室時間", "from", "開始時刻"] },
    { key: "endTime", label: "終了時間", required: false, aliases: ["終了時間", "終了", "退室時間", "end", "endtime", "to", "終了時刻", "予約終了時刻", "予約終了時間"] },
    { key: "customerName", label: "顧客名", required: false, aliases: ["顧客名", "名前", "氏名", "name", "お名前", "ご利用者名", "利用者名", "予約者", "予約者名"] },
    { key: "email", label: "メールアドレス", required: false, aliases: ["メール", "メールアドレス", "email", "Eメール", "連絡先メール"] },
    { key: "durationHours", label: "利用時間(h)", required: false, aliases: ["時間数", "利用時間", "duration", "hours", "時間（h）", "ご利用時間"] },
    { key: "roomName", label: "部屋/スタジオ名", required: false, aliases: ["部屋", "部屋名", "room", "スタジオ名", "ルーム", "スタジオ", "ブース", "ブース名", "部屋名"] },
    { key: "totalPrice", label: "料金", required: false, aliases: ["料金", "金額", "price", "合計", "合計金額", "利用料金", "合計料金", "総額"] },
    { key: "status", label: "ステータス", required: false, aliases: ["ステータス", "状態", "status", "予約状態"] },
    { key: "memo", label: "メモ/備考", required: false, aliases: ["メモ", "備考", "memo", "ノート", "備考欄", "コメント", "備考（ユーザ）", "備考（ショップ）"] },
    { key: "people", label: "人数", required: false, aliases: ["人数", "利用人数", "people", "人"] },
];

// ===== 型定義 =====
interface TimeSlot { start: string; end: string; price: number; }
interface RoomPricing { weekday: TimeSlot[]; saturday: TimeSlot[]; sundayHoliday: TimeSlot[]; }
interface Room {
    id: string; name: string; description?: string; images?: string[];
    basePrice: number; startType?: "0min" | "30min"; pricing?: RoomPricing;
}
interface StaffMember { id: string; name: string; email: string; password?: string; role: "admin" | "staff"; createdAt: string; }
interface BlacklistEntry { userId: string; userName: string; email?: string; reason: string; createdAt: string; }
interface EquipmentOption { name: string; pricePerHour: number; priceType?: "per_use" | "per_hour"; imageUrl?: string; quantity?: number; category?: "amp" | "drums" | "mic" | "pa" | "guitar" | "bass" | "keys" | "other"; status?: "active" | "maintenance" | "broken"; assignedRoom?: string; }
interface Discount { name: string; enabled: boolean; discountType: "amount" | "percentage"; value: number; billingUnit?: "per_use" | "per_hour"; timeRestriction?: { enabled: boolean; days: number[]; slots: { start: string; end: string }[] };
    /** 個人練習の予約にもこの割引を適用するか。未設定(=false)なら個人練習では表示・適用しない。 */
    applyToPersonalPractice?: boolean; }
interface Store {
    id: string; storeName: string; companyName?: string; representative?: string; email?: string;
    postalCode?: string; address?: string; phone?: string; invoiceNumber?: string; closedDays?: string;
    logoUrl?: string; bgColor?: string; bgImageUrl?: string; bgOpacity?: number; appealPoint?: string; images?: string[]; parkingInfo?: string;
    paymentMethod?: "store" | "studigo"; feeBearer?: "store" | "customer"; unpaidAction?: "cancel" | "force" | "notify"; useActivaCoupon?: boolean;
    businessHours?: { weekday: string; saturday: string; sundayHoliday: string };
    reservationLeadDays?: number;
    personalPracticeSettings?: { enabled: boolean; maxPeople: number; advanceDays?: number; advanceHours?: number; pricePerHour?: number; };
    studentDiscount?: { enabled: boolean; discountType: "amount" | "percentage"; value: number; billingUnit?: "per_use" | "per_hour"; timeRestriction?: { enabled: boolean; days: number[]; slots: { start: string; end: string }[] }; applyToPersonalPractice?: boolean };
    otherDiscounts?: Discount[];
    personalPracticeDiscounts?: Discount[];
    holidayPeriods?: Array<{ name: string; start: string; end: string }>;
    nightPacks?: Array<{ name: string; enabled: boolean; startHour: number; endHour: number; price: number; availableDays: string[] }>;
    rooms?: Room[]; equipmentOptions?: EquipmentOption[];
    staff?: StaffMember[]; blacklist?: BlacklistEntry[]; monthlyRevenueTarget?: number;
    featureOverrides?: Record<string, boolean>;
    isPublished?: boolean;
    updatedAt?: string;
    publishedAt?: string;
    planKey?: string;
    planOptions?: string[];
    planPayMethod?: string;
    planTrialDays?: number;
    trialEndDate?: string;
    campaign?: string;
    name?: string;
    ownerName?: string;
}
interface Booking {
    id: string; userId: string; studioId: string; roomName: string; date: string;
    startTime: string; durationHours: number; totalPrice: number; status: string;
    createdAt: string; userName?: string; userEmail?: string;
}
interface BlockedSlot {
    id: string; studioId: string; roomName: string; date: string;
    startTime: string; endTime: string; reason: string;
    teacher?: string; memo?: string; createdBy: string; createdAt: string;
}
interface EquipmentRental {
    id: string; studioId: string; equipmentName: string; roomName?: string; date: string;
    startTime: string; endTime: string; customerName: string; purpose: string;
    memo?: string; createdBy: string; createdAt: string;
}

const MENU = [
    { key: "profile", label: "プロフィール" },
    { key: "branding", label: "ブランディング" },
    { key: "settings", label: "設定" },
    { key: "studios", label: "スタジオ設定" },
    { key: "options", label: "機材管理" },
    { key: "promotions", label: "特典・クーポン" },
    { key: "staff", label: "スタッフ" },
    { key: "blacklist", label: "ブラックリスト" },
    { key: "contact", label: "お問い合わせ" },
    { key: "plan", label: "プラン・料金" },
];
const CENTER_TABS = [
    { key: "calendar", label: "予約カレンダー" },
    { key: "blocked", label: "ブロック設定" },
    { key: "rentals", label: "機材貸出" },
    { key: "analytics", label: "予実管理" },
    { key: "customers", label: "顧客管理" },
    { key: "cancellations", label: "キャンセル・変更" },
];

interface StoreDashboardProps {
    studioId?: string;
    isAdmin?: boolean;
}

export default function StoreDashboard({ studioId: propStudioId, isAdmin = false }: StoreDashboardProps) {
    const [store, setStore] = useState<Store | null>(null);
    const [activeMenu, setActiveMenu] = useState("profile");
    const [centerTab, setCenterTab] = useState("calendar");
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
    const [equipmentRentals, setEquipmentRentals] = useState<EquipmentRental[]>([]);
    const [customers, setCustomers] = useState<any[]>([]);
    const [showNotify, setShowNotify] = useState(false);
    const [notifyMsg, setNotifyMsg] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const storeId = propStudioId || (typeof window !== "undefined" ? localStorage.getItem("storeId") : null);
        if (!storeId) { if (!isAdmin) window.location.href = "/store/login"; return; }
        fetch(`/api/store/detail?id=${storeId}`)
            .then(r => r.json())
            .then(data => {
                if (data.error) { if (!isAdmin) window.location.href = "/store/login"; return; }
                setStore({
                    ...data,
                    rooms: data.rooms || [],
                    staff: data.staff || [],
                    blacklist: data.blacklist || [],
                    equipmentOptions: data.equipmentOptions || [],
                    otherDiscounts: data.otherDiscounts || [],
                    personalPracticeDiscounts: data.personalPracticeDiscounts || [],
                    images: data.images || [],
                });
                // ブロック枠を取得
                fetch(`/api/blocked-slots?studioId=${data.id}`).then(r => r.json()).then(bs => { if (Array.isArray(bs)) setBlockedSlots(bs); });
                // 機材貸出を取得
                fetch(`/api/equipment-rentals?studioId=${data.id}`).then(r => r.json()).then(er => { if (Array.isArray(er)) setEquipmentRentals(er); });
                return fetch(`/api/admin-bookings`);
            })
            .then(r => r?.json())
            .then(b => { if (b && !b.error) setBookings(b); });
        fetch(`/api/users?storeId=${storeId}`).then(r => r.json()).then(u => { if (!u.error) setCustomers(u); });
    }, []);

    const notify = (msg: string) => {
        setNotifyMsg(msg);
        setShowNotify(true);
        setTimeout(() => setShowNotify(false), 3000);
    };

    const saveAll = async () => {
        if (!store) return;
        notify("⏳ 保存中...");
        const res = await fetch("/api/store/update-full", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(store),
        });
        if (res.ok) {
            notify("✅ 保存しました！");
        } else if (res.status === 403 || res.status === 401) {
            notify("❌ セッションが切れました。再ログインしてください。");
            setTimeout(() => {
                localStorage.removeItem("storeId");
                // __session は httpOnly なので JS からは消せない。サーバー側で破棄する。
                void fetch("/api/store/logout", { method: "POST" });
                window.location.href = "/store/login";
            }, 2000);
        } else {
            notify("❌ 保存に失敗しました");
        }
    };

    if (!store) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-foreground font-black text-2xl animate-pulse tracking-widest">SYNCING...</div>
        </div>
    );

    // プラン未選択の場合、プラン選択画面のみ表示（管理者は除外）
    if (!store.planKey && !isAdmin) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {showNotify && (
                    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white text-black px-8 py-4 rounded-full font-black shadow-2xl text-sm">
                        {notifyMsg}
                    </div>
                )}
                <header className="bg-card border-b border-border px-6 py-4 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-4">
                        {store.logoUrl && <img src={store.logoUrl} className="h-8 w-auto object-contain" alt="logo" />}
                        <div>
                            <p className="font-black text-foreground text-lg leading-none">{store.storeName}</p>
                            <p className="text-muted-foreground text-xs mt-0.5">店舗管理ダッシュボード</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={() => {
                                if (!confirm("ログアウトしますか？")) return;
                                localStorage.removeItem("storeId");
                                // __session は httpOnly なので JS からは消せない。サーバー側で破棄する。
                                void fetch("/api/store/logout", { method: "POST" });
                                window.location.href = "/store/login";
                            }}
                            className="px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/60 rounded-lg transition-all"
                        >
                            ログアウト
                        </button>
                    </div>
                </header>
                <div className="flex-1 flex items-start justify-center overflow-y-auto py-12 px-4">
                    <div className="w-full max-w-2xl">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/20 mb-4">
                                <span className="text-3xl">🚀</span>
                            </div>
                            <h1 className="text-2xl font-black text-foreground mb-2">ご利用にはプラン選択が必要です</h1>
                            <p className="text-muted-foreground text-sm">
                                Studi-Goをご利用いただくには、まずプランをお選びください。<br/>
                                フリープランは無料でお試しいただけます。
                            </p>
                        </div>
                        <PlanTab store={store} setStore={setStore} notify={notify} />
                    </div>
                </div>
            </div>
        );
    }

    const storeBookings = bookings.filter(b => b.studioId === store.id);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {showNotify && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white text-black px-8 py-4 rounded-full font-black shadow-2xl text-sm">
                    {notifyMsg}
                </div>
            )}

            {isAdmin && (
                <div className="bg-orange-500 text-white text-center py-2 text-xs font-black tracking-wide">
                    ⚠️ 管理者による代理編集モード — {store.storeName}
                    <a href={`/studio/${store.id}?preview=true`} target="_blank" className="ml-4 underline hover:no-underline">ユーザー向けページをプレビュー ↗</a>
                    <a href={`/admin/studios`} className="ml-4 underline hover:no-underline">← スタジオ一覧に戻る</a>
                </div>
            )}
            <header className="bg-card border-b border-border px-6 py-4 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                    {store.logoUrl && <img src={store.logoUrl} className="h-8 w-auto object-contain" alt="logo" />}
                    <div>
                        <p className="font-black text-foreground text-lg leading-none">{store.storeName}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{isAdmin ? "管理者代理編集" : "店舗管理ダッシュボード"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    {!isAdmin && (
                        <>
                            <button onClick={() => window.location.href = "/"} className="px-4 py-2 text-xs font-bold text-muted-foreground hover:text-foreground border border-border rounded-lg transition-all">
                                トップへ
                            </button>
                            <button
                                onClick={() => {
                                    if (!confirm("ログアウトしますか？")) return;
                                    localStorage.removeItem("storeId");
                                    // __session は httpOnly なので JS からは消せない。サーバー側で破棄する。
                                    void fetch("/api/store/logout", { method: "POST" });
                                    window.location.href = "/store/login";
                                }}
                                className="px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/60 rounded-lg transition-all"
                            >
                                ログアウト
                            </button>
                        </>
                    )}
                    <button onClick={saveAll} className="px-6 py-2 text-xs font-black bg-purple-600 hover:bg-purple-500 rounded-lg transition-all">
                        SAVE ALL
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* 常時表示のメニュー */}
                <aside className="w-48 bg-card border-r border-border flex flex-col py-3 overflow-y-auto shrink-0">
                    {MENU.map(m => (
                        <button
                            key={m.key}
                            title={m.label}
                            onClick={() => {
                                if (activeMenu === m.key && sidebarOpen) { setSidebarOpen(false); }
                                else { setActiveMenu(m.key); setSidebarOpen(true); }
                            }}
                            className={`flex items-center gap-2 px-4 py-3 text-left text-xs font-bold transition-all w-full ${activeMenu === m.key && sidebarOpen ? "bg-purple-600/20 text-purple-400 border-r-2 border-purple-500" : "text-muted-foreground hover:text-foreground hover:bg-accent/10"}`}
                        >
                            <span className="leading-tight">{m.label}</span>
                        </button>
                    ))}
                    {/* 操作マニュアル（メニュー最下部・別タブで開く） */}
                    <a
                        href="/Studi-Go_店舗ガイド.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="操作マニュアル"
                        className="mt-auto mx-3 mb-1 flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-accent/10 border border-border/60 transition-all"
                    >
                        <span className="leading-tight">📖 操作マニュアル ↗</span>
                    </a>
                </aside>
                {/* クリックで開く設定パネル */}
                {sidebarOpen && (
                    <div className="w-96 bg-card/50 border-r border-border overflow-y-auto shrink-0 relative">
                        <button onClick={() => setSidebarOpen(false)} className="absolute top-3 right-3 z-10 text-muted-foreground hover:text-foreground text-xs p-1 rounded-lg hover:bg-accent/10 transition-all">✕</button>
                        <div className="p-6">
                            {activeMenu === "profile" && <ProfileTab store={store} setStore={setStore} notify={notify} />}
                            {activeMenu === "branding" && (
                                <PlanGate planKey={store.planKey} feature="page_design" overrides={store.featureOverrides}>
                                    <BrandingTab store={store} setStore={setStore} />
                                </PlanGate>
                            )}
                            {activeMenu === "settings" && <SettingsTab store={store} setStore={setStore} />}
                            {activeMenu === "studios" && <StudiosTab store={store} setStore={setStore} />}
                            {/* 機材・オプションはライト以上。中身は見せたうえでロックし、
                                「何ができないか」が具体的に分かるようにする（PlanGate の挙動）。 */}
                            {activeMenu === "options" && (
                                <PlanGate planKey={store.planKey} feature="equipment_options" overrides={store.featureOverrides}>
                                    <OptionsTab store={store} setStore={setStore} />
                                </PlanGate>
                            )}
                            {/* 260808: 以前は「スタッフ」メニュー全体を staff_account で塞いでいたが、
                                承認時に発行した仮パスワードの変更もここで行うため、フリー店舗が
                                パスワードを変えられなくなっていた。メニューは常に開き、
                                「スタッフを追加」だけを StaffTab の中で制限する。 */}
                            {activeMenu === "staff" && <StaffTab store={store} setStore={setStore} notify={notify} />}
                            {activeMenu === "blacklist" && <BlacklistTab store={store} setStore={setStore} />}
                            {activeMenu === "contact" && <ContactTab store={store} notify={notify} />}
                            {activeMenu === "promotions" && (
                                <PlanGate planKey={store.planKey} feature="coupon">
                                    <PromotionsTab store={store} setStore={setStore} />
                                </PlanGate>
                            )}
                            {activeMenu === "plan" && <PlanTab store={store} setStore={setStore} notify={notify} />}
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-hidden flex flex-col bg-background">
                    <div className="flex border-b border-border bg-card/50 px-6 pt-4 shrink-0">
                        {CENTER_TABS.map(t => (
                            <button
                                key={t.key}
                                onClick={() => setCenterTab(t.key)}
                                className={`px-5 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all -mb-px ${centerTab === t.key ? "border-purple-500 text-purple-400" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                        {centerTab === "calendar" && <CalendarTab bookings={storeBookings} rooms={store.rooms || []} setBookings={setBookings} allBookings={bookings} blockedSlots={blockedSlots} equipmentOptions={store.equipmentOptions || []} equipmentRentals={equipmentRentals} storeId={store.id} businessHours={store.businessHours} onRefreshBookings={() => fetch(`/api/bookings?studioId=${store.id}`).then(r => r.json()).then(b => { if (!b.error) setBookings(b); })} />}
                        {centerTab === "blocked" && <BlockedSlotsTab storeId={store.id} rooms={store.rooms || []} blockedSlots={blockedSlots} setBlockedSlots={setBlockedSlots} />}
                        {centerTab === "rentals" && <EquipmentRentalsTab storeId={store.id} rooms={store.rooms || []} equipmentOptions={store.equipmentOptions || []} rentals={equipmentRentals} setRentals={setEquipmentRentals} />}
                        {centerTab === "analytics" && <AnalyticsTab bookings={storeBookings} store={store} setStore={setStore} planKey={store.planKey} />}
                        {centerTab === "customers" && <CustomersTab customers={customers} bookings={storeBookings} planKey={store.planKey} storeId={store.id} onRefresh={() => fetch(`/api/users?storeId=${store.id}`).then(r => r.json()).then(u => { if (!u.error) setCustomers(u); })} />}
                        {centerTab === "cancellations" && <CancellationsTab bookings={storeBookings} setBookings={setBookings} allBookings={bookings} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ===== 左パネルタブ =====

function ProfileTab({ store, setStore, notify }: any) {
    const u = (k: string, v: any) => setStore({ ...store, [k]: v });
    const [publishing, setPublishing] = React.useState(false);
    const [urlCopied, setUrlCopied] = React.useState(false);

    // 店舗の予約ページURL（公開前でもこのURLからアクセス可能。公開ボタンは検索一覧への掲載可否）
    const bookingUrl = typeof window !== "undefined"
        ? `${window.location.origin}/studio/${store.id}`
        : `https://studi-go.com/studio/${store.id}`;

    const copyBookingUrl = async () => {
        try {
            await navigator.clipboard.writeText(bookingUrl);
            setUrlCopied(true);
            setTimeout(() => setUrlCopied(false), 2000);
        } catch {
            notify?.("コピーに失敗しました。URLを手動で選択してコピーしてください");
        }
    };

    const handlePublishToggle = async () => {
        const next = !store.isPublished;
        if (next && !confirm("店舗をユーザー向け一覧に公開しますか？\n基本情報・スタジオ設定が完了していることを確認してください。")) return;
        if (!next && !confirm("店舗を非公開にしますか？\nユーザーの検索結果から外れます。")) return;
        setPublishing(true);
        try {
            const now = new Date().toISOString();
            const updated = {
                ...store,
                isPublished: next,
                updatedAt: now,
                ...(next ? { publishedAt: now } : {}),
            };
            const res = await fetch("/api/store/update-full", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            });
            if (!res.ok) throw new Error("保存に失敗しました");
            setStore(updated);
            notify(next ? "✅ 公開しました！ユーザー一覧に表示されます" : "🔒 非公開にしました");
        } catch (e: any) {
            notify("❌ " + e.message);
        } finally {
            setPublishing(false);
        }
    };

    return (
        <Section title="プロフィール">
            {/* 公開設定ブロック */}
            <div className={`rounded-xl p-4 border-2 ${store.isPublished ? "border-green-500/40 bg-green-500/5" : "border-yellow-500/40 bg-yellow-500/5"}`}>
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-foreground/70 mb-0.5">公開設定</p>
                        <div className="flex items-center gap-2">
                            <span className={`inline-block w-2 h-2 rounded-full ${store.isPublished ? "bg-green-600 dark:bg-green-400 animate-pulse" : "bg-yellow-600 dark:bg-yellow-400"}`} />
                            <span className={`text-sm font-black ${store.isPublished ? "text-green-700 dark:text-green-400" : "text-yellow-700 dark:text-yellow-400"}`}>
                                {store.isPublished ? "公開中" : "非公開"}
                            </span>
                        </div>
                        {store.isPublished && store.publishedAt && (
                            <p className="text-[11px] text-muted-foreground mt-0.5">公開日: {new Date(store.publishedAt).toLocaleDateString("ja-JP")}</p>
                        )}
                    </div>
                    <button
                        onClick={handlePublishToggle}
                        disabled={publishing}
                        className={`px-4 py-2 rounded-lg text-xs font-black transition-all disabled:opacity-50 ${
                            store.isPublished
                                ? "bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 hover:bg-yellow-500/30 border border-yellow-600/50"
                                : "bg-green-500/20 text-green-800 dark:text-green-300 hover:bg-green-500/30 border border-green-600/50"
                        }`}
                    >
                        {publishing ? "処理中..." : store.isPublished ? "🔒 非公開にする" : "🚀 公開する"}
                    </button>
                </div>
                {!store.isPublished && (
                    <p className="text-[11px] text-yellow-800 dark:text-yellow-300 mt-1">※ 公開するとユーザー検索に表示されます。スタジオ設定・料金設定を完了してから公開してください。</p>
                )}

                {/* 予約ページURL（公開前でもアクセス可能。ホームページ・SNS・LINEに貼って集客できる） */}
                <div className="mt-3 pt-3 border-t border-border/50">
                    <p className="text-xs font-black uppercase tracking-widest text-foreground/70 mb-1.5">あなたの予約ページ</p>
                    <div className="flex items-center gap-2 flex-wrap">
                        <code className="flex-1 min-w-0 truncate bg-background border border-border rounded-lg px-3 py-2 text-xs font-mono text-foreground font-semibold">
                            {bookingUrl}
                        </code>
                        <button
                            onClick={copyBookingUrl}
                            className="px-3 py-2 rounded-lg text-xs font-black bg-purple-600 hover:bg-purple-500 text-white transition-all whitespace-nowrap"
                        >
                            {urlCopied ? "✓ コピーしました" : "URLをコピー"}
                        </button>
                        <a
                            href={bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-lg text-xs font-black bg-accent/30 hover:bg-accent/50 border border-border text-foreground transition-all whitespace-nowrap"
                        >
                            開く ↗
                        </a>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1.5">
                        このURLをホームページ・SNS・LINEなどに掲載すると、お客様が直接予約できます。{!store.isPublished && "（非公開中でもこのURLからは予約ページを開けます）"}
                    </p>
                </div>
            </div>

            <Field label="店舗名" value={store.storeName} onChange={v => u("storeName", v)} />
            <Field label="会社名" value={store.companyName} onChange={v => u("companyName", v)} />
            <Field label="郵便番号" value={store.postalCode} onChange={v => u("postalCode", v)} placeholder="000-0000" />
            <Field label="住所" value={store.address} onChange={v => u("address", v)} />
            <Field label="電話番号" value={store.phone} onChange={v => u("phone", v)} />
            <Field label="代表者氏名" value={store.representative} onChange={v => u("representative", v)} />
            <div className="bg-accent/10/50 rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">登録メールアドレス</p>
                <p className="text-sm font-bold text-muted-foreground">{store.email || "未設定"}</p>
            </div>
            <Field label="定休日" value={store.closedDays} onChange={v => u("closedDays", v)} placeholder="例：毎週月曜日" />
            <div className="mt-4">
                <p className="text-xs font-black text-foreground mb-2">臨時休業・長期休暇</p>
                <p className="text-[10px] text-muted-foreground mb-3">年末年始・GW・お盆休みなどの期間を設定すると、予約カレンダーで選択不可になります</p>
                <div className="space-y-2">
                    {(store.holidayPeriods || []).map((hp: any, idx: number) => (
                        <div key={idx} className="flex gap-2 items-center flex-wrap bg-accent/10 rounded-xl p-3">
                            <input className="flex-1 min-w-[100px] p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none" placeholder="名称（年末年始など）" value={hp.name} onChange={e => { const arr = [...(store.holidayPeriods || [])]; arr[idx] = { ...arr[idx], name: e.target.value }; u("holidayPeriods", arr); }} />
                            <input type="date" className="p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none" value={hp.start} onChange={e => { const arr = [...(store.holidayPeriods || [])]; arr[idx] = { ...arr[idx], start: e.target.value }; u("holidayPeriods", arr); }} />
                            <span className="text-xs text-muted-foreground">〜</span>
                            <input type="date" className="p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none" value={hp.end} onChange={e => { const arr = [...(store.holidayPeriods || [])]; arr[idx] = { ...arr[idx], end: e.target.value }; u("holidayPeriods", arr); }} />
                            <button onClick={() => { const arr = [...(store.holidayPeriods || [])]; arr.splice(idx, 1); u("holidayPeriods", arr); }} className="text-red-400 px-2 text-sm">✕</button>
                        </div>
                    ))}
                    <button onClick={() => u("holidayPeriods", [...(store.holidayPeriods || []), { name: "", start: "", end: "" }])} className="w-full py-2 border border-dashed border-border rounded-xl text-xs font-black text-muted-foreground hover:text-foreground transition-all">
                        + 休業期間を追加
                    </button>
                </div>
            </div>
            <Field label="インボイス番号（T-）" value={store.invoiceNumber} onChange={v => u("invoiceNumber", v)} placeholder="T1234567890123" />
        </Section>
    );
}

function BrandingTab({ store, setStore }: any) {
    const u = (k: string, v: any) => setStore({ ...store, [k]: v });
    return (
        <Section title="ブランディング">
            <div>
                <StorageImageUpload label="ロゴ（推奨サイズ: 横400px × 縦200px以内、PNG透過推奨）" image={store.logoUrl} storagePath={`studios/${store.id}/logo`} onUpload={url => u("logoUrl", url)} />
                {store.logoUrl && (
                    <div className="mt-3">
                        <Label>ロゴ表示サイズ: {store.logoSize || 80}px</Label>
                        <input type="range" min="40" max="200" value={store.logoSize || 80}
                            onChange={e => u("logoSize", parseInt(e.target.value))}
                            className="w-full mt-2 accent-purple-500" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>小（40px）</span><span>大（200px）</span>
                        </div>
                        <div className="mt-3 p-4 bg-accent/10 rounded-xl flex items-center justify-center border border-border">
                            <img src={store.logoUrl} alt="logo preview" style={{height: `${store.logoSize || 80}px`}} className="object-contain" />
                        </div>
                    </div>
                )}
            </div>
            <div>
                <Label>背景色</Label>
                <div className="flex gap-2 items-center mt-1">
                    <input type="color" value={store.bgColor || "#1a1a2e"} onChange={e => u("bgColor", e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0" />
                    <span className="text-sm font-bold text-muted-foreground">{store.bgColor || "#1a1a2e"}</span>
                </div>
            </div>
            <StorageImageUpload label="背景画像" image={store.bgImageUrl} storagePath={`studios/${store.id}/bg`} onUpload={url => u("bgImageUrl", url)} />
            {store.bgImageUrl && (
                <div>
                    <Label>背景画像の暗さ（オーバーレイ）: {Math.round((store.bgOpacity ?? 0.15) * 100)}%</Label>
                    <input type="range" min="0" max="90" value={Math.round((store.bgOpacity ?? 0.15) * 100)}
                        onChange={e => u("bgOpacity", parseInt(e.target.value) / 100)}
                        className="w-full mt-2 accent-purple-500" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>画像そのまま（0%）</span><span>暗く（90%）</span>
                    </div>
                    <div className="mt-3 rounded-xl overflow-hidden relative h-32">
                        <img src={store.bgImageUrl} alt="preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${store.bgOpacity ?? 0.15})` }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            {store.logoUrl && <img src={store.logoUrl} alt="logo" className="h-10 object-contain" />}
                            <span className="text-white text-xs font-black ml-2 drop-shadow">{store.storeName}</span>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <Label>テキストカラー</Label>
                <div className="flex gap-3 mt-1">
                    {["#ffffff","#1d1d1f","#f5f5f7","#333333"].map(c => (
                        <button key={c} onClick={() => u("textColor", c)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${store.textColor===c ? "border-purple-500 scale-110" : "border-transparent"}`}
                            style={{backgroundColor: c, boxShadow: "0 0 0 1px rgba(0,0,0,0.2)"}} />
                    ))}
                    <input type="color" value={store.textColor || "#ffffff"} onChange={e => u("textColor", e.target.value)}
                        className="w-8 h-8 rounded-full cursor-pointer bg-transparent border-0" title="カスタムカラー" />
                </div>
            </div>
            <div>
                <Label>店舗紹介文</Label>
                <textarea className="w-full mt-1 p-3 bg-accent/10 border border-border rounded-xl text-sm font-bold text-foreground outline-none focus:border-purple-500 resize-none" rows={4} value={store.appealPoint || ""} onChange={e => u("appealPoint", e.target.value)} placeholder="お店の魅力を書いてください..." />
            </div>
            <StorageMultiImageUpload label="店舗紹介写真" images={store.images || []} storagePath={`studios/${store.id}/photos`} onChange={urls => u("images", urls)} />
            <div>
                <Label>駐車場について</Label>
                <textarea className="w-full mt-1 p-3 bg-accent/10 border border-border rounded-xl text-sm font-bold text-foreground outline-none focus:border-purple-500 resize-none" rows={3} value={store.parkingInfo || ""} onChange={e => u("parkingInfo", e.target.value)} placeholder="例：店舗前に3台分あり" />
            </div>
        </Section>
    );
}

function SettingsTab({ store, setStore }: any) {
    const u = (k: string, v: any) => setStore({ ...store, [k]: v });
    const uDiscount = (idx: number, key: string, val: any) => {
        const arr = [...(store.otherDiscounts || [])];
        arr[idx] = { ...arr[idx], [key]: val };
        setStore({ ...store, otherDiscounts: arr });
    };
    return (
        <Section title="設定">
            <Subsection title="決済方法">
                <div className="space-y-2">
                    <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${(store.paymentMethod || "store") === "store" ? "border-purple-500 bg-purple-600/10" : "border-border hover:border-gray-500"}`}>
                        <input type="radio" name="payMethod" value="store" checked={(store.paymentMethod || "store") === "store"} onChange={() => u("paymentMethod", "store")} className="mt-0.5 accent-purple-600" />
                        <div>
                            <p className="text-sm font-black text-foreground">予約のみ（決済なし）</p>
                            <p className="text-xs text-muted-foreground mt-0.5">店舗独自で決済。Studi-Goは予約管理のみ行います</p>
                        </div>
                    </label>
                    <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${store.paymentMethod === "studigo" ? "border-purple-500 bg-purple-600/10" : "border-border hover:border-gray-500"}`}>
                        <input type="radio" name="payMethod" value="studigo" checked={store.paymentMethod === "studigo"} onChange={() => u("paymentMethod", "studigo")} className="mt-0.5 accent-purple-600" />
                        <div>
                            <p className="text-sm font-black text-foreground">Studi-Goで事前決済</p>
                            <p className="text-xs text-muted-foreground mt-0.5">予約時にStripeでオンライン決済。手数料5%</p>
                        </div>
                    </label>
                </div>
                {store.paymentMethod === "studigo" && (
                    <div className="mt-3 ml-4 space-y-2">
                        <p className="text-[10px] text-muted-foreground font-black uppercase">決済手数料負担者</p>
                        <RadioGroup value={store.feeBearer || "store"} onChange={v => u("feeBearer", v)} options={[{ value: "store", label: "店舗が負担（5%）" }, { value: "customer", label: "お客様が負担（5%）" }]} />
                        <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-[10px] text-muted-foreground font-black uppercase mb-3">当日までに未決済メンバーがいた場合</p>
                            <RadioGroup value={store.unpaidAction || "notify"} onChange={v => u("unpaidAction", v)} options={[
                                { value: "notify", label: "代表者にメール通知のみ" },
                                { value: "force", label: "代表者のカードで強制決済" },
                                { value: "cancel", label: "予約をキャンセル" },
                            ]} />
                        </div>
                        <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-[10px] text-muted-foreground font-black uppercase mb-3">振込口座（Stripe Connect）</p>
                            <ConnectBankAccount store={store} setStore={setStore} />
                        </div>
                    </div>
                )}
            </Subsection>
            <Subsection title="バウチャクーポン（Activa）">
                <p className="text-xs text-muted-foreground mb-3">⚠️ 詳細設定は「特典・クーポン」タブで行ってください</p>
                <div className="space-y-2 mb-3">
                    <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${(store.promotions?.vowcha?.enabled) ? "border-purple-500 bg-purple-600/10" : "border-border hover:border-gray-500"}`}>
                        <input type="radio" name="activaCoupon" value="yes" checked={!!(store.promotions?.vowcha?.enabled)} onChange={() => setStore({ ...store, promotions: { ...store.promotions, vowcha: { ...store.promotions?.vowcha, enabled: true } } })} className="mt-0.5 accent-purple-600" />
                        <div>
                            <p className="text-sm font-black text-foreground">利用する</p>
                            <p className="text-xs text-muted-foreground mt-0.5">ユーザーの予約ページにクーポン情報を表示します</p>
                        </div>
                    </label>
                    <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${!(store.promotions?.vowcha?.enabled) ? "border-purple-500 bg-purple-600/10" : "border-border hover:border-gray-500"}`}>
                        <input type="radio" name="activaCoupon" value="no" checked={!(store.promotions?.vowcha?.enabled)} onChange={() => setStore({ ...store, promotions: { ...store.promotions, vowcha: { ...store.promotions?.vowcha, enabled: false } } })} className="mt-0.5 accent-purple-600" />
                        <div>
                            <p className="text-sm font-black text-foreground">利用しない</p>
                            <p className="text-xs text-muted-foreground mt-0.5">予約ページにクーポン情報を表示しません</p>
                        </div>
                    </label>
                </div>
            </Subsection>
            <Subsection title="営業時間">
                <p className="text-[10px] text-muted-foreground mb-2">深夜営業は「22:00-26:00」または「22:00-翌2:00」のように入力してください（翌朝9:00まで対応）。</p>
                {([["weekday","平日"],["saturday","土曜"],["sundayHoliday","日祝"]] as const).map(([key, label]) => {
                    const val = store.businessHours?.[key] || "";
                    const desc = val ? describeBusinessHours(val) : null;
                    return (
                        <div key={key}>
                            <Field label={label} value={val} onChange={v => u("businessHours", { ...store.businessHours, [key]: v })} placeholder="10:00-22:00" />
                            {desc && (
                                <p className={`text-[10px] mt-0.5 ${desc.tone === "warn" ? "text-yellow-700 dark:text-yellow-300" : "text-muted-foreground"}`}>
                                    {desc.text}
                                </p>
                            )}
                        </div>
                    );
                })}
            </Subsection>
            <Subsection title="何日先まで予約できるか">
                <div className="flex items-center gap-2">
                    <input type="number" className="w-20 p-2 bg-accent/10 border border-border rounded-lg text-sm font-bold text-foreground outline-none focus:border-purple-500 text-center" value={store.reservationLeadDays || 30} onChange={e => u("reservationLeadDays", parseInt(e.target.value))} />
                    <span className="text-sm text-muted-foreground font-bold">日先まで</span>
                </div>
            </Subsection>
            <Subsection title="個人練習設定">
                <Toggle label="個人練習を受け付ける" value={store.personalPracticeSettings?.enabled ?? true} onChange={v => u("personalPracticeSettings", { ...store.personalPracticeSettings, enabled: v })} />
                {store.personalPracticeSettings?.enabled && (
                    <div className="space-y-3 mt-3 ml-4">
                        <div>
                            <p className="text-xs text-muted-foreground font-bold mb-1.5">最大人数</p>
                            <div className="flex items-center gap-2">
                                <input type="number" min="1" className="w-16 p-2 bg-accent/10 border border-border rounded-lg text-sm font-bold text-foreground outline-none text-center" value={store.personalPracticeSettings?.maxPeople || 2} onChange={e => u("personalPracticeSettings", { ...store.personalPracticeSettings, maxPeople: parseInt(e.target.value) })} />
                                <span className="text-sm text-muted-foreground">人まで個人利用可</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-bold mb-1.5">料金（通常料金と異なる場合）</p>
                            <div className="flex items-center gap-2">
                                <input type="number" min="0" step="100" className="w-24 p-2 bg-accent/10 border border-border rounded-lg text-sm font-bold text-foreground outline-none text-center" placeholder="通常料金" value={store.personalPracticeSettings?.pricePerHour || ""} onChange={e => u("personalPracticeSettings", { ...store.personalPracticeSettings, pricePerHour: parseInt(e.target.value) || 0 })} />
                                <span className="text-sm text-muted-foreground">円 / 1時間</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1">空欄の場合はスタジオの通常料金を使用</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-bold mb-1.5">何日前から予約できるか</p>
                            <div className="flex items-center gap-2">
                                <input type="number" min="0" className="w-16 p-2 bg-accent/10 border border-border rounded-lg text-sm font-bold text-foreground outline-none text-center" value={store.personalPracticeSettings?.advanceDays ?? 1} onChange={e => u("personalPracticeSettings", { ...store.personalPracticeSettings, advanceDays: parseInt(e.target.value) })} />
                                <span className="text-sm text-muted-foreground">日前から</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-bold mb-1.5">何時間前まで予約できるか</p>
                            <div className="flex items-center gap-2">
                                <input type="number" min="0" max="48" className="w-16 p-2 bg-accent/10 border border-border rounded-lg text-sm font-bold text-foreground outline-none text-center" value={store.personalPracticeSettings?.advanceHours ?? 2} onChange={e => u("personalPracticeSettings", { ...store.personalPracticeSettings, advanceHours: parseInt(e.target.value) })} />
                                <span className="text-sm text-muted-foreground">時間前まで予約可</span>
                            </div>
                        </div>
                    </div>
                )}
            </Subsection>
            <Subsection title="割引設定">
                {/* 学割・その他割引はライト以上。中身を見せたうえでロックし、
                    何が使えるようになるのかが分かるようにする。 */}
                <PlanGate planKey={store.planKey} feature="student_discount" overrides={store.featureOverrides}>
                <Toggle label="学割" value={store.studentDiscount?.enabled ?? false} onChange={v => u("studentDiscount", { ...store.studentDiscount, enabled: v })} />
                {store.studentDiscount?.enabled && (
                    <div className="ml-4 mt-2 space-y-3">
                        <div className="flex gap-2 items-center flex-wrap">
                            <input type="number" className="w-20 p-2 bg-accent/10 border border-border rounded-lg text-sm font-bold text-foreground outline-none text-center" value={store.studentDiscount?.value || 0} onChange={e => u("studentDiscount", { ...store.studentDiscount, value: parseInt(e.target.value) })} />
                            <select className="p-2 bg-accent/10 border border-border rounded-lg text-sm font-bold text-foreground outline-none" value={store.studentDiscount?.discountType || "amount"} onChange={e => u("studentDiscount", { ...store.studentDiscount, discountType: e.target.value })}>
                                <option value="amount">円引き</option>
                                <option value="percentage">%割引</option>
                            </select>
                            <select className="p-2 bg-accent/10 border border-border rounded-lg text-sm font-bold text-foreground outline-none" value={(store.studentDiscount as any)?.billingUnit || "per_use"} onChange={e => u("studentDiscount", { ...store.studentDiscount, billingUnit: e.target.value })}>
                                <option value="per_use">1回あたり</option>
                                <option value="per_hour">1時間あたり</option>
                            </select>
                        </div>
                        <DiscountTimeEditor timeRestriction={store.studentDiscount?.timeRestriction} onChange={(tr: any) => u("studentDiscount", { ...store.studentDiscount, timeRestriction: tr })} />
                        <PersonalPracticeApplyToggle
                            value={store.studentDiscount?.applyToPersonalPractice}
                            onChange={v => u("studentDiscount", { ...store.studentDiscount, applyToPersonalPractice: v })}
                        />
                    </div>
                )}
                </PlanGate>
                <PlanGate planKey={store.planKey} feature="reservation_benefit" overrides={store.featureOverrides}>
                <div className="mt-3 space-y-3">
                    {(store.otherDiscounts || []).map((d: Discount, idx: number) => (
                        <div key={idx} className="bg-accent/10/50 rounded-xl p-3 space-y-2">
                            <div className="flex gap-2">
                                <input className="flex-1 p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none" placeholder="割引名（早割など）" value={d.name} onChange={e => uDiscount(idx, "name", e.target.value)} />
                                <button onClick={() => { const arr = [...(store.otherDiscounts || [])]; arr.splice(idx, 1); setStore({ ...store, otherDiscounts: arr }); }} className="text-red-400 px-2">✕</button>
                            </div>
                            <div className="flex gap-2 items-center flex-wrap">
                                <input type="number" className="w-20 p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none text-center" value={d.value} onChange={e => uDiscount(idx, "value", parseInt(e.target.value))} />
                                <select className="p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none" value={d.discountType} onChange={e => uDiscount(idx, "discountType", e.target.value)}>
                                    <option value="amount">円引き</option>
                                    <option value="percentage">%割引</option>
                                </select>
                                <select className="p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none" value={d.billingUnit || "per_use"} onChange={e => uDiscount(idx, "billingUnit", e.target.value)}>
                                    <option value="per_use">1回あたり</option>
                                    <option value="per_hour">1時間あたり</option>
                                </select>
                                <Toggle label="有効" value={d.enabled} onChange={v => uDiscount(idx, "enabled", v)} />
                            </div>
                            <DiscountTimeEditor timeRestriction={d.timeRestriction} onChange={tr => uDiscount(idx, "timeRestriction", tr)} />
                            <PersonalPracticeApplyToggle
                                value={d.applyToPersonalPractice}
                                onChange={v => uDiscount(idx, "applyToPersonalPractice", v)}
                            />
                        </div>
                    ))}
                    <button onClick={() => setStore({ ...store, otherDiscounts: [...(store.otherDiscounts || []), { name: "", enabled: true, discountType: "amount", value: 0 }] })} className="w-full py-2 border border-dashed border-border rounded-xl text-xs font-black text-muted-foreground hover:text-foreground transition-all">
                        + 割引を追加
                    </button>
                </div>
                </PlanGate>
            </Subsection>
            <Subsection title="個人練習割引設定">
                <p className="text-[10px] text-muted-foreground mb-2">個人練習利用時に適用される割引を設定できます</p>
                <div className="space-y-3">
                    {(store.personalPracticeDiscounts || []).map((d: Discount, idx: number) => {
                        const uPPD = (key: string, val: any) => {
                            const arr = [...(store.personalPracticeDiscounts || [])];
                            arr[idx] = { ...arr[idx], [key]: val };
                            setStore({ ...store, personalPracticeDiscounts: arr });
                        };
                        return (
                            <div key={idx} className="bg-accent/10/50 rounded-xl p-3 space-y-2">
                                <div className="flex gap-2">
                                    <input className="flex-1 p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none" placeholder="割引名（個人練習学割など）" value={d.name} onChange={e => uPPD("name", e.target.value)} />
                                    <button onClick={() => { const arr = [...(store.personalPracticeDiscounts || [])]; arr.splice(idx, 1); setStore({ ...store, personalPracticeDiscounts: arr }); }} className="text-red-400 px-2">✕</button>
                                </div>
                                <div className="flex gap-2 items-center flex-wrap">
                                    <input type="number" className="w-20 p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none text-center" value={d.value} onChange={e => uPPD("value", parseInt(e.target.value))} />
                                    <select className="p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none" value={d.discountType} onChange={e => uPPD("discountType", e.target.value)}>
                                        <option value="amount">円引き</option>
                                        <option value="percentage">%割引</option>
                                    </select>
                                    <select className="p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none" value={d.billingUnit || "per_use"} onChange={e => uPPD("billingUnit", e.target.value)}>
                                        <option value="per_use">1回あたり</option>
                                        <option value="per_hour">1時間あたり</option>
                                    </select>
                                    <Toggle label="有効" value={d.enabled} onChange={v => uPPD("enabled", v)} />
                                </div>
                                <DiscountTimeEditor timeRestriction={d.timeRestriction} onChange={tr => uPPD("timeRestriction", tr)} />
                            </div>
                        );
                    })}
                    <button onClick={() => setStore({ ...store, personalPracticeDiscounts: [...(store.personalPracticeDiscounts || []), { name: "", enabled: true, discountType: "amount", value: 0 }] })} className="w-full py-2 border border-dashed border-border rounded-xl text-xs font-black text-muted-foreground hover:text-foreground transition-all">
                        + 個人練習割引を追加
                    </button>
                </div>
            </Subsection>
            <Subsection title="パック料金設定">
                <p className="text-[10px] text-muted-foreground mb-2">オールナイトパックなど、時間帯を一括料金で提供できます</p>
                <div className="space-y-3">
                    {(store.nightPacks || []).map((np: any, idx: number) => {
                        const uNP = (key: string, val: any) => {
                            const arr = [...(store.nightPacks || [])];
                            arr[idx] = { ...arr[idx], [key]: val };
                            u("nightPacks", arr);
                        };
                        const toggleDay = (day: string) => {
                            const days = np.availableDays || ["weekday", "saturday", "sundayHoliday"];
                            uNP("availableDays", days.includes(day) ? days.filter((d: string) => d !== day) : [...days, day]);
                        };
                        return (
                            <div key={idx} className="bg-accent/10/50 rounded-xl p-3 space-y-2">
                                <div className="flex gap-2">
                                    <input className="flex-1 p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none" placeholder="パック名（オールナイトなど）" value={np.name} onChange={e => uNP("name", e.target.value)} />
                                    <button onClick={() => { const arr = [...(store.nightPacks || [])]; arr.splice(idx, 1); u("nightPacks", arr); }} className="text-red-400 px-2">✕</button>
                                </div>
                                <div className="flex gap-2 items-center flex-wrap">
                                    <input type="number" min={0} max={30} className="w-14 p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none text-center" value={np.startHour} onChange={e => uNP("startHour", parseInt(e.target.value))} />
                                    <span className="text-xs text-muted-foreground">時 〜</span>
                                    <input type="number" min={0} max={30} className="w-14 p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none text-center" value={np.endHour} onChange={e => uNP("endHour", parseInt(e.target.value))} />
                                    <span className="text-xs text-muted-foreground">時</span>
                                    <input type="number" min={0} step={500} className="w-24 p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none text-center" value={np.price} onChange={e => uNP("price", parseInt(e.target.value))} />
                                    <span className="text-xs text-muted-foreground">円</span>
                                    <Toggle label="有効" value={np.enabled} onChange={v => uNP("enabled", v)} />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className="text-[10px] text-muted-foreground">適用曜日:</span>
                                    {[{ key: "weekday", label: "平日" }, { key: "saturday", label: "土曜" }, { key: "sundayHoliday", label: "日祝" }].map(({ key, label }) => (
                                        <label key={key} className="flex items-center gap-1 cursor-pointer">
                                            <input type="checkbox" checked={(np.availableDays || ["weekday", "saturday", "sundayHoliday"]).includes(key)} onChange={() => toggleDay(key)} className="w-3 h-3 accent-purple-600" />
                                            <span className="text-[10px] font-bold text-muted-foreground">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    <button onClick={() => u("nightPacks", [...(store.nightPacks || []), { name: "オールナイトパック", enabled: true, startHour: 23, endHour: 6, price: 8000, availableDays: ["weekday", "saturday", "sundayHoliday"] }])} className="w-full py-2 border border-dashed border-border rounded-xl text-xs font-black text-muted-foreground hover:text-foreground transition-all">
                        + パック料金を追加
                    </button>
                </div>
            </Subsection>
        </Section>
    );
}

// ===== 個人練習にも適用するかの切り替え（学割・その他割引で共用） =====
// 既定は「適用しない」。個人練習には専用の「個人練習割引設定」があるため、
// バンド利用向けの学割などが個人練習にも二重で効いてしまうのを防ぐ。
function PersonalPracticeApplyToggle({ value, onChange }: { value?: boolean; onChange: (v: boolean) => void }) {
    return (
        <label className="flex items-start gap-2 cursor-pointer select-none mt-1">
            <input
                type="checkbox"
                checked={!!value}
                onChange={e => onChange(e.target.checked)}
                className="mt-0.5 w-3.5 h-3.5 accent-purple-600"
            />
            <span className="text-[10px] text-muted-foreground leading-snug">
                個人練習の予約にも適用する
                <span className="block opacity-80">オフの場合、個人練習では表示されません（個人練習向けは「個人練習割引設定」で設定してください）</span>
            </span>
        </label>
    );
}

// ===== 割引の時間帯・曜日制限エディタ（複数時間帯＋曜日選択。学割・その他割引で共用） =====
const STUDENT_WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];
function DiscountTimeEditor({ timeRestriction, onChange }: { timeRestriction?: any; onChange: (tr: any) => void }) {
    const tr = timeRestriction || { enabled: false, days: [], slots: [] };
    const update = (patch: any) => onChange({ ...tr, ...patch });
    const days: number[] = Array.isArray(tr.days) ? tr.days : [];
    const slots: { start: string; end: string }[] = Array.isArray(tr.slots) ? tr.slots : [];
    const toggleDay = (d: number) =>
        update({ enabled: true, days: days.includes(d) ? days.filter(x => x !== d) : [...days, d].sort((a, b) => a - b) });
    const setSlot = (i: number, field: "start" | "end", val: string) =>
        update({ enabled: true, slots: slots.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)) });
    const addSlot = () => update({ enabled: true, slots: [...slots, { start: "10:00", end: "18:00" }] });
    const removeSlot = (i: number) => update({ enabled: true, slots: slots.filter((_, idx) => idx !== i) });
    return (
        <div>
            {/* 行全体をクリック可能にする（共有Toggleはスイッチ部分しか反応しないため） */}
            <button type="button" onClick={() => update({ enabled: !tr.enabled })} className="flex items-center gap-3 cursor-pointer bg-transparent p-0 border-0">
                <div className={`w-10 h-6 rounded-full transition-all relative shrink-0 ${tr.enabled ? "bg-purple-600" : "bg-accent/20"}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${tr.enabled ? "left-5" : "left-1"}`} />
                </div>
                <span className="text-sm font-bold text-muted-foreground">時間帯・曜日を限定する</span>
            </button>
            {tr.enabled && (
                <div className="ml-4 mt-2 space-y-3">
                    <div>
                        <p className="text-[10px] text-muted-foreground font-bold mb-1">対象曜日（未選択＝全曜日）</p>
                        <div className="flex gap-1 flex-wrap">
                            {STUDENT_WEEKDAY_LABELS.map((label, d) => (
                                <button key={d} type="button" onClick={() => toggleDay(d)}
                                    className={`w-8 h-8 rounded-lg text-xs font-black border transition-all ${days.includes(d) ? "bg-purple-600 border-purple-500 text-white" : "bg-accent/10 border-border text-muted-foreground hover:border-gray-500"}`}>
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] text-muted-foreground font-bold mb-1">対象時間帯（複数設定可・未設定＝全時間）</p>
                        <div className="space-y-2">
                            {slots.map((s, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input type="time" value={s.start} onChange={e => setSlot(i, "start", e.target.value)} className="p-1.5 bg-accent/10 border border-border rounded text-xs font-bold text-foreground outline-none" />
                                    <span className="text-xs text-muted-foreground">〜</span>
                                    <input type="time" value={s.end} onChange={e => setSlot(i, "end", e.target.value)} className="p-1.5 bg-accent/10 border border-border rounded text-xs font-bold text-foreground outline-none" />
                                    <button type="button" onClick={() => removeSlot(i)} className="text-red-400 px-1 text-sm">✕</button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addSlot} className="mt-2 w-full py-1.5 border border-dashed border-border rounded-lg text-[10px] font-black text-muted-foreground hover:text-foreground transition-all">+ 時間帯を追加</button>
                    </div>
                    <p className="text-[10px] text-muted-foreground">この曜日・時間帯に当てはまる予約だけ、この割引が表示・適用されます。</p>
                </div>
            )}
        </div>
    );
}

// ===== 時間別料金エディタ =====
function PricingEditor({ pricing, onChange }: { pricing: RoomPricing; onChange: (p: RoomPricing) => void }) {
    const [activeDay, setActiveDay] = useState<"weekday" | "saturday" | "sundayHoliday">("weekday");
    const dayLabels = { weekday: "平日", saturday: "土曜", sundayHoliday: "日祝" } as const;
    const rawSlots = pricing[activeDay] as TimeSlot[] | { slots: TimeSlot[] } | undefined;
    const slots: TimeSlot[] = Array.isArray(rawSlots) ? rawSlots : Array.isArray((rawSlots as any)?.slots) ? (rawSlots as any).slots : [];

    const addSlot = () => onChange({ ...pricing, [activeDay]: [...slots, { start: "10:00", end: "22:00", price: 2000 }] });
    const updateSlot = (idx: number, key: string, val: any) => {
        const updated = slots.map((s, i) => i === idx ? { ...s, [key]: val } : s);
        onChange({ ...pricing, [activeDay]: updated });
    };
    const removeSlot = (idx: number) => onChange({ ...pricing, [activeDay]: slots.filter((_, i) => i !== idx) });

    return (
        <div className="mt-2">
            <div className="flex gap-1 mb-3">
                {(Object.keys(dayLabels) as Array<keyof typeof dayLabels>).map(d => (
                    <button key={d} onClick={() => setActiveDay(d)} className={`flex-1 py-1.5 text-xs font-black rounded-lg transition-all ${activeDay === d ? "bg-purple-600 text-white" : "bg-accent/10 text-muted-foreground hover:text-foreground"}`}>
                        {dayLabels[d]}
                    </button>
                ))}
            </div>
            <div className="space-y-2">
                {slots.map((slot, idx) => (
                    <div key={idx} className="flex gap-2 items-center bg-accent/10/50 rounded-xl p-2">
                        <input type="text" placeholder="10:00" className="p-1.5 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none w-24 text-center" value={slot.start} onChange={e => updateSlot(idx, "start", e.target.value)} />
                        <span className="text-muted-foreground text-xs">〜</span>
                        <input type="text" placeholder="24:00" className="p-1.5 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none w-24 text-center" value={slot.end} onChange={e => updateSlot(idx, "end", e.target.value)} />
                        <input type="number" className="p-1.5 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none w-20 text-center" value={slot.price} onChange={e => updateSlot(idx, "price", parseInt(e.target.value) || 0)} />
                        <span className="text-muted-foreground text-xs">円/h</span>
                        <button onClick={() => removeSlot(idx)} className="text-red-400 text-xs ml-auto">✕</button>
                    </div>
                ))}
                {slots.length === 0 && <p className="text-muted-foreground text-xs text-center py-2">時間帯を追加してください</p>}
            </div>
            <button onClick={addSlot} className="w-full mt-2 py-2 border border-dashed border-border rounded-xl text-xs font-black text-muted-foreground hover:text-foreground hover:border-purple-600 transition-all">
                + 時間帯を追加
            </button>
        </div>
    );
}

function StudiosTab({ store, setStore }: any) {
    const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
    const limits = getPlanLimits(store.planKey);
    const roomCount = (store.rooms || []).length;
    const atLimit = roomCount >= limits.roomLimit;
    const defaultPricing = (): RoomPricing => ({
        weekday: [{ start: "10:00", end: "22:00", price: 2000 }],
        saturday: [{ start: "10:00", end: "22:00", price: 2500 }],
        sundayHoliday: [{ start: "10:00", end: "22:00", price: 2500 }],
    });
    const addRoom = () => {
        if (atLimit) return;
        const newRoom: Room = { id: crypto.randomUUID(), name: "新しいスタジオ", basePrice: 2000, startType: "0min", images: [], pricing: defaultPricing() };
        setStore({ ...store, rooms: [...(store.rooms || []), newRoom] });
        setExpandedIdx((store.rooms || []).length);
    };
    const updateRoom = (idx: number, key: string, val: any) => {
        const arr = [...(store.rooms || [])];
        arr[idx] = { ...arr[idx], [key]: val };
        setStore({ ...store, rooms: arr });
    };
    const removeRoom = (idx: number) => {
        const arr = [...(store.rooms || [])]; arr.splice(idx, 1);
        setStore({ ...store, rooms: arr });
        if (expandedIdx === idx) setExpandedIdx(null);
    };
    return (
        <Section title="スタジオ設定">
            {(store.rooms || []).map((room: Room, idx: number) => (
                <div key={room.id} className="border border-border rounded-2xl overflow-hidden mb-3">
                    <div className="w-full flex justify-between items-center p-4 bg-accent/10/40 hover:bg-accent/10/60 transition-all cursor-pointer" onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-purple-400">ROOM {idx + 1}</span>
                            <span className="text-sm font-bold text-foreground">{room.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={e => { e.stopPropagation(); removeRoom(idx); }} className="text-red-400 text-xs px-2 hover:text-red-300">削除</button>
                            <span className="text-muted-foreground text-sm">{expandedIdx === idx ? "▲" : "▼"}</span>
                        </div>
                    </div>
                    {expandedIdx === idx && (
                        <div className="p-4 space-y-4 bg-card/30">
                            <Field label="スタジオ名" value={room.name} onChange={v => updateRoom(idx, "name", v)} />
                            <Field label="基本料金（円/時）" value={String(room.basePrice)} onChange={v => updateRoom(idx, "basePrice", parseInt(v) || 0)} type="number" />
                            <div>
                                <Label>説明文</Label>
                                <textarea className="w-full mt-1 p-3 bg-accent/10 border border-border rounded-xl text-sm font-bold text-foreground outline-none focus:border-purple-500 resize-none" rows={3} value={room.description || ""} onChange={e => updateRoom(idx, "description", e.target.value)} placeholder="このスタジオの特徴..." />
                            </div>
                            <div>
                                <Label>開始時間</Label>
                                <RadioGroup value={room.startType || "0min"} onChange={v => updateRoom(idx, "startType", v)} options={[{ value: "0min", label: "0分スタート（12:00〜）" }, { value: "30min", label: "30分スタート（12:30〜）" }]} />
                            </div>
                            <div>
                                <Label>時間別料金設定</Label>
                                <PricingEditor pricing={room.pricing || defaultPricing()} onChange={p => updateRoom(idx, "pricing", p)} />
                            </div>
                            <StorageMultiImageUpload label="写真" images={room.images || []} storagePath={`studios/${store.id}/rooms/${room.id}`} onChange={urls => updateRoom(idx, "images", urls)} />
                        </div>
                    )}
                </div>
            ))}
            <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-bold">
                    {roomCount} / {limits.roomLimit === Infinity ? "無制限" : limits.roomLimit} ルーム
                </p>
            </div>
            <button onClick={addRoom} disabled={atLimit}
                className={`w-full py-3 border-2 border-dashed rounded-2xl text-sm font-black transition-all ${atLimit ? "border-red-500/30 text-red-400/60 cursor-not-allowed" : "border-border text-muted-foreground hover:text-foreground hover:border-purple-600"}`}>
                {atLimit ? `ルーム上限に達しています（プランをアップグレードしてください）` : "+ スタジオを追加"}
            </button>
        </Section>
    );
}

const EQUIP_CATEGORIES: { value: string; label: string }[] = [
    { value: "amp", label: "アンプ" }, { value: "drums", label: "ドラム" }, { value: "mic", label: "マイク" },
    { value: "pa", label: "PA機器" }, { value: "guitar", label: "ギター" }, { value: "bass", label: "ベース" },
    { value: "keys", label: "キーボード" }, { value: "other", label: "その他" },
];
const EQUIP_STATUS: { value: string; label: string; color: string }[] = [
    { value: "active", label: "稼働中", color: "text-emerald-400 bg-emerald-600/20" },
    { value: "maintenance", label: "メンテ中", color: "text-amber-400 bg-amber-600/20" },
    { value: "broken", label: "故障", color: "text-red-400 bg-red-600/20" },
];

function OptionsTab({ store, setStore }: any) {
    const addOption = () => setStore({ ...store, equipmentOptions: [...(store.equipmentOptions || []), { name: "", pricePerHour: 0, priceType: "per_use", quantity: 1, category: "other", status: "active", assignedRoom: "" }] });
    const updateOption = (idx: number, key: string, val: any) => {
        const arr = [...(store.equipmentOptions || [])]; arr[idx] = { ...arr[idx], [key]: val };
        setStore({ ...store, equipmentOptions: arr });
    };
    const removeOption = (idx: number) => {
        const arr = [...(store.equipmentOptions || [])]; arr.splice(idx, 1);
        setStore({ ...store, equipmentOptions: arr });
    };

    const activeCount = (store.equipmentOptions || []).filter((o: EquipmentOption) => o.status !== "broken").length;
    const brokenCount = (store.equipmentOptions || []).filter((o: EquipmentOption) => o.status === "broken").length;
    const maintenanceCount = (store.equipmentOptions || []).filter((o: EquipmentOption) => o.status === "maintenance").length;

    return (
        <Section title="機材・楽器管理">
            {/* サマリー */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-emerald-600/10 rounded-xl p-3 text-center">
                    <p className="text-lg font-black text-emerald-400">{activeCount}</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase">稼働中</p>
                </div>
                <div className="bg-amber-600/10 rounded-xl p-3 text-center">
                    <p className="text-lg font-black text-amber-400">{maintenanceCount}</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase">メンテ中</p>
                </div>
                <div className="bg-red-600/10 rounded-xl p-3 text-center">
                    <p className="text-lg font-black text-red-400">{brokenCount}</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase">故障</p>
                </div>
            </div>

            {(store.equipmentOptions || []).map((opt: EquipmentOption, idx: number) => {
                const statusInfo = EQUIP_STATUS.find(s => s.value === (opt.status || "active")) || EQUIP_STATUS[0];
                const categoryInfo = EQUIP_CATEGORIES.find(c => c.value === (opt.category || "other"));
                return (
                    <div key={idx} className="bg-accent/10 rounded-2xl p-4 space-y-3 mb-3 border border-border">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] font-black text-muted-foreground uppercase">機材 {idx + 1}</p>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${statusInfo.color}`}>{statusInfo.label}</span>
                                {categoryInfo && <span className="text-[10px] font-bold text-muted-foreground bg-accent/20 px-2 py-0.5 rounded-full">{categoryInfo.label}</span>}
                            </div>
                            <button onClick={() => removeOption(idx)} className="text-red-400 text-xs font-bold hover:text-red-300">削除</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Field label="機材名" value={opt.name} onChange={v => updateOption(idx, "name", v)} placeholder="Marshall JCM800 等" />
                            <div>
                                <Label>カテゴリ</Label>
                                <select className="w-full mt-1 p-2.5 bg-accent/10 border border-border rounded-xl text-sm font-bold text-foreground outline-none" value={opt.category || "other"} onChange={e => updateOption(idx, "category", e.target.value)}>
                                    {EQUIP_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <Field label="数量" value={String(opt.quantity ?? 1)} onChange={v => updateOption(idx, "quantity", Math.max(1, parseInt(v) || 1))} type="number" />
                            <Field label="金額（円）" value={String(opt.pricePerHour)} onChange={v => updateOption(idx, "pricePerHour", parseInt(v) || 0)} type="number" />
                            <div>
                                <Label>課金方式</Label>
                                <select className="w-full mt-1 p-2.5 bg-accent/10 border border-border rounded-xl text-sm font-bold text-foreground outline-none" value={opt.priceType || "per_use"} onChange={e => updateOption(idx, "priceType", e.target.value)}>
                                    <option value="per_use">1回あたり</option>
                                    <option value="per_hour">1時間あたり</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label>ステータス</Label>
                                <select className="w-full mt-1 p-2.5 bg-accent/10 border border-border rounded-xl text-sm font-bold text-foreground outline-none" value={opt.status || "active"} onChange={e => updateOption(idx, "status", e.target.value)}>
                                    {EQUIP_STATUS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <Label>所属ルーム</Label>
                                <select className="w-full mt-1 p-2.5 bg-accent/10 border border-border rounded-xl text-sm font-bold text-foreground outline-none" value={opt.assignedRoom || ""} onChange={e => updateOption(idx, "assignedRoom", e.target.value)}>
                                    <option value="">共有（どのルームでも使用可）</option>
                                    {(store.rooms || []).map((r: Room) => <option key={r.id} value={r.name}>{r.name}（固定設置）</option>)}
                                </select>
                            </div>
                        </div>
                        <StorageImageUpload label="写真" image={opt.imageUrl} storagePath={`studios/${store.id}/options/${idx}`} onUpload={url => updateOption(idx, "imageUrl", url)} />
                    </div>
                );
            })}
            <button onClick={addOption} className="w-full py-3 border-2 border-dashed border-border rounded-2xl text-sm font-black text-muted-foreground hover:text-foreground hover:border-purple-600 transition-all">
                + 機材を追加
            </button>
        </Section>
    );
}

function StaffTab({ store, setStore, notify }: any) {
    const [newStaff, setNewStaff] = useState({ name: "", email: "", password: "", role: "staff" });
    const [editTarget, setEditTarget] = useState<StaffMember | null>(null);
    const [editForm, setEditForm] = useState({ name: "", email: "", newPassword: "", currentPassword: "", role: "staff" });
    const [saving, setSaving] = useState(false);

    const currentStaffId = typeof window !== "undefined" ? localStorage.getItem("staffId") : "";
    const currentRole = typeof window !== "undefined" ? localStorage.getItem("staffRole") : "staff";
    const isAdmin = currentRole === "admin";

    const openEdit = (s: StaffMember) => {
        setEditTarget(s);
        setEditForm({ name: s.name, email: s.email, newPassword: "", currentPassword: "", role: s.role });
    };

    const saveEdit = async () => {
        if (!editTarget || !store) return;
        setSaving(true);
        try {
            const isSelf = editTarget.id === currentStaffId;
            const body: any = {
                studioId: store.id,
                id: editTarget.id,
                requesterId: currentStaffId,
                name: editForm.name,
                email: editForm.email,
                role: editForm.role,
            };
            if (editForm.newPassword) {
                body.newPassword = editForm.newPassword;
                if (isSelf) body.password = editForm.currentPassword;
            }
            const res = await fetch("/api/staff", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
            const data = await res.json();
            if (!res.ok) { notify("エラー: " + (data.error || "保存失敗")); return; }
            // ローカル更新
            const updated = (store.staff || []).map((s: StaffMember) =>
                s.id === editTarget.id ? { ...s, name: editForm.name, email: editForm.email, role: editForm.role as "admin" | "staff" } : s
            );
            setStore({ ...store, staff: updated });
            setEditTarget(null);
            notify("更新しました");
        } finally { setSaving(false); }
    };

    const deleteStaff = async (id: string) => {
        if (!store || !window.confirm("削除しますか？")) return;
        const res = await fetch(`/api/staff?id=${id}&studioId=${store.id}&requesterId=${currentStaffId}`, { method: "DELETE" });
        const data = await res.json();
        if (!res.ok) { notify("エラー: " + (data.error || "削除失敗")); return; }
        setStore({ ...store, staff: (store.staff || []).filter((s: StaffMember) => s.id !== id) });
        notify("削除しました");
    };

    const addStaff = async () => {
        if (!newStaff.name || !newStaff.email || !store) return;
        const res = await fetch("/api/staff", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studioId: store.id, requesterId: currentStaffId, ...newStaff })
        });
        const data = await res.json();
        if (!res.ok) { notify("エラー: " + (data.error || "追加失敗")); return; }
        const member: StaffMember = { id: data.id, name: newStaff.name, email: newStaff.email, password: "", role: newStaff.role as "admin" | "staff", createdAt: new Date().toISOString() };
        setStore({ ...store, staff: [...(store.staff || []), member] });
        setNewStaff({ name: "", email: "", password: "", role: "staff" });
        notify("スタッフを追加しました");
    };

    return (
        <Section title="スタッフ管理">
            {/* 編集モーダル */}
            {editTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl">
                        <h3 className="text-base font-black">スタッフ情報編集</h3>
                        <Field label="名前" value={editForm.name} onChange={v => setEditForm({ ...editForm, name: v })} />
                        <Field label="メールアドレス" value={editForm.email} onChange={v => setEditForm({ ...editForm, email: v })} />
                        {isAdmin && editTarget.id !== currentStaffId && (
                            <div>
                                <Label>権限</Label>
                                <select className="w-full mt-1 p-2.5 bg-accent/10 border border-border rounded-xl text-sm font-bold text-foreground outline-none" value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })}>
                                    <option value="staff">スタッフ</option>
                                    <option value="admin">管理者</option>
                                </select>
                            </div>
                        )}
                        <div className="border-t border-border pt-3">
                            <p className="text-[10px] font-black text-muted-foreground uppercase mb-2">パスワード変更（変更する場合のみ）</p>
                            {editTarget.id === currentStaffId && (
                                <Field label="現在のパスワード" value={editForm.currentPassword} onChange={v => setEditForm({ ...editForm, currentPassword: v })} type="password" />
                            )}
                            <Field label="新しいパスワード" value={editForm.newPassword} onChange={v => setEditForm({ ...editForm, newPassword: v })} type="password" />
                        </div>
                        <div className="flex gap-2 pt-1">
                            <button onClick={() => setEditTarget(null)} className="flex-1 py-2.5 border border-border rounded-xl text-sm font-bold hover:bg-accent/20 transition-all">キャンセル</button>
                            <button onClick={saveEdit} disabled={saving} className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-black transition-all disabled:opacity-50">
                                {saving ? "保存中..." : "保存する"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* スタッフ一覧 */}
            <div className="space-y-2 mb-4">
                {(store.staff || []).map((s: StaffMember) => (
                    <div key={s.id} className="bg-accent/10/40 rounded-xl p-3 flex justify-between items-center">
                        <div>
                            <p className="text-sm font-black text-foreground">{s.name}
                                {s.id === currentStaffId && <span className="ml-2 text-[10px] text-purple-400 font-black">(自分)</span>}
                            </p>
                            <p className="text-xs text-muted-foreground">{s.email}</p>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${s.role === "admin" ? "bg-purple-600/30 text-purple-400" : "bg-accent/20 text-muted-foreground"}`}>
                                {s.role === "admin" ? "管理者" : "スタッフ"}
                            </span>
                        </div>
                        {isAdmin && (
                            <div className="flex gap-2">
                                <button onClick={() => openEdit(s)} className="text-xs font-black text-purple-400 hover:text-purple-300 px-2 py-1 border border-purple-600/40 rounded-lg transition-all">編集</button>
                                {s.id !== currentStaffId && (
                                    <button onClick={() => deleteStaff(s.id)} className="text-xs font-black text-red-400 hover:text-red-300 px-2 py-1 border border-red-600/40 rounded-lg transition-all">削除</button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 新規追加（管理者のみ・プラン制限あり）。
                スタッフ「追加」は staff_account の対象だが、一覧表示と
                自分のパスワード変更は全プランで使える必要がある。 */}
            {isAdmin && (
                <PlanGate planKey={store.planKey} feature="staff_account" overrides={store.featureOverrides}>
                <div className="bg-accent/10/40 rounded-2xl p-4 space-y-3">
                    <p className="text-xs font-black text-muted-foreground uppercase">新しいスタッフを追加</p>
                    <Field label="名前" value={newStaff.name} onChange={v => setNewStaff({ ...newStaff, name: v })} />
                    <Field label="メールアドレス" value={newStaff.email} onChange={v => setNewStaff({ ...newStaff, email: v })} />
                    <Field label="パスワード" value={newStaff.password} onChange={v => setNewStaff({ ...newStaff, password: v })} type="password" />
                    <div>
                        <Label>権限</Label>
                        <select className="w-full mt-1 p-2.5 bg-accent/10 border border-border rounded-xl text-sm font-bold text-foreground outline-none" value={newStaff.role} onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}>
                            <option value="staff">スタッフ</option>
                            <option value="admin">管理者</option>
                        </select>
                    </div>
                    <button onClick={addStaff} className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-black transition-all">追加する</button>
                </div>
                </PlanGate>
            )}
            {!isAdmin && (
                <p className="text-xs text-muted-foreground text-center py-4">スタッフの管理は管理者権限が必要です</p>
            )}
        </Section>
    );
}

function BlacklistTab({ store, setStore }: any) {
    const [newEntry, setNewEntry] = useState({ userId: "", userName: "", email: "", reason: "" });
    const add = () => {
        if (!newEntry.userName) return;
        setStore({ ...store, blacklist: [...(store.blacklist || []), { ...newEntry, createdAt: new Date().toISOString() }] });
        setNewEntry({ userId: "", userName: "", email: "", reason: "" });
    };
    return (
        <Section title="ブラックリスト">
            <p className="text-xs text-muted-foreground mb-3">登録されたユーザーはこの店舗を予約できなくなります。</p>
            {(store.blacklist || []).map((b: BlacklistEntry, idx: number) => (
                <div key={idx} className="bg-red-900/20 border border-red-800/30 rounded-xl p-3 mb-2 flex justify-between items-start">
                    <div>
                        <p className="text-sm font-black text-foreground">{b.userName}</p>
                        <p className="text-xs text-muted-foreground">{b.email}</p>
                        <p className="text-xs text-red-400 mt-1">{b.reason}</p>
                    </div>
                    <button onClick={() => { const arr = [...(store.blacklist || [])]; arr.splice(idx, 1); setStore({ ...store, blacklist: arr }); }} className="text-red-400 text-xs">解除</button>
                </div>
            ))}
            <div className="bg-accent/10/40 rounded-2xl p-4 space-y-3 mt-4">
                <Field label="ユーザー名" value={newEntry.userName} onChange={v => setNewEntry({ ...newEntry, userName: v })} />
                <Field label="メールアドレス" value={newEntry.email} onChange={v => setNewEntry({ ...newEntry, email: v })} />
                <Field label="理由" value={newEntry.reason} onChange={v => setNewEntry({ ...newEntry, reason: v })} />
                <button onClick={add} className="w-full py-2.5 bg-red-700 hover:bg-red-600 rounded-xl text-sm font-black transition-all">ブラックリストに追加</button>
            </div>
        </Section>
    );
}

function ContactTab({ store, notify }: any) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [sending, setSending] = useState(false);

    const send = () => {
        if (!title || !body) { notify("❌ タイトルと内容を入力してください"); return; }
        setSending(true);
        const subject = `【${store.storeName}様よりお問合せ】${title}`;
        window.location.href = `mailto:support@studi-go.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setTimeout(() => setSending(false), 1000);
        notify("✅ メールアプリを開きました");
    };

    return (
        <Section title="お問い合わせ">
            <p className="text-xs text-muted-foreground leading-relaxed">Studi-Goサポートへのお問い合わせです。送信するとメールアプリが開きます。</p>
            <div className="bg-accent/10/50 rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground font-black uppercase mb-1">送信先</p>
                <p className="text-purple-400 font-black text-sm">support@studi-go.com</p>
            </div>
            <div className="bg-accent/10/30 rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground font-black uppercase mb-1">件名プレビュー</p>
                <p className="text-xs text-muted-foreground font-bold">【{store.storeName}様よりお問合せ】{title || "（タイトルを入力）"}</p>
            </div>
            <Field label="タイトル" value={title} onChange={setTitle} placeholder="お問い合わせ内容のタイトル" />
            <div>
                <Label>お問い合わせ内容</Label>
                <textarea className="w-full mt-1 p-3 bg-accent/10 border border-border rounded-xl text-sm font-bold text-foreground outline-none focus:border-purple-500 resize-none" rows={6} value={body} onChange={e => setBody(e.target.value)} placeholder="お問い合わせ内容を入力してください..." />
            </div>
            <button onClick={send} disabled={sending} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-xl text-sm font-black transition-all">
                {sending ? "送信中..." : "メールで送信する"}
            </button>
        </Section>
    );
}

// ===== カレンダー =====
type CalendarView = "month" | "week" | "day";

function CalendarTab({ bookings, rooms, setBookings, allBookings, blockedSlots = [], equipmentOptions = [], equipmentRentals = [], storeId, businessHours, onRefreshBookings }: { bookings: Booking[]; rooms: Room[]; setBookings: any; allBookings: Booking[]; blockedSlots?: BlockedSlot[]; equipmentOptions?: EquipmentOption[]; equipmentRentals?: EquipmentRental[]; storeId?: string; businessHours?: { weekday: string; saturday: string; sundayHoliday: string }; onRefreshBookings?: () => void }) {
    const PAYMENT_METHOD_LABELS: Record<string, string> = {
        cash: "現金", paypay: "PayPay", rakuten_pay: "楽天ペイ", d_pay: "d払い",
        au_pay: "au PAY", ic_card: "交通系IC", credit_card: "クレジットカード",
        onsite: "店頭払い", other: "その他",
    };
    const [view, setView] = useState<CalendarView>("day");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedRoom, setSelectedRoom] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionMsg, setActionMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [selectedPayMethod, setSelectedPayMethod] = useState("cash");
    const [showBkImport, setShowBkImport] = useState(false);
    const [bkFile, setBkFile] = useState<File | null>(null);
    const [bkHeaders, setBkHeaders] = useState<string[]>([]);
    const [bkPreviewRows, setBkPreviewRows] = useState<string[][]>([]);
    const [showBkMapper, setShowBkMapper] = useState(false);
    const [bkImporting, setBkImporting] = useState(false);
    const [bkResult, setBkResult] = useState<any>(null);
    const bkFileRef = React.useRef<HTMLInputElement>(null);

    const handleBkFile = async (f: File) => {
        setBkFile(f); setBkResult(null); setShowBkMapper(false);
        try {
            const text = await readCsvFileAsText(f);
            const lines = text.split(/\r?\n/).filter(l => l.trim());
            const parsed = lines.slice(0, 6).map(l => l.split(",").map(c => c.replace(/^"|"$/g, "").trim()));
            if (parsed.length > 0) {
                setBkHeaders(parsed[0]);
                setBkPreviewRows(parsed.slice(1));
                setShowBkMapper(true);
            }
        } catch (e) { console.error("CSV読み取りエラー:", e); }
    };

    const handleBkMappingConfirm = async (mapping: ColumnMapping) => {
        if (!bkFile || !storeId) return;
        setBkImporting(true); setBkResult(null);
        try {
            const fd = new FormData();
            fd.append("file", bkFile);
            fd.append("studioId", storeId);
            fd.append("mapping", JSON.stringify(mapping));
            const res = await fetch("/api/store/bookings-import", { method: "POST", body: fd });
            const text = await res.text();
            let data;
            try { data = JSON.parse(text); } catch { data = { error: "サーバーエラー: " + text.substring(0, 300) }; }
            setBkResult(data);
            setShowBkMapper(false);
            if (data.success && onRefreshBookings) onRefreshBookings();
        } catch (e: any) { setBkResult({ error: "インポートに失敗しました: " + (e?.message || String(e)) }); }
        finally { setBkImporting(false); }
    };

    const downloadBkTemplate = () => {
        const bom = "\uFEFF";
        const csv = bom + "顧客名,メール,日付,開始時間,時間数,部屋名,料金,ステータス,メモ\n山田太郎,yamada@example.com,2026-04-01,10:00,2,Aスタジオ,5000,confirmed,\n";
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "予約インポートテンプレート.csv"; a.click();
    };

    const filtered = bookings.filter(b => b.status !== "cancelled" && (selectedRoom === "all" || b.roomName === selectedRoom));

    const go = (dir: number) => {
        const d = new Date(currentDate);
        if (view === "day") d.setDate(d.getDate() + dir);
        else if (view === "week") d.setDate(d.getDate() + dir * 7);
        else d.setMonth(d.getMonth() + dir);
        setCurrentDate(d);
    };

    const dateLabel = () => {
        if (view === "day") return currentDate.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "short" });
        if (view === "week") {
            const s = new Date(currentDate); s.setDate(s.getDate() - s.getDay());
            const e = new Date(s); e.setDate(e.getDate() + 6);
            return `${s.toLocaleDateString("ja-JP", { month: "long", day: "numeric" })} 〜 ${e.toLocaleDateString("ja-JP", { month: "long", day: "numeric" })}`;
        }
        return currentDate.toLocaleDateString("ja-JP", { year: "numeric", month: "long" });
    };

    const handlePaymentConfirm = async (bookingId: string) => {
        setActionLoading(true);
        setActionMsg(null);
        try {
            const res = await fetch("/api/store/booking-payment", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId, paymentMethod: selectedPayMethod }),
            });
            if (res.ok) {
                setBookings(allBookings.map((b: Booking) => b.id === bookingId ? { ...b, paymentStatus: "paid", paymentMethod: selectedPayMethod } as any : b));
                setSelectedBooking({ ...selectedBooking!, paymentStatus: "paid", paymentMethod: selectedPayMethod } as any);
                setActionMsg({ type: "success", text: `入金を確認しました（${PAYMENT_METHOD_LABELS[selectedPayMethod] || selectedPayMethod}）` });
                setShowPaymentForm(false);
            } else {
                setActionMsg({ type: "error", text: "消し込みに失敗しました" });
            }
        } catch { setActionMsg({ type: "error", text: "エラーが発生しました" }); }
        finally { setActionLoading(false); }
    };

    const updateBookingStatus = async (id: string, status: string) => {
        setActionLoading(true);
        setActionMsg(null);
        try {
            const res = await fetch("/api/admin-bookings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (res.ok) {
                setBookings(allBookings.map((b: Booking) => b.id === id ? { ...b, status } : b));
                setActionMsg({ type: "success", text: status === "confirmed" ? "✓ 予約を確定しました" : "予約をキャンセルしました" });
                setTimeout(() => { setSelectedBooking(null); setActionMsg(null); }, 1500);
            } else {
                setActionMsg({ type: "error", text: "操作に失敗しました" });
            }
        } catch {
            setActionMsg({ type: "error", text: "通信エラーが発生しました" });
        }
        setActionLoading(false);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                    <button onClick={() => go(-1)} className="p-2 bg-accent/10 hover:bg-accent/20 rounded-lg text-muted-foreground transition-all">◀</button>
                    <span className="font-black text-foreground text-base min-w-52 text-center">{dateLabel()}</span>
                    <button onClick={() => go(1)} className="p-2 bg-accent/10 hover:bg-accent/20 rounded-lg text-muted-foreground transition-all">▶</button>
                    <button onClick={() => setCurrentDate(new Date())} className="px-3 py-2 bg-accent/10 hover:bg-accent/20 rounded-lg text-xs font-black text-muted-foreground transition-all">今日</button>
                </div>
                <div className="flex items-center gap-3">
                    <select className="p-2 bg-accent/10 border border-border rounded-lg text-xs font-bold text-foreground outline-none" value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)}>
                        <option value="all">全スタジオ</option>
                        {rooms.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                    </select>
                    <button onClick={() => setShowBkImport(!showBkImport)} className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black rounded-lg transition-all">
                        予約CSVインポート
                    </button>
                    <div className="flex bg-accent/10 rounded-lg overflow-hidden">
                        {(["month", "week", "day"] as CalendarView[]).map(v => (
                            <button key={v} onClick={() => setView(v)} className={`px-3 py-2 text-xs font-black transition-all ${view === v ? "bg-purple-600 text-white" : "text-muted-foreground hover:text-foreground"}`}>
                                {v === "month" ? "月" : v === "week" ? "週" : "日"}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {showBkImport && (
                <div className="bg-card border border-border rounded-2xl p-5 mb-4">
                    <h3 className="font-black text-foreground text-sm mb-2">予約データCSVインポート</h3>
                    <p className="text-xs text-muted-foreground mb-3">他社システムからの予約データを一括登録できます。CSVをアップロードすると、列の対応関係を設定できます。</p>
                    <div className="bg-accent/10 border border-border/50 rounded-xl p-4 mb-4 text-xs text-muted-foreground space-y-2">
                        <p className="font-black text-foreground text-xs mb-1">インポートの手順</p>
                        <p>1. テンプレートCSVを取得、または他社システムからエクスポートしたCSVを用意します</p>
                        <p>2. 下のエリアにCSVファイルをドラッグ&ドロップ、またはクリックして選択します</p>
                        <p>3. カラムマッピング画面で、CSVの各列がどのフィールドに対応するか確認・調整します</p>
                        <p>4. マッピングを確認し「このマッピングでインポート」をクリックします</p>
                        <div className="border-t border-border/50 pt-2 mt-2">
                            <p className="font-black text-foreground mb-1">注意事項</p>
                            <p>・「予約日」と「開始時間」は必須です（マッピング画面で * マーク）</p>
                            <p>・「終了時間」があれば利用時間は自動計算されます（「利用時間」列がなくてもOK）</p>
                            <p>・「2026/4/11 13:00」のように日付と時刻が一列にまとまっていても対応します</p>
                            <p>・同じ日付・開始時間・部屋名の予約が既に存在する場合、重複としてスキップされます</p>
                            <p>・過去の予約もインポート可能です（売上実績・利用履歴として記録されます）</p>
                            <p>・Shift-JIS（他社エクスポートに多い）もUTF-8も自動判別します</p>
                            <p>・スタジオル等の他社CSVも、マッピング画面で列の対応を指定すればインポートできます</p>
                        </div>
                    </div>
                    <div className="flex gap-2 mb-3">
                        <button onClick={downloadBkTemplate} className="px-3 py-1.5 bg-accent/20 hover:bg-accent/30 text-foreground text-xs font-bold rounded-lg transition-all">
                            テンプレートCSVを取得
                        </button>
                    </div>
                    <div
                        onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("border-cyan-500"); }}
                        onDragLeave={e => { e.currentTarget.classList.remove("border-cyan-500"); }}
                        onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove("border-cyan-500"); const f = e.dataTransfer.files[0]; if (f) handleBkFile(f); }}
                        onClick={() => bkFileRef.current?.click()}
                        className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-cyan-500/50 transition-all"
                    >
                        <input ref={bkFileRef} type="file" accept=".csv" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleBkFile(f); }} />
                        <p className="text-muted-foreground text-sm font-bold">{bkFile ? bkFile.name : "CSVファイルをドラッグ&ドロップ または クリックして選択"}</p>
                    </div>
                    {showBkMapper && bkHeaders.length > 0 && (
                        <div className="mt-4">
                            <CsvColumnMapper
                                csvHeaders={bkHeaders}
                                previewRows={bkPreviewRows}
                                targetFields={BOOKING_TARGET_FIELDS}
                                onConfirm={handleBkMappingConfirm}
                                onCancel={() => { setShowBkMapper(false); setBkFile(null); setBkHeaders([]); setBkPreviewRows([]); }}
                                accentColor="cyan"
                            />
                        </div>
                    )}
                    {bkImporting && (
                        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-cyan-300">
                            <div className="animate-spin h-4 w-4 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                            インポート中...
                        </div>
                    )}
                    {bkResult && (
                        <div className={`mt-3 p-3 rounded-xl text-xs font-bold ${bkResult.success ? "bg-emerald-900/30 text-emerald-300" : "bg-red-900/30 text-red-300"}`}>
                            {bkResult.success
                                ? <p>完了: 新規{bkResult.created}件 / スキップ{bkResult.skipped}件（重複等）</p>
                                : <p>エラー: {bkResult.error}</p>
                            }
                            {bkResult.errors?.length > 0 && <ul className="mt-1 list-disc list-inside opacity-80">{bkResult.errors.map((e: string, i: number) => <li key={i}>{e}</li>)}</ul>}
                        </div>
                    )}
                </div>
            )}

            {view === "day" && <DayView date={currentDate} bookings={filtered} onBookingClick={setSelectedBooking} blockedSlots={blockedSlots} selectedRoom={selectedRoom} equipmentOptions={equipmentOptions} equipmentRentals={equipmentRentals} businessHours={businessHours} />}
            {view === "week" && <WeekView date={currentDate} bookings={filtered} onBookingClick={setSelectedBooking} blockedSlots={blockedSlots} />}
            {view === "month" && <MonthView date={currentDate} bookings={filtered} onDayClick={d => { setCurrentDate(d); setView("day"); }} blockedSlots={blockedSlots} />}

            {/* 予約詳細・操作モーダル */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => { setSelectedBooking(null); setActionMsg(null); }}>
                    <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-black text-foreground text-lg">予約詳細</h3>
                            <button onClick={() => { setSelectedBooking(null); setActionMsg(null); }} className="text-muted-foreground hover:text-foreground text-xl font-bold w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent/10">✕</button>
                        </div>

                        <div className="space-y-3 mb-5">
                            <div className="bg-accent/10 rounded-xl p-3 space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">ルーム</span>
                                    <span className="text-sm font-bold text-foreground">{selectedBooking.roomName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">日時</span>
                                    <span className="text-sm font-bold text-foreground">{selectedBooking.date} {selectedBooking.startTime}〜 ({selectedBooking.durationHours}h)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">金額</span>
                                    <span className="text-sm font-black text-purple-400">¥{selectedBooking.totalPrice?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">予約者</span>
                                    <span className="text-sm font-bold text-foreground">{selectedBooking.userName || "不明"}</span>
                                </div>
                                {selectedBooking.userEmail && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">メール</span>
                                        <span className="text-xs text-muted-foreground">{selectedBooking.userEmail}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">ステータス</span>
                                    <span className={`text-xs font-black px-2 py-1 rounded-full ${selectedBooking.status === "confirmed" ? "bg-purple-600/20 text-purple-400" : "bg-amber-600/20 text-amber-400"}`}>
                                        {selectedBooking.status === "confirmed" ? "✓ 確定済" : selectedBooking.status === "pending" ? "⚠ 未確定" : selectedBooking.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">支払い</span>
                                    <span className={`text-xs font-black px-2 py-1 rounded-full ${(selectedBooking as any).paymentStatus === "paid" ? "bg-emerald-600/20 text-emerald-400" : (selectedBooking as any).paymentMethod === "onsite" ? "bg-red-600/20 text-red-400" : "bg-emerald-600/20 text-emerald-400"}`}>
                                        {(selectedBooking as any).paymentStatus === "paid"
                                            ? `入金済（${PAYMENT_METHOD_LABELS[(selectedBooking as any).paymentMethod] || (selectedBooking as any).paymentMethod || "オンライン"}）`
                                            : (selectedBooking as any).paymentMethod === "onsite"
                                            ? "未払い（店頭払い）"
                                            : "オンライン決済済"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {actionMsg && (
                            <div className={`mb-3 px-3 py-2 rounded-lg text-sm font-bold ${actionMsg.type === "success" ? "bg-emerald-600/20 text-emerald-400" : "bg-red-600/20 text-red-400"}`}>
                                {actionMsg.text}
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            {selectedBooking.status !== "confirmed" && (
                                <button
                                    onClick={() => updateBookingStatus(selectedBooking.id, "confirmed")}
                                    disabled={actionLoading}
                                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-xl text-sm font-black text-white transition-all"
                                >
                                    {actionLoading ? "処理中..." : "✓ 予約を確定する"}
                                </button>
                            )}
                            {selectedBooking.status === "confirmed" && (
                                <div className="w-full py-3 bg-emerald-600/20 rounded-xl text-sm font-black text-emerald-400 text-center">
                                    ✓ 確定済み
                                </div>
                            )}

                            {/* 消し込み（店頭払いの入金確認） */}
                            {(selectedBooking as any).paymentMethod === "onsite" && (selectedBooking as any).paymentStatus !== "paid" && (
                                <>
                                    {!showPaymentForm ? (
                                        <button
                                            onClick={() => setShowPaymentForm(true)}
                                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-black text-white transition-all"
                                        >
                                            入金を確認する（消し込み）
                                        </button>
                                    ) : (
                                        <div className="bg-accent/10 rounded-xl p-3 space-y-2">
                                            <p className="text-xs font-black text-muted-foreground">支払い方法を選択：</p>
                                            <div className="grid grid-cols-3 gap-1">
                                                {Object.entries(PAYMENT_METHOD_LABELS).filter(([k]) => k !== "onsite").map(([key, label]) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => setSelectedPayMethod(key)}
                                                        className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all ${selectedPayMethod === key ? "bg-emerald-600 text-white" : "bg-accent/20 text-muted-foreground hover:bg-accent/30"}`}
                                                    >
                                                        {label}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() => handlePaymentConfirm(selectedBooking.id)}
                                                    disabled={actionLoading}
                                                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-lg text-xs font-black text-white"
                                                >
                                                    {actionLoading ? "処理中..." : "確定"}
                                                </button>
                                                <button
                                                    onClick={() => setShowPaymentForm(false)}
                                                    className="px-3 py-2 bg-accent/20 hover:bg-accent/30 rounded-lg text-xs font-bold text-muted-foreground"
                                                >
                                                    戻る
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            {(selectedBooking as any).paymentStatus === "paid" && (selectedBooking as any).paymentMethod !== "stripe" && (
                                <div className="w-full py-2 bg-emerald-600/10 rounded-xl text-xs font-black text-emerald-400 text-center">
                                    入金済（{PAYMENT_METHOD_LABELS[(selectedBooking as any).paymentMethod] || (selectedBooking as any).paymentMethod}）
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    if (!confirm("この予約をキャンセルしますか？")) return;
                                    updateBookingStatus(selectedBooking.id, "cancelled");
                                }}
                                disabled={actionLoading}
                                className="w-full py-3 bg-red-800 hover:bg-red-700 disabled:opacity-50 rounded-xl text-sm font-black text-white transition-all"
                            >
                                {actionLoading ? "処理中..." : "✕ 予約をキャンセル"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function DayView({ date, bookings, onBookingClick, blockedSlots = [], selectedRoom = "all", equipmentOptions = [], equipmentRentals = [], businessHours }: { date: Date; bookings: Booking[]; onBookingClick?: (b: Booking) => void; blockedSlots?: BlockedSlot[]; selectedRoom?: string; equipmentOptions?: EquipmentOption[]; equipmentRentals?: EquipmentRental[]; businessHours?: { weekday: string; saturday: string; sundayHoliday: string } }) {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
    const dayBookings = bookings.filter(b => b.date === dateStr);
    const dayBlocked = blockedSlots.filter(bs => bs.date === dateStr && (selectedRoom === "all" || bs.roomName === "all" || bs.roomName === selectedRoom));
    const dayRentals = equipmentRentals.filter(r => r.date === dateStr && (selectedRoom === "all" || !r.roomName || r.roomName === selectedRoom));
    const ROW_H = 48;
    const COL_W = 160;
    // 表示時間帯は店舗の営業時間から決める。
    // 260808まで 8:00〜22:00 固定だったため、深夜営業の店舗では22時以降の予約が
    // カレンダーに出ず「予約できない・予約が見えない」状態になっていた。
    const dow = date.getDay();
    const hoursStr = dow === 0 ? businessHours?.sundayHoliday : dow === 6 ? businessHours?.saturday : businessHours?.weekday;
    const bh = parseBusinessHours(hoursStr);
    // 営業時間外に入っている予約（時間変更・手入力など）も切れないように範囲を広げる
    const slotStarts = [
        ...dayBookings.map(b => parseSlotTime(b.startTime)?.hours ?? null),
        ...dayBlocked.map(bs => parseSlotTime(bs.startTime)?.hours ?? null),
    ].filter((h): h is number => h !== null);
    const slotEnds = [
        ...dayBookings.map(b => (parseSlotTime(b.startTime)?.hours ?? 0) + Math.ceil(b.durationHours || 1)),
        ...dayBlocked.map(bs => parseSlotTime(bs.endTime)?.hours ?? 0),
    ];
    // 行は1時間刻みの整数時にそろえる。開店が12:30でも行見出しは 12:00 から始める。
    // （小数のままだと "12.5:00" のような表示崩れになる）
    const START_H = Math.max(0, Math.floor(Math.min(bh.open, ...(slotStarts.length ? slotStarts : [bh.open]))));
    const END_H = Math.ceil(Math.max(bh.close, ...(slotEnds.length ? slotEnds : [bh.close])));
    const HOURS = Math.max(1, END_H - START_H);
    // 部屋ごとにグループ化（予約 + ブロック枠 + 機材貸出の部屋を合算）
    const bookingRooms = dayBookings.map(b => b.roomName);
    const blockedRooms = dayBlocked.filter(bs => bs.roomName !== "all").map(bs => bs.roomName);
    const rentalRooms = dayRentals.filter(r => r.roomName).map(r => r.roomName!);
    const rooms = Array.from(new Set([...bookingRooms, ...blockedRooms, ...rentalRooms]));
    return (
        <div className="flex gap-3">
        <div className="flex-1 bg-card rounded-2xl overflow-hidden border border-border">
            <div className="overflow-x-auto">
                <div style={{minWidth: 64 + Math.max(rooms.length, 1) * COL_W + 16}}>
                    {/* ヘッダー行 */}
                    <div className="flex border-b border-border bg-accent/10 sticky top-0 z-10">
                        <div className="w-16 shrink-0 border-r border-border" />
                        {rooms.length > 0 ? rooms.map(r => (
                            <div key={r} className="text-xs font-black text-muted-foreground p-2 text-center border-r border-border" style={{width: COL_W}}>{r}</div>
                        )) : <div className="text-xs font-black text-muted-foreground p-2" style={{width: COL_W}}>予約なし</div>}
                    </div>
                    {/* タイムライン */}
                    <div className="relative" style={{height: ROW_H * HOURS}}>
                        {Array.from({ length: HOURS }, (_, i) => i + START_H).map(h => (
                            <div key={h} className="flex border-b border-border absolute w-full" style={{top: (h - START_H) * ROW_H, height: ROW_H}}>
                                <div className="w-16 p-2 text-xs font-bold text-muted-foreground border-r border-border shrink-0">
                                    {String(h).padStart(2,"0")}:00
                                    {h >= 24 && <span className="block text-[9px] font-normal opacity-70">翌{String(h - 24).padStart(2,"0")}:00</span>}
                                </div>
                                {rooms.map(r => (
                                    <div key={r} className="border-r border-border/50" style={{width: COL_W}} />
                                ))}
                            </div>
                        ))}
                        {/* ブロック枠表示 */}
                        {dayBlocked.map(bs => {
                            const [bsH, bsM] = (bs.startTime || "00:00").split(":").map(Number);
                            const [beH, beM] = (bs.endTime || "00:00").split(":").map(Number);
                            const top = (bsH - START_H + bsM / 60) * ROW_H + 2;
                            const durationH = (beH * 60 + beM - bsH * 60 - bsM) / 60;
                            const height = Math.max(durationH * ROW_H - 4, ROW_H - 4);
                            if (bs.roomName === "all") {
                                // 全部屋にまたがるブロック
                                return rooms.map((r, ri) => (
                                    <div key={`${bs.id}-${ri}`} className="absolute rounded-lg px-2 py-1.5 text-xs font-bold text-white overflow-hidden" style={{
                                        top, height, left: 64 + ri * COL_W + 4, width: COL_W - 8,
                                        background: "repeating-linear-gradient(135deg, rgba(220,38,38,0.7), rgba(220,38,38,0.7) 4px, rgba(220,38,38,0.5) 4px, rgba(220,38,38,0.5) 8px)",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                    }}>
                                        <p className="truncate font-black">{bs.reason}</p>
                                        <p className="opacity-90 text-[10px]">{bs.startTime}〜{bs.endTime}</p>
                                        {bs.teacher && <p className="opacity-80 text-[10px]">{bs.teacher}</p>}
                                    </div>
                                ));
                            }
                            const colIdx = rooms.indexOf(bs.roomName);
                            if (colIdx === -1) return null;
                            return (
                                <div key={bs.id} className="absolute rounded-lg px-2 py-1.5 text-xs font-bold text-white overflow-hidden" style={{
                                    top, height, left: 64 + colIdx * COL_W + 4, width: COL_W - 8,
                                    background: "repeating-linear-gradient(135deg, rgba(220,38,38,0.7), rgba(220,38,38,0.7) 4px, rgba(220,38,38,0.5) 4px, rgba(220,38,38,0.5) 8px)",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                }}>
                                    <p className="truncate font-black">{bs.reason}</p>
                                    <p className="opacity-90 text-[10px]">{bs.startTime}〜{bs.endTime}</p>
                                    {bs.teacher && <p className="opacity-80 text-[10px]">{bs.teacher}</p>}
                                </div>
                            );
                        })}
                        {/* 予約表示 */}
                        {dayBookings.map(b => {
                            const startH = parseInt((b.startTime || "00:00").split(":")[0]);
                            const startM = parseInt((b.startTime || "00:00").split(":")[1] || "0");
                            const top = (startH - START_H + startM / 60) * ROW_H + 2;
                            const height = (b.durationHours || 1) * ROW_H - 4;
                            // 30分単位・深夜表記に対応した終了時刻ラベル（23:30+1h → 24:30）
                            const endTotalMin = startH * 60 + startM + (b.durationHours || 1) * 60;
                            const endLabel = `${String(Math.floor(endTotalMin / 60)).padStart(2, "0")}:${String(Math.round(endTotalMin % 60)).padStart(2, "0")}`;
                            const colIdx = rooms.indexOf(b.roomName);
                            const left = 64 + colIdx * COL_W + 4;
                            const bgColor = b.status === "confirmed"
                                ? "rgba(124,58,237,0.85)"
                                : b.status === "pending"
                                ? "rgba(245,158,11,0.85)"
                                : "rgba(220,38,38,0.75)";
                            return (
                                <div
                                    key={b.id}
                                    onClick={() => onBookingClick?.(b)}
                                    className="absolute rounded-lg px-2 py-1.5 text-xs font-bold text-white overflow-hidden transition-all"
                                    style={{
                                        top, height, left,
                                        width: COL_W - 8,
                                        background: bgColor,
                                        cursor: onBookingClick ? "pointer" : "default",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                                    }}
                                    title="クリックで詳細を表示"
                                >
                                    <p className="truncate font-black">{b.userName || b.userId}</p>
                                    <p className="opacity-90 text-[10px]">{b.startTime}〜{endLabel} ({b.durationHours}h)</p>
                                    <p className="opacity-80 text-[10px]">¥{b.totalPrice?.toLocaleString()}</p>
                                    <div className="flex items-center justify-between mt-0.5">
                                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full inline-block" style={{background: "rgba(255,255,255,0.25)"}}>
                                            {b.status === "confirmed" ? "✓ 確定" : b.status === "pending" ? "⚠ 未確定" : b.status}
                                            {(b as any).paymentMethod === "onsite" && (b as any).paymentStatus !== "paid" && " / 未払い"}
                                            {(b as any).paymentStatus === "paid" && (b as any).paymentMethod !== "stripe" && " / 入金済"}
                                        </span>
                                        {onBookingClick && <span className="text-[9px] opacity-70">詳細▸</span>}
                                    </div>
                                </div>
                            );
                        })}
                        {/* 機材貸出表示 */}
                        {dayRentals.map(r => {
                            const [rH, rM] = (r.startTime || "00:00").split(":").map(Number);
                            const [reH, reM] = (r.endTime || "00:00").split(":").map(Number);
                            const top = (rH - START_H + rM / 60) * ROW_H + 2;
                            const durationH = (reH * 60 + reM - rH * 60 - rM) / 60;
                            const height = Math.max(durationH * ROW_H - 4, ROW_H - 4);
                            const colIdx = r.roomName ? rooms.indexOf(r.roomName) : 0;
                            if (colIdx === -1) return null;
                            return (
                                <div key={r.id} className="absolute rounded-lg px-2 py-1.5 text-xs font-bold text-white overflow-hidden" style={{
                                    top, height, left: 64 + colIdx * COL_W + 4, width: COL_W - 8,
                                    background: "rgba(6,182,212,0.8)",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                    border: "1px dashed rgba(255,255,255,0.4)",
                                }}>
                                    <p className="truncate font-black">{r.equipmentName}</p>
                                    <p className="opacity-90 text-[10px]">{r.startTime}〜{r.endTime}</p>
                                    <p className="opacity-80 text-[10px]">{r.customerName} ({r.purpose})</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {dayBookings.length === 0 && dayBlocked.length === 0 && dayRentals.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p className="font-bold text-sm">この日の予約はありません</p>
                </div>
            )}
        </div>

        {/* 機材状況パネル */}
        {equipmentOptions.length > 0 && (
            <div className="w-56 shrink-0 bg-card border border-border rounded-2xl p-3 self-start">
                <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">機材状況</h4>
                <div className="space-y-2">
                    {equipmentOptions.map((eq, i) => {
                        const qty = eq.quantity ?? 1;
                        // この日の予約で使われている数を計算
                        const usedByBookings = dayBookings.filter(b =>
                            b.status !== "cancelled" &&
                            (b as any).equipmentIds?.includes(eq.name)
                        ).length;
                        // この日の貸出で使われている数を計算
                        const usedByRentals = dayRentals.filter(r => r.equipmentName === eq.name).length;
                        const usedCount = usedByBookings + usedByRentals;
                        const available = Math.max(0, qty - usedCount);
                        const statusColor = eq.status === "broken" ? "bg-red-600/20 border-red-600/30"
                            : eq.status === "maintenance" ? "bg-amber-600/20 border-amber-600/30"
                            : available === 0 ? "bg-purple-600/20 border-purple-600/30"
                            : "bg-emerald-600/10 border-emerald-600/20";
                        const dotColor = eq.status === "broken" ? "bg-red-500"
                            : eq.status === "maintenance" ? "bg-amber-500"
                            : available === 0 ? "bg-purple-500"
                            : "bg-emerald-500";
                        const statusLabel = eq.status === "broken" ? "故障"
                            : eq.status === "maintenance" ? "メンテ中"
                            : available === 0 ? "全て使用中"
                            : `${available}/${qty} 空き`;

                        return (
                            <div key={i} className={`rounded-xl p-2.5 border ${statusColor}`}>
                                <div className="flex items-center gap-1.5 mb-1">
                                    <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                                    <p className="text-xs font-black text-foreground truncate">{eq.name}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-muted-foreground">{eq.assignedRoom ? eq.assignedRoom : "共有"}</span>
                                    <span className="text-[10px] font-bold text-muted-foreground">{statusLabel}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
        </div>
    );
}
function WeekView({ date, bookings, onBookingClick, blockedSlots = [] }: { date: Date; bookings: Booking[]; onBookingClick?: (b: Booking) => void; blockedSlots?: BlockedSlot[] }) {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(d.getDate() + i); return d; });
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    const todayStr = new Date().toISOString().split("T")[0];

    return (
        <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => {
                const dateStr = d.toISOString().split("T")[0];
                const dayBkgs = bookings.filter(b => b.date === dateStr);
                const dayBlk = blockedSlots.filter(bs => bs.date === dateStr);
                const isToday = dateStr === todayStr;
                return (
                    <div key={i} className={`bg-card rounded-xl p-2 min-h-32 border ${isToday ? "border-purple-500" : "border-border"}`}>
                        <p className={`text-xs font-black mb-2 ${i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-muted-foreground"}`}>{dayNames[i]} {d.getDate()}</p>
                        <div className="space-y-1">
                            {dayBlk.map(bs => (
                                <div key={bs.id} className="rounded px-1.5 py-1 text-[10px] font-bold text-white leading-tight" style={{ background: "rgba(220,38,38,0.7)" }}>
                                    <p className="truncate">{bs.reason}</p>
                                    <p className="opacity-75">{bs.startTime}〜{bs.endTime}</p>
                                </div>
                            ))}
                            {dayBkgs.map(b => (
                                <div
                                    key={b.id}
                                    onClick={() => onBookingClick?.(b)}
                                    className="rounded px-1.5 py-1 text-[10px] font-bold text-foreground leading-tight transition-all"
                                    style={{
                                        background: b.status === "confirmed" ? "rgba(124,58,237,0.7)" : "rgba(245,158,11,0.7)",
                                        cursor: onBookingClick ? "pointer" : "default",
                                    }}
                                >
                                    <p className="truncate">{b.userName || b.roomName}</p>
                                    <p className="opacity-75">{b.startTime}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function MonthView({ date, bookings, onDayClick, blockedSlots = [] }: { date: Date; bookings: Booking[]; onDayClick: (d: Date) => void; blockedSlots?: BlockedSlot[] }) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    const todayStr = new Date().toISOString().split("T")[0];

    return (
        <div>
            <div className="grid grid-cols-7 mb-1">
                {dayNames.map((d, i) => <div key={i} className={`text-center text-xs font-black py-2 ${i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-muted-foreground"}`}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                    if (!day) return <div key={i} />;
                    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const dayBkgs = bookings.filter(b => b.date === dateStr);
                    const dayBlk = blockedSlots.filter(bs => bs.date === dateStr);
                    const isToday = dateStr === todayStr;
                    return (
                        <div key={i} onClick={() => onDayClick(new Date(year, month, day))} className={`bg-card rounded-xl p-2 min-h-16 border cursor-pointer hover:border-purple-500 transition-all ${isToday ? "border-purple-500" : "border-border"}`}>
                            <p className={`text-xs font-black mb-1 ${isToday ? "text-purple-400" : i % 7 === 0 ? "text-red-400" : i % 7 === 6 ? "text-blue-400" : "text-muted-foreground"}`}>{day}</p>
                            {dayBlk.slice(0, 1).map((bs, bi) => <div key={`bl-${bi}`} className="bg-red-600/70 rounded px-1 py-0.5 text-[9px] font-bold text-white mb-0.5 truncate">{bs.reason}</div>)}
                            {dayBkgs.slice(0, 2 - Math.min(dayBlk.length, 1)).map((b, bi) => <div key={bi} className="bg-purple-600/70 rounded px-1 py-0.5 text-[9px] font-bold text-white mb-0.5 truncate">{b.roomName}</div>)}
                            {(dayBkgs.length + dayBlk.length) > 2 && <p className="text-[9px] text-muted-foreground">+{dayBkgs.length + dayBlk.length - 2}</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ===== ブロック設定タブ =====
function BlockedSlotsTab({ storeId, rooms, blockedSlots, setBlockedSlots }: { storeId: string; rooms: Room[]; blockedSlots: BlockedSlot[]; setBlockedSlots: (s: BlockedSlot[]) => void }) {
    const [form, setForm] = useState({ roomName: "all", date: "", startTime: "10:00", endTime: "18:00", reason: "メンテナンス", teacher: "", memo: "" });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const reasons = ["メンテナンス", "レッスン", "イベント", "清掃", "その他"];

    const handleAdd = async () => {
        if (!form.date) { setMsg({ type: "error", text: "日付を入力してください" }); return; }
        setLoading(true);
        setMsg(null);
        try {
            const res = await fetch("/api/blocked-slots", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studioId: storeId, ...form, createdBy: localStorage.getItem("staffId") || "" }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setBlockedSlots([...blockedSlots, data.slot]);
                setForm({ ...form, date: "", teacher: "", memo: "" });
                setMsg({ type: "success", text: "ブロック枠を追加しました" });
            } else {
                setMsg({ type: "error", text: data.error || "追加に失敗しました" });
            }
        } catch {
            setMsg({ type: "error", text: "通信エラーが発生しました" });
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("このブロック枠を削除しますか？")) return;
        try {
            const res = await fetch(`/api/blocked-slots?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setBlockedSlots(blockedSlots.filter(s => s.id !== id));
            }
        } catch { /* ignore */ }
    };

    // 今日以降のブロック枠を日付順で表示
    const today = new Date().toISOString().split("T")[0];
    const upcoming = [...blockedSlots].filter(s => s.date >= today).sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
    const past = [...blockedSlots].filter(s => s.date < today).sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className="space-y-6">
            {/* 新規追加フォーム */}
            <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-black text-foreground text-lg mb-4">予約不可枠を追加</h3>
                <p className="text-xs text-muted-foreground mb-4">メンテナンスやレッスンなど、お客様が予約できない時間帯を設定します。お客様にはこの詳細は表示されません。</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">日付 *</label>
                        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">対象ルーム</label>
                        <select value={form.roomName} onChange={e => setForm({ ...form, roomName: e.target.value })}
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all">
                            <option value="all">全ルーム</option>
                            {rooms.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">開始時間 *</label>
                        <input type="time" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })}
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">終了時間 *</label>
                        <input type="time" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })}
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">理由</label>
                        <select value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all">
                            {reasons.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">先生・担当者名</label>
                        <input type="text" value={form.teacher} onChange={e => setForm({ ...form, teacher: e.target.value })} placeholder="例：田中先生"
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">メモ（内部用）</label>
                        <input type="text" value={form.memo} onChange={e => setForm({ ...form, memo: e.target.value })} placeholder="例：ドラムセットのメンテナンス"
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all" />
                    </div>
                </div>

                {msg && <div className={`mt-3 px-3 py-2 rounded-lg text-sm font-bold ${msg.type === "success" ? "bg-emerald-600/20 text-emerald-400" : "bg-red-600/20 text-red-400"}`}>{msg.text}</div>}

                <button onClick={handleAdd} disabled={loading}
                    className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 rounded-xl text-sm font-black text-white transition-all">
                    {loading ? "追加中..." : "ブロック枠を追加"}
                </button>
            </div>

            {/* 予定一覧 */}
            {upcoming.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-black text-foreground text-lg mb-4">今後のブロック枠</h3>
                    <div className="space-y-2">
                        {upcoming.map(bs => (
                            <div key={bs.id} className="flex items-center justify-between bg-accent/10 rounded-xl p-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-black text-red-400 bg-red-600/20 px-2 py-0.5 rounded-full">{bs.reason}</span>
                                        <span className="text-xs font-bold text-muted-foreground">{bs.roomName === "all" ? "全ルーム" : bs.roomName}</span>
                                    </div>
                                    <p className="text-sm font-black text-foreground">{bs.date} {bs.startTime}〜{bs.endTime}</p>
                                    {bs.teacher && <p className="text-xs text-muted-foreground mt-0.5">担当: {bs.teacher}</p>}
                                    {bs.memo && <p className="text-xs text-muted-foreground">メモ: {bs.memo}</p>}
                                </div>
                                <button onClick={() => handleDelete(bs.id)} className="ml-3 px-3 py-2 bg-red-800 hover:bg-red-700 rounded-lg text-xs font-black text-white transition-all">
                                    削除
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {past.length > 0 && (
                <details className="bg-card border border-border rounded-2xl p-6">
                    <summary className="font-black text-foreground text-lg cursor-pointer">過去のブロック枠 ({past.length}件)</summary>
                    <div className="space-y-2 mt-4">
                        {past.map(bs => (
                            <div key={bs.id} className="flex items-center justify-between bg-accent/5 rounded-xl p-3 opacity-60">
                                <div>
                                    <span className="text-xs font-black text-red-400 mr-2">{bs.reason}</span>
                                    <span className="text-xs font-bold text-muted-foreground">{bs.roomName === "all" ? "全ルーム" : bs.roomName}</span>
                                    <p className="text-sm font-bold text-foreground">{bs.date} {bs.startTime}〜{bs.endTime}</p>
                                    {bs.teacher && <p className="text-xs text-muted-foreground">担当: {bs.teacher}</p>}
                                </div>
                                <button onClick={() => handleDelete(bs.id)} className="ml-3 px-3 py-2 bg-accent/20 hover:bg-red-800 rounded-lg text-xs font-bold text-muted-foreground hover:text-white transition-all">
                                    削除
                                </button>
                            </div>
                        ))}
                    </div>
                </details>
            )}

            {blockedSlots.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p className="text-3xl mb-2">🔒</p>
                    <p className="font-bold text-sm">ブロック枠はまだ設定されていません</p>
                    <p className="text-xs mt-1">上のフォームから追加してください</p>
                </div>
            )}
        </div>
    );
}

// ===== 機材貸出タブ =====
function EquipmentRentalsTab({ storeId, rooms, equipmentOptions, rentals, setRentals }: { storeId: string; rooms: Room[]; equipmentOptions: EquipmentOption[]; rentals: EquipmentRental[]; setRentals: (r: EquipmentRental[]) => void }) {
    const [form, setForm] = useState({ equipmentName: "", roomName: "", date: "", startTime: "10:00", endTime: "18:00", customerName: "", purpose: "レンタル", memo: "" });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const purposes = ["レンタル", "内部利用", "レッスン", "イベント", "その他"];
    const activeEquipment = equipmentOptions.filter(e => e.status !== "broken");

    const handleAdd = async () => {
        if (!form.equipmentName || !form.date || !form.customerName) {
            setMsg({ type: "error", text: "機材名・日付・お客様名は必須です" }); return;
        }
        setLoading(true); setMsg(null);
        try {
            const res = await fetch("/api/equipment-rentals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studioId: storeId, ...form, createdBy: localStorage.getItem("staffId") || "" }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setRentals([...rentals, data.rental]);
                setForm({ ...form, date: "", customerName: "", memo: "" });
                setMsg({ type: "success", text: "機材貸出を登録しました" });
            } else {
                setMsg({ type: "error", text: data.error || "登録に失敗しました" });
            }
        } catch {
            setMsg({ type: "error", text: "通信エラーが発生しました" });
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("この貸出予約を削除しますか？")) return;
        try {
            const res = await fetch(`/api/equipment-rentals?id=${id}`, { method: "DELETE" });
            if (res.ok) setRentals(rentals.filter(r => r.id !== id));
        } catch { /* ignore */ }
    };

    const today = new Date().toISOString().split("T")[0];
    const upcoming = [...rentals].filter(r => r.date >= today).sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
    const past = [...rentals].filter(r => r.date < today).sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-black text-foreground text-lg mb-2">機材貸出を登録</h3>
                <p className="text-xs text-muted-foreground mb-4">店舗側から機材の貸し出しや内部利用を予約します。</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">機材 *</label>
                        <select value={form.equipmentName} onChange={e => setForm({ ...form, equipmentName: e.target.value })}
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all">
                            <option value="">選択してください</option>
                            {activeEquipment.map((eq, i) => <option key={i} value={eq.name}>{eq.name}{eq.quantity && eq.quantity > 1 ? ` (${eq.quantity}台)` : ""}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">日付 *</label>
                        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">開始時間</label>
                        <input type="time" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })}
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">終了時間</label>
                        <input type="time" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })}
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">お客様名 / 利用者名 *</label>
                        <input type="text" value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} placeholder="例：田中太郎 / スタッフ山田"
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">用途</label>
                        <select value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })}
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all">
                            {purposes.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">使用ルーム</label>
                        <select value={form.roomName} onChange={e => setForm({ ...form, roomName: e.target.value })}
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all">
                            <option value="">指定なし</option>
                            {rooms.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">メモ</label>
                        <input type="text" value={form.memo} onChange={e => setForm({ ...form, memo: e.target.value })} placeholder="例：アンプヘッドのみ貸出"
                            className="w-full p-3 bg-accent/10 rounded-xl font-bold text-foreground border border-border outline-none focus:border-purple-500 transition-all" />
                    </div>
                </div>

                {msg && <div className={`mt-3 px-3 py-2 rounded-lg text-sm font-bold ${msg.type === "success" ? "bg-emerald-600/20 text-emerald-400" : "bg-red-600/20 text-red-400"}`}>{msg.text}</div>}

                <button onClick={handleAdd} disabled={loading}
                    className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-xl text-sm font-black text-white transition-all">
                    {loading ? "登録中..." : "貸出を登録"}
                </button>
            </div>

            {upcoming.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-black text-foreground text-lg mb-4">今後の貸出予約</h3>
                    <div className="space-y-2">
                        {upcoming.map(r => (
                            <div key={r.id} className="flex items-center justify-between bg-accent/10 rounded-xl p-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-black text-purple-400 bg-purple-600/20 px-2 py-0.5 rounded-full">{r.equipmentName}</span>
                                        <span className="text-xs font-bold text-muted-foreground">{r.purpose}</span>
                                    </div>
                                    <p className="text-sm font-black text-foreground">{r.date} {r.startTime}〜{r.endTime}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">利用者: {r.customerName}</p>
                                    {r.roomName && <p className="text-xs text-muted-foreground">ルーム: {r.roomName}</p>}
                                    {r.memo && <p className="text-xs text-muted-foreground">メモ: {r.memo}</p>}
                                </div>
                                <button onClick={() => handleDelete(r.id)} className="ml-3 px-3 py-2 bg-red-800 hover:bg-red-700 rounded-lg text-xs font-black text-white transition-all">削除</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {past.length > 0 && (
                <details className="bg-card border border-border rounded-2xl p-6">
                    <summary className="font-black text-foreground text-lg cursor-pointer">過去の貸出 ({past.length}件)</summary>
                    <div className="space-y-2 mt-4">
                        {past.map(r => (
                            <div key={r.id} className="flex items-center justify-between bg-accent/5 rounded-xl p-3 opacity-60">
                                <div>
                                    <span className="text-xs font-black text-purple-400 mr-2">{r.equipmentName}</span>
                                    <span className="text-xs font-bold text-muted-foreground">{r.customerName}</span>
                                    <p className="text-sm font-bold text-foreground">{r.date} {r.startTime}〜{r.endTime}</p>
                                </div>
                                <button onClick={() => handleDelete(r.id)} className="ml-3 px-3 py-2 bg-accent/20 hover:bg-red-800 rounded-lg text-xs font-bold text-muted-foreground hover:text-white transition-all">削除</button>
                            </div>
                        ))}
                    </div>
                </details>
            )}

            {rentals.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p className="text-3xl mb-2">🎸</p>
                    <p className="font-bold text-sm">機材貸出の予約はまだありません</p>
                    <p className="text-xs mt-1">上のフォームから登録してください</p>
                </div>
            )}
        </div>
    );
}

function AnalyticsTab({ bookings, store, setStore, planKey }: any) {
    const activeBookings = bookings.filter((b: Booking) => b.status !== "cancelled");
    const totalRevenue = activeBookings.reduce((s: number, b: Booking) => s + (b.totalPrice || 0), 0);
    const [targetInput, setTargetInput] = useState(String(store.monthlyRevenueTarget || 300000));
    const target = parseInt(targetInput) || 300000;
    const rate = Math.min(Math.round((totalRevenue / target) * 100), 100);
    const uniqueUsers = new Set(activeBookings.map((b: Booking) => b.userId)).size;

    const downloadCSV = () => {
        const headers = ["予約ID", "スタジオ", "日付", "開始時間", "時間", "金額", "ステータス"];
        const rows = bookings.map((b: Booking) => [b.id, b.roomName, b.date, b.startTime, b.durationHours, b.totalPrice, b.status]);
        const csv = [headers, ...rows].map((r: any[]) => r.join(",")).join("\n");
        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = `sales_${new Date().toISOString().split("T")[0]}.csv`; a.click();
    };

    return (
        <div className="space-y-6">
            <PlanGate planKey={planKey} feature="sales_report">
                <div className="grid grid-cols-3 gap-4">
                    <StatCard label="総売上" value={`¥${totalRevenue.toLocaleString()}`} sub={`目標: ¥${target.toLocaleString()}`} />
                    <StatCard label="達成率" value={`${rate}%`} sub={`予約件数: ${activeBookings.length}件`} />
                    <StatCard label="利用者数" value={`${uniqueUsers}人`} sub="ユニークユーザー" />
                </div>
                <div className="bg-card border border-border rounded-2xl p-5 mt-4">
                    <p className="text-xs font-black text-muted-foreground uppercase mb-3">月間売上目標</p>
                    <div className="flex gap-3 items-center">
                        <input
                            type="number"
                            className="w-40 p-3 bg-accent/10 border border-border rounded-xl text-sm font-black text-foreground outline-none focus:border-purple-500"
                            value={targetInput}
                            onChange={e => setTargetInput(e.target.value)}
                            onBlur={() => setStore({ ...store, monthlyRevenueTarget: parseInt(targetInput) || 0 })}
                            placeholder="300000"
                        />
                        <span className="text-muted-foreground font-bold">円</span>
                    </div>
                    <div className="mt-3 bg-accent/10 rounded-full h-3 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all" style={{ width: `${rate}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{rate}% 達成</p>
                </div>
            </PlanGate>
            <PlanGate planKey={planKey} feature="booking_csv_export">
                <button onClick={downloadCSV} className="flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 border border-border rounded-xl text-sm font-black text-foreground transition-all">
                    📥 売上データをCSVダウンロード
                </button>
            </PlanGate>
        </div>
    );
}

function CustomersTab({ customers, bookings, planKey, storeId, onRefresh }: { customers: any[]; bookings: Booking[]; planKey?: string; storeId?: string; onRefresh?: () => void }) {
    const customerLimit = getPlanLimits(planKey).customerListLimit;
    const atCustomerLimit = customers.length > customerLimit;
    const visibleCustomers = atCustomerLimit ? customers.slice(0, customerLimit) : customers;
    const [showImport, setShowImport] = React.useState(false);
    const [csvFile, setCsvFile] = React.useState<File | null>(null);
    const [csvHeaders, setCsvHeaders] = React.useState<string[]>([]);
    const [csvPreviewRows, setCsvPreviewRows] = React.useState<string[][]>([]);
    const [showMapper, setShowMapper] = React.useState(false);
    const [importing, setImporting] = React.useState(false);
    const [importResult, setImportResult] = React.useState<any>(null);
    const fileRef = React.useRef<HTMLInputElement>(null);

    const handleFile = async (f: File) => {
        setCsvFile(f); setImportResult(null); setShowMapper(false);
        try {
            const text = await readCsvFileAsText(f);
            const lines = text.split(/\r?\n/).filter(l => l.trim());
            const parsed = lines.slice(0, 6).map(l => l.split(",").map(c => c.replace(/^"|"$/g, "").trim()));
            if (parsed.length > 0) {
                setCsvHeaders(parsed[0]);
                setCsvPreviewRows(parsed.slice(1));
                setShowMapper(true);
            }
        } catch (e) { console.error("CSV読み取りエラー:", e); }
    };

    const handleMappingConfirm = async (mapping: ColumnMapping) => {
        if (!csvFile || !storeId) return;
        setImporting(true); setImportResult(null);
        try {
            const fd = new FormData();
            fd.append("file", csvFile);
            fd.append("studioId", storeId);
            fd.append("mapping", JSON.stringify(mapping));
            const res = await fetch("/api/store/customers-import", { method: "POST", body: fd });
            const text = await res.text();
            let data;
            try { data = JSON.parse(text); } catch { data = { error: "サーバーエラー: " + text.substring(0, 300) }; }
            setImportResult(data);
            setShowMapper(false);
            if (data.success && onRefresh) onRefresh();
        } catch (e: any) { setImportResult({ error: "インポートに失敗しました: " + (e?.message || String(e)) }); }
        finally { setImporting(false); }
    };

    const downloadTemplate = () => {
        const bom = "\uFEFF";
        const csv = bom + "名前,メール,電話番号,LINE ID,メモ\n山田太郎,yamada@example.com,090-1234-5678,,常連のお客様\n";
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "顧客インポートテンプレート.csv"; a.click();
    };

    return (
        <div>
            <PlanGate planKey={planKey} feature="customer_rank">
                <div className="bg-card border border-border rounded-2xl p-5 mb-6">
                    <h3 className="font-black text-foreground text-sm mb-3">顧客ランク管理</h3>
                    <p className="text-xs text-muted-foreground mb-3">利用回数・LTVに基づいて顧客をランク分けし、特別オファーを送信できます</p>
                    <div className="flex gap-3">
                        {["ゴールド", "シルバー", "ブロンズ"].map(rank => (
                            <div key={rank} className="flex-1 bg-accent/10 rounded-xl p-3 text-center">
                                <p className="text-xs font-black text-muted-foreground">{rank}</p>
                                <p className="text-lg font-black text-foreground">0人</p>
                            </div>
                        ))}
                    </div>
                </div>
            </PlanGate>
            {/* フリープランは表示件数を PLAN_LIMITS.customerListLimit（50件）で絞る。
                260808まで定義だけあって未実装だった。件数を隠すのではなく
                「あと何件で上限か」を見せて、上位プランの理由を具体的にする。 */}
            {customerLimit !== Infinity && (
                <div className={`mb-4 rounded-xl border-2 p-3 text-xs font-bold ${atCustomerLimit ? "border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300" : "border-border bg-accent/10 text-muted-foreground"}`}>
                    {atCustomerLimit
                        ? `⚠️ フリープランは顧客${customerLimit}件までです。${customers.length - customerLimit}件が表示されていません。ライトプラン以上で全件表示できます。`
                        : `フリープランは顧客${customerLimit}件まで表示できます（現在 ${customers.length}件）。`}
                </div>
            )}
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-lg text-foreground">
                    顧客一覧 ({atCustomerLimit ? `${visibleCustomers.length} / ${customers.length}` : customers.length}件)
                </h2>
                <button onClick={() => setShowImport(!showImport)} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-lg transition-all">
                    CSVインポート
                </button>
            </div>

            {showImport && (
                <div className="bg-card border border-border rounded-2xl p-5 mb-6">
                    <h3 className="font-black text-foreground text-sm mb-2">顧客データCSVインポート</h3>
                    <p className="text-xs text-muted-foreground mb-3">他社予約システムからの乗り換え時に、顧客データを一括登録できます。CSVをアップロードすると、列の対応関係を設定できます。</p>
                    <div className="bg-accent/10 border border-border/50 rounded-xl p-4 mb-4 text-xs text-muted-foreground space-y-2">
                        <p className="font-black text-foreground text-xs mb-1">インポートの手順</p>
                        <p>1. テンプレートCSVを取得、または他社システムからエクスポートしたCSVを用意します</p>
                        <p>2. 下のエリアにCSVファイルをドラッグ&ドロップ、またはクリックして選択します</p>
                        <p>3. カラムマッピング画面で、CSVの各列がどのフィールドに対応するか確認・調整します</p>
                        <p>4. マッピングを確認し「このマッピングでインポート」をクリックします</p>
                        <div className="border-t border-border/50 pt-2 mt-2">
                            <p className="font-black text-foreground mb-1">注意事項</p>
                            <p>・メールアドレスが既存のユーザーと一致する場合、新規作成せず既存データに紐付けします</p>
                            <p>・ファイルはCSV形式（.csv）で、文字コードはUTF-8を推奨します</p>
                            <p>・スタジオル等の他社CSVも、マッピング画面で列の対応を指定すればインポートできます</p>
                        </div>
                    </div>
                    <div className="flex gap-2 mb-3">
                        <button onClick={downloadTemplate} className="px-3 py-1.5 bg-accent/20 hover:bg-accent/30 text-foreground text-xs font-bold rounded-lg transition-all">
                            テンプレートCSVを取得
                        </button>
                    </div>
                    <div
                        onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("border-purple-500"); }}
                        onDragLeave={e => { e.currentTarget.classList.remove("border-purple-500"); }}
                        onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove("border-purple-500"); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                        onClick={() => fileRef.current?.click()}
                        className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-purple-500/50 transition-all"
                    >
                        <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                        <p className="text-muted-foreground text-sm font-bold">{csvFile ? csvFile.name : "CSVファイルをドラッグ&ドロップ または クリックして選択"}</p>
                    </div>
                    {showMapper && csvHeaders.length > 0 && (
                        <div className="mt-4">
                            <CsvColumnMapper
                                csvHeaders={csvHeaders}
                                previewRows={csvPreviewRows}
                                targetFields={CUSTOMER_TARGET_FIELDS}
                                onConfirm={handleMappingConfirm}
                                onCancel={() => { setShowMapper(false); setCsvFile(null); setCsvHeaders([]); setCsvPreviewRows([]); }}
                                accentColor="purple"
                            />
                        </div>
                    )}
                    {importing && (
                        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-purple-300">
                            <div className="animate-spin h-4 w-4 border-2 border-purple-400 border-t-transparent rounded-full"></div>
                            インポート中...
                        </div>
                    )}
                    {importResult && (
                        <div className={`mt-3 p-3 rounded-xl text-xs font-bold ${importResult.success ? "bg-emerald-900/30 text-emerald-300" : "bg-red-900/30 text-red-300"}`}>
                            {importResult.success
                                ? <p>完了: 新規{importResult.created}件 / 更新{importResult.updated}件 / スキップ{importResult.skipped}件</p>
                                : <p>エラー: {importResult.error}</p>
                            }
                            {importResult.errors?.length > 0 && <ul className="mt-1 list-disc list-inside opacity-80">{importResult.errors.map((e: string, i: number) => <li key={i}>{e}</li>)}</ul>}
                        </div>
                    )}
                </div>
            )}

            {customers.length === 0
                ? <div className="text-center py-20 text-muted-foreground"><p className="text-4xl mb-3">👥</p><p className="font-bold">顧客データがありません</p><p className="text-xs mt-2">CSVインポートで他社システムから顧客データを移行できます</p></div>
                : <div className="space-y-3">{visibleCustomers.map((c: any) => {
                    const userBookings = bookings.filter(b => b.userId === c.id);
                    const ltv = userBookings.reduce((s, b) => s + (b.totalPrice || 0), 0);
                    const isLine = c.authProvider === "line" || !!c.lineUserId;
                    return (
                        <div key={c.id} className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                                {c.linePictureUrl ? (
                                    <img src={c.linePictureUrl} alt="" className="w-10 h-10 rounded-full shrink-0 border-2" style={{ borderColor: "#06C755" }} />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-base font-black text-muted-foreground">
                                        {(c.name || "?")[0]}
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-black text-foreground">{c.name || c.lineDisplayName || "名前未設定"}</p>
                                        {isLine && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shrink-0" style={{ background: "#06C755" }}>
                                                <svg width="9" height="9" viewBox="0 0 48 48" fill="white"><path d="M24 4C13 4 4 11.5 4 20.8c0 8 7.1 14.7 16.7 16.1l1.3 3.7c.3.9 1.5 1.1 2.1.4l3.8-3.8C38.1 35.5 44 28.6 44 20.8 44 11.5 35 4 24 4z"/></svg>
                                                LINE
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">{c.email || (isLine ? "LINE登録" : "メール未設定")}</p>
                                    {c.lineDisplayName && c.lineDisplayName !== c.name && (
                                        <p className="text-[10px] text-muted-foreground">LINE名: {c.lineDisplayName}</p>
                                    )}
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-sm font-black text-purple-400">LTV: ¥{ltv.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">利用{userBookings.length}回</p>
                            </div>
                        </div>
                    );
                })}</div>
            }
        </div>
    );
}

function CancellationsTab({ bookings, setBookings, allBookings }: { bookings: Booking[]; setBookings: any; allBookings: Booking[] }) {
    const cancelled = bookings.filter(b => b.status === "cancelled");
    const active = bookings.filter(b => b.status !== "cancelled");
    const cancel = async (id: string) => {
        if (!confirm("この予約をキャンセルしますか？")) return;
        const res = await fetch("/api/admin-bookings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: "cancelled" }) });
        if (res.ok) setBookings(allBookings.map((b: Booking) => b.id === id ? { ...b, status: "cancelled" } : b));
    };
    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-black text-foreground mb-3">アクティブな予約 ({active.length}件)</h2>
                <div className="space-y-3">
                    {active.map(b => (
                        <div key={b.id} className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
                            <div><p className="text-xs font-black text-purple-400">{b.roomName}</p><p className="font-black text-foreground">{b.date} {b.startTime}</p><p className="text-xs text-muted-foreground">{b.userName || b.userId}</p></div>
                            <div className="flex gap-3 items-center"><p className="font-black text-foreground">¥{b.totalPrice?.toLocaleString()}</p><button onClick={() => cancel(b.id)} className="px-3 py-1.5 bg-red-800 hover:bg-red-700 rounded-lg text-xs font-black transition-all">キャンセル</button></div>
                        </div>
                    ))}
                    {active.length === 0 && <p className="text-muted-foreground text-center py-8">アクティブな予約はありません</p>}
                </div>
            </div>
            <div>
                <h2 className="font-black text-foreground mb-3">キャンセル済 ({cancelled.length}件)</h2>
                <div className="space-y-2">
                    {cancelled.map(b => (
                        <div key={b.id} className="bg-card/50 border border-border/50 rounded-xl p-3 flex justify-between opacity-60">
                            <div><p className="text-xs font-bold text-muted-foreground">{b.roomName}</p><p className="text-sm font-bold text-muted-foreground">{b.date} {b.startTime}</p></div>
                            <p className="text-sm font-bold text-muted-foreground">¥{b.totalPrice?.toLocaleString()}</p>
                        </div>
                    ))}
                    {cancelled.length === 0 && <p className="text-muted-foreground text-center py-6">キャンセルはありません</p>}
                </div>
            </div>
        </div>
    );
}

// ===== 共通UIパーツ =====
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return <div><h2 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">{title}</h2><div className="space-y-4">{children}</div></div>;
}
function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
    return <div className="bg-accent/10/30 rounded-2xl p-4 space-y-3"><p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{title}</p>{children}</div>;
}
function Label({ children }: { children: React.ReactNode }) {
    return <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{children}</p>;
}
function Field({ label, value, onChange, placeholder = "", type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
    return (
        <div>
            <Label>{label}</Label>
            <input type={type} className="w-full mt-1 p-2.5 bg-accent/10 border border-border rounded-xl text-sm font-bold text-foreground outline-none focus:border-purple-500 transition-all" value={value || ""} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
        </div>
    );
}
function RadioGroup({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
    return (
        <div className="space-y-2">
            {options.map(opt => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${value === opt.value ? "border-purple-500" : "border-border"}`}>
                        {value === opt.value && <div className="w-2 h-2 rounded-full bg-purple-500" />}
                    </div>
                    <input type="radio" className="hidden" value={opt.value} checked={value === opt.value} onChange={() => onChange(opt.value)} />
                    <span className="text-sm font-bold text-muted-foreground">{opt.label}</span>
                </label>
            ))}
        </div>
    );
}
function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => onChange(!value)} className={`w-10 h-6 rounded-full transition-all relative ${value ? "bg-purple-600" : "bg-accent/20"}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${value ? "left-5" : "left-1"}`} />
            </div>
            <span className="text-sm font-bold text-muted-foreground">{label}</span>
        </label>
    );
}
function StorageImageUpload({ label, image, storagePath, onUpload }: { label: string; image?: string; storagePath: string; onUpload: (url: string) => void }) {
    const [uploading, setUploading] = useState(false);
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        setUploading(true);
        try {
            const reader = new FileReader();
            reader.onloadend = async () => { const url = await uploadImageToStorage(reader.result as string, storagePath); onUpload(url); setUploading(false); };
            reader.readAsDataURL(file);
        } catch { setUploading(false); }
    };
    return (
        <div><Label>{label}</Label>
            <div className="relative mt-1 bg-accent/10 border border-border h-32 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer hover:border-purple-500 transition-all group">
                {uploading ? <span className="text-purple-400 font-black text-xs animate-pulse">アップロード中...</span> : image ? <img src={image} className="w-full h-full object-cover" alt={label} /> : <span className="text-muted-foreground font-black text-xs group-hover:text-muted-foreground">クリックしてアップロード</span>}
                {!uploading && <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFile} />}
                {image && !uploading && (
                    <button
                        onClick={(e) => { e.stopPropagation(); if (confirm("この画像を削除しますか？")) onUpload(""); }}
                        className="absolute top-1 right-1 bg-black/70 hover:bg-black/90 rounded-full w-6 h-6 text-red-400 text-xs flex items-center justify-center z-10"
                    >✕</button>
                )}
            </div>
        </div>
    );
}
function StorageMultiImageUpload({ label, images, storagePath, onChange }: { label: string; images: string[]; storagePath: string; onChange: (urls: string[]) => void }) {
    const [uploading, setUploading] = useState(false);
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        setUploading(true);
        try {
            const reader = new FileReader();
            reader.onloadend = async () => { const url = await uploadImageToStorage(reader.result as string, `${storagePath}/${Date.now()}`); onChange([...images, url]); setUploading(false); };
            reader.readAsDataURL(file);
        } catch { setUploading(false); }
    };
    return (
        <div><Label>{label}</Label>
            <div className="mt-1 grid grid-cols-3 gap-2">
                {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square bg-accent/10 rounded-lg overflow-hidden">
                        <img src={img} className="w-full h-full object-cover" alt="" />
                        <button onClick={() => onChange(images.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-black/70 rounded-full w-5 h-5 text-red-400 text-xs flex items-center justify-center">✕</button>
                    </div>
                ))}
                <label className={`aspect-square bg-accent/10 border border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-500 transition-all ${uploading ? "opacity-50" : ""}`}>
                    {uploading ? <span className="text-purple-400 text-xs animate-pulse">...</span> : <span className="text-muted-foreground text-xl">+</span>}
                    {!uploading && <input type="file" accept="image/*" className="hidden" onChange={handleFile} />}
                </label>
            </div>
        </div>
    );
}
function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
    return (
        <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">{label}</p>
            <p className="text-2xl font-black text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{sub}</p>
        </div>
    );
}

// ==================== PlanTab ====================
const PLANS = [
    {
        key: "free",
        name: "フリー",
        price: 0,
        color: "#9ca3af",
        desc: "お試し利用向け（1ルームまで）",
        features: [
            "予約カレンダー・手動予約",
            "Stripe決済（手数料5%）",
            "顧客一覧・予約履歴",
            "クーポン発行（一部制限）",
            "VOUCHA連携",
            "予約確認メール",
            "ブラックリスト",
        ],
        limits: "1ルーム / 1拠点 / 手数料5%",
    },
    {
        key: "light",
        name: "ライト",
        price: 2980,
        color: "#22c55e",
        desc: "小規模スタジオ向け（5ルームまで）",
        features: [
            "フリーの全機能（手数料なし）",
            "売上レポート・予実管理",
            "CSVエクスポート",
            "スタッフ管理",
            "機材管理",
            "学割・キャンペーン管理",
            "ページデザイン変更",
            "KPIダッシュボード",
        ],
        limits: "5ルーム / 1拠点 / 手数料なし",
    },
    {
        key: "standard",
        name: "スタンダード",
        price: 5980,
        color: "#f97316",
        desc: "中規模スタジオ向け（15ルーム / 2拠点）",
        features: [
            "ライトの全機能",
            "複数拠点管理（2拠点）",
            "ヒートマップ分析",
            "自動リマインドメール",
            "トップページ優先掲載",
        ],
        limits: "15ルーム / 2拠点 / 手数料なし",
    },
    {
        key: "pro",
        name: "プロ",
        price: 12800,
        color: "#eab308",
        desc: "大規模・複数拠点向け（無制限）",
        features: [
            "スタンダードの全機能",
            "LINE予約・連携（標準で込み）",
            "API連携",
            "顧客ランク",
            "キャンセル待ち",
            "定期予約（月額会員）",
            "直前割引（フラッシュ）",
            "優先サポート",
        ],
        limits: "ルーム・拠点無制限 / 手数料なし",
    },
];

const PLAN_OPTIONS = [
    { key: "custom_domain", name: "カスタムドメイン", price: 1000, billingType: "monthly", desc: "独自ドメインでページ公開" },
    { key: "setup_support", name: "店舗設定サポート", price: 12000, billingType: "once", desc: "初期設定・登録代行（1回のみ）" },
    { key: "line_booking_opt", name: "LINE予約・連携", price: 9500, billingType: "once", desc: "お客様がLINEログインで予約（1回のみ・ライト/スタンダード向け）" },
];

function PromotionsTab({ store, setStore }: any) {
    const promotions = store.promotions || {};
    const vowcha = promotions.vowcha || { enabled: false, qrImageUrl: "", discountText: "500円×12枚クーポン", description: "バウチャアプリでデジタルクーポンをゲット！" };
    const customList: any[] = promotions.customList || [];
    const [uploadingId, setUploadingId] = React.useState<string | null>(null);

    const updateVowcha = (field: string, val: any) => {
        setStore((s: any) => ({ ...s, promotions: { ...s.promotions, vowcha: { ...vowcha, [field]: val } } }));
    };
    const addCustom = () => {
        const newItem = { id: Date.now().toString(), title: "新しい特典", description: "内容を入力してください", imageUrl: "", validUntil: "", requiresLogin: true };
        setStore((s: any) => ({ ...s, promotions: { ...s.promotions, customList: [...customList, newItem] } }));
    };
    const updateCustom = (id: string, field: string, val: any) => {
        setStore((s: any) => ({ ...s, promotions: { ...s.promotions, customList: customList.map((c: any) => c.id === id ? { ...c, [field]: val } : c) } }));
    };
    const removeCustom = (id: string) => {
        setStore((s: any) => ({ ...s, promotions: { ...s.promotions, customList: customList.filter((c: any) => c.id !== id) } }));
    };
    const handleCustomImageUpload = async (id: string, file: File) => {
        setUploadingId(id);
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                try {
                    const base64 = reader.result as string;
                    const url = await uploadImageToStorage(base64, `studios/${store.id}/promotions/${id}`);
                    updateCustom(id, "imageUrl", url);
                    setUploadingId(null);
                } catch (uploadError: any) {
                    console.error("Upload error:", uploadError);
                    alert(`画像アップロードに失敗しました: ${uploadError.message || "不明なエラー"}`);
                    setUploadingId(null);
                }
            };
            reader.onerror = () => {
                alert("ファイルの読み込みに失敗しました");
                setUploadingId(null);
            };
        } catch (e: any) {
            alert(`エラーが発生しました: ${e.message}`);
            setUploadingId(null);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="font-black text-foreground text-base mb-1">特典・クーポン設定</h3>
                <p className="text-muted-foreground text-xs mb-4">店舗ページに表示される特典・クーポン情報を設定します</p>
            </div>

            {/* バウチャクーポン設定 */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-black text-foreground text-sm">バウチャクーポン</p>
                            <a href="/about/voucha" target="_blank" className="text-[10px] text-purple-400 hover:text-purple-300 underline font-bold transition-colors">バウチャクーポンとは？</a>
                        </div>
                        <p className="text-muted-foreground text-xs mt-0.5">株式会社ACTIVAのデジタルクーポンサービス</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={vowcha.enabled} onChange={e => updateVowcha("enabled", e.target.checked)} />
                        <div className="w-10 h-5 bg-gray-600 peer-checked:bg-purple-600 rounded-full transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                </div>
                {vowcha.enabled ? (
                    <div className="space-y-4 p-5">
                        <div>
                            <label className="text-xs font-bold text-foreground block mb-1">クーポン説明文</label>
                            <input value={vowcha.discountText} onChange={e => updateVowcha("discountText", e.target.value)} className="w-full bg-accent/10 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-purple-500" placeholder="例: 500円×12枚クーポン" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-foreground block mb-1">サブ説明文</label>
                            <input value={vowcha.description} onChange={e => updateVowcha("description", e.target.value)} className="w-full bg-accent/10 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-purple-500" placeholder="例: バウチャアプリでデジタルクーポンをゲット！" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-foreground block mb-1">QRコード画像URL（任意）</label>
                            <input value={vowcha.qrImageUrl} onChange={e => updateVowcha("qrImageUrl", e.target.value)} className="w-full bg-accent/10 border border-border rounded-lg px-3 py-2 text-sm text-foreground font-mono outline-none focus:border-purple-500" placeholder="https://..." />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-foreground block mb-1">バウチャリンクURL（任意）</label>
                            <input value={vowcha.linkUrl || ""} onChange={e => updateVowcha("linkUrl", e.target.value)} className="w-full bg-accent/10 border border-border rounded-lg px-3 py-2 text-sm text-foreground font-mono outline-none focus:border-purple-500" placeholder="https://vowcha.net/..." />
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
                            <p className="text-xs text-blue-400 font-bold">ログイン済みユーザーのみ表示されます</p>
                            <p className="text-xs text-blue-300/70 mt-0.5">未ログインのユーザーにはログイン促進メッセージを表示します</p>
                        </div>
                    </div>
                ) : (
                    <div className="px-5 py-4">
                        <p className="text-xs text-muted-foreground">オフの場合、ユーザーの予約ページにバウチャクーポン情報は表示されません</p>
                    </div>
                )}
            </div>

            {/* 店舗独自特典 */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-black text-foreground text-sm">店舗独自特典</p>
                        <p className="text-xs text-muted-foreground mt-0.5">店舗ページに表示する独自の特典・サービス</p>
                    </div>
                    <button onClick={addCustom} className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-black text-white transition-all">+ 追加</button>
                </div>
                {customList.length === 0 && (
                    <div className="text-center py-8 border border-dashed border-border rounded-2xl">
                        <p className="text-muted-foreground text-xs">特典がまだありません</p>
                        <p className="text-muted-foreground text-xs mt-1">「＋追加」ボタンで作成できます</p>
                    </div>
                )}
                {customList.map((item: any) => (
                    <div key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                        {/* 画像エリア */}
                        <div className="relative">
                            {item.imageUrl ? (
                                <div className="relative h-28 bg-accent/10">
                                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                                    <button onClick={() => updateCustom(item.id, "imageUrl", "")} className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg hover:bg-black/80 transition-all">画像を削除</button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center h-20 bg-accent/10 border-b border-border cursor-pointer hover:bg-accent/20 transition-all">
                                    <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleCustomImageUpload(item.id, f); }} />
                                    {uploadingId === item.id ? (
                                        <p className="text-xs text-muted-foreground font-bold animate-pulse">アップロード中...</p>
                                    ) : (
                                        <>
                                            <p className="text-2xl text-muted-foreground/50">+</p>
                                            <p className="text-xs text-muted-foreground font-bold mt-1">画像をアップロード</p>
                                        </>
                                    )}
                                </label>
                            )}
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="flex gap-2 items-start">
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-muted-foreground">タイトル</label>
                                    <input value={item.title} onChange={e => updateCustom(item.id, "title", e.target.value)} className="w-full mt-1 bg-accent/10 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-purple-500" />
                                </div>
                                <button onClick={() => removeCustom(item.id)} className="text-red-500 hover:text-red-400 text-xs font-bold mt-5 shrink-0">削除</button>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-muted-foreground">説明文</label>
                                <textarea value={item.description} onChange={e => updateCustom(item.id, "description", e.target.value)} rows={2} className="w-full mt-1 bg-accent/10 border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none outline-none focus:border-purple-500" />
                            </div>
                            <div className="flex gap-3 items-end">
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-muted-foreground">有効期限（任意）</label>
                                    <input type="date" value={item.validUntil} onChange={e => updateCustom(item.id, "validUntil", e.target.value)} className="w-full mt-1 bg-accent/10 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none" />
                                </div>
                                <label className="flex items-center gap-2 text-xs font-bold text-foreground cursor-pointer mb-2">
                                    <input type="checkbox" checked={item.requiresLogin} onChange={e => updateCustom(item.id, "requiresLogin", e.target.checked)} className="w-4 h-4 accent-purple-600" />
                                    ログイン必須
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PlanTab({ store, setStore, notify }: any) {
    const currentPlan = store.planKey || null;
    const currentOptions = store.planOptions || [];
    const [selectedPlan, setSelectedPlan] = React.useState(currentPlan);
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>(currentOptions);
    const [payMethod, setPayMethod] = React.useState("stripe");
    const [saving, setSaving] = React.useState(false);
    const [plans, setPlans] = React.useState<any[]>(PLANS);
    const [planOptions, setPlanOptions] = React.useState<any[]>(PLAN_OPTIONS);
    const [showFeatureTable, setShowFeatureTable] = React.useState(false);
    const [customDomain, setCustomDomain] = React.useState(store.customDomain || "");
    const [showPlanList, setShowPlanList] = React.useState(!currentPlan);

    // plan-features.tsからインポートしたデータを使う
    const { PLAN_DEFINITIONS, FEATURE_CATEGORIES, FEATURE_LABELS, canUseFeature: checkFeature } = React.useMemo(() => {
        const pf = require("@/lib/plan-features");
        return { PLAN_DEFINITIONS: pf.PLAN_DEFINITIONS, FEATURE_CATEGORIES: pf.FEATURE_CATEGORIES, FEATURE_LABELS: pf.FEATURE_LABELS, canUseFeature: pf.canUseFeature };
    }, []);

    React.useEffect(() => {
        fetch("/api/admin/plan-settings")
            .then(r => r.json())
            .then(d => {
                if (d && Array.isArray(d.plans) && d.plans.length > 0) setPlans(d.plans);
                if (d && Array.isArray(d.options) && d.options.length > 0) setPlanOptions(d.options);
            })
            .catch(() => {});
    }, []);

    const toggleOption = (key: string) => {
        setSelectedOptions(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    const totalMonthly = () => {
        const plan = plans.find((p: any) => p.id === selectedPlan || p.key === selectedPlan);
        const planPrice = plan ? plan.price : 0;
        // 月額オプションのみ合算（買い切り=onceは月額に含めない）
        const optPrice = selectedOptions.reduce((sum, k) => {
            const o = planOptions.find((o: any) => o.id === k || o.key === k);
            return sum + (o && o.billingType !== "once" ? o.price : 0);
        }, 0);
        return planPrice + optPrice;
    };

    // 買い切り（初回のみ）オプションの合計
    const totalOnce = () => {
        return selectedOptions.reduce((sum, k) => {
            const o = planOptions.find((o: any) => o.id === k || o.key === k);
            return sum + (o && o.billingType === "once" ? o.price : 0);
        }, 0);
    };

    const handleSave = async () => {
        if (!selectedPlan) { notify("プランを選択してください", "error"); return; }
        setSaving(true);
        try {
            const domainValue = selectedOptions.includes("custom_domain") ? customDomain.trim() : "";
            const updated = { ...store, planKey: selectedPlan, planOptions: selectedOptions, planPayMethod: payMethod, planUpdatedAt: new Date().toISOString(), customDomain: domainValue };
            // サーバー専用のfirebase-adminをクライアントから直接呼ばず、認証付きAPIルート経由で保存する。
            // （クライアントへのfirebase-adminバンドル混入＝ビルドエラーを防ぐ）
            const saveRes = await fetch("/api/store/update-full", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            });
            if (!saveRes.ok) {
                throw new Error("店舗情報の保存に失敗しました");
            }
            setStore(updated);

            // 申込書メールを自動送信
            try {
                await fetch("/api/store/subscribe-notify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        storeName: store.name || "",
                        companyName: store.companyName || "",
                        representative: store.representative || store.ownerName || "",
                        email: store.email || "",
                        phone: store.phone || "",
                        address: store.address || "",
                        planKey: selectedPlan,
                        options: selectedOptions,
                    }),
                });
            } catch (e) {
                console.error("申込書送信エラー:", e);
            }

            if (payMethod === "stripe") {
                const res = await fetch("/api/store/subscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ studioId: store.id, planKey: selectedPlan, options: selectedOptions, storeEmail: store.email, trialDays: store.planTrialDays || 0 }),
                });
                const data = await res.json();
                if (data.sessionUrl) {
                    window.location.href = data.sessionUrl;
                    return;
                }
            }
            notify("プランを保存しました", "success");
        } catch (e) {
            notify("保存に失敗しました", "error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-6 space-y-8 max-w-2xl">
            {/* 現在のプラン表示（選択済みの場合） */}
            {currentPlan && (
                <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-2xl p-5">
                    <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">現在のプラン</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-black text-foreground">
                            {PLAN_DEFINITIONS.find((p: any) => p.id === currentPlan)?.name || currentPlan}
                        </span>
                        <span className="text-purple-400 font-black text-lg">
                            ¥{(PLAN_DEFINITIONS.find((p: any) => p.id === currentPlan)?.price || 0).toLocaleString()}<span className="text-muted-foreground text-xs font-normal">/月</span>
                        </span>
                    </div>
                    {store.trialEndDate && new Date(store.trialEndDate) > new Date() && (
                        <p className="text-xs text-purple-300 mt-2 font-bold">
                            無料トライアル中（{new Date(store.trialEndDate).toLocaleDateString("ja-JP")}まで）
                        </p>
                    )}
                    {/* 現在のプランの機能一覧 */}
                    {(() => {
                        const cp = plans.find((p: any) => (p.id || p.key) === currentPlan);
                        return cp ? (
                            <div className="mt-3 flex flex-wrap gap-1">
                                {(cp.features || []).map((f: string) => (
                                    <span key={f} className="text-xs bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-full">{f}</span>
                                ))}
                            </div>
                        ) : null;
                    })()}
                    <button
                        onClick={() => setShowPlanList(!showPlanList)}
                        className="mt-3 text-sm text-purple-400 hover:text-purple-300 font-bold underline underline-offset-4 transition-colors"
                    >
                        {showPlanList ? "プラン一覧を閉じる" : "プラン一覧を見る / 変更する"}
                    </button>
                </div>
            )}

            {/* プラン一覧（未選択時は常に表示、選択済みならリンク押下時に表示） */}
            {showPlanList && (
            <div>
                <h2 className="text-foreground font-black text-lg mb-1">プラン選択</h2>
                <p className="text-muted-foreground text-xs mb-4">月額料金はStudi-Goへの掲載・利用料です</p>
                <div className="grid gap-3">
                    {plans.map((plan: any) => {
                        const pk = plan.id || plan.key;
                        const isCurrent = pk === currentPlan;
                        return (
                        <button key={pk} onClick={() => setSelectedPlan(pk)}
                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all relative ${selectedPlan === pk ? "border-purple-500 bg-purple-600/10" : "border-border bg-card hover:border-gray-500"}`}>
                            {isCurrent && <span className="absolute top-2 right-3 text-[10px] font-black text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full">現在</span>}
                            <div className="flex justify-between items-center mb-1 pr-12">
                                <span className="font-black text-foreground">{plan.name}</span>
                                <span className="text-purple-400 font-black">¥{plan.price.toLocaleString()}<span className="text-muted-foreground text-xs font-normal">/月</span></span>
                            </div>
                            <p className="text-muted-foreground text-xs mb-2">{plan.description || plan.desc}</p>
                            <div className="flex flex-wrap gap-1">
                                {(plan.features || []).map((f: string) => (
                                    <span key={f} className="text-xs bg-accent/10 text-muted-foreground px-2 py-0.5 rounded-full">{f}</span>
                                ))}
                            </div>
                        </button>
                        );
                    })}
                </div>
            </div>
            )}

            {/* 機能比較表トグル（常時表示） */}
            <div>
                <button onClick={() => setShowFeatureTable(!showFeatureTable)}
                    className="w-full text-left px-4 py-3 bg-accent/10 border border-border rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground transition-all flex justify-between items-center">
                    <span>機能比較表を{showFeatureTable ? "閉じる" : "見る"}</span>
                    <span>{showFeatureTable ? "▲" : "▼"}</span>
                </button>
                {showFeatureTable && (
                    <div className="mt-3 border border-border rounded-2xl overflow-hidden">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="bg-accent/10">
                                    <th className="text-left px-3 py-2 font-black text-muted-foreground">機能</th>
                                    {PLAN_DEFINITIONS.map((p: any) => (
                                        <th key={p.id} className="text-center px-2 py-2 font-black text-foreground">
                                            {p.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {FEATURE_CATEGORIES.map((cat: any) => (
                                    <React.Fragment key={cat.title}>
                                        <tr><td colSpan={5} className="px-3 py-2 bg-accent/5 font-black text-muted-foreground text-[10px] uppercase tracking-widest">{cat.title}</td></tr>
                                        {cat.keys.map((fk: string) => (
                                            <tr key={fk} className="border-t border-border/50">
                                                <td className="px-3 py-1.5 text-foreground font-bold">{FEATURE_LABELS[fk]}</td>
                                                {PLAN_DEFINITIONS.map((p: any) => (
                                                    <td key={p.id} className="text-center px-2 py-1.5">
                                                        {checkFeature(p.id, fk) ? <span className="text-purple-600 font-bold">○</span> : <span className="text-gray-400">-</span>}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* オプション・支払い・保存はプラン一覧表示時のみ */}
            {showPlanList && (<>
            <div>
                <h2 className="text-foreground font-black text-lg mb-1">オプション</h2>
                <p className="text-muted-foreground text-xs mb-4">必要なオプションを追加できます</p>
                <div className="grid gap-3">
                    {planOptions.map((opt: any) => {
                        const optKey = opt.id || opt.key;
                        return (
                        <button key={optKey} onClick={() => toggleOption(optKey)}
                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${selectedOptions.includes(optKey) ? "border-purple-500 bg-purple-600/10" : "border-border bg-card hover:border-gray-500"}`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-black text-foreground text-sm">{opt.name}</span>
                                    <p className="text-muted-foreground text-xs mt-0.5">{opt.description || opt.content || opt.desc}</p>
                                </div>
                                <span className="text-purple-400 font-black text-sm">+¥{opt.price.toLocaleString()}<span className="text-muted-foreground text-xs font-normal">{opt.billingType === "once" ? "" : "/月"}</span></span>
                            </div>
                        </button>
                        );
                    })}
                </div>
            </div>

            {/* カスタムドメイン設定（オプション選択時のみ表示） */}
            {selectedOptions.includes("custom_domain") && (
                <div className="bg-card border border-purple-500/30 rounded-2xl p-4 space-y-3">
                    <h3 className="text-foreground font-black text-sm">カスタムドメイン設定</h3>
                    <p className="text-muted-foreground text-xs">独自ドメインでスタジオページを公開できます。ドメインのDNS設定で CNAME を <code className="bg-accent/20 px-1.5 py-0.5 rounded text-xs font-mono">studios.studi-go.com</code> に向けてください。</p>
                    <div>
                        <label className="text-xs font-bold text-muted-foreground">ドメイン名</label>
                        <input
                            type="text"
                            value={customDomain}
                            onChange={e => setCustomDomain(e.target.value)}
                            placeholder="例: booking.mystudio.com"
                            className="w-full mt-1 bg-accent/10 border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>
                    {customDomain && (
                        <p className="text-xs text-muted-foreground">
                            公開URL: <span className="text-purple-400 font-mono">https://{customDomain}</span>
                        </p>
                    )}
                </div>
            )}

            <div>
                <h2 className="text-foreground font-black text-lg mb-3">お支払い方法</h2>
                <div className="grid grid-cols-3 gap-3">
                    {[{key:"stripe",label:"クレジットカード"},{key:"direct_debit",label:"口座振替"},{key:"invoice",label:"請求書払い（銀行振込）"}].map(m => (
                        <button key={m.key} onClick={() => setPayMethod(m.key)}
                            className={`p-4 rounded-2xl border-2 font-black text-sm transition-all ${payMethod === m.key ? "border-purple-500 bg-purple-600/10 text-white" : "border-border bg-card text-muted-foreground hover:border-gray-500"}`}>
                            {m.label}
                        </button>
                    ))}
                </div>
                {payMethod === "direct_debit" && (
                    <p className="mt-3 text-xs text-muted-foreground bg-accent/10 border border-border rounded-xl p-3 leading-relaxed">
                        口座振替の手続き書類をお送りします。口座振替の設定が完了するまで（1〜2ヶ月程度）は、請求書払い（銀行振込）でのご対応をお願いします。
                    </p>
                )}
            </div>

            <div className="bg-card border border-border rounded-2xl p-4">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-bold">月額合計</span>
                    <span className="text-3xl font-black text-purple-400">¥{totalMonthly().toLocaleString()}<span className="text-muted-foreground text-sm font-normal">/月</span></span>
                </div>
                {totalOnce() > 0 && (
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-muted-foreground text-xs font-bold">初回のみ（買い切り）</span>
                        <span className="text-sm font-black text-foreground">＋¥{totalOnce().toLocaleString()}</span>
                    </div>
                )}
                {currentPlan && (
                    <p className="text-muted-foreground text-xs mt-1">現在: {plans.find((p:any)=>p.id===currentPlan||p.key===currentPlan)?.name} プラン</p>
                )}
            </div>

            <button onClick={handleSave} disabled={saving || !selectedPlan}
                className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-2xl font-black text-white transition-all">
                {saving ? "処理中..." : currentPlan && selectedPlan !== currentPlan ? "プランを変更する" : payMethod === "stripe" ? "Stripeで契約する" : "プランを保存する"}
            </button>
            </>)}
        </div>
    );
}

function ConnectBankAccount({ store, setStore }: any) {
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState(store.stripeAccountStatus || "none");

    React.useEffect(() => {
        if (store.id) {
            fetch(`/api/store/connect?studioId=${store.id}`)
                .then(r => r.json())
                .then(d => { if (d.status) setStatus(d.status); });
        }
        const params = new URLSearchParams(window.location.search);
        if (params.get("connect") === "success") {
            setStatus("active");
        }
    }, [store.id]);

    const handleConnect = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/store/connect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studioId: store.id }),
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
            else alert("エラー: " + data.error);
        } catch (e) {
            alert("通信エラーが発生しました");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-3">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold ${
                status === "active" ? "bg-green-500/10 text-green-400" :
                status === "pending" ? "bg-yellow-500/10 text-yellow-400" :
                "bg-accent/10 text-muted-foreground"
            }`}>
                <span>{status === "active" ? "✅ 口座登録済み・有効" : status === "pending" ? "⏳ 審査中・設定未完了" : "❌ 未登録"}</span>
            </div>
            <button onClick={handleConnect} disabled={loading || status === "active"}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-lg text-xs font-black text-white transition-all">
                {loading ? "処理中..." : status === "active" ? "登録済み" : status === "pending" ? "設定を続ける" : "振込口座を登録する"}
            </button>
            <p className="text-xs text-muted-foreground">Stripeのセキュアな画面で銀行口座を登録します。登録後、ユーザーの決済金額が直接振り込まれます。</p>
        </div>
    );
}
