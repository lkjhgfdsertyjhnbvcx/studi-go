"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Store, Trash2, ExternalLink, Search, Globe, EyeOff, Clock } from "lucide-react";

const PLANS: Record<string, { name: string; color: string }> = {
    free:     { name: "フリー",       color: "#9ca3af" },
    light:    { name: "ライト",       color: "#22c55e" },
    standard: { name: "スタンダード", color: "#f97316" },
    pro:      { name: "プロ",         color: "#eab308" },
};

function formatRelativeTime(isoStr?: string): string {
    if (!isoStr) return "─";
    const diff = Date.now() - new Date(isoStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "たった今";
    if (mins < 60) return `${mins}分前`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}時間前`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}日前`;
    return new Date(isoStr).toLocaleDateString("ja-JP");
}

export default function StudiosAdminPage() {
    const [studios, setStudios] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "published" | "unpublished">("all");
    const [deleting, setDeleting] = useState<string | null>(null);
    const [toggling, setToggling] = useState<string | null>(null);

    const loadStudios = () => {
        setLoading(true);
        fetch("/api/studios")
            .then(r => r.json())
            .then(data => {
                const arr = Array.isArray(data) ? data : data.studios || [];
                // 最終更新日時が新しい順にソート
                arr.sort((a: any, b: any) => {
                    const ta = a.updatedAt || a.createdAt || "";
                    const tb = b.updatedAt || b.createdAt || "";
                    return tb.localeCompare(ta);
                });
                setStudios(arr);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => { loadStudios(); }, []);

    const handleTogglePublish = async (id: string, current: boolean) => {
        const next = !current;
        const label = next ? "公開" : "非公開";
        if (!confirm(`このスタジオを「${label}」に変更しますか？`)) return;
        setToggling(id);
        try {
            const res = await fetch("/api/studios", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, isPublished: next }),
            });
            if (!res.ok) throw new Error("更新に失敗しました");
            setStudios(prev => prev.map(s => s.id === id ? { ...s, isPublished: next } : s));
        } catch (e: any) {
            alert("❌ " + e.message);
        } finally {
            setToggling(null);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`「${name}」を削除しますか？\n関連する予約・データは残ります。元に戻せません。`)) return;
        setDeleting(id);
        try {
            const res = await fetch(`/api/studios?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("削除に失敗しました");
            setStudios(prev => prev.filter(s => s.id !== id));
        } catch (e: any) {
            alert("❌ " + e.message);
        } finally {
            setDeleting(null);
        }
    };

    const publishedCount = studios.filter(s => s.isPublished === true).length;
    const unpublishedCount = studios.length - publishedCount;

    const filtered = studios.filter(s => {
        const matchSearch =
            s.storeName?.toLowerCase().includes(search.toLowerCase()) ||
            s.email?.toLowerCase().includes(search.toLowerCase());
        const matchFilter =
            filter === "all" ||
            (filter === "published" && s.isPublished === true) ||
            (filter === "unpublished" && s.isPublished !== true);
        return matchSearch && matchFilter;
    });

    return (
        <div className="space-y-6">
            {/* ヘッダー */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-foreground">スタジオ管理</h1>
                    <p className="text-muted-foreground text-sm mt-1">登録店舗の一覧・公開状況・更新状況</p>
                </div>
                <div className="flex items-center gap-3 text-sm font-mono">
                    <span className="text-muted-foreground">{studios.length} 店舗登録中</span>
                </div>
            </div>

            {/* 更新状況サマリーカード */}
            <div className="grid grid-cols-3 gap-4">
                <div
                    onClick={() => setFilter("all")}
                    className={`rounded-xl border p-4 cursor-pointer transition-all ${filter === "all" ? "border-purple-500 bg-purple-500/10" : "border-border bg-card hover:border-purple-500/50"}`}
                >
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">全店舗</p>
                    <p className="text-3xl font-black text-foreground">{studios.length}</p>
                </div>
                <div
                    onClick={() => setFilter("published")}
                    className={`rounded-xl border p-4 cursor-pointer transition-all ${filter === "published" ? "border-green-500 bg-green-500/10" : "border-border bg-card hover:border-green-500/50"}`}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <Globe className="w-3 h-3 text-green-400" />
                        <p className="text-xs text-green-400 font-bold uppercase tracking-widest">公開中</p>
                    </div>
                    <p className="text-3xl font-black text-green-400">{publishedCount}</p>
                </div>
                <div
                    onClick={() => setFilter("unpublished")}
                    className={`rounded-xl border p-4 cursor-pointer transition-all ${filter === "unpublished" ? "border-yellow-500 bg-yellow-500/10" : "border-border bg-card hover:border-yellow-500/50"}`}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <EyeOff className="w-3 h-3 text-yellow-400" />
                        <p className="text-xs text-yellow-400 font-bold uppercase tracking-widest">非公開</p>
                    </div>
                    <p className="text-3xl font-black text-yellow-400">{unpublishedCount}</p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="店舗名・メールで検索..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-muted-foreground">読み込み中...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground">
                        {search ? "該当する店舗が見つかりません" : "登録済みの店舗がありません"}
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-accent/5 border-b border-border">
                            <tr>
                                {["店舗名 / メール", "公開状況", "更新状況", "プラン", "住所", "登録日", "操作"].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filtered.map(s => {
                                const plan = PLANS[s.planKey];
                                const isPublished = s.isPublished === true;
                                const lastUpdated = s.updatedAt || s.createdAt;
                                return (
                                    <tr key={s.id} className="hover:bg-accent/5 transition-colors">
                                        {/* 店舗名 */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                {s.logoUrl ? (
                                                    <img src={s.logoUrl} alt="" className="w-8 h-8 rounded-lg object-contain border border-border bg-background dark:invert" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                                                        <Store className="w-4 h-4 text-muted-foreground" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-bold text-foreground text-sm">{s.storeName || "（名称未設定）"}</p>
                                                    <p className="text-xs text-muted-foreground">{s.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        {/* 公開状況 */}
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => handleTogglePublish(s.id, isPublished)}
                                                disabled={toggling === s.id}
                                                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50 ${
                                                    isPublished
                                                        ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                                                        : "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                                                }`}
                                            >
                                                {toggling === s.id ? (
                                                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-green-400 animate-pulse" : "bg-yellow-400"}`} />
                                                )}
                                                {isPublished ? "公開中" : "非公開"}
                                            </button>
                                            {s.publishedAt && (
                                                <p className="text-[10px] text-muted-foreground mt-0.5 pl-1">
                                                    {new Date(s.publishedAt).toLocaleDateString("ja-JP")}
                                                </p>
                                            )}
                                        </td>
                                        {/* 更新状況 */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <Clock className="w-3 h-3 shrink-0" />
                                                <span className="text-xs">{formatRelativeTime(lastUpdated)}</span>
                                            </div>
                                            {s.rooms && (
                                                <p className="text-[10px] text-muted-foreground mt-0.5">
                                                    部屋: {s.rooms.length}室 / スタッフ: {s.staff?.length ?? 0}人
                                                </p>
                                            )}
                                        </td>
                                        {/* プラン */}
                                        <td className="px-4 py-4">
                                            {plan ? (
                                                <span className="px-2 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: plan.color }}>
                                                    {plan.name}
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 rounded-full text-xs font-bold bg-gray-500/20 text-gray-500">未契約</span>
                                            )}
                                        </td>
                                        {/* 住所 */}
                                        <td className="px-4 py-4 text-xs text-muted-foreground max-w-[160px] truncate">
                                            {s.address || "—"}
                                        </td>
                                        {/* 登録日 */}
                                        <td className="px-4 py-4 text-xs text-muted-foreground whitespace-nowrap">
                                            {s.createdAt ? new Date(s.createdAt).toLocaleDateString("ja-JP") : "—"}
                                        </td>
                                        {/* 操作 */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/studios/${s.id}`}
                                                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                    詳細
                                                </Link>
                                                <Link
                                                    href={`/admin/studios/${s.id}/edit`}
                                                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all"
                                                >
                                                    代理編集
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(s.id, s.storeName || s.email)}
                                                    disabled={deleting === s.id}
                                                    className="p-1.5 text-red-500/60 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-all disabled:opacity-40"
                                                    title="削除"
                                                >
                                                    {deleting === s.id ? (
                                                        <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
