import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface AuthInfo {
  isAdmin: boolean;
  studioId: string | null;
}

/**
 * APIルートからセッション情報を取得
 */
export async function getApiAuth(): Promise<AuthInfo> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("__session")?.value;

    if (!session) return { isAdmin: false, studioId: null };

    const data = JSON.parse(session);
    return {
      isAdmin: data.type === "admin",
      studioId: data.type === "studio" ? data.id : null,
    };
  } catch {
    return { isAdmin: false, studioId: null };
  }
}

/**
 * プラットフォーム管理者のみ許可
 */
export async function requirePlatformAdmin(): Promise<NextResponse | null> {
  const auth = await getApiAuth();
  if (!auth.isAdmin) {
    return NextResponse.json({ error: "管理者権限が必要です" }, { status: 403 });
  }
  return null;
}

/**
 * 管理者 or スタジオオーナーのみ許可
 */
export async function requireAuth(): Promise<{ error: NextResponse } | { auth: AuthInfo }> {
  const auth = await getApiAuth();
  if (!auth.isAdmin && !auth.studioId) {
    return { error: NextResponse.json({ error: "認証が必要です" }, { status: 401 }) };
  }
  return { auth };
}
