"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentUser, logoutAction } from '@/actions/login';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { Users } from 'lucide-react';

export const UserDisplay = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const check = async () => {
            const u = await getCurrentUser();
            setUser(u);
        };
        check();
    }, []);

    const handleLogout = async () => {
        await logoutAction();
        setUser(null);
        window.location.reload();
    };

    if (user) {
        return (
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-6 text-sm font-sans tracking-widest text-cyan-400 font-bold">
                    <Link href="/bookings" className="hover:text-white transition-colors flex items-center gap-2">
                        <span className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
                        予約一覧
                    </Link>
                    <Link href="/my-bands" className="hover:text-white transition-colors flex items-center gap-2 text-purple-400 font-black italic">
                        <Users size={16} className="text-purple-500" />
                        MY BANDS & PROFILE
                    </Link>
                    <div className="flex items-center gap-4 text-base">
                        <span className="text-gray-300">{user.name}</span>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-red-400 h-auto p-0 font-bold text-sm">
                            ログアウト
                        </Button>
                    </div>
                </div>
                <ThemeToggle />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-6">
            <div className="flex gap-4 text-sm font-mono tracking-widest">
                <Link href="/login" className="opacity-50 hover:opacity-100 hover:text-cyan-400">ログイン</Link>
                <Link href="/register" className="opacity-50 hover:opacity-100 hover:text-cyan-400">新規登録</Link>
            </div>
            <ThemeToggle />
        </div>
    );
}
