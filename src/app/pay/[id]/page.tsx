"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PayContent() {
    const searchParams = useSearchParams();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");

    const studioId = searchParams.get("studioId") || "";
    const studioName = searchParams.get("studioName") || "スタジオ";
    const roomId = searchParams.get("roomId") || "";
    const roomName = searchParams.get("roomName") || "部屋";
    const date = searchParams.get("date") || "";
    const startTime = searchParams.get("startTime") || "";
    const durationHours = parseInt(searchParams.get("durationHours") || "1");
    const totalPrice = parseInt(searchParams.get("total") || "0");
    const endTime = (() => {
        if (!startTime) return "";
        const [h, m] = startTime.split(":").map(Number);
        const endH = h + durationHours;
        return `${String(endH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    })();

    const handlePay = async () => {
        setIsProcessing(true);
        setError("");
        try {
            const res = await fetch("/api/stripe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studioId, studioName, roomId, roomName,
                    date, startTime, durationHours, totalPrice,
                    userId: "guest",
                }),
            });
            const data = await res.json();
            if (data.sessionUrl) {
                window.location.href = data.sessionUrl;
            } else {
                setError("決済セッションの作成に失敗しました。");
                setIsProcessing(false);
            }
        } catch (e) {
            setError("通信エラーが発生しました。");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <p className="text-purple-400 text-xs font-black uppercase tracking-[0.3em] mb-2">お支払い</p>
                    <h1 className="text-2xl font-black text-white">予約内容の確認</h1>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 mb-6 space-y-3">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">予約詳細</p>
                    {[
                        { label: "スタジオ", value: studioName },
                        { label: "部屋", value: roomName },
                        { label: "日付", value: date },
                        { label: "時間", value: `${startTime}〜${endTime} (${durationHours}時間)` },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between text-sm border-b border-gray-800 pb-2">
                            <span className="text-gray-500 font-bold">{item.label}</span>
                            <span className="text-white font-black">{item.value}</span>
                        </div>
                    ))}
                    <div className="flex justify-between items-baseline pt-2">
                        <span className="text-gray-500 font-bold text-sm">合計</span>
                        <span className="text-3xl font-black text-purple-400">¥{totalPrice.toLocaleString()}</span>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-900/30 border border-red-700 rounded-xl p-3 mb-4 text-red-400 text-xs font-bold text-center">
                        {error}
                    </div>
                )}

                <button onClick={handlePay} disabled={isProcessing}
                    className="w-full py-5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-2xl font-black text-lg text-white transition-all shadow-xl shadow-purple-900/30">
                    {isProcessing ? "処理中..." : "Stripeで決済する →"}
                </button>
                <p className="text-center text-gray-600 text-xs font-bold mt-4">
                    Stripeの安全な決済画面に移動します
                </p>
                <div className="text-center mt-4">
                    <a href={`/studio/${studioId}`} className="text-gray-500 text-xs font-bold hover:text-white transition-all">
                        ← 予約に戻る
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function PayPage() {
    return <Suspense fallback={null}><PayContent /></Suspense>;
}
