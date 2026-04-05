"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme-context";

interface TimeSlot { start: string; end: string; price: number; }
interface RoomPricing { weekday: TimeSlot[]; saturday: TimeSlot[]; sundayHoliday: TimeSlot[]; }
interface Room { id: string; name: string; description?: string; images?: string[]; basePrice: number; startType?: "0min" | "30min"; pricing?: RoomPricing; }
interface Studio { id: string; storeName: string; address?: string; logoUrl?: string; bgColor?: string; bgImageUrl?: string; appealPoint?: string; images?: string[]; businessHours?: { weekday: string; saturday: string; sundayHoliday: string }; rooms?: Room[]; phone?: string; closedDays?: string; parkingInfo?: string; }

function getMinPrice(studio: Studio): number | null {
  const prices: number[] = [];
  for (const room of studio.rooms || []) {
    if (room.pricing) {
      for (const key of ["weekday", "saturday", "sundayHoliday"]) {
        const d = (room.pricing as any)[key];
        const slots = Array.isArray(d) ? d : Array.isArray(d?.slots) ? d.slots : [];
        for (const s of slots) { if (s?.price > 0) prices.push(s.price); }
      }
    } else if (room.basePrice > 0) prices.push(room.basePrice);
  }
  return prices.length > 0 ? Math.min(...prices) : null;
}

function extractArea(address?: string): string {
  if (!address) return "area";
  const match = address.match(/(.{2,3}[\u90fd\u9053\u5e9c\u770c])/);
  return match ? match[1] : address.slice(0, 6);
}

function ThemeToggleBtn() {
  const { mode, toggleMode } = useTheme();
  return (
    <button onClick={toggleMode} className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
      style={{ background: mode === "dark" ? "#3a3a3c" : "#e8e8ed", color: mode === "dark" ? "#f5f5f7" : "#1d1d1f" }}>
      {mode === "dark"
        ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zm8-8a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1zM5 12a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h1zm11.95-6.364a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM8.172 15.778a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm9.192 0a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707zM7.05 5.636a1 1 0 0 1 1.414 1.414l-.707.707A1 1 0 0 1 6.343 6.343l.707-.707zM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7z"/></svg>
        : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      }
    </button>
  );
}

function HeaderNav() {
  const [userName, setUserName] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    const n = localStorage.getItem("userName");
    const uid = localStorage.getItem("userId");
    if (n) setUserName(n);
    if (uid) setLoggedIn(true);
  }, []);
  return (
    <div className="flex items-center gap-3">
      <ThemeToggleBtn />
      {loggedIn ? (
        <>
          <a href="/mypage" className="text-xs font-semibold px-4 py-1.5 rounded-full text-white" style={{ background: "var(--sg-accent)" }}>マイページ</a>
        </>
      ) : (
        <>
          <a href="/login" className="text-xs font-semibold px-4 py-1.5 rounded-full text-white" style={{ background: "var(--sg-accent)" }}>ログイン</a>
          <a href="/register" className="text-xs font-semibold px-4 py-1.5 rounded-full text-white" style={{ background: "var(--sg-accent)" }}>新規登録</a>
        </>
      )}
    </div>
  );
}

function SiteLogo({ size = "md" }: { size?: "sm" | "md" }) {
  return <img src="/logo-new.png" alt="Studi-Go" className={size === "sm" ? "h-7 w-auto" : "h-9 w-auto"} />;
}

export default function TopPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { mode } = useTheme();
  const isDark = mode === "dark";

  useEffect(() => {
    fetch('/api/studios')
      .then(r => r.json())
      .then((data: any[]) => {
        setStudios((data || []).filter((s: any) => s.isPublished === true));
      })
      .catch(() => setStudios([]))
      .finally(() => setLoading(false));
  }, []);

  const areas = Array.from(new Set(studios.map(s => extractArea(s.address)))).filter(a => a !== "area");
  const filtered = studios.filter(s => {
    const ms = search === "" || s.storeName.toLowerCase().includes(search.toLowerCase()) || (s.address||"").includes(search) || (s.appealPoint||"").includes(search);
    return ms && (areaFilter === "all" || extractArea(s.address) === areaFilter);
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--sg-bg)", color: "var(--sg-text-primary)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>
      <header className="sticky top-0 z-40 backdrop-blur-2xl" style={{ background: isDark ? "rgba(22,22,23,0.85)" : "rgba(255,255,255,0.85)", borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between"><SiteLogo /><HeaderNav /></div>
      </header>
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-5" style={{ color: "var(--sg-accent)" }}>音楽スタジオ予約プラットフォーム</p>
          <h1 className="font-bold leading-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--sg-text-primary)", letterSpacing: "-0.03em" }}>
            新しいスタジオ体験、<br />ここから始まる
          </h1>
          <p className="text-lg font-normal mb-10 max-w-md mx-auto" style={{ color: "var(--sg-text-secondary)" }}>
            空き状況を即確認。予約をもっとスムーズに
          </p>
          <div className="max-w-xl mx-auto flex gap-2">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "var(--sg-text-muted)" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="text" placeholder="スタジオ名・エリアで検索"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
                style={{ background: isDark ? "rgba(255,255,255,0.07)" : "#ffffff", border: `1.5px solid ${isDark ? "rgba(255,255,255,0.15)" : "#d2d2d7"}`, color: "var(--sg-text-primary)", boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.08)" }}
                value={search} onChange={e => setSearch(e.target.value)}
                onFocus={e => { e.target.style.borderColor = "var(--sg-accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)"; }}
                onBlur={e => { e.target.style.borderColor = isDark ? "rgba(255,255,255,0.15)" : "#d2d2d7"; e.target.style.boxShadow = isDark ? "none" : "0 1px 4px rgba(0,0,0,0.08)"; }}
              />
            </div>
            <button className="px-6 py-3.5 rounded-2xl text-sm font-semibold text-white shrink-0" style={{ background: "var(--sg-accent)" }}>検索</button>
          </div>
        </div>
      </section>
      <div style={{ background: "#1d1d1f" }}>
        <div className="py-6 flex items-center justify-center gap-16">
          {[{ num: studios.length, label: "掲載スタジオ" }, { num: studios.reduce((s,st) => s+(st.rooms?.length||0),0), label: "練習部屋" }, { num: "24h", label: "オンライン予約" }].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>{typeof stat.num === "number" ? `${stat.num}+` : stat.num}</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: "#a1a1a6" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <section className="max-w-6xl mx-auto px-6 mt-10 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["all", ...areas].map(area => (
            <button key={area} onClick={() => setAreaFilter(area)} className="px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
              style={areaFilter === area ? { background: "var(--sg-accent)", color: "#fff" } : { background: isDark ? "rgba(255,255,255,0.08)" : "#f5f5f7", color: "var(--sg-text-secondary)" }}>
              {area === "all" ? "すべて" : area}
            </button>
          ))}
        </div>
      </section>
      <main className="max-w-6xl mx-auto px-6 pb-28">
        <p className="text-xs font-medium mb-6" style={{ color: "var(--sg-text-muted)" }}>{loading ? "読み込み中..." : `${filtered.length}件のスタジオ`}</p>
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="rounded-3xl animate-pulse" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "#f5f5f7", height: 320 }} />)}
          </div>
        )}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(studio => <StudioCard key={studio.id} studio={studio} hovered={hoveredId===studio.id} onHover={() => setHoveredId(studio.id)} onLeave={() => setHoveredId(null)} isDark={isDark} />)}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-32">
            <p className="text-4xl mb-4">🎸</p>
            <p className="font-semibold text-lg mb-2" style={{ color: "var(--sg-text-primary)" }}>スタジオが見つかりません</p>
            <p className="text-sm" style={{ color: "var(--sg-text-muted)" }}>検索条件を変えてお試しください</p>
          </div>
        )}
      </main>
      <footer style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#d2d2d7"}`, background: isDark ? "#111113" : "#f5f5f7" }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <SiteLogo size="sm" />
          <p className="text-xs" style={{ color: "var(--sg-text-muted)" }}>© 2026 Studi-Go. All rights reserved.</p>
          <div className="flex gap-6">
            {[["利用規約", "/terms"], ["プライバシー", "/privacy"], ["お問い合わせ", "#"]].map(([l, href]) => (
              <a key={l} href={href} className="text-xs hover:underline" style={{ color: "var(--sg-text-muted)" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function StudioCard({ studio, hovered, onHover, onLeave, isDark }: { studio: Studio; hovered: boolean; onHover: () => void; onLeave: () => void; isDark: boolean; }) {
  const minPrice = getMinPrice(studio);
  const roomCount = studio.rooms?.length || 0;
  const area = extractArea(studio.address);
  const thumbnail = studio.images?.[0] || studio.rooms?.find(r => r.images?.[0])?.images?.[0] || null;
  return (
    <a href={`/studio/${studio.id}`} className="group block rounded-3xl overflow-hidden transition-all duration-300"
      style={{ background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff", border: `1px solid ${hovered ? "var(--sg-accent)" : isDark ? "rgba(255,255,255,0.08)" : "#e8e8ed"}`, boxShadow: hovered ? "0 20px 60px rgba(124,58,237,0.2), 0 4px 20px rgba(0,0,0,0.1)" : isDark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.06)", transform: hovered ? "translateY(-5px) scale(1.01)" : "none" }}
      onMouseEnter={onHover} onMouseLeave={onLeave}>
      <div className="relative h-48 overflow-hidden" style={{ background: isDark ? "#2c2c2e" : "#f5f5f7" }}>
        {thumbnail
          ? <img src={thumbnail} alt={studio.storeName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          : <div className="w-full h-full flex items-center justify-center" style={{ background: studio.bgColor ? `linear-gradient(135deg, ${studio.bgColor}cc, ${studio.bgColor}44)` : isDark ? "linear-gradient(135deg,#2c2c2e,#1c1c1e)" : "linear-gradient(135deg,#f0eeff,#e8e0ff)" }}>
              {studio.logoUrl ? <img src={studio.logoUrl} alt={studio.storeName} className="max-h-16 max-w-32 object-contain opacity-80" /> : <span className="text-4xl opacity-20">🎸</span>}
            </div>
        }
        <div className="absolute inset-x-0 bottom-0 h-14 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }} />
        {thumbnail && studio.logoUrl && (
          <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl overflow-hidden bg-white/90 backdrop-blur-sm shadow">
            <img src={studio.logoUrl} alt="logo" className="w-full h-full object-contain p-1" />
          </div>
        )}
        {roomCount > 0 && <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md rounded-full px-2.5 py-1 text-[10px] font-semibold text-white">{roomCount}部屋</div>}
      </div>
      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: "var(--sg-accent)" }}>📍 {area}</p>
        <h3 className="font-semibold text-base leading-snug mb-2" style={{ color: "var(--sg-text-primary)", letterSpacing: "-0.01em" }}>{studio.storeName}</h3>
        {studio.appealPoint && <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--sg-text-muted)" }}>{studio.appealPoint}</p>}
        <div className="pt-4 flex items-center justify-between" style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#f0f0f5"}` }}>
          <div>
            {minPrice ? (
              <><span className="text-[10px]" style={{ color: "var(--sg-text-muted)" }}>¥</span><span className="text-lg font-bold" style={{ color: "var(--sg-text-primary)", letterSpacing: "-0.02em" }}>{minPrice.toLocaleString()}</span><span className="text-[10px]" style={{ color: "var(--sg-text-muted)" }}>〜/h</span></>
            ) : <span className="text-xs" style={{ color: "var(--sg-text-muted)" }}>要問合せ</span>}
          </div>
          {studio.businessHours?.weekday && (
            <div className="text-right">
              <p className="text-[10px]" style={{ color: "var(--sg-text-muted)" }}>平日</p>
              <p className="text-xs font-medium" style={{ color: "var(--sg-text-secondary)" }}>{studio.businessHours.weekday}</p>
            </div>
          )}
        </div>
        <div className="mt-4 w-full py-2.5 rounded-2xl text-xs font-semibold text-center transition-all duration-300"
          style={hovered ? { background: "var(--sg-accent)", color: "#fff" } : { background: isDark ? "rgba(255,255,255,0.06)" : "#f5f5f7", color: "var(--sg-text-secondary)" }}>
          {hovered ? "予約する →" : "詳細を見る"}
        </div>
      </div>
    </a>
  );
}
