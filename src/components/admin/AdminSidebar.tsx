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
    Users,
    Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import { ThemeToggle } from '@/components/ThemeToggle';

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
        { name: 'ダッシュボード', href: '/admin', icon: LayoutDashboard },
        { name: 'ユーザー管理', href: '/admin/users', icon: Users },
        { name: 'スタジオ管理', href: '/admin/studios', icon: Store },
        { name: '決済管理', href: '/admin/payments', icon: CreditCard },
        { name: 'キャンペーン管理', href: '/admin/campaigns', icon: Megaphone },
        { name: 'クーポン (Activa)', href: '/admin/coupons', icon: Ticket },
        { name: '売上分析', href: '/admin/analytics', icon: BarChart3 },
    ] : [
        { name: '店舗情報', href: auth.studioId ? `/admin/studios/${auth.studioId}` : '/admin', icon: Store },
        { name: '顧客管理', href: '/admin/users', icon: Users },
        { name: '決済管理', href: '/admin/payments', icon: CreditCard },
        { name: '売上集計', href: '/admin/analytics', icon: BarChart3 },
        { name: '問い合わせ', href: '/admin/inquiry', icon: Mail },
    ];

    return (
        <aside className="w-64 bg-card border-r border-border flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-40">
            <div className="p-6 border-b border-border">
                {!auth.isAdmin && studioLogo ? (
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border bg-background">
                            <img src={studioLogo} alt="Logo" className="object-contain w-full h-full dark:invert" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-foreground truncate">{storeName}</div>
                            <div className="text-[10px] text-muted-foreground tracking-widest uppercase">店舗ポータル</div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1">
                        <img src="/login_logo.png" alt="STUDI-GO" className="h-8 w-fit object-contain" />
                        <div className="text-[10px] text-muted-foreground tracking-widest mt-1 uppercase">
                            {auth.isAdmin ? 'プラットフォーム管理者' : '店舗ポータル'}
                        </div>
                    </div>
                )}
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all outline-none",
                                isActive
                                    ? "bg-purple-500/10 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-500/20 dark:border-purple-500/30 shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/10 dark:hover:bg-accent/5"
                            )}>
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border space-y-4">
                <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] text-muted-foreground uppercase font-mono">テーマ</span>
                    <ThemeToggle />
                </div>

                {auth.studioId && (
                    <div className="px-4 py-2 bg-accent/5 rounded text-[10px] text-muted-foreground truncate">
                        StoreID: {auth.studioId.substring(0, 8)}...
                    </div>
                )}
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500/80 hover:text-red-400 hover:bg-red-950/10"
                    onClick={handleLogout}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    ログアウト
                </Button>
            </div>
        </aside>
    );
}
