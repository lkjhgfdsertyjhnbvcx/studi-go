// src/actions/user-setup.ts

// 古い名前と新しい名前、両方に対応させます
export async function setupUser() {
    return { success: true, message: "Setup completed" };
}

export async function checkUserSetupAction(): Promise<{ success: boolean; message: string; userId?: string }> {
    return { success: true, message: "Checked" };
}