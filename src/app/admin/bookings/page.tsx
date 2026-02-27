"use client";
import React, { useEffect, useState } from "react";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);

    // さっきの真っ黒な画面 (API) からデータを取ってくる
    useEffect(() => {
        fetch('/api/bookings')
            .then(res => res.json())
            .then(data => setBookings(data));
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">予約・決済状況 一覧</h1>
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 border-b">利用日時</th>
                            <th className="p-4 border-b">代表者</th>
                            <th className="p-4 border-b">ステータス</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b.id} className="hover:bg-gray-50">
                                <td className="p-4 border-b">{new Date(b.startTime).toLocaleString('ja-JP')}</td>
                                <td className="p-4 border-b font-bold">{b.user?.name}</td>
                                <td className="p-4 border-b">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${b.status === "支払い完了" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        }`}>
                                        {b.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}