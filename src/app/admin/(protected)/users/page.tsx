import { fetchUsers, fetchUsersByStudio } from '@/actions/admin';
import { getAuthInfo } from '@/actions/admin-auth';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Users as UsersIcon, Mail, Phone, Calendar, MapPin, History } from "lucide-react";
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
    const auth = await getAuthInfo();

    // For Studio Admins, we show customers who used their studio
    // For Platform Admins, we show all users
    const users = auth.isAdmin
        ? await fetchUsers()
        : auth.studioId
            ? await fetchUsersByStudio(auth.studioId)
            : [];

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
            <header className="mb-10">
                <h1 className="text-4xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 uppercase italic">
                    {auth.isAdmin ? 'PLATFORM USER REGISTRY' : 'STUDIO CUSTOMERS'}
                </h1>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest leading-relaxed">
                    {auth.isAdmin
                        ? 'Global registry of all registered platform participants.'
                        : 'Management portal for members who have interacted with your studio.'}
                </p>
            </header>

            <div className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <h2 className="text-lg font-bold tracking-tight uppercase">
                        {auth.isAdmin ? 'Global User Database' : 'Member Directory'}
                    </h2>
                </div>

                <div className="border border-white/10 rounded-2xl overflow-hidden bg-slate-950/20 backdrop-blur-3xl shadow-inner shadow-white/5">
                    <Table>
                        <TableHeader className="bg-white/5 border-b border-white/5">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="text-gray-500 uppercase text-[10px] font-black tracking-widest py-5 px-8">Member Info</TableHead>
                                <TableHead className="text-gray-500 uppercase text-[10px] font-black tracking-widest py-5">Contact & Location</TableHead>
                                {!auth.isAdmin && <TableHead className="text-gray-500 uppercase text-[10px] font-black tracking-widest py-5">Usage History</TableHead>}
                                <TableHead className="text-gray-500 uppercase text-[10px] font-black tracking-widest py-5">Joined</TableHead>
                                <TableHead className="text-gray-500 uppercase text-[10px] font-black tracking-widest py-5 px-8 text-right">Verification</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={auth.isAdmin ? 4 : 5} className="text-center py-24 text-gray-700 italic font-mono uppercase tracking-[0.2em]">
                                        Secure Environment // No Member Records Identified
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user: any) => (
                                    <TableRow key={user.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                                        <TableCell className="py-6 px-8">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight text-base">{user.name}</span>
                                                <span className="font-mono text-[9px] text-gray-600">UUID: {user.id.substring(0, 16)}...</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-gray-400 text-xs">
                                                    <Mail size={12} className="text-cyan-500/50" />
                                                    {user.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-400 text-xs">
                                                    <Phone size={12} className="text-cyan-500/50" />
                                                    {user.phone || 'N/A'}
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500 text-[10px]">
                                                    <MapPin size={10} className="text-blue-500/50" />
                                                    {user.address || 'Address not registered'}
                                                </div>
                                            </div>
                                        </TableCell>

                                        {!auth.isAdmin && (
                                            <TableCell className="py-6">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase">
                                                        <History size={12} />
                                                        {user.bookings?.length || 0} visits
                                                    </div>
                                                    {user.bookings && user.bookings.length > 0 && (
                                                        <div className="text-[10px] text-gray-500 italic">
                                                            Last visit: {user.bookings[0].date}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                        )}

                                        <TableCell className="py-6">
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Calendar size={14} className="text-cyan-500/50" />
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ja-JP') : 'N/A'}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6 px-8 text-right">
                                            <Badge variant="outline" className="text-[9px] border-cyan-500/50 text-cyan-400 bg-cyan-500/10 px-3 py-0">
                                                {user.isJocollaUser ? 'JOCOLLA_VERIFIED' : 'PLATFORM_USER'}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <footer className="mt-12 flex justify-between items-center text-[10px] text-gray-600 font-mono tracking-widest uppercase pb-10 border-t border-white/5 pt-8">
                <div>GATEWAY_STATUS: ACTIVE // {users.length} MEMBERS IDENTIFIED</div>
                <div className="flex gap-6">
                    <span className="hover:text-cyan-500 transition-colors cursor-help">SSL_ENCRYPTED</span>
                    <span className="hover:text-cyan-500 transition-colors cursor-help">P_DAT_ACCESS_LEVEL: {auth.isAdmin ? 'A' : 'B'}</span>
                </div>
            </footer>
        </div>
    );
}
