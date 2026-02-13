import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterSuccessPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 text-center">
            <div className="max-w-md w-full bg-slate-900/50 backdrop-blur border border-white/10 p-8 rounded-2xl shadow-2xl space-y-6">
                <h1 className="text-3xl font-bold text-cyan-400">REGISTRATION COMPLETE</h1>
                <p className="text-gray-300">
                    アカウント登録が完了しました。<br />
                    JOCOLLA SNSへの連携も完了しています。
                </p>
                <div className="pt-4">
                    <Link href="/studios">
                        <Button className="w-full bg-white text-black hover:bg-gray-200">スタジオを探す</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
