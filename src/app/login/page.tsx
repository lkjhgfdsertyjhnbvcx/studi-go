"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "ログインに失敗しました");
                return;
            }

            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userEmail", email);
            if (data.name) localStorage.setItem("userName", data.name);
            router.push("/");
        } catch {
            setError("サーバーエラーが発生しました");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-black flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">

                {/* ロゴ */}
                <div className="flex flex-col items-center mb-8">
                    <img src="/logo-new.png" alt="Studi-Go" className="h-14 w-auto mb-4 object-contain" />
                    <h1 className="text-2xl font-black text-gray-900">おかえりなさい</h1>
                    <p className="text-gray-500 text-sm mt-1">アカウントにサインインしてください</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
                        <span className="text-red-500">⚠</span>
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-purple-500 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-purple-500 transition-colors"
                            required
                        />
                    </div>

                    <a href="/forgot-password" className="block text-right text-sm text-purple-600 hover:underline">
                        パスワードをお忘れですか？
                    </a>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold rounded-lg transition-all"
                    >
                        {loading ? "処理中..." : "サインイン"}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500 mb-2">アカウントをお持ちでない方</p>
                    <a href="/register" className="text-purple-600 hover:underline text-sm font-bold">
                        新規登録はこちら →
                    </a>
                </div>
            </div>
        </div>
    );
}
