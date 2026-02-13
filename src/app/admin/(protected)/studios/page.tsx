"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Building2, MapPin, Loader2, Trash2 } from "lucide-react";
import { fetchStudios, createNewStudioAction, deleteStudioAction } from "@/actions/studio";
import { useRouter } from "next/navigation";

export default function StudioListPage() {
    const [studios, setStudios] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const loadStudios = async () => {
        setIsLoading(true);
        const data = await fetchStudios();
        setStudios(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadStudios();
    }, []);

    const handleCreate = async () => {
        if (!confirm("新しいスタジオを登録しますか？")) return;
        const newId = await createNewStudioAction();
        router.push(`/admin/studios/${newId}`);
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!confirm("本当に削除しますか？この操作は取り消せません。")) return;
        await deleteStudioAction(id);
        loadStudios();
    }

    if (isLoading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center"><Loader2 className="animate-spin mr-2" /> Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-cyan-400">スタジオ管理・一覧</h1>
                        <p className="text-gray-400">登録されているスタジオを管理します。</p>
                    </div>
                    <Button onClick={handleCreate} className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold">
                        <Plus className="mr-2 h-4 w-4" /> 新規登録
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studios.map(studio => (
                        <Link key={studio.id} href={`/admin/studios/${studio.id}`} className="block group">
                            <Card className="bg-slate-900 border-white/10 group-hover:border-cyan-500 transition-all h-full relative overflow-hidden">
                                {studio.images && studio.images.length > 0 ? (
                                    <div className="relative w-full h-40">
                                        <Image
                                            src={studio.images[0]}
                                            alt={studio.storeName}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                                    </div>
                                ) : (
                                    <div className="w-full h-40 bg-zinc-800 flex items-center justify-center text-zinc-600">
                                        No Image
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-xl text-white group-hover:text-cyan-400 flex items-center gap-2">
                                        <Building2 className="h-5 w-5" />
                                        {studio.storeName}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {studio.address || "住所未設定"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm text-gray-400">
                                    <div className="flex justify-between">
                                        <span>スタジオ数:</span>
                                        <span className="text-white">{studio.rooms?.length || 0}部屋</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Email:</span>
                                        <span className="text-white truncate max-w-[150px]">{studio.email || "-"}</span>
                                    </div>
                                </CardContent>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="hover:bg-red-900/50 hover:text-red-400" onClick={(e) => handleDelete(studio.id, e)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>
                        </Link>
                    ))}

                    {studios.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-500 bg-white/5 rounded border border-dashed border-white/10">
                            スタジオが登録されていません。右上のボタンから追加してください。
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
