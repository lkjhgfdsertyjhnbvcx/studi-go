"use client";
import React, { useEffect, useState } from "react";
import StoreDashboard from "@/components/StoreDashboardContent";

export default function StoreDashboardPage() {
    const [storeId, setStoreId] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem("storeId");
        if (!id) {
            window.location.href = "/store/login";
            return;
        }
        setStoreId(id);
        setChecked(true);
    }, []);

    if (!checked || !storeId) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-foreground font-black text-2xl animate-pulse tracking-widest">SYNCING...</div>
            </div>
        );
    }

    return <StoreDashboard studioId={storeId} />;
}
