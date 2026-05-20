"use client";
import React from "react";
import { useParams } from "next/navigation";
import StoreDashboard from "@/components/StoreDashboardContent";

export default function AdminStudioEditPage() {
    const params = useParams();
    const studioId = params.id as string;

    if (!studioId) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-foreground font-bold">スタジオIDが指定されていません</p>
            </div>
        );
    }

    return <StoreDashboard studioId={studioId} isAdmin={true} />;
}
