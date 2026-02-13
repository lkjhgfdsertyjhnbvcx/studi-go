"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createNewStudioAction } from "@/actions/studio";
import { storeLogin } from "@/actions/admin-auth";
import { Building2, ArrowRight, Loader2, Music4 } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
    storeName: z.string().min(1, "店舗名を入力してください"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    representative: z.string().min(1, "担当者名を入力してください"),
});

export default function StoreRegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            storeName: "",
            email: "",
            representative: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            // Create the studio
            const studioId = await createNewStudioAction();

            // In a real app, we would update the studio with these values
            // For now, let's just log them in to that studio
            await storeLogin(studioId);

            // Redirect to the onboarding/edit page
            router.push(`/admin/studios/${studioId}`);
        } catch (error) {
            console.error(error);
            alert("登録中にエラーが発生しました。");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl z-10"
            >
                <div className="text-center mb-10 space-y-2">
                    <div className="inline-flex p-3 bg-white/5 rounded-2xl border border-white/10 mb-4">
                        <Music4 className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white italic">STUDI-GO // FOR BUSINESS</h1>
                    <p className="text-gray-400">最高の演奏環境を、世界中のミュージシャンへ。</p>
                </div>

                <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500" />
                    <CardHeader className="pt-8 px-8">
                        <CardTitle className="text-2xl text-white">店舗登録を始める</CardTitle>
                        <CardDescription>
                            わずか数分でスタジオのオンライン予約を開始できます。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="storeName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-400">店舗名</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                                    <Input placeholder="STUDIO ANTIGRAVITY 渋谷店" {...field} className="pl-10 bg-black/40 border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-400">連絡用メールアドレス</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="contact@studio-example.com" {...field} className="bg-black/40 border-white/10 focus:border-cyan-500 text-white" />
                                            </FormControl>
                                            <FormDescription className="text-[10px] text-gray-500">
                                                予約通知や重要なお知らせをお送りします。
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="representative"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-400">担当者名</FormLabel>
                                            <FormControl>
                                                <Input placeholder="山田 太郎" {...field} className="bg-black/40 border-white/10 focus:border-cyan-500 text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold h-12 text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            店舗を登録してダッシュボードへ <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center text-sm text-gray-600">
                    既にアカウントをお持ちですか？ <button onClick={() => router.push('/admin/login')} className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4">ログイン</button>
                </div>
            </motion.div>
        </div>
    );
}
