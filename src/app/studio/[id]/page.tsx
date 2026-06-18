"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

interface TimeSlot { start: string; end: string; price: number; }
interface RoomPricingDay { slots?: TimeSlot[] }
interface RoomPricing { weekday: TimeSlot[] | RoomPricingDay; saturday: TimeSlot[] | RoomPricingDay; sundayHoliday: TimeSlot[] | RoomPricingDay; }
interface Room {
  id: string; name: string; description?: string; images?: string[];
  basePrice: number; startType?: "0min" | "30min"; pricing?: RoomPricing;
}
interface EquipmentOption { name: string; pricePerHour: number; priceType?: string; imageUrl?: string; }
interface Studio {
  id: string; storeName: string; address?: string; phone?: string; logoUrl?: string;
  bgColor?: string; bgImageUrl?: string; bgOpacity?: number; textColor?: string; logoSize?: number; appealPoint?: string; images?: string[];
  businessHours?: { weekday: string; saturday: string; sundayHoliday: string };
  rooms?: Room[]; closedDays?: string; parkingInfo?: string; reservationLeadDays?: number;
  equipmentOptions?: EquipmentOption[];
  designSettings?: { backgroundColor?: string; backgroundType?: string; backgroundImageUrl?: string; logoSize?: number; showMap?: boolean };
}

function getDayType(date: Date): "weekday" | "saturday" | "sundayHoliday" {
  const d = date.getDay();
  if (d === 0) return "sundayHoliday";
  if (d === 6) return "saturday";
  return "weekday";
}

function getPriceForTime(pricing: RoomPricing | undefined, basePrice: number, dayType: string, hour: number): number {
  if (!pricing) return basePrice;
  const dayData = (pricing as any)[dayType]; const slots = Array.isArray(dayData) ? dayData : Array.isArray(dayData?.slots) ? dayData.slots : undefined;
  if (!Array.isArray(slots)) return basePrice;
  for (const slot of slots) {
    const [sh] = slot.start.split(":").map(Number);
    const [eh] = slot.end.split(":").map(Number);
    if (hour >= sh && hour < eh) return slot.price;
  }
  return basePrice;
}

function parseHours(hoursStr?: string): { open: number; close: number } {
  if (!hoursStr) return { open: 10, close: 22 };
  const match = hoursStr.match(/(\d{1,2}):?(\d{0,2})\s*[-~〜]\s*(\d{1,2}):?(\d{0,2})/);
  if (!match) return { open: 10, close: 22 };
  return { open: parseInt(match[1]), close: parseInt(match[3]) };
}

function formatTime(t: number) {
  const h = Math.floor(t);
  const m = t % 1 === 0.5 ? "30" : "00";
  return `${String(h).padStart(2, "0")}:${m}`;
}

type CalView = "month" | "week" | "day";

export default function StudioDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const studioId = params?.id as string;
  const isPreview = searchParams?.get("preview") === "true";
  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [selectedPromotion, setSelectedPromotion] = useState<any | null>(null);

  const [calView, setCalView] = useState<CalView>("month");
  const [calendarDate, setCalendarDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStart, setSelectedStart] = useState<number | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(2);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [bookingStep, setBookingStep] = useState<"calendar" | "confirm">("calendar");
  const [bookedSlots, setBookedSlots] = useState<{start:number,duration:number}[]>([]);
  const [onsiteLoading, setOnsiteLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStudentDiscount, setIsStudentDiscount] = useState(false);
  const [selectedOtherDiscounts, setSelectedOtherDiscounts] = useState<number[]>([]);

  useEffect(() => {
    try {
      const uid = localStorage.getItem("userId");
      setIsLoggedIn(!!uid && uid !== "guest");
    } catch { /* SSR or localStorage unavailable */ }
  }, []);

  useEffect(() => {
    if (!studioId) return;
    fetch(`/api/store/detail?id=${studioId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          console.log("📦 Studio data:", data);
          console.log("🎁 Promotions:", data.promotions);
          console.log("🖼️ Custom list:", data.promotions?.customList);
          // rooms が配列でなければ空配列に正規化
          if (data.rooms && !Array.isArray(data.rooms)) {
            console.warn("⚠️ studio.rooms is not an array, normalizing:", typeof data.rooms);
            data.rooms = [];
          }
          setStudio(data);
          setActiveRoom(data.rooms?.[0]?.id || null);
          // タイトルとファビコンを店舗用に変更
          document.title = data.storeName || "Studi-Go";
          if (data.logoUrl) {
            const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "shortcut icon";
            link.href = data.logoUrl;
            document.head.appendChild(link);
          }
        }
        setLoading(false);
      })
      .catch((err) => { console.error("Studio fetch error:", err); setLoading(false); });
  }, [studioId]);

  // 日付・部屋が変わったら予約済みスロットを取得
  useEffect(() => {
    if (!selectedDate || !activeRoom || !studio) { setBookedSlots([]); return; }
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth()+1).padStart(2,"0")}-${String(selectedDate.getDate()).padStart(2,"0")}`;
    const roomName = studio.rooms?.find(r => r.id === activeRoom)?.name || "";
    fetch(`/api/bookings/available?studioId=${studio.id}&roomName=${encodeURIComponent(roomName)}&date=${dateStr}`)
      .then(r => r.json())
      .then(data => { console.log("bookedSlots:", data.bookedSlots, "date:", dateStr, "room:", roomName); setBookedSlots(data.bookedSlots || []); })
      .catch(() => setBookedSlots([]));
  }, [selectedDate, activeRoom, studio?.id]);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="text-foreground font-black text-2xl animate-pulse tracking-widest">LOADING...</div>
    </div>
  );
  if (!studio) return (
    <div className="min-h-screen bg-background flex items-center justify-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="text-center">
        <p className="text-4xl mb-4">404</p>
        <p className="text-foreground font-black text-xl mb-4">スタジオが見つかりません</p>
        <a href="/" className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-black transition-all">トップに戻る</a>
      </div>
    </div>
  );

  const allImages = [...(Array.isArray(studio.images) ? studio.images : []), ...(Array.isArray(studio.rooms) ? studio.rooms.flatMap((r) => Array.isArray(r.images) ? r.images : []) : [])];
  const selectedRoom = studio.rooms?.find((r) => r.id === activeRoom);

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today); maxDate.setDate(today.getDate() + (studio.reservationLeadDays || 30));
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const dayType = selectedDate ? getDayType(selectedDate) : "weekday";
  const isSlotBooked = (t: number) => {
    return bookedSlots.some(s => t < s.start + s.duration && t + 1 > s.start);
  };
  const hoursKey = dayType === "weekday" ? "weekday" : dayType === "saturday" ? "saturday" : "sundayHoliday";
  const businessHoursStr = studio.businessHours?.[hoursKey as keyof typeof studio.businessHours];
  const { open, close } = parseHours(businessHoursStr);
  const startMinute = selectedRoom?.startType === "30min" ? 0.5 : 0;
  const timeSlots: number[] = [];
  for (let h = open; h < close; h++) timeSlots.push(h + startMinute);

  const calcRoomPrice = () => {
    if (!selectedDate || selectedStart === null || !selectedRoom) return 0;
    let total = 0;
    for (let i = 0; i < selectedDuration; i++) {
      total += getPriceForTime(selectedRoom.pricing, selectedRoom.basePrice, dayType, Math.floor(selectedStart + i));
    }
    return total;
  };

  const calcOptionPrice = () => {
    if (!studio.equipmentOptions) return 0;
    return selectedOptions.reduce((sum, idx) => {
      const opt = studio.equipmentOptions![idx];
      if (!opt) return sum;
      return sum + (opt.priceType === "per_hour" ? opt.pricePerHour * selectedDuration : opt.pricePerHour);
    }, 0);
  };

  const subtotal = calcRoomPrice() + calcOptionPrice();
  const studentDiscountAmount = (isStudentDiscount && studio?.studentDiscount?.enabled)
    ? (studio.studentDiscount.discountType === "amount"
        ? studio.studentDiscount.value
        : Math.round(subtotal * studio.studentDiscount.value / 100))
    : 0;
  const otherDiscountAmount = selectedOtherDiscounts.reduce((sum, idx) => {
    const d = studio?.otherDiscounts?.[idx];
    if (!d || !d.enabled) return sum;
    return sum + (d.discountType === "amount" ? d.value : Math.round(subtotal * d.value / 100));
  }, 0);
  const totalPrice = Math.max(0, subtotal - studentDiscountAmount - otherDiscountAmount);

  const toggleOption = (idx: number) => {
    setSelectedOptions(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const goCalendar = (dir: number) => {
    const d = new Date(calendarDate);
    if (calView === "month") d.setMonth(d.getMonth() + dir);
    else if (calView === "week") d.setDate(d.getDate() + dir * 7);
    else d.setDate(d.getDate() + dir);
    setCalendarDate(d);
  };

  const handleProceedToPayment = () => {
    if (!selectedDate || selectedStart === null || !selectedRoom) return;
    const dateStr = selectedDate.toISOString().split("T")[0];
    const optionPrices = selectedOptions.map(idx => { const opt = studio.equipmentOptions?.[idx]; return opt ? (opt.priceType === "per_hour" ? opt.pricePerHour * selectedDuration : opt.pricePerHour) : 0; }).join(",");
    const optionNames = selectedOptions
      .map(idx => studio.equipmentOptions?.[idx]?.name || "")
      .filter(Boolean)
      .join(",");
    const p = new URLSearchParams({
      studioId: studio.id,
      studioName: studio.storeName,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      date: dateStr,
      startTime: formatTime(selectedStart),
      durationHours: String(selectedDuration),
      total: String(totalPrice),
      options: optionNames,
      optionPrices: optionPrices,
    });
    window.location.href = `/pay?${p.toString()}`;
  };

  const handleOnsiteBooking = async () => {
    if (!selectedDate || selectedStart === null || !selectedRoom) return;
    setOnsiteLoading(true);
    try {
      const dateStr = selectedDate.toISOString().split("T")[0];
      const res = await fetch("/api/store/booking-onsite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studioId: studio.id,
          studioName: studio.storeName,
          roomName: selectedRoom.name,
          date: dateStr,
          startTime: formatTime(selectedStart),
          durationHours: selectedDuration,
          totalPrice,
          userId: "guest",
          userName: "",
          userEmail: "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("予約が完了しました。お支払いは当日店頭にてお願いいたします。");
        window.location.reload();
      } else {
        alert(data.error || "予約に失敗しました");
      }
    } catch { alert("エラーが発生しました"); }
    finally { setOnsiteLoading(false); }
  };

  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];

  const renderMonthCal = () => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return (
      <div>
        <div className="grid grid-cols-7 mb-1">
          {dayNames.map((d, i) => (
            <div key={i} className={`text-center text-[10px] font-black py-1 ${i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-muted-foreground"}`}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => <div key={i} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(year, month, day);
            const isPast = date < today;
            const isTooFar = date > maxDate;
            const isDisabled = isPast || isTooFar;
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isToday = date.toDateString() === today.toDateString();
            const dow = date.getDay();
            return (
              <button key={i} disabled={isDisabled}
                onClick={() => { setSelectedDate(date); setSelectedStart(null); setBookingStep("calendar"); setCalView("day"); setCalendarDate(date); }}
                className={`aspect-square rounded-xl text-xs font-black transition-all flex items-center justify-center
                  ${isSelected ? "bg-purple-600 text-white" : ""}
                  ${isToday && !isSelected ? "border border-purple-500 text-purple-400" : ""}
                  ${isDisabled ? "opacity-20 cursor-not-allowed text-gray-600" : !isSelected ? `hover:bg-accent/10 ${dow === 0 ? "text-red-400" : dow === 6 ? "text-blue-400" : "text-muted-foreground"}` : ""}`}>
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekCal = () => {
    const start = new Date(calendarDate);
    start.setDate(start.getDate() - start.getDay());
    const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(d.getDate() + i); return d; });
    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const isSelected = selectedDate?.toDateString() === d.toDateString();
          const isPast = d < today;
          const isTooFar = d > maxDate;
          const isDisabled = isPast || isTooFar;
          const isToday = d.toDateString() === today.toDateString();
          return (
            <button key={i} disabled={isDisabled}
              onClick={() => { setSelectedDate(d); setSelectedStart(null); setBookingStep("calendar"); }}
              className={`rounded-xl p-2 min-h-16 border text-center transition-all
                ${isSelected ? "bg-purple-600 border-purple-500" : isToday ? "border-purple-500/50" : "border-border hover:border-gray-600"}
                ${isDisabled ? "opacity-30 cursor-not-allowed" : ""}`}>
              <p className={`text-[10px] font-black ${i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-muted-foreground"}`}>{dayNames[i]}</p>
              <p className={`text-sm font-black mt-1 ${isSelected ? "text-foreground" : isToday ? "text-purple-400" : "text-muted-foreground"}`}>{d.getDate()}</p>
            </button>
          );
        })}
      </div>
    );
  };

  const renderDayCal = () => {
    const dateToShow = selectedDate || calendarDate;
    return (
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {timeSlots.map((t) => (
          <button key={t} onClick={() => { if(isSlotBooked(t)) return; setSelectedDate(dateToShow); setSelectedStart(t); setBookingStep("calendar"); }}
            disabled={isSlotBooked(t)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all border
              ${isSlotBooked(t) ? "opacity-40 cursor-not-allowed bg-accent/5 border-gray-800 line-through text-gray-500" : selectedStart === t ? "bg-purple-600 border-purple-500 text-white" : "bg-accent/10/50 border-gray-700 text-muted-foreground hover:text-foreground hover:border-gray-500"}`}>
            <span className="font-black w-12">{formatTime(t)}</span>
            <span className="text-gray-600">〜</span>
            <span className="ml-auto text-purple-400 font-black">
              ¥{getPriceForTime(selectedRoom?.pricing, selectedRoom?.basePrice || 0, getDayType(dateToShow), Math.floor(t)).toLocaleString()}/h
            </span>
          </button>
        ))}
      </div>
    );
  };

  const calLabel = () => {
    if (calView === "month") return `${year}年${month + 1}月`;
    if (calView === "week") {
      const s = new Date(calendarDate); s.setDate(s.getDate() - s.getDay());
      const e = new Date(s); e.setDate(e.getDate() + 6);
      return `${s.getMonth() + 1}/${s.getDate()} 〜 ${e.getMonth() + 1}/${e.getDate()}`;
    }
    return calendarDate.toLocaleDateString("ja-JP", { month: "long", day: "numeric", weekday: "short" });
  };

  // 背景色の輝度を計算して文字色を自動判定
  const rawBg = studio.designSettings?.backgroundColor || studio.bgColor || "#ffffff";
  const bgHex = typeof rawBg === "string" ? rawBg : "#ffffff";
  const isDarkBg = (() => {
    try {
      const hex = bgHex.replace("#", "");
      if (hex.length < 6) return false;
      const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
      return (r*0.299 + g*0.587 + b*0.114) < 128;
    } catch { return false; }
  })();
  // 背景画像がある場合も暗いとみなす
  const effectiveDark = isDarkBg || !!studio.bgImageUrl;
  const effectiveTextColor = effectiveDark ? "#ffffff" : "#1d1d1f";
  const effectiveSubColor = effectiveDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.55)";

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: bgHex, color: effectiveTextColor, backgroundImage: studio.bgImageUrl ? `url(${studio.bgImageUrl})` : undefined, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      {studio.bgImageUrl && <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundColor: `rgba(0,0,0,${studio.bgOpacity ?? 0.15})` }} />}
      <div className="relative z-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {isPreview && (
        <div className="bg-blue-600 text-white text-center py-2 text-xs font-black tracking-wide sticky top-0 z-50">
          👁 プレビューモード — ユーザーに見える画面です
          <a href={`/admin/studios/${studioId}/edit`} className="ml-4 underline hover:no-underline">← 代理編集に戻る</a>
        </div>
      )}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            {studio.logoUrl
              ? <img src={studio.logoUrl} alt={studio.storeName} className="w-auto object-contain" style={{height: "40px", maxHeight: "40px"}} />
              : <span className="font-black text-xl text-foreground">{studio.storeName}</span>
            }
          </a>
          <a href="/" className="text-xs font-bold text-muted-foreground hover:text-foreground transition-all">← スタジオ一覧に戻る</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-3">
            <div className="aspect-video rounded-3xl overflow-hidden bg-card border border-border">
              {allImages.length > 0 ? (
                <img src={allImages[activeImage]} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: studio.bgImageUrl ? `url(${studio.bgImageUrl}) center/cover no-repeat` : studio.bgColor ? `linear-gradient(135deg, ${studio.bgColor}cc, ${studio.bgColor}22)` : "linear-gradient(135deg, #1a0533, #0d0d1a)" }}>
                  {studio.logoUrl
                    ? <img src={studio.logoUrl} alt="" className="max-h-24 max-w-48 object-contain opacity-70" />
                    : <span className="text-6xl opacity-20">🎸</span>
                  }
                </div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-purple-500" : "border-transparent opacity-50 hover:opacity-80"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <div>
              {studio.logoUrl && <img src={studio.logoUrl} alt="logo" className="object-contain mb-4" style={{height: `${studio.logoSize || 80}px`, maxHeight: "160px"}} />}
              <h1 className="text-3xl font-black leading-tight mb-3" style={{color: effectiveTextColor}}>{studio.storeName}</h1>
              {studio.appealPoint && <p className="text-sm leading-relaxed" style={{color: effectiveSubColor}}>{studio.appealPoint}</p>}
            </div>
            <div className="space-y-2">
              {studio.address && <div className="flex items-start gap-3 text-sm" style={{color: effectiveSubColor}}>
                <svg className="w-4 h-4 shrink-0 mt-0.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span className="font-medium">{studio.address}</span></div>}
              {studio.phone && <div className="flex items-center gap-3 text-sm" style={{color: effectiveSubColor}}>
                <svg className="w-4 h-4 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span className="font-medium">{studio.phone}</span></div>}
              {studio.closedDays && <div className="flex items-center gap-3 text-sm" style={{color: effectiveSubColor}}>
                <svg className="w-4 h-4 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span className="font-medium">定休日: {studio.closedDays}</span></div>}
              {studio.parkingInfo && <div className="flex items-center gap-3 text-sm" style={{color: effectiveSubColor}}>
                <svg className="w-4 h-4 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                <span className="font-medium">{studio.parkingInfo}</span></div>}
            </div>
            {studio.businessHours && (
              <div className="bg-card border border-border rounded-2xl p-4">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">営業時間</p>
                <div className="space-y-2">
                  {studio.businessHours.weekday && <div className="flex justify-between text-sm"><span className="text-muted-foreground font-bold">平日</span><span className="text-foreground font-black">{studio.businessHours.weekday}</span></div>}
                  {studio.businessHours.saturday && <div className="flex justify-between text-sm"><span className="text-muted-foreground font-bold">土曜</span><span className="text-foreground font-black">{studio.businessHours.saturday}</span></div>}
                  {studio.businessHours.sundayHoliday && <div className="flex justify-between text-sm"><span className="text-muted-foreground font-bold">日祝</span><span className="text-foreground font-black">{studio.businessHours.sundayHoliday}</span></div>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 特典・クーポンセクション */}
        {(() => {
          const promotions = (studio as any).promotions;
          if (!promotions) return null;
          const vowcha = promotions.vowcha;
          const customList: any[] = promotions.customList || [];
          const todayStr = new Date().toISOString().split("T")[0];
          const validCustomList = customList.filter((item: any) => {
            if (item.validUntil && item.validUntil < todayStr) return false;
            if (!item.title || !item.description) return false;
            return true;
          });
          const hasContent = (vowcha?.enabled) || validCustomList.length > 0;
          if (!hasContent) return null;
          return (
            <section className="mb-8">
              <h2 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">特典・クーポン</h2>
              <div className="space-y-3">
                {/* バウチャクーポン */}
                {vowcha?.enabled && (
                  <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/20 border border-purple-700/50 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <p className="font-black text-white text-sm">バウチャクーポン</p>
                          <span className="px-2 py-0.5 bg-purple-600 text-white text-[9px] font-black rounded-full">会員限定</span>
                          <a href="/about/voucha" target="_blank" className="text-purple-400 hover:text-purple-300 text-[10px] font-bold underline transition-colors">クーポンとは？</a>
                        </div>
                        <p className="text-purple-300 font-black text-base">{vowcha.discountText}</p>
                        <p className="text-muted-foreground text-xs mt-1">{vowcha.description}</p>
                        {isLoggedIn ? (
                          <div className="mt-3 flex items-center gap-3">
                            {vowcha.qrImageUrl && <img src={vowcha.qrImageUrl} alt="バウチャ QR" className="w-20 h-20 rounded-lg border border-purple-700/50" />}
                            {vowcha.linkUrl && (
                              <a href={vowcha.linkUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-black text-white transition-all">
                                クーポンを取得 →
                              </a>
                            )}
                          </div>
                        ) : (
                          <a href="/login" className="inline-block mt-3 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-700/50 rounded-xl text-xs font-black text-purple-300 transition-all">
                            ログインしてクーポンを確認する →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* 店舗独自特典 */}
                {validCustomList.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-purple-400 mb-3">店舗独自特典</p>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {validCustomList.map((item: any) => (
                        <button key={item.id} onClick={() => setSelectedPromotion(item)} className="flex-shrink-0 w-40 bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-purple-500 transition-all text-left">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.title} className="w-full h-28 object-cover" />
                          ) : (
                            <div className="w-full h-28 bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                              <span className="text-2xl text-muted-foreground/50">🎁</span>
                            </div>
                          )}
                          <div className="p-3">
                            <p className="font-black text-foreground text-xs truncate">{item.title}</p>
                            <p className="text-muted-foreground text-[10px] mt-1 line-clamp-2">{item.description}</p>
                            {item.validUntil && <p className="text-muted-foreground text-[9px] mt-1">{item.validUntil}まで</p>}
                            {item.requiresLogin && <span className="inline-block px-1.5 py-0.5 bg-purple-700 text-white text-[8px] font-black rounded mt-1">会員限定</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 特典詳細モーダル */}
                {selectedPromotion && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedPromotion(null)}>
                    <div className="bg-card rounded-2xl max-w-md w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                      {selectedPromotion.imageUrl && (
                        <img src={selectedPromotion.imageUrl} alt={selectedPromotion.title} className="w-full h-48 object-cover" />
                      )}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-black text-foreground text-lg">{selectedPromotion.title}</h3>
                          <button onClick={() => setSelectedPromotion(null)} className="text-muted-foreground hover:text-foreground text-xl">✕</button>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">{selectedPromotion.description}</p>
                        <div className="space-y-2 text-xs">
                          {selectedPromotion.validUntil && (
                            <p className="text-muted-foreground">📅 有効期限: {selectedPromotion.validUntil}まで</p>
                          )}
                          {selectedPromotion.requiresLogin && (
                            <p className="text-purple-400 font-bold">🔒 会員限定</p>
                          )}
                        </div>
                        {selectedPromotion.requiresLogin && !isLoggedIn && (
                          <a href="/login" className="block mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-500 rounded-lg text-white text-center font-bold transition-all">
                            ログインして詳細を確認
                          </a>
                        )}
                        <button onClick={() => setSelectedPromotion(null)} className="block w-full mt-3 py-2 px-4 border border-border rounded-lg text-foreground font-bold hover:bg-accent/10 transition-all">
                          閉じる
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })()}

        {(studio.rooms?.length || 0) > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">部屋を選ぶ</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {(studio.rooms || []).map((room) => (
                <button key={room.id}
                  onClick={() => { setActiveRoom(room.id); setSelectedDate(null); setSelectedStart(null); setBookingStep("calendar"); setSelectedOptions([]); }}
                  className={`shrink-0 px-5 py-3 rounded-2xl text-sm font-black transition-all border ${activeRoom === room.id ? "bg-purple-600 border-purple-500 text-white" : "bg-card border-gray-700 text-muted-foreground hover:text-foreground hover:border-gray-500"}`}>
                  {room.name}
                </button>
              ))}
            </div>
          </section>
        )}

        {selectedRoom && (
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-3xl overflow-hidden">
                <div className="h-48 bg-accent/10">
                  {selectedRoom.images?.[0]
                    ? <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center"><span className="text-4xl opacity-20">🎸</span></div>
                  }
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-black text-lg text-foreground">{selectedRoom.name}</h3>
                  {selectedRoom.description && <p className="text-muted-foreground text-xs leading-relaxed">{selectedRoom.description}</p>}
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-foreground">¥{(selectedRoom.basePrice ?? (selectedRoom.pricing?.weekday as any)?.slots?.[0]?.price ?? 0).toLocaleString()}</span>
                    <span className="text-muted-foreground text-xs font-bold">〜/h</span>
                  </div>
                  {selectedRoom.pricing && Array.isArray((selectedRoom.pricing as any).weekday) && (
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">平日料金</p>
                      {((selectedRoom.pricing as any).weekday as TimeSlot[]).map((slot, i) => (
                        <div key={i} className="flex justify-between text-xs bg-accent/10/50 rounded-lg px-3 py-1.5">
                          <span className="text-muted-foreground">{slot.start}〜{slot.end}</span>
                          <span className="text-foreground font-black">¥{slot.price.toLocaleString()}/h</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card border border-border rounded-3xl p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <button onClick={() => goCalendar(-1)} className="p-2 bg-accent/10 hover:bg-gray-700 rounded-lg text-muted-foreground transition-all text-xs">◀</button>
                  <p className="font-black text-foreground text-sm">{calLabel()}</p>
                  <button onClick={() => goCalendar(1)} className="p-2 bg-accent/10 hover:bg-gray-700 rounded-lg text-muted-foreground transition-all text-xs">▶</button>
                </div>
                <div className="flex bg-accent/10 rounded-xl overflow-hidden">
                  {(["month", "week", "day"] as CalView[]).map((v) => (
                    <button key={v} onClick={() => setCalView(v)}
                      className={`flex-1 py-2 text-xs font-black transition-all ${calView === v ? "bg-purple-600 text-white" : "text-muted-foreground hover:text-foreground"}`}>
                      {v === "month" ? "月" : v === "week" ? "週" : "日"}
                    </button>
                  ))}
                </div>
                {calView === "month" && renderMonthCal()}
                {calView === "week" && renderWeekCal()}
                {calView === "day" && (
                  <div>
                    <p className="text-xs font-black text-purple-400 mb-3">
                      {(selectedDate || calendarDate).toLocaleDateString("ja-JP", { month: "long", day: "numeric", weekday: "short" })}
                    </p>
                    {renderDayCal()}
                  </div>
                )}
                {selectedDate && calView !== "day" && (
                  <p className="text-center text-xs font-black text-purple-400">
                    {selectedDate.toLocaleDateString("ja-JP", { month: "long", day: "numeric", weekday: "short" })} を選択中
                  </p>
                )}
              </div>

              <div className="bg-card border border-border rounded-3xl p-6 flex flex-col gap-4">
                {!selectedDate ? (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-600 text-sm font-bold text-center">← まず日付を選んでください</p>
                  </div>
                ) : bookingStep === "confirm" ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-xs font-black text-purple-400 uppercase tracking-widest">予約確認</p>
                    <div className="bg-accent/10/50 rounded-2xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-bold">日付</span>
                        <span className="text-foreground font-black">{selectedDate.toLocaleDateString("ja-JP", { month: "long", day: "numeric", weekday: "short" })}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-bold">時間</span>
                        <span className="text-foreground font-black">{formatTime(selectedStart!)}〜{formatTime(selectedStart! + selectedDuration)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-bold">部屋</span>
                        <span className="text-foreground font-black">{selectedRoom.name}</span>
                      </div>
                      {selectedOptions.length > 0 && selectedOptions.map(idx => {
                        const opt = studio.equipmentOptions?.[idx];
                        if (!opt) return null;
                        return (
                          <div key={idx} className="flex justify-between text-xs text-muted-foreground">
                            <span>+ {opt.name}</span>
                            <span>¥{(opt.priceType === "per_hour" ? opt.pricePerHour * selectedDuration : opt.pricePerHour).toLocaleString()}</span>
                          </div>
                        );
                      })}
                      {(studio.studentDiscount?.enabled || (studio.otherDiscounts && studio.otherDiscounts.filter(d => d.enabled).length > 0)) && (
                        <div className="border-t border-gray-700 pt-2 mt-2 space-y-2">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">割引</p>
                          {studio.studentDiscount?.enabled && (
                            <label className="flex items-center justify-between cursor-pointer">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isStudentDiscount}
                                  onChange={e => setIsStudentDiscount(e.target.checked)}
                                  className="w-4 h-4 accent-purple-600 rounded"
                                />
                                <span className="text-sm font-bold text-foreground">学割</span>
                              </div>
                              <span className="text-xs font-bold text-green-400">
                                -{studio.studentDiscount.value}{studio.studentDiscount.discountType === "percentage" ? "%" : "円"}
                              </span>
                            </label>
                          )}
                          {studio.otherDiscounts?.map((d, i) => d.enabled && (
                            <label key={i} className="flex items-center justify-between cursor-pointer">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={selectedOtherDiscounts.includes(i)}
                                  onChange={e => setSelectedOtherDiscounts(prev => e.target.checked ? [...prev, i] : prev.filter(x => x !== i))}
                                  className="w-4 h-4 accent-purple-600 rounded"
                                />
                                <span className="text-sm font-bold text-foreground">{d.name}</span>
                              </div>
                              <span className="text-xs font-bold text-green-400">
                                -{d.value}{d.discountType === "percentage" ? "%" : "円"}
                              </span>
                            </label>
                          ))}
                          {isStudentDiscount && (
                            <p className="text-[10px] text-muted-foreground ml-6">※当日、学生証の提示をお願いする場合があります</p>
                          )}
                        </div>
                      )}
                      <div className="flex justify-between text-sm border-t border-gray-700 pt-2 mt-2">
                        <span className="text-muted-foreground font-bold">合計</span>
                        <span className="text-purple-400 font-black text-lg">¥{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    <button onClick={handleProceedToPayment} className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-2xl text-sm font-black transition-all">
                      オンライン決済で予約 →
                    </button>
                    <button onClick={handleOnsiteBooking} disabled={onsiteLoading} className="w-full py-3 bg-accent/20 hover:bg-accent/30 disabled:opacity-50 rounded-2xl text-sm font-bold text-foreground transition-all border border-border">
                      {onsiteLoading ? "処理中..." : "店頭払いで予約する"}
                    </button>
                    <p className="text-[10px] text-muted-foreground text-center">店頭払いの場合、当日現金・PayPay等でお支払いください</p>
                    <button onClick={() => setBookingStep("calendar")} className="w-full py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-all">
                      ← 時間を変更する
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-black text-purple-400 uppercase tracking-widest">開始時間を選ぶ</p>
                    <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-40">
                      {timeSlots.map((t) => (
                        <button key={t} onClick={() => { if(isSlotBooked(t)) return; setSelectedStart(t); }} disabled={isSlotBooked(t)}
                          className={`py-2 rounded-xl text-xs font-black transition-all border ${isSlotBooked(t) ? "opacity-40 cursor-not-allowed line-through bg-accent/5 border-gray-800 text-gray-500" : selectedStart === t ? "bg-purple-600 border-purple-500 text-white" : "bg-accent/10 border-gray-700 text-muted-foreground hover:text-foreground hover:border-gray-500"}`}>
                          {formatTime(t)}
                        </button>
                      ))}
                    </div>
                    {selectedStart !== null && (
                      <>
                        <p className="text-xs font-black text-purple-400 uppercase tracking-widest">利用時間</p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5, 6].map((h) => (
                            <button key={h} onClick={() => setSelectedDuration(h)}
                              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all border ${selectedDuration === h ? "bg-purple-600 border-purple-500 text-white" : "bg-accent/10 border-gray-700 text-muted-foreground hover:text-foreground"}`}>
                              {h}h
                            </button>
                          ))}
                        </div>
                        <div className="bg-accent/10/50 rounded-2xl p-3 flex justify-between items-center">
                          <span className="text-muted-foreground text-xs font-bold">{formatTime(selectedStart)}〜{formatTime(selectedStart + selectedDuration)}</span>
                          <span className="text-purple-400 font-black">¥{totalPrice.toLocaleString()}</span>
                        </div>
                        <button onClick={() => setBookingStep("confirm")} className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-2xl text-sm font-black transition-all">
                          この時間で確認する →
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {(studio.equipmentOptions?.length || 0) > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-5">オプションを追加する</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {(studio.equipmentOptions || []).map((opt, i) => {
                const isSelected = selectedOptions.includes(i);
                const price = opt.priceType === "per_hour" ? opt.pricePerHour * selectedDuration : opt.pricePerHour;
                return (
                  <button key={i} onClick={() => toggleOption(i)}
                    className={`relative bg-card border rounded-2xl p-4 text-left transition-all ${isSelected ? "border-purple-500 bg-purple-900/20" : "border-border hover:border-gray-600"}`}>
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-[10px] font-black">✓</div>
                    )}
                    {opt.imageUrl && (
                      <div className="h-20 rounded-xl overflow-hidden mb-3 bg-accent/10">
                        <img src={opt.imageUrl} alt={opt.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <p className="font-black text-sm text-foreground mb-1">{opt.name}</p>
                    <p className="text-purple-400 font-black text-sm">
                      ¥{opt.pricePerHour.toLocaleString()}
                      <span className="text-gray-600 text-xs font-bold ml-1">{opt.priceType === "per_hour" ? "/h" : "/回"}</span>
                    </p>
                    {isSelected && selectedStart !== null && (
                      <p className="text-purple-300 text-xs font-bold mt-1">小計: ¥{price.toLocaleString()}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </main>
      </div>
    </div>
  );
}