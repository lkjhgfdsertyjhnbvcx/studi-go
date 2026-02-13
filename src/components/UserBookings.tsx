"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Calendar, Clock, MapPin, AlertCircle, RefreshCw, XCircle, ChevronRight,
    Loader2, DollarSign, ArrowLeft, Printer, Download, Receipt, Save
} from "lucide-react";
import { fetchMyBookings, cancelBookingAction, updateBookingAction } from "@/actions/booking";
import { format, parseISO, isFuture } from "date-fns";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export function UserBookings() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actionId, setActionId] = useState<string | null>(null);
    const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

    // Modification States
    const [isModifyOpen, setIsModifyOpen] = useState(false);
    const [modifyingBooking, setModifyingBooking] = useState<any>(null);
    const [mDate, setMDate] = useState("");
    const [mTime, setMTime] = useState("");
    const [mDuration, setMDuration] = useState("");

    const router = useRouter();

    const load = async () => {
        setIsLoading(true);
        const data = await fetchMyBookings();
        setBookings(data);
        setIsLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleCancel = async (id: string) => {
        if (!confirm("本当にこの予約をキャンセルしますか？")) return;
        setActionId(id);
        const res = await cancelBookingAction(id);
        if (res.success) {
            alert("予約をキャンセルしました。");
            await load();
        } else {
            alert(res.message);
        }
        setActionId(null);
    };

    const openModifyDialog = (booking: any) => {
        setModifyingBooking(booking);
        setMDate(booking.date);
        setMTime(booking.startTime);
        setMDuration(booking.durationHours.toString());
        setIsModifyOpen(true);
    };

    const handleUpdate = async () => {
        if (!modifyingBooking) return;
        setActionId(modifyingBooking.id);
        setIsModifyOpen(false);

        try {
            const res = await updateBookingAction(modifyingBooking.id, {
                date: mDate,
                startTime: mTime,
                durationHours: parseInt(mDuration)
            } as any);

            if (res.success) {
                alert("予約内容を変更しました。");
                await load();
            } else {
                alert(res.message);
            }
        } catch (e: any) {
            alert("通信エラーが発生しました。");
        } finally {
            setActionId(null);
            setModifyingBooking(null);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin h-8 w-8 text-cyan-400" />
                <p className="text-gray-500 font-mono tracking-widest animate-pulse">AUTHORIZING ACCESS...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Back Button */}
            <div className="flex justify-start mb-4">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-gray-500 hover:text-white group flex items-center gap-2 px-0"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <span className="text-xs font-mono tracking-tighter">BACK() // RETURN TO PREVIOUS</span>
                </Button>
            </div>

            <header className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-1.5 bg-cyan-500 rounded-full"></div>
                    <div>
                        <h1 className="text-6xl font-black italic tracking-tighter text-white uppercase leading-none">
                            My Bookings
                        </h1>
                        <p className="text-gray-500 font-mono text-sm mt-2 uppercase tracking-[0.3em]">RESERVATION_HISTORY_v.4.1</p>
                    </div>
                </div>
            </header>

            {bookings.length === 0 ? (
                <Card className="bg-slate-900/50 border-white/5 border-dashed py-20 flex flex-col items-center gap-6">
                    <div className="p-4 bg-white/5 rounded-full">
                        <Calendar className="h-10 w-10 text-gray-700" />
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-xl font-bold text-gray-400">予約履歴がありません</h2>
                        <p className="text-gray-600 text-sm">次回のセッションを予約しましょう</p>
                    </div>
                    <Button onClick={() => router.push('/studios')} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
                        スタジオを探す
                    </Button>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {bookings.map((booking) => {
                        const canModify = isFuture(parseISO(booking.date)) && booking.status !== 'cancelled';
                        const isActioned = actionId === booking.id;

                        return (
                            <Card key={booking.id} className={`bg-slate-900 border-white/10 overflow-hidden group transition-all hover:border-cyan-500/30 ${booking.status === 'cancelled' ? 'opacity-50 grayscale' : ''}`}>
                                <div className="flex flex-col md:flex-row">
                                    <div className="p-8 flex-1 space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-1">ID: {booking.id}</div>
                                                <h3 className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase italic">{booking.studioName}</h3>
                                            </div>
                                            <Badge variant="outline" className={`px-4 py-1 rounded-full border-none font-bold text-[10px] ${booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                                                booking.status === 'modified' ? 'bg-orange-500/10 text-orange-400' : 'bg-green-500/10 text-green-400'
                                                }`}>
                                                {booking.status?.toUpperCase() || 'FULLY_RESERVED'}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/5 pt-6">
                                            <div className="space-y-1">
                                                <div className="text-[10px] text-gray-600 uppercase flex items-center gap-1 font-bold tracking-widest"><Calendar className="h-3 w-3" /> Date</div>
                                                <div className="text-sm font-black text-white">{format(parseISO(booking.date), "yyyy.MM.dd")}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[10px] text-gray-600 uppercase flex items-center gap-1 font-bold tracking-widest"><Clock className="h-3 w-3" /> Time / Slot</div>
                                                <div className="text-sm font-black text-white">{booking.startTime} ({booking.durationHours}h)</div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[10px] text-gray-600 uppercase flex items-center gap-1 font-bold tracking-widest"><MapPin className="h-3 w-3" /> Zone / Studio</div>
                                                <div className="text-sm font-black text-white">{booking.roomName || "Main Hall"}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[10px] text-gray-600 uppercase flex items-center gap-1 font-bold tracking-widest"><DollarSign className="h-3 w-3" /> Ledger Value</div>
                                                <div className="text-sm font-black text-cyan-400">¥{booking.totalPrice.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 md:w-56 p-6 flex md:flex-col gap-3 justify-center items-center border-t md:border-t-0 md:border-l border-white/5">
                                        {canModify ? (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full text-xs font-bold text-gray-400 hover:text-white border border-white/5 hover:border-white/20"
                                                    disabled={isActioned}
                                                    onClick={() => openModifyDialog(booking)}
                                                >
                                                    {isActioned && modifyingBooking?.id === booking.id ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <RefreshCw className="h-3 w-3 mr-2" />}
                                                    MODIFY
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full text-xs font-bold text-red-500 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30"
                                                    disabled={isActioned}
                                                    onClick={() => handleCancel(booking.id)}
                                                >
                                                    {isActioned && modifyingBooking === null ? <Loader2 className="h-3 w-3 animate-spin" /> : <XCircle className="h-3 w-3 mr-2" />}
                                                    CANCEL
                                                </Button>
                                            </>
                                        ) : (
                                            <div className="text-[9px] text-gray-600 italic font-mono mb-2 uppercase">LOCKED // RECORD_ONLY</div>
                                        )}
                                        {booking.paymentStatus === 'paid' ? (
                                            <Button
                                                variant="ghost"
                                                className="w-full text-xs font-bold text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/10 hover:border-cyan-500/30"
                                                onClick={() => setSelectedReceipt(booking)}
                                            >
                                                <Receipt className="h-3 w-3 mr-2" /> RECEIPT
                                            </Button>
                                        ) : (
                                            <div className="text-[10px] text-orange-500 font-mono font-bold uppercase py-2 px-4 border border-orange-500/20 bg-orange-500/5 rounded text-center w-full">
                                                UNPAID // 支払い待ち
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            <section className="bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-3xl shadow-2xl">
                <div className="flex items-start gap-6">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/30">
                        <AlertCircle className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-black text-white uppercase italic">Security & Policy Log</h4>
                        <p className="text-gray-500 text-xs leading-relaxed font-mono uppercase tracking-tighter">
                            SYS_POLICY: Cancellation window is 24 hours prior to initiation.
                            Unauthorized absences may result in restricted access or financial penalties.
                            Ledger records are permanently archived.
                        </p>
                    </div>
                </div>
            </section>

            {/* Modification Modal */}
            <Dialog open={isModifyOpen} onOpenChange={setIsModifyOpen}>
                <DialogContent className="bg-slate-950 border border-white/10 text-white shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">Modify Session Details</DialogTitle>
                        <DialogDescription className="text-gray-500 uppercase text-[10px] font-mono">
                            Update your reservation for {modifyingBooking?.studioName}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">New Date</Label>
                            <Input
                                type="date"
                                className="bg-white/5 border-white/10 text-white focus:border-cyan-500 transition-colors"
                                value={mDate}
                                onChange={(e) => setMDate(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Start Time</Label>
                                <Input
                                    type="time"
                                    className="bg-white/5 border-white/10 text-white focus:border-cyan-500 transition-colors"
                                    value={mTime}
                                    onChange={(e) => setMTime(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Duration (h)</Label>
                                <Select value={mDuration} onValueChange={setMDuration}>
                                    <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-cyan-500">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                                        {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(h => (
                                            <SelectItem key={h} value={h.toString()}>{h}時間</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/20">
                            <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest leading-relaxed">
                                ※ 変更により料金が変動する場合があります。また、空き状況によっては変更できないことがございます。
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button variant="ghost" className="text-xs text-gray-500 hover:text-white" onClick={() => setIsModifyOpen(false)}>
                            CANCEL Changes
                        </Button>
                        <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase italic" onClick={handleUpdate}>
                            <Save className="h-4 w-4 mr-2" /> Commit modification
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Receipt Modal */}
            <Dialog open={!!selectedReceipt} onOpenChange={(open) => !open && setSelectedReceipt(null)}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-lg border-none shadow-2xl">
                    <div className="p-10 space-y-8 print:p-0" id="receipt-content">
                        <DialogHeader className="flex flex-row justify-between items-start border-b-4 border-black pb-6">
                            <div className="space-y-1">
                                <h2 className="text-4xl font-black italic uppercase tracking-tighter">領収書</h2>
                                <p className="text-[10px] font-mono uppercase text-gray-500">決済記録 // Studi-Go</p>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-mono font-bold uppercase text-gray-400">発行日</div>
                                <div className="text-sm font-black">{format(new Date(), "yyyy年MM月dd日")}</div>
                            </div>
                        </DialogHeader>

                        {selectedReceipt && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-mono uppercase text-gray-500">サービス提供者</p>
                                        <p className="text-xl font-bold uppercase">{selectedReceipt.studioName}</p>
                                        {selectedReceipt.invoiceNumber && (
                                            <div className="bg-gray-100 px-2 py-1 rounded inline-block">
                                                <p className="text-[9px] font-bold text-gray-600">適格事業者番号: {selectedReceipt.invoiceNumber}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="text-[10px] font-mono uppercase text-gray-500">取引ID</p>
                                        <p className="text-xs font-mono font-bold">#{selectedReceipt.id.toUpperCase()}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                    <h3 className="text-[10px] font-mono uppercase text-gray-500 mb-4 border-b pb-2">ご利用明細</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm font-bold">
                                            <span>スタジオ利用料 ({selectedReceipt.durationHours}時間)</span>
                                            <span>¥{selectedReceipt.totalPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="text-[11px] text-gray-500 font-mono">
                                            部屋: {selectedReceipt.roomName} / 日時: {selectedReceipt.date} {selectedReceipt.startTime}~
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end border-t border-black pt-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono uppercase text-gray-500 text-left">ステータス</p>
                                        <Badge variant="outline" className="bg-black text-white border-none font-black text-[10px] px-3">
                                            {selectedReceipt.paymentStatus === 'paid' ? '入金済み' : '確定済み'}
                                        </Badge>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-mono uppercase text-gray-500">合計金額 (税込)</p>
                                        <p className="text-5xl font-black italic tracking-tighter leading-none">¥{selectedReceipt.totalPrice.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <footer className="text-[8px] font-mono uppercase text-gray-400 text-center leading-normal pt-10 border-t border-gray-100 mt-10">
                            本領収書はStudi-Goのデータベースに記録された決済情報を元に作成されています。<br />
                            税務上の詳細については、各スタジオまたは運営者までお問い合わせください。
                        </footer>
                    </div>

                    <div className="bg-gray-100 p-4 flex gap-3 justify-end print:hidden">
                        <Button variant="outline" className="border-gray-300 text-gray-600 hover:text-black font-bold h-10" onClick={() => setSelectedReceipt(null)}>
                            閉じる
                        </Button>
                        <Button className="bg-black text-white hover:bg-gray-800 font-black h-10 px-6 group" onClick={handlePrint}>
                            <Printer className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" /> 印刷 / PDF保存
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
