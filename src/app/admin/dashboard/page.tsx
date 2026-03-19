"use client";
import { useEffect } from "react";

export default function AdminDashboardRedirect() {
    useEffect(() => {
        window.location.replace("/admin/platform/login");
    }, []);
    return null;
}
