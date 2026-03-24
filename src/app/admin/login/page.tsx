"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// このページは廃止。正しい運営ログインは /admin/platform/login
export default function AdminLogin() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/admin/platform/login');
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <p className="text-white text-sm">リダイレクト中...</p>
        </div>
    );
}
