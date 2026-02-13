import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-900/50 backdrop-blur border border-white/10 p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">ACCOUNT REGISTRATION</h1>
                    <p className="text-gray-400 text-sm">JOCOLLA MUSIC NETWORK</p>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
}
