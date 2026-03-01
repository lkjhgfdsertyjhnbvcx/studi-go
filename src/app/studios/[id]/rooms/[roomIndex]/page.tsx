"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ScheduleView } from "@/components/ScheduleView";
import BookingModal from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function RoomBookingPage() {
  const params = useParams();
  const router = useRouter();
  const [store, setStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // 🌟 エラーの原因だった変数をここで定義
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await fetch(`/api/stores/${params.id}`);
        const data = await res.json();
        if (data && !data.error) {
          setStore(data);
        } else {
          setStore({ storeName: "Demo Studio", pricePerHour: 3000 });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [params.id]);

  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) => 
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot].sort()
    );
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-400 italic">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-40 shadow-sm flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="font-black text-xl text-purple-800 tracking-tighter">
          {store?.storeName} - 予約
        </h1>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-900 italic uppercase">Select Time Slots</h2>
          <p className="text-xs text-gray-400 font-bold tracking-widest mt-1">希望の時間枠を選択してください</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          {/* 🌟 修正ポイント：定義した selectedSlots と toggleSlot を正しく渡す */}
          <ScheduleView 
            selectedSlots={selectedSlots} 
            onSlotClick={toggleSlot}
          />
        </div>

        {selectedSlots.length > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-5 bg-purple-800 text-white rounded-2xl font-black text-xl shadow-2xl shadow-purple-800/40 hover:scale-105 active:scale-95 transition-all"
            >
              {selectedSlots.length * 0.5}時間予約する
            </button>
          </div>
        )}
      </main>

      {/* 🌟 修正ポイント：最新の BookingModal 形式に対応 */}
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
