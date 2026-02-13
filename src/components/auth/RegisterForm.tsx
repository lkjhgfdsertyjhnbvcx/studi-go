"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from 'next/link';
import { registerUser } from '@/actions/auth';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    name: z.string().min(1, { message: "名前を入力してください" }),
    email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
    password: z.string().min(6, { message: "パスワードは6文字以上で入力してください" }),
    phone: z.string().min(1, { message: "電話番号を入力してください" }),
    agreed: z.boolean().refine(val => val === true, {
        message: "利用規約とプライバシーポリシーへの同意が必要です",
    }),
});

export const RegisterForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            agreed: false
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('phone', values.phone);

        const res = await registerUser(formData);

        if (res.success) {
            router.push('/register/success');
        } else {
            alert(res.message);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-300">お名前</FormLabel>
                            <FormControl>
                                <Input placeholder="山田 太郎" {...field} className="bg-white/10 border-white/20 text-white" />
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
                            <FormLabel className="text-gray-300">メールアドレス</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="taro@example.com" {...field} className="bg-white/10 border-white/20 text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-300">パスワード</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} className="bg-white/10 border-white/20 text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-300">電話番号</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="090-1234-5678" {...field} className="bg-white/10 border-white/20 text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="agreed"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-white/10 p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="border-white/50 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="text-gray-300">
                                    <Link href="/terms" target="_blank" className="text-cyan-400 underline hover:text-cyan-300">利用規約</Link>
                                    {' '}と{' '}
                                    <Link href="/privacy" target="_blank" className="text-cyan-400 underline hover:text-cyan-300">プライバシーポリシー</Link>
                                    {' '}に同意します。
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-6 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    JOCOLLA SNS アカウント登録 (無料)
                </Button>

                <div className="relative border-t border-white/10 my-8">
                    <div className="absolute inset-0 flex items-center justify-center -top-3">
                        <span className="bg-black px-4 text-xs text-gray-500">または</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button type="button" variant="outline" className="w-full bg-white text-black hover:bg-gray-100 font-bold border-none">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                        Google
                    </Button>
                    <Button type="button" variant="outline" className="w-full bg-white text-black hover:bg-gray-100 font-bold border-none">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" /></svg>
                        Apple
                    </Button>
                    <Button type="button" className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold border-none">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 512 512" fill="currentColor"><path d="M312.1 247.9c4.8-6.1-9.9-13.7-22.1-13.7-32.6 0-35.2 38.6-35.2 38.6h35.2c10.4 0 18.5-12.7 22.1-24.9zM228.6 220.4c-8.9 0-14.8 6.1-14.8 14.1v76.2c0 8.1 6.5 12.3 14.8 12.3 8.9 0 14.8-5.6 14.8-12.3v-41.1h19.5c8.9 0 14.8-5.6 14.8-13.9 0-21.7-17-35.3-49.1-35.3zM153.2 272.7h29.6v28c0 8.1 6.5 12.3 14.8 12.3 8.6 0 15.1-5.1 15.1-12.3v-65.9c0-8.1-5.7-14.1-14.8-14.1-8.6 0-15.1 5.9-15.1 14.1v27.2h-29.6v-27.2c0-8.1-6.5-14.1-15.1-14.1-8.1 0-14.8 6.1-14.8 14.1v65.9c0 8.1 6.5 12.3 14.8 12.3 8.3 0 15.1-4.2 15.1-12.3v-28zM395.7 220.4H364c-8.9 0-14.8 6.1-14.8 14.1v65.9c0 8.3 6.5 12.3 14.8 12.3 8.4 0 15.9-4.8 15.9-12.3v-12h14.8c8.9 0 14.8-5.6 14.8-13.9v-13.2c0-29.5-22.5-39.2-22.5-39.2v-1.7zm-15.4 39.7h-16.4v-27h16.4c17 0 17 25 0 27zM256 0C114.6 0 0 100.3 0 224c0 70.1 36.6 132.6 94.6 172.9 4.1 2.8 6.7 8.3 4.9 14.6l-10 43.1 40-19.1c5.2-2.5 11.2-2.2 16.5 .6C182.7 453.7 218.4 464 256 464c141.4 0 256-100.3 256-224S397.4 0 256 0z" /></svg>
                        LINE
                    </Button>
                    <Button type="button" className="w-full bg-[#1877F2] hover:bg-[#165dbb] text-white font-bold border-none">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        Facebook
                    </Button>
                </div>
                <div className="text-center text-xs text-gray-500">
                    ※スタジオ予約にはアカウント登録が必要です
                </div>
            </form>
        </Form>
    );
};
