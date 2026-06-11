"use client";

// 店舗セットアップ入力ページ（招待リンクからアクセス・ログイン不要）
import React, { useEffect, useState, useCallback, use } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    normalizeIntakeData, emptyPricing,
    type IntakeData, type IntakeRoom, type IntakeEquipment, type IntakeStatus,
    type IntakeTimeSlot, type IntakeDiscount,
} from "@/lib/intake";

const CATEGORIES: { value: NonNullable<IntakeEquipment["category"]>; label: string }[] = [
    { value: "amp", label: "アンプ" },
    { value: "drums", label: "ドラム" },
    { value: "mic", label: "マイク" },
    { value: "pa", label: "PA" },
    { value: "guitar", label: "ギター" },
    { value: "bass", label: "ベース" },
    { value: "keys", label: "鍵盤" },
    { value: "other", label: "その他" },
];

const HOURS = Array.from({ length: 25 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

const DAY_TYPES: { key: keyof IntakeRoom["pricing"]; label: string }[] = [
    { key: "weekday", label: "平日" },
    { key: "saturday", label: "土曜" },
    { key: "sundayHoliday", label: "日祝" },
];

const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-60";
const labelCls = "block text-xs font-bold text-muted-foreground mb-1";

export default function OnboardPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = use(params);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [status, setStatus] = useState<IntakeStatus>("pending");
    const [data, setData] = useState<IntakeData | null>(null);
    const [saving, setSaving] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetch(`/api/intake/${token}`)
            .then((r) => (r.ok ? r.json() : Promise.reject()))
            .then((res) => {
                setStatus(res.status);
                setData(normalizeIntakeData(res.data, res.label || ""));
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [token]);

    const locked = status === "approved";

    const update = useCallback(<K extends keyof IntakeData>(key: K, value: IntakeData[K]) => {
        setData((prev) => (prev ? { ...prev, [key]: value } : prev));
    }, []);

    const uploadImage = async (file: File): Promise<string | null> => {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch(`/api/intake/${token}/upload`, { method: "POST", body: fd });
        const json = await res.json();
        if (!res.ok) {
            setMessage({ type: "error", text: json.error || "アップロードに失敗しました" });
            return null;
        }
        return json.url as string;
    };

    const saveDraft = async () => {
        if (!data || locked) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/intake/${token}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);
            setMessage({ type: "ok", text: "下書きを保存しました" });
            if (status === "pending") setStatus("in_progress");
        } catch (e: any) {
            setMessage({ type: "error", text: e.message || "保存に失敗しました" });
        } finally {
            setSaving(false);
        }
    };

    const submit = async () => {
        if (!data || locked) return;
        if (!confirm("この内容で提出します。よろしいですか？\n（提出後も承認されるまでは修正できます）")) return;
        setSubmitting(true);
        try {
            const res = await fetch(`/api/intake/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);
            setStatus("submitted");
            setMessage({ type: "ok", text: "提出しました。運営の確認をお待ちください。" });
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (e: any) {
            setMessage({ type: "error", text: e.message || "提出に失敗しました" });
        } finally {
            setSubmitting(false);
        }
    };

    // --- 部屋操作 ---
    const addRoom = () => {
        if (!data) return;
        update("rooms", [...data.rooms, { id: uuidv4(), name: "", basePrice: 0, startType: "0min", pricing: emptyPricing(), images: [] }]);
    };
    const updateRoom = (idx: number, patch: Partial<IntakeRoom>) => {
        if (!data) return;
        update("rooms", data.rooms.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
    };
    const removeRoom = (idx: number) => {
        if (!data) return;
        if (!confirm("この部屋を削除しますか？")) return;
        update("rooms", data.rooms.filter((_, i) => i !== idx));
    };

    // --- 設備操作 ---
    const addEquipment = () => {
        if (!data) return;
        update("equipmentOptions", [...data.equipmentOptions, { name: "", pricePerHour: 0, priceType: "per_hour", quantity: 1, category: "other" }]);
    };
    const updateEquipment = (idx: number, patch: Partial<IntakeEquipment>) => {
        if (!data) return;
        update("equipmentOptions", data.equipmentOptions.map((e, i) => (i === idx ? { ...e, ...patch } : e)));
    };
    const removeEquipment = (idx: number) => {
        if (!data) return;
        update("equipmentOptions", data.equipmentOptions.filter((_, i) => i !== idx));
    };

    // --- その他割引操作 ---
    const addDiscount = () => {
        if (!data) return;
        update("otherDiscounts", [...data.otherDiscounts, { name: "", enabled: true, discountType: "amount", value: 0 }]);
    };
    const updateDiscount = (idx: number, patch: Partial<IntakeDiscount>) => {
        if (!data) return;
        update("otherDiscounts", data.otherDiscounts.map((d, i) => (i === idx ? { ...d, ...patch } : d)));
    };
    const removeDiscount = (idx: number) => {
        if (!data) return;
        update("otherDiscounts", data.otherDiscounts.filter((_, i) => i !== idx));
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-muted-foreground">読み込み中...</div>;
    }
    if (notFound || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center space-y-2">
                    <h1 className="text-xl font-bold">招待リンクが無効です</h1>
                    <p className="text-sm text-muted-foreground">URLをご確認のうえ、Studi-Go運営までお問い合わせください。</p>
                </div>
            </div>
        );
    }

    const pp = data.personalPracticeSettings;
    const sd = data.studentDiscount;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
                {/* ヘッダー */}
                <div className="space-y-2">
                    <div className="text-[10px] tracking-widest uppercase text-purple-500 font-bold">Studi-Go 店舗登録</div>
                    <h1 className="text-2xl font-black">店舗情報の入力</h1>
                    <p className="text-sm text-muted-foreground">
                        以下のフォームにご記入ください。途中で「下書き保存」すれば、同じURLからいつでも再開できます。
                        入力が終わったら最後に「提出する」を押してください。
                    </p>
                </div>

                {/* ステータスバナー */}
                {status === "submitted" && (
                    <div className="rounded-xl border-2 border-blue-500/40 bg-blue-500/5 p-4 text-sm">
                        ✅ 提出済みです。運営が内容を確認しています。承認されるまでは修正して再提出できます。
                    </div>
                )}
                {locked && (
                    <div className="rounded-xl border-2 border-green-500/40 bg-green-500/5 p-4 text-sm">
                        🎉 承認済みです。店舗ページが公開されています。修正が必要な場合は運営までご連絡ください。
                    </div>
                )}
                {message && (
                    <div className={`rounded-lg p-3 text-sm ${message.type === "ok" ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-500/10 text-red-600 dark:text-red-400"}`}>
                        {message.text}
                    </div>
                )}

                {/* 1. 基本情報 */}
                <section className="rounded-xl border border-border bg-card p-6 space-y-4">
                    <h2 className="font-bold text-lg">1. 基本情報</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>店舗名 <span className="text-red-500">*</span></label>
                            <input className={inputCls} disabled={locked} value={data.storeName} onChange={(e) => update("storeName", e.target.value)} placeholder="例: スタジオサウンドX 渋谷店" />
                        </div>
                        <div>
                            <label className={labelCls}>運営会社名</label>
                            <input className={inputCls} disabled={locked} value={data.companyName || ""} onChange={(e) => update("companyName", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelCls}>代表者名</label>
                            <input className={inputCls} disabled={locked} value={data.representative || ""} onChange={(e) => update("representative", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelCls}>担当者名</label>
                            <input className={inputCls} disabled={locked} value={data.contactPerson || ""} onChange={(e) => update("contactPerson", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelCls}>郵便番号</label>
                            <input className={inputCls} disabled={locked} value={data.postalCode || ""} onChange={(e) => update("postalCode", e.target.value)} placeholder="150-0001" />
                        </div>
                        <div>
                            <label className={labelCls}>電話番号 <span className="text-red-500">*</span></label>
                            <input className={inputCls} disabled={locked} value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="03-1234-5678" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelCls}>住所 <span className="text-red-500">*</span></label>
                            <input className={inputCls} disabled={locked} value={data.address} onChange={(e) => update("address", e.target.value)} placeholder="東京都渋谷区..." />
                        </div>
                        <div>
                            <label className={labelCls}>メールアドレス</label>
                            <input className={inputCls} disabled={locked} type="email" value={data.email} onChange={(e) => update("email", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelCls}>WebサイトURL</label>
                            <input className={inputCls} disabled={locked} value={data.url || ""} onChange={(e) => update("url", e.target.value)} placeholder="https://..." />
                        </div>
                        <div>
                            <label className={labelCls}>インボイス登録番号（T番号）</label>
                            <input className={inputCls} disabled={locked} value={data.invoiceNumber || ""} onChange={(e) => update("invoiceNumber", e.target.value)} placeholder="T1234567890123" />
                        </div>
                        <div>
                            <label className={labelCls}>定休日</label>
                            <input className={inputCls} disabled={locked} value={data.closedDays || ""} onChange={(e) => update("closedDays", e.target.value)} placeholder="例: 毎週水曜・年末年始" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className={labelCls}>営業時間（平日）</label>
                            <input className={inputCls} disabled={locked} value={data.businessHours.weekday} onChange={(e) => update("businessHours", { ...data.businessHours, weekday: e.target.value })} placeholder="10:00-22:00" />
                        </div>
                        <div>
                            <label className={labelCls}>営業時間（土曜）</label>
                            <input className={inputCls} disabled={locked} value={data.businessHours.saturday} onChange={(e) => update("businessHours", { ...data.businessHours, saturday: e.target.value })} placeholder="10:00-22:00" />
                        </div>
                        <div>
                            <label className={labelCls}>営業時間（日祝）</label>
                            <input className={inputCls} disabled={locked} value={data.businessHours.sundayHoliday} onChange={(e) => update("businessHours", { ...data.businessHours, sundayHoliday: e.target.value })} placeholder="10:00-22:00" />
                        </div>
                    </div>
                    <div>
                        <label className={labelCls}>駐車場情報</label>
                        <input className={inputCls} disabled={locked} value={data.parkingInfo || ""} onChange={(e) => update("parkingInfo", e.target.value)} placeholder="例: 専用駐車場2台あり / 近隣コインパーキングをご利用ください" />
                    </div>
                    <div>
                        <label className={labelCls}>アピールポイント（お客様向け紹介文）</label>
                        <textarea className={`${inputCls} min-h-24`} disabled={locked} value={data.appealPoint || ""} onChange={(e) => update("appealPoint", e.target.value)} placeholder="駅徒歩3分。最新機材を完備した音楽スタジオです。" />
                    </div>
                </section>

                {/* 2. 画像 */}
                <section className="rounded-xl border border-border bg-card p-6 space-y-5">
                    <h2 className="font-bold text-lg">2. ロゴ・背景・店舗写真</h2>
                    <ImageField label="ロゴ画像" value={data.logoUrl} disabled={locked} onUpload={uploadImage} onChange={(url) => update("logoUrl", url)} />
                    <ImageField label="背景画像（店舗ページの背景に使われます）" value={data.bgImageUrl} disabled={locked} onUpload={uploadImage} onChange={(url) => update("bgImageUrl", url)} />
                    <MultiImageField label="店舗写真（外観・受付・ロビーなど、複数可）" values={data.images} disabled={locked} onUpload={uploadImage} onChange={(urls) => update("images", urls)} />
                </section>

                {/* 3. 部屋 */}
                <section className="rounded-xl border border-border bg-card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-lg">3. スタジオ（部屋）</h2>
                        {!locked && (
                            <button onClick={addRoom} className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline">＋ 部屋を追加</button>
                        )}
                    </div>
                    {data.rooms.length === 0 && (
                        <p className="text-sm text-muted-foreground">「＋ 部屋を追加」から、予約を受け付ける部屋を登録してください。</p>
                    )}
                    {data.rooms.map((room, idx) => (
                        <div key={room.id} className="rounded-lg border border-border p-4 space-y-3 bg-background/50">
                            <div className="flex items-center justify-between">
                                <div className="font-bold text-sm">部屋 {idx + 1}</div>
                                {!locked && (
                                    <button onClick={() => removeRoom(idx)} className="text-xs text-red-500 hover:underline">削除</button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className={labelCls}>部屋名 <span className="text-red-500">*</span></label>
                                    <input className={inputCls} disabled={locked} value={room.name} onChange={(e) => updateRoom(idx, { name: e.target.value })} placeholder="例: Aスタジオ（12畳）" />
                                </div>
                                <div>
                                    <label className={labelCls}>基本料金（1時間） <span className="text-red-500">*</span></label>
                                    <input className={inputCls} disabled={locked} type="number" min={0} value={room.basePrice || ""} onChange={(e) => updateRoom(idx, { basePrice: Number(e.target.value) })} placeholder="2000" />
                                </div>
                                <div>
                                    <label className={labelCls}>予約開始タイミング</label>
                                    <select className={inputCls} disabled={locked} value={room.startType || "0min"} onChange={(e) => updateRoom(idx, { startType: e.target.value as "0min" | "30min" })}>
                                        <option value="0min">毎時00分から</option>
                                        <option value="30min">毎時30分から</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>部屋の説明（広さ・常設機材など）</label>
                                <textarea className={`${inputCls} min-h-16`} disabled={locked} value={room.description || ""} onChange={(e) => updateRoom(idx, { description: e.target.value })} placeholder="12畳 / ドラムセット・ギターアンプ2台・ベースアンプ常設" />
                            </div>

                            {/* 時間帯別料金 */}
                            <div className="rounded-lg border border-border/60 p-3 space-y-3">
                                <div className="text-xs font-bold">時間帯別料金（任意）</div>
                                <p className="text-[11px] text-muted-foreground">
                                    時間帯によって料金が変わる場合に設定してください。設定していない時間帯には基本料金が適用されます。
                                </p>
                                {DAY_TYPES.map(({ key, label }) => (
                                    <div key={key} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-muted-foreground">{label}</span>
                                            {!locked && (
                                                <button
                                                    onClick={() => updateRoom(idx, { pricing: { ...room.pricing, [key]: [...room.pricing[key], { start: "10:00", end: "18:00", price: room.basePrice || 0 }] } })}
                                                    className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline"
                                                >＋ 時間帯を追加</button>
                                            )}
                                        </div>
                                        {room.pricing[key].length === 0 && (
                                            <div className="text-[11px] text-muted-foreground pl-2">終日 基本料金 ¥{(room.basePrice || 0).toLocaleString()}/h</div>
                                        )}
                                        {room.pricing[key].map((slot, si) => (
                                            <div key={si} className="flex flex-wrap items-center gap-2 pl-2">
                                                <select className={`${inputCls} !w-24`} disabled={locked} value={slot.start}
                                                    onChange={(e) => updateRoom(idx, { pricing: { ...room.pricing, [key]: room.pricing[key].map((s, j) => j === si ? { ...s, start: e.target.value } : s) } })}>
                                                    {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
                                                </select>
                                                <span className="text-xs text-muted-foreground">〜</span>
                                                <select className={`${inputCls} !w-24`} disabled={locked} value={slot.end}
                                                    onChange={(e) => updateRoom(idx, { pricing: { ...room.pricing, [key]: room.pricing[key].map((s, j) => j === si ? { ...s, end: e.target.value } : s) } })}>
                                                    {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
                                                </select>
                                                <input className={`${inputCls} !w-28`} disabled={locked} type="number" min={0} placeholder="料金/h" value={slot.price || ""}
                                                    onChange={(e) => updateRoom(idx, { pricing: { ...room.pricing, [key]: room.pricing[key].map((s, j) => j === si ? { ...s, price: Number(e.target.value) } : s) } })} />
                                                <span className="text-xs text-muted-foreground">円/h</span>
                                                {!locked && (
                                                    <button
                                                        onClick={() => updateRoom(idx, { pricing: { ...room.pricing, [key]: room.pricing[key].filter((_, j) => j !== si) } })}
                                                        className="text-xs text-red-500 hover:underline"
                                                    >削除</button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <MultiImageField label="部屋の写真（複数可）" values={room.images} disabled={locked} onUpload={uploadImage} onChange={(urls) => updateRoom(idx, { images: urls })} />
                        </div>
                    ))}
                </section>

                {/* 4. レンタル機材・設備 */}
                <section className="rounded-xl border border-border bg-card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-lg">4. レンタル機材・オプション</h2>
                        {!locked && (
                            <button onClick={addEquipment} className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline">＋ 機材を追加</button>
                        )}
                    </div>
                    {data.equipmentOptions.length === 0 && (
                        <p className="text-sm text-muted-foreground">貸出機材（シンバル、シールド、キーボード等）があれば登録してください。なければ空欄でOKです。</p>
                    )}
                    {data.equipmentOptions.map((eq, idx) => (
                        <div key={idx} className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-end rounded-lg border border-border p-3 bg-background/50">
                            <div className="col-span-2 sm:col-span-1">
                                <label className={labelCls}>機材名</label>
                                <input className={inputCls} disabled={locked} value={eq.name} onChange={(e) => updateEquipment(idx, { name: e.target.value })} placeholder="スネア" />
                            </div>
                            <div>
                                <label className={labelCls}>カテゴリ</label>
                                <select className={inputCls} disabled={locked} value={eq.category || "other"} onChange={(e) => updateEquipment(idx, { category: e.target.value as IntakeEquipment["category"] })}>
                                    {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelCls}>料金（円）</label>
                                <input className={inputCls} disabled={locked} type="number" min={0} value={eq.pricePerHour || ""} onChange={(e) => updateEquipment(idx, { pricePerHour: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className={labelCls}>課金単位</label>
                                <select className={inputCls} disabled={locked} value={eq.priceType} onChange={(e) => updateEquipment(idx, { priceType: e.target.value as IntakeEquipment["priceType"] })}>
                                    <option value="per_hour">1時間ごと</option>
                                    <option value="per_use">1回ごと</option>
                                </select>
                            </div>
                            <div className="flex gap-2 items-end">
                                <div className="flex-1">
                                    <label className={labelCls}>台数</label>
                                    <input className={inputCls} disabled={locked} type="number" min={1} value={eq.quantity ?? 1} onChange={(e) => updateEquipment(idx, { quantity: Number(e.target.value) })} />
                                </div>
                                {!locked && (
                                    <button onClick={() => removeEquipment(idx)} className="text-xs text-red-500 hover:underline pb-2">削除</button>
                                )}
                            </div>
                        </div>
                    ))}
                </section>

                {/* 5. 個人練習 */}
                <section className="rounded-xl border border-border bg-card p-6 space-y-4">
                    <h2 className="font-bold text-lg">5. 個人練習</h2>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 accent-purple-600" disabled={locked} checked={pp.enabled}
                            onChange={(e) => update("personalPracticeSettings", { ...pp, enabled: e.target.checked })} />
                        <span className="text-sm font-bold">個人練習を受け付ける</span>
                    </label>
                    {pp.enabled && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                                <label className={labelCls}>最大人数</label>
                                <input className={inputCls} disabled={locked} type="number" min={1} value={pp.maxPeople || 2}
                                    onChange={(e) => update("personalPracticeSettings", { ...pp, maxPeople: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className={labelCls}>料金（円/h・空欄なら通常料金）</label>
                                <input className={inputCls} disabled={locked} type="number" min={0} value={pp.pricePerHour || ""}
                                    onChange={(e) => update("personalPracticeSettings", { ...pp, pricePerHour: Number(e.target.value) || 0 })} placeholder="通常料金" />
                            </div>
                            <div>
                                <label className={labelCls}>何日前から予約可</label>
                                <input className={inputCls} disabled={locked} type="number" min={0} value={pp.advanceDays ?? 1}
                                    onChange={(e) => update("personalPracticeSettings", { ...pp, advanceDays: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className={labelCls}>何時間前から予約可</label>
                                <input className={inputCls} disabled={locked} type="number" min={0} max={48} value={pp.advanceHours ?? 2}
                                    onChange={(e) => update("personalPracticeSettings", { ...pp, advanceHours: Number(e.target.value) })} />
                            </div>
                        </div>
                    )}
                </section>

                {/* 6. 割引 */}
                <section className="rounded-xl border border-border bg-card p-6 space-y-4">
                    <h2 className="font-bold text-lg">6. 割引設定</h2>

                    {/* 学割 */}
                    <div className="rounded-lg border border-border p-4 space-y-3 bg-background/50">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-purple-600" disabled={locked} checked={sd.enabled}
                                onChange={(e) => update("studentDiscount", { ...sd, enabled: e.target.checked })} />
                            <span className="text-sm font-bold">学割を設定する</span>
                        </label>
                        {sd.enabled && (
                            <div className="flex flex-wrap items-end gap-3">
                                <div>
                                    <label className={labelCls}>割引方法</label>
                                    <select className={`${inputCls} !w-36`} disabled={locked} value={sd.discountType}
                                        onChange={(e) => update("studentDiscount", { ...sd, discountType: e.target.value as "amount" | "percentage" })}>
                                        <option value="amount">金額引き（円）</option>
                                        <option value="percentage">割合引き（%）</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelCls}>{sd.discountType === "amount" ? "割引額（円/h）" : "割引率（%）"}</label>
                                    <input className={`${inputCls} !w-28`} disabled={locked} type="number" min={0} value={sd.value || ""}
                                        onChange={(e) => update("studentDiscount", { ...sd, value: Number(e.target.value) })} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* その他割引 */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold">その他の割引（深夜割・早朝割など）</span>
                            {!locked && (
                                <button onClick={addDiscount} className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline">＋ 割引を追加</button>
                            )}
                        </div>
                        {data.otherDiscounts.map((d, idx) => (
                            <div key={idx} className="flex flex-wrap items-end gap-3 rounded-lg border border-border p-3 bg-background/50">
                                <div className="flex-1 min-w-36">
                                    <label className={labelCls}>割引名</label>
                                    <input className={inputCls} disabled={locked} value={d.name} onChange={(e) => updateDiscount(idx, { name: e.target.value })} placeholder="例: 深夜割" />
                                </div>
                                <div>
                                    <label className={labelCls}>割引方法</label>
                                    <select className={`${inputCls} !w-36`} disabled={locked} value={d.discountType}
                                        onChange={(e) => updateDiscount(idx, { discountType: e.target.value as "amount" | "percentage" })}>
                                        <option value="amount">金額引き（円）</option>
                                        <option value="percentage">割合引き（%）</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelCls}>{d.discountType === "amount" ? "割引額（円）" : "割引率（%）"}</label>
                                    <input className={`${inputCls} !w-28`} disabled={locked} type="number" min={0} value={d.value || ""}
                                        onChange={(e) => updateDiscount(idx, { value: Number(e.target.value) })} />
                                </div>
                                {!locked && (
                                    <button onClick={() => removeDiscount(idx)} className="text-xs text-red-500 hover:underline pb-2">削除</button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* アクション */}
                {!locked && (
                    <div className="sticky bottom-4 rounded-xl border border-border bg-card/95 backdrop-blur p-4 flex flex-col sm:flex-row gap-3 shadow-lg">
                        <button
                            onClick={saveDraft}
                            disabled={saving}
                            className="flex-1 rounded-lg border border-border px-4 py-3 text-sm font-bold hover:bg-accent/10 disabled:opacity-50"
                        >
                            {saving ? "保存中..." : "💾 下書き保存"}
                        </button>
                        <button
                            onClick={submit}
                            disabled={submitting}
                            className="flex-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 text-sm font-bold disabled:opacity-50"
                        >
                            {submitting ? "提出中..." : status === "submitted" ? "🚀 修正して再提出" : "🚀 この内容で提出する"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- 画像アップロード部品 ---

function ImageField({ label, value, disabled, onUpload, onChange }: {
    label: string;
    value?: string;
    disabled?: boolean;
    onUpload: (file: File) => Promise<string | null>;
    onChange: (url: string) => void;
}) {
    const [busy, setBusy] = useState(false);
    return (
        <div>
            <label className="block text-xs font-bold text-muted-foreground mb-1">{label}</label>
            <div className="flex items-center gap-3">
                {value ? (
                    <img src={value} alt="" className="w-20 h-20 object-cover rounded-lg border border-border" />
                ) : (
                    <div className="w-20 h-20 rounded-lg border border-dashed border-border flex items-center justify-center text-[10px] text-muted-foreground">未設定</div>
                )}
                {!disabled && (
                    <label className="cursor-pointer text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline">
                        {busy ? "アップロード中..." : value ? "変更する" : "画像を選択"}
                        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" disabled={busy}
                            onChange={async (e) => {
                                const f = e.target.files?.[0];
                                if (!f) return;
                                setBusy(true);
                                const url = await onUpload(f);
                                setBusy(false);
                                if (url) onChange(url);
                                e.target.value = "";
                            }} />
                    </label>
                )}
                {!disabled && value && (
                    <button onClick={() => onChange("")} className="text-xs text-red-500 hover:underline">削除</button>
                )}
            </div>
        </div>
    );
}

function MultiImageField({ label, values, disabled, onUpload, onChange }: {
    label: string;
    values: string[];
    disabled?: boolean;
    onUpload: (file: File) => Promise<string | null>;
    onChange: (urls: string[]) => void;
}) {
    const [busy, setBusy] = useState(false);
    return (
        <div>
            <label className="block text-xs font-bold text-muted-foreground mb-1">{label}</label>
            <div className="flex flex-wrap gap-3 items-center">
                {(values || []).map((url, i) => (
                    <div key={i} className="relative group">
                        <img src={url} alt="" className="w-20 h-20 object-cover rounded-lg border border-border" />
                        {!disabled && (
                            <button
                                onClick={() => onChange(values.filter((_, j) => j !== i))}
                                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs leading-none opacity-0 group-hover:opacity-100 transition"
                            >×</button>
                        )}
                    </div>
                ))}
                {!disabled && (
                    <label className="cursor-pointer w-20 h-20 rounded-lg border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground hover:border-purple-500 hover:text-purple-500 transition">
                        {busy ? "..." : "＋追加"}
                        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" disabled={busy}
                            onChange={async (e) => {
                                const f = e.target.files?.[0];
                                if (!f) return;
                                setBusy(true);
                                const url = await onUpload(f);
                                setBusy(false);
                                if (url) onChange([...(values || []), url]);
                                e.target.value = "";
                            }} />
                    </label>
                )}
            </div>
        </div>
    );
}
