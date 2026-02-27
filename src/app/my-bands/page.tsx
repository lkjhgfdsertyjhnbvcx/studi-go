'use client'

import { useEffect, useState } from 'react'
import BandManagement from '@/components/BandManagement'
import { checkUserSetupAction } from '@/actions/user-setup'
import { Loader2, ArrowLeft, User } from 'lucide-react'
import Link from 'next/link'

export default function MyBandsPage() {
    const [userId, setUserId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const check = async () => {
            const res = await checkUserSetupAction()
            if (res.success && res.userId) {
                setUserId(res.userId)
            }
            setIsLoading(false)
        }
        check()
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
            </div>
        )
    }

    if (!userId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <p>ページを表示するにはログインが必要です。</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Sticky Navigation Header */}
            <div className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/studios" className="flex items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-colors group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest font-mono">Back to Studios</span>
                    </Link>
                    <div className="flex items-center gap-2 text-purple-400">
                        <User size={18} />
                        <span className="font-black italic text-sm tracking-tighter">USER_DASHBOARD</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-1 bg-purple-500 rounded-full"></div>
                        <h1 className="text-5xl font-black text-foreground tracking-tighter italic uppercase underline decoration-purple-500/30 decoration-8 underline-offset-4">My Bands</h1>
                    </div>
                    <p className="text-muted-foreground uppercase tracking-[0.3em] text-[10px] font-mono leading-relaxed">
                        Profile & Project Management Console // Manage your crews and invitations.
                    </p>
                </div>

                <BandManagement userId={userId} />
            </div>
        </div>
    )
}
