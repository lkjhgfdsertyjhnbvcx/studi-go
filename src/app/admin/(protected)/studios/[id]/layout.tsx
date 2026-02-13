import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Studi-Go店舗",
};

export default function StudioDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
