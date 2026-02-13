module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/music-studio-app/src/lib/db-studio.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStudioProfile",
    ()=>getStudioProfile,
    "saveStudioProfile",
    ()=>saveStudioProfile
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const STUDIO_DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'studio.json');
// Initialize Studio DB
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(STUDIO_DB_PATH)) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(STUDIO_DB_PATH, JSON.stringify({}, null, 2));
}
const getStudioProfile = ()=>{
    try {
        const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(STUDIO_DB_PATH, 'utf-8');
        const json = JSON.parse(data);
        return Object.keys(json).length > 0 ? json : null;
    } catch (error) {
        return null;
    }
};
const saveStudioProfile = (profile)=>{
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(STUDIO_DB_PATH, JSON.stringify(profile, null, 2));
};
}),
"[project]/music-studio-app/src/actions/studio.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0082970726f7be59d3b8cb507fb326e00f06eb78b8":"fetchStudioProfile","403fe056e05ed29b1251b798cba0048e68f9cc63e2":"registerStudio"},"",""] */ __turbopack_context__.s([
    "fetchStudioProfile",
    ()=>fetchStudioProfile,
    "registerStudio",
    ()=>registerStudio
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/db-studio.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function registerStudio(data) {
    console.log("Registering studio:", data);
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveStudioProfile"])(data);
        return {
            success: true,
            message: "Studio profile saved successfully."
        };
    } catch (e) {
        return {
            success: false,
            message: e.message
        };
    }
}
async function fetchStudioProfile() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$db$2d$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStudioProfile"])();
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    registerStudio,
    fetchStudioProfile
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerStudio, "403fe056e05ed29b1251b798cba0048e68f9cc63e2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchStudioProfile, "0082970726f7be59d3b8cb507fb326e00f06eb78b8", null);
}),
"[project]/music-studio-app/.next-internal/server/app/admin/studio/page/actions.js { ACTIONS_MODULE0 => \"[project]/music-studio-app/src/actions/studio.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/studio.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/music-studio-app/.next-internal/server/app/admin/studio/page/actions.js { ACTIONS_MODULE0 => \"[project]/music-studio-app/src/actions/studio.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0082970726f7be59d3b8cb507fb326e00f06eb78b8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchStudioProfile"],
    "403fe056e05ed29b1251b798cba0048e68f9cc63e2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerStudio"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$studio$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/music-studio-app/.next-internal/server/app/admin/studio/page/actions.js { ACTIONS_MODULE0 => "[project]/music-studio-app/src/actions/studio.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$studio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/studio.ts [app-rsc] (ecmascript)");
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

//# sourceMappingURL=%5Broot-of-the-server%5D__b8905584._.js.map