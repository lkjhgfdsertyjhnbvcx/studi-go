module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/music-studio-app/src/actions/reset-password.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40020c1696fff53ee13126b2739c062f3595ffa404":"resetPasswordAction","40db2dc8ace2843fdbdfb90551bbe8fb6738fc43e0":"sendPasswordResetAction"},"",""] */ __turbopack_context__.s([
    "resetPasswordAction",
    ()=>resetPasswordAction,
    "sendPasswordResetAction",
    ()=>sendPasswordResetAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/uuid/dist-node/v4.js [app-rsc] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/resend/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
const USERS_DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'users.json');
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
// Helper functions
const getUsers = ()=>{
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(USERS_DB_PATH)) return [];
    try {
        const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(USERS_DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch  {
        return [];
    }
};
const saveUsers = (users)=>{
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(USERS_DB_PATH, JSON.stringify(users, null, 2));
};
async function sendPasswordResetAction(formData) {
    const email = formData.get('email');
    if (!email) {
        return {
            success: false,
            message: 'メールアドレスを入力してください。'
        };
    }
    const users = getUsers();
    const userIndex = users.findIndex((u)=>u.email === email);
    const user = users[userIndex];
    if (!user) {
        return {
            success: false,
            message: 'このメールアドレスは登録されていません。'
        };
    }
    // Generate Token
    const resetToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    // Save Token to User
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    users[userIndex] = user;
    saveUsers(users);
    // Send Email
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
    if (process.env.RESEND_API_KEY) {
        try {
            const { error } = await resend.emails.send({
                from: 'Studi-Go <onboarding@resend.dev>',
                to: email,
                subject: '【Studi-Go】パスワード再設定のご案内',
                html: `
                    <h1>パスワード再設定</h1>
                    <p>パスワードの再設定リクエストを受け付けました。</p>
                    <p>以下のリンクをクリックして、新しいパスワードを設定してください。</p>
                    <p><a href="${resetUrl}">${resetUrl}</a></p>
                    <p>このリンクは1時間有効です。</p>
                    <p>お心当たりがない場合は、このメールを無視してください。</p>
                `
            });
            if (error) {
                console.error('[Reset Password] ❌ Resend Error (Returned):', error);
                console.log(`[Reset Password] ⚠️ Email failed. DEV MODE: Reset URL is ${resetUrl}`);
                // For development convenience, return success with the link if email fails
                return {
                    success: true,
                    message: `(開発モード) メール送信に失敗しましたが、リセットURLを発行しました: ${resetUrl}`
                };
            }
            console.log(`[Reset Password] 📧 Email sent to ${email} via Resend.`);
            return {
                success: true,
                message: 'パスワード再設定用のメールを送信しました。'
            };
        } catch (error) {
            console.error('[Reset Password] ❌ Failed to send email via Resend (Exception):', error);
            // In dev/debug
            console.log(`[Reset Password] 🧪 DEV MODE: Reset URL is ${resetUrl}`);
            return {
                success: true,
                message: 'メール送信に失敗しました。(Dev: コンソールを確認)'
            };
        }
    } else {
        console.log(`[Reset Password] ⚠️ No Resend API Key. DEV MODE: Reset URL is ${resetUrl}`);
        return {
            success: true,
            message: '送信しました(Dev: コンソールを確認してください)'
        };
    }
}
async function resetPasswordAction(formData) {
    const token = formData.get('token');
    const password = formData.get('password');
    if (!token || !password) {
        return {
            success: false,
            message: '無効なリクエストです。'
        };
    }
    const users = getUsers();
    const userIndex = users.findIndex((u)=>u.resetToken === token);
    const user = users[userIndex];
    if (!user) {
        return {
            success: false,
            message: '無効なまたは期限切れのリンクです。'
        };
    }
    // Check expiry
    if (user.resetTokenExpiry && user.resetTokenExpiry < Date.now()) {
        return {
            success: false,
            message: 'リンクの有効期限が切れています。もう一度リクエストしてください。'
        };
    }
    // Update Password
    user.password = password;
    // Clear token
    delete user.resetToken;
    delete user.resetTokenExpiry;
    users[userIndex] = user;
    saveUsers(users);
    return {
        success: true,
        message: 'パスワードを変更しました。ログインしてください。'
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    sendPasswordResetAction,
    resetPasswordAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendPasswordResetAction, "40db2dc8ace2843fdbdfb90551bbe8fb6738fc43e0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resetPasswordAction, "40020c1696fff53ee13126b2739c062f3595ffa404", null);
}),
"[project]/music-studio-app/.next-internal/server/app/forgot-password/page/actions.js { ACTIONS_MODULE0 => \"[project]/music-studio-app/src/actions/reset-password.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$reset$2d$password$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/reset-password.ts [app-rsc] (ecmascript)");
;
}),
"[project]/music-studio-app/.next-internal/server/app/forgot-password/page/actions.js { ACTIONS_MODULE0 => \"[project]/music-studio-app/src/actions/reset-password.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40db2dc8ace2843fdbdfb90551bbe8fb6738fc43e0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$reset$2d$password$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendPasswordResetAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f2e$next$2d$internal$2f$server$2f$app$2f$forgot$2d$password$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$reset$2d$password$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/music-studio-app/.next-internal/server/app/forgot-password/page/actions.js { ACTIONS_MODULE0 => "[project]/music-studio-app/src/actions/reset-password.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$reset$2d$password$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/reset-password.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bdd95c75._.js.map