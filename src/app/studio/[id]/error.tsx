"use client";

import { useEffect } from "react";

export default function StudioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Studio page error:", error);
  }, [error]);

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="text-center max-w-md px-6">
        <p className="text-5xl mb-6">⚠️</p>
        <h2 className="text-foreground font-black text-xl mb-3">
          ページの読み込みに失敗しました
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          スタジオページの表示中にエラーが発生しました。
          <br />
          再読み込みしても解決しない場合は、お手数ですがサポートまでご連絡ください。
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-black text-white transition-all"
          >
            再読み込み
          </button>
          <a
            href="/"
            className="px-6 py-3 bg-accent/10 hover:bg-accent/20 border border-border rounded-xl text-sm font-black text-foreground transition-all"
          >
            トップに戻る
          </a>
        </div>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-6 p-4 bg-red-900/20 border border-red-800/50 rounded-xl text-left text-xs text-red-300 overflow-auto max-h-48">
            {error.message}
            {"\n"}
            {error.stack}
          </pre>
        )}
      </div>
    </div>
  );
}
