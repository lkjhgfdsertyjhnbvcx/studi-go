"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ReceiptContent() {
    const searchParams = useSearchParams();
    const [recipientName, setRecipientName] = useState("");
    const [showReceipt, setShowReceipt] = useState(false);
    const studioName = searchParams.get("studioName") || "";
    const roomName = searchParams.get("roomName") || "";
    const date = searchParams.get("date") || "";
    const startTime = searchParams.get("startTime") || "";
    const totalPrice = parseInt(searchParams.get("total") || "0");
    const bookingId = searchParams.get("bookingId") || "";
    const options = searchParams.get("options") || "";
    const issuedDate = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto">
                {!showReceipt ? (
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h1 className="text-xl font-black text-gray-800 mb-6 text-center">領収証の発行</h1>
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700 mb-2">宛名</label>
                            <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="例: 山田 太郎 様" className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:border-purple-500" />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-gray-500">スタジオ</span><span className="font-bold text-gray-800">{studioName}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-gray-500">部屋</span><span className="font-bold text-gray-800">{roomName}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-gray-500">日時</span><span className="font-bold text-gray-800">{date} {startTime}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-gray-500">合計</span><span className="font-black text-purple-600">{"¥"+totalPrice.toLocaleString()}</span></div>
                        </div>
                        <button onClick={() => setShowReceipt(true)} disabled={!recipientName} className={"w-full py-4 rounded-xl font-black text-white transition-all " + (recipientName ? "bg-purple-600 hover:bg-purple-500" : "bg-gray-300 cursor-not-allowed")}>領収証を表示する</button>
                    </div>
                ) : (
                    <div>
                        <div id="receipt" className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="text-center mb-8"><h1 className="text-3xl font-black text-gray-900 tracking-widest">領　収　証</h1></div>
                            <div className="mb-6"><p className="text-lg font-black text-gray-900 border-b-2 border-gray-900 pb-2">{recipientName} 様</p></div>
                            <p className="text-sm text-gray-600 mb-8">下記の通り領収いたしました。</p>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6 text-center">
                                <p className="text-sm text-gray-500 mb-1">金額</p>
                                <p className="text-4xl font-black text-gray-900">{"¥"+totalPrice.toLocaleString()}</p>
                                <p className="text-xs text-gray-500 mt-1">（税込）</p>
                            </div>
                            <div className="space-y-2 mb-8 border border-gray-200 rounded-xl p-4">
                                <p className="text-xs font-black text-gray-500 mb-3">内訳</p>
                                <div className="flex justify-between text-sm"><span className="text-gray-600">スタジオ利用料</span><span className="font-bold text-gray-800">{studioName}　{roomName}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-gray-600">利用日時</span><span className="font-bold text-gray-800">{date} {startTime}</span></div>
                                {options && <div className="flex justify-between text-sm"><span className="text-gray-600">オプション</span><span className="font-bold text-gray-800">{options}</span></div>}
                                {bookingId && <div className="flex justify-between text-sm"><span className="text-gray-600">予約番号</span><span className="font-bold text-gray-800 text-xs">{bookingId}</span></div>}
                            </div>
                            <div className="border-t border-gray-200 pt-6 text-right space-y-1">
                                <p className="text-sm font-black text-gray-900">株式会社JOCOLLA</p>
                                <p className="text-xs text-gray-500">Studi-Go事業</p>
                                <p className="text-xs text-gray-500">東京都渋谷区東3-14-22-401</p>
                                <p className="text-xs text-gray-500">登録番号：T6011001142329</p>
                                <p className="text-xs text-gray-500 mt-2">{"発行日："+issuedDate}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-3">
                            <button onClick={() => window.print()} className="flex-1 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-black text-white transition-all">PDFで保存 / 印刷</button>
                            <button onClick={() => setShowReceipt(false)} className="py-4 px-6 bg-gray-200 hover:bg-gray-300 rounded-xl font-black text-gray-700 transition-all">戻る</button>
                        </div>
                        <style>{"@media print { body * { visibility: hidden; } #receipt, #receipt * { visibility: visible; } #receipt { position: fixed; top: 0; left: 0; width: 100%; padding: 40px; } }"}</style>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ReceiptPage() {
    return <Suspense fallback={null}><ReceiptContent /></Suspense>;
}
