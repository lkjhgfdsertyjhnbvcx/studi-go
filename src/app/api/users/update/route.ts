import { NextResponse } from "next/server";
import { getUserByIdFromFirestore, saveUserToFirestore } from "@/lib/db-firestore";

export async function PUT(request: Request) {
    return handleUpdate(request);
}

export async function POST(request: Request) {
    return handleUpdate(request);
}

async function handleUpdate(request: Request) {
    try {
        const raw = await request.json();
        // 入力バリデーション
        const { z } = await import("zod");
        const parsed = z.object({
            userId: z.string().max(200).optional(),
            id: z.string().max(200).optional(),
            name: z.string().max(200).optional(),
            phone: z.string().max(50).optional(),
            email: z.string().email().max(320).optional().or(z.literal("")),
            address: z.string().max(500).optional(),
        }).safeParse(raw);
        if (!parsed.success) {
            return NextResponse.json({ error: "入力内容が正しくありません。" }, { status: 400 });
        }
        const body = parsed.data;
        const { name, phone, email, address } = body;

        // IDOR対策: セッションクッキー検証済みのuserIdを優先（無ければ互換で申告値）
        const { resolveUserId } = await import("@/lib/user-session");
        const userId = await resolveUserId(body.userId || body.id);

        if (!userId) {
            return NextResponse.json({ error: "認証情報が必要です" }, { status: 401 });
        }

        const user = await getUserByIdFromFirestore(userId);
        if (!user) return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });

        // 指定されたフィールドのみ更新（undefinedで既存値を消さない）
        const updated = {
            ...user,
            ...(name !== undefined ? { name } : {}),
            ...(phone !== undefined ? { phone } : {}),
            ...(email !== undefined ? { email } : {}),
            ...(address !== undefined ? { address } : {}),
        };
        await saveUserToFirestore(updated);

        const { password, ...safeUser } = updated;
        return NextResponse.json({ success: true, ...safeUser });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
