"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // 🌟 ログイン成功：ダッシュボードへ飛ばす
                router.push('/admin/dashboard');
            } else {
                setError("IDまたはパスワードが正しくありません");
            }
        } catch (err) {
            setError("接続エラーが発生しました。サーバーを確認してください。");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full p-10 bg-white rounded-[3rem] shadow-2xl">
                <h1 className="text-3xl font-black italic tracking-tighter text-center mb-2">Studi-Go</h1>
                <p className="text-[10px] font-black text-gray-400 text-center uppercase tracking-[0.3em] mb-10">Admin Portal</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Admin Email"
                        required
                        className="w-full p-4 bg-gray-100 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-purple-800 transition-all text-gray-900"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full p-4 bg-gray-100 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-purple-800 transition-all text-gray-900"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                    <button type="submit" className="w-full py-5 bg-purple-800 text-white rounded-2xl font-black text-xl shadow-xl hover:bg-black transition-all">
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
}