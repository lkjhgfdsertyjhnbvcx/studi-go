"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, DollarSign, Loader2, AlertTriangle, RefreshCcw, MoreHorizontal, UserX, CheckCircle } from "lucide-react";
import { fetchBookingsByStudio, updateBookingStatus } from "@/actions/admin";
import { format, parseISO, isFuture, isPast, isToday } from "date-fns";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Booking {
    id: string;
    userId: string;
    studioId: string;
    roomName?: string;
    date: string;
    startTime: string;
    durationHours: number;
    userCount: number;
    totalPrice: number;
    status: 'active' | 'cancelled' | 'modified' | 'no_show';
    createdAt: string;
}

export function StudioBookings({ studioId }: { studioId: string }) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadBookings = async () => {
        setIsLoading(true);
        const data = await fetchBookingsByStudio(studioId);
        setBookings(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadBookings();
    }, [studioId]);

    const handleStatusChange = async (id: string, newStatus: 'active' | 'cancelled' | 'modified' | 'no_show') => {
        const success = await updateBookingStatus(id, newStatus);
        if (success) {
            loadBookings();
        }
    };

    const getBookingStatus = (booking: Booking) => {
        if (booking.status === 'cancelled') {
            return { label: "キャンセル済", color: "bg-red-900/20 text-red-500 border-red-500/30 font-bold" };
        }
        if (booking.status === 'no_show') {
            return { label: "無断来店", color: "bg-purple-900/30 text-purple-400 border-purple-500/30 font-bold shadow-[0_0_10px_rgba(168,85,247,0.2)]" };
        }
        if (booking.status === 'modified') {
            return { label: "内容更新", color: "bg-orange-900/20 text-orange-400 border-orange-500/30" };
        }

        const bookingDate = parseISO(booking.date);
        if (isToday(bookingDate)) {
            return { label: "今日", color: "bg-cyan-900/30 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]" };
        } else if (isFuture(bookingDate)) {
            return { label: "予約済み", color: "bg-green-900/30 text-green-400 border-green-500/30" };
        } else {
            return { label: "完了", color: "bg-gray-700/30 text-gray-400 border-gray-500/30" };
        }
    };

    if (isLoading) {
        return (
             <Card className="bg-card border-border">
                 <CardContent className="py-20 text-center text-muted-foreground flex items-center justify-center gap-2">
                     <Loader2 className="animate-spin h-4 w-4" />
                     読み込み中...
                 </CardContent>
             </Card>
        );
    }

    const activeBookings = bookings.filter(b => b.status !== 'cancelled' && b.status !== 'no_show');
    const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;
    const noShowCount = bookings.filter(b => b.status === 'no_show').length;
    const modifiedCount = bookings.filter(b => b.status === 'modified').length;

    const upcomingBookings = activeBookings.filter((b) => isFuture(parseISO(b.date)) || isToday(parseISO(b.date)));
    const pastBookings = activeBookings.filter((b) => isPast(parseISO(b.date)) && !isToday(parseISO(b.date)));
    const totalRevenue = activeBookings.reduce((sum, b) => sum + b.totalPrice, 0);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card border-border shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            有効予約
                        </CardTitle>
                        <Calendar className="h-3 w-3 text-cyan-500 dark:text-cyan-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-foreground">{activeBookings.length}</div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            キャンセル / 無断
                        </CardTitle>
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-red-500">
                            {cancelledCount}<span className="text-xs text-purple-600 dark:text-purple-400 ml-1">+{noShowCount}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            内容変更
                        </CardTitle>
                        <RefreshCcw className="h-3 w-3 text-orange-500 dark:text-orange-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-orange-500 dark:text-orange-400">{modifiedCount}</div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-lg px-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            確定売上
                        </CardTitle>
                        <DollarSign className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-green-600 dark:text-green-400">¥{totalRevenue.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Bookings Table */}
            <Card className="bg-card border-border overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
                    <CardTitle className="text-xl font-black italic tracking-tighter text-cyan-500 uppercase">
                        Studio Booking Log
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={loadBookings} className="h-8 border-border text-muted-foreground hover:text-foreground">
                        <RefreshCcw className="h-3 w-3 mr-2" /> 更新
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted">
                            <TableRow className="border-border hover:bg-transparent">
                                <TableHead className="text-[10px] font-bold uppercase text-muted-foreground py-4 px-6 text-center">操作</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase text-muted-foreground py-4">ID</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase text-muted-foreground py-4">日時</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase text-muted-foreground py-4">部屋 / 期間</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase text-muted-foreground py-4">詳細</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase text-muted-foreground py-4">金額</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase text-muted-foreground py-4 text-right pr-6">ステータス</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-24 text-muted-foreground italic uppercase tracking-widest">
                                        No bookings on record
                                    </TableCell>
                                </TableRow>
                            ) : (
                                bookings.map((booking) => {
                                    const status = getBookingStatus(booking);
                                    const isCancelled = booking.status === 'cancelled';
                                    const isNoShow = booking.status === 'no_show';
                                    return (
                                        <TableRow
                                            key={booking.id}
                                            className={`border-border hover:bg-muted/50 transition-colors ${isCancelled || isNoShow ? 'opacity-40 grayscale italic' : ''}`}
                                        >
                                            <TableCell className="text-center px-6">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="start" className="bg-card border-border text-foreground shadow-2xl">
                                                        <DropdownMenuLabel className="text-[10px] uppercase text-muted-foreground font-bold px-3 py-2">Status Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator className="bg-border" />
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusChange(booking.id, 'active')}
                                                            className="flex items-center gap-2 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer"
                                                        >
                                                            <CheckCircle className="h-3.5 w-3.5" />
                                                            <span>有効 (Active)</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusChange(booking.id, 'no_show')}
                                                            className="flex items-center gap-2 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer text-purple-600 dark:text-purple-400/80"
                                                        >
                                                            <UserX className="h-3.5 w-3.5" />
                                                            <span>無断来店 (No-Show)</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                                            className="flex items-center gap-2 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 cursor-pointer text-red-600 dark:text-red-400/80"
                                                        >
                                                            <AlertTriangle className="h-3.5 w-3.5" />
                                                            <span>キャンセル処理</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                            <TableCell className="font-mono text-[10px] text-muted-foreground">
                                                #{booking.id.toUpperCase().substring(0, 8)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-bold text-foreground text-sm">{format(parseISO(booking.date), "yyyy/MM/dd")}</div>
                                                <div className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1"><Clock className="h-2 w-2" /> {booking.startTime}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-xs font-medium text-foreground">{booking.roomName || "Standard"}</div>
                                                <div className="text-[10px] text-muted-foreground mt-0.5">{booking.durationHours}時間利用</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Users className="h-3 w-3" />
                                                    {booking.userCount}名様
                                                </div>
                                            </TableCell>
                                            <TableCell className={`font-mono font-black ${isCancelled || isNoShow ? 'text-muted-foreground line-through' : 'text-cyan-600 dark:text-cyan-400'}`}>
                                                ¥{booking.totalPrice.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <Badge variant="outline" className={`text-[9px] px-2 py-0 border-none rounded-full ${status.color}`}>
                                                    {status.label}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
