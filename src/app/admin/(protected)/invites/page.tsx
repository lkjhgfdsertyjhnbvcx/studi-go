"use client";

// 運営：店舗招待管理（発行・状況一覧・プレビュー・承認）
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Send, Copy, Check, Trash2, Eye, EyeOff, BadgeCheck, Loader2 } from "lucide-react";
import type { StoreIntake, IntakeStatus } from "@/lib/intake";

const STATUS_LABEL: Record<IntakeStatus, { text: string; cls: string }> = {
    pending: { text: "未入力", cls: "bg-gray-500/10 text-gray-500 border-gray-500/30" },
    in_progress: { text: "入力中", cls: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" },
    submitted: { text: "提出済み", cls: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
    approved: { text: "承認済み", cls: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30" },
};

export default function InvitesPage() {
    const [invites, setInvites] = useState<StoreIntake[]>([]);
    const [loading, setLoading] = useState(true);
    const [label, setLabel] = useState("");
    const [note, setNote] = useState("");
    const [creating, setCreating] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);
    const [openPreview, setOpenPreview] = useState<string | null>(null);
    const [approving, setApproving] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const load = () => {
        fetch("/api/admin/invites")
            .then((r) => r.json())
            .then((res) => setInvites(res.invites || []))
            .finally(() => setLoading(false));
    };
    useEffect(load, []);

    const create = async () => {
        if (!label.trim()) return;
        setCreating(true);
        setError(null);
        try {
            const res = await fetch("/api/admin/invites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ label, note }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);
            setInvites((prev) => [json.invite, ...prev]);
            setLabel("");
            setNote("");
        } catch (e: any) {
            setError(e.message || "発行に失敗しました");
        } finally {
            setCreating(false);
        }
    };

    const copyLink = (token: string) => {
        const url = `${window.location.origin}/onboard/${token}`;
        navigator.clipboard.writeText(url);
        setCopied(token);
        setTimeout(() => setCopied(null), 2000);
    };

    const remove = async (token: string) => {
        if (!confirm("この招待を削除しますか？店舗が入力した内容も消えます。")) return;
        const res = await fetch(`/api/admin/invites/${token}`, { method: "DELETE" });
        if (res.ok) setInvites((prev) => prev.filter((i) => i.id !== token));
    };

    const approve = async (token: string) => {
        if (!confirm("この内容で本登録（公開）します。よろしいですか？")) return;
        setApproving(token);
        setError(null);
        try {
            const res = await fetch(`/api/admin/invites/${token}/approve`, { method: "POST" });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);
            setInvites((prev) => prev.map((i) =>
                i.id === token ? { ...i, status: "approved" as IntakeStatus, studioId: json.studioId } : i
            ));
        } catch (e: any) {
            setError(e.message || "承認に失敗しました");
        } finally {
            setApproving(null);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-2xl font-black flex items-center gap-2"><Send className="w-6 h-6 text-purple-500" /> 店舗招待</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    招待リンクを発行して店舗に送ると、店舗側で基本情報・写真・部屋・機材を入力できます。提出内容を確認して承認すると本登録（公開）されます。
                </p>
            </div>

            {error && <div className="rounded-lg bg-red-500/10 text-red-500 p-3 text-sm">{error}</div>}

            {/* 発行フォーム */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                <h2 className="font-bold">新しい招待を発行</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        placeholder="店舗名（例: スタジオサウンドX 渋谷店）"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                    <input
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        placeholder="メモ（任意・担当者名など）"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <button
                        onClick={create}
                        disabled={creating || !label.trim()}
                        className="rounded-lg bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 text-sm font-bold disabled:opacity-50 whitespace-nowrap"
                    >
                        {creating ? "発行中..." : "招待リンクを発行"}
                    </button>
                </div>
            </div>

            {/* 一覧 */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-6 py-4 border-b border-border font-bold text-sm">招待一覧（{invites.length}件）</div>
                {loading ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">読み込み中...</div>
                ) : invites.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">まだ招待がありません。上のフォームから発行してください。</div>
                ) : (
                    <div className="divide-y divide-border">
                        {invites.map((inv) => {
                            const st = STATUS_LABEL[inv.status] || STATUS_LABEL.pending;
                            const isOpen = openPreview === inv.id;
                            return (
                                <div key={inv.id} className="px-6 py-4 space-y-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${st.cls}`}>{st.text}</span>
                                        <span className="font-bold text-sm flex-1 min-w-32">{inv.data?.storeName || inv.label}</span>
                                        {inv.note && <span className="text-xs text-muted-foreground">📝 {inv.note}</span>}
                                        <span className="text-[11px] text-muted-foreground">更新: {new Date(inv.updatedAt).toLocaleString("ja-JP")}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <button onClick={() => copyLink(inv.id)} className="inline-flex items-center gap-1 text-xs font-bold rounded-lg border border-border px-3 py-1.5 hover:bg-accent/10">
                                            {copied === inv.id ? <><Check className="w-3 h-3 text-green-500" /> コピーしました</> : <><Copy className="w-3 h-3" /> 招待URLをコピー</>}
                                        </button>
                                        <button onClick={() => setOpenPreview(isOpen ? null : inv.id)} className="inline-flex items-center gap-1 text-xs font-bold rounded-lg border border-border px-3 py-1.5 hover:bg-accent/10">
                                            {isOpen ? <><EyeOff className="w-3 h-3" /> 閉じる</> : <><Eye className="w-3 h-3" /> 内容を確認</>}
                                        </button>
                                        {inv.status !== "approved" && (
                                            <button
                                                onClick={() => approve(inv.id)}
                                                disabled={approving === inv.id || !inv.data?.address}
                                                title={!inv.data?.address ? "住所などの必須項目が未入力です" : ""}
                                                className="inline-flex items-center gap-1 text-xs font-bold rounded-lg bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 disabled:opacity-40"
                                            >
                                                {approving === inv.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <BadgeCheck className="w-3 h-3" />}
                                                承認して公開
                                            </button>
                                        )}
                                        {inv.status === "approved" && inv.studioId && (
                                            <Link href={`/admin/studios/${inv.studioId}`} className="inline-flex items-center gap-1 text-xs font-bold rounded-lg border border-green-500/40 text-green-600 dark:text-green-400 px-3 py-1.5 hover:bg-green-500/10">
                                                <BadgeCheck className="w-3 h-3" /> 店舗ページを開く
                                            </Link>
                                        )}
                                        <button onClick={() => remove(inv.id)} className="inline-flex items-center gap-1 text-xs text-red-500 px-2 py-1.5 hover:underline ml-auto">
                                            <Trash2 className="w-3 h-3" /> 削除
                                        </button>
                                    </div>

                                    {/* プレビュー */}
                                    {isOpen && inv.data && (
                                        <div className="rounded-lg border border-border bg-background/50 p-4 text-sm space-y-3">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
                                                <div><span className="text-muted-foreground">店舗名:</span> {inv.data.storeName || "—"}</div>
                                                <div><span className="text-muted-foreground">会社名:</span> {inv.data.companyName || "—"}</div>
                                                <div><span className="text-muted-foreground">代表者:</span> {inv.data.representative || "—"}</div>
                                                <div><span className="text-muted-foreground">担当者:</span> {inv.data.contactPerson || "—"}</div>
                                                <div className="sm:col-span-2"><span className="text-muted-foreground">住所:</span> 〒{inv.data.postalCode || "—"} {inv.data.address || "—"}</div>
                                                <div><span className="text-muted-foreground">電話:</span> {inv.data.phone || "—"}</div>
                                                <div><span className="text-muted-foreground">メール:</span> {inv.data.email || "—"}</div>
                                                <div><span className="text-muted-foreground">URL:</span> {inv.data.url || "—"}</div>
                                                <div><span className="text-muted-foreground">営業時間:</span> 平日 {inv.data.businessHours?.weekday} / 土 {inv.data.businessHours?.saturday} / 日祝 {inv.data.businessHours?.sundayHoliday}</div>
                                                <div><span className="text-muted-foreground">定休日:</span> {inv.data.closedDays || "—"}</div>
                                                <div><span className="text-muted-foreground">インボイス:</span> {inv.data.invoiceNumber || "—"}</div>
                                                <div><span className="text-muted-foreground">駐車場:</span> {inv.data.parkingInfo || "—"}</div>
                                                <div>
                                                    <span className="text-muted-foreground">個人練習:</span>{" "}
                                                    {inv.data.personalPracticeSettings?.enabled
                                                        ? `受付（最大${inv.data.personalPracticeSettings.maxPeople}名${inv.data.personalPracticeSettings.pricePerHour ? ` / ¥${inv.data.personalPracticeSettings.pricePerHour}/h` : ""}）`
                                                        : "なし"}
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">学割:</span>{" "}
                                                    {inv.data.studentDiscount?.enabled
                                                        ? (inv.data.studentDiscount.discountType === "amount" ? `¥${inv.data.studentDiscount.value}引き` : `${inv.data.studentDiscount.value}%引き`)
                                                        : "なし"}
                                                </div>
                                                {(inv.data.otherDiscounts || []).length > 0 && (
                                                    <div className="sm:col-span-2">
                                                        <span className="text-muted-foreground">その他割引:</span>{" "}
                                                        {inv.data.otherDiscounts.map((d) => `${d.name}（${d.discountType === "amount" ? `¥${d.value}引き` : `${d.value}%引き`}）`).join("、")}
                                                    </div>
                                                )}
                                                {inv.data.appealPoint && <div className="sm:col-span-2"><span className="text-muted-foreground">アピール:</span> {inv.data.appealPoint}</div>}
                                            </div>
                                            <div className="flex gap-3 flex-wrap">
                                                {inv.data.logoUrl && <div className="text-center"><img src={inv.data.logoUrl} className="w-16 h-16 object-contain rounded border border-border" alt="logo" /><div className="text-[10px] text-muted-foreground">ロゴ</div></div>}
                                                {inv.data.bgImageUrl && <div className="text-center"><img src={inv.data.bgImageUrl} className="w-16 h-16 object-cover rounded border border-border" alt="bg" /><div className="text-[10px] text-muted-foreground">背景</div></div>}
                                                {(inv.data.images || []).map((u, i) => <img key={i} src={u} className="w-16 h-16 object-cover rounded border border-border" alt="" />)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-xs mb-1">部屋（{inv.data.rooms?.length || 0}件）</div>
                                                {(inv.data.rooms || []).map((r, i) => (
                                                    <div key={r.id || i} className="text-xs py-1 border-t border-border/50 space-y-1">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className="font-bold">{r.name || `部屋${i + 1}`}</span>
                                                            <span>基本 ¥{(r.basePrice || 0).toLocaleString()}/h</span>
                                                            {r.startType === "30min" && <span className="text-muted-foreground">毎時30分開始</span>}
                                                            {(r.images || []).map((u, j) => <img key={j} src={u} className="w-8 h-8 object-cover rounded border border-border" alt="" />)}
                                                        </div>
                                                        {(["weekday", "saturday", "sundayHoliday"] as const).map((dk) => {
                                                            const slots = r.pricing?.[dk] || [];
                                                            if (slots.length === 0) return null;
                                                            const dl = dk === "weekday" ? "平日" : dk === "saturday" ? "土曜" : "日祝";
                                                            return (
                                                                <div key={dk} className="text-muted-foreground pl-2">
                                                                    {dl}: {slots.map((s) => `${s.start}〜${s.end} ¥${(s.price || 0).toLocaleString()}/h`).join("、")}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ))}
                                            </div>
                                            {(inv.data.equipmentOptions || []).length > 0 && (
                                                <div>
                                                    <div className="font-bold text-xs mb-1">機材（{inv.data.equipmentOptions.length}件）</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {inv.data.equipmentOptions.map((e, i) => `${e.name}（¥${e.pricePerHour}/${e.priceType === "per_use" ? "回" : "時間"}）`).join("、")}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
