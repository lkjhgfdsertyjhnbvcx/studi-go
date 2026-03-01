'use client';

import { useEffect, useState } from 'react';

export default function BookingsPage() {
  // 🌟 <any[]> を追加することで、型エラーを解消します
  const [bookedSlots, setBookedSlots] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBookedSlots(data);
        }
      })
      .catch(err => console.error("予約取得エラー:", err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">予約状況一覧</h1>
      <div className="grid gap-4">
        {bookedSlots.length === 0 ? (
          <p>現在、予約はありません。</p>
        ) : (
          bookedSlots.map((booking: any) => (
            <div key={booking.id} className="border p-4 rounded shadow">
              <p className="font-semibold">予約ID: {booking.id}</p>
              <p>開始: {new Date(booking.startTime).toLocaleString('ja-JP')}</p>
              <p>終了: {new Date(booking.endTime).toLocaleString('ja-JP')}</p>
              <p className="text-blue-600">状態: {booking.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
