"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createBooking } from "@/actions/booking";
import { useTheme } from "@/lib/theme-context";
import { useLineLiff } from "@/hooks/use-line-liff";
import { StudioProfile } from "@/lib/db-studio";
import { getCurrentUser } from "@/actions/login";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Loader2 } from "lucide-react";

interface BookingModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    studioData?: StudioProfile;
    initialRoomIndex?: string;
    initialDate?: string;
    initialTime?: string;
    initialDuration?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
    isOpen,
    onOpenChange,
    studioData,
    initialRoomIndex,
    initialDate,
    initialTime,
    initialDuration
}) => {
    const { primaryColor } = useTheme();
    const { profile } = useLineLiff();

    const [date, setDate] = useState(initialDate || "");
    const [startTime, setStartTime] = useState(initialTime || "12:00");
    const [duration, setDuration] = useState(initialDuration || "2");
    const [userCount, setUserCount] = useState("4");
    const [selectedRoomIndex, setSelectedRoomIndex] = useState<string>(initialRoomIndex || "0");
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [isStudentDiscount, setIsStudentDiscount] = useState(false);
    const [selectedOtherDiscounts, setSelectedOtherDiscounts] = useState<number[]>([]);
    const [isPersonalPractice, setIsPersonalPractice] = useState(false);
    const [personalPracticeError, setPersonalPracticeError] = useState<string | null>(null);
    const [isSplitPayment, setIsSplitPayment] = useState(false);
    const [optionPaymentMode, setOptionPaymentMode] = useState<"split" | "booker">("split");
    const [guaranteeMode, setGuaranteeMode] = useState<"auth" | "provisional">("auth");
    const [optionsAmount, setOptionsAmount] = useState<number>(0);
    const [myBands, setMyBands] = useState<any[]>([]);
    const [selectedBandId, setSelectedBandId] = useState<string>("");

    // 新規バンド登録用
    const [isCreatingBand, setIsCreatingBand] = useState(false);
    const [newBandName, setNewBandName] = useState("");
    const [isCreatingBandLoading, setIsCreatingBandLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialDate) setDate(initialDate);
            if (initialTime) setStartTime(initialTime);
            if (initialDuration) setDuration(initialDuration);
            if (initialRoomIndex) setSelectedRoomIndex(initialRoomIndex);

            // Fetch bands
            import("@/actions/band").then(({ fetchMyBands }) => {
                fetchMyBands().then(bands => {
                    setMyBands(bands);
                    if (bands.length > 0) setSelectedBandId(bands[0].id);
                });
            });
        }
    }, [isOpen, initialDate, initialTime, initialRoomIndex, initialDuration]);

    const [isLoading, setIsLoading] = useState(false);
    const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
    const [result, setResult] = useState<{ success: boolean, message: string, price?: number, bookingId?: string } | null>(null);

    // Auto-fill user data
    useEffect(() => {
        if (!isOpen) {
            setResult(null);
            setCalculatedPrice(null);
        }
    }, [isOpen]);

    // Price Calculation Effect
    useEffect(() => {
        if (!studioData || !date || !startTime || !duration) return;

        const calculate = () => {
            const room = studioData.rooms[parseInt(selectedRoomIndex)];
            if (!room) return 0;

            const dayOfWeek = new Date(date).getDay(); // 0 = Sun, 6 = Sat
            let schedule = room.pricing.weekday;
            if (dayOfWeek === 6) schedule = room.pricing.saturday;
            if (dayOfWeek === 0) schedule = room.pricing.sundayHoliday;

            if (!schedule || !schedule.slots) return 0;

            let total = 0;
            const startHour = parseInt(startTime.split(':')[0]);
            const durationH = parseInt(duration);

            for (let i = 0; i < durationH; i++) {
                const currentHour = startHour + i;
                const slot = schedule.slots.find(s => {
                    const sStart = parseInt(s.start.split(':')[0]);
                    const sEnd = parseInt(s.end.split(':')[0]);
                    return currentHour >= sStart && currentHour < sEnd;
                });

                if (slot) {
                    let hourPrice = 0;
                    if (slot.pricingType === 'discount' && room.basePrice) {
                        hourPrice = room.basePrice * (1 - (slot.discountRate || 0) / 100);
                    } else {
                        hourPrice = slot.price;
                    }
                    total += hourPrice;
                } else {
                    total += room.basePrice || 0;
                }
            }

            // Options
            let optTotal = 0;
            selectedOptions.forEach(optIndex => {
                const opt = studioData.equipmentOptions[optIndex];
                if (opt) {
                    optTotal += opt.pricePerHour * durationH;
                }
            });
            total += optTotal;
            setOptionsAmount(Math.max(0, Math.floor(optTotal)));

            // Studio-wide Discounts
            if (isStudentDiscount && studioData.studentDiscount?.enabled) {
                if (studioData.studentDiscount.discountType === 'amount') {
                    total -= studioData.studentDiscount.value;
                } else {
                    total = total * (1 - studioData.studentDiscount.value / 100);
                }
            }

            selectedOtherDiscounts.forEach(idx => {
                const d = studioData.otherDiscounts?.[idx];
                if (d && d.enabled) {
                    if (d.discountType === 'amount') {
                        total -= d.value;
                    } else {
                        total = total * (1 - d.value / 100);
                    }
                }
            });

            setCalculatedPrice(Math.max(0, Math.floor(total)));
        };

        if (isOpen && studioData) {
            calculate();
        }
    }, [date, startTime, duration, selectedRoomIndex, selectedOptions, isStudentDiscount, selectedOtherDiscounts, studioData, isOpen, isPersonalPractice]);

    // Personal Practice Window Check
    useEffect(() => {
        if (!isPersonalPractice || !studioData?.personalPracticeSettings?.enabled || !date || !startTime) {
            setPersonalPracticeError(null);
            return;
        }

        const settings = studioData.personalPracticeSettings;
        const targetDateTime = new Date(`${date}T${startTime}`);
        const now = new Date();

        let diffMs = targetDateTime.getTime() - now.getTime();

        if (settings.reservationWindowType === 'days') {
            const diffDays = diffMs / (1000 * 60 * 60 * 24);
            if (diffDays > settings.reservationWindowValue) {
                setPersonalPracticeError(`個人練習は利用日の${settings.reservationWindowValue}日前から予約可能です。`);
                return;
            }
        } else {
            const diffHours = diffMs / (1000 * 60 * 60);
            if (diffHours > settings.reservationWindowValue) {
                setPersonalPracticeError(`個人練習は利用の${settings.reservationWindowValue}時間前から予約可能です。`);
                return;
            }
        }

        setPersonalPracticeError(null);
    }, [isPersonalPractice, date, startTime, studioData]);


    const handleBooking = async () => {
        setIsLoading(true);
        setResult(null);

        // Get User from Cookie if available
        const appUser = await getCurrentUser();
        const userId = appUser?.id || profile?.userId || "guest";

        try {
            const res = await createBooking({
                userId,
                studioId: studioData ? studioData.id : "unknown",
                roomName: studioData ? studioData.rooms[parseInt(selectedRoomIndex)].name : "Generic Room",
                date,
                startTime,
                durationHours: parseInt(duration),
                userCount: parseInt(userCount),
                equipmentIds: selectedOptions.map(i => studioData?.equipmentOptions[i].name || ""),
                totalPriceOverride: calculatedPrice || undefined,
                isPersonalPractice,
                isSplitPayment,
                bandId: isSplitPayment ? selectedBandId : undefined,
                optionPaymentMode: isSplitPayment ? optionPaymentMode : undefined,
                guaranteeMode: isSplitPayment ? guaranteeMode : undefined,
                optionsAmount: isSplitPayment ? optionsAmount : 0
            });
            if (res.success) {
                // If split payment, redirect to the split payment page instead of normal success
                if (isSplitPayment && res.splitPaymentUrl) {
                    window.location.href = res.splitPaymentUrl;
                } else {
                    window.location.href = `/booking/success?id=${res.bookingId}`;
                }
            } else {
                setResult({ success: false, message: res.message });
            }
        } catch (e: any) {
            setResult({ success: false, message: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateBand = async () => {
        if (!newBandName.trim()) return;
        setIsCreatingBandLoading(true);
        try {
            const { createBandAction } = await import("@/actions/band");
            const res = await createBandAction(newBandName.trim());
            if (res.success && res.bandId) {
                const { fetchMyBands } = await import("@/actions/band");
                const bands = await fetchMyBands();
                setMyBands(bands);
                setSelectedBandId(res.bandId);
                setIsCreatingBand(false);
                setNewBandName("");
            } else {
                alert("バンドの作成に失敗しました。");
            }
        } catch (e) {
            alert("エラーが発生しました。");
        } finally {
            setIsCreatingBandLoading(false);
        }
    };

    const toggleOption = (index: number) => {
        if (selectedOptions.includes(index)) {
            setSelectedOptions(selectedOptions.filter(i => i !== index));
        } else {
            setSelectedOptions([...selectedOptions, index]);
        }
    }

    const glowColor = primaryColor === 'neon' ? 'shadow-[0_0_30px_#00ffcc]' :
        primaryColor === 'red' ? 'shadow-[0_0_30px_#ff0055]' : 'shadow-[0_0_30px_#00ccff]';

    // 選択されたオプション名リスト
    const selectedOptionDetails = selectedOptions.map(i => studioData?.equipmentOptions[i]).filter(Boolean);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className={`bg-slate-900 border border-white/10 text-white ${glowColor} max-h-[90vh] overflow-y-auto`}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">スタジオ予約</DialogTitle>
                    <DialogDescription>
                        {studioData ? studioData.storeName : "予約内容を入力してください"}
                    </DialogDescription>
                </DialogHeader>

                {/* Personal Practice Toggle */}
                {studioData?.personalPracticeSettings?.enabled && (
                    <div className="px-4 py-2 bg-cyan-500/10 border-y border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="personal-practice"
                                checked={isPersonalPractice}
                                onCheckedChange={(checked) => {
                                    setIsPersonalPractice(!!checked);
                                    if (checked) {
                                        const max = studioData.personalPracticeSettings?.maxPeople || 2;
                                        if (parseInt(userCount) > max) {
                                            setUserCount(max.toString());
                                        }
                                    }
                                }}
                                className="border-cyan-500 data-[state=checked]:bg-cyan-500"
                            />
                            <Label htmlFor="personal-practice" className="text-sm font-bold text-cyan-400 cursor-pointer">
                                個人練習として予約する
                            </Label>
                        </div>
                        {isPersonalPractice && (
                            <Badge variant="outline" className="text-[10px] text-cyan-400 border-cyan-500/30">
                                最大{studioData.personalPracticeSettings.maxPeople}名
                            </Badge>
                        )}
                    </div>
                )}

                {/* Split Payment Toggle */}
                <div className="px-4 py-3 bg-purple-500/10 border-y border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="split-payment"
                                checked={isSplitPayment}
                                onCheckedChange={(checked) => setIsSplitPayment(!!checked)}
                                className="border-purple-500 data-[state=checked]:bg-purple-500"
                            />
                            <Label htmlFor="split-payment" className="text-sm font-bold text-purple-400 cursor-pointer">
                                割り勘決済を利用する（バンドメンバーと分割払い）
                            </Label>
                        </div>
                    </div>

                    {isSplitPayment && (
                        <div className="pl-6 space-y-4 mt-2 border-l-2 border-purple-500/30">
                            {/* バンド選択 */}
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-gray-300">実施するバンド/プロジェクト</Label>
                                {!isCreatingBand ? (
                                    <>
                                        {myBands.length > 0 ? (
                                            <Select value={selectedBandId} onValueChange={setSelectedBandId}>
                                                <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-8 text-xs">
                                                    <SelectValue placeholder="バンドを選択" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                                    {myBands.map(band => (
                                                        <SelectItem key={band.id} value={band.id}>{band.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <p className="text-[10px] text-amber-400">バンドが登録されていません。</p>
                                        )}
                                        {/* 新規バンド作成ボタン */}
                                        <button
                                            type="button"
                                            onClick={() => setIsCreatingBand(true)}
                                            className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 transition-colors mt-1"
                                        >
                                            <PlusCircle className="h-3 w-3" />
                                            リストにないバンド/プロジェクトを新規登録
                                        </button>
                                    </>
                                ) : (
                                    <div className="space-y-2 bg-purple-900/20 p-3 rounded-lg border border-purple-500/30">
                                        <Label className="text-[11px] text-purple-300 font-bold">バンド/プロジェクト名を入力</Label>
                                        <Input
                                            value={newBandName}
                                            onChange={(e) => setNewBandName(e.target.value)}
                                            placeholder="例: My Rock Band"
                                            className="bg-slate-800 border-slate-700 text-white h-8 text-xs"
                                        />
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                onClick={handleCreateBand}
                                                disabled={isCreatingBandLoading || !newBandName.trim()}
                                                className="bg-purple-600 hover:bg-purple-500 text-white h-7 text-xs flex-1"
                                            >
                                                {isCreatingBandLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : "登録する"}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => { setIsCreatingBand(false); setNewBandName(""); }}
                                                className="text-gray-400 h-7 text-xs"
                                            >
                                                キャンセル
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* オプション料金支払い */}
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-gray-300">オプション料金（機材等）の支払い</Label>
                                <Select value={optionPaymentMode} onValueChange={(v: "split" | "booker") => setOptionPaymentMode(v)}>
                                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-8 text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                        <SelectItem value="split" className="text-xs">割り勘に含める（全員で等分）</SelectItem>
                                        <SelectItem value="booker" className="text-xs">使用した人（予約代表者）が全額負担する</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* 予約確定タイミング */}
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-gray-300">予約の確定タイミング</Label>
                                <Select value={guaranteeMode} onValueChange={(v: "auth" | "provisional") => setGuaranteeMode(v)}>
                                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-8 text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                        <SelectItem value="auth" className="text-xs">代表者枠で確定（未払いリスクは代表者負担）</SelectItem>
                                        <SelectItem value="provisional" className="text-xs">仮予約（全員が期限内に決済して本確定）</SelectItem>
                                    </SelectContent>
                                </Select>
                                {guaranteeMode === 'auth' ? (
                                    <p className="text-[10px] text-gray-400 mt-1">※ 代表者のクレジットカード枠を確保して予約を確定します。メンバーが支払わなかった分は代表者が負担します。</p>
                                ) : (
                                    <p className="text-[10px] text-gray-400 mt-1">※ 全員が期限までに決済しない場合、予約は自動的にキャンセルされます。</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {!result ? (
                    <div className="grid gap-4 py-4">
                        {/* Room Selection */}
                        {studioData && studioData.rooms.length > 0 && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">部屋</Label>
                                <div className="col-span-3">
                                    <Select value={selectedRoomIndex} onValueChange={setSelectedRoomIndex}>
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                            {studioData.rooms.map((room, i) => (
                                                <SelectItem key={i} value={i.toString()}>{room.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">日付</Label>
                            <Input
                                id="date"
                                type="date"
                                className="col-span-3 bg-slate-800 border-slate-700 text-white"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">開始時刻</Label>
                            <div className="col-span-3 flex gap-2">
                                <Input
                                    id="time"
                                    type="time"
                                    className="bg-slate-800 border-slate-700 text-white flex-1"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="duration" className="text-right">利用時間</Label>
                            <div className="col-span-3">
                                <Select value={duration} onValueChange={setDuration}>
                                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                        <SelectValue placeholder="時間を選択" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map(h => (
                                            <SelectItem key={h} value={h.toString()}>{h}時間</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="userCount" className="text-right">人数</Label>
                            <div className="col-span-3">
                                <Select value={userCount} onValueChange={setUserCount}>
                                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                        {(isPersonalPractice && studioData?.personalPracticeSettings)
                                            ? Array.from({ length: studioData.personalPracticeSettings.maxPeople }, (_, i) => i + 1).map(n => (
                                                <SelectItem key={n} value={n.toString()}>{n}名</SelectItem>
                                            ))
                                            : [1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => (
                                                <SelectItem key={n} value={n.toString()}>{n}名</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Discounts */}
                        {studioData && (studioData.studentDiscount?.enabled || (studioData.otherDiscounts && studioData.otherDiscounts.length > 0)) && (
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right pt-2">割引適用</Label>
                                <div className="col-span-3 space-y-2 bg-cyan-950/20 p-3 rounded border border-cyan-500/10">
                                    {studioData.studentDiscount?.enabled && (
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="student-discount"
                                                checked={isStudentDiscount}
                                                onCheckedChange={(checked) => setIsStudentDiscount(!!checked)}
                                                className="border-cyan-500/50 data-[state=checked]:bg-cyan-500"
                                            />
                                            <Label htmlFor="student-discount" className="text-sm cursor-pointer flex-1 flex justify-between items-center">
                                                <span>学割適用</span>
                                                <Badge variant="outline" className="text-[10px] text-cyan-400 border-cyan-500/30">
                                                    -{studioData.studentDiscount.value}{studioData.studentDiscount.discountType === 'percentage' ? '%' : '円'}
                                                </Badge>
                                            </Label>
                                        </div>
                                    )}
                                    {studioData.otherDiscounts?.map((d, i) => d.enabled && (
                                        <div key={i} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`other-discount-${i}`}
                                                checked={selectedOtherDiscounts.includes(i)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) setSelectedOtherDiscounts([...selectedOtherDiscounts, i]);
                                                    else setSelectedOtherDiscounts(selectedOtherDiscounts.filter(idx => idx !== i));
                                                }}
                                                className="border-cyan-500/50 data-[state=checked]:bg-cyan-500"
                                            />
                                            <Label htmlFor={`other-discount-${i}`} className="text-sm cursor-pointer flex-1 flex justify-between items-center">
                                                <span>{d.name}</span>
                                                <Badge variant="outline" className="text-[10px] text-orange-400 border-orange-500/30">
                                                    -{d.value}{d.discountType === 'percentage' ? '%' : '円'}
                                                </Badge>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Options */}
                        {studioData && studioData.equipmentOptions.length > 0 && (
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right pt-2">有料オプション</Label>
                                <div className="col-span-3 space-y-2 bg-slate-800/50 p-3 rounded border border-white/5">
                                    {studioData.equipmentOptions.map((opt, i) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`opt-${i}`}
                                                checked={selectedOptions.includes(i)}
                                                onCheckedChange={() => toggleOption(i)}
                                                className="border-white/50 data-[state=checked]:bg-cyan-500"
                                            />
                                            <Label htmlFor={`opt-${i}`} className="text-sm cursor-pointer flex-1 flex justify-between">
                                                <span>{opt.name}</span>
                                                <span className="text-gray-400">+{opt.pricePerHour}円/h</span>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── 選択済みオプションのサマリー表示 ── */}
                        {selectedOptionDetails.length > 0 && (
                            <div className="mt-2 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                                <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-2">選択中のオプション</div>
                                <div className="space-y-1">
                                    {selectedOptionDetails.map((opt, idx) => (
                                        opt && (
                                            <div key={idx} className="flex justify-between text-xs text-gray-300">
                                                <span>・{opt.name}</span>
                                                <span className="text-purple-300">+¥{(opt.pricePerHour * parseInt(duration)).toLocaleString()}</span>
                                            </div>
                                        )
                                    ))}
                                    <div className="flex justify-between text-xs font-bold border-t border-purple-500/20 pt-1 mt-1 text-purple-300">
                                        <span>オプション合計</span>
                                        <span>+¥{optionsAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Price Preview */}
                        <div className="mt-4 p-4 bg-slate-800 rounded text-center border border-white/10">
                            <div className="text-xs text-gray-400">概算料金</div>
                            <div className="text-3xl font-mono font-bold text-cyan-400">
                                ¥{calculatedPrice ? calculatedPrice.toLocaleString() : "---"}
                            </div>
                        </div>

                        {personalPracticeError && (
                            <div className="p-3 bg-red-900/20 border border-red-500/50 rounded text-red-400 text-xs text-center flex items-center justify-center gap-2">
                                <span className="text-lg">⚠️</span> {personalPracticeError}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-10 text-center space-y-4">
                        {result.success ? (
                            <>
                                <div className="text-4xl">🎉</div>
                                <h3 className="text-xl font-bold text-green-400">予約確定！</h3>
                                <p className="text-2xl font-mono">ご利用料金: ¥{result.price?.toLocaleString()}</p>
                                <p className="text-sm text-gray-400">予約ID: {result.bookingId}</p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold text-red-400">エラー</h3>
                                <p>{result.message}</p>
                            </>
                        )}
                    </div>
                )}

                <DialogFooter>
                    {!result ? (
                        <Button
                            onClick={handleBooking}
                            disabled={isLoading || !date || !studioData || !!personalPracticeError}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all"
                        >
                            {isLoading ? "処理中..." : "予約を確定する"}
                        </Button>
                    ) : (
                        <Button onClick={() => onOpenChange(false)} variant="outline" className="w-full border-white/20 hover:bg-white/10 text-black dark:text-white">
                            閉じる
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
