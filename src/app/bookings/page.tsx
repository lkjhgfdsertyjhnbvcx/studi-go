"use client";
import React, { useEffect, useState } from "react";

export default function AdminBookingList() {
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/bookings')
            .then(res => res.json())
            .then(data => setBookedSlots(data));
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">【店舗用】予約・顧客管理一覧</h2>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600 font-bold">
                        <tr>
                            <th className="p-4">利用開始</th>
                            <th className="p-4">代表者名</th>
                            <th className="p-4">メール/電話</th>
                            <th className="p-4">ステータス</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {bookings.map((b) => (
                            <tr key={b.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-mono">{new Date(b.startTime).toLocaleString()}</td>
                                <td className="p-4 font-bold">{b.user?.name}</td>
                                <td className="p-4">{b.user?.email}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{b.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}