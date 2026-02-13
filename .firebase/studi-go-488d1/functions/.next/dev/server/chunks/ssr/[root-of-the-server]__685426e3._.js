module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/music-studio-app/src/lib/db-local.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkAvailability",
    ()=>checkAvailability,
    "getBookings",
    ()=>getBookings,
    "saveBooking",
    ()=>saveBooking
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'bookings.json');
// Initialize DB file if not exists
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(DB_PATH)) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}
const getBookings = ()=>{
    try {
        const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};
const saveBooking = (booking)=>{
    const bookings = getBookings();
    bookings.push(booking);
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(DB_PATH, JSON.stringify(bookings, null, 2));
};
const checkAvailability = (date, startTime, duration)=>{
    const bookings = getBookings();
    // Convert new request to minutes from midnight
    const [startH, startM] = startTime.split(':').map(Number);
    const newStart = startH * 60 + startM;
    const newEnd = newStart + duration * 60;
    // Filter bookings for the same day
    const sameDayBookings = bookings.filter((b)=>b.date === date);
    for (const b of sameDayBookings){
        const [h, m] = b.startTime.split(':').map(Number);
        const bStart = h * 60 + m;
        const bEnd = bStart + b.durationHours * 60;
        // Overlap logic: (StartA < EndB) and (EndA > StartB)
        if (newStart < bEnd && newEnd > bStart) {
            return false; // Overlap found
        }
    }
    return true; // No overlap
};
}),
"[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40caca3610ff76b0627662db1d5c81852ddbb2cb8f":"createBooking"},"",""] */ __turbopack_context__.s([
    "createBooking",
    ()=>createBooking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$local$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/db-local.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const PRICE_BAND_HOURLY = 2500;
const PRICE_INDIVIDUAL_HOURLY = 800;
const PRICE_LOCKOUT_FLAT = 20000;
async function createBooking(data) {
    const { userId, studioId, date, startTime, durationHours, userCount } = data;
    console.log("Processing booking request:", data);
    // 1. INVENTORY CHECK (Double Booking Prevention)
    const isAvailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$local$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkAvailability"])(date, startTime, durationHours);
    if (!isAvailable) {
        return {
            success: false,
            message: "🚫 This time slot is already booked! Please choose another time."
        };
    }
    // 2. Calculate Price
    let totalPrice = 0;
    const bookingDate = new Date(date);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const targetDate = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate());
    const isTodayOrTomorrow = targetDate.getTime() === today.getTime() || targetDate.getTime() === tomorrow.getTime();
    if (durationHours >= 10) {
        totalPrice = PRICE_LOCKOUT_FLAT;
    } else if (userCount <= 2 && isTodayOrTomorrow) {
        totalPrice = PRICE_INDIVIDUAL_HOURLY * userCount * durationHours;
    } else {
        totalPrice = PRICE_BAND_HOURLY * durationHours;
    }
    // 3. Save to Local DB
    const newBooking = {
        id: Math.random().toString(36).substring(7),
        userId,
        studioId,
        date,
        startTime,
        durationHours,
        userCount,
        totalPrice,
        createdAt: new Date().toISOString()
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$local$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveBooking"])(newBooking);
    return {
        success: true,
        message: "Booking successful!",
        price: totalPrice,
        bookingId: newBooking.id
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createBooking
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createBooking, "40caca3610ff76b0627662db1d5c81852ddbb2cb8f", null);
}),
"[project]/music-studio-app/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$booking$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)");
;
}),
"[project]/music-studio-app/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40caca3610ff76b0627662db1d5c81852ddbb2cb8f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$booking$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createBooking"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$booking$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/music-studio-app/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$booking$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)");
}),
"[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__685426e3._.js.map