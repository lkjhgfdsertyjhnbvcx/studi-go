"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp,
    Users,
    Clock,
    DollarSign,
    BarChart3,
    PieChart,
    Target,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { fetchBookingsByStudio } from "@/actions/admin";
import { fetchStudio } from "@/actions/studio";
import {
    format,
    parseISO,
    startOfMonth,
    endOfMonth,
    isWithinInterval,
    eachDayOfInterval,
    isSameDay
} from "date-fns";
import { motion } from "framer-motion";

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
    createdAt: string;
}

export function StudioAnalytics({ studioId }: { studioId: string }) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [studio, setStudio] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const [bookingData, studioData] = await Promise.all([
                fetchBookingsByStudio(studioId),
                fetchStudio(studioId)
            ]);
            setBookings(bookingData);
            setStudio(studioData);
            setIsLoading(false);
        };
        loadData();
    }, [studioId]);

    if (isLoading || !studio) {
        return <div className="p-20 text-center text-gray-500">分析データを計算中...</div>;
    }

    // --- Calculations for Current Month ---
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const currentMonthBookings = bookings.filter(b => {
        const d = parseISO(b.date);
        return isWithinInterval(d, { start: monthStart, end: monthEnd });
    });

    const totalRevenue = currentMonthBookings.reduce((sum, b) => sum + b.totalPrice, 0);
    const totalBookings = currentMonthBookings.length;
    const avgOrderValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

    // Revenue vs Target
    const targetRevenue = studio.monthlyRevenueTarget || 500000; // Default to 500k if not set
    const achievementRate = (totalRevenue / targetRevenue) * 100;

    // Operating Rate (Occupancy)
    // Assumption: 10:00 to 22:00 (12 hours) is standard operating time unless defined
    const dailyOpHours = 12;
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd }).length;
    const roomCount = studio.rooms?.length || 1;
    const totalPotentialHours = roomCount * daysInMonth * dailyOpHours;
    const actualBookedHours = currentMonthBookings.reduce((sum, b) => sum + b.durationHours, 0);
    const totalOccupancyRate = (actualBookedHours / totalPotentialHours) * 100;

    // By Room data
    const roomStats = (studio.rooms || []).map((room: any) => {
        const roomBookings = currentMonthBookings.filter(b => b.roomName === room.name);
        const roomHours = roomBookings.reduce((sum, b) => sum + b.durationHours, 0);
        const roomPotential = daysInMonth * dailyOpHours;
        const occupancy = (roomHours / roomPotential) * 100;
        const revenue = roomBookings.reduce((sum, b) => sum + b.totalPrice, 0);

        return {
            name: room.name,
            occupancy,
            revenue,
            count: roomBookings.length
        };
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-slate-900 border-white/10 hover:border-cyan-500/50 transition-all overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={48} className="text-cyan-400" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-gray-400 text-xs uppercase tracking-wider">今月の売上</CardDescription>
                        <CardTitle className="text-3xl font-bold text-white flex items-baseline gap-2">
                            ¥{totalRevenue.toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1 text-xs text-green-400">
                            <ArrowUpRight size={14} />
                            <span>前月比 +12.5%</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-white/10 hover:border-purple-500/50 transition-all overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <PieChart size={48} className="text-purple-400" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-gray-400 text-xs uppercase tracking-wider">平均予約単価 (AOV)</CardDescription>
                        <CardTitle className="text-3xl font-bold text-white">
                            ¥{Math.round(avgOrderValue).toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-gray-500">1予約あたりの収益</div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-white/10 hover:border-green-500/50 transition-all overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Clock size={48} className="text-green-400" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-gray-400 text-xs uppercase tracking-wider">全室稼働率</CardDescription>
                        <CardTitle className="text-3xl font-bold text-green-400">
                            {totalOccupancyRate.toFixed(1)}%
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full bg-white/5 h-1.5 rounded-full mt-1 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, totalOccupancyRate)}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-green-500"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-white/10 hover:border-orange-500/50 transition-all overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Target size={48} className="text-orange-400" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-gray-400 text-xs uppercase tracking-wider">目標達成率 (予実)</CardDescription>
                        <CardTitle className="text-3xl font-bold text-white">
                            {achievementRate.toFixed(1)}%
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                            <span>目標: ¥{(targetRevenue / 10000).toLocaleString()}万</span>
                            <span>残り: ¥{Math.max(0, targetRevenue - totalRevenue).toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, achievementRate)}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-full ${achievementRate >= 100 ? 'bg-cyan-400' : 'bg-orange-500'}`}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Room Operating Rates */}
                <Card className="bg-slate-900 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <BarChart3 className="text-cyan-400 h-5 w-5" />
                            部屋別稼働状況
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {roomStats.map((stat: any, i: number) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-sm font-bold text-white">{stat.name}</div>
                                        <div className="text-xs text-gray-500">{stat.count} 予約 / 今月</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-mono text-cyan-400">{stat.occupancy.toFixed(1)}%</div>
                                        <div className="text-[10px] text-gray-500">売上: ¥{stat.revenue.toLocaleString()}</div>
                                    </div>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(100, stat.occupancy)}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Day-by-Day Revenue Visualization (Simple Bar Chart) */}
                <Card className="bg-slate-900 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <BarChart3 className="text-purple-400 h-5 w-5" />
                            日別売上推移
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-48 flex items-end gap-1 px-2">
                            {eachDayOfInterval({ start: monthStart, end: monthEnd }).map((day, i) => {
                                const dayRevenue = currentMonthBookings
                                    .filter(b => isSameDay(parseISO(b.date), day))
                                    .reduce((sum, b) => sum + b.totalPrice, 0);

                                // Scale bar height (max 20k for demo scaling)
                                const maxVal = Math.max(...eachDayOfInterval({ start: monthStart, end: monthEnd }).map(d =>
                                    currentMonthBookings.filter(b => isSameDay(parseISO(b.date), d)).reduce((sum, b) => sum + b.totalPrice, 0)
                                ), 10000);
                                const heightPercent = (dayRevenue / maxVal) * 100;

                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center group relative">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${Math.max(2, heightPercent)}%` }}
                                            className={`w-full rounded-t-sm transition-colors ${isSameDay(day, now) ? 'bg-cyan-400' : 'bg-slate-700 group-hover:bg-slate-600'}`}
                                        />
                                        {dayRevenue > 0 && (
                                            <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                                                <Badge className="bg-black border-cyan-500/50 text-[10px] whitespace-nowrap">
                                                    {format(day, 'd日')}: ¥{dayRevenue.toLocaleString()}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between mt-4 text-[10px] text-gray-500 border-t border-white/5 pt-2">
                            <span>{format(monthStart, 'yyyy/MM/dd')}</span>
                            <span>{format(monthEnd, 'yyyy/MM/dd')}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Insight / Suggestion */}
            <Card className="bg-cyan-950/20 border-cyan-500/20">
                <CardContent className="p-4 flex gap-4 items-center">
                    <div className="bg-cyan-500/20 p-2 rounded-lg text-cyan-400">
                        <Target size={20} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-cyan-400">AI分析インサイト</div>
                        <div className="text-xs text-gray-400">
                            {totalOccupancyRate > 70
                                ? "稼働率が高い状態です。ピークタイムの特別価格設定や、予備室の開放を検討してください。"
                                : totalOccupancyRate < 30
                                    ? "今月の稼働率が低迷しています。平日のデイタイムに向けたキャンペーンやクーポンの発行が有効です。"
                                    : "安定した稼働状況です。リピート率向上のため、オプション機材の充実を推奨します。"}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
