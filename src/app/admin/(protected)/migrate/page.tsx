"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MigrationPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [log, setLog] = useState<string[]>([]);

    const startMigration = async () => {
        if (!confirm("JSONファイルからFirestoreへデータを移行します。よろしいですか？")) return;

        setStatus('loading');
        setLog(["Migration started..."]);

        try {
            const res = await fetch('/api/admin/migrate', { method: 'POST' });
            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setLog(prev => [...prev, ...data.logs, "✅ Migration completed!"]);
            } else {
                throw new Error(data.message);
            }
        } catch (e: any) {
            setStatus('error');
            setLog(prev => [...prev, `❌ Error: ${e.message}`]);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-10 font-sans">
            <div className="max-w-2xl mx-auto space-y-8">
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-2xl text-cyan-500">データ移行ツール (Beta)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-gray-400">
                            ローカルファイル (`data/*.json`) に保存されているスタジオ・予約・ユーザー情報を、
                            新しく設定した Cloud Firestore へコピーします。
                        </p>

                        {status === 'idle' && (
                            <Button onClick={startMigration} className="w-full bg-cyan-500 hover:bg-cyan-600 text-cyan-950 font-bold h-12">
                                データを移行する
                            </Button>
                        )}

                        {status === 'loading' && (
                            <div className="flex flex-col items-center gap-4 py-8">
                                <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
                                <p>移行中... しばらくお待ちください</p>
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="flex flex-col items-center gap-4 py-8 text-green-400">
                                <CheckCircle2 className="h-12 w-12" />
                                <p className="font-bold">移行が完了しました！</p>
                                <Button onClick={() => window.location.href = '/admin'} variant="outline" className="border-green-900 text-green-400">
                                    管理画面へ戻る
                                </Button>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="flex flex-col items-center gap-4 py-8 text-red-400">
                                <AlertCircle className="h-12 w-12" />
                                <p className="font-bold">移行中にエラーが発生しました</p>
                                <Button onClick={() => setStatus('idle')} variant="outline" className="border-red-900 text-red-400">
                                    リトライ
                                </Button>
                            </div>
                        )}

                        <div className="bg-muted p-4 rounded-lg font-mono text-xs overflow-y-auto max-h-48 border border-border space-y-1">
                            {log.map((line, i) => <div key={i}>{line}</div>)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
