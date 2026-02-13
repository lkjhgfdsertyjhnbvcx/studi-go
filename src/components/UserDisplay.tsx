"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentUser, logoutAction } from '@/actions/login';
import { Button } from '@/components/ui/button';

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
            <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest text-cyan-400">
                <Link href="/bookings" className="hover:text-white transition-colors flex items-center gap-2">
                    <span className="h-1 w-1 bg-cyan-500 rounded-full animate-pulse"></span>
                    MY_BOOKINGS
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-gray-500">{user.name}</span>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-red-400 h-auto p-0 font-bold">
                        LOGOUT
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-4 text-sm font-mono tracking-widest">
            <Link href="/login" className="opacity-50 hover:opacity-100 hover:text-cyan-400">LOGIN</Link>
            <Link href="/register" className="opacity-50 hover:opacity-100 hover:text-cyan-400">REGISTER</Link>
        </div>
    );
}
