import { privacyPolicyText } from "@/lib/legal-text";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen p-8 md:p-20 font-sans" style={{ background: "#f5f5f7", color: "#1d1d1f" }}>
            <div className="max-w-3xl mx-auto" style={{ background: "#ffffff", border: "1px solid #d2d2d7", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="mb-6">
                    <Link href="/" style={{ color: "#4910bc", fontSize: "14px", textDecoration: "none" }}>← トップへ戻る</Link>
                </div>
                <h1 className="text-3xl font-bold mb-8 pb-4" style={{ color: "#1d1d1f", borderBottom: "1px solid #d2d2d7" }}>プライバシーポリシー</h1>
                <pre className="whitespace-pre-wrap font-sans leading-relaxed text-sm" style={{ color: "#3a3a3c" }}>
                    {privacyPolicyText}
                </pre>
            </div>
        </div>
    );
}
