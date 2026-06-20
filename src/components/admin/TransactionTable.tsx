"use client";
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, User, Mail, Clock, MapPin, Store, Calendar, Hash } from "lucide-react";

interface BookingData {
    id: string;
    userId: string;
    studioId: string;
    roomName?: string;
    date: string;
    startTime: string;
    durationHours: number;
    userCount?: number;
    totalPrice: number;
    status: string;
    createdAt: string;
    confirmedAt?: string;
    userEmail?: string;
    userName?: string;
    selectedOptions?: string[];
    isPersonalPractice?: boolean;
    storeName?: string;
    studioName?: string;
    studioAddress?: string;
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case "cancelled":
            return <Badge variant="outline" className="text-[9px] border-red-500/50 text-red-500 bg-red-500/10 px-3 py-0">キャンセル</Badge>;
        case "no_show":
            return <Badge variant="outline" className="text-[9px] border-purple-500/50 text-purple-400 bg-purple-500/10 px-3 py-0">無断キャンセル</Badge>;
        case "modified":
            return <Badge variant="outline" className="text-[9px] border-yellow-500/50 text-yellow-500 bg-yellow-500/10 px-3 py-0">変更済み</Badge>;
        default:
            return <Badge variant="outline" className="text-[9px] border-cyan-500/50 text-cyan-400 bg-cyan-500/10 px-3 py-0">予約確定</Badge>;
    }
}

export function TransactionTable({ bookings }: { bookings: BookingData[] }) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    return (
        <div className="border border-border rounded-2xl overflow-hidden bg-card/50 dark:bg-card/20 backdrop-blur-3xl shadow-inner text-foreground">
            <Table>
                <TableHeader className="bg-accent/5 border-b border-border">
                    <TableRow className="hover:bg-transparent border-none">
                        <TableHead className="text-muted-foreground text-[10px] font-bold tracking-widest py-5 px-8">ID</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] font-bold tracking-widest py-5">日付</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] font-bold tracking-widest py-5">時間</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] font-bold tracking-widest py-5">金額</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] font-bold tracking-widest py-5 px-8 text-right underline underline-offset-4 decoration-cyan-500/50">ステータス</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-24 text-muted-foreground font-mono uppercase tracking-[0.2em]">
                                データなし
                            </TableCell>
                        </TableRow>
                    ) : (
                        bookings.map((booking) => {
                            const isExpanded = expandedId === booking.id;
                            return (
                                <React.Fragment key={booking.id}>
                                    <TableRow
                                        onClick={() => toggle(booking.id)}
                                        className={`border-border hover:bg-accent/5 transition-colors group cursor-pointer select-none ${booking.status === "cancelled" ? "opacity-50 grayscale" : ""} ${isExpanded ? "bg-accent/5" : ""}`}
                                    >
                                        <TableCell className="font-mono text-xs py-4 px-8 transition-colors">
                                            <span className={`inline-flex items-center gap-1.5 ${isExpanded ? "text-cyan-400" : "text-muted-foreground group-hover:text-cyan-400"}`}>
                                                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                                                #{booking.id.toUpperCase()}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-sm font-medium">{booking.date}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{booking.startTime}</TableCell>
                                        <TableCell className="font-mono text-sm font-bold text-foreground">¥{(booking.totalPrice || 0).toLocaleString()}</TableCell>
                                        <TableCell className="py-4 px-8 text-right">
                                            <StatusBadge status={booking.status} />
                                        </TableCell>
                                    </TableRow>
                                    {isExpanded && (
                                        <TableRow className="border-border bg-accent/5">
                                            <TableCell colSpan={5} className="px-8 py-0">
                                                <div className="py-5 border-t border-border/50 animate-in fade-in slide-in-from-top-1 duration-200">
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                                                        {/* ユーザー情報 */}
                                                        <div className="space-y-0.5">
                                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                                <User className="w-3 h-3" />
                                                                <span className="text-[10px] uppercase font-bold tracking-widest">ユーザー名</span>
                                                            </div>
                                                            <p className="text-sm font-medium text-foreground">{booking.userName || "─"}</p>
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                                <Mail className="w-3 h-3" />
                                                                <span className="text-[10px] uppercase font-bold tracking-widest">メール</span>
                                                            </div>
                                                            <p className="text-sm font-medium text-foreground">{booking.userEmail || "─"}</p>
                                                        </div>
                                                        {/* スタジオ情報 */}
                                                        <div className="space-y-0.5">
                                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                                <Store className="w-3 h-3" />
                                                                <span className="text-[10px] uppercase font-bold tracking-widest">スタジオ</span>
                                                            </div>
                                                            <p className="text-sm font-medium text-foreground">{booking.storeName || booking.studioName || booking.studioId || "─"}</p>
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                                <MapPin className="w-3 h-3" />
                                                                <span className="text-[10px] uppercase font-bold tracking-widest">部屋</span>
                                                            </div>
                                                            <p className="text-sm font-medium text-foreground">{booking.roomName || "─"}</p>
                                                        </div>
                                                        {/* 利用詳細 */}
                                                        <div className="space-y-0.5">
                                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                                <Clock className="w-3 h-3" />
                                                                <span className="text-[10px] uppercase font-bold tracking-widest">利用時間</span>
                                                            </div>
                                                            <p className="text-sm font-medium text-foreground">{booking.durationHours ? `${booking.durationHours}時間` : "─"}</p>
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                                <Hash className="w-3 h-3" />
                                                                <span className="text-[10px] uppercase font-bold tracking-widest">利用人数</span>
                                                            </div>
                                                            <p className="text-sm font-medium text-foreground">{booking.userCount ? `${booking.userCount}人` : "─"}</p>
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                                <Calendar className="w-3 h-3" />
                                                                <span className="text-[10px] uppercase font-bold tracking-widest">予約日時</span>
                                                            </div>
                                                            <p className="text-sm font-medium text-foreground">
                                                                {booking.createdAt ? new Date(booking.createdAt).toLocaleString("ja-JP") : "─"}
                                                            </p>
                                                        </div>
                                                        {booking.isPersonalPractice && (
                                                            <div className="space-y-0.5">
                                                                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">タイプ</span>
                                                                <p className="text-sm font-medium text-blue-400">個人練習</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {booking.selectedOptions && booking.selectedOptions.length > 0 && (
                                                        <div className="mt-4 pt-3 border-t border-border/30">
                                                            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">オプション</span>
                                                            <div className="flex flex-wrap gap-1.5 mt-1">
                                                                {booking.selectedOptions.map((opt, i) => (
                                                                    <span key={i} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs rounded-md font-medium">{opt}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
