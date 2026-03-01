"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ScheduleView from "@/components/ScheduleView"; // カレンダー本体
import BookingModal from "@/components/BookingModal"; // 先ほど修正したモーダル

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const storeId = searchParams.get("storeId");
  
  const [store, setStore] = useState<any>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. 店舗データの取得
  useEffect(() => {
    if (!storeId) {
      router.push("/");
      return;
    }

    fetch(`/api/stores/${storeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setStore(data);
        } else {
          // ダミーデータでのフォールバック
          setStore({
            id: storeId,
            storeName: "Demo Studio",
            pricePerHour: 3000,
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [storeId, router]);

  // 2. 複数時間選択のロジック
  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) => {
      if (prev.includes(slot)) {
        // すでに選ばれていたら解除
        return prev.filter((s) => s !== slot);
      } else {
        // 新しく追加（バラバラに選んでもOKな仕様にしています）
        return [...prev, slot].sort();
      }
    });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-400 italic">Loading Calendar...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ヘッダー：ロゴ固定をやめ、店名を表示 */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-40 shadow-sm flex justify-between items-center">
        <div 
          onClick={() => router.push("/")} 
          className="cursor-pointer font-black text-2xl text-purple-800 tracking-tighter"
        >
          {store?.storeName || "STUDIO"}
        </div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Booking System
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="mb-8 border-l-8 border-purple-800 pl-5">
          <h2 className="text-3xl font-black text-gray-900 italic">Select Your Time</h2>
          <p className="text-xs text-gray-400 font-bold tracking-widest mt-1 uppercase">
            30分単位で複数の時間枠を選択可能です
          </p>
        </div>

        {/* カレンダーコンポーネント */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <ScheduleView 
            storeId={storeId as string} 
            selectedSlots={selectedSlots}
            onSlotClick={toggleSlot}
          />
        </div>

        {/* 予約ボタン（1つ以上選んだら出現） */}
        {selectedSlots.length > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-5 bg-purple-800 text-white rounded-2xl font-black text-xl shadow-2xl shadow-purple-800/40 hover:scale-105 active:scale-95 transition-all"
            >
              {selectedSlots.length * 0.5}時間の予約へ進む
            </button>
          </div>
        )}
      </main>

      {/* 予約確認モーダル */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedSlots={selectedSlots}
        studioName={store?.storeName || "Studio"}
        pricePerHour={store?.pricePerHour || 3000}
      />
    </div>
  );
}
