"use client";
import React from "react";

interface ScheduleViewProps {
  selectedSlots: string[];
  onSlotClick: (slot: string) => void;
  // 🌟 他のページから送られてくる古いデータも受け流すように設定
  [key: string]: any; 
}

export const ScheduleView = ({ 
  selectedSlots = [], 
  onSlotClick,
}: ScheduleViewProps) => {
  const times = [];
  for (let i = 8; i < 22; i++) {
    times.push(`${i}:00`);
    times.push(`${i}:30`);
  }

  return (
    <div className="p-6 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {times.map((time) => {
          const isSelected = selectedSlots.includes(time);
          return (
            <button
              key={time}
              type="button"
              onClick={() => onSlotClick && onSlotClick(time)}
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
