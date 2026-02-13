import { UserBookings } from "@/components/UserBookings";

export default function MyBookingsPage() {
    return (
        <main className="min-h-screen bg-black text-white p-6 md:p-20">
            <div className="max-w-4xl mx-auto">
                <UserBookings />
            </div>
        </main>
    );
}
