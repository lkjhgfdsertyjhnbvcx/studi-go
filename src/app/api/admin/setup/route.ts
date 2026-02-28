import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * 管理者アカウントの初期セットアップ
 * /api/admin/setup にブラウザでアクセスすると実行されます。
 */
export async function GET() {
  try {
    const adminEmail = "admin@example.com";
    const adminPassword = "password123";      // 🌟 ここを好きなPWに変更してください

    const admin = await (prisma as any).admin.upsert({
      where: { email: adminEmail },
      update: { password: adminPassword },
      create: {
        email: adminEmail,
        password: adminPassword,
        name: "Admin User",
      },
    });

    return NextResponse.json({
      success: true,
      message: "管理者アカウントをセットアップしました。",
      adminEmail: admin.email
    });
  } catch (error: any) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
