"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentLinkContent() {
    const searchParams = useSearchParams();
    const link = searchParams.get("link");
    const fullUrl = typeof window !== "undefined" ? window.location.origin + link : "";

    return (
        <div className="max-w-md mx-auto p-6 bg-white min-h-screen flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">✓</div>
            <h1 className="text-2xl font-black mb-2 text-center">仮予約を受け付けました！</h1>
            <p className="text-gray-500 text-center text-sm mb-8">メンバーにリンクを共有して支払いを完了させてください。</p>

            <div className="w-full bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-2">決済用リンク</p>
                <div className="flex gap-2">
                    <input readOnly value={fullUrl} className="flex-1 bg-white border rounded-xl px-4 py-3 text-xs font-mono" />
                    <button onClick={() => { navigator.clipboard.writeText(fullUrl); alert("コピーしました！"); }} className="bg-purple-600 text-white px-4 rounded-xl font-bold text-xs">コピー</button>
                </div>
            </div>
            <a href={link || "#"} className="mt-8 text-purple-600 font-black border-b-2 border-purple-600">自分で支払い画面を確認する →</a>
        </div>
    );
}

export default function PaymentLinkPage() {
    return <Suspense fallback={<div>Loading...</div>}><PaymentLinkContent /></Suspense>;
}