"use client";
import React, { useEffect, useState } from "react";

export default function LedgerPage() {
    const [payments, setPayments] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<"sales" | "receivable">("sales");
    const [yearMonth, setYearMonth] = useState(() => new Date().toISOString().slice(0, 7));

    useEffect(() => {
        Promise.all([
            fetch("/api/admin-payments").then(r => r.json()),
            fetch("/api/admin-bookings").then(r => r.json()),
        ]).then(([p, b]) => {
            setPayments(Array.isArray(p) ? p : []);
            setBookings(Array.isArray(b) ? b : []);
            setLoading(false);
        });
    }, []);

    const filtered = payments.filter(p => (p.date || p.createdAt || "").startsWith(yearMonth));
    const paidList = filtered.filter(p => p.status === "paid");
    const pendingList = filtered.filter(p => p.status === "pending" || p.status === "failed");

    const totalSales = paidList.reduce((s, p) => s + (p.amount || 0), 0);
    const totalReceivable = pendingList.reduce((s, p) => s + (p.amount || 0), 0);

    const downloadCSV = (rows: any[][], filename: string) => {
        const bom = "\uFEFF";
        const csv = bom + rows.map(r => r.map(c => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = filename; a.click();
        URL.revokeObjectURL(url);
    };

    const downloadSalesLedger = () => {
        const header = ["日付", "取引番号", "スタジオ名", "顧客名", "顧客メール", "金額", "支払方法", "ステータス"];
        const rows = paidList.map(p => [
            p.date || p.createdAt?.slice(0,10) || "",
            p.id || "",
            p.studioName || "",
            p.userName || "",
            p.userEmail || "",
            p.amount || 0,
            p.paymentMethod || "",
            "入金済み",
        ]);
        const total = ["合計", "", "", "", "", totalSales, "", ""];
        downloadCSV([header, ...rows, total], `売上帳_${yearMonth}.csv`);
    };

    const downloadReceivableLedger = () => {
        const header = ["日付", "取引番号", "スタジオ名", "顧客名", "顧客メール", "金額", "期限", "ステータス"];
        const rows = pendingList.map(p => [
            p.date || p.createdAt?.slice(0,10) || "",
            p.id || "",
            p.studioName || "",
            p.userName || "",
            p.userEmail || "",
            p.amount || 0,
            p.dueDate || "",
            p.status === "failed" ? "失敗" : "未入金",
        ]);
        const total = ["合計", "", "", "", "", totalReceivable, "", ""];
        downloadCSV([header, ...rows, total], `売掛金帳_${yearMonth}.csv`);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">会計帳簿</h1>
                    <p className="text-muted-foreground text-sm mt-1">売上帳・売掛金帳のダウンロード</p>
                </div>
                <input type="month" value={yearMonth} onChange={e => setYearMonth(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm font-bold" />
            </div>

            {/* KPI */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-xl p-5">
                    <p className="text-xs text-muted-foreground font-bold tracking-widest mb-2">売上合計</p>
                    <p className="text-3xl font-bold text-green-500">¥{totalSales.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">{paidList.length}件の入金済み取引</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                    <p className="text-xs text-muted-foreground font-bold tracking-widest mb-2">売掛金合計</p>
                    <p className="text-3xl font-bold text-orange-500">¥{totalReceivable.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">{pendingList.length}件の未入金</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                    <p className="text-xs text-muted-foreground font-bold tracking-widest mb-2">回収率</p>
                    <p className="text-3xl font-bold text-blue-500">
                        {filtered.length > 0 ? Math.round(paidList.length / filtered.length * 100) : 0}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">全{filtered.length}件中</p>
                </div>
            </div>

            {/* タブ */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="flex border-b border-border">
                    {[["sales","売上帳"],["receivable","売掛金帳"]].map(([v,l]) => (
                        <button key={v} onClick={() => setTab(v as any)}
                            className={`px-6 py-4 text-sm font-bold transition-all ${tab===v ? "border-b-2 border-purple-500 text-purple-500" : "text-muted-foreground hover:text-foreground"}`}>
                            {l}
                        </button>
                    ))}
                    <div className="ml-auto p-3">
                        <button onClick={tab === "sales" ? downloadSalesLedger : downloadReceivableLedger}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-all">
                            CSVダウンロード
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-muted-foreground">読み込み中...</div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-accent/5">
                            <tr>
                                {["日付","取引番号","スタジオ","顧客名","金額","支払方法", tab==="sales"?"ステータス":"期限"].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-xs font-bold text-muted-foreground tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {(tab === "sales" ? paidList : pendingList).map(p => (
                                <tr key={p.id} className="hover:bg-accent/5 transition-colors">
                                    <td className="px-5 py-3 text-sm text-foreground">{p.date || p.createdAt?.slice(0,10) || "—"}</td>
                                    <td className="px-5 py-3 text-xs text-muted-foreground font-mono">{p.id?.slice(0,8)}...</td>
                                    <td className="px-5 py-3 text-sm font-bold text-foreground">{p.studioName || "—"}</td>
                                    <td className="px-5 py-3">
                                        <p className="text-sm font-bold text-foreground">{p.userName || "—"}</p>
                                        <p className="text-xs text-muted-foreground">{p.userEmail || ""}</p>
                                    </td>
                                    <td className="px-5 py-3 text-sm font-bold text-foreground">¥{(p.amount || 0).toLocaleString()}</td>
                                    <td className="px-5 py-3 text-xs text-muted-foreground">{p.paymentMethod || "—"}</td>
                                    <td className="px-5 py-3">
                                        {tab === "sales" ? (
                                            <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold">入金済み</span>
                                        ) : (
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.status==="failed" ? "bg-red-500/10 text-red-500" : "bg-orange-500/10 text-orange-500"}`}>
                                                {p.status==="failed" ? "失敗" : "未入金"}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {(tab === "sales" ? paidList : pendingList).length === 0 && (
                                <tr><td colSpan={7} className="px-5 py-8 text-center text-muted-foreground text-sm">該当するデータがありません</td></tr>
                            )}
                        </tbody>
                        <tfoot className="bg-accent/5 border-t border-border">
                            <tr>
                                <td colSpan={4} className="px-5 py-3 text-sm font-bold text-foreground">合計</td>
                                <td className="px-5 py-3 text-sm font-bold text-foreground">
                                    ¥{(tab === "sales" ? totalSales : totalReceivable).toLocaleString()}
                                </td>
                                <td colSpan={2}></td>
                            </tr>
                        </tfoot>
                    </table>
                )}
            </div>
        </div>
    );
}
