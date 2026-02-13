import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Studi-Go運営",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
