"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    // チェックボックスの状態を管理
    const [agreedTerms, setAgreedTerms] = useState(false);
    const [agreedPrivacy, setAgreedPrivacy] = useState(false);

    // 登録ボタンを押した時の動き（仮）
    const handleRegister = () => {
        if (!agreedTerms || !agreedPrivacy) {
            alert("利用規約とプライバシーポリシーに同意してください。");
            return;
        }
        // 本来はここでDB保存しますが、今はデモ用に予約画面に戻るか、マイページへ飛ばします
        alert("ユーザー登録が完了しました！Activaクーポンが付与されました。");
        router.push("/reservation");
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white min-h-screen">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">新規ユーザー登録</h2>

            {/* Activaクーポン訴求バナー */}
            <div className="mb-8 p-4 bg-purple-50 border border-purple-100 rounded-lg text-center">
                <p className="text-purple-700 font-bold text-sm">🎁 今すぐ登録して</p>
                <p className="text-purple-900 font-black text-lg">ActivaクーポンをGET！</p>
            </div>

            <form className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">お名前</label>
                    <input type="text" placeholder="山田 太郎" className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-purple-500 outline-none text-gray-800" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス</label>
                    <input type="email" placeholder="example@studi-go.com" className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-purple-500 outline-none text-gray-800" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">パスワード</label>
                    <input type="password" placeholder="8文字以上の英数字" className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-purple-500 outline-none text-gray-800" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">電話番号</label>
                    <input type="tel" placeholder="09012345678" className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-purple-500 outline-none text-gray-800" />
                </div>

                {/* 規約同意 */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreedTerms}
                            onChange={(e) => setAgreedTerms(e.target.checked)}
                            className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                            <Link href="/terms" className="text-purple-600 underline">利用規約</Link> に同意する
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="privacy"
                            checked={agreedPrivacy}
                            onChange={(e) => setAgreedPrivacy(e.target.checked)}
                            className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                        />
                        <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                            <Link href="/privacy" className="text-purple-600 underline">プライバシーポリシー</Link> に同意する
                        </label>
                    </div>
                </div>

                {/* 登録ボタンに動作（onClick）を追加しました */}
                <button
                    type="button"
                    onClick={handleRegister}
                    className={`w-full py-4 rounded-md font-bold text-lg shadow-sm transition-all mt-4 text-white ${agreedTerms && agreedPrivacy ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    同意して新規登録する
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">すでにアカウントをお持ちの方は</p>
                <Link href="/login" className="text-sm font-bold text-purple-600 hover:underline">ログイン画面へ</Link>
            </div>
        </div>
    );
}