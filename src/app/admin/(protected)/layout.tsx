import { requireAdminAuth } from '@/actions/admin-auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Studi-Go運営",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Server-side auth check
    await requireAdminAuth();

    return (
        <div className="flex min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
