"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    Plus,
    Edit,
    Trash2,
    Megaphone,
    CalendarDays,
    Target,
    Loader2,
} from "lucide-react";
import {
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    fetchStudios,
} from "@/actions/campaign";

interface Campaign {
    id: string;
    title: string;
    description: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    target: "all" | "specific";
    targetStudioIds: string[];
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdAt: string;
}

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [studios, setStudios] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        discountType: "percentage" as "percentage" | "fixed",
        discountValue: 0,
        target: "all" as "all" | "specific",
        targetStudioIds: [] as string[],
        startDate: "",
        endDate: "",
        isActive: true,
    });

    const loadData = async () => {
        setIsLoading(true);
        const [campaignsData, studiosData] = await Promise.all([
            fetchCampaigns(),
            fetchStudios(),
        ]);
        setCampaigns(campaignsData);
        setStudios(studiosData);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleCreate = () => {
        setEditingCampaign(null);
        setFormData({
            title: "",
            description: "",
            discountType: "percentage",
            discountValue: 0,
            target: "all",
            targetStudioIds: [],
            startDate: "",
            endDate: "",
            isActive: true,
        });
        setIsDialogOpen(true);
    };

    const handleEdit = (campaign: Campaign) => {
        setEditingCampaign(campaign);
        setFormData({
            title: campaign.title,
            description: campaign.description,
            discountType: campaign.discountType,
            discountValue: campaign.discountValue,
            target: campaign.target,
            targetStudioIds: campaign.targetStudioIds,
            startDate: campaign.startDate,
            endDate: campaign.endDate,
            isActive: campaign.isActive,
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCampaign) {
            await updateCampaign({ ...formData, id: editingCampaign.id, createdAt: editingCampaign.createdAt });
        } else {
            await createCampaign(formData);
        }

        setIsDialogOpen(false);
        loadData();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("このキャンペーンを削除しますか？")) return;
        await deleteCampaign(id);
        loadData();
    };

    const toggleActive = async (campaign: Campaign) => {
        await updateCampaign({ ...campaign, isActive: !campaign.isActive });
        loadData();
    };

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
                            キャンペーン管理
                        </h1>
                        <p className="text-gray-400">
                            全店舗・個別店舗向けキャンペーンを管理
                        </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={handleCreate}
                                className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold"
                            >
                                <Plus className="mr-2 h-4 w-4" /> 新規作成
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card border-border text-foreground max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-cyan-400">
                                    {editingCampaign ? "キャンペーン編集" : "新規キャンペーン"}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                <div>
                                    <Label htmlFor="title">タイトル</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        className="bg-muted border-border text-foreground"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="description">説明</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        className="bg-muted border-border text-foreground"
                                        rows={3}
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
                                    <Label htmlFor="target">対象</Label>
                                    <Select
                                        value={formData.target}
                                        onValueChange={(value: "all" | "specific") =>
                                            setFormData({
                                                ...formData,
                                                target: value,
                                                targetStudioIds: value === "all" ? [] : formData.targetStudioIds,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="bg-muted border-border text-foreground">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-muted border-border text-foreground">
                                            <SelectItem value="all">全店舗</SelectItem>
                                            <SelectItem value="specific">個別店舗</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {formData.target === "specific" && (
                                    <div>
                                        <Label>対象スタジオ</Label>
                                        <div className="space-y-2 mt-2 max-h-40 overflow-y-auto bg-muted p-3 rounded border border-border">
                                            {studios.map((studio) => (
                                                <label
                                                    key={studio.id}
                                                    className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-2 rounded"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.targetStudioIds.includes(
                                                            studio.id
                                                        )}
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
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="startDate">開始日</Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) =>
                                                setFormData({ ...formData, startDate: e.target.value })
                                            }
                                            className="bg-muted border-border text-foreground"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="endDate">終了日</Label>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) =>
                                                setFormData({ ...formData, endDate: e.target.value })
                                            }
                                            className="bg-muted border-border text-foreground"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={formData.isActive}
                                        onChange={(e) =>
                                            setFormData({ ...formData, isActive: e.target.checked })
                                        }
                                        className="rounded border-white/20"
                                    />
                                    <Label htmlFor="isActive" className="cursor-pointer">
                                        アクティブ
                                    </Label>
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsDialogOpen(false)}
                                        className="border-border text-foreground hover:bg-accent"
                                    >
                                        キャンセル
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-cyan-500 hover:bg-cyan-600 text-cyan-950 font-bold"
                                    >
                                        {editingCampaign ? "更新" : "作成"}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Campaigns List */}
                <div className="grid gap-6">
                    {campaigns.length === 0 ? (
                        <Card className="bg-card border-border">
                            <CardContent className="py-20 text-center text-gray-500">
                                キャンペーンがありません。右上のボタンから作成してください。
                            </CardContent>
                        </Card>
                    ) : (
                        campaigns.map((campaign) => (
                            <Card
                                key={campaign.id}
                                className={`bg-card border ${campaign.isActive ? "border-cyan-500/30" : "border-border"
                                    }`}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Megaphone className="h-5 w-5 text-cyan-400" />
                                                <CardTitle className="text-xl text-foreground">
                                                    {campaign.title}
                                                </CardTitle>
                                                {campaign.isActive && (
                                                    <Badge className="bg-green-900/30 text-green-400 border-green-500/30">
                                                        有効
                                                    </Badge>
                                                )}
                                                {!campaign.isActive && (
                                                    <Badge className="bg-gray-700/30 text-gray-400 border-gray-500/30">
                                                        無効
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-gray-400 text-sm">
                                                {campaign.description}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-white/20 text-foreground hover:bg-white/5"
                                                onClick={() => handleEdit(campaign)}
                                            >
                                                <Edit className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-red-500/30 text-red-400 hover:bg-red-900/20"
                                                onClick={() => handleDelete(campaign.id)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 text-cyan-400" />
                                            <div>
                                                <div className="text-gray-500 text-xs">期間</div>
                                                <div className="text-foreground">
                                                    {campaign.startDate} ~ {campaign.endDate}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Target className="h-4 w-4 text-cyan-400" />
                                            <div>
                                                <div className="text-gray-500 text-xs">対象</div>
                                                <div className="text-foreground">
                                                    {campaign.target === "all"
                                                        ? "全店舗"
                                                        : `${campaign.targetStudioIds.length}店舗`}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-gray-500 text-xs">割引</div>
                                            <div className="text-cyan-400 font-bold">
                                                {campaign.discountType === "percentage"
                                                    ? `${campaign.discountValue}% OFF`
                                                    : `¥${campaign.discountValue.toLocaleString()} OFF`}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end">
                                            <Button
                                                size="sm"
                                                variant={campaign.isActive ? "outline" : "default"}
                                                className={
                                                    campaign.isActive
                                                        ? "border-yellow-500/30 text-yellow-400 hover:bg-yellow-900/20"
                                                        : "bg-cyan-500 hover:bg-cyan-600 text-black"
                                                }
                                                onClick={() => toggleActive(campaign)}
                                            >
                                                {campaign.isActive ? "無効化" : "有効化"}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
