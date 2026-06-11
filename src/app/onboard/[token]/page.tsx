"use client";

// 店舗セットアップ入力ページ（招待リンクからアクセス・ログイン不要）
import React, { useEffect, useState, useCallback, use } from "react";
import { v4 as uuidv4 } from "uuid";
import type { IntakeData, IntakeRoom, IntakeEquipment, IntakeStatus } from "@/lib/intake";

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
                setData(res.data);
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

    const saveDraft = async (silent = false) => {
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
            if (!silent) setMessage({ type: "ok", text: "下書きを保存しました" });
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
        update("rooms", [...data.rooms, { id: uuidv4(), name: "", basePrice: 0, images: [] }]);
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

    const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-60";
    const labelCls = "block text-xs font-bold text-muted-foreground mb-1";

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className={labelCls}>部屋名 <span className="text-red-500">*</span></label>
                                    <input className={inputCls} disabled={locked} value={room.name} onChange={(e) => updateRoom(idx, { name: e.target.value })} placeholder="例: Aスタジオ（12畳）" />
                                </div>
                                <div>
                                    <label className={labelCls}>基本料金（平日・1時間） <span className="text-red-500">*</span></label>
                                    <input className={inputCls} disabled={locked} type="number" min={0} value={room.basePrice || ""} onChange={(e) => updateRoom(idx, { basePrice: Number(e.target.value) })} placeholder="2000" />
                                </div>
                                <div>
                                    <label className={labelCls}>土曜料金（1時間・空欄なら平日と同じ）</label>
                                    <input className={inputCls} disabled={locked} type="number" min={0} value={room.saturdayPrice ?? ""} onChange={(e) => updateRoom(idx, { saturdayPrice: e.target.value === "" ? undefined : Number(e.target.value) })} />
                                </div>
                                <div>
                                    <label className={labelCls}>日祝料金（1時間・空欄なら平日と同じ）</label>
                                    <input className={inputCls} disabled={locked} type="number" min={0} value={room.sundayPrice ?? ""} onChange={(e) => updateRoom(idx, { sundayPrice: e.target.value === "" ? undefined : Number(e.target.value) })} />
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>部屋の説明（広さ・常設機材など）</label>
                                <textarea className={`${inputCls} min-h-16`} disabled={locked} value={room.description || ""} onChange={(e) => updateRoom(idx, { description: e.target.value })} placeholder="12畳 / ドラムセット・ギターアンプ2台・ベースアンプ常設" />
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

                {/* アクション */}
                {!locked && (
                    <div className="sticky bottom-4 rounded-xl border border-border bg-card/95 backdrop-blur p-4 flex flex-col sm:flex-row gap-3 shadow-lg">
                        <button
                            onClick={() => saveDraft()}
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
