'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { joinBandAction, getBandByTokenAction } from '@/actions/band'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle2, XCircle, Users, ArrowRight } from 'lucide-react'

export default function InvitePage() {
    const params = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect')

    const [status, setStatus] = useState<'loading' | 'preview' | 'success' | 'error'>('loading')
    const [band, setBand] = useState<any>(null)
    const [message, setMessage] = useState('データ取得中...')

    useEffect(() => {
        const load = async () => {
            const token = params.token as string
            const res = await getBandByTokenAction(token)
            if (res.success) {
                setBand(res.band)
                setStatus('preview')
            } else {
                setStatus('error')
                setMessage(res.message || '無効な招待URLです')
            }
        }
        load()
    }, [params.token])

    const handleJoin = async () => {
        setStatus('loading')
        setMessage('参加処理中...')
        const token = params.token as string
        const res = await joinBandAction(token)

        if (res.success) {
            setStatus('success')
            setMessage(res.message)
            setTimeout(() => {
                if (redirect) {
                    router.push(redirect)
                } else {
                    router.push('/my-bands')
                }
            }, 2000)
        } else {
            if (res.needsLogin) {
                // ログイン後に戻ってこれるようにリダイレクト
                let loginRedirect = `/invite/${token}`
                if (redirect) loginRedirect += `?redirect=${encodeURIComponent(redirect)}`
                router.push(`/login?redirect=${encodeURIComponent(loginRedirect)}`)
            } else {
                setStatus('error')
                setMessage(res.message)
            }
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253361-bee8a187499b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>

            <Card className="max-w-md w-full shadow-2xl bg-slate-900/80 backdrop-blur-xl border-white/10 relative z-10 overflow-hidden rounded-3xl">
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <CardContent className="pt-10 pb-8 text-center space-y-6">
                    {status === 'loading' && (
                        <div className="py-10 space-y-4">
                            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto" />
                            <p className="text-white/70 font-medium">{message}</p>
                        </div>
                    )}

                    {status === 'preview' && (
                        <>
                            <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-blue-500/30">
                                <Users className="w-10 h-10 text-blue-400" />
                            </div>
                            <h1 className="text-3xl font-black text-white tracking-tight">バンドメンバー招待</h1>
                            <div className="space-y-2">
                                <p className="text-blue-400 font-bold text-lg">{band.name}</p>
                                <p className="text-slate-400 text-sm">
                                    リーダー: <span className="text-slate-200">{band.leader?.name || '不明'}</span>
                                </p>
                            </div>

                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left space-y-3">
                                <p className="text-slate-300 text-xs font-bold uppercase tracking-wider">参加するとできること</p>
                                <ul className="text-slate-400 text-sm space-y-2">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> 割り勘予約でのオンライン決済</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> バンド専用クーポンの利用</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> 練習スケジュールの共有</li>
                                </ul>
                            </div>

                            <div className="space-y-3 pt-4">
                                <Button onClick={handleJoin} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-7 rounded-2xl text-lg shadow-lg shadow-blue-900/40 relative group">
                                    バンドに参加する
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <p className="text-[10px] text-slate-500">※参加にはJOCOLLAアカウントへのログインが必要です</p>
                            </div>
                        </>
                    )}

                    {status === 'success' && (
                        <div className="py-10 space-y-6">
                            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-black text-white">成功しました！</h2>
                                <p className="text-slate-400">{message}</p>
                            </div>
                            <Button onClick={() => router.push('/my-bands')} className="w-full bg-white text-black hover:bg-slate-200 font-bold py-6 rounded-2xl">
                                バンド一覧へ
                            </Button>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="py-10 space-y-6">
                            <XCircle className="w-20 h-20 text-red-500/50 mx-auto" />
                            <div className="space-y-2">
                                <h2 className="text-2xl font-black text-white">エラー</h2>
                                <p className="text-slate-400">{message}</p>
                            </div>
                            <Button onClick={() => router.push('/')} variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 py-6 rounded-2xl">
                                トップページへ戻る
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

