"use client";
import React from "react";
import Link from "next/link";

export default function BookingSuccessPage() {
    return (
        <div className="max-w-md mx-auto p-6 bg-white min-h-screen text-center flex flex-col justify-center">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                    <span className="text-4xl">🎉</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">予約が確定しました！</h2>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed font-medium">
                    サウンドスタジオJOCOLLA 渋谷店 <br />
                    ご予約ありがとうございます。
                </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 text-left space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">予約日時</span>
                    <span className="font-bold text-gray-800">2026/03/01 14:00〜</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">お支払い</span>
                    <span className="font-bold text-green-600">完了（割り勘）</span>
                </div>
                <div className="flex justify-between text-sm italic">
                    <span className="text-gray-500 italic">獲得Activaポイント</span>
                    <span className="font-bold text-purple-600">+45 pt</span>
                </div>
            </div>

            <div className="space-y-4">
                <Link
                    href="/admin/bookings"
                    className="block w-full py-4 bg-purple-600 text-white rounded-md font-bold text-lg shadow-sm hover:bg-purple-700 transition-all"
                >
                    予約状況を確認する
                </Link>
                <Link
                    href="/booking"
                    className="block w-full py-4 bg-white border border-gray-200 text-gray-600 rounded-md font-bold text-sm hover:bg-gray-50 transition-all"
                >
                    カレンダーへ戻る
                </Link>
            </div>

            <p className="text-[11px] text-gray-400 mt-10">
                ※登録したメールアドレスに予約確定通知を送信しました。
            </p>
        </div>
    );
}