"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
    BarChart3, 
    Calendar, 
    Download, 
    TrendingUp, 
    Clock, 
    AlertCircle, 
    CheckCircle2, 
    Filter,
    ArrowRightLeft,
    Wallet
} from "lucide-react";
import { fetchPayments } from "@/actions/payment";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
    const [payments, setPayments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [startDate, setStartDate] = useState(
        format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd')
    );
    const [endDate, setEndDate] = useState(
        format(new Date(), 'yyyy-MM-dd')
    );
    const [includeTax, setIncludeTax] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await fetchPayments();
            setPayments(data);
            setIsLoading(false);
        }
        load();
    }, []);

    const filteredPayments = useMemo(() => {
        return payments.filter(p => {
            const pDate = p.date;
            return pDate >= startDate && pDate <= endDate;
        });
    }, [payments, startDate, endDate]);

    const stats = useMemo(() => {
        const total = filteredPayments.reduce((acc, p) => acc + p.amount, 0);
        const paid = filteredPayments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
        const pending = filteredPayments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0);
        
        // Unpaid/Overdue logic: pending and past due date
        const today = new Date().toISOString().split('T')[0];
        const unpaid = filteredPayments.filter(p => p.status === 'pending' && p.dueDate && p.dueDate < today)
                                      .reduce((acc, p) => acc + p.amount, 0);
        
        const formatValue = (val: number) => {
            const displayVal = includeTax ? val : Math.floor(val / 1.1);
            return displayVal.toLocaleString();
        };

        const taxAmount = total - Math.floor(total / 1.1);

        return {
            total: formatValue(total),
            paid: formatValue(paid),
            pending: formatValue(pending),
            unpaid: formatValue(unpaid),
            tax: taxAmount.toLocaleString(),
            count: filteredPayments.length
        };
    }, [filteredPayments, includeTax]);

    const handleExport = () => {
        if (filteredPayments.length === 0) return;

        const headers = ["日付", "利用者名", "メールアドレス", "ステータス", "支払方法", "金額", "内消費税"];
        const rows = filteredPayments.map(p => {
            const amount = includeTax ? p.amount : Math.floor(p.amount / 1.1);
            const tax = p.amount - Math.floor(p.amount / 1.1);
            return [
                p.date,
                p.userName,
                p.userEmail,
                p.status === 'paid' ? '完了' : '未入金',
                p.paymentMethod,
                amount,
                tax
            ];
        });

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]); // UTF-8 with BOM for Excel
        const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `revenue_report_${startDate}_to_${endDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) {
        return <div className="p-12 text-center text-muted-foreground font-mono animate-pulse">データを読み込み中...</div>;
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-6 h-6 text-cyan-500" />
                            <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 uppercase italic">
                                売上集計・帳簿
                            </h1>
                        </div>
                        <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest leading-relaxed">
                            店舗の売上、売掛金、未入金状況を期間別に集計します。
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 bg-card/50 p-2 rounded-2xl border border-border">
                        <div className="flex items-center gap-3 px-4 py-2 bg-accent/5 rounded-xl border border-border">
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <Input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="h-9 border-none bg-transparent text-sm font-bold p-0 w-36 focus-visible:ring-0"
                            />
                            <span className="text-sm opacity-30 font-bold">~</span>
                            <Input 
                                type="date" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="h-9 border-none bg-transparent text-sm font-bold p-0 w-36 focus-visible:ring-0"
                            />
                        </div>
                        
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setIncludeTax(!includeTax)}
                            className={cn(
                                "rounded-xl text-[10px] font-black uppercase h-11 border-cyan-500/30 px-4",
                                includeTax ? "bg-cyan-500/10 text-cyan-400" : "text-muted-foreground"
                            )}
                        >
                            <ArrowRightLeft className="w-3 h-3 mr-2" />
                            {includeTax ? "税込表示中" : "税抜表示中"}
                        </Button>

                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleExport}
                            className="rounded-xl text-[10px] font-black uppercase h-11 border-border text-muted-foreground hover:text-foreground px-4"
                        >
                            <Download className="w-3 h-3 mr-2" />
                            CSV出力
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <Card className="bg-card/50 border-border rounded-3xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-cyan-500/10 transition-colors" />
                        <CardHeader className="pb-2">
                            <CardDescription className="text-[10px] font-black uppercase tracking-widest text-cyan-500/70">総売上額 (期間中)</CardDescription>
                            <CardTitle className="text-3xl font-black italic tracking-tighter flex items-end gap-2 text-foreground">
                                ¥{stats.total}
                                {includeTax && <span className="text-[10px] not-italic font-bold text-muted-foreground tracking-normal pb-1">税込</span>}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-[10px] font-bold text-cyan-500/60 font-mono tracking-tighter">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                先月比 +12.5%
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border rounded-3xl overflow-hidden group">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-[10px] font-black uppercase tracking-widest text-green-500/70">入金済み</CardDescription>
                            <CardTitle className="text-3xl font-black italic tracking-tighter text-foreground">¥{stats.paid}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-[10px] font-bold text-green-500/60 font-mono uppercase">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                支払い確認済み
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border rounded-3xl overflow-hidden group">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-[10px] font-black uppercase tracking-widest text-indigo-500/70">売掛金 (入金待ち)</CardDescription>
                            <CardTitle className="text-3xl font-black italic tracking-tighter text-foreground">¥{stats.pending}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-[10px] font-bold text-indigo-500/60 font-mono uppercase">
                                <Clock className="w-3 h-3 mr-1" />
                                入金予定
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border rounded-3xl overflow-hidden ring-1 ring-red-500/20">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-[10px] font-black uppercase tracking-widest text-red-500/70">未入金 (期限超過)</CardDescription>
                            <CardTitle className="text-3xl font-black italic tracking-tighter text-red-500">¥{stats.unpaid}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-[10px] font-bold text-red-500/60 font-mono uppercase">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                要対応
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-card/30 border border-border rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm">
                    <div className="px-8 py-6 border-b border-border bg-accent/5 flex items-center justify-between">
                        <h2 className="text-lg font-black italic uppercase tracking-tighter flex items-center gap-2 text-foreground">
                            <Wallet className="w-4 h-4 text-cyan-500" />
                            売上台帳 // 会計明細
                        </h2>
                        <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">{stats.count} 件の取引が見つかりました</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border bg-accent/5">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">日付</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">利用者 / メモ</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">ステータス</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">支払方法</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right whitespace-nowrap">金額</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayments.map((p) => (
                                    <tr key={p.id} className="border-b border-border hover:bg-accent/5 transition-colors group">
                                        <td className="px-8 py-6 text-xs font-mono font-bold text-muted-foreground">{p.date}</td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-bold text-foreground">{p.userName}</div>
                                            <div className="text-[10px] text-muted-foreground font-mono">{p.userEmail}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            {p.status === 'paid' ? (
                                                <Badge className="bg-green-500/10 text-green-500 border-none rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter">完全入金</Badge>
                                            ) : p.dueDate && p.dueDate < new Date().toISOString().split('T')[0] ? (
                                                <Badge className="bg-red-500/10 text-red-500 border-none rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter">未入金・滞納</Badge>
                                            ) : (
                                                <Badge className="bg-indigo-500/10 text-indigo-500 border-none rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter">売掛金</Badge>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-border px-2 py-1 rounded-lg bg-background">
                                                {p.paymentMethod}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="text-sm font-black italic tracking-tighter text-foreground">
                                                ¥{(includeTax ? p.amount : Math.floor(p.amount / 1.1)).toLocaleString()}
                                            </div>
                                            <div className="text-[9px] font-bold text-muted-foreground font-mono uppercase">
                                                Tax: ¥{(p.amount - Math.floor(p.amount / 1.1)).toLocaleString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredPayments.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-2 opacity-20">
                                                <Filter className="w-8 h-8" />
                                                <div className="font-mono text-xs uppercase tracking-[0.2em]">データがありません</div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            {filteredPayments.length > 0 && (
                                <tfoot>
                                    <tr className="bg-accent/10">
                                        <td colSpan={4} className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500/50">合計集計値</td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="text-2xl font-black italic tracking-tighter text-cyan-400">¥{stats.total}</div>
                                            {!includeTax && <div className="text-[9px] font-bold text-muted-foreground">※表示価格はすべて税抜き</div>}
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
