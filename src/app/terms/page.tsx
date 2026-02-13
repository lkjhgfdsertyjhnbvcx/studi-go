import { termsOfServiceText } from "@/lib/legal-text";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-gray-300 p-8 md:p-20 font-sans">
            <div className="max-w-3xl mx-auto bg-slate-900 border border-white/10 p-10 rounded-xl">
                <h1 className="text-3xl font-bold text-cyan-400 mb-8 border-b border-white/20 pb-4">利用規約</h1>
                <pre className="whitespace-pre-wrap font-sans leading-relaxed text-sm">
                    {termsOfServiceText}
                </pre>
            </div>
        </div>
    );
}
