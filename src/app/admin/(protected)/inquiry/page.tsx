"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { getAuthInfo } from '@/actions/admin-auth';
import { sendInternalInquiryAction } from '@/actions/support';

export default function InquiryPage() {
    const [auth, setAuth] = useState<{ studioId: string | null; isAdmin: boolean }>({ studioId: null, isAdmin: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [studioName, setStudioName] = useState("");
    const [personName, setPersonName] = useState("");
    const [senderEmail, setSenderEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getAuthInfo().then(async (info) => {
            console.log(`[InquiryPage] Auth Info:`, info);
            setAuth(info);
            if (info.studioId) {
                const { fetchStudio } = await import('@/actions/studio');
                const studio = await fetchStudio(info.studioId);

                if (studio) {
                    setStudioName(studio.storeName);
                    setSenderEmail(studio.email || `${info.studioId}@studio.com`);
                }
            }
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth.studioId) return;

        setIsSubmitting(true);
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const data = {
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
            studioId: auth.studioId,
            studioName: studioName,
            personName: personName || "スタッフ",
            senderEmail: senderEmail,
        };

        const res = await sendInternalInquiryAction(data);

        if (res.success) {
            setIsSuccess(true);
        } else {
            setErrorMessage("送信中にエラーが発生しました。");
        }
        setIsSubmitting(false);
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-background">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-2xl font-black italic uppercase tracking-tighter mb-2">送信完了</h1>
                <p className="text-muted-foreground mb-8">管理者へのメッセージを送信しました。</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-xl px-8">
                    新しい問い合わせを作成
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-6 bg-background min-h-screen text-foreground">
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Mail className="w-5 h-5 text-cyan-500" />
                    </div>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter">サポート問い合わせ</h1>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">管理者への問い合わせ。件名、本文、お名前を入力してください。</p>
            </div>

            <Card className="border-border bg-card/50 backdrop-blur-sm overflow-hidden rounded-3xl shadow-xl">
                <CardHeader className="pb-2 border-b border-border/50 bg-accent/5">
                    <CardTitle className="text-lg font-bold">新規問い合わせ</CardTitle>
                    <CardDescription>各項目を入力して送信してください。</CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">店舗名 (自動入力)</label>
                                <Input
                                    value={studioName}
                                    readOnly
                                    className="bg-accent/5 border-border rounded-xl h-12 opacity-80 cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">お名前</label>
                                <Input
                                    value={personName}
                                    onChange={(e) => setPersonName(e.target.value)}
                                    placeholder="担当者名を入力してください"
                                    className="bg-background/50 border-border rounded-xl h-12 focus:border-cyan-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">件名</label>
                            <Input
                                name="subject"
                                placeholder="問い合わせの内容を一言で記入してください"
                                className="bg-background/50 border-border rounded-xl h-12 focus:border-cyan-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">問い合わせ記入欄</label>
                            <Textarea
                                name="message"
                                placeholder="具体的な問い合わせ内容を記入してください..."
                                className="bg-background/50 border-border min-h-[200px] rounded-2xl p-4 resize-none focus:ring-1 focus:ring-cyan-500 text-lg"
                                required
                            />
                        </div>

                        {errorMessage && (
                            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {errorMessage}
                            </div>
                        )}

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full md:w-auto md:px-12 h-14 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl shadow-lg shadow-cyan-950/20 active:scale-[0.98] transition-all uppercase italic tracking-tighter"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        送信中...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        問い合わせを送信
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="mt-8 p-6 bg-accent/5 rounded-3xl border border-dashed border-border flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="text-xs text-muted-foreground leading-relaxed">
                    <p className="font-bold mb-1 uppercase tracking-widest text-foreground">お知らせ:</p>
                    <p>
                        送信された問い合わせは、プラットフォーム運営サポート（support@studi-go.com）および店舗管理者へ届きます。
                        内容を確認次第、担当者より折り返しご連絡いたします。
                    </p>
                </div>
            </div>
        </div>
    );
}
