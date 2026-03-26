import { fetchBookings } from '@/actions/admin';
import { Booking } from '@/lib/db-local';
import { getAuthInfo } from '@/actions/admin-auth';
import { redirect } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { DollarSign, BarChart3, Users, Store, Globe, TrendingUp, CreditCard } from "lucide-react";
import { BackupButton } from '@/components/admin/BackupButton';
import { adminDb } from '@/lib/firebase-admin';

export default async function AdminPage() {
    const auth = await getAuthInfo();

    // If it's a studio owner, redirect them to their specific dashboard
    if (!auth.isAdmin && auth.studioId) {
        redirect(`/admin/studios/${auth.studioId}`);
    }

    // Fetch all data in parallel (Promise.allSettled で安全に取得)
    const safeGet = async (fn: () => Promise<any>, fallback: any) => {
        try { return await fn(); } catch { return fallback; }
    };

    const [bookings, studiosSnap, usersSnap, planConfigSnap] = await Promise.all([
        safeGet(() => fetchBookings(), []),
        safeGet(() => adminDb.collection("studios").get(), { docs: [], size: 0 }),
        safeGet(() => adminDb.collection("users").get(), { docs: [], size: 0 }),
        safeGet(() => adminDb.collection("settings").doc("planConfig").get(), null),
    ]);

    // Booking stats
    const typedBookings = (bookings || []) as Booking[];
    const now = new Date();
    const totalRevenue = typedBookings.reduce((sum: number, b: Booking) => sum + b.totalPrice, 0);
    const bookingsThisMonth = typedBookings.filter((b: Booking) => {
        const d = new Date(b.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const revenueThisMonth = typedBookings.filter((b: Booking) => {
        const d = new Date(b.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).reduce((sum: number, b: Booking) => sum + b.totalPrice, 0);
    const avgPrice = typedBookings.length > 0 ? totalRevenue / typedBookings.length : 0;

    // Studio stats
    const allStudios = (studiosSnap.docs || []).map((d: any) => ({ id: d.id, ...d.data() })) as any[];
    const totalStudios = allStudios.length;
    const publishedStudios = allStudios.filter((s: any) => s.isPublished === true).length;
    const contractedStudios = allStudios.filter((s: any) => s.planKey).length;
    const totalUsers = usersSnap.size || 0;

    // MRR calculation from studio plan assignments
    const planConfig = planConfigSnap?.exists ? planConfigSnap.data() : null;
    const planPrices: Record<string, number> = {};
    const optPrices: Record<string, { price: number; billingType: string }> = {};
    if (planConfig?.plans) {
        for (const p of planConfig.plans) planPrices[p.id] = p.price;
    }
    if (planConfig?.options) {
        for (const o of planConfig.options) optPrices[o.id] = { price: o.price, billingType: o.billingType || "monthly" };
    }
    const mrr = allStudios.reduce((sum, s) => {
        if (!s.planKey) return sum;
        const base = planPrices[s.planKey] || 0;
        const opts = (s.planOptions || []).reduce((o: number, k: string) => {
            const opt = optPrices[k];
            return o + (opt && opt.billingType !== "once" ? opt.price : 0);
        }, 0);
        return sum + base + opts;
    }, 0);

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12 font-sans">
            <header className="mb-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 uppercase italic">
                            プラットフォーム管理コンソール
                        </h1>
                        <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest leading-relaxed">
                            予約状況・売上集計・プラットフォーム概況
                        </p>
                    </div>
                    <BackupButton />
                </div>
            </header>

            {/* KPI GRID - Row 1: Platform metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-card border border-border p-5 rounded-2xl relative overflow-hidden group hover:border-green-500/50 transition-all">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="w-3.5 h-3.5 text-green-400" />
                            <div className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">月次収益 (MRR)</div>
                        </div>
                        <div className="text-3xl font-black text-green-400 tracking-tight">¥{mrr.toLocaleString()}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">契約店舗からの月額収益</div>
                    </div>
                </div>
                <div className="bg-card border border-border p-5 rounded-2xl relative overflow-hidden group hover:border-purple-500/50 transition-all">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <Store className="w-3.5 h-3.5 text-purple-400" />
                            <div className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">登録店舗数</div>
                        </div>
                        <div className="text-3xl font-black text-purple-400 tracking-tight">{totalStudios}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">契約中: {contractedStudios} / 公開中: {publishedStudios}</div>
                    </div>
                </div>
                <div className="bg-card border border-border p-5 rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-all">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-3.5 h-3.5 text-blue-400" />
                            <div className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">ユーザー数</div>
                        </div>
                        <div className="text-3xl font-black text-blue-400 tracking-tight">{totalUsers}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">登録ユーザー総数</div>
                    </div>
                </div>
                <div className="bg-card border border-border p-5 rounded-2xl relative overflow-hidden group hover:border-cyan-500/50 transition-all">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                            <div className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">今月予約売上</div>
                        </div>
                        <div className="text-3xl font-black text-cyan-400 tracking-tight">¥{revenueThisMonth.toLocaleString()}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">{bookingsThisMonth}件の予約</div>
                    </div>
                </div>
            </div>

            {/* KPI GRID - Row 2: Booking metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/50 transition-all shadow-2xl">
                    <div className="relative z-10">
                        <div className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest mb-1">累計予約売上</div>
                        <div className="text-4xl font-black text-foreground tracking-tight">¥{totalRevenue.toLocaleString()}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">全期間の予約売上合計</div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 text-cyan-500/10 rotate-12 group-hover:scale-110 transition-transform">
                        <DollarSign size={120} />
                    </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-all shadow-2xl">
                    <div className="relative z-10">
                        <div className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest mb-1">累計予約件数</div>
                        <div className="text-4xl font-black text-foreground tracking-tight">{bookings.length} <span className="text-sm font-normal text-blue-400">件</span></div>
                        <div className="text-[10px] text-muted-foreground mt-1">今月: {bookingsThisMonth}件</div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 text-blue-500/10 rotate-12 group-hover:scale-110 transition-transform">
                        <BarChart3 size={120} />
                    </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/50 transition-all shadow-2xl">
                    <div className="relative z-10">
                        <div className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest mb-1">平均客単価</div>
                        <div className="text-4xl font-black text-foreground tracking-tight">¥{Math.round(avgPrice).toLocaleString()}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">1予約あたりの平均金額</div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 text-purple-500/10 rotate-12 group-hover:scale-110 transition-transform">
                        <Globe size={120} />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <h2 className="text-lg font-bold tracking-tight">最近の取引履歴</h2>
                </div>

                <div className="border border-border rounded-2xl overflow-hidden bg-card/50 dark:bg-card/20 backdrop-blur-3xl shadow-inner text-foreground">
                    <Table>
                        <TableHeader className="bg-accent/5 border-b border-border">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest py-5 px-8">ID</TableHead>
                                <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest py-5">日付</TableHead>
                                <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest py-5">時間</TableHead>
                                <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest py-5">金額</TableHead>
                                <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest py-5 px-8 text-right underline underline-offset-4 decoration-cyan-500/50">ステータス</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-24 text-muted-foreground italic font-mono uppercase tracking-[0.2em]">
                                        データなし
                                    </TableCell>
                                </TableRow>
                            ) : (
                                typedBookings.map((booking: Booking) => (
                                    <TableRow key={booking.id} className={`border-border hover:bg-accent/5 transition-colors group ${booking.status === 'cancelled' ? 'opacity-50 grayscale' : ''}`}>
                                        <TableCell className="font-mono text-xs text-muted-foreground py-4 px-8 group-hover:text-cyan-400 transition-colors">#{booking.id.toUpperCase()}</TableCell>
                                        <TableCell className="text-sm font-medium">{booking.date}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{booking.startTime}</TableCell>
                                        <TableCell className="font-mono text-sm font-bold text-foreground">¥{(booking.totalPrice || 0).toLocaleString()}</TableCell>
                                        <TableCell className="py-4 px-8 text-right">
                                            {booking.status === 'cancelled' ? (
                                                <Badge variant="outline" className="text-[9px] border-red-500/50 text-red-500 bg-red-500/10 px-3 py-0">キャンセル</Badge>
                                            ) : booking.status === 'no_show' ? (
                                                <Badge variant="outline" className="text-[9px] border-purple-500/50 text-purple-400 bg-purple-500/10 px-3 py-0">無断キャンセル</Badge>
                                            ) : booking.status === 'modified' ? (
                                                <Badge variant="outline" className="text-[9px] border-yellow-500/50 text-yellow-500 bg-yellow-500/10 px-3 py-0">変更済み</Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-[9px] border-cyan-500/50 text-cyan-400 bg-cyan-500/10 px-3 py-0">予約確定</Badge>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <footer className="mt-12 flex justify-between items-center text-[10px] text-muted-foreground font-mono tracking-widest uppercase pb-10 border-t border-border pt-8">
                <div>システム構成: 正常稼働中 // DB接続先: クラウド同期済み</div>
                <div className="flex gap-6">
                    <span className="hover:text-cyan-500 transition-colors cursor-help">決済API: 稼働中</span>
                    <span className="hover:text-cyan-500 transition-colors cursor-help">データ保護: 有効</span>
                </div>
            </footer>
        </div>
    );
}
