"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchStudios } from "@/actions/studio";
import { getMyStudiosAction, toggleMyStudioAction } from "@/actions/user";
import { ThemeProvider } from "@/lib/theme-context";
import { UserDisplay } from "@/components/UserDisplay";

export default function MyStudiosPage() {
  const [studios, setStudios] = useState<any[]>([]);
  const [myStudios, setMyStudios] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const allStudios = await fetchStudios();
      const myIds = await getMyStudiosAction();
      setMyStudios(myIds);
      const filtered = allStudios.filter((s: any) => myIds.includes(s.id));
      setStudios(filtered);
      setLoading(false);
    };
    load();
  }, []);

  const handleToggleFavorite = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await toggleMyStudioAction(id);
    if (res.success) {
      const updatedList = res.myStudios || [];
      setMyStudios(updatedList);
      setStudios(prev => prev.filter(s => updatedList.includes(s.id)));
    } else {
      alert("ログインが必要です");
    }
  };

  if (loading) {
    return (
      <div className="sg-loading">
        <style>{sgBaseStyles}</style>
        <div className="sg-spinner-large" />
      </div>
    );
  }

  return (
    <>
      <style>{`
        ${sgBaseStyles}

        /* ヘッダー */
        .sg-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255,255,255,0.85);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid var(--sg-border);
          transition: background 0.2s;
        }
        html[data-theme="dark"] .sg-header {
          background: rgba(28,28,30,0.85);
        }
        .sg-header-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ページ本体 */
        .sg-page {
          min-height: 100vh;
          background: var(--sg-bg);
          padding-bottom: 80px;
        }

        /* ヒーロー */
        .sg-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 24px 40px;
        }
        .sg-hero-eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--sg-accent);
          margin-bottom: 10px;
        }
        .sg-hero-title {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          letter-spacing: -1.5px;
          color: var(--sg-text-primary);
          margin-bottom: 12px;
          line-height: 1.1;
        }
        .sg-hero-sub {
          font-size: 17px;
          color: var(--sg-text-secondary);
          line-height: 1.6;
          max-width: 480px;
        }

        /* グリッド */
        .sg-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        /* スタジオカード */
        .sg-studio-card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          background: var(--sg-surface);
          border: 1px solid var(--sg-border);
          text-decoration: none;
          display: block;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s;
          cursor: pointer;
        }
        .sg-studio-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 20px 60px rgba(98,70,234,0.18), 0 4px 16px rgba(0,0,0,0.08);
          border-color: var(--sg-accent);
        }
        .sg-card-img-wrap {
          position: relative;
          height: 200px;
          background: var(--sg-bg);
          overflow: hidden;
        }
        .sg-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
          z-index: 1;
        }
        .sg-card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          background: rgba(98,70,234,0.85);
          backdrop-filter: blur(8px);
          color: white;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 4px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .sg-card-fav-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          color: #fbbf24;
        }
        .sg-card-fav-btn:hover {
          background: rgba(251,191,36,0.25);
          transform: scale(1.1);
        }
        .sg-card-body {
          padding: 18px 20px 20px;
        }
        .sg-card-name {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.4px;
          color: var(--sg-text-primary);
          margin-bottom: 6px;
        }
        .sg-card-address {
          font-size: 13px;
          color: var(--sg-text-secondary);
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 16px;
        }
        .sg-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid var(--sg-border);
        }
        .sg-card-rooms {
          font-size: 13px;
          color: var(--sg-text-secondary);
        }
        .sg-card-rooms strong {
          font-size: 20px;
          font-weight: 700;
          color: var(--sg-text-primary);
          letter-spacing: -0.5px;
        }
        .sg-card-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--sg-accent-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--sg-accent);
          transition: background 0.2s, transform 0.2s;
        }
        .sg-studio-card:hover .sg-card-arrow {
          background: var(--sg-accent);
          color: white;
          transform: translateX(2px);
        }

        /* 空状態 */
        .sg-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 24px;
          color: var(--sg-text-secondary);
        }
        .sg-empty-icon {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: var(--sg-accent-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: var(--sg-accent);
        }
        .sg-empty-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--sg-text-primary);
          margin-bottom: 8px;
        }
        .sg-empty-text {
          font-size: 14px;
          line-height: 1.6;
        }

        /* ローディング */
        .sg-loading {
          min-height: 100vh;
          background: var(--sg-bg);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sg-spinner-large {
          width: 40px; height: 40px;
          border: 3px solid var(--sg-border);
          border-top-color: var(--sg-accent);
          border-radius: 50%;
          animation: sg-spin 0.7s linear infinite;
        }
        @keyframes sg-spin { to { transform: rotate(360deg); } }

        @media (max-width: 600px) {
          .sg-grid { grid-template-columns: 1fr; }
          .sg-hero { padding: 40px 16px 28px; }
        }
      `}</style>

      <div className="sg-page">
        {/* ヘッダー */}
        <header className="sg-header">
          <div className="sg-header-inner">
            <Link href="/studios">
              <Image src="/logo-new.png" alt="Studi-Go" width={120} height={32} style={{ height: 32, width: "auto" }} priority />
            </Link>
            <UserDisplay />
          </div>
        </header>

        {/* ヒーロー */}
        <div className="sg-hero">
          <p className="sg-hero-eyebrow">マイページ</p>
          <h1 className="sg-hero-title">お気に入りスタジオ</h1>
          <p className="sg-hero-sub">登録したスタジオの一覧です。スターを外すとリストから削除されます。</p>
        </div>

        {/* グリッド */}
        <div className="sg-grid">
          {studios.length > 0 ? studios.map((studio) => (
            <Link href={`/studios/${studio.id}`} key={studio.id} className="sg-studio-card">
              <div className="sg-card-img-wrap">
                {studio.images?.length > 0 ? (
                  <Image src={studio.images[0]} alt={studio.storeName} fill style={{ objectFit: "cover" }} />
                ) : (
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #2c2c2e 0%, #1c1c1e 100%)" }} />
                )}
                <div className="sg-card-img-overlay" />
                <span className="sg-card-badge">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 0l1.2 3.6H10L7 5.8l1.2 3.6L5 7.2 1.8 9.4 3 5.8.3 3.6H3.8z"/></svg>
                  お気に入り
                </span>
                <button className="sg-card-fav-btn" onClick={(e) => handleToggleFavorite(e, studio.id)} aria-label="お気に入りを外す">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l1.8 5.4H15l-4.6 3.3 1.8 5.4L8 11.8l-4.2 3.3 1.8-5.4L1 6.4h5.2z"/></svg>
                </button>
              </div>
              <div className="sg-card-body">
                <div className="sg-card-name">{studio.storeName}</div>
                <div className="sg-card-address">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1a3.5 3.5 0 00-3.5 3.5C2.5 7.5 6 11 6 11s3.5-3.5 3.5-6.5A3.5 3.5 0 006 1zm0 4.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" fill="currentColor"/></svg>
                  {studio.address || "住所未設定"}
                </div>
                <div className="sg-card-footer">
                  <div className="sg-card-rooms">
                    <strong>{studio.rooms?.length || 0}</strong> 部屋
                  </div>
                  <div className="sg-card-arrow">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </Link>
          )) : (
            <div className="sg-empty">
              <div className="sg-empty-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 3l2.5 7.5H24l-6.5 4.7 2.5 7.5L14 18l-6 4.7 2.5-7.5L4 10.5h7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              </div>
              <div className="sg-empty-title">まだお気に入りがありません</div>
              <p className="sg-empty-text">スタジオ一覧からスターを押して<br />お気に入りに追加しましょう。</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const sgBaseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --sg-bg: #f5f5f7;
    --sg-surface: #ffffff;
    --sg-text-primary: #1d1d1f;
    --sg-text-secondary: #6e6e73;
    --sg-border: #d2d2d7;
    --sg-accent: #6246ea;
    --sg-accent-hover: #4f37c8;
    --sg-accent-soft: rgba(98,70,234,0.08);
    --sg-shadow-card: 0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
  }
  html[data-theme="dark"] {
    --sg-bg: #000000;
    --sg-surface: #1c1c1e;
    --sg-text-primary: #f5f5f7;
    --sg-text-secondary: #98989d;
    --sg-border: #38383a;
    --sg-accent: #7c5cfc;
    --sg-accent-hover: #9171fd;
    --sg-accent-soft: rgba(124,92,252,0.12);
    --sg-shadow-card: 0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
  }
  body {
    font-family: -apple-system, 'SF Pro Display', 'Noto Sans JP', BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
    background: var(--sg-bg);
    color: var(--sg-text-primary);
    -webkit-font-smoothing: antialiased;
  }
`;