import { fetchBookings } from '@/actions/admin';
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
import { DollarSign, BarChart3, Users, HardDrive } from "lucide-react";
import { BackupButton } from '@/components/admin/BackupButton';

export default async function AdminPage() {
    const auth = await getAuthInfo();

    // If it's a studio owner, redirect them to their specific dashboard
    if (!auth.isAdmin && auth.studioId) {
        redirect(`/admin/studios/${auth.studioId}`);
    }

    const bookings = await fetchBookings();

    // High-level Stats
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
    const bookingsThisMonth = bookings.filter(b => {
        const d = new Date(b.date);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const avgPrice = bookings.length > 0 ? totalRevenue / bookings.length : 0;

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
            <header className="mb-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 uppercase italic">
                            PLATFORM OPERATOR // CONSOLE
                        </h1>
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest leading-relaxed">
                            Live Booking Streams & Financial Performance Aggregation
                        </p>
                    </div>
                    <BackupButton />
                </div>
            </header>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/50 transition-all shadow-2xl">
                    <div className="relative z-10">
                        <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Lifetime Gross Revenue</div>
                        <div className="text-4xl font-black text-white tracking-tight">¥{totalRevenue.toLocaleString()}</div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 text-cyan-500/10 rotate-12 group-hover:scale-110 transition-transform">
                        <DollarSign size={120} />
                    </div>
                </div>

                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-all shadow-2xl">
                    <div className="relative z-10">
                        <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">M-O-M Volume (Units)</div>
                        <div className="text-4xl font-black text-white tracking-tight">{bookingsThisMonth} <span className="text-sm font-normal text-blue-400">bookings</span></div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 text-blue-500/10 rotate-12 group-hover:scale-110 transition-transform">
                        <BarChart3 size={120} />
                    </div>
                </div>

                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/50 transition-all shadow-2xl">
                    <div className="relative z-10">
                        <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">AOV (Efficiency)</div>
                        <div className="text-4xl font-black text-white tracking-tight">¥{Math.round(avgPrice).toLocaleString()}</div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 text-purple-500/10 rotate-12 group-hover:scale-110 transition-transform">
                        <Users size={120} />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <h2 className="text-lg font-bold tracking-tight">RECENT TRANSACTIONS LOG</h2>
                </div>

                <div className="border border-white/10 rounded-2xl overflow-hidden bg-slate-950/20 backdrop-blur-3xl shadow-inner shadow-white/5">
                    <Table>
                        <TableHeader className="bg-white/5 border-b border-white/5">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="text-gray-500 uppercase text-[10px] font-black tracking-widest py-5 px-8">Audit ID</TableHead>
                                <TableHead className="text-gray-500 uppercase text-[10px] font-black tracking-widest py-5">Date</TableHead>
                                <TableHead className="text-gray-500 uppercase text-[10px] font-black tracking-widest py-5">Time</TableHead>
                                <TableHead className="text-gray-500 uppercase text-[10px] font-black tracking-widest py-5">Value</TableHead>
                                <TableHead className="text-gray-500 uppercase text-[10px] font-black tracking-widest py-5 px-8 text-right underline underline-offset-4 decoration-cyan-500/50">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-24 text-gray-700 italic font-mono uppercase tracking-[0.2em]">
                                        Secure Environment // No Traffic Detected
                                    </TableCell>
                                </TableRow>
                            ) : (
                                bookings.map((booking) => (
                                    <TableRow key={booking.id} className={`border-white/5 hover:bg-white/5 transition-colors group ${booking.status === 'cancelled' ? 'opacity-50 grayscale' : ''}`}>
                                        <TableCell className="font-mono text-xs text-gray-500 py-4 px-8 group-hover:text-cyan-400 transition-colors">#{booking.id.toUpperCase()}</TableCell>
                                        <TableCell className="text-sm font-medium">{booking.date}</TableCell>
                                        <TableCell className="text-sm text-gray-400">{booking.startTime}</TableCell>
                                        <TableCell className="font-mono text-sm font-bold text-white">¥{booking.totalPrice.toLocaleString()}</TableCell>
                                        <TableCell className="py-4 px-8 text-right">
                                            {booking.status === 'cancelled' ? (
                                                <Badge variant="outline" className="text-[9px] border-red-500/50 text-red-500 bg-red-500/10 px-3 py-0">CANCELLED</Badge>
                                            ) : booking.status === 'no_show' ? (
                                                <Badge variant="outline" className="text-[9px] border-purple-500/50 text-purple-400 bg-purple-500/10 px-3 py-0">NO_SHOW // 無断来店</Badge>
                                            ) : booking.status === 'modified' ? (
                                                <Badge variant="outline" className="text-[9px] border-yellow-500/50 text-yellow-500 bg-yellow-500/10 px-3 py-0">MODIFIED</Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-[9px] border-cyan-500/50 text-cyan-400 bg-cyan-500/10 px-3 py-0">ACTIVE</Badge>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <footer className="mt-12 flex justify-between items-center text-[10px] text-gray-600 font-mono tracking-widest uppercase pb-10 border-t border-white/5 pt-8">
                <div>SYS_LOAD: OPTIMAL // ENDPOINT: LOCAL_JSON_DB</div>
                <div className="flex gap-6">
                    <span className="hover:text-cyan-500 transition-colors cursor-help">REVENUE API OK</span>
                    <span className="hover:text-cyan-500 transition-colors cursor-help">STRIPE_CONNECT ACTIVE</span>
                </div>
            </footer>
        </div>
    );
}
