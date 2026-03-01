"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ScheduleView } from "@/components/ScheduleView"; 
import BookingModal from "@/components/BookingModal"; 

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const storeId = searchParams.get("storeId");
  
  const [store, setStore] = useState<any>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) => {
      if (prev.includes(slot)) {
        return prev.filter((s) => s !== slot);
      } else {
        return [...prev, slot].sort();
      }
    });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-400 italic">Loading Calendar...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-40 shadow-sm flex justify-between items-center">
        <div 
          onClick={() => router.push("/")} 
          className="cursor-pointer font-black text-2xl text-purple-800 tracking-tighter"
        >
          {store?.storeName || "STUDIO"}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <ScheduleView 
            storeId={storeId as string} 
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
              予約へ進む
            </button>
          </div>
        )}
      </main>

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

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
