"use client";

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Users as UsersIcon, Mail, Phone, Calendar, MapPin, 
    History, Download, ChevronRight, X, Ticket, Clock,
    CreditCard, ExternalLink
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { fetchUserDetail } from "@/actions/admin";

interface UserListClientProps {
    users: any[];
    isAdmin: boolean;
}

export function UserListClient({ users, isAdmin }: UserListClientProps) {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [userDetail, setUserDetail] = useState<any>(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNameClick = async (userId: string) => {
        setSelectedUserId(userId);
        setIsLoadingDetail(true);
        setIsModalOpen(true);
        try {
            const detail = await fetchUserDetail(userId);
            setUserDetail(detail);
        } catch (error) {
            console.error("Failed to fetch user detail:", error);
        } finally {
            setIsLoadingDetail(false);
        }
    };

    const handleExportCSV = () => {
        // Create CSV Content
        const headers = ["ID", "Name", "Email", "Phone", "Address", "Created At", "JOCOLLA User"];
        const rows = users.map(user => [
            user.id,
            user.name,
            user.email,
            user.phone || "",
            user.address || "",
            user.createdAt,
            user.isJocollaUser ? "Yes" : "No"
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${(cell || "").toString().replace(/"/g, '""')}"`).join(","))
        ].join("\n");

        // Download Trigger
        const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `users_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <h2 className="text-lg font-bold tracking-tight uppercase">
                        {isAdmin ? 'ユーザーデータベース' : 'メンバー名簿'}
                    </h2>
                </div>
                <Button 
                    onClick={handleExportCSV}
                    variant="outline" 
                    className="border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 gap-2 font-bold text-xs uppercase italic"
                >
                    <Download size={14} /> CSV出力 (Spreadsheet用)
                </Button>
            </div>

            <div className="border border-border rounded-2xl overflow-hidden bg-card/50 dark:bg-card/20 backdrop-blur-3xl shadow-inner">
                <Table>
                    <TableHeader className="bg-accent/5 border-b border-border">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest py-5 px-8">メンバー情報</TableHead>
                            <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest py-5">連絡先 / 住所</TableHead>
                            {!isAdmin && <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest py-5">利用履歴</TableHead>}
                            <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest py-5">登録日</TableHead>
                            <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest py-5 px-8 text-right">認証</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={isAdmin ? 4 : 5} className="text-center py-24 text-muted-foreground italic font-mono uppercase tracking-[0.2em]">
                                    データなし // 登録メンバーがいません
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user: any) => (
                                <TableRow key={user.id} className="border-border hover:bg-accent/5 transition-colors group">
                                    <TableCell className="py-6 px-8">
                                        <div className="flex flex-col">
                                            <button 
                                                onClick={() => handleNameClick(user.id)}
                                                className="text-left font-bold text-foreground group-hover:text-cyan-400 transition-colors uppercase tracking-tight text-base hover:underline"
                                            >
                                                {user.name}
                                            </button>
                                            <span className="font-mono text-[9px] text-muted-foreground">ID: {user.id.substring(0, 8)}...</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                                <Mail size={12} className="text-cyan-500/50" />
                                                {user.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                                <Phone size={12} className="text-cyan-500/50" />
                                                {user.phone || 'N/A'}
                                            </div>
                                        </div>
                                    </TableCell>

                                    {!isAdmin && (
                                        <TableCell className="py-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase">
                                                    <History size={12} />
                                                    {user.bookings?.length || 0} 回来店
                                                </div>
                                            </div>
                                        </TableCell>
                                    )}

                                    <TableCell className="py-6">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar size={14} className="text-cyan-500/50" />
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ja-JP') : 'N/A'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6 px-8 text-right">
                                        <Badge variant="outline" className="text-[9px] border-cyan-500/50 text-cyan-400 bg-cyan-500/10 px-3 py-0">
                                            {user.isJocollaUser ? 'JOCOLLA認証済み' : '一般ユーザー'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* User Detail Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-border shadow-2xl p-0">
                    {isLoadingDetail ? (
                        <div className="p-20 flex flex-col items-center justify-center gap-4">
                            <div className="w-12 h-1 bg-cyan-500 rounded-full animate-pulse"></div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">読み込み中...</span>
                        </div>
                    ) : userDetail && (
                        <div className="relative">
                            {/* Modal Header / Banner */}
                            <div className="h-32 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 p-8 flex items-end">
                                <div className="flex justify-between w-full items-end">
                                    <div>
                                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">{userDetail.name}</h2>
                                        <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest mt-2">USER_PROFILE_METADATA // ID: {userDetail.id}</p>
                                    </div>
                                    <Badge className="bg-cyan-500 text-black font-bold h-6 px-3">
                                        {userDetail.isJocollaUser ? 'プロ会員' : '一般会員'}
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                {/* Info Cards - Stacked Vertically for Readability */}
                                <div className="flex flex-col gap-4">
                                    <div className="bg-card/50 border border-border p-6 rounded-2xl">
                                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                                            <div className="flex items-center gap-2 text-muted-foreground uppercase text-[10px] font-bold tracking-widest min-w-[120px]">
                                                <Mail size={14} className="text-cyan-500" /> 基本情報
                                            </div>
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-muted-foreground uppercase">メールアドレス</p>
                                                    <p className="text-sm font-bold text-foreground break-all">{userDetail.email}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-muted-foreground uppercase">電話番号</p>
                                                    <p className="text-sm font-bold text-foreground">{userDetail.phone || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-card/50 border border-border p-6 rounded-2xl">
                                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                                            <div className="flex items-center gap-2 text-muted-foreground uppercase text-[10px] font-bold tracking-widest min-w-[120px]">
                                                <MapPin size={14} className="text-blue-500" /> 所在地 / 登録
                                            </div>
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-muted-foreground uppercase">住所</p>
                                                    <p className="text-sm font-bold text-foreground">{userDetail.address || '未設定'}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-muted-foreground uppercase">登録日</p>
                                                    <p className="text-sm font-bold text-foreground">{new Date(userDetail.createdAt).toLocaleDateString('ja-JP')} ({new Date(userDetail.createdAt).toLocaleTimeString()})</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-card/50 border border-border p-6 rounded-2xl">
                                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                                            <div className="flex items-center gap-2 text-muted-foreground uppercase text-[10px] font-bold tracking-widest min-w-[120px]">
                                                <Ticket size={14} className="text-purple-500" /> 特典ステータス
                                            </div>
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-muted-foreground uppercase">保有クーポン数 (残り)</p>
                                                    <p className="text-lg font-black text-purple-400">{(userDetail.coupons?.filter((c:any) => !c.isUsed).length) || 0} <span className="text-[10px] font-normal text-muted-foreground uppercase ml-1">Coupons</span></p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-muted-foreground uppercase">累計利用回数</p>
                                                    <p className="text-lg font-black text-foreground">{userDetail.bookings?.length || 0} <span className="text-[10px] font-normal text-muted-foreground uppercase ml-1">Visits</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Booking History Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-6 w-1 bg-cyan-500 rounded-full"></div>
                                        <h3 className="text-lg font-black uppercase italic tracking-tighter">利用履歴 // HISTORY</h3>
                                    </div>
                                    <div className="border border-border rounded-2xl overflow-hidden bg-card/10">
                                        <Table>
                                            <TableHeader className="bg-accent/5">
                                                <TableRow className="hover:bg-transparent border-border">
                                                    <TableHead className="text-[10px] uppercase font-bold text-muted-foreground py-3">利用日</TableHead>
                                                    <TableHead className="text-[10px] uppercase font-bold text-muted-foreground py-3">店舗 / ルーム</TableHead>
                                                    <TableHead className="text-[10px] uppercase font-bold text-muted-foreground py-3">時間 (h)</TableHead>
                                                    <TableHead className="text-[10px] uppercase font-bold text-muted-foreground py-3 text-right">金額</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {(!userDetail.bookings || userDetail.bookings.length === 0) ? (
                                                    <TableRow>
                                                        <TableCell colSpan={4} className="text-center py-10 text-muted-foreground font-mono text-xs italic">
                                                            利用データがありません
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    userDetail.bookings.map((booking: any) => (
                                                        <TableRow key={booking.id} className="border-border hover:bg-white/5 transition-colors">
                                                            <TableCell className="py-4 text-xs font-bold">{booking.date}</TableCell>
                                                            <TableCell className="py-4">
                                                                <div className="flex flex-col">
                                                                    <span className="text-xs font-bold text-foreground">{booking.studioName || "店舗"}</span>
                                                                    <span className="text-[10px] text-muted-foreground italic tracking-tight">{booking.roomName || "メインルーム"}</span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="py-4 text-xs font-mono">{booking.startTime} ({booking.durationHours}h)</TableCell>
                                                            <TableCell className="py-4 text-xs font-bold text-right text-cyan-400">¥{booking.totalPrice.toLocaleString()}</TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                {/* Coupon History Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-6 w-1 bg-purple-500 rounded-full"></div>
                                        <h3 className="text-lg font-black uppercase italic tracking-tighter">クーポン発行・利用履歴 // COUPONS</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(!userDetail.coupons || userDetail.coupons.length === 0) ? (
                                            <div className="col-span-full border border-border border-dashed p-10 rounded-2xl flex flex-col items-center justify-center text-muted-foreground gap-2">
                                                <Ticket size={24} className="opacity-20" />
                                                <span className="font-mono text-[10px] uppercase tracking-widest">NO_COUPON_HISTORY_FOUND</span>
                                            </div>
                                        ) : (
                                            userDetail.coupons.map((coupon: any) => (
                                                <div key={coupon.id} className={`p-4 rounded-2xl border ${coupon.isUsed ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-purple-900/10 border-purple-500/30'} relative overflow-hidden group shadow-lg`}>
                                                    <div className="flex justify-between items-start relative z-10">
                                                        <div>
                                                            <div className="text-[9px] font-mono text-purple-400 uppercase tracking-widest mb-1">CODE: {coupon.code}</div>
                                                            <h4 className="font-bold text-foreground">{coupon.title}</h4>
                                                            <p className="text-[10px] text-muted-foreground mt-1">発行日: {new Date(coupon.issuedAt).toLocaleDateString()}</p>
                                                        </div>
                                                        <Badge className={coupon.isUsed ? 'bg-slate-700 text-slate-300' : 'bg-purple-500 text-white'}>
                                                            {coupon.isUsed ? '使用済み' : '未使用'}
                                                        </Badge>
                                                    </div>
                                                    <div className="mt-4 flex justify-between items-center relative z-10">
                                                        <div className="text-xl font-black text-purple-400">
                                                            {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `¥${coupon.discountValue.toLocaleString()} OFF`}
                                                        </div>
                                                        {coupon.usedAt && (
                                                            <div className="text-[10px] font-mono text-muted-foreground">
                                                                USED_AT: {new Date(coupon.usedAt).toLocaleDateString()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* Background Pattern */}
                                                    <div className="absolute top-[-20px] right-[-20px] opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                                                        <Ticket size={80} />
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t border-border bg-card/20 flex justify-end">
                                <Button onClick={() => setIsModalOpen(false)} className="bg-slate-800 text-white hover:bg-slate-700 font-bold px-8">閉じる</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
