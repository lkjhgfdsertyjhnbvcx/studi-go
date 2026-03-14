import { NextResponse } from "next/server";
import { getAllUsersFromFirestore, saveUserToFirestore } from "@/lib/db-firestore";

// ユーザー一覧（GET）
export async function GET() {
    try {
        const users = await getAllUsersFromFirestore();
        // パスワードは返さない
        const safeUsers = users.map(({ password, ...u }) => u);
        return NextResponse.json(safeUsers);
    } catch (error) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

// ブラックリスト更新（PUT）
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const users = await getAllUsersFromFirestore();
        const user = users.find((u) => u.id === body.id);
        if (!user) return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });

        // TODO: BlacklistはStudioProfile側で管理するため、将来的にはそちらに移行
        await saveUserToFirestore({ ...user });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}