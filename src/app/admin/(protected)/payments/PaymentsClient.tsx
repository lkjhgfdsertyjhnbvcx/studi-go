"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DollarSign,
    CheckCircle,
    AlertCircle,
    Mail,
    Loader2,
    Search,
    Filter,
    Phone,
    CheckCircle2
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { sendReminderEmail, updatePaymentStatus, Payment } from "@/actions/payment";
import { useRouter } from "next/navigation";

interface PaymentsClientProps {
    initialPayments: Payment[];
}

export default function PaymentsClient({ initialPayments }: PaymentsClientProps) {
    const router = useRouter();
    const [payments, setPayments] = useState<Payment[]>(initialPayments);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [filter, setFilter] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [actionId, setActionId] = useState<string | null>(null);

    // Sync state if initialPayments changes (from server refresh)
    useEffect(() => {
        setPayments(initialPayments);
    }, [initialPayments]);

    const handleReconcile = async (paymentId: string) => {
        if (!confirm("入金済み（消し込み）として処理しますか？")) return;

        setIsProcessing(true);
        setIsSuccess(false);
        setActionId(paymentId);

        try {
            const res = await updatePaymentStatus(paymentId, "paid");
            if (res.success) {
                setIsSuccess(true);
                // Explicit delay to show the success state
                await new Promise(r => setTimeout(r, 1500));
                // router.refresh will cause the Server Component (page.tsx) to re-fetch and pass new props
                router.refresh();
            } else {
                alert(`エラー: ${res.message}`);
            }
        } catch (e: any) {
            alert(`接続エラー: ${e.message}`);
        } finally {
            setActionId(null);
            setIsProcessing(false);
            setIsSuccess(false);
        }
    };

    const handleSendReminder = async (payment: Payment) => {
        if (!confirm(`${payment.userEmail} に催促メールを送信しますか？`)) return;
        setActionId(payment.id);
        try {
            const res = await sendReminderEmail(payment.id, payment.userEmail);
            if (res.success) {
                alert("催促メールを送信しました");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setActionId(null);
        }
    };

    const handlePhoneCall = (payment: Payment) => {
        if (payment.userPhone) {
            window.location.href = `tel:${payment.userPhone}`;
        } else {
            alert(`電話番号が不明です。直接連絡してください。\nユーザー名: ${payment.userName}`);
        }
    };

    const filteredPayments = payments.filter((payment) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "pending" && payment.status === "pending") ||
            (filter === "paid" && payment.status === "paid") ||
            (filter === "failed" && payment.status === "failed");

        const matchesSearch =
            searchTerm === "" ||
            payment.studioName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const totalRevenue = payments
        .filter((p) => p.status === "paid")
        .reduce((sum, p) => sum + p.amount, 0);
    const pendingAmount = payments
        .filter((p) => p.status === "pending")
        .reduce((sum, p) => sum + p.amount, 0);
    const pendingCount = payments.filter((p) => p.status === "pending").length;

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative">
            {/* Processing Overlay */}
            {isProcessing && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500">
                    {!isSuccess ? (
                        <>
                            <Loader2 className="h-16 w-16 text-cyan-400 animate-spin mb-6" />
                            <div className="text-2xl font-black text-cyan-400 animate-pulse tracking-widest uppercase">Processing Reconciliation...</div>
                            <div className="text-gray-500 text-sm mt-3 uppercase font-mono tracking-tighter">Updating Secure Ledger // Synchronizing Data</div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center animate-in zoom-in duration-300">
                            <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                <CheckCircle2 className="h-12 w-12 text-green-400" />
                            </div>
                            <div className="text-3xl font-black text-green-400 tracking-widest uppercase">Payment Reconciled</div>
                            <div className="text-gray-400 text-sm mt-3 uppercase font-mono tracking-tighter">Transaction Permanently Stored // Refreshing...</div>
                        </div>
                    )}
                </div>
            )}

            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">決済管理パネル</h1>
                        <p className="text-gray-400 mt-1">入金状況の確認、手動消し込み、および未入金者への督促</p>
                    </div>
                    {/* Refresh Indicator */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-cyan-400 flex items-center gap-2"
                        onClick={() => router.refresh()}
                    >
                        <Loader2 className="h-3 w-3" />
                        手動リフレッシュ
                    </Button>
                </header>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-slate-900 border-white/10 shadow-xl shadow-cyan-500/5">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-widest">総売上 (確定済)</CardTitle>
                            <DollarSign className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-white">¥{totalRevenue.toLocaleString()}</div>
                            <div className="h-1 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-white/10 shadow-xl shadow-orange-500/5">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-widest">売掛金 (未入金)</CardTitle>
                            <AlertCircle className="h-4 w-4 text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-orange-400">¥{pendingAmount.toLocaleString()}</div>
                            <p className="text-xs text-orange-400/50 mt-2 font-mono">{pendingCount} 件の未完了トランザクション</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-white/10 shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-widest">入金完了率</CardTitle>
                            <CheckCircle className="h-4 w-4 text-cyan-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-white">
                                {payments.length > 0 ? Math.round((payments.filter(p => p.status === 'paid').length / payments.length) * 100) : 0}%
                            </div>
                            <p className="text-xs text-gray-500 mt-2">全 {payments.length} トランザクション中</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                        <Input
                            placeholder="ユーザー名、メール、予約番号で検索..."
                            className="pl-10 bg-slate-900 border-white/10 focus:border-cyan-500/50 transition-all text-white placeholder:text-gray-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-full md:w-[200px] bg-slate-900 border-white/10 text-white">
                            <Filter className="h-4 w-4 mr-2 opacity-50" />
                            <SelectValue placeholder="絞り込み" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/10 text-white">
                            <SelectItem value="all">すべてのステータス</SelectItem>
                            <SelectItem value="paid">入金済み</SelectItem>
                            <SelectItem value="pending">未入金</SelectItem>
                            <SelectItem value="failed">支払い失敗</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/10">
                                <TableHead className="py-4 text-gray-400 font-bold uppercase text-[10px]">顧客情報</TableHead>
                                <TableHead className="py-4 text-gray-400 font-bold uppercase text-[10px]">金額</TableHead>
                                <TableHead className="py-4 text-gray-400 font-bold uppercase text-[10px]">支払い方法</TableHead>
                                <TableHead className="py-4 text-gray-400 font-bold uppercase text-[10px]">ステータス</TableHead>
                                <TableHead className="py-4 text-gray-400 font-bold uppercase text-[10px]">日付 / 期限</TableHead>
                                <TableHead className="py-4 text-gray-400 font-bold uppercase text-[10px] text-right">アクション</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPayments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-20 text-gray-600 italic">決済データが見当りません</TableCell>
                                </TableRow>
                            ) : (
                                filteredPayments.map((payment) => (
                                    <TableRow key={payment.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                        <TableCell>
                                            <div className="font-bold text-white mb-0.5">{payment.userName}</div>
                                            <div className="text-xs text-gray-500 font-mono">{payment.userEmail}</div>
                                            {payment.userPhone && <div className="text-[10px] text-gray-600 mt-1 flex items-center gap-1"><Phone className="h-2 w-2" /> {payment.userPhone}</div>}
                                        </TableCell>
                                        <TableCell className="font-mono text-lg font-bold text-white">
                                            ¥{payment.amount.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-black/50 border-white/10 text-[10px] text-gray-400 py-0 uppercase">
                                                {payment.paymentMethod.replace('_', ' ')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {payment.status === "paid" ? (
                                                <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-400" />入金済み
                                                </div>
                                            ) : payment.status === "pending" ? (
                                                <div className="flex items-center gap-1.5 text-orange-400 text-xs font-bold">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />未入金
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />失敗
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-xs text-white">{payment.date}</div>
                                            {payment.status === 'pending' && <div className="text-[10px] text-red-400/70 mt-1">期限: {payment.dueDate}</div>}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {payment.status === "pending" && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-900/20"
                                                            onClick={() => handleReconcile(payment.id)}
                                                            disabled={actionId === payment.id}
                                                        >
                                                            <CheckCircle2 className="h-3 w-3 mr-1" /> 消し込み
                                                        </Button>
                                                        <div className="flex flex-col gap-1">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="border-white/10 text-gray-400 hover:text-white h-7 px-2 text-[10px]"
                                                                onClick={() => handleSendReminder(payment)}
                                                                disabled={actionId === payment.id}
                                                            >
                                                                <Mail className="h-3 w-3 mr-1" /> メール
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="border-white/10 text-gray-400 hover:text-white h-7 px-2 text-[10px]"
                                                                onClick={() => handlePhoneCall(payment)}
                                                            >
                                                                <Phone className="h-3 w-3 mr-1" /> 電話
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
