"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from 'next/link';
import { loginAction } from '@/actions/login';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
    password: z.string().min(1, { message: "パスワードを入力してください" }),
});

export default function Home() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('password', values.password);

        const res = await loginAction(formData);

        if (res.success) {
            // Force refresh to update server components relying on cookies
            router.refresh();
            router.push('/studios');
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-900/50 backdrop-blur border border-white/10 p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/logo-new.png"
                            alt="StudiGo Logo"
                            width={600}
                            height={200}
                            className="h-48 w-auto object-contain invert"
                            priority
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">LOGIN</h1>
                    <p className="text-gray-400 text-sm">JOCOLLA MUSIC NETWORK</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="text-gray-300">パスワード</FormLabel>
                                        <Link href="/forgot-password" className="text-xs text-cyan-400 hover:text-cyan-300">
                                            パスワードをお忘れですか？
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} className="bg-white/10 border-white/20 text-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-6 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                            ログイン
                        </Button>

                        <div className="text-center text-sm text-gray-400 mt-4">
                            アカウントをお持ちでない場合は{" "}
                            <Link href="/register" className="text-cyan-400 hover:underline">
                                新規登録
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
