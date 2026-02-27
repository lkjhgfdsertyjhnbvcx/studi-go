import { fetchUsers, fetchUsersByStudio } from '@/actions/admin';
import { getAuthInfo } from '@/actions/admin-auth';
import { UserListClient } from '@/components/admin/UserListClient';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
    const auth = await getAuthInfo();

    // For Studio Admins, we show customers who used their studio
    // For Platform Admins, we show all users
    const users = auth.isAdmin
        ? await fetchUsers()
        : auth.studioId
            ? await fetchUsersByStudio(auth.studioId)
            : [];

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12 font-sans">
            <header className="mb-10">
                <h1 className="text-4xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 uppercase italic">
                    {auth.isAdmin ? 'プラットフォーム利用者一覧' : '顧客一覧'}
                </h1>
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest leading-relaxed">
                    {auth.isAdmin
                        ? '全登録ユーザーのマスターリスト'
                        : 'あなたのスタジオを利用した履歴のあるメンバー'}
                </p>
            </header>

            <UserListClient users={users} isAdmin={auth.isAdmin} />

            <footer className="mt-12 flex justify-between items-center text-[10px] text-muted-foreground font-mono tracking-widest uppercase pb-10 border-t border-border pt-8">
                <div>ステータス: アクティブ // {users.length} 名のメンバーを表示中</div>
                <div className="flex gap-6">
                    <span className="hover:text-cyan-500 transition-colors cursor-help">SSL_ENCRYPTED</span>
                    <span className="hover:text-cyan-500 transition-colors cursor-help">P_DAT_ACCESS_LEVEL: {auth.isAdmin ? 'A' : 'B'}</span>
                </div>
            </footer>
        </div>
    );
}
