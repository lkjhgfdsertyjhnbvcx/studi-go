"use client";
import React from "react";

export default function LoginPage() {
    return (
        <div className="max-w-md mx-auto p-6 bg-white min-h-screen flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">ログイン</h2>
            <input type="email" placeholder="メールアドレス" className="w-full border border-gray-300 rounded-md p-3 mb-4 outline-none focus:ring-2 focus:ring-purple-500" />
            <input type="password" placeholder="パスワード" className="w-full border border-gray-300 rounded-md p-3 mb-6 outline-none focus:ring-2 focus:ring-purple-500" />
            <button className="w-full py-4 bg-purple-600 text-white rounded-md font-bold text-lg hover:bg-purple-700 shadow-md">
                ログイン
            </button>
        </div>
    );
}