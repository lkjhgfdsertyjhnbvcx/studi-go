"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // 編集用ステート
    const [editName, setEditName] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editAddress, setEditAddress] = useState("");

    useEffect(() => {
        fetch('/api/my-bookings').then(res => res.json()).then(data => {
            if (!data.error) {
                setUser(data.user);
                setBookings(data.bookings);
                setEditName(data.user.name);
                setEditPhone(data.user.phone || "");
                setEditEmail(data.user.email || "");
                setEditAddress(data.user.address || "");
            }
            setLoading(false);
        });
    }, []);

    const handleUpdate = async () => {
        const res = await fetch('/api/users/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: editName,
                phone: editPhone,
                email: editEmail,
                address: editAddress
            })
        });
        if (res.ok) {
            setUser({ ...user, name: editName, phone: editPhone, email: editEmail, address: editAddress });
            setIsEditing(false);
            alert("プロフィールを更新しました！");
        }
    };

    if (loading) return <div className="p-20 text-center font-black animate-pulse text-purple-800">LOADING...</div>;

    return (
        <div className="min-h-screen bg-[#F8F9FD] p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-black italic tracking-tighter text-gray-900">MY PAGE</h1>
                    <button onClick={() => router.push('/booking')} className="px-6 py-2 bg-white border border-gray-200 rounded-full font-bold text-sm shadow-sm hover:bg-gray-50 transition-all">予約に戻る</button>
                </div>

                {/* 🌟 プロフィールカード */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 mb-10 relative overflow-hidden">
                    <div className="relative z-10">
                        {isEditing ? (
                            <div className="space-y-4 max-w-lg">
                                <div className="grid grid-cols-2 gap-4">
                                    <input value={editName} onChange={(e) => setEditName(e.target.value)} className="p-4 bg-gray-50 border-none rounded-2xl font-bold outline-none" placeholder="名前" />
                                    <input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="p-4 bg-gray-50 border-none rounded-2xl font-bold outline-none" placeholder="電話番号" />
                                </div>
                                <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold outline-none" placeholder="メールアドレス" />
                                <input value={editAddress} onChange={(e) => setEditAddress(e.target.value)} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold outline-none" placeholder="住所" />
                                <div className="flex gap-2">
                                    <button onClick={handleUpdate} className="flex-1 py-3 bg-purple-800 text-white rounded-xl font-black shadow-lg">保存</button>
                                    <button onClick={() => setIsEditing(false)} className="flex-1 py-3 bg-gray-100 text-gray-400 rounded-xl font-black">キャンセル</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-start">
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Active Member</p>
                                        <h2 className="text-3xl font-black text-gray-900">{user.name} 様</h2>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-300 uppercase">Email</p>
                                            <p className="text-sm font-black text-gray-900">{user.email || "未登録"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-300 uppercase">Phone</p>
                                            <p className="text-sm font-black text-gray-900">{user.phone || "未登録"}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-[10px] font-black text-gray-300 uppercase">Address</p>
                                            <p className="text-sm font-black text-gray-900">{user.address || "未登録"}</p>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsEditing(true)} className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 text-xl">📝</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 🌟 予約履歴 */}
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-purple-800 rounded-full"></span>
                    予約履歴
                </h3>
                <div className="space-y-4">
                    {bookings.map(b => (
                        <div key={b.id} className="bg-white border border-gray-100 rounded-[1.5rem] p-6 flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-6">
                                <div className="text-center bg-gray-50 px-4 py-2 rounded-xl min-w-[60px]">
                                    <p className="text-[10px] font-black text-gray-400 uppercase">{new Date(b.startTime).toLocaleDateString('ja-JP', { weekday: 'short' })}</p>
                                    <p className="text-lg font-black text-gray-900">{new Date(b.startTime).getDate()}</p>
                                </div>
                                <div>
                                    <p className="font-black text-gray-900">{new Date(b.startTime).getHours()}:00 〜 {new Date(b.endTime).getHours()}:00</p>
                                    <p className="text-xs font-bold text-gray-400">{b.studio?.name}</p>
                                </div>
                            </div>
                            <p className="text-lg font-black text-purple-800">¥{b.totalPrice.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}