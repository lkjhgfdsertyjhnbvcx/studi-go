"use client";
import React, { useEffect, useState } from "react";

export default function BookingsManagerPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    // 予約データを取得
    const fetchBookings = () => {
        fetch('/api/admin-bookings').then(res => res.json()).then(data => {
            if (!data.error) setBookings(data);
        });
    };

    useEffect(() => { fetchBookings(); }, []);

    // ステータス（未入金/支払い済み/キャンセル）の変更
    const handleStatusChange = async (id: number, newStatus: string) => {
        setIsProcessing(true);
        const res = await fetch('/api/admin-bookings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus })
        });
        if (res.ok) fetchBookings();
        else alert("ステータスの更新に失敗しました");
        setIsProcessing(false);
    };

    // テストデータの削除用
    const handleDelete = async (id: number) => {
        if (!confirm("この予約データを完全に削除しますか？")) return;
        setIsProcessing(true);
        await fetch(`/api/admin-bookings?id=${id}`, { method: 'DELETE' });
        fetchBookings();
        setIsProcessing(false);
    };

    // 日付を綺麗にフォーマットする関数
    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleString('ja-JP', {
            month: 'short', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 italic">
                            <span className="p-3 bg-purple-100 text-purple-800 rounded-xl not-italic">📝</span>
                            Reservations
                        </h1>
                        <p className="text-xs text-gray-500 font-bold mt-2 tracking-widest uppercase">予約一覧・キャンセル・ステータス管理</p>
                    </div>
                    <button onClick={fetchBookings} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-100 shadow-sm transition-all flex items-center gap-2">
                        🔄 最新の情報に更新
                    </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-widest">
                                    <th className="p-4 font-bold">予約日時 / スタジオ</th>
                                    <th className="p-4 font-bold">お客様名</th>
                                    <th className="p-4 font-bold">料金</th>
                                    <th className="p-4 font-bold">ステータス (変更可能)</th>
                                    <th className="p-4 font-bold text-center">操作</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {bookings.map(booking => {
                                    const isCanceled = booking.status === 'キャンセル';
                                    return (
                                        <tr key={booking.id} className={`hover:bg-gray-50 transition-colors ${isCanceled ? 'opacity-60 bg-gray-50' : ''}`}>
                                            <td className="p-4">
                                                <p className={`font-black text-lg ${isCanceled ? 'line-through text-gray-500' : 'text-purple-800'}`}>
                                                    {formatDate(booking.startTime)} 〜
                                                </p>
                                                <p className="text-sm text-gray-600 font-bold mt-1">
                                                    🏠 {booking.studio?.name || "削除されたスタジオ"}
                                                </p>
                                            </td>
                                            <td className="p-4">
                                                <p className="font-bold text-gray-900">{booking.user?.name || "ゲスト (テストデータ)"}</p>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-lg font-black text-gray-900">
                                                    ¥{booking.totalPrice?.toLocaleString() || "---"}
                                                </p>
                                            </td>
                                            <td className="p-4">
                                                <select
                                                    value={booking.status}
                                                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                                    disabled={isProcessing}
                                                    className={`border rounded-lg px-3 py-2 text-sm font-bold focus:outline-none cursor-pointer shadow-sm
                            ${booking.status === '支払い済み' ? 'bg-green-50 text-green-700 border-green-200' :
                                                            booking.status === '未入金（当日払い）' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                                'bg-red-50 text-red-700 border-red-200'}`}
                                                >
                                                    <option value="支払い済み">支払い済み (オンライン)</option>
                                                    <option value="未入金（当日払い）">未入金 (店頭支払い待ち)</option>
                                                    <option value="キャンセル">キャンセル (予約取り消し)</option>
                                                </select>
                                            </td>
                                            <td className="p-4 text-center">
                                                <button
                                                    onClick={() => handleDelete(booking.id)}
                                                    disabled={isProcessing}
                                                    className="text-xs text-gray-400 hover:text-red-600 font-bold underline transition-colors"
                                                >
                                                    データ消去
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-10 text-center text-gray-500 font-bold">
                                            現在、予約データはありません。
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}