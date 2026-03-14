'use client'

import { useEffect, useState } from 'react'
import BandManagement from '@/components/BandManagement'
import { checkUserSetupAction } from '@/actions/user-setup'
import Link from 'next/link'
import Image from 'next/image'

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
`

export default function MyBandsPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const check = async () => {
      const res = await checkUserSetupAction()
      if (res.success && res.userId) {
        setUserId(res.userId)
      }
      setIsLoading(false)
    }
    check()
  }, [])

  if (isLoading) {
    return (
      <>
        <style>{sgBaseStyles}</style>
        <div style={{ minHeight: '100vh', background: 'var(--sg-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="sg-spinner" />
          <style>{`.sg-spinner { width:36px;height:36px;border:3px solid var(--sg-border);border-top-color:var(--sg-accent);border-radius:50%;animation:sg-spin 0.7s linear infinite; } @keyframes sg-spin{to{transform:rotate(360deg);}}`}</style>
        </div>
      </>
    )
  }

  if (!userId) {
    return (
      <>
        <style>{sgBaseStyles}</style>
        <div style={{ minHeight: '100vh', background: 'var(--sg-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <p style={{ color: 'var(--sg-text-secondary)', fontSize: '15px' }}>ページを表示するにはログインが必要です。</p>
          <Link href="/login" style={{ color: 'var(--sg-accent)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>ログインはこちら →</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        ${sgBaseStyles}

        .sg-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255,255,255,0.85);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid var(--sg-border);
        }
        html[data-theme="dark"] .sg-header {
          background: rgba(28,28,30,0.85);
        }
        .sg-header-inner {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sg-back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: var(--sg-text-secondary);
          text-decoration: none;
          transition: color 0.15s;
        }
        .sg-back-link:hover { color: var(--sg-accent); }

        .sg-page {
          min-height: 100vh;
          background: var(--sg-bg);
          padding-bottom: 80px;
        }
        .sg-content {
          max-width: 860px;
          margin: 0 auto;
          padding: 48px 24px;
        }
        .sg-eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--sg-accent);
          margin-bottom: 10px;
        }
        .sg-page-title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          letter-spacing: -1.2px;
          color: var(--sg-text-primary);
          margin-bottom: 10px;
          line-height: 1.1;
        }
        .sg-page-sub {
          font-size: 15px;
          color: var(--sg-text-secondary);
          line-height: 1.6;
          margin-bottom: 40px;
        }
        .sg-band-content {
          background: var(--sg-surface);
          border-radius: 18px;
          border: 1px solid var(--sg-border);
          padding: 28px;
          box-shadow: var(--sg-shadow-card);
        }

        @media (max-width: 600px) {
          .sg-content { padding: 32px 16px; }
          .sg-band-content { padding: 20px 16px; border-radius: 14px; }
        }
      `}</style>

      <div className="sg-page">
        <header className="sg-header">
          <div className="sg-header-inner">
            <Link href="/studios" className="sg-back-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              スタジオ一覧へ
            </Link>
            <Link href="/studios">
              <Image src="/logo-new.png" alt="Studi-Go" width={100} height={28} style={{ height: 28, width: 'auto' }} priority />
            </Link>
          </div>
        </header>

        <div className="sg-content">
          <p className="sg-eyebrow">マイページ</p>
          <h1 className="sg-page-title">マイバンド</h1>
          <p className="sg-page-sub">バンドの作成・管理、メンバーへの招待ができます。</p>

          <div className="sg-band-content">
            <BandManagement userId={userId} />
          </div>
        </div>
      </div>
    </>
  )
}