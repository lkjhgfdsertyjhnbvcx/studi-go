"use client";
import UserListClient from '@/components/admin/UserListClient';
import React, { useEffect, useState } from "react";

export default function StoreAdminPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        id: 1, name: "", description: "", invoiceNumber: "",
        prefecture: "東京都", address: "",
        businessHours: "", holidays: "", parkingInfo: "",
        studentDiscount: 500 // 🌟 学割額
    });

    useEffect(() => {
        fetch('/api/store').then(res => res.json()).then(data => {
            if (!data.error) setFormData({ ...data });
        });
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === "studentDiscount" ? parseInt(value) : value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const res = await fetch('/api/store', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
        if (res.ok) alert("✅ 店舗情報を更新しました！");
        setIsSaving(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black italic text-gray-900">Store Setup</h1>
                    <button onClick={handleSave} className="px-8 py-3 bg-purple-800 text-white rounded-xl font-bold shadow-lg hover:bg-purple-900">
                        {isSaving ? "保存中..." : "💾 設定を保存"}
                    </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">店舗名</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold focus:border-purple-800 focus:outline-none" />
                    </div>

                    {/* 🌟 学割額の設定入力欄 */}
                    <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                        <label className="block text-xs font-bold text-purple-800 uppercase mb-2">学割の割引額 (¥)</label>
                        <input type="number" name="studentDiscount" value={formData.studentDiscount} onChange={handleChange} className="w-full bg-white border border-purple-200 rounded-xl px-4 py-3 text-xl font-black text-purple-800 focus:border-purple-800 focus:outline-none" />
                        <p className="text-[10px] text-purple-400 font-bold mt-2">※お客様が「学割」を選択した際に差し引かれる金額です。</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">都道府県</label>
                            <input type="text" name="prefecture" value={formData.prefecture} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">住所</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}