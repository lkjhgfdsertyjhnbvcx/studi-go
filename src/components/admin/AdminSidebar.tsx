"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { adminLogout, getAuthInfo } from '@/actions/admin-auth';
import {
    LayoutDashboard,
    Store,
    CreditCard,
    Megaphone,
    Ticket,
    LogOut,
    BarChart3,
    Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminSidebar() {
    const pathname = usePathname();
    const [auth, setAuth] = React.useState<{ isAdmin: boolean, studioId: string | null }>({ isAdmin: false, studioId: null });
    const [studioLogo, setStudioLogo] = React.useState<string | null>(null);
    const [storeName, setStoreName] = React.useState<string | null>(null);

    React.useEffect(() => {
        getAuthInfo().then(async (authInfo) => {
            setAuth(authInfo);
            if (!authInfo.isAdmin && authInfo.studioId) {
                // Fetch studio info for logo
                const { fetchStudio } = await import('@/actions/studio');
                const studio = await fetchStudio(authInfo.studioId);
                if (studio) {
                    setStudioLogo(studio.logoUrl || null);
                    setStoreName(studio.storeName);
                }
            }
        });
    }, []);

    const handleLogout = async () => {
        await adminLogout();
    };

    const navItems = auth.isAdmin ? [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Studios', href: '/admin/studios', icon: Store },
        { name: 'Payments', href: '/admin/payments', icon: CreditCard },
        { name: 'Campaigns', href: '/admin/campaigns', icon: Megaphone },
        { name: 'Coupons (Activa)', href: '/admin/coupons', icon: Ticket },
    ] : [
        { name: 'My Studio', href: auth.studioId ? `/admin/studios/${auth.studioId}` : '/admin', icon: Store },
        { name: 'Customers', href: '/admin/users', icon: Users },
        { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    ];

    return (
        <aside className="w-64 bg-slate-900 border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-40">
            <div className="p-6 border-b border-white/10">
                {!auth.isAdmin && studioLogo ? (
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-black">
                            <img src={studioLogo} alt="Logo" className="object-contain w-full h-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-white truncate">{storeName}</div>
                            <div className="text-[10px] text-gray-500 tracking-widest uppercase">Store Portal</div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-xl font-bold tracking-tighter text-cyan-400 italic">
                            STUDI<span className="text-white">-GO</span>
                        </div>
                        <div className="text-[10px] text-gray-500 tracking-widest mt-1 uppercase">
                            {auth.isAdmin ? 'Platform Operator' : 'Store Portal'}
                        </div>
                    </>
                )}
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                isActive
                                    ? "bg-cyan-900/30 text-cyan-400 border border-cyan-500/30"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}>
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-4">
                {auth.studioId && (
                    <div className="px-4 py-2 bg-white/5 rounded text-[10px] text-gray-500 truncate">
                        StoreID: {auth.studioId.substring(0, 8)}...
                    </div>
                )}
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500/80 hover:text-red-400 hover:bg-red-900/10"
                    onClick={handleLogout}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                </Button>
            </div>
        </aside>
    );
}
