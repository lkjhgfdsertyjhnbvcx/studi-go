"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Ticket, Copy, CheckCircle, Loader2, Gift } from "lucide-react";
import {
    fetchCoupons,
    generateCoupon,
    deleteCoupon,
    fetchStudios,
} from "@/actions/coupon";

interface Coupon {
    id: string;
    code: string;
    title: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    maxUses: number;
    usedCount: number;
    validFrom: string;
    validUntil: string;
    targetStudioIds: string[];
    isActive: boolean;
    createdAt: string;
}

export default function CouponsPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [studios, setStudios] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        discountType: "percentage" as "percentage" | "fixed",
        discountValue: 0,
        maxUses: 100,
        validFrom: "",
        validUntil: "",
        targetStudioIds: [] as string[],
    });

    const loadData = async () => {
        setIsLoading(true);
        const [couponsData, studiosData] = await Promise.all([
            fetchCoupons(),
            fetchStudios(),
        ]);
        setCoupons(couponsData);
        setStudios(studiosData);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        await generateCoupon(formData);
        setIsDialogOpen(false);
        setFormData({
            title: "",
            discountType: "percentage",
            discountValue: 0,
            maxUses: 100,
            validFrom: "",
            validUntil: "",
            targetStudioIds: [],
        });
        loadData();
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("このクーポンを削除しますか？")) return;
        await deleteCoupon(id);
        loadData();
    };

    const activeCoupons = coupons.filter((c) => c.isActive);
    const totalUsage = coupons.reduce((sum, c) => sum + c.usedCount, 0);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" /> 読み込み中...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-border pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-cyan-400 mb-2">
                            クーポン管理 (Activa)
                        </h1>
                        <p className="text-gray-400">
                            割引クーポンの発行・管理を行います
                        </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold">
                                <Plus className="mr-2 h-4 w-4" /> クーポン発行
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card border-border text-foreground max-w-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-cyan-400 flex items-center gap-2">
                                    <Gift className="h-5 w-5" />
                                    新規クーポン発行
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleGenerate} className="space-y-4 mt-4">
                                <div>
                                    <Label htmlFor="title">タイトル</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        className="bg-muted border-border text-foreground"
                                        placeholder="例: 新規登録特典"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="discountType">割引タイプ</Label>
                                        <Select
                                            value={formData.discountType}
                                            onValueChange={(value: "percentage" | "fixed") =>
                                                setFormData({ ...formData, discountType: value })
                                            }
                                        >
                                            <SelectTrigger className="bg-muted border-border text-foreground">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-muted border-border text-foreground">
                                                <SelectItem value="percentage">パーセント(%)</SelectItem>
                                                <SelectItem value="fixed">固定額(¥)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="discountValue">
                                            割引値{" "}
                                            {formData.discountType === "percentage" ? "(%)" : "(¥)"}
                                        </Label>
                                        <Input
                                            id="discountValue"
                                            type="number"
                                            value={formData.discountValue}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    discountValue: Number(e.target.value),
                                                })
                                            }
                                            className="bg-muted border-border text-foreground"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="maxUses">最大利用回数</Label>
                                    <Input
                                        id="maxUses"
                                        type="number"
                                        value={formData.maxUses}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                maxUses: Number(e.target.value),
                                            })
                                        }
                                        className="bg-muted border-border text-foreground"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="validFrom">有効開始日</Label>
                                        <Input
                                            id="validFrom"
                                            type="date"
                                            value={formData.validFrom}
                                            onChange={(e) =>
                                                setFormData({ ...formData, validFrom: e.target.value })
                                            }
                                            className="bg-muted border-border text-foreground"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="validUntil">有効終了日</Label>
                                        <Input
                                            id="validUntil"
                                            type="date"
                                            value={formData.validUntil}
                                            onChange={(e) =>
                                                setFormData({ ...formData, validUntil: e.target.value })
                                            }
                                            className="bg-muted border-border text-foreground"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label>対象スタジオ（空欄の場合は全店舗）</Label>
                                    <div className="space-y-2 mt-2 max-h-40 overflow-y-auto bg-muted p-3 rounded border border-border">
                                        <label className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-2 rounded">
                                            <input
                                                type="checkbox"
                                                checked={formData.targetStudioIds.length === 0}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFormData({ ...formData, targetStudioIds: [] });
                                                    }
                                                }}
                                                className="rounded border-white/20"
                                            />
                                            <span className="text-sm font-medium text-cyan-400">
                                                全店舗
                                            </span>
                                        </label>
                                        {studios.map((studio) => (
                                            <label
                                                key={studio.id}
                                                className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-2 rounded"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.targetStudioIds.includes(studio.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setFormData({
                                                                ...formData,
                                                                targetStudioIds: [
                                                                    ...formData.targetStudioIds,
                                                                    studio.id,
                                                                ],
                                                            });
                                                        } else {
                                                            setFormData({
                                                                ...formData,
                                                                targetStudioIds:
                                                                    formData.targetStudioIds.filter(
                                                                        (id) => id !== studio.id
                                                                    ),
                                                            });
                                                        }
                                                    }}
                                                    className="rounded border-white/20"
                                                />
                                                <span className="text-sm">{studio.storeName}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsDialogOpen(false)}
                                        className="border-white/20 text-foreground hover:bg-white/5"
                                    >
                                        キャンセル
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-cyan-500 hover:bg-cyan-600 text-black"
                                    >
                                        発行
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-card border-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">
                                発行済みクーポン
                            </CardTitle>
                            <Ticket className="h-4 w-4 text-cyan-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">
                                {coupons.length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">
                                有効なクーポン
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-400">
                                {activeCoupons.length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">
                                総利用回数
                            </CardTitle>
                            <Gift className="h-4 w-4 text-cyan-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{totalUsage}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Coupons Table */}
                <Card className="bg-card border-border">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-border hover:bg-transparent">
                                    <TableHead className="text-cyan-400">コード</TableHead>
                                    <TableHead className="text-cyan-400">タイトル</TableHead>
                                    <TableHead className="text-cyan-400">割引</TableHead>
                                    <TableHead className="text-cyan-400">利用状況</TableHead>
                                    <TableHead className="text-cyan-400">有効期間</TableHead>
                                    <TableHead className="text-cyan-400">対象</TableHead>
                                    <TableHead className="text-cyan-400">ステータス</TableHead>
                                    <TableHead className="text-cyan-400">アクション</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {coupons.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={8}
                                            className="text-center py-10 text-gray-500"
                                        >
                                            クーポンがありません。右上のボタンから発行してください。
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    coupons.map((coupon) => (
                                        <TableRow
                                            key={coupon.id}
                                            className="border-border hover:bg-white/5"
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <code className="bg-muted px-2 py-1 rounded text-cyan-400 font-mono text-sm">
                                                        {coupon.code}
                                                    </code>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleCopyCode(coupon.code)}
                                                        className="h-6 w-6 p-0"
                                                    >
                                                        {copiedCode === coupon.code ? (
                                                            <CheckCircle className="h-3 w-3 text-green-400" />
                                                        ) : (
                                                            <Copy className="h-3 w-3 text-gray-400" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-foreground">
                                                {coupon.title}
                                            </TableCell>
                                            <TableCell className="font-medium text-cyan-400">
                                                {coupon.discountType === "percentage"
                                                    ? `${coupon.discountValue}%`
                                                    : `¥${coupon.discountValue.toLocaleString()}`}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <span className="text-foreground">{coupon.usedCount}</span>
                                                    <span className="text-gray-500">
                                                        {" "}
                                                        / {coupon.maxUses}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                                                    <div
                                                        className="bg-cyan-500 h-1.5 rounded-full"
                                                        style={{
                                                            width: `${(coupon.usedCount / coupon.maxUses) * 100
                                                                }%`,
                                                        }}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-400">
                                                <div>{coupon.validFrom}</div>
                                                <div>~ {coupon.validUntil}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className="border-cyan-500/30 text-cyan-400"
                                                >
                                                    {coupon.targetStudioIds.length === 0
                                                        ? "全店舗"
                                                        : `${coupon.targetStudioIds.length}店舗`}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {coupon.isActive ? (
                                                    <Badge className="bg-green-900/30 text-green-400 border-green-500/30">
                                                        有効
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-gray-700/30 text-gray-400 border-gray-500/30">
                                                        無効
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-red-500/30 text-red-400 hover:bg-red-900/20"
                                                    onClick={() => handleDelete(coupon.id)}
                                                >
                                                    削除
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
