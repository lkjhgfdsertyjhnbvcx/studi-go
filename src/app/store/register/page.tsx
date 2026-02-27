"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function StoreRegister() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/store/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (res.ok) {
                alert("登録成功！ログインしてください。");
                router.push('/store/login');
            } else {
                alert("失敗: " + result.error);
            }
        } catch (err) {
            alert("通信エラーが発生しました");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-black mb-8 text-center italic">店舗新規登録</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        placeholder="店舗名" required
                        className="w-full p-4 bg-gray-50 rounded-2xl font-bold border-2 border-transparent focus:border-purple-800 outline-none transition-all text-black"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="email" placeholder="メールアドレス" required
                        className="w-full p-4 bg-gray-50 rounded-2xl font-bold border-2 border-transparent focus:border-purple-800 outline-none transition-all text-black"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password" placeholder="パスワード" required
                        className="w-full p-4 bg-gray-50 rounded-2xl font-bold border-2 border-transparent focus:border-purple-800 outline-none transition-all text-black"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-purple-800 text-white rounded-2xl font-black text-xl hover:bg-black transition-all"
                    >
                        {loading ? "送信中..." : "店舗を登録する"}
                    </button>
                </form>
            </div>
        </div>
    );
}