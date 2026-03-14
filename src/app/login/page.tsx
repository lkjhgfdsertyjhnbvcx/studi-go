"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError('メールアドレスまたはパスワードが正しくありません');
        return;
      }
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', data.name);
      localStorage.setItem('userEmail', email);
      router.push('/');
    } catch (err: any) {
      setError('メールアドレスまたはパスワードが正しくありません');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ライトモード（デフォルト） */
        :root {
          --sg-bg: #f5f5f7;
          --sg-surface: #ffffff;
          --sg-text-primary: #1d1d1f;
          --sg-text-secondary: #6e6e73;
          --sg-border: #d2d2d7;
          --sg-accent: #6246ea;
          --sg-accent-hover: #4f37c8;
          --sg-accent-soft: rgba(98, 70, 234, 0.08);
          --sg-error: #ff3b30;
          --sg-shadow-card: 0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
        }

        /* ダークモード：OSではなく data-theme="dark" のみで制御 */
        html[data-theme="dark"] {
          --sg-bg: #000000;
          --sg-surface: #1c1c1e;
          --sg-text-primary: #f5f5f7;
          --sg-text-secondary: #98989d;
          --sg-border: #38383a;
          --sg-accent: #7c5cfc;
          --sg-accent-hover: #9171fd;
          --sg-accent-soft: rgba(124, 92, 252, 0.12);
          --sg-error: #ff453a;
          --sg-shadow-card: 0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
        }

        body {
          font-family: -apple-system, 'SF Pro Display', 'Noto Sans JP', BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
          background: var(--sg-bg);
          color: var(--sg-text-primary);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        .login-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: var(--sg-bg);
          position: relative;
          overflow: hidden;
        }

        .login-wrapper::before {
          content: '';
          position: fixed;
          top: -30%;
          left: -20%;
          width: 60%;
          height: 60%;
          background: radial-gradient(ellipse, rgba(98,70,234,0.06) 0%, transparent 70%);
          pointer-events: none;
          border-radius: 50%;
        }
        .login-wrapper::after {
          content: '';
          position: fixed;
          bottom: -30%;
          right: -20%;
          width: 60%;
          height: 60%;
          background: radial-gradient(ellipse, rgba(98,70,234,0.04) 0%, transparent 70%);
          pointer-events: none;
          border-radius: 50%;
        }

        .login-logo {
          display: flex;
          align-items: center;
          margin-bottom: 36px;
          text-decoration: none;
        }
        .login-logo img {
          height: 40px;
          width: auto;
          object-fit: contain;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: var(--sg-surface);
          border-radius: 20px;
          box-shadow: var(--sg-shadow-card);
          padding: 40px 36px;
          position: relative;
          z-index: 1;
          animation: cardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .login-title {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.6px;
          color: var(--sg-text-primary);
          margin-bottom: 6px;
        }

        .login-subtitle {
          font-size: 14px;
          color: var(--sg-text-secondary);
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--sg-text-secondary);
          margin-bottom: 8px;
        }

        .form-input-wrap {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 13px 16px;
          font-size: 15px;
          font-family: inherit;
          color: var(--sg-text-primary);
          background: var(--sg-bg);
          border: 1.5px solid var(--sg-border);
          border-radius: 12px;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          -webkit-appearance: none;
        }

        .form-input:focus {
          border-color: var(--sg-accent);
          box-shadow: 0 0 0 3px var(--sg-accent-soft);
          background: var(--sg-surface);
        }

        .form-input::placeholder {
          color: var(--sg-border);
        }

        .form-input.has-icon {
          padding-right: 48px;
        }

        .input-icon-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--sg-text-secondary);
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.15s;
        }
        .input-icon-btn:hover { color: var(--sg-text-primary); }

        .error-box {
          background: rgba(255, 59, 48, 0.08);
          border: 1px solid rgba(255, 59, 48, 0.2);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 13px;
          color: var(--sg-error);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: shakeIn 0.3s ease;
        }

        @keyframes shakeIn {
          0%,100% { transform: translateX(0); }
          20%,60% { transform: translateX(-4px); }
          40%,80% { transform: translateX(4px); }
        }

        .forgot-link {
          display: block;
          text-align: right;
          font-size: 13px;
          color: var(--sg-accent);
          text-decoration: none;
          margin-top: 8px;
          margin-bottom: 24px;
          transition: opacity 0.15s;
        }
        .forgot-link:hover { opacity: 0.7; }

        .btn-login {
          width: 100%;
          padding: 15px;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          letter-spacing: -0.2px;
          color: white;
          background: var(--sg-accent);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.18s, transform 0.1s, box-shadow 0.18s;
          box-shadow: 0 4px 16px rgba(98, 70, 234, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }

        .btn-login::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
        }

        .btn-login:hover:not(:disabled) {
          background: var(--sg-accent-hover);
          box-shadow: 0 6px 22px rgba(98, 70, 234, 0.4);
          transform: translateY(-1px);
        }

        .btn-login:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-login:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--sg-border);
        }
        .divider-text {
          font-size: 12px;
          color: var(--sg-text-secondary);
          white-space: nowrap;
        }

        .register-row {
          text-align: center;
          font-size: 14px;
          color: var(--sg-text-secondary);
        }
        .register-link {
          color: var(--sg-accent);
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.15s;
        }
        .register-link:hover { opacity: 0.7; }

        .btn-line {
          width: 100%;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          color: white;
          background: #06C755;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
          transition: background 0.18s, transform 0.1s;
          margin-bottom: 12px;
        }
        .btn-line:hover { background: #05b34b; transform: translateY(-1px); }
        .btn-line:active { transform: translateY(0); }

        @media (max-width: 480px) {
          .login-card { padding: 32px 24px; border-radius: 16px; }
          .login-title { font-size: 22px; }
        }
      `}</style>

      <div className="login-wrapper">
        <Link href="/" className="login-logo">
          <Image src="/logo-new.png" alt="Studi-Go" width={160} height={40} style={{ height: 40, width: 'auto' }} priority />
        </Link>

        <div className="login-card">
          <h1 className="login-title">おかえりなさい</h1>
          <p className="login-subtitle">アカウントにサインインしてください</p>

          {error && (
            <div className="error-box">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">メールアドレス</label>
              <div className="form-input-wrap">
                <input
                  type="email"
                  className="form-input"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">パスワード</label>
              <div className="form-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input has-icon"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-icon-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M2 2l14 14M7.4 7.5A2 2 0 0011.5 11M4.2 4.3C2.8 5.4 1.7 7 1 9c1.5 3.5 5 6 8 6 1.5 0 3-.5 4.2-1.3M6 3.4C7 3.1 8 3 9 3c3 0 6.5 2.5 8 6-.5 1.2-1.2 2.3-2.1 3.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 9c1.5-3.5 5-6 8-6s6.5 2.5 8 6c-1.5 3.5-5 6-8 6s-6.5-2.5-8-6z" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <Link href="/forgot-password" className="forgot-link">
              パスワードをお忘れですか？
            </Link>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner" />
                  サインイン中...
                </>
              ) : (
                "サインイン"
              )}
            </button>
          </form>

          {/* LINEログインボタン: 後日実装予定 */}

          <div className="divider">
            <span className="divider-text">アカウントをお持ちでない方</span>
          </div>

          <div className="register-row">
            <Link href="/register" className="register-link">
              新規登録はこちら →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}