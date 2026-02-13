"use client";

import React, { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from 'next/link';
import Image from 'next/image';
import { resetPasswordAction } from '@/actions/reset-password';
import { useSearchParams, useRouter } from 'next/navigation';

const formSchema = z.object({
    password: z.string().min(8, { message: "パスワードは8文字以上で入力してください" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
});

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    });

    if (!token) {
        return <div className="text-red-400 text-center">無効なURLです。メールのリンクから再度お試しください。</div>;
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setMessage("");

        const formData = new FormData();
        formData.append('token', token);
        formData.append('password', values.password);

        const res = await resetPasswordAction(formData);

        if (res.success) {
            setIsSuccess(true);
            setMessage(res.message);
            // Optional: redirect after few seconds
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } else {
            setMessage(res.message);
        }
    };

    if (isSuccess) {
        return (
            <div className="space-y-6 text-center">
                <p className="text-white bg-green-500/20 border border-green-500/50 p-4 rounded-lg">
                    {message}
                </p>
                <div className="text-gray-400 text-sm">
                    3秒後にログイン画面へ移動します...
                </div>
                <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-6 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <Link href="/login">
                        ログイン画面に戻る
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-300">新しいパスワード</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} className="bg-white/10 border-white/20 text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-300">新しいパスワード（確認）</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} className="bg-white/10 border-white/20 text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {message && <p className="text-red-400 text-sm text-center">{message}</p>}

                <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-6 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    パスワードを変更
                </Button>
            </form>
        </Form>
    );
}

export default function ResetPasswordPage() {
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
                    <h1 className="text-3xl font-bold text-white mb-2">RESET PASSWORD</h1>
                    <p className="text-gray-400 text-sm">新しいパスワードの設定</p>
                </div>

                <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    );
}
