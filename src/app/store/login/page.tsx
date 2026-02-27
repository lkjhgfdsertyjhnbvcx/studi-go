"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function StoreLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch('/api/store/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // 🌟 ログイン成功：店舗IDを保存して店舗ダッシュボードへ
                localStorage.setItem("storeId", data.storeId);
                router.push('/store/dashboard');
            } else {
                setError("店舗IDまたはパスワードが正しくありません");
            }
        } catch (err) {
            setError("サーバーとの通信に失敗しました");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full p-10 bg-white rounded-[3rem] shadow-xl border border-gray-100">
                <div className="text-center mb-10">
                    <img src="/logo-new.png" alt="Studi-Go" className="h-10 mx-auto mb-4" />
                    <h1 className="text-2xl font-black text-gray-900">店舗管理ログイン</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Partner Login</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-4">Mail Address</label>
                        <input
                            type="email"
                            placeholder="example@studi-go.com"
                            required
                            className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-purple-800 transition-all text-gray-900"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-4">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-purple-800 transition-all text-gray-900"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                    <button type="submit" className="w-full py-5 bg-purple-800 text-white rounded-2xl font-black text-xl shadow-xl hover:bg-black transition-all">
                        ログイン
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400 font-bold">
                        新しく出店をご希望ですか？
                        <button onClick={() => router.push('/store/register')} className="text-purple-800 ml-2 hover:underline">新規登録はこちら</button>
                    </p>
                </div>
            </div>
        </div>
    );
}