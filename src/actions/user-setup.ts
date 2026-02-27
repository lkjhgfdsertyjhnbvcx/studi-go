// src/actions/user-setup.ts
import { NextResponse } from 'next/server';

// 古い名前と新しい名前、両方に対応させます
export async function setupUser() {
    return { success: true, message: "Setup completed" };
}

export async function checkUserSetupAction() {
    return { success: true, message: "Checked" };
}