(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/music-studio-app/src/lib/firebase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyAkGwV-IVz-nwavp9anZ3LYm88pZI7ko-8"),
    authDomain: ("TURBOPACK compile-time value", "studi-go-488d1.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "studi-go-488d1"),
    storageBucket: ("TURBOPACK compile-time value", "studi-go-488d1.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "165050606372"),
    appId: ("TURBOPACK compile-time value", "1:165050606372:web:dc72a6b2776a0e95e249b1")
};
// Initialize Firebase (Singleton pattern)
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])().length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApp"])() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/music-studio-app/src/lib/db-firestore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteStudioFromFirestore",
    ()=>deleteStudioFromFirestore,
    "getAllBookingsFromFirestore",
    ()=>getAllBookingsFromFirestore,
    "getAllPaymentsFromFirestore",
    ()=>getAllPaymentsFromFirestore,
    "getAllStudiosFromFirestore",
    ()=>getAllStudiosFromFirestore,
    "getAllUsersFromFirestore",
    ()=>getAllUsersFromFirestore,
    "getBookingByIdFromFirestore",
    ()=>getBookingByIdFromFirestore,
    "getStudioByIdFromFirestore",
    ()=>getStudioByIdFromFirestore,
    "getUserByIdFromFirestore",
    ()=>getUserByIdFromFirestore,
    "saveBookingToFirestore",
    ()=>saveBookingToFirestore,
    "savePaymentToFirestore",
    ()=>savePaymentToFirestore,
    "saveStudioToFirestore",
    ()=>saveStudioToFirestore,
    "saveUserToFirestore",
    ()=>saveUserToFirestore,
    "updateBookingInFirestore",
    ()=>updateBookingInFirestore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
;
;
const getAllStudiosFromFirestore = async ()=>{
    try {
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "studios"));
        return snapshot.docs.map((doc)=>doc.data());
    } catch (e) {
        console.error("Error fetching studios:", e);
        return [];
    }
};
const getStudioByIdFromFirestore = async (id)=>{
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "studios", id);
        const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (e) {
        console.error("Error fetching studio:", e);
        return null;
    }
};
const saveStudioToFirestore = async (studio)=>{
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "studios", studio.id), studio);
    } catch (e) {
        console.error("Error saving studio:", e);
        throw e;
    }
};
const deleteStudioFromFirestore = async (id)=>{
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "studios", id));
    } catch (e) {
        console.error("Error deleting studio:", e);
        throw e;
    }
};
const getAllUsersFromFirestore = async ()=>{
    try {
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "users"));
        return snapshot.docs.map((doc)=>doc.data());
    } catch (e) {
        console.error("Error fetching users:", e);
        return [];
    }
};
const getUserByIdFromFirestore = async (id)=>{
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "users", id);
        const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
        return docSnap.exists() ? docSnap.data() : undefined;
    } catch (e) {
        console.error("Error fetching user:", e);
        return undefined;
    }
};
const saveUserToFirestore = async (user)=>{
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "users", user.id), user);
    } catch (e) {
        console.error("Error saving user:", e);
        throw e;
    }
};
const getAllBookingsFromFirestore = async ()=>{
    try {
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "bookings"));
        return snapshot.docs.map((doc)=>doc.data());
    } catch (e) {
        console.error("Error fetching bookings:", e);
        return [];
    }
};
const getBookingByIdFromFirestore = async (id)=>{
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "bookings", id);
        const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
        return docSnap.exists() ? docSnap.data() : undefined;
    } catch (e) {
        console.error("Error fetching booking:", e);
        return undefined;
    }
};
const saveBookingToFirestore = async (booking)=>{
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "bookings", booking.id), booking);
    } catch (e) {
        console.error("Error saving booking:", e);
        throw e;
    }
};
const updateBookingInFirestore = async (id, updates)=>{
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "bookings", id), updates);
        return true;
    } catch (e) {
        console.error("Error updating booking:", e);
        return false;
    }
};
const getAllPaymentsFromFirestore = async ()=>{
    try {
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "payments"));
        return snapshot.docs.map((doc)=>doc.data());
    } catch (e) {
        console.error("Error fetching payments:", e);
        return [];
    }
};
const savePaymentToFirestore = async (payment)=>{
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "payments", payment.id), payment);
    } catch (e) {
        console.error("Error saving payment:", e);
        throw e;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/music-studio-app/src/actions/studio.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/db-firestore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/cache.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/uuid/dist/v4.js [app-client] (ecmascript) <export default as v4>");
;
;
;
async function fetchStudios() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllStudiosFromFirestore"])();
}
async function fetchStudio(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioByIdFromFirestore"])(id);
}
async function updateStudio(data) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveStudioToFirestore"])(data);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["revalidatePath"])("/studios");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["revalidatePath"])(`/studios/${data.id}`);
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
    const newStudio = {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
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
        studentDiscount: {
            enabled: false,
            discountType: 'amount',
            value: 0
        },
        otherDiscounts: [],
        personalPracticeSettings: {
            enabled: true,
            reservationWindowType: 'days',
            reservationWindowValue: 1,
            maxPeople: 2
        },
        designSettings: {
            logoSize: 100,
            backgroundColor: "#000000",
            backgroundType: 'color'
        },
        equipmentOptions: [],
        createdAt: new Date().toISOString()
    };
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveStudioToFirestore"])(newStudio);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["revalidatePath"])("/studios");
    return newStudio.id;
}
async function deleteStudioAction(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteStudioFromFirestore"])(id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["revalidatePath"])("/studios");
    return {
        success: true
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=music-studio-app_src_5d4af63b._.js.map