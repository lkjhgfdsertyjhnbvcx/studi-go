'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// 🌟 URLパラメータを読み取る中身のコンポーネント
function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">お支払い完了！</h1>
      <p className="mb-6">
        予約ID: <span className="font-mono font-bold">{bookingId || '---'}</span>
      </p>
      <p className="text-gray-600 mb-8">
        ご利用ありがとうございます。当日のご来店をお待ちしております。
      </p>
      <Link 
        href="/" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        トップページへ戻る
      </Link>
    </div>
  );
}

// 🌟 メインのページコンポーネント（Suspenseで囲む）
export default function SplitPaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Suspense fallback={<p>読み込み中...</p>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
