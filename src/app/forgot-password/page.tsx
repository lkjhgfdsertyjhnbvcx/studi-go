"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from 'next/link';
import Image from 'next/image';
import { sendPasswordResetAction } from '@/actions/reset-password';

const formSchema = z.object({
    email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
});

export default function ForgotPasswordPage() {
    const [isSent, setIsSent] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setError("");
        setMessage("");

        const formData = new FormData();
        formData.append('email', values.email);

        const res = await sendPasswordResetAction(formData);

        if (res.success) {
            setIsSent(true);
            setIsSent(true);
            setMessage(res.message || "パスワード再設定用のメールを送信しました。メールをご確認ください。");
        } else {
            setError(res.message);
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
                    <h1 className="text-3xl font-bold text-white mb-2">FORGOT PASSWORD</h1>
                    <p className="text-gray-400 text-sm">パスワードの再設定</p>
                </div>

                {!isSent ? (
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

                            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-6 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                                メールを送信
                            </Button>

                            <div className="text-center text-sm text-gray-400 mt-4">
                                <Link href="/login" className="text-cyan-400 hover:underline">
                                    ログイン画面に戻る
                                </Link>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <div className="space-y-6 text-center">
                        <p className="text-white bg-green-500/20 border border-green-500/50 p-4 rounded-lg">
                            {message}
                        </p>
                        <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-6 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                            <Link href="/login">
                                ログイン画面に戻る
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
