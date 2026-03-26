"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function BandRegisterPage() {
    const [bandName, setBandName] = useState("");
    const [leaderName, setLeaderName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [bands, setBands] = useState<{ bandName: string; leaderName: string }[]>([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("userId");
        if (stored) setUserId(stored);
        const storedBands = localStorage.getItem("bands");
        if (storedBands) setBands(JSON.parse(storedBands));
    }, []);

    const handleSubmit = async () => {
        if (!bandName || !leaderName) {
            setError("バンド名と代表者名を入力してください。");
            return;
        }
        if (!userId) {
            setError("ユーザーIDが見つかりません。再ログインしてください。");
            return;
        }
        setIsSubmitting(true);
        setError("");
        try {
            const res = await fetch("/api/bands", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, bandName, leaderName }),
            });
            const data = await res.json();
            if (data.success) {
                const newBands = [...bands, data.band];
                setBands(newBands);
                localStorage.setItem("bands", JSON.stringify(newBands));
                setBandName("");
                setLeaderName("");
            } else {
                setError(data.error || "登録に失敗しました。");
            }
        } catch (e) {
            setError("通信エラーが発生しました。");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 p-6" style={{fontFamily:"'DM Sans', sans-serif"}}>
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <p className="text-purple-400 text-xs font-black uppercase tracking-[0.3em] mb-2">MY PAGE</p>
                    <h1 className="text-2xl font-black text-gray-900">バンド登録</h1>
                    <p className="text-gray-500 text-xs mt-2">バンド名の被りを防ぐため代表者名も登録します</p>
                </div>

                {bands.length > 0 && (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-6">
                        <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-3">登録済みバンド</p>
                        <div className="space-y-2">
                            {bands.map((band, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                                    <div>
                                        <p className="text-white font-black text-sm">{band.bandName}</p>
                                        <p className="text-gray-500 text-xs">代表: {band.leaderName}</p>
                                    </div>
                                    <span className="text-purple-400 text-xs font-bold">登録済み</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">バンド名</label>
                        <input
                            type="text"
                            value={bandName}
                            onChange={(e) => setBandName(e.target.value)}
                            placeholder="例: The Rockers"
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">代表者名</label>
                        <input
                            type="text"
                            value={leaderName}
                            onChange={(e) => setLeaderName(e.target.value)}
                            placeholder="例: 山田 太郎"
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
                        />
                    </div>

                    {error && <p className="text-red-400 text-xs font-bold">{error}</p>}

                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-2xl font-black text-white transition-all"
                    >
                        {isSubmitting ? "登録中..." : "バンドを登録する"}
                    </button>
                </div>

                <div className="text-center mt-6 space-y-3">
                    <Link href="/mypage" className="block text-gray-500 text-xs font-bold hover:text-white transition-all">
                        マイページへ戻る
                    </Link>
                </div>
            </div>
        </div>
    );
} 