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
const checkAvailability = (studioId, roomName, date, startTime, duration)=>{
    const bookings = getBookings();
    // Convert new request to minutes from midnight
    const [startH, startM] = startTime.split(':').map(Number);
    const newStart = startH * 60 + startM;
    const newEnd = newStart + duration * 60;
    // Filter bookings for the same day AND SAME ROOM
    const conflictingBookings = bookings.filter((b)=>{
        if (b.date !== date) return false;
        if (b.studioId !== studioId) return false;
        // If rooms are defined, they must match. If legacy booking has no room, assumption is risky, but let's assume strict match if roomName provided.
        // For this app, we recently added roomName.
        if (roomName && b.roomName && b.roomName !== roomName) return false;
        return true;
    });
    for (const b of conflictingBookings){
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
"[project]/music-studio-app/src/actions/login.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"008a4238b043ec4500f156fcb67d1507ee6b08edb1":"logoutAction","00cc83454bde0ebb8f0e5beebe1faab4e0e3d9b85c":"getCurrentUser","40cb3a12f77b058d2c5958baae637d31328c65a6ba":"loginAction"},"",""] */ __turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "loginAction",
    ()=>loginAction,
    "logoutAction",
    ()=>logoutAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const USERS_DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'users.json');
const getUsers = ()=>{
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(USERS_DB_PATH)) return [];
    try {
        const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(USERS_DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch  {
        return [];
    }
};
async function loginAction(formData) {
    const email = formData.get('email');
    if (!email) {
        return {
            success: false,
            message: 'メールアドレスを入力してください。'
        };
    }
    const users = getUsers();
    const user = users.find((u)=>u.email === email);
    if (!user) {
        return {
            success: false,
            message: 'ユーザーが見つかりません。アカウント登録はお済みですか？'
        };
    }
    // Set cookie
    // In a real app, use a secure session token. Here we strictly simulate by storing userId.
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set('userId', user.id, {
        httpOnly: true,
        path: '/'
    });
    cookieStore.set('userName', user.name, {
        httpOnly: false,
        path: '/'
    }); // For client usage easily
    return {
        success: true,
        message: 'ログインしました。'
    };
}
async function logoutAction() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete('userId');
    cookieStore.delete('userName');
    return {
        success: true
    };
}
async function getCurrentUser() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) return null;
    const users = getUsers();
    return users.find((u)=>u.id === userId) || null;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    loginAction,
    logoutAction,
    getCurrentUser
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginAction, "40cb3a12f77b058d2c5958baae637d31328c65a6ba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logoutAction, "008a4238b043ec4500f156fcb67d1507ee6b08edb1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCurrentUser, "00cc83454bde0ebb8f0e5beebe1faab4e0e3d9b85c", null);
}),
"[project]/music-studio-app/src/actions/user.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00436b83f3e18cfd5d2704e582c2236e657d47885e":"getMyStudiosAction","4026afb62eb83ec1ef72dfd1cde9a33c6d0e3c93e6":"toggleMyStudioAction","405e8eed8305b79bbe8b5e5225072881f4c3a64a41":"addMyStudioAction"},"",""] */ __turbopack_context__.s([
    "addMyStudioAction",
    ()=>addMyStudioAction,
    "getMyStudiosAction",
    ()=>getMyStudiosAction,
    "getUserById",
    ()=>getUserById,
    "getUsers",
    ()=>getUsers,
    "toggleMyStudioAction",
    ()=>toggleMyStudioAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$login$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/login.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const USERS_DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'users.json');
const getUsers = ()=>{
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(USERS_DB_PATH)) return [];
    try {
        const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(USERS_DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch  {
        return [];
    }
};
const getUserById = (id)=>{
    const users = getUsers();
    return users.find((u)=>u.id === id);
};
const saveUsers = (users)=>{
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(USERS_DB_PATH, JSON.stringify(users, null, 2));
};
async function toggleMyStudioAction(studioId) {
    const currentUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$login$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!currentUser) {
        return {
            success: false,
            message: "Not logged in"
        };
    }
    const users = getUsers();
    const userIndex = users.findIndex((u)=>u.id === currentUser.id);
    if (userIndex === -1) {
        return {
            success: false,
            message: "User not found"
        };
    }
    const user = users[userIndex];
    const myStudios = user.myStudios || [];
    if (myStudios.includes(studioId)) {
        user.myStudios = myStudios.filter((id)=>id !== studioId);
    } else {
        user.myStudios = [
            ...myStudios,
            studioId
        ];
    }
    // Move updated user to index
    users[userIndex] = user;
    saveUsers(users);
    return {
        success: true,
        myStudios: user.myStudios
    };
}
async function addMyStudioAction(studioId) {
    const currentUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$login$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!currentUser) {
        return {
            success: false,
            message: "Not logged in"
        };
    }
    const users = getUsers();
    const userIndex = users.findIndex((u)=>u.id === currentUser.id);
    if (userIndex === -1) {
        return {
            success: false,
            message: "User not found"
        };
    }
    const user = users[userIndex];
    const myStudios = user.myStudios || [];
    if (!myStudios.includes(studioId)) {
        user.myStudios = [
            ...myStudios,
            studioId
        ];
        users[userIndex] = user;
        saveUsers(users);
    }
    return {
        success: true,
        myStudios: user.myStudios
    };
}
async function getMyStudiosAction() {
    const currentUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$login$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!currentUser) return [];
    return currentUser.myStudios || [];
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    toggleMyStudioAction,
    addMyStudioAction,
    getMyStudiosAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleMyStudioAction, "4026afb62eb83ec1ef72dfd1cde9a33c6d0e3c93e6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addMyStudioAction, "405e8eed8305b79bbe8b5e5225072881f4c3a64a41", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMyStudiosAction, "00436b83f3e18cfd5d2704e582c2236e657d47885e", null);
}),
"[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40caca3610ff76b0627662db1d5c81852ddbb2cb8f":"createBooking"},"",""] */ __turbopack_context__.s([
    "createBooking",
    ()=>createBooking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$local$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/db-local.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/user.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
// ... constants ...
const PRICE_BAND_HOURLY = 2500;
const PRICE_INDIVIDUAL_HOURLY = 800;
const PRICE_LOCKOUT_FLAT = 20000;
async function createBooking(data) {
    const { userId, studioId, roomName, date, startTime, durationHours, userCount, totalPriceOverride } = data;
    // ... availability check ...
    // 1. INVENTORY CHECK (Double Booking Prevention)
    const isAvailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$local$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkAvailability"])(studioId, roomName, date, startTime, durationHours);
    if (!isAvailable) {
        return {
            success: false,
            message: "🚫 This time slot is already booked! Please choose another time."
        };
    }
    // 2. Calculate Price
    let totalPrice = 0;
    if (totalPriceOverride !== undefined) {
        totalPrice = totalPriceOverride;
    } else {
        // Fallback to legacy logic
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
    }
    // 3. Save to Local DB
    const newBooking = {
        id: Math.random().toString(36).substring(7),
        userId,
        studioId,
        roomName,
        date,
        startTime,
        durationHours,
        userCount,
        totalPrice,
        createdAt: new Date().toISOString()
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$local$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveBooking"])(newBooking);
    // 3.5 Auto-register to My Studios
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMyStudioAction"])(studioId);
    } catch (e) {
        console.error("Failed to auto-add my studio", e);
    }
    // 4. Notifications (Simulated)
    console.log(`[Notification] 📧 Sending Email to User (${userId}): Booking Confirmed! ID: ${newBooking.id}`);
    console.log(`[Notification] 📱 Sending SMS to User (${userId}): Reminder for ${date} set.`);
    console.log(`[Notification] 🏪 Sending Notification to Studio (${studioId}): New Booking Request.`);
    return {
        success: true,
        message: "Booking successful! Confirmation sent to email/SMS.",
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
"[project]/music-studio-app/src/actions/schedule.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0081e40b72fa657e20758eba101347f2368c20b5d7":"getBookingsAction"},"",""] */ __turbopack_context__.s([
    "getBookingsAction",
    ()=>getBookingsAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$local$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/db-local.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getBookingsAction() {
    const bookings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$local$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBookings"])();
    // Re-map or sanitize if needed
    return bookings;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getBookingsAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getBookingsAction, "0081e40b72fa657e20758eba101347f2368c20b5d7", null);
}),
"[project]/music-studio-app/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/music-studio-app/src/actions/login.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/music-studio-app/src/actions/schedule.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$booking$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$login$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/login.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$schedule$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/schedule.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/music-studio-app/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/music-studio-app/src/actions/login.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/music-studio-app/src/actions/schedule.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0081e40b72fa657e20758eba101347f2368c20b5d7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$schedule$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBookingsAction"],
    "008a4238b043ec4500f156fcb67d1507ee6b08edb1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$login$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutAction"],
    "00cc83454bde0ebb8f0e5beebe1faab4e0e3d9b85c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$login$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"],
    "40caca3610ff76b0627662db1d5c81852ddbb2cb8f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$booking$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createBooking"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$booking$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$login$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$schedule$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/music-studio-app/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/music-studio-app/src/actions/login.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/music-studio-app/src/actions/schedule.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$booking$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$login$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/login.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$schedule$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/schedule.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7458eafa._.js.map