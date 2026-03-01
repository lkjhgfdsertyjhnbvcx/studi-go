'use client';

import { useEffect, useState } from 'react';
import { checkUserSetupAction } from '@/app/actions';

export default function MyBandsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        // 🌟 型エラー回避のため as any で結果を受け取る
        const res: any = await checkUserSetupAction();
        if (res && res.success && res.userId) {
          setUserId(res.userId);
        }
      } catch (err) {
        console.error("ユーザーチェック失敗:", err);
      } finally {
        setIsLoading(false);
      }
    };
    check();
  }, []);

  if (isLoading) return <div className="p-8">読み込み中...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">マイバンド</h1>
      {userId ? (
        <p className="bg-green-100 p-4 rounded">ユーザーID: {userId} としてログイン中</p>
      ) : (
        <p className="bg-yellow-100 p-4 rounded">ログイン情報が見つかりません</p>
      )}
      <p className="mt-4 text-gray-600">バンド管理機能は現在準備中です。</p>
    </div>
  );
}
