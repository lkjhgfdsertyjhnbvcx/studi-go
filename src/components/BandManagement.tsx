'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Users, Link as LinkIcon, AlertCircle, Loader2 } from 'lucide-react'
import { createBandAction, fetchMyBands } from '@/actions/band'

type Member = { id: string, name: string, jocollaRegistered: boolean }
type Band = {
    id: string
    name: string
    inviteToken: string
    members: { user: { id: string, name: string | null, jocollaRegistered: boolean } }[]
}

export default function BandManagement({ userId }: { userId: string }) {
    const [bandName, setBandName] = useState('')
    const [myBands, setMyBands] = useState<Band[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => {
        const load = async () => {
            const data = await fetchMyBands()
            setMyBands(data as Band[])
            setIsLoading(false)
        }
        load()
    }, [])

    const createBand = async () => {
        if (!bandName) return
        setIsCreating(true)
        const res = await createBandAction(bandName)
        if (res.success) {
            setBandName('')
            const data = await fetchMyBands()
            setMyBands(data as Band[])
        }
        setIsCreating(false)
    }

    if (isLoading) {
        return (
            <div className="flex justify-center p-10">
                <Loader2 className="animate-spin text-blue-500" />
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto mt-6">
            <Card className="shadow-xl rounded-2xl overflow-hidden border border-border">
                <CardHeader className="bg-muted/30 border-b border-border">
                    <CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                        <Users size={24} className="text-blue-500" /> 新しいバンドを作る
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="flex gap-2">
                        <Input
                            placeholder="バンド名を入力"
                            value={bandName}
                            onChange={e => setBandName(e.target.value)}
                            className="bg-background border-border text-foreground"
                        />
                        <Button onClick={createBand} disabled={isCreating} className="bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                            {isCreating ? '作成中...' : '作成'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {myBands.map(band => (
                <Card key={band.id} className="shadow-lg rounded-2xl overflow-hidden border border-border">
                    <CardHeader className="bg-muted/30 border-b border-border py-3 px-4 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-bold text-foreground">
                            {band.name}
                        </CardTitle>
                        <div className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold">
                            メンバー {band.members.length}名
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl space-y-3">
                            <p className="text-sm font-semibold text-blue-500 flex items-center gap-2">
                                <LinkIcon size={16} /> メンバー招待URL
                            </p>
                            <Input
                                readOnly
                                value={`${window.location.origin}/invite/${band.inviteToken}`}
                                className="bg-background border-border text-foreground shadow-inner text-xs focus-visible:ring-blue-500/30"
                            />
                            <div className="flex gap-2 text-[10px]">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full border-blue-500/30 text-blue-500 bg-background hover:bg-blue-500/10"
                                    onClick={() => {
                                        const url = `${window.location.origin}/invite/${band.inviteToken}`
                                        navigator.clipboard.writeText(url)
                                        alert('URLをコピーしました！')
                                    }}
                                >
                                    URLをコピー
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-widest border-b border-border pb-2">参加中メンバー</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {band.members.map(({ user }) => (
                                    <li key={user.id} className="flex items-center gap-3 p-2 bg-muted/20 rounded-lg border border-border">
                                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                            {user.name?.charAt(0) || 'U'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-foreground text-sm truncate">{user.name || 'Unknown User'}</p>
                                        </div>
                                        {!user.jocollaRegistered && (
                                            <div className="flex items-center text-[10px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 whitespace-nowrap">
                                                未登録
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

