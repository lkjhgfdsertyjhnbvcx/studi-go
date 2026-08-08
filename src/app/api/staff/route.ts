// スタッフ管理API。
//
// 260807:
//   - パスワードを平文のまま Firestore に保存していた（studios[].staff[].password）。
//     verifyPassword に平文の後方互換があるためログインは通ってしまい、気づけない。
//     承認時に発行する仮パスワードはハッシュで入るので、ここで平文に戻されると台無しになる。
//   - 権限チェックが body の requesterId 自己申告のみで、セッション確認が無かった。
//     studioId と requesterId を知っていれば誰でもスタッフを追加・削除できる。
import { NextResponse } from "next/server";
import { getStudioByIdFromFirestore, saveStudioToFirestore } from "@/lib/db-firestore";
import { getApiAuth } from "@/lib/api-auth";
import { hashPassword, verifyPassword } from "@/lib/password";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

function getStudioId(request: Request) {
    const { searchParams } = new URL(request.url);
    return searchParams.get("studioId") ?? "";
}

/** 管理者 or 当該スタジオのオーナーだけ許可する */
async function denyIfNotOwner(studioId: string | null | undefined) {
    const auth = await getApiAuth();
    if (auth.isAdmin) return null;
    if (!auth.studioId) return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    if (!studioId || auth.studioId !== studioId) {
        return NextResponse.json({ error: "権限がありません" }, { status: 403 });
    }
    return null;
}

export async function GET(request: Request) {
    try {
        const studioId = getStudioId(request);
        if (!studioId) return NextResponse.json({ error: "studioIdが必要です" }, { status: 400 });
        const denied = await denyIfNotOwner(studioId);
        if (denied) return denied;

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        const safeStaff = (studio.staff ?? []).map(({ password, ...s }) => s);
        return NextResponse.json(safeStaff);
    } catch (error) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studioId, name, email, phone, role, password, requesterId } = body;
        const denied = await denyIfNotOwner(studioId);
        if (denied) return denied;

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        // 管理者権限チェック
        const requester = (studio.staff ?? []).find((s) => s.id === requesterId);
        if (!requester || requester.role !== "admin") {
            return NextResponse.json({ error: "管理者権限が必要です" }, { status: 403 });
        }

        const newStaff = {
            id: uuidv4(),
            name: name || "新規スタッフ",
            email: email || "",
            phone: phone || "",
            // 平文で保存しない。空パスワードはログイン不可（verifyPassword が false を返す）。
            password: password ? hashPassword(password) : "",
            role: role || "staff" as const,
            createdAt: new Date().toISOString(),
        };

        const updated = { ...studio, staff: [...(studio.staff ?? []), newStaff] };
        await saveStudioToFirestore(updated);

        const { password: _pw, ...safeStaff } = newStaff;
        return NextResponse.json(safeStaff);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { studioId, id, name, email, phone, role, password, newPassword, requesterId } = body;
        const denied = await denyIfNotOwner(studioId);
        if (denied) return denied;

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        // 管理者権限チェック（自分自身の変更か、管理者による変更のみ許可）
        const requester = (studio.staff ?? []).find((s) => s.id === requesterId);
        const isSelf = requesterId === id;
        const isAdmin = requester?.role === "admin";

        if (!isSelf && !isAdmin) {
            return NextResponse.json({ error: "権限がありません" }, { status: 403 });
        }

        // 自分のパスワード変更は現在のパスワード確認が必要
        if (isSelf && newPassword) {
            const self = (studio.staff ?? []).find((s) => s.id === id);
            // ハッシュ・平文（移行期の旧データ）どちらでも照合できるよう verifyPassword を使う
            if (!verifyPassword(String(password ?? ""), String(self?.password ?? ""))) {
                return NextResponse.json({ error: "現在のパスワードが正しくありません" }, { status: 400 });
            }
        }

        const updatedStaff = (studio.staff ?? []).map((s) => {
            if (s.id !== id) return s;
            const updated: any = { ...s };
            if (name !== undefined) updated.name = name;
            if (email !== undefined) updated.email = email;
            if (phone !== undefined) updated.phone = phone;
            // roleの変更は管理者のみ（自分自身のrole変更は不可）
            if (role !== undefined && isAdmin && !isSelf) updated.role = role;
            // パスワード変更
            if (newPassword) updated.password = hashPassword(String(newPassword));
            else if (password && isAdmin && !isSelf) updated.password = hashPassword(String(password)); // 管理者が他スタッフのPW設定
            // 仮パスワードのままログインしている場合のフラグ解除
            if (newPassword) updated.mustChangePassword = false;
            return updated;
        });

        await saveStudioToFirestore({ ...studio, staff: updatedStaff });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const studioId = searchParams.get("studioId");
        const requesterId = searchParams.get("requesterId");

        if (!id || !studioId) return NextResponse.json({ error: "id・studioIdが必要です" }, { status: 400 });
        const denied = await denyIfNotOwner(studioId);
        if (denied) return denied;

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        // 管理者権限チェック
        const requester = (studio.staff ?? []).find((s) => s.id === requesterId);
        if (!requester || requester.role !== "admin") {
            return NextResponse.json({ error: "管理者権限が必要です" }, { status: 403 });
        }

        // 自分自身は削除不可
        if (id === requesterId) {
            return NextResponse.json({ error: "自分自身は削除できません" }, { status: 400 });
        }

        const updatedStaff = (studio.staff ?? []).filter((s) => s.id !== id);
        await saveStudioToFirestore({ ...studio, staff: updatedStaff });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
