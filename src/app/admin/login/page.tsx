"use client";

import React, { useState } from 'react';
import { adminLogin } from '@/actions/admin-auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLoginPage() {
    const [error, setError] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const res = await adminLogin(formData);

        if (res.success) {
            router.push('/admin');
        } else {
            setError(res.message || 'Login failed');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
            <div className="w-full max-w-md p-8 border border-white/10 rounded-xl bg-slate-900/50 backdrop-blur-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-widest text-emerald-400 mb-2">STUDIO LOGIN</h1>
                    <p className="text-xs text-gray-500">店舗スタッフ・オーナー様専用</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">OPERATOR ID</label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="admin@antigravity.com"
                            className="bg-black/50 border-white/10 text-white focus:border-cyan-500"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">ACCESS KEY</label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="•••••"
                            className="bg-black/50 border-white/10 text-white focus:border-cyan-500"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-xs text-center border border-red-900/50 bg-red-900/20 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold tracking-widest"
                    >
                        {isLoading ? 'AUTHENTICATING...' : 'INITIALIZE SESSION'}
                    </Button>
                </form>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-sm text-gray-400">
                        店舗をお持ちですか？ <Link href="/admin/register-store" className="text-cyan-400 hover:text-cyan-300 underline">新規店舗登録</Link>
                    </p>
                    <div className="text-xs text-gray-600">
                        SECURE CONNECTION // V1.0.4
                    </div>
                </div>
            </div>
        </div>
    );
}
