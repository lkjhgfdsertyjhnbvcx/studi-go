"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchStudio, updateStudio } from "@/actions/studio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ArrowLeft, Save, Calendar, Building2, BarChart3, Users, Ban, ShieldCheck, Mail, Lock, UserMinus, MapPin } from "lucide-react";
import { ImageUpload } from "@/components/ui-custom/ImageUpload";
import { StudioBookings } from "@/components/admin/StudioBookings";
import { StudioAnalytics } from "@/components/admin/StudioAnalytics";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { v4 as uuidv4 } from 'uuid';


// Reuse schema logic (simplified copy for now to speed up, ideally shared)
const timeSlotSchema = z.object({
    start: z.string(),
    end: z.string(),
    pricingType: z.enum(['fixed', 'discount']).default('fixed'),
    price: z.coerce.number().min(0).default(0),
    discountRate: z.coerce.number().min(0).max(100).default(0),
});
const dayScheduleSchema = z.object({
    slots: z.array(timeSlotSchema),
});
const roomSchema = z.object({
    // We should probably generate ID for rooms too
    name: z.string().min(1, "スタジオ名は必須です"),
    description: z.string().optional(),
    images: z.array(z.string()).optional(), // Changed to array
    basePrice: z.coerce.number().min(0).default(2000),
    pricing: z.object({
        weekday: dayScheduleSchema,
        saturday: dayScheduleSchema,
        sundayHoliday: dayScheduleSchema,
    }),
});
const equipmentOptionSchema = z.object({
    name: z.string().min(1, "機材名は必須です"),
    pricePerHour: z.coerce.number().min(0),
});

const staffMemberSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "名前は必須です"),
    email: z.string().email("無効なメールアドレスです"),
    password: z.string().optional(),
    role: z.enum(['admin', 'staff'] as const),
    createdAt: z.string(),
});

const blacklistEntrySchema = z.object({
    userId: z.string(),
    userName: z.string(),
    email: z.string().optional(),
    reason: z.string().min(1, "理由は必須です"),
    createdAt: z.string(),
});

const designSettingsSchema = z.object({
    logoSize: z.coerce.number().min(10).max(250).default(100),
    backgroundColor: z.string().default("#000000"),
    backgroundImageUrl: z.string().optional(),
    backgroundType: z.enum(['color', 'image']).default('color'),
    showMap: z.boolean().default(true),
});

const formSchema = z.object({
    id: z.string(), // ID is required
    storeName: z.string().min(1, "店舗名は必須です"),
    companyName: z.string().optional(),
    representative: z.string().optional(),
    representativeEmail: z.string().email("有効なメールアドレスを入力してください").optional().or(z.literal("")),
    manager: z.string().optional(),
    contactPerson: z.string().optional(),
    contactPersonEmail: z.string().email("有効なメールアドレスを入力してください").optional().or(z.literal("")),
    postalCode: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    businessHours: z.object({
        weekday: z.string().optional(),
        saturday: z.string().optional(),
        sundayHoliday: z.string().optional(),
    }),
    url: z.string().optional(),
    studioCount: z.coerce.number().optional(),
    rooms: z.array(roomSchema),
    equipmentOptions: z.array(equipmentOptionSchema),
    appealPoint: z.string().optional(),
    // We will handle images as a newline-separated string in the UI for simplicity, then parse to array
    images: z.array(z.string()).optional(), // Store images array
    monthlyRevenueTarget: z.coerce.number().optional().default(500000),
    logoUrl: z.string().optional(),
    invoiceNumber: z.string().optional(),
    studentDiscount: z.object({
        enabled: z.boolean().default(false),
        discountType: z.enum(['amount', 'percentage']).default('amount'),
        value: z.coerce.number().default(0),
    }).optional(),
    otherDiscounts: z.array(z.object({
        name: z.string().min(1, "割引名は必須です"),
        enabled: z.boolean().default(true),
        discountType: z.enum(['amount', 'percentage']).default('amount'),
        value: z.coerce.number().default(0),
    })).optional().default([]),
    personalPracticeSettings: z.object({
        enabled: z.boolean().default(true),
        reservationWindowType: z.enum(['hours', 'days']).default('days'),
        reservationWindowValue: z.coerce.number().default(1),
        maxPeople: z.coerce.number().default(2),
    }).optional(),
    staff: z.array(staffMemberSchema).optional().default([]),
    blacklist: z.array(blacklistEntrySchema).optional().default([]),
    designSettings: designSettingsSchema.optional(),
});

const defaultTimeSlots: { start: string; end: string; price: number; pricingType: "fixed" | "discount"; discountRate: number }[] = [
    { start: "10:00", end: "18:00", price: 2000, pricingType: 'fixed', discountRate: 0 },
    { start: "18:00", end: "24:00", price: 2500, pricingType: 'fixed', discountRate: 0 }
];

export default function StudioEditPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"settings" | "bookings" | "analytics" | "staff" | "blacklist">("settings");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            id: id,
            storeName: "",
            rooms: [],
            equipmentOptions: [],
            businessHours: {},
            appealPoint: "",
            images: [],
            monthlyRevenueTarget: 500000,
            logoUrl: "",
            staff: [],
            blacklist: [],
            designSettings: { logoSize: 100, backgroundColor: "#000000", backgroundType: 'color', showMap: true }
        },
    });

    const { fields: roomFields, append: appendRoom, remove: removeRoom } = useFieldArray({
        control: form.control,
        name: "rooms"
    });

    const { fields: equipmentFields, append: appendEquipment, remove: removeEquipment } = useFieldArray({
        control: form.control,
        name: "equipmentOptions"
    });

    const { fields: staffFields, append: appendStaff, remove: removeStaff } = useFieldArray({
        control: form.control,
        name: "staff"
    });

    const { fields: otherDiscountFields, append: appendOtherDiscount, remove: removeOtherDiscount } = useFieldArray({
        control: form.control,
        name: "otherDiscounts"
    });

    const { fields: blacklistFields, append: appendBlacklist, remove: removeBlacklist } = useFieldArray({
        control: form.control,
        name: "blacklist"
    });

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            const data = await fetchStudio(id);
            if (!data) {
                alert("Studio not found");
                router.push("/admin/studios");
                return;
            }
            form.reset({
                ...data,
                // Ensure arrays and transform room images
                rooms: data.rooms?.map((r: any) => ({
                    ...r,
                    basePrice: r.basePrice || 2000,
                    images: r.images || [], // Ensure array
                    pricing: {
                        weekday: { slots: r.pricing?.weekday?.slots?.map((s: any) => ({ ...s, pricingType: s.pricingType || 'fixed', discountRate: s.discountRate || 0 })) || [] },
                        saturday: { slots: r.pricing?.saturday?.slots?.map((s: any) => ({ ...s, pricingType: s.pricingType || 'fixed', discountRate: s.discountRate || 0 })) || [] },
                        sundayHoliday: { slots: r.pricing?.sundayHoliday?.slots?.map((s: any) => ({ ...s, pricingType: s.pricingType || 'fixed', discountRate: s.discountRate || 0 })) || [] },
                    }
                })) || [],
                equipmentOptions: data.equipmentOptions || [],
                // Join array to string for textarea
                images: data.images || [], // Ensure array
                appealPoint: data.appealPoint || "",
                monthlyRevenueTarget: data.monthlyRevenueTarget || 500000,
                logoUrl: data.logoUrl || "",
                studentDiscount: data.studentDiscount || { enabled: false, discountType: 'amount', value: 0 },
                otherDiscounts: data.otherDiscounts || [],
                personalPracticeSettings: data.personalPracticeSettings || { enabled: true, reservationWindowType: 'days', reservationWindowValue: 1, maxPeople: 2 },
                staff: data.staff || [],
                blacklist: data.blacklist || [],
                designSettings: data.designSettings || { logoSize: 100, backgroundColor: "#000000", backgroundType: 'color', showMap: true }
            });
            setIsLoading(false);
        };
        load();
    }, [id, router, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSaving(true);
        console.log("Saving studio data:", values);
        try {
            // @ts-ignore
            const res = await updateStudio(values);
            if (res.success) {
                alert("保存しました");
            } else {
                alert("保存失敗: " + res.message);
            }
        } catch (error: any) {
            console.error("Save Error:", error);
            alert("通信エラーが発生しました: " + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const addDefaultRoom = () => {
        appendRoom({
            name: `Studio ${roomFields.length + 1}`,
            description: "",
            images: [],
            basePrice: 2000,
            pricing: {
                weekday: { slots: [...defaultTimeSlots] },
                saturday: { slots: [...defaultTimeSlots] },
                sundayHoliday: { slots: [...defaultTimeSlots] }
            }
        });
    };

    if (isLoading) return <div className="p-20 text-white">Loading...</div>;

    const showSaveButton = ["settings", "staff", "blacklist"].includes(activeTab);

    return (
        <Form {...form}>
            <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans pb-40">
                <div className="max-w-5xl mx-auto space-y-6">
                    <Button variant="ghost" className="text-gray-400 pl-0 hover:text-white" onClick={() => router.push("/admin/studios")}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> ストア一覧に戻る
                    </Button>

                    <header className="flex justify-between items-center border-b border-white/10 pb-4">
                        <div className="flex items-center gap-4">
                            {form.watch("logoUrl") ? (
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-black shadow-lg">
                                    <img src={form.watch("logoUrl")} alt="Logo" className="object-contain w-full h-full" />
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400">
                                    <Building2 className="w-8 h-8" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl font-bold text-cyan-400 mb-2">店舗管理: {form.watch("storeName")}</h1>
                                <p className="text-gray-400">ID: {id}</p>
                            </div>
                        </div>
                        {showSaveButton && (
                            <Button
                                type="button"
                                disabled={isSaving}
                                onClick={form.handleSubmit(onSubmit, (errors) => {
                                    console.error("Validation Errors:", errors);
                                    const errorFields = Object.keys(errors).join(", ");
                                    alert(`入力内容に不備があります。以下の項目を確認してください:\n${errorFields}`);
                                    const firstError = document.querySelector('[aria-invalid="true"]');
                                    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                })}
                                className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 shadow-[0_0_20px_rgba(6,182,212,0.4)] min-w-[140px]"
                            >
                                {isSaving ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                                        保存中...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2"><Save className="w-4 h-4" /> 設定を保存</span>
                                )}
                            </Button>
                        )}
                    </header>

                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-white/10">
                        <button
                            onClick={() => setActiveTab("settings")}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === "settings"
                                ? "text-cyan-400 border-b-2 border-cyan-400"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            店舗設定
                        </button>
                        <button
                            onClick={() => setActiveTab("bookings")}
                            className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${activeTab === "bookings"
                                ? "text-cyan-400 border-b-2 border-cyan-400"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Calendar className="h-4 w-4" />
                            予約状況
                        </button>
                        <button
                            onClick={() => setActiveTab("analytics")}
                            className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${activeTab === "analytics"
                                ? "text-cyan-400 border-b-2 border-cyan-400"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <BarChart3 className="h-4 w-4" />
                            分析レポート
                        </button>
                        <button
                            onClick={() => setActiveTab("staff")}
                            className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${activeTab === "staff"
                                ? "text-cyan-400 border-b-2 border-cyan-400"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Users className="h-4 w-4" />
                            スタッフ管理
                        </button>
                        <button
                            onClick={() => setActiveTab("blacklist")}
                            className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${activeTab === "blacklist"
                                ? "text-cyan-400 border-b-2 border-cyan-400"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Ban className="h-4 w-4" />
                            ブラックリスト
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === "bookings" ? (
                        <StudioBookings studioId={id} />
                    ) : activeTab === "analytics" ? (
                        <StudioAnalytics studioId={id} />
                    ) : (
                        <form className="space-y-12" onSubmit={form.handleSubmit(onSubmit)}>
                            {/* --- STAFF MANAGEMENT TAB --- */}
                            {activeTab === "staff" && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold border-l-4 border-cyan-500 pl-3">スタッフ管理</h2>
                                        <Button type="button" onClick={() => appendStaff({ id: uuidv4(), name: "", email: "", role: "staff", createdAt: new Date().toISOString() })} className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold">
                                            <Plus className="mr-2 h-4 w-4" /> スタッフを追加
                                        </Button>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {staffFields.map((item, index) => (
                                            <Card key={item.id} className="bg-slate-900 border-white/10 p-4">
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <Badge variant="outline" className="text-cyan-400 border-cyan-500/30 bg-cyan-500/5">
                                                            {form.watch(`staff.${index}.role`) === 'admin' ? <ShieldCheck className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                                                            {form.watch(`staff.${index}.role`)?.toUpperCase()}
                                                        </Badge>
                                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeStaff(index)} className="text-gray-500 hover:text-red-400">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <FormField
                                                        control={form.control}
                                                        name={`staff.${index}.name`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs text-gray-500">名前</FormLabel>
                                                                <FormControl><Input {...field} className="bg-black border-white/10" /></FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`staff.${index}.email`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs text-gray-500 flex items-center gap-1"><Mail className="w-3 h-3" /> メールアドレス</FormLabel>
                                                                <FormControl><Input {...field} type="email" className="bg-black border-white/10" /></FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`staff.${index}.password`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs text-gray-500 flex items-center gap-1"><Lock className="w-3 h-3" /> パスワード (変更する場合のみ入力)</FormLabel>
                                                                <FormControl><Input {...field} type="password" placeholder="••••••••" className="bg-black border-white/10" /></FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`staff.${index}.role`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs text-gray-500">権限</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="bg-black border-white/10">
                                                                            <SelectValue placeholder="権限を選択" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                                        <SelectItem value="admin">管理者 (全機能)</SelectItem>
                                                                        <SelectItem value="staff">スタッフ (予約・接客のみ)</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </Card>
                                        ))}
                                        {staffFields.length === 0 && (
                                            <div className="col-span-2 py-20 text-center border border-dashed border-white/10 rounded text-gray-500">
                                                スタッフが登録されていません。
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* --- BLACKLIST TAB --- */}
                            {activeTab === "blacklist" && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold border-l-4 border-red-500 pl-3 text-red-400 lowercase">// BLACKLIST</h2>
                                        <Button type="button" onClick={() => appendBlacklist({ userId: uuidv4(), userName: "", email: "", reason: "", createdAt: new Date().toISOString() })} className="bg-red-900/40 hover:bg-red-800 text-red-200 border border-red-500/30">
                                            <UserMinus className="mr-2 h-4 w-4" /> ユーザーを拒否
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        {blacklistFields.map((item, index) => (
                                            <Card key={item.id} className="bg-red-950/5 border-red-500/20 p-6">
                                                <div className="flex flex-col md:flex-row gap-6">
                                                    <div className="flex-1 grid md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`blacklist.${index}.userName`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-xs text-red-400">対象者名</FormLabel>
                                                                    <FormControl><Input {...field} placeholder="氏名" className="bg-black border-red-500/20 focus:border-red-500 text-white" /></FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name={`blacklist.${index}.email`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-xs text-red-400">メールアドレス</FormLabel>
                                                                    <FormControl><Input {...field} type="email" placeholder="example@bad-user.com" className="bg-black border-red-500/20 focus:border-red-500 text-white" /></FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <div className="md:col-span-2">
                                                            <FormField
                                                                control={form.control}
                                                                name={`blacklist.${index}.reason`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-xs text-red-400">理由 (店舗内メモ)</FormLabel>
                                                                        <FormControl><Textarea {...field} placeholder="無断キャンセル、機材の破損行為など" className="bg-black border-red-500/20 focus:border-red-500 min-h-[80px]" /></FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col justify-between items-end">
                                                        <Button type="button" variant="ghost" onClick={() => removeBlacklist(index)} className="text-red-500 hover:bg-red-900/20">
                                                            <Trash2 className="h-5 w-5 mr-2" /> 削除
                                                        </Button>
                                                        <div className="text-[10px] text-red-900">{form.watch(`blacklist.${index}.createdAt`) && `登録日: ${new Date(form.watch(`blacklist.${index}.createdAt`)).toLocaleDateString()}`}</div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                        {blacklistFields.length === 0 && (
                                            <div className="py-20 text-center border border-dashed border-red-500/10 rounded text-red-900/50">
                                                現在、ブラックリストに登録されているユーザーはいません。
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* --- SETTINGS TAB --- */}
                            {activeTab === "settings" && (
                                <div className="space-y-12">
                                    {/* --- BASIC INFO --- */}
                                    <section className="space-y-4">
                                        <h2 className="text-xl font-bold border-l-4 border-cyan-500 pl-3">基本情報</h2>
                                        <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-900/50 rounded-lg border border-white/10">
                                            <div className="col-span-2 flex flex-col md:flex-row gap-6 items-start pb-6 border-b border-white/5">
                                                <FormField control={form.control} name="logoUrl" render={({ field }) => (
                                                    <FormItem className="flex-shrink-0">
                                                        <FormLabel>店舗ロゴ</FormLabel>
                                                        <FormControl>
                                                            <div className="flex items-center gap-4">
                                                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-dashed border-white/10 bg-black group hover:border-cyan-500/50 transition-colors">
                                                                    {field.value ? (
                                                                        <>
                                                                            <img src={field.value} alt="Logo" className="object-contain w-full h-full" />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => field.onChange("")}
                                                                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                                                            >
                                                                                <Trash2 className="text-white h-6 w-6" />
                                                                            </button>
                                                                        </>
                                                                    ) : (
                                                                        <label className="inset-0 absolute flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:text-cyan-400 transition-colors">
                                                                            <Plus className="h-6 w-6 mb-1" />
                                                                            <span className="text-[10px]">ロゴ追加</span>
                                                                            <input
                                                                                type="file"
                                                                                className="hidden"
                                                                                accept="image/*"
                                                                                onChange={async (e) => {
                                                                                    const file = e.target.files?.[0];
                                                                                    if (file) {
                                                                                        const reader = new FileReader();
                                                                                        reader.onloadend = () => {
                                                                                            field.onChange(reader.result as string);
                                                                                        };
                                                                                        reader.readAsDataURL(file);
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </label>
                                                                    )}
                                                                </div>
                                                                <div className="text-[10px] text-gray-500 max-w-[150px]">
                                                                    サイドバーや予約画面に表示される正方形のロゴをアップロードしてください。
                                                                </div>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />

                                                <div className="flex-1 grid gap-4 w-full">
                                                    <FormField control={form.control} name="storeName" render={({ field }) => (
                                                        <FormItem><FormLabel>店舗名 *</FormLabel><FormControl><Input {...field} className="bg-black border-white/20" /></FormControl><FormMessage /></FormItem>
                                                    )} />
                                                    <FormField control={form.control} name="companyName" render={({ field }) => (
                                                        <FormItem><FormLabel>会社名</FormLabel><FormControl><Input {...field} className="bg-black border-white/20" /></FormControl><FormMessage /></FormItem>
                                                    )} />
                                                    <FormField control={form.control} name="invoiceNumber" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>適格事業者番号 (インボイス番号)</FormLabel>
                                                            <FormControl><Input {...field} placeholder="T1234567890123" className="bg-black border-white/20 font-mono text-cyan-400" /></FormControl>
                                                            <FormDescription className="text-[10px]">領収書に記載されます。</FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </div>
                                            </div>
                                            <FormField control={form.control} name="studioCount" render={({ field }) => (
                                                <FormItem><FormLabel>スタジオ数 *</FormLabel><FormControl><Input type="number" {...field} className="bg-black border-white/20" /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="url" render={({ field }) => (
                                                <FormItem><FormLabel>Webサイト URL *</FormLabel><FormControl><Input {...field} className="bg-black border-white/20" /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="monthlyRevenueTarget" render={({ field }) => (
                                                <FormItem><FormLabel>月間売上目標 (¥)</FormLabel><FormControl><Input type="number" {...field} className="bg-black border-white/20 font-mono text-orange-400" /></FormControl><FormDescription className="text-[10px]">分析ページでの予実管理に使用します。</FormDescription><FormMessage /></FormItem>
                                            )} />

                                            <div className="col-span-2">
                                                <FormField control={form.control} name="appealPoint" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>アピールポイント (店舗の特徴など)</FormLabel>
                                                        <FormControl>
                                                            <Textarea {...field} className="bg-black border-white/20 min-h-[100px]" placeholder="最高の音響体験。プロ仕様の機材が使い放題です。" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>

                                            <div className="col-span-2">
                                                <FormField control={form.control} name="images" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>店舗写真</FormLabel>
                                                        <FormControl>
                                                            <ImageUpload
                                                                value={field.value || []}
                                                                onChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        </div>
                                    </section>

                                    {/* --- DESIGN SETTINGS --- */}
                                    <section className="space-y-4">
                                        <h2 className="text-xl font-bold border-l-4 border-emerald-500 pl-3">デザイン設定 (公開ページ)</h2>
                                        <Card className="bg-slate-900 border-white/10 p-6">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                {/* Logo Settings */}
                                                <div className="space-y-6">
                                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                                        <Building2 className="w-4 h-4 text-emerald-500" /> ロゴ設定
                                                    </h3>
                                                    <FormField control={form.control} name="designSettings.logoSize" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>ロゴの大きさ (%)</FormLabel>
                                                            <FormControl>
                                                                <div className="flex items-center gap-4">
                                                                    <Input type="range" min="20" max="250" step="5" value={field.value} onChange={(e) => field.onChange(parseInt(e.target.value))} className="accent-emerald-500 flex-1" />
                                                                    <span className="text-sm font-mono w-12 text-emerald-400">{field.value}%</span>
                                                                </div>
                                                            </FormControl>
                                                            <FormDescription className="text-[10px]">公開ページのヘッダーに表示されるロゴのサイズを調整します。</FormDescription>
                                                        </FormItem>
                                                    )} />
                                                    <div className="p-4 bg-black rounded border border-white/5 flex items-center justify-center min-h-[140px] relative overflow-hidden">
                                                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                                                        <img
                                                            src={form.watch("logoUrl") || "https://placehold.co/200x200?text=No+Logo"}
                                                            alt="Preview"
                                                            style={{ width: `${form.watch("designSettings.logoSize")}%`, maxWidth: '100%' }}
                                                            className="object-contain max-h-[120px] relative z-10 transition-all duration-300"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Background Settings */}
                                                <div className="space-y-6">
                                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-emerald-500" /> 背景設定
                                                    </h3>
                                                    <FormField control={form.control} name="designSettings.backgroundType" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>背景の種類</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className="bg-black border-white/10 text-white"><SelectValue /></SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                                    <SelectItem value="color">単色</SelectItem>
                                                                    <SelectItem value="image">画像</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormItem>
                                                    )} />

                                                    {form.watch("designSettings.backgroundType") === 'color' ? (
                                                        <FormField control={form.control} name="designSettings.backgroundColor" render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>背景色</FormLabel>
                                                                <FormControl>
                                                                    <div className="flex gap-2 items-center">
                                                                        <Input type="color" {...field} className="w-12 h-10 p-1 bg-black border-white/10 rounded overflow-hidden" />
                                                                        <Input type="text" {...field} className="bg-black border-white/10 font-mono text-emerald-400" />
                                                                    </div>
                                                                </FormControl>
                                                            </FormItem>
                                                        )} />
                                                    ) : (
                                                        <FormField control={form.control} name="designSettings.backgroundImageUrl" render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>背景画像</FormLabel>
                                                                <FormControl>
                                                                    <div className="space-y-4">
                                                                        <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-dashed border-white/10 bg-black group hover:border-emerald-500/50 transition-colors">
                                                                            {field.value ? (
                                                                                <>
                                                                                    <img src={field.value} alt="Background" className="object-cover w-full h-full" />
                                                                                    <button type="button" onClick={() => field.onChange("")} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                                                        <Trash2 className="text-white h-6 w-6" />
                                                                                    </button>
                                                                                </>
                                                                            ) : (
                                                                                <label className="inset-0 absolute flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:text-emerald-400 transition-colors">
                                                                                    <Plus className="h-6 w-6 mb-1" />
                                                                                    <span className="text-[10px]">画像を選択</span>
                                                                                    <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                                                                        const file = e.target.files?.[0];
                                                                                        if (file) {
                                                                                            const reader = new FileReader();
                                                                                            reader.onloadend = () => field.onChange(reader.result as string);
                                                                                            reader.readAsDataURL(file);
                                                                                        }
                                                                                    }} />
                                                                                </label>
                                                                            )}
                                                                        </div>
                                                                        <FormDescription className="text-[10px]">公開ページの背景全面に表示されます。</FormDescription>
                                                                    </div>
                                                                </FormControl>
                                                            </FormItem>
                                                        )} />
                                                    )}
                                                </div>

                                                {/* Map Settings */}
                                                <div className="space-y-6 md:col-span-2 border-t border-white/10 pt-6">
                                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-emerald-500" /> 地図設定
                                                    </h3>
                                                    <FormField control={form.control} name="designSettings.showMap" render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                                                            <div className="space-y-0.5">
                                                                <FormLabel className="text-base">Google Mapsを表示する</FormLabel>
                                                                <FormDescription className="text-xs">
                                                                    スタジオ詳細ページに地図を表示します。表示するには住所が正しく入力されている必要があります。
                                                                </FormDescription>
                                                            </div>
                                                            <FormControl>
                                                                <Switch
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    className="data-[state=checked]:bg-emerald-500"
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )} />
                                                </div>
                                            </div>
                                        </Card>
                                    </section>

                                    {/* --- LOCATION & CONTACT --- */}
                                    <section className="space-y-4">
                                        <h2 className="text-xl font-bold border-l-4 border-cyan-500 pl-3">店舗所在地・連絡先</h2>
                                        <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-900/50 rounded-lg border border-white/10">
                                            {/* Location */}
                                            <div className="col-span-2 grid md:grid-cols-4 gap-4 pb-4 border-b border-white/5">
                                                <FormField control={form.control} name="postalCode" render={({ field }) => (
                                                    <FormItem><FormLabel>郵便番号</FormLabel><FormControl><Input {...field} placeholder="123-4567" className="bg-black border-white/20 font-mono" /></FormControl><FormMessage /></FormItem>
                                                )} />
                                                <div className="md:col-span-3">
                                                    <FormField control={form.control} name="address" render={({ field }) => (
                                                        <FormItem><FormLabel>住所</FormLabel><FormControl><Input {...field} placeholder="東京都渋谷区..." className="bg-black border-white/20" /></FormControl><FormMessage /></FormItem>
                                                    )} />
                                                </div>
                                            </div>

                                            {/* Communication */}
                                            <FormField control={form.control} name="phone" render={({ field }) => (
                                                <FormItem><FormLabel>電話番号</FormLabel><FormControl><Input {...field} placeholder="03-1234-5678" className="bg-black border-white/20 font-mono" /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="email" render={({ field }) => (
                                                <FormItem><FormLabel>店舗メールアドレス</FormLabel><FormControl><Input {...field} placeholder="store@example.com" className="bg-black border-white/20 font-mono" /></FormControl><FormMessage /></FormItem>
                                            )} />

                                            {/* People */}
                                            <div className="col-span-2 grid md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                                                <div className="space-y-4">
                                                    <FormField control={form.control} name="representative" render={({ field }) => (
                                                        <FormItem><FormLabel>代表者名</FormLabel><FormControl><Input {...field} className="bg-black border-white/20" /></FormControl><FormMessage /></FormItem>
                                                    )} />
                                                    <FormField control={form.control} name="representativeEmail" render={({ field }) => (
                                                        <FormItem><FormLabel>代表者メールアドレス</FormLabel><FormControl><Input {...field} type="email" className="bg-black border-white/20 font-mono text-xs" /></FormControl><FormMessage /></FormItem>
                                                    )} />
                                                </div>
                                                <div className="space-y-4">
                                                    <FormField control={form.control} name="manager" render={({ field }) => (
                                                        <FormItem><FormLabel>担当者名</FormLabel><FormControl><Input {...field} className="bg-black border-white/20" /></FormControl><FormMessage /></FormItem>
                                                    )} />
                                                    <FormField control={form.control} name="contactPersonEmail" render={({ field }) => (
                                                        <FormItem><FormLabel>担当者メールアドレス</FormLabel><FormControl><Input {...field} type="email" className="bg-black border-white/20 font-mono text-xs" /></FormControl><FormMessage /></FormItem>
                                                    )} />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* --- DISCOUNTS --- */}
                                    <section className="space-y-4">
                                        <h2 className="text-xl font-bold border-l-4 border-cyan-500 pl-3">割引設定 (学割・その他)</h2>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Student Discount */}
                                            <Card className="bg-slate-900 border-white/10">
                                                <CardHeader className="py-4 border-b border-white/5">
                                                    <div className="flex justify-between items-center">
                                                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                                                            <Users className="w-4 h-4 text-cyan-400" /> 学割
                                                        </CardTitle>
                                                        <FormField control={form.control} name="studentDiscount.enabled" render={({ field }) => (
                                                            <FormControl>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-[10px] text-gray-500">{field.value ? "有効" : "無効"}</span>
                                                                    <input type="checkbox" checked={field.value} onChange={field.onChange} className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                                                                </div>
                                                            </FormControl>
                                                        )} />
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pt-4 space-y-4">
                                                    <div className="flex gap-4">
                                                        <FormField control={form.control} name="studentDiscount.discountType" render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                <FormLabel className="text-xs text-gray-500">割引形式</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl><SelectTrigger className="bg-black border-white/10"><SelectValue /></SelectTrigger></FormControl>
                                                                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                                        <SelectItem value="amount">定額 (¥)</SelectItem>
                                                                        <SelectItem value="percentage">定率 (%)</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name="studentDiscount.value" render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                <FormLabel className="text-xs text-gray-500">割引額/率</FormLabel>
                                                                <FormControl><Input type="number" {...field} className="bg-black border-white/10 font-mono text-cyan-400" /></FormControl>
                                                            </FormItem>
                                                        )} />
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Other Discounts */}
                                            <Card className="bg-slate-900 border-white/10">
                                                <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
                                                    <CardTitle className="text-sm font-bold">その他の割引</CardTitle>
                                                    <Button type="button" size="sm" onClick={() => appendOtherDiscount({ name: "", enabled: true, discountType: 'percentage', value: 0 })} className="h-7 text-[10px] bg-cyan-900/40 text-cyan-400 border border-cyan-500/30">
                                                        <Plus className="w-3 h-3 mr-1" /> 追加
                                                    </Button>
                                                </CardHeader>
                                                <CardContent className="pt-4 space-y-4">
                                                    {otherDiscountFields.map((field, index) => (
                                                        <div key={field.id} className="p-3 bg-black/30 rounded border border-white/5 space-y-3">
                                                            <div className="flex justify-between items-center">
                                                                <FormField control={form.control} name={`otherDiscounts.${index}.name`} render={({ field }) => (
                                                                    <FormControl><Input {...field} placeholder="割引名 (例: 初回割引)" className="h-7 bg-transparent border-none text-xs font-bold p-0 focus-visible:ring-0" /></FormControl>
                                                                )} />
                                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeOtherDiscount(index)} className="h-6 w-6 text-gray-600 hover:text-red-400">
                                                                    <Trash2 className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <FormField control={form.control} name={`otherDiscounts.${index}.discountType`} render={({ field }) => (
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl><SelectTrigger className="h-7 bg-black border-white/10 text-[10px] w-24"><SelectValue /></SelectTrigger></FormControl>
                                                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                                            <SelectItem value="amount">定額</SelectItem>
                                                                            <SelectItem value="percentage">定率</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                )} />
                                                                <FormField control={form.control} name={`otherDiscounts.${index}.value`} render={({ field }) => (
                                                                    <FormControl><Input type="number" {...field} className="h-7 bg-black border-white/10 text-[10px] font-mono" /></FormControl>
                                                                )} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {otherDiscountFields.length === 0 && (
                                                        <p className="text-center text-[10px] text-gray-600 py-4">割引設定がありません</p>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </section>

                                    {/* --- PERSONAL PRACTICE SETTINGS --- */}
                                    <section className="space-y-4">
                                        <h2 className="text-xl font-bold border-l-4 border-cyan-500 pl-3">個人練習設定</h2>
                                        <Card className="bg-slate-900 border-white/10">
                                            <CardContent className="p-6">
                                                <div className="grid md:grid-cols-2 gap-8">
                                                    <div className="space-y-4">
                                                        <FormField control={form.control} name="personalPracticeSettings.enabled" render={({ field }) => (
                                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/5 p-4 bg-black/20">
                                                                <div className="space-y-0.5">
                                                                    <FormLabel className="text-base">個人練習予約の受付</FormLabel>
                                                                    <FormDescription>個人練習としての予約を許可するかどうか</FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <input type="checkbox" checked={field.value} onChange={field.onChange} className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                                                                </FormControl>
                                                            </FormItem>
                                                        )} />

                                                        <FormField control={form.control} name="personalPracticeSettings.maxPeople" render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>利用可能人数制限 (人まで)</FormLabel>
                                                                <FormControl><Input type="number" {...field} className="bg-black border-white/10 font-mono text-cyan-400" /></FormControl>
                                                                <FormDescription>この人数以下の場合に個人練習料金（または設定）が適用されます。</FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <FormField control={form.control} name="personalPracticeSettings.reservationWindowType" render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>予約受付開始タイミング</FormLabel>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger className="bg-black border-white/10">
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                                            <SelectItem value="hours">時間前</SelectItem>
                                                                            <SelectItem value="days">日前</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormItem>
                                                            )} />
                                                            <FormField control={form.control} name="personalPracticeSettings.reservationWindowValue" render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>数値</FormLabel>
                                                                    <FormControl><Input type="number" {...field} className="bg-black border-white/10 font-mono text-cyan-400" /></FormControl>
                                                                </FormItem>
                                                            )} />
                                                        </div>
                                                        <p className="text-[10px] text-gray-500">
                                                            例: 「24時間前」または「1日前」から個人練習の予約が可能になります。
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </section>

                                    {/* --- ROOM PRICING --- */}
                                    <section className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-bold border-l-4 border-cyan-500 pl-3">スタジオ料金設定 (部屋ごと・時間ごと)</h2>
                                            <Button type="button" onClick={addDefaultRoom} variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-950">
                                                <Plus className="mr-2 h-4 w-4" /> 新しいスタジオを追加
                                            </Button>
                                        </div>
                                        <div className="grid gap-6">
                                            {roomFields.map((room, roomIndex) => (
                                                <Card key={room.id} className="bg-slate-900 border-white/10 overflow-hidden">
                                                    <CardHeader className="bg-white/5 flex flex-col gap-4 py-4">
                                                        <div className="flex justify-between items-center w-full">
                                                            <div className="flex items-center gap-4 flex-1">
                                                                <Badge variant="outline" className="text-cyan-400 border-cyan-400">Rm {roomIndex + 1}</Badge>
                                                                <FormField
                                                                    control={form.control}
                                                                    name={`rooms.${roomIndex}.name`}
                                                                    render={({ field }) => (
                                                                        <Input {...field} placeholder="Studio Name (e.g. A Studio)" className="bg-black/50 border-none text-lg font-bold w-64 text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-cyan-500" />
                                                                    )}
                                                                />
                                                                <div className="flex items-center gap-2 ml-4">
                                                                    <span className="text-[10px] text-gray-500 whitespace-nowrap">基準料金:</span>
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`rooms.${roomIndex}.basePrice`}
                                                                        render={({ field }) => (
                                                                            <Input type="number" {...field} className="h-7 w-20 bg-black/50 border-white/10 text-xs font-mono text-cyan-400" />
                                                                        )}
                                                                    />
                                                                    <span className="text-[10px] text-gray-500">円/h</span>
                                                                </div>
                                                            </div>
                                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeRoom(roomIndex)} className="text-gray-500 hover:text-red-400">
                                                                <Trash2 className="h-5 w-5" />
                                                            </Button>
                                                        </div>

                                                        {/* Room Description & Photos */}
                                                        <div className="grid md:grid-cols-2 gap-4 w-full">
                                                            <FormField
                                                                control={form.control}
                                                                name={`rooms.${roomIndex}.description`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-xs text-gray-500">部屋の説明</FormLabel>
                                                                        <FormControl>
                                                                            <Textarea {...field} placeholder="部屋の説明 (例: ドラムセット完備、10畳)" className="bg-black/50 border-white/10 min-h-[160px]" />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name={`rooms.${roomIndex}.images`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-xs text-gray-500">部屋の写真</FormLabel>
                                                                        <FormControl>
                                                                            <ImageUpload
                                                                                value={field.value || []}
                                                                                onChange={field.onChange}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent className="p-6">
                                                        <Accordion type="single" collapsible className="w-full">
                                                            {['weekday', 'saturday', 'sundayHoliday'].map((dayType) => (
                                                                <AccordionItem key={dayType} value={dayType} className="border-white/10">
                                                                    <AccordionTrigger className="hover:text-cyan-400">
                                                                        {dayType === 'weekday' ? '平日料金' : dayType === 'saturday' ? '土曜料金' : '日祝料金'}
                                                                    </AccordionTrigger>
                                                                    <AccordionContent className="pt-4">
                                                                        <div className="space-y-4">
                                                                            {(form.watch(`rooms.${roomIndex}.pricing.${dayType}.slots` as any) as any[] || []).map((_, slotIndex) => (
                                                                                <div key={slotIndex} className="p-4 bg-black/20 rounded border border-white/5 space-y-4">
                                                                                    <div className="flex gap-4 items-end">
                                                                                        <FormField
                                                                                            control={form.control}
                                                                                            name={`rooms.${roomIndex}.pricing.${dayType}.slots.${slotIndex}.start` as any}
                                                                                            render={({ field }) => (
                                                                                                <FormItem><FormLabel className="text-[10px] text-gray-500">開始</FormLabel><FormControl><Input type="text" placeholder="10:00" {...field} className="h-8 bg-black w-20 border-white/10 text-xs" /></FormControl></FormItem>
                                                                                            )}
                                                                                        />
                                                                                        <span className="mb-2 text-gray-500 text-xs">~</span>
                                                                                        <FormField
                                                                                            control={form.control}
                                                                                            name={`rooms.${roomIndex}.pricing.${dayType}.slots.${slotIndex}.end` as any}
                                                                                            render={({ field }) => (
                                                                                                <FormItem><FormLabel className="text-[10px] text-gray-500">終了</FormLabel><FormControl><Input type="text" placeholder="24:00" {...field} className="h-8 bg-black w-20 border-white/10 text-xs" /></FormControl></FormItem>
                                                                                            )}
                                                                                        />

                                                                                        <FormField
                                                                                            control={form.control}
                                                                                            name={`rooms.${roomIndex}.pricing.${dayType}.slots.${slotIndex}.pricingType` as any}
                                                                                            render={({ field }) => (
                                                                                                <FormItem className="flex-1">
                                                                                                    <FormLabel className="text-[10px] text-gray-500">設定タイプ</FormLabel>
                                                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                                                        <FormControl><SelectTrigger className="h-8 bg-black border-white/10 text-xs"><SelectValue /></SelectTrigger></FormControl>
                                                                                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                                                                            <SelectItem value="fixed">固定金額 (¥)</SelectItem>
                                                                                                            <SelectItem value="discount">割引率 (%)</SelectItem>
                                                                                                        </SelectContent>
                                                                                                    </Select>
                                                                                                </FormItem>
                                                                                            )}
                                                                                        />

                                                                                        {form.watch(`rooms.${roomIndex}.pricing.${dayType}.slots.${slotIndex}.pricingType` as any) === 'fixed' ? (
                                                                                            <FormField
                                                                                                control={form.control}
                                                                                                name={`rooms.${roomIndex}.pricing.${dayType}.slots.${slotIndex}.price` as any}
                                                                                                render={({ field }) => (
                                                                                                    <FormItem className="flex-1"><FormLabel className="text-[10px] text-gray-500">1H料金 (¥)</FormLabel><FormControl><Input type="number" {...field} className="h-8 bg-black border-white/10 font-mono text-cyan-400 text-xs" /></FormControl></FormItem>
                                                                                                )}
                                                                                            />
                                                                                        ) : (
                                                                                            <FormField
                                                                                                control={form.control}
                                                                                                name={`rooms.${roomIndex}.pricing.${dayType}.slots.${slotIndex}.discountRate` as any}
                                                                                                render={({ field }) => (
                                                                                                    <FormItem className="flex-1"><FormLabel className="text-[10px] text-gray-500">割引率 (%)</FormLabel><FormControl><Input type="number" {...field} className="h-8 bg-black border-white/10 font-mono text-orange-400 text-xs" /></FormControl></FormItem>
                                                                                                )}
                                                                                            />
                                                                                        )}
                                                                                    </div>
                                                                                    {form.watch(`rooms.${roomIndex}.pricing.${dayType}.slots.${slotIndex}.pricingType` as any) === 'discount' && (
                                                                                        <p className="text-[10px] text-gray-500 italic">※基準料金（あれば）から自動計算されます。現在は各スロットで独立して設定されています。</p>
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                            ))}
                                                        </Accordion>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </section>

                                    {/* --- OPTIONS --- */}
                                    <section className="space-y-4">
                                        <h2 className="text-xl font-bold border-l-4 border-cyan-500 pl-3">オプション機材</h2>
                                        <Card className="bg-slate-900 border-white/10">
                                            <CardContent className="p-6 space-y-4">
                                                {equipmentFields.map((item, index) => (
                                                    <div key={item.id} className="flex gap-4 items-end">
                                                        <FormField
                                                            control={form.control}
                                                            name={`equipmentOptions.${index}.name`}
                                                            render={({ field }) => (
                                                                <FormItem className="flex-[2]"><FormLabel className="text-xs text-gray-500">機材名</FormLabel><FormControl><Input {...field} className="bg-black border-white/20" /></FormControl></FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name={`equipmentOptions.${index}.pricePerHour`}
                                                            render={({ field }) => (
                                                                <FormItem className="flex-1"><FormLabel className="text-xs text-gray-500">時間単価 (¥)</FormLabel><FormControl><Input type="number" {...field} className="bg-black border-white/20" /></FormControl></FormItem>
                                                            )}
                                                        />
                                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeEquipment(index)} className="mb-1 text-gray-500 hover:text-red-400 bg-white/5">
                                                            <Trash2 className="h-5 w-5" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button type="button" onClick={() => appendEquipment({ name: "", pricePerHour: 500 })} variant="outline" className="w-full border-dashed border-white/20 text-gray-400 hover:text-cyan-400 mt-4">
                                                    <Plus className="mr-2 h-4 w-4" /> オプション機材を追加
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </section>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </Form>
    );
}
