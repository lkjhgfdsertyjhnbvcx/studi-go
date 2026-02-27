"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, HardDrive, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function BackupButton() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleBackup = async () => {
        setStatus('loading');
        try {
            // サーバーAPIを使わず、クライアントサイドでデータを直接取得
            // これによりサーバーエラー(500)を完全に回避
            const studiosSnap = await getDocs(collection(db, 'studios'));
            const studios = studiosSnap.docs.map(doc => doc.data());

            const bookingsSnap = await getDocs(collection(db, 'bookings'));
            const bookings = bookingsSnap.docs.map(doc => doc.data());

            // JSONファイル生成
            const backupData = {
                studios,
                bookings,
                backupAt: new Date().toISOString(),
                type: "Client-Side Download Backup"
            };
            const content = JSON.stringify(backupData, null, 2);
            const blob = new Blob([content], { type: 'application/json' });

            const timestamp = new Date().toLocaleString('ja-JP').replace(/\D/g, '');
            const defaultName = `studigo_backup_${timestamp}.json`;

            try {
                // モダンブラウザ向け: 保存場所を選択させる
                if ('showSaveFilePicker' in window) {
                    const handle = await (window as any).showSaveFilePicker({
                        suggestedName: defaultName,
                        types: [{
                            description: 'JSON Files',
                            accept: { 'application/json': ['.json'] },
                        }],
                    });
                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                } else {
                    // フォールバック: 従来の方法（自動ダウンロード）
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = defaultName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }

                setStatus('success');
                setMessage('バックアップ完了');
                toast.success('バックアップファイルを保存しました');

            } catch (err: any) {
                // ユーザーが保存をキャンセルした場合
                if (err.name === 'AbortError') {
                    setStatus('idle');
                    return;
                }
                throw err;
            }

        } catch (error: any) {
            console.error("Backup Error:", error);
            setStatus('error');
            setMessage(`エラー: ${error.message || "予期せぬエラー"}`);
            toast.error(`バックアップ失敗: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-end gap-2">
            <Button
                onClick={handleBackup}
                disabled={status === 'loading'}
                variant="outline"
                className="bg-slate-900/50 border-white/10 hover:border-cyan-500/50 text-[10px] font-black tracking-widest uppercase transition-all gap-2 group h-9"
            >
                {status === 'loading' ? (
                    <Loader2 className="h-3 w-3 animate-spin text-cyan-400" />
                ) : (
                    <RefreshCw className={`h-3 w-3 ${status === 'success' ? 'text-green-400' : 'text-cyan-400 group-hover:rotate-180 transition-transform duration-500'}`} />
                )}
                {status === 'loading' ? 'バックアップ作成中...' : 'バックアップJSONをダウンロード'}
            </Button>

            {status === 'success' && (
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-green-400 uppercase animate-in fade-in slide-in-from-top-1 text-right">
                    <CheckCircle2 size={10} />
                    ダウンロード完了
                </div>
            )}

            {status === 'error' && (
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-red-400 uppercase animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={10} />
                    {message || "バックアップ失敗"}
                </div>
            )}
        </div>
    );
}
