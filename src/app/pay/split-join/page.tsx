"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function SplitJoinContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [personIndex, setPersonIndex] = useState(2);

    const studioId = searchParams.get("studioId") || "";
    const studioName = searchParams.get("studioName") || "スタジオ";
    const roomId = searchParams.get("roomId") || "";
    const roomName = searchParams.get("roomName") || "部屋";
    const date = searchParams.get("date") || "";
    const startTime = searchParams.get("startTime") || "";
    const durationHours = parseInt(searchParams.get("durationHours") || "1");
    const totalPrice = parseInt(searchParams.get("total") || "0");
    const memberCount = parseInt(searchParams.get("memberCount") || "2");
    const splitBookingId = searchParams.get("splitBookingId") || "";
    const optionNames = (searchParams.get("options") || "").split(",").filter(Boolean);
    const optionPrices = (searchParams.get("optionPrices") || "").split(",").map(Number).filter(n => n > 0);
    const totalOptionPrice = optionPrices.reduce((a, b) => a + b, 0);

    // 自分の支払い額（均等割）
    const baseAmount = Math.floor(totalPrice / memberCount);
    const remainder = totalPrice - baseAmount * memberCount;
    // 1人目が端数分を既に払っているので2人目以降はbaseAmountのみ
    const myAmount = baseAmount;

    const endTime = (() => {
        if (!startTime) return "";
        const [h, m] = startTime.split(":").map(Number);
        return String(h + durationHours).padStart(2, "0") + ":" + String(m).padStart(2, "0");
    })();

    useEffect(() => {
        const uid = localStorage.getItem("userId") || "";
        const email = localStorage.getItem("userEmail") || "";
        const name = localStorage.getItem("userName") || "";
        if (uid && uid !== "guest") {
            setIsLoggedIn(true);
            setUserId(uid);
            setUserEmail(email);
        }
    }, []);

    const handlePay = async () => {
        if (!isLoggedIn) {
            // ログインページへ（戻りURL付き）
            router.push(`/login?redirect=${encodeURIComponent(window.location.href)}`);
            return;
        }
        setIsProcessing(true);
        setError("");
        try {
            const res = await fetch("/api/stripe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studioId, studioName, roomId, roomName, date, startTime, durationHours,
                    totalPrice: myAmount,
                    userId,
                    userEmail,
                    skipBooking: true,
                    existingBookingId: splitBookingId,
                    splitPerson: personIndex,
                }),
            });
            const data = await res.json();
            if (data.requireLogin) {
                router.push(`/login?redirect=${encodeURIComponent(window.location.href)}`);
                return;
            }
            if (data.sessionUrl) {
                window.location.href = data.sessionUrl;
            } else {
                setError(data.error || "決済セッションの作成に失敗しました。");
                setIsProcessing(false);
            }
        } catch (e) {
            setError("通信エラーが発生しました。");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <p className="text-purple-400 text-xs font-black uppercase tracking-[0.3em] mb-2">割り勘 参加</p>
                    <h1 className="text-2xl font-black text-foreground">あなたの支払い</h1>
                </div>

                {/* 予約詳細 */}
                <div className="bg-card border border-border rounded-3xl p-6 mb-6 space-y-3">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">予約詳細</p>
                    {[
                        { label: "スタジオ", value: studioName },
                        { label: "部屋", value: roomName },
                        { label: "日付", value: date },
                        { label: "時間", value: `${startTime}〜${endTime} (${durationHours}時間)` },
                        { label: "合計人数", value: `${memberCount}人` },
                        { label: "元の合計金額", value: `¥${totalPrice.toLocaleString()}` },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between text-sm border-b border-border pb-2">
                            <span className="text-muted-foreground font-bold">{item.label}</span>
                            <span className="text-foreground font-black">{item.value}</span>
                        </div>
                    ))}
                    <div className="flex justify-between items-baseline pt-2">
                        <span className="text-muted-foreground font-bold text-sm">あなたの負担額</span>
                        <span className="text-3xl font-black text-purple-400">¥{myAmount.toLocaleString()}</span>
                    </div>
                </div>

                {!isLoggedIn && (
                    <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-2xl p-4 mb-4">
                        <p className="text-yellow-400 text-sm font-black text-center">⚠️ 決済にはログインが必要です</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/30 border border-red-700 rounded-xl p-3 mb-4 text-red-400 text-xs font-bold text-center">{error}</div>
                )}

                <button
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full py-5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-2xl font-black text-lg text-white transition-all"
                >
                    {isProcessing ? "処理中..." : isLoggedIn ? `決済する → ¥${myAmount.toLocaleString()}` : "ログインして決済する →"}
                </button>

                <p className="text-center text-gray-600 text-xs font-bold mt-4">安全な決済画面に移動します</p>
            </div>
        </div>
    );
}

export default function SplitJoinPage() {
    return <Suspense fallback={null}><SplitJoinContent /></Suspense>;
}
