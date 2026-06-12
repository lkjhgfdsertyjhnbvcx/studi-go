"use client";

// 運営：VOWCHA連携管理（加入店舗・情報提供CSV・紹介料請求書・売掛）
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Ticket, Download, FileText, RefreshCw, Settings2, BadgeCheck, Undo2, Trash2, Loader2 } from "lucide-react";
import { referralStatus, type VowchaReferral, type VowchaInvoice, type VowchaSettings } from "@/lib/vowcha";

const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50";
const labelCls = "block text-xs font-bold text-muted-foreground mb-1";

export default function VowchaPage() {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<VowchaSettings | null>(null);
    const [referrals, setReferrals] = useState<VowchaReferral[]>([]);
    const [invoices, setInvoices] = useState<VowchaInvoice[]>([]);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);
    const [msg, setMsg] = useState<{ type: "ok" | "error"; text: string } | null>(null);
    const [showSettings, setShowSettings] = useState(false);

    const load = async () => {
        try {
            const res = await fetch("/api/admin/vowcha");
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);
            setSettings(json.settings);
            setReferrals(json.referrals || []);
            setInvoices(json.invoices || []);
        } catch (e: any) {
            setMsg({ type: "error", text: e.message || "読み込みに失敗しました" });
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { load(); }, []);

    const toggle = (id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const sync = async () => {
        setBusy("sync");
        try {
            const res = await fetch("/api/admin/vowcha/sync", { method: "POST" });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);
            setMsg({ type: "ok", text: `同期しました（新規 ${json.added} 件）` });
            await load();
        } catch (e: any) {
            setMsg({ type: "error", text: e.message });
        } finally {
            setBusy(null);
        }
    };

    const exportCsv = async () => {
        const ids = Array.from(selected);
        if (ids.length === 0) return;
        setBusy("export");
        try {
            const res = await fetch("/api/admin/vowcha/export", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids }),
            });
            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error);
            }
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `vowcha_stores_${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
            setMsg({ type: "ok", text: `${ids.length}件をCSV出力し、提供済みにしました` });
            setSelected(new Set());
            await load();
        } catch (e: any) {
            setMsg({ type: "error", text: e.message });
        } finally {
            setBusy(null);
        }
    };

    const createInvoice = async () => {
        const ids = Array.from(selected).filter((id) => {
            const r = referrals.find((x) => x.id === id);
            return r && !r.invoiceId;
        });
        if (ids.length === 0) {
            setMsg({ type: "error", text: "未請求の店舗を選択してください" });
            return;
        }
        if (!confirm(`選択した${ids.length}件で請求書を発行します。よろしいですか？`)) return;
        setBusy("invoice");
        try {
            const res = await fetch("/api/admin/vowcha/invoices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);
            setMsg({ type: "ok", text: `請求書 ${json.invoice.invoiceNo} を発行しました` });
            setSelected(new Set());
            await load();
        } catch (e: any) {
            setMsg({ type: "error", text: e.message });
        } finally {
            setBusy(null);
        }
    };

    const setInvoiceStatus = async (id: string, status: "issued" | "paid") => {
        const res = await fetch(`/api/admin/vowcha/invoices/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        if (res.ok) await load();
    };

    const deleteInvoice = async (id: string, no: string) => {
        if (!confirm(`請求書 ${no} を取り消しますか？\n（対象店舗は未請求に戻ります）`)) return;
        const res = await fetch(`/api/admin/vowcha/invoices/${id}`, { method: "DELETE" });
        if (res.ok) {
            setMsg({ type: "ok", text: `請求書 ${no} を取り消しました` });
            await load();
        }
    };

    const saveSettings = async () => {
        if (!settings) return;
        setBusy("settings");
        try {
            const res = await fetch("/api/admin/vowcha", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);
            setMsg({ type: "ok", text: "設定を保存しました" });
        } catch (e: any) {
            setMsg({ type: "error", text: e.message });
        } finally {
            setBusy(null);
        }
    };

    // 売掛金集計
    const receivable = invoices.filter((i) => i.status === "issued").reduce((s, i) => s + i.total, 0);
    const paidTotal = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.total, 0);
    const unInvoiced = referrals.filter((r) => !r.invoiceId).length;

    if (loading) return <div className="text-sm text-muted-foreground">読み込み中...</div>;

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-black flex items-center gap-2"><Ticket className="w-6 h-6 text-purple-500" /> VOWCHA連携</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        VOWCHAクーポン加入店舗の管理、ACTIVA社への店舗情報提供（CSV）、紹介料の請求書発行・売掛管理を行います。
                    </p>
                </div>
                <button onClick={() => setShowSettings(!showSettings)} className="inline-flex items-center gap-1 text-xs font-bold rounded-lg border border-border px-3 py-2 hover:bg-accent/10">
                    <Settings2 className="w-4 h-4" /> 設定
                </button>
            </div>

            {msg && (
                <div className={`rounded-lg p-3 text-sm ${msg.type === "ok" ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-500/10 text-red-500"}`}>
                    {msg.text}
                </div>
            )}

            {/* サマリー */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "加入店舗", value: `${referrals.length} 件` },
                    { label: "未請求", value: `${unInvoiced} 件` },
                    { label: "売掛金（未入金）", value: `¥${receivable.toLocaleString()}` },
                    { label: "入金済み累計", value: `¥${paidTotal.toLocaleString()}` },
                ].map((c) => (
                    <div key={c.label} className="rounded-xl border border-border bg-card p-4">
                        <div className="text-[11px] text-muted-foreground font-bold">{c.label}</div>
                        <div className="text-xl font-black mt-1">{c.value}</div>
                    </div>
                ))}
            </div>

            {/* 設定 */}
            {showSettings && settings && (
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                    <h2 className="font-bold">設定</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className={labelCls}>紹介料単価（円/店舗・税抜）</label>
                            <input className={inputCls} type="number" min={0} value={settings.referralFee}
                                onChange={(e) => setSettings({ ...settings, referralFee: Number(e.target.value) })} />
                        </div>
                        <div>
                            <label className={labelCls}>消費税率（%）</label>
                            <input className={inputCls} type="number" min={0} value={settings.taxRate}
                                onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })} />
                        </div>
                        <div>
                            <label className={labelCls}>支払期限（発行から日数）</label>
                            <input className={inputCls} type="number" min={0} value={settings.paymentTermsDays}
                                onChange={(e) => setSettings({ ...settings, paymentTermsDays: Number(e.target.value) })} />
                        </div>
                        <div>
                            <label className={labelCls}>請求先（宛名）</label>
                            <input className={inputCls} value={settings.activaName}
                                onChange={(e) => setSettings({ ...settings, activaName: e.target.value })} />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelCls}>請求先住所</label>
                            <input className={inputCls} value={settings.activaAddress || ""}
                                onChange={(e) => setSettings({ ...settings, activaAddress: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelCls}>発行元（社名・事業部）</label>
                            <input className={inputCls} value={settings.jocollaName}
                                onChange={(e) => setSettings({ ...settings, jocollaName: e.target.value })} />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelCls}>発行元住所</label>
                            <input className={inputCls} value={settings.jocollaAddress || ""}
                                onChange={(e) => setSettings({ ...settings, jocollaAddress: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelCls}>インボイス登録番号（T番号）</label>
                            <input className={inputCls} value={settings.invoiceRegistrationNumber || ""}
                                onChange={(e) => setSettings({ ...settings, invoiceRegistrationNumber: e.target.value })} placeholder="T1234567890123" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelCls}>振込先（銀行・支店・口座）</label>
                            <input className={inputCls} value={settings.bankInfo || ""}
                                onChange={(e) => setSettings({ ...settings, bankInfo: e.target.value })} placeholder="〇〇銀行 〇〇支店 普通 1234567 カ）ジョコラ" />
                        </div>
                    </div>
                    <button onClick={saveSettings} disabled={busy === "settings"}
                        className="rounded-lg bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 text-sm font-bold disabled:opacity-50">
                        {busy === "settings" ? "保存中..." : "設定を保存"}
                    </button>
                </div>
            )}

            {/* 加入店舗一覧 */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex flex-wrap items-center gap-3">
                    <span className="font-bold text-sm flex-1">加入店舗（{referrals.length}件）</span>
                    <button onClick={sync} disabled={busy === "sync"} className="inline-flex items-center gap-1 text-xs font-bold rounded-lg border border-border px-3 py-1.5 hover:bg-accent/10">
                        {busy === "sync" ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />} クーポンON店舗を同期
                    </button>
                    <button onClick={exportCsv} disabled={selected.size === 0 || busy === "export"} className="inline-flex items-center gap-1 text-xs font-bold rounded-lg border border-border px-3 py-1.5 hover:bg-accent/10 disabled:opacity-40">
                        <Download className="w-3 h-3" /> ACTIVA向けCSV出力（{selected.size}）
                    </button>
                    <button onClick={createInvoice} disabled={selected.size === 0 || busy === "invoice"} className="inline-flex items-center gap-1 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 disabled:opacity-40">
                        <FileText className="w-3 h-3" /> 請求書を発行（{selected.size}）
                    </button>
                </div>
                {referrals.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                        加入店舗がありません。「クーポンON店舗を同期」を押すと、VOWCHA利用中の既存店舗を取り込みます。
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-[11px] text-muted-foreground border-b border-border">
                                <th className="px-4 py-2 w-8"><input type="checkbox" className="accent-purple-600"
                                    checked={selected.size === referrals.length && referrals.length > 0}
                                    onChange={(e) => setSelected(e.target.checked ? new Set(referrals.map((r) => r.id)) : new Set())} /></th>
                                <th className="px-2 py-2 text-left">店舗名</th>
                                <th className="px-2 py-2 text-left hidden sm:table-cell">同意日</th>
                                <th className="px-2 py-2 text-left">状態</th>
                                <th className="px-2 py-2 text-left hidden md:table-cell">情報提供</th>
                                <th className="px-2 py-2 text-left hidden md:table-cell">経路</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {referrals.map((r) => {
                                const st = referralStatus(r);
                                return (
                                    <tr key={r.id} className="hover:bg-accent/5">
                                        <td className="px-4 py-2"><input type="checkbox" className="accent-purple-600" checked={selected.has(r.id)} onChange={() => toggle(r.id)} /></td>
                                        <td className="px-2 py-2 font-bold">
                                            <Link href={`/admin/studios/${r.studioId}`} className="hover:underline">{r.storeName}</Link>
                                        </td>
                                        <td className="px-2 py-2 hidden sm:table-cell text-xs text-muted-foreground">{(r.consentAt || "").slice(0, 10)}</td>
                                        <td className="px-2 py-2">
                                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                                                st === "請求済" ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30"
                                                : st === "提供済" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                                                : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
                                            }`}>{st}</span>
                                        </td>
                                        <td className="px-2 py-2 hidden md:table-cell text-xs text-muted-foreground">{r.exportedAt ? r.exportedAt.slice(0, 10) : "—"}</td>
                                        <td className="px-2 py-2 hidden md:table-cell text-xs text-muted-foreground">
                                            {r.source === "intake" ? "申込フォーム" : r.source === "sync" ? "同期" : "手動"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* 請求書・売掛一覧 */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-6 py-4 border-b border-border font-bold text-sm">請求書・売掛管理（{invoices.length}件）</div>
                {invoices.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">請求書はまだありません。店舗を選択して「請求書を発行」してください。</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-[11px] text-muted-foreground border-b border-border">
                                <th className="px-4 py-2 text-left">請求書番号</th>
                                <th className="px-2 py-2 text-left hidden sm:table-cell">発行日</th>
                                <th className="px-2 py-2 text-left hidden sm:table-cell">支払期限</th>
                                <th className="px-2 py-2 text-right">件数</th>
                                <th className="px-2 py-2 text-right">金額（税込）</th>
                                <th className="px-2 py-2 text-left">状態</th>
                                <th className="px-2 py-2 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-accent/5">
                                    <td className="px-4 py-2 font-mono font-bold">
                                        <Link href={`/admin/vowcha/invoice/${inv.id}`} className="text-purple-600 dark:text-purple-400 hover:underline">{inv.invoiceNo}</Link>
                                    </td>
                                    <td className="px-2 py-2 hidden sm:table-cell text-xs text-muted-foreground">{inv.issuedAt.slice(0, 10)}</td>
                                    <td className="px-2 py-2 hidden sm:table-cell text-xs text-muted-foreground">{inv.dueDate}</td>
                                    <td className="px-2 py-2 text-right">{inv.items.length}</td>
                                    <td className="px-2 py-2 text-right font-bold">¥{inv.total.toLocaleString()}</td>
                                    <td className="px-2 py-2">
                                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                                            inv.status === "paid"
                                                ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30"
                                                : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30"
                                        }`}>{inv.status === "paid" ? "入金済" : "未入金"}</span>
                                    </td>
                                    <td className="px-2 py-2">
                                        <div className="flex items-center justify-end gap-2">
                                            {inv.status === "issued" ? (
                                                <button onClick={() => setInvoiceStatus(inv.id, "paid")} className="inline-flex items-center gap-1 text-[11px] font-bold rounded border border-green-500/40 text-green-600 dark:text-green-400 px-2 py-1 hover:bg-green-500/10">
                                                    <BadgeCheck className="w-3 h-3" /> 入金消込
                                                </button>
                                            ) : (
                                                <button onClick={() => setInvoiceStatus(inv.id, "issued")} className="inline-flex items-center gap-1 text-[11px] rounded border border-border px-2 py-1 hover:bg-accent/10 text-muted-foreground">
                                                    <Undo2 className="w-3 h-3" /> 未入金に戻す
                                                </button>
                                            )}
                                            <button onClick={() => deleteInvoice(inv.id, inv.invoiceNo)} className="inline-flex items-center gap-1 text-[11px] text-red-500 px-1 py-1 hover:underline">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
