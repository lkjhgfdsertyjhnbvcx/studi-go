'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { CheckCircle2, Circle, Copy, Check, Share2, Crown, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getBandTokenByReservationAction } from '@/actions/band'
import { getSplitPaymentsAction, getCheckoutUrlAction, checkAndFinalizeReservationAction } from '@/actions/split-payments'
import { getCurrentUser } from '@/actions/login'
import { Loader2 } from 'lucide-react'

type SplitPayment = {
    id: string
    userId: string
    amount: number
    paymentStatus: string
    user: {
        name: string | null
    }
}

// アルファベットラベル生成（A, B, C...）
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
function getMemberLabel(index: number): string {
    return `メンバー${ALPHA[index] ?? index + 1}`
}

export default function SplitPaymentPage({ params }: { params: { reservationId: string } }) {
    const router = useRouter()
    const [payments, setPayments] = useState<SplitPayment[]>([])
    const [leaderId, setLeaderId] = useState<string | null>(null)
    const [bandMemberIds, setBandMemberIds] = useState<string[]>([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showCheckInGate, setShowCheckInGate] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isCopied, setIsCopied] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')

    const fetchPayments = async () => {
        const res = await getSplitPaymentsAction(params.reservationId)
        if (res.success && res.payments) {
            const typedPayments = (res.payments as SplitPayment[]).map((p) => ({
                ...p,
                user: { name: p.user.name }
            }))
            setPayments(typedPayments)

            if (res.leaderId) setLeaderId(res.leaderId)
            if (res.bandMemberIds) setBandMemberIds(res.bandMemberIds as string[])

            const paidCount = typedPayments.filter(p => p.paymentStatus === 'Paid').length
            const newProgress = typedPayments.length > 0 ? (paidCount / typedPayments.length) * 100 : 0
            setProgress(newProgress)

            // 全員支払い完了時に自動で確定処理を実行（webhookのフォールバック）
            if (newProgress === 100 && typedPayments.length > 0) {
                try {
                    await checkAndFinalizeReservationAction(params.reservationId)
                } catch (e) {
                    console.error('Finalize error:', e)
                }
            }
        }
    }

    useEffect(() => {
        const init = async () => {
            setIsLoading(true)
            const user = await getCurrentUser()
            if (!user) {
                setIsLoggedIn(false)
                setShowCheckInGate(true)
            } else {
                setIsLoggedIn(true)
            }
            await fetchPayments()
            setIsLoading(false)
        }
        init()

        // 現在のURLを取得（クライアントサイドのみ）
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href)
        }

        // 30秒ごとに更新
        const interval = setInterval(fetchPayments, 30000)
        return () => clearInterval(interval)
    }, [params.reservationId])

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 3000)
        } catch (e) {
            const textArea = document.createElement('textarea')
            textArea.value = currentUrl
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 3000)
        }
    }

    const handleRegister = async () => {
        const res = await getBandTokenByReservationAction(params.reservationId)
        if (res.success && res.inviteToken) {
            router.push(`/invite/${res.inviteToken}?redirect=/split-payment/${params.reservationId}`)
        } else {
            router.push(`/register?redirect=/split-payment/${params.reservationId}`)
        }
    }

    const handlePay = async (paymentId: string) => {
        if (!isLoggedIn) {
            setShowCheckInGate(true)
            return
        }

        const res = await getCheckoutUrlAction(paymentId)
        if (res.success && res.url) {
            window.location.href = res.url
        } else {
            alert('決済の準備に失敗しました: ' + (res.message || 'Error'))
        }
    }

    /**
     * メンバー表示名を決定するロジック:
     * 1. 代表者（leaderId と一致） → 実名 + 「代表者」バッジ
     * 2. バンド登録済みメンバー（bandMemberIds に含まれる） → 実名
     * 3. それ以外（未登録） → メンバーA, B, C...
     */
    const getMemberDisplayName = (payment: SplitPayment, index: number): {
        label: string
        isLeader: boolean
        isRegistered: boolean
    } => {
        const isLeader = payment.userId === leaderId
        const isRegistered = bandMemberIds.includes(payment.userId)

        if (isLeader) {
            return { label: payment.user.name || '代表者', isLeader: true, isRegistered: true }
        }
        if (isRegistered && payment.user.name) {
            return { label: payment.user.name, isLeader: false, isRegistered: true }
        }
        // 未登録メンバー：リーダーを除いた順でA, B, C...を割り当て
        const nonLeaderIndex = payments
            .filter(p => p.userId !== leaderId && !bandMemberIds.includes(p.userId))
            .findIndex(p => p.id === payment.id)
        return {
            label: getMemberLabel(nonLeaderIndex >= 0 ? nonLeaderIndex : index),
            isLeader: false,
            isRegistered: false
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                <p className="text-slate-500 font-bold">データを読み込み中...</p>
            </div>
        )
    }

    const paidCount = payments.filter(p => p.paymentStatus === 'Paid').length
    const totalCount = payments.length

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <Card className="max-w-md w-full shadow-2xl rounded-3xl border-0 overflow-hidden">
                {/* ヘッダー */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white text-center">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-200 mb-1">Split Payment</p>
                    <h1 className="text-2xl font-black tracking-tight drop-shadow-sm">割り勘決済</h1>
                    <p className="text-indigo-100 mt-2 text-sm">
                        全員の支払いが完了すると予約が確定します
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1">
                        <span className="text-sm font-bold">{paidCount} / {totalCount} 名 完了</span>
                    </div>
                </div>

                <CardContent className="pt-8 space-y-8 bg-white">

                    {/* ── 決済リンク共有セクション（代表者向け） ── */}
                    <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Share2 className="text-indigo-500" size={18} />
                            <p className="font-bold text-indigo-700 text-sm">メンバーにリンクを送る</p>
                        </div>
                        <p className="text-xs text-indigo-500 leading-relaxed">
                            以下のリンクをコピーして、LINEやメッセージなど任意の方法でメンバーに送ってください。
                        </p>
                        <div className="flex items-center gap-2 bg-white border border-indigo-200 rounded-xl p-2">
                            <p className="text-[11px] text-slate-500 font-mono flex-1 truncate">{currentUrl}</p>
                        </div>
                        <Button
                            onClick={handleCopyLink}
                            className={`w-full font-bold rounded-xl transition-all ${isCopied
                                ? 'bg-emerald-500 hover:bg-emerald-500 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                }`}
                        >
                            {isCopied ? (
                                <>
                                    <Check size={16} className="mr-2" />
                                    コピーしました！
                                </>
                            ) : (
                                <>
                                    <Copy size={16} className="mr-2" />
                                    リンクをコピー
                                </>
                            )}
                        </Button>
                    </div>

                    {/* プログレスバー */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">お支払い状況</span>
                            <span className="text-sm font-black text-indigo-600">{Math.round(progress)}% 完了</span>
                        </div>
                        <Progress value={progress} className="h-4 bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-indigo-500 [&>div]:to-purple-500 shadow-inner" />
                    </div>

                    {/* メンバー一覧 */}
                    <div className="space-y-3">
                        {payments.map((payment, index) => {
                            const { label, isLeader, isRegistered } = getMemberDisplayName(payment, index)
                            return (
                                <div key={payment.id} className={`flex items-center justify-between p-4 rounded-2xl border shadow-sm transition-all hover:shadow-md ${isLeader
                                    ? 'bg-indigo-50 border-indigo-200'
                                    : 'bg-slate-50 border-slate-100'
                                    }`}>
                                    <div className="flex items-center gap-3">
                                        {/* 支払い状態アイコン */}
                                        {payment.paymentStatus === 'Paid' ? (
                                            <CheckCircle2 className="text-emerald-500 shrink-0" size={26} />
                                        ) : (
                                            <Circle
                                                className="text-slate-300 cursor-pointer hover:text-indigo-400 transition-colors shrink-0"
                                                size={26}
                                                onClick={() => handlePay(payment.id)}
                                            />
                                        )}

                                        {/* メンバー情報 */}
                                        <div>
                                            <div className="flex items-center gap-2">
                                                {isLeader ? (
                                                    <Crown size={12} className="text-indigo-500 shrink-0" />
                                                ) : isRegistered ? (
                                                    <User size={12} className="text-slate-400 shrink-0" />
                                                ) : (
                                                    <User size={12} className="text-slate-300 shrink-0" />
                                                )}
                                                <p className={`font-bold ${isLeader ? 'text-indigo-700' : 'text-slate-800'}`}>
                                                    {label}
                                                </p>
                                                {isLeader && (
                                                    <span className="text-[9px] font-black bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full uppercase tracking-wide">
                                                        代表者
                                                    </span>
                                                )}
                                                {!isRegistered && !isLeader && (
                                                    <span className="text-[9px] font-bold bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full">
                                                        未登録
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm font-semibold text-slate-500 mt-0.5">
                                                ¥{payment.amount.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* アクションボタン */}
                                    <div className="shrink-0">
                                        {payment.paymentStatus === 'Pending' && (
                                            <Button
                                                onClick={() => handlePay(payment.id)}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md text-sm px-4"
                                            >
                                                支払う
                                            </Button>
                                        )}
                                        {payment.paymentStatus === 'Paid' && (
                                            <span className="text-xs font-black text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-full">
                                                支払済
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* 全員完了バナー */}
                    {progress === 100 && (
                        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center shadow-inner">
                            <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-3" />
                            <p className="font-bold text-emerald-800 mb-1">全員の支払いが完了しました！</p>
                            <p className="text-sm text-emerald-600 font-medium">予約が確定しました。スタジオへ完了通知が送信されました。</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* チェックイン・ゲート（未ログイン時） */}
            <Dialog open={showCheckInGate && !isLoggedIn} onOpenChange={setShowCheckInGate}>
                <DialogContent className="sm:max-w-md rounded-3xl p-6">
                    <DialogHeader className="space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-200">
                            <span className="text-3xl">🎁</span>
                        </div>
                        <DialogTitle className="text-2xl font-black text-center text-slate-800">今すぐ登録してお得に！</DialogTitle>
                        <DialogDescription className="text-center text-slate-600 font-medium">
                            JOCOLLA会員に登録すると、<span className="text-orange-500 font-bold">Activaクーポン</span>が即座に適用され、
                            今回の支払いから<strong className="text-orange-600 text-lg mx-1">500円安く</strong>決済できます。
                        </DialogDescription>
                    </DialogHeader>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 my-4 text-center shadow-inner">
                        <p className="text-sm text-slate-500 mb-1">通常の支払い額</p>
                        <p className="text-slate-400 line-through decoration-slate-400 mb-2">¥1,500</p>
                        <p className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-1">割引適用後</p>
                        <p className="text-3xl font-black text-orange-600">¥1,000</p>
                    </div>
                    <DialogFooter className="flex-col sm:flex-col gap-3">
                        <Button onClick={handleRegister} className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg font-bold py-6 rounded-xl shadow-lg shadow-orange-200 border-0">
                            今すぐ登録して500円OFF
                        </Button>
                        <Button variant="ghost" onClick={() => { setShowCheckInGate(false); setIsLoggedIn(true); }} className="w-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl">
                            今は登録せずに定価で支払う
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
