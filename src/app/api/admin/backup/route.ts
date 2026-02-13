import { NextResponse } from 'next/server';

// サーバーサイド処理は廃止し、クライアントサイドでの処理に移行します。
// このAPIは現在使用されていませんが、エンドポイントとして残しておきます。

export async function POST() {
    return NextResponse.json({
        success: true,
        message: "この機能はクライアントサイド・ダウンロードに移行しました。"
    });
}
