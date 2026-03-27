"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function StoreLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch('/api/store/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password })
            });
            const data = await res.json();
            console.log("Login response:", res.status, data);
            if (res.ok && data.success) {
                localStorage.setItem("storeId", data.storeId);
                localStorage.setItem("staffId", data.staffId || "");
                localStorage.setItem("staffRole", data.role || "staff");
                router.push('/store/dashboard');
            } else {
                setError(data.error || "店舗IDまたはパスワードが正しくありません");
            }
        } catch (err: any) {
            console.error("Login fetch error:", err);
            setError("サーバーとの通信に失敗しました: " + (err.message || ""));
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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                required
                                className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-purple-800 transition-all text-gray-900 pr-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
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
