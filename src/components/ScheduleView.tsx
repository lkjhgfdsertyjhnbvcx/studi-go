"use client";

import React from "react";

interface ScheduleViewProps {
  storeId?: string; // 🌟 storeId を受け取れるように追加
  selectedSlots: string[];
  onSlotClick: (slot: string) => void;
}

export const ScheduleView = ({ 
  storeId, 
  selectedSlots, 
  onSlotClick 
}: ScheduleViewProps) => {
  // 8時から22時までの30分刻みの枠を作成
  const times = [];
  for (let i = 8; i < 22; i++) {
    times.push(`${i}:00`);
    times.push(`${i}:30`);
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {times.map((time) => {
          const isSelected = selectedSlots.includes(time);
          return (
            <button
              key={time}
              onClick={() => onSlotClick(time)}
              className={`py-4 rounded-2xl font-bold transition-all border-2 ${
                isSelected
                  ? "bg-purple-800 border-purple-800 text-white shadow-lg scale-95"
                  : "bg-white border-gray-100 text-gray-600 hover:border-purple-200"
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
};
