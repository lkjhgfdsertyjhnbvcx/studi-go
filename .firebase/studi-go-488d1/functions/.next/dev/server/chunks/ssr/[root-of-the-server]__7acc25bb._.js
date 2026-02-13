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
    "getBookingById",
    ()=>getBookingById,
    "getBookings",
    ()=>getBookings,
    "saveBooking",
    ()=>saveBooking,
    "updateBooking",
    ()=>updateBooking
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
        return JSON.parse(data).map((b)=>({
                ...b,
                status: b.status || 'active' // Backwards compatibility
            }));
    } catch (error) {
        return [];
    }
};
const getBookingById = (id)=>{
    return getBookings().find((b)=>b.id === id);
};
const saveBooking = (booking)=>{
    const bookings = getBookings();
    bookings.push(booking);
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(DB_PATH, JSON.stringify(bookings, null, 2));
};
const updateBooking = (id, updates)=>{
    const bookings = getBookings();
    const index = bookings.findIndex((b)=>b.id === id);
    if (index === -1) return false;
    bookings[index] = {
        ...bookings[index],
        ...updates
    };
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(DB_PATH, JSON.stringify(bookings, null, 2));
    return true;
};
const checkAvailability = (studioId, roomName, date, startTime, duration, excludeBookingId)=>{
    const bookings = getBookings();
    // Convert new request to minutes from midnight
    const [startH, startM] = startTime.split(':').map(Number);
    const newStart = startH * 60 + startM;
    const newEnd = newStart + duration * 60;
    // Filter bookings for the same day AND SAME ROOM
    const conflictingBookings = bookings.filter((b)=>{
        if (b.status === 'cancelled') return false; // Ignore cancelled ones
        if (excludeBookingId && b.id === excludeBookingId) return false; // Skip the one we are modifying
        if (b.date !== date) return false;
        if (b.studioId !== studioId) return false;
        if (roomName && b.roomName && b.roomName !== roomName) return false;
        return true;
    });
    for (const b of conflictingBookings){
        const [h, m] = b.startTime.split(':').map(Number);
        const bStart = h * 60 + m;
        const bEnd = bStart + b.durationHours * 60;
        if (newStart < bEnd && newEnd > bStart) {
            return false;
        }
    }
    return true;
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

/* __next_internal_action_entry_do_not_use__ [{"00436b83f3e18cfd5d2704e582c2236e657d47885e":"getMyStudiosAction","4026afb62eb83ec1ef72dfd1cde9a33c6d0e3c93e6":"toggleMyStudioAction","405e8eed8305b79bbe8b5e5225072881f4c3a64a41":"addMyStudioAction","407cc424285aa9a9d6c86307daad3d78d6518259f7":"getUserById"},"",""] */ __turbopack_context__.s([
    "addMyStudioAction",
    ()=>addMyStudioAction,
    "getMyStudiosAction",
    ()=>getMyStudiosAction,
    "getUserById",
    ()=>getUserById,
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
const getUserById = async (id)=>{
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
    getUserById,
    toggleMyStudioAction,
    addMyStudioAction,
    getMyStudiosAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserById, "407cc424285aa9a9d6c86307daad3d78d6518259f7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleMyStudioAction, "4026afb62eb83ec1ef72dfd1cde9a33c6d0e3c93e6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addMyStudioAction, "405e8eed8305b79bbe8b5e5225072881f4c3a64a41", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMyStudiosAction, "00436b83f3e18cfd5d2704e582c2236e657d47885e", null);
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/music-studio-app/src/lib/db-studio.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createEmptyStudio",
    ()=>createEmptyStudio,
    "deleteStudio",
    ()=>deleteStudio,
    "getAllStudios",
    ()=>getAllStudios,
    "getStudioById",
    ()=>getStudioById,
    "saveStudio",
    ()=>saveStudio
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/uuid/dist-node/v4.js [app-rsc] (ecmascript) <export default as v4>");
;
;
;
const STUDIO_DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'studios.json');
// Initialize Studio DB as Array
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(STUDIO_DB_PATH)) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(STUDIO_DB_PATH, JSON.stringify([], null, 2));
}
const getAllStudios = ()=>{
    try {
        const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(STUDIO_DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};
const getStudioById = (id)=>{
    const studios = getAllStudios();
    return studios.find((s)=>s.id === id) || null;
};
const saveStudio = (profile)=>{
    const studios = getAllStudios();
    const index = studios.findIndex((s)=>s.id === profile.id);
    if (index >= 0) {
        studios[index] = profile;
    } else {
        studios.push(profile);
    }
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(STUDIO_DB_PATH, JSON.stringify(studios, null, 2));
};
const deleteStudio = (id)=>{
    const studios = getAllStudios().filter((s)=>s.id !== id);
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(STUDIO_DB_PATH, JSON.stringify(studios, null, 2));
};
const createEmptyStudio = ()=>{
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        storeName: "New Studio",
        representative: "",
        manager: "",
        contactPerson: "",
        address: "",
        phone: "",
        email: "",
        businessHours: {
            weekday: "10:00-22:00",
            saturday: "10:00-22:00",
            sundayHoliday: "10:00-22:00"
        },
        url: "",
        studioCount: 0,
        rooms: [],
        equipmentOptions: [],
        createdAt: new Date().toISOString()
    };
};
}),
"[project]/music-studio-app/src/actions/studio.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00074318368149362b438db185274ca5ef282e82ea":"createNewStudioAction","00de754591fdaf2c4a04b598d8d123785d38cd283a":"fetchStudios","405932c62487fb452c306955850c3372e60cb81894":"fetchStudio","40a99c7e57f5ffb60c7126b179428ff9a0895705a5":"updateStudio","40f0b91f465b26951c09a3f17715c967e1276cad01":"deleteStudioAction"},"",""] */ __turbopack_context__.s([
    "createNewStudioAction",
    ()=>createNewStudioAction,
    "deleteStudioAction",
    ()=>deleteStudioAction,
    "fetchStudio",
    ()=>fetchStudio,
    "fetchStudios",
    ()=>fetchStudios,
    "updateStudio",
    ()=>updateStudio
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/db-studio.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function fetchStudios() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllStudios"])();
}
async function fetchStudio(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStudioById"])(id);
}
async function updateStudio(data) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveStudio"])(data);
        return {
            success: true,
            message: "Studio saved successfully."
        };
    } catch (e) {
        return {
            success: false,
            message: e.message
        };
    }
}
async function createNewStudioAction() {
    const newStudio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createEmptyStudio"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveStudio"])(newStudio);
    return newStudio.id;
}
async function deleteStudioAction(id) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteStudio"])(id);
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchStudios,
    fetchStudio,
    updateStudio,
    createNewStudioAction,
    deleteStudioAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchStudios, "00de754591fdaf2c4a04b598d8d123785d38cd283a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchStudio, "405932c62487fb452c306955850c3372e60cb81894", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateStudio, "40a99c7e57f5ffb60c7126b179428ff9a0895705a5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createNewStudioAction, "00074318368149362b438db185274ca5ef282e82ea", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteStudioAction, "40f0b91f465b26951c09a3f17715c967e1276cad01", null);
}),
"[project]/music-studio-app/src/actions/admin-auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"001204c5cf63a9b2296f854320112c5a87dcce6e42":"adminLogout","00437f65ee5b42f956e8ffc66d1cb8f078eb3f7b8f":"checkAdminAuth","0094447a595c8804f1bc342263046c499a9212ef70":"getAuthInfo","00fad050e5d6ad0ce3b05eee5af53765577db154bf":"requireAdminAuth","4095d9b95f263e7a67fcaf6220fc022a92ad42b253":"adminLogin","40f94cb5b752928b50e639d0b94db41445b719e91b":"storeLogin"},"",""] */ __turbopack_context__.s([
    "adminLogin",
    ()=>adminLogin,
    "adminLogout",
    ()=>adminLogout,
    "checkAdminAuth",
    ()=>checkAdminAuth,
    "getAuthInfo",
    ()=>getAuthInfo,
    "requireAdminAuth",
    ()=>requireAdminAuth,
    "storeLogin",
    ()=>storeLogin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/db-studio.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const ADMIN_CREDENTIALS = {
    email: "admin@antigravity.com",
    password: "admin"
};
async function adminLogin(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    // 1. Check Platform Admin
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
        const oneDay = 24 * 60 * 60 * 1000;
        cookieStore.set('admin_token', 'authenticated_admin_token_secure_v1', {
            httpOnly: true,
            path: '/',
            expires: Date.now() + oneDay
        });
        return {
            success: true
        };
    }
    // 2. Check Studio Accounts
    const studios = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllStudios"])();
    // Check main studio email
    const studio = studios.find((s)=>s.email === email);
    if (studio) {
        // For simplicity, we use 'admin' as default password for studio main accounts for now
        // In a real app, this would be a hashed password in the DB
        if (password === 'admin') {
            await storeLogin(studio.id);
            return {
                success: true
            };
        }
    }
    // Check staff accounts
    for (const s of studios){
        const staffMember = s.staff?.find((sm)=>sm.email === email && sm.password === password);
        if (staffMember) {
            await storeLogin(s.id);
            return {
                success: true
            };
        }
    }
    return {
        success: false,
        message: "メールアドレスまたはパスワードが正しくありません。"
    };
}
async function storeLogin(studioId) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const oneDay = 24 * 60 * 60 * 1000;
    cookieStore.set('studio_token', studioId, {
        httpOnly: true,
        path: '/',
        expires: Date.now() + oneDay
    });
    return {
        success: true
    };
}
async function adminLogout() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete('admin_token');
    cookieStore.delete('studio_token');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/admin/login');
}
async function getAuthInfo() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const adminToken = cookieStore.get('admin_token');
    const studioToken = cookieStore.get('studio_token');
    return {
        isAdmin: !!adminToken,
        studioId: studioToken?.value || null
    };
}
async function checkAdminAuth() {
    const auth = await getAuthInfo();
    return auth.isAdmin || !!auth.studioId;
}
async function requireAdminAuth() {
    const isAuth = await checkAdminAuth();
    if (!isAuth) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/admin/login');
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    adminLogin,
    storeLogin,
    adminLogout,
    getAuthInfo,
    checkAdminAuth,
    requireAdminAuth
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(adminLogin, "4095d9b95f263e7a67fcaf6220fc022a92ad42b253", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(storeLogin, "40f94cb5b752928b50e639d0b94db41445b719e91b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(adminLogout, "001204c5cf63a9b2296f854320112c5a87dcce6e42", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAuthInfo, "0094447a595c8804f1bc342263046c499a9212ef70", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkAdminAuth, "00437f65ee5b42f956e8ffc66d1cb8f078eb3f7b8f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(requireAdminAuth, "00fad050e5d6ad0ce3b05eee5af53765577db154bf", null);
}),
"[project]/music-studio-app/src/actions/payment.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"004a8f84a38d929aa460ab16ac81f6e601fc034e64":"fetchPayments","40bffadceace1d14125374fa175a685e1f9b642392":"createPayment","40e86fa2e7233e1269d9d424259db5fa5ebdd149a8":"handleStripeWebhook","607fa2839eb98bb74557caadff25fd2d87abb38882":"sendReminderEmail","60dbf550afa83d3dab038e335df44bdff8b55344c9":"updatePaymentStatus"},"",""] */ __turbopack_context__.s([
    "createPayment",
    ()=>createPayment,
    "fetchPayments",
    ()=>fetchPayments,
    "handleStripeWebhook",
    ()=>handleStripeWebhook,
    "sendReminderEmail",
    ()=>sendReminderEmail,
    "updatePaymentStatus",
    ()=>updatePaymentStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/uuid/dist-node/v4.js [app-rsc] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/admin-auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
// Resolve DB path dynamically to avoid any process.cwd issues
const getDbPath = ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "data", "payments.json");
// Internal helper to read data with no-cache
async function _getAllPayments() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_noStore"])();
    const dbPath = getDbPath();
    try {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(dbPath)) return [];
        const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(dbPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("[PaymentDB] Read error:", error);
        return [];
    }
}
async function fetchPayments() {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthInfo"])();
    const payments = await _getAllPayments();
    if (auth.isAdmin) return payments;
    if (auth.studioId) return payments.filter((p)=>p.studioId === auth.studioId);
    return [];
}
async function sendReminderEmail(paymentId, email) {
    console.log(`[Email] Reminder to ${email} for ${paymentId}`);
    await new Promise((r)=>setTimeout(r, 500));
    return {
        success: true
    };
}
async function createPayment(data) {
    const payments = await _getAllPayments();
    const newPayment = {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        ...data,
        status: "pending",
        date: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        createdAt: new Date().toISOString()
    };
    payments.push(newPayment);
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(getDbPath(), JSON.stringify(payments, null, 2), "utf-8");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/payments");
    return {
        success: true,
        paymentId: newPayment.id
    };
}
async function updatePaymentStatus(paymentId, status) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_noStore"])();
    console.log(`[ServerAction] Reconciling payment: ${paymentId} -> ${status}`);
    try {
        const dbPath = getDbPath();
        const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(dbPath, "utf-8");
        const payments = JSON.parse(data);
        const index = payments.findIndex((p)=>p.id === paymentId);
        if (index === -1) {
            return {
                success: false,
                message: "対象データが見つかりませんでした。"
            };
        }
        payments[index].status = status;
        // Write synchronously to ensure it's done before returning
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(dbPath, JSON.stringify(payments, null, 2), "utf-8");
        // Force Next.js to purge any cached versions of pages using this data
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/payments");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/", "layout"); // Global revalidation for safety
        return {
            success: true
        };
    } catch (error) {
        console.error("[ServerAction] Reconcile error:", error);
        return {
            success: false,
            message: error.message
        };
    }
}
async function handleStripeWebhook(payload) {
    console.log("Stripe Hook:", payload.type);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchPayments,
    sendReminderEmail,
    createPayment,
    updatePaymentStatus,
    handleStripeWebhook
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchPayments, "004a8f84a38d929aa460ab16ac81f6e601fc034e64", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendReminderEmail, "607fa2839eb98bb74557caadff25fd2d87abb38882", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPayment, "40bffadceace1d14125374fa175a685e1f9b642392", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePaymentStatus, "60dbf550afa83d3dab038e335df44bdff8b55344c9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(handleStripeWebhook, "40e86fa2e7233e1269d9d424259db5fa5ebdd149a8", null);
}),
"[project]/music-studio-app/src/actions/booking.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"009fac75e4b6a1feb2ea8dc5377028ac985fe25f7e":"fetchMyBookings","40caca3610ff76b0627662db1d5c81852ddbb2cb8f":"createBooking","40e1c759f12b668656bda7a8495bfdfc4b7ceba999":"cancelBookingAction","60a7856d8be55f0af9c652115e1718d17f98d647d6":"updateBookingAction"},"",""] */ __turbopack_context__.s([
    "cancelBookingAction",
    ()=>cancelBookingAction,
    "createBooking",
    ()=>createBooking,
    "fetchMyBookings",
    ()=>fetchMyBookings,
    "updateBookingAction",
    ()=>updateBookingAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$local$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/db-local.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/user.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/studio.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$payment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/payment.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/resend/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
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
        status: 'active',
        createdAt: new Date().toISOString()
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$local$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveBooking"])(newBooking);
    // 4. Create Payment Record (for revenue tracking)
    // ... same as before
    try {
        const studio = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchStudio"])(studioId);
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserById"])(userId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$payment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPayment"])({
            bookingId: newBooking.id,
            studioId: studioId,
            studioName: studio?.storeName || "Unknown Studio",
            userName: user?.name || "Guest User",
            userEmail: user?.email || "",
            userPhone: user?.phone,
            amount: totalPrice,
            paymentMethod: "stripe" // Default for online bookings
        });
    } catch (e) {
        console.error("Failed to create payment record", e);
    }
    // 5. Auto-register to My Studios
    // ...
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMyStudioAction"])(studioId);
    } catch (e) {
        console.error("Failed to auto-add my studio", e);
    }
    // 6. Notifications
    // ...
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserById"])(userId);
    const userEmail = user?.email;
    if (process.env.RESEND_API_KEY && userEmail) {
        try {
            await resend.emails.send({
                from: 'Studi-Go <noreply@send.studi-go.com>',
                to: userEmail,
                subject: '【Music Studio】予約完了のお知らせ',
                html: `
                    <h1>予約が完了しました</h1>
                    <p>以下の内容で予約を受け付けました。</p>
                    <ul>
                        <li><strong>予約ID:</strong> ${newBooking.id}</li>
                        <li><strong>スタジオ:</strong> ${studioId}</li>
                        <li><strong>部屋:</strong> ${roomName}</li>
                        <li><strong>日付:</strong> ${date}</li>
                        <li><strong>時間:</strong> ${startTime} (${durationHours}時間)</li>
                        <li><strong>料金:</strong> ¥${totalPrice.toLocaleString()}</li>
                    </ul>
                    <p>ご来店をお待ちしております。</p>
                `
            });
            console.log(`[Notification] 📧 Email sent to ${userEmail} via Resend.`);
        } catch (error) {
            console.error('[Notification] ❌ Failed to send email via Resend:', error);
        }
    }
    return {
        success: true,
        message: "Booking successful! Confirmation sent to email/SMS.",
        price: totalPrice,
        bookingId: newBooking.id
    };
}
async function cancelBookingAction(bookingId) {
    const { updateBooking, getBookingById } = await __turbopack_context__.A("[project]/music-studio-app/src/lib/db-local.ts [app-rsc] (ecmascript, async loader)");
    const booking = getBookingById(bookingId);
    if (!booking) return {
        success: false,
        message: "Booking not found"
    };
    const success = updateBooking(bookingId, {
        status: 'cancelled'
    });
    if (success) {
        console.log(`[Notification] 🏪 Studio ${booking.studioId}: Booking ${bookingId} has been CANCELLED by user.`);
        // Here you would also update payment status to 'failed' or 'refunded' if needed
        return {
            success: true,
            message: "Booking cancelled successfully"
        };
    }
    return {
        success: false,
        message: "Failed to cancel booking"
    };
}
async function updateBookingAction(bookingId, data) {
    const { updateBooking, getBookingById, checkAvailability } = await __turbopack_context__.A("[project]/music-studio-app/src/lib/db-local.ts [app-rsc] (ecmascript, async loader)");
    const oldBooking = getBookingById(bookingId);
    if (!oldBooking) return {
        success: false,
        message: "Booking not found"
    };
    const studioId = data.studioId || oldBooking.studioId;
    const roomName = data.roomName || oldBooking.roomName;
    const date = data.date || oldBooking.date;
    const startTime = data.startTime || oldBooking.startTime;
    const durationHours = data.durationHours || oldBooking.durationHours;
    // Check availability (excluding this specific booking)
    const isAvailable = checkAvailability(studioId, roomName, date, startTime, durationHours, bookingId);
    if (!isAvailable) {
        return {
            success: false,
            message: "🚫 This time slot is already booked!"
        };
    }
    const success = updateBooking(bookingId, {
        ...data,
        status: 'modified'
    });
    if (success) {
        console.log(`[Notification] 🏪 Studio ${studioId}: Booking ${bookingId} has been MODIFIED by user.`);
        return {
            success: true,
            message: "Booking updated successfully"
        };
    }
    return {
        success: false,
        message: "Failed to update booking"
    };
}
async function fetchMyBookings() {
    const { getCurrentUser } = await __turbopack_context__.A("[project]/music-studio-app/src/actions/login.ts [app-rsc] (ecmascript, async loader)");
    const { getBookings } = await __turbopack_context__.A("[project]/music-studio-app/src/lib/db-local.ts [app-rsc] (ecmascript, async loader)");
    const user = await getCurrentUser();
    if (!user) return [];
    return getBookings().filter((b)=>b.userId === user.id).sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createBooking,
    cancelBookingAction,
    updateBookingAction,
    fetchMyBookings
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createBooking, "40caca3610ff76b0627662db1d5c81852ddbb2cb8f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(cancelBookingAction, "40e1c759f12b668656bda7a8495bfdfc4b7ceba999", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateBookingAction, "60a7856d8be55f0af9c652115e1718d17f98d647d6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchMyBookings, "009fac75e4b6a1feb2ea8dc5377028ac985fe25f7e", null);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__7acc25bb._.js.map