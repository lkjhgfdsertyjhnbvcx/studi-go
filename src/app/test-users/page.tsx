"use client";
import React, { useEffect, useState } from "react";

export default function UsersManagerPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchUsers = () => {
        fetch('/api/users').then(res => res.json()).then(data => {
            if (!data.error) setUsers(data);
        });
    };

    useEffect(() => { fetchUsers(); }, []);

    // ブラックリストのON/OFFを切り替える処理
    const toggleBlacklist = async (user: any) => {
        const newStatus = !user.isBlacklisted;
        const actionName = newStatus ? "ブラックリストに追加" : "ブラックリストから解除";

        if (!confirm(`「${user.name}」さんを${actionName}しますか？\n※ブラックリストのユーザーは予約ができなくなります。`)) return;

        setIsProcessing(true);
        const res = await fetch('/api/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: user.id, isBlacklisted: newStatus })
        });

        if (res.ok) {
            alert(`✅ ${actionName}しました`);
            fetchUsers();
        } else {
            alert("設定の変更に失敗しました");
        }
        setIsProcessing(false);
    };

    // 検索機能（名前やメールアドレスで絞り込み）
    const filteredUsers = users.filter(u =>
        u.name.includes(searchQuery) || u.email.includes(searchQuery) || (u.phone && u.phone.includes(searchQuery))
    );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-gray-200 pb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 italic">
                            <span className="p-3 bg-purple-100 text-purple-800 rounded-xl not-italic">👥</span>
                            Customers
                        </h1>
                        <p className="text-xs text-gray-500 font-bold mt-2 tracking-widest uppercase">顧客リスト・利用履歴・ブラックリスト管理</p>
                    </div>

                    {/* 検索バー */}
                    <div className="w-full md:w-72 relative">
                        <span className="absolute left-4 top-3 text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder="名前・メール・電話で検索..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:border-purple-800 focus:ring-1 focus:ring-purple-800 focus:outline-none shadow-sm"
                        />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-widest">
                                    <th className="p-4 font-bold">お名前 / 連絡先</th>
                                    <th className="p-4 font-bold">登録日</th>
                                    <th className="p-4 font-bold">過去の利用総額</th>
                                    <th className="p-4 font-bold text-center">ブラックリスト設定</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredUsers.map(user => (
                                    <tr key={user.id} className={`hover:bg-gray-50 transition-colors ${user.isBlacklisted ? 'bg-red-50/50' : ''}`}>
                                        <td className="p-4">
                                            <p className="font-black text-gray-900 text-lg">{user.name}</p>
                                            <p className="text-xs text-gray-500 font-bold mt-1">{user.email}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{user.phone || "電話番号未登録"}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm font-bold text-gray-700">
                                                {new Date(user.registeredAt).toLocaleDateString('ja-JP')}
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-lg font-black text-purple-800">
                                                ¥{user.totalSpent.toLocaleString()}
                                            </p>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => toggleBlacklist(user)}
                                                disabled={isProcessing}
                                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${user.isBlacklisted
                                                        ? 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200 shadow-inner'
                                                        : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100 shadow-sm'
                                                    }`}
                                            >
                                                {user.isBlacklisted ? '🚨 ブラックリスト (解除する)' : '🚫 ブラックリストに入れる'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-10 text-center text-gray-500 font-bold">
                                            該当する顧客が見つかりません。
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