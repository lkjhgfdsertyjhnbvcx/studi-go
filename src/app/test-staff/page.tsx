"use client";
import React, { useEffect, useState } from "react";

export default function StaffManagerPage() {
    const [staffs, setStaffs] = useState<any[]>([]);
    const [storeName, setStoreName] = useState("店舗名未設定");
    const [isProcessing, setIsProcessing] = useState(false);

    // スタッフ一覧と店舗名を取得
    const fetchData = () => {
        fetch('/api/staff').then(res => res.json()).then(data => {
            if (!data.error) setStaffs(data);
        });
        fetch('/api/store').then(res => res.json()).then(data => {
            if (data && data.name) setStoreName(data.name);
        });
    };

    useEffect(() => { fetchData(); }, []);

    const handleAddStaff = async () => {
        setIsProcessing(true);
        await fetch('/api/staff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "新規スタッフ", email: "staff@example.com", phone: "000-0000-0000", role: "STAFF" })
        });
        fetchData();
        setIsProcessing(false);
    };

    const handleSaveStaff = async (staff: any) => {
        setIsProcessing(true);
        const res = await fetch('/api/staff', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(staff)
        });
        if (res.ok) alert(`✅ ${staff.name} の設定を保存しました`);
        else alert("保存に失敗しました");
        setIsProcessing(false);
    };

    const handleDeleteStaff = async (id: number, name: string) => {
        if (!confirm(`本当に「${name}」を削除しますか？`)) return;
        setIsProcessing(true);
        await fetch(`/api/staff?id=${id}`, { method: 'DELETE' });
        fetchData();
        setIsProcessing(false);
    };

    const handleChange = (id: number, field: string, value: any) => {
        setStaffs(staffs.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-8">
            <div className="max-w-5xl mx-auto">

                {/* ヘッダー */}
                <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 italic">
                            <span className="p-3 bg-purple-100 text-purple-800 rounded-xl not-italic">👔</span>
                            Staff & Support
                        </h1>
                        <p className="text-xs text-gray-500 font-bold mt-2 tracking-widest uppercase">スタッフ管理・システム問い合わせ</p>
                    </div>

                    <div className="flex gap-4">
                        {/* 🌟 Studi-Go への問い合わせボタン（メーラーが起動します） */}
                        <a
                            href={`mailto:support@studi-go.com?subject=【${storeName}からのお問い合わせ】`}
                            className="px-6 py-3 bg-white text-gray-600 border border-gray-300 rounded-xl font-bold hover:bg-gray-100 shadow-sm transition-all flex items-center gap-2"
                        >
                            ✉️ Studi-Goへ問い合わせ
                        </a>

                        <button
                            onClick={handleAddStaff}
                            disabled={isProcessing}
                            className="px-6 py-3 bg-purple-800 text-white rounded-xl font-bold hover:bg-purple-900 shadow-lg shadow-purple-800/20 transition-all active:scale-95"
                        >
                            ＋ スタッフを追加
                        </button>
                    </div>
                </div>

                {/* スタッフループ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {staffs.map(staff => (
                        <div key={staff.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md relative overflow-hidden">
                            <div className={`absolute left-0 top-0 w-2 h-full ${staff.role === 'ADMIN' ? 'bg-amber-500' : 'bg-purple-800'}`}></div>

                            <div className="mb-4">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">スタッフ名</label>
                                <input
                                    type="text"
                                    value={staff.name}
                                    onChange={(e) => handleChange(staff.id, 'name', e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 font-bold focus:border-purple-800 focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">メールアドレス</label>
                                    <input
                                        type="email"
                                        value={staff.email}
                                        onChange={(e) => handleChange(staff.id, 'email', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:border-purple-800 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">電話番号</label>
                                    <input
                                        type="text"
                                        value={staff.phone}
                                        onChange={(e) => handleChange(staff.id, 'phone', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:border-purple-800 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">システム権限</label>
                                <select
                                    value={staff.role}
                                    onChange={(e) => handleChange(staff.id, 'role', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-sm font-bold focus:outline-none cursor-pointer ${staff.role === 'ADMIN' ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-purple-50 text-purple-800 border-purple-300'}`}
                                >
                                    <option value="STAFF">一般スタッフ (利用者)</option>
                                    <option value="ADMIN">管理者 (全機能アクセス可)</option>
                                </select>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSaveStaff(staff)}
                                    disabled={isProcessing}
                                    className="flex-1 py-3 bg-purple-800 text-white rounded-xl font-bold hover:bg-purple-900 shadow-sm transition-colors text-sm"
                                >
                                    💾 保存
                                </button>
                                <button
                                    onClick={() => handleDeleteStaff(staff.id, staff.name)}
                                    className="w-20 py-3 bg-white text-red-600 border border-red-200 rounded-xl font-bold hover:bg-red-50 transition-colors text-sm"
                                >
                                    削除
                                </button>
                            </div>
                        </div>
                    ))}

                    {staffs.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-500 font-bold bg-white border border-gray-200 rounded-2xl">
                            スタッフが登録されていません。「＋ スタッフを追加」ボタンから作成してください。
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}