// 廃止済みデバッグエンドポイント（本番露出防止のため404を返す）
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
}
