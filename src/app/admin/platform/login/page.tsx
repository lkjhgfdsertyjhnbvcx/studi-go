"use client";

import React, { useState } from 'react';
import { adminLogin } from '@/actions/admin-auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function PlatformAdminLoginPage() {
    const [showPw, setShowPw] = useState(false)
    const [error, setError] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        // Force a flag or check to ensure this is ONLY for platform admin
        const res = await adminLogin(formData, true); // We will update action to accept isPlatformLogin

        if (res.success) {
            router.refresh();
            router.push('/admin');
        } else {
            setError(res.message || 'ログインに失敗しました');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-mono relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md p-10 border border-border rounded-3xl bg-card/80 backdrop-blur-xl shadow-2xl relative z-10">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <span className="text-4xl">💎</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold tracking-widest text-white mb-2">Studi-Go</h1>
                    <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest">運営管理者用</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 tracking-wider ml-1 uppercase">メールアドレス</label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="admin@studio-go.com"
                            className="bg-muted/50 border-border text-foreground focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-12 rounded-xl"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground tracking-wider ml-1 uppercase">パスワード</label>
                        <div className="relative">
                            <Input
                                name="password"
                                type={showPw ? "text" : "password"}
                                placeholder="パスワードを入力"
                                className="bg-muted/50 border-border text-foreground focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-12 rounded-xl pr-12"
                                required
                            />
                            <button type="button" onClick={() => setShowPw(p => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors text-xs font-bold">
                                {showPw ? "隠す" : "表示"}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-400 text-xs text-center bg-red-950/30 border border-red-900/50 p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-indigo-900/50 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        {isLoading ? '検証中...' : 'セキュアログイン'}
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                        制限区域<br />許可された関係者のみ
                    </p>
                </div>
            </div>
        </div>
    );
}
