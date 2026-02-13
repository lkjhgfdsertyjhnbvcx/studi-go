import { fetchPayments } from "@/actions/payment";
import PaymentsClient from "./PaymentsClient";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PaymentsPage() {
    // Fetch data on the server
    const payments = await fetchPayments();

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans tracking-tight">
                <Loader2 className="animate-spin mr-2 h-5 w-5 text-cyan-500" /> Bypassing cache & Loading Ledger...
            </div>
        }>
            <PaymentsClient initialPayments={payments} />
        </Suspense>
    );
}
