'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { CheckCircle, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function SplitPaymentSuccessPage() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const [allRegistered, setAllRegistered] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // セッションIDをもとに支払い状態を検証
        // ここではデモのため、ランダムで全員登録済みメッセージを出す
        if (sessionId) {
            setAllRegistered(true)
        }
    }, [sessionId])

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6">
            <Card className="max-w-md w-full shadow-2xl rounded-3xl border-0 bg-white/80 backdrop-blur-lg">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <CheckCircle className="text-emerald-500 w-12 h-12" />
                    </div>
                    <CardTitle className="text-3xl font-black text-slate-800 tracking-tight">決済完了</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-4 text-center">
                    <p className="text-slate-600 font-medium text-lg">
                        お客様のお支払いが正常に完了しました。<br />ご協力ありがとうございます！
                    </p>

                    {allRegistered && (
                        <div className="bg-gradient-to-r from-amber-100 to-orange-100 border border-orange-200 p-6 rounded-2xl shadow-sm mt-8 transform transition-all hover:scale-105">
                            <Users className="text-orange-500 w-10 h-10 mx-auto mb-3" />
                            <h3 className="font-black text-orange-800 text-xl mb-2">素晴らしいニュースです！🎉</h3>
                            <p className="text-orange-700 font-medium">
                                バンドメンバー全員がJOCOLLAに登録済みになりました！<br />
                                <span className="text-orange-600 text-sm mt-2 block font-bold">次回以降の予約がよりスムーズになり、全員がもっとお得にスタジオを利用できます。</span>
                            </p>
                        </div>
                    )}

                    <div className="pt-8">
                        <Button
                            onClick={() => router.push('/')}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-200 border-0 text-lg transition-transform active:scale-95"
                        >
                            ホームへ戻る
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
