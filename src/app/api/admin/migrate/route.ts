import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import {
    saveStudioToFirestore,
    saveUserToFirestore,
    saveBookingToFirestore,
    savePaymentToFirestore
} from '@/lib/db-firestore';

// Ultimate sanitize: ensure plain object, no undefined, no custom classes
function ultraSanitize(obj: any): any {
    if (obj === null || obj === undefined) return null;

    // If it's not an object (primitive), return as is
    if (typeof obj !== 'object') return obj;

    // Handle Arrays
    if (Array.isArray(obj)) {
        return obj.map(ultraSanitize);
    }

    // Handle Objects
    const result: any = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (value === undefined) continue;

            // Specifically handle designSettings to be a clean map
            if (key === 'designSettings' && value && typeof value === 'object') {
                result[key] = {
                    logoSize: Number(value.logoSize) || 100,
                    backgroundColor: String(value.backgroundColor || "#000000"),
                    backgroundType: String(value.backgroundType || "color"),
                    backgroundImageUrl: value.backgroundImageUrl ? String(value.backgroundImageUrl) : "",
                    showMap: value.showMap !== false // default to true
                };
            } else {
                result[key] = ultraSanitize(value);
            }
        }
    }
    return result;
}

export async function POST(req: NextRequest) {
    const logs: string[] = [];
    const baseDir = path.join(process.cwd(), 'data');

    try {
        // --- 1. Migrating Studios ---
        const studioPath = path.join(baseDir, 'studios.json');
        if (fs.existsSync(studioPath)) {
            const data = JSON.parse(fs.readFileSync(studioPath, 'utf-8'));
            let count = 0;
            let errors = 0;
            for (const item of data) {
                try {
                    if (!item.id) continue;
                    await saveStudioToFirestore(ultraSanitize(item));
                    count++;
                } catch (e) {
                    errors++;
                    console.error(`Migration fail for studio ${item.id}:`, e);
                }
            }
            logs.push(`Migrated ${count} studios. (Errors: ${errors})`);
        }

        // --- 2. Migrating Users ---
        const userPath = path.join(baseDir, 'users.json');
        if (fs.existsSync(userPath)) {
            const data = JSON.parse(fs.readFileSync(userPath, 'utf-8'));
            for (const item of data) {
                if (!item.id) continue;
                await saveUserToFirestore(ultraSanitize(item));
            }
            logs.push(`Migrated ${data.length} users.`);
        }

        // --- 3. Migrating Bookings ---
        const bookingPath = path.join(baseDir, 'bookings.json');
        if (fs.existsSync(bookingPath)) {
            const data = JSON.parse(fs.readFileSync(bookingPath, 'utf-8'));
            for (const item of data) {
                if (!item.id) continue;
                await saveBookingToFirestore(ultraSanitize(item));
            }
            logs.push(`Migrated ${data.length} bookings.`);
        }

        // --- 4. Migrating Payments ---
        const paymentPath = path.join(baseDir, 'payments.json');
        if (fs.existsSync(paymentPath)) {
            const data = JSON.parse(fs.readFileSync(paymentPath, 'utf-8'));
            for (const item of data) {
                if (!item.id) continue;
                await savePaymentToFirestore(ultraSanitize(item));
            }
            logs.push(`Migrated ${data.length} payments.`);
        }

        return NextResponse.json({ success: true, logs });

    } catch (e: any) {
        console.error("Critical Migration Error:", e);
        return NextResponse.json({ success: false, message: e.message }, { status: 500 });
    }
}
