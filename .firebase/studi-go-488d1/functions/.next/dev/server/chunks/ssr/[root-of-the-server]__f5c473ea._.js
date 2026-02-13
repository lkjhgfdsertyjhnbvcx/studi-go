module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/music-studio-app/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/music-studio-app/src/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/music-studio-app/src/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
            "icon-sm": "size-8",
            "icon-lg": "size-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        "data-variant": variant,
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/music-studio-app/src/components/ui/badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "span";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/music-studio-app/src/actions/data:4a53bf [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchMyBookings",
    ()=>$$RSC_SERVER_ACTION_3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"009fac75e4b6a1feb2ea8dc5377028ac985fe25f7e":"fetchMyBookings"},"music-studio-app/src/actions/booking.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("009fac75e4b6a1feb2ea8dc5377028ac985fe25f7e", __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "fetchMyBookings");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYm9va2luZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY2hlY2tBdmFpbGFiaWxpdHksIHNhdmVCb29raW5nLCBCb29raW5nIH0gZnJvbSBcIkAvbGliL2RiLWxvY2FsXCI7XG5pbXBvcnQgeyBhZGRNeVN0dWRpb0FjdGlvbiwgZ2V0VXNlckJ5SWQgfSBmcm9tIFwiLi91c2VyXCI7XG5pbXBvcnQgeyBmZXRjaFN0dWRpbyB9IGZyb20gXCIuL3N0dWRpb1wiO1xuaW1wb3J0IHsgY3JlYXRlUGF5bWVudCB9IGZyb20gXCIuL3BheW1lbnRcIjtcbmltcG9ydCB7IFJlc2VuZCB9IGZyb20gJ3Jlc2VuZCc7XG5cbmNvbnN0IHJlc2VuZCA9IG5ldyBSZXNlbmQocHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVkpO1xuXG4vLyBVcGRhdGUgaW50ZXJmYWNlXG5pbnRlcmZhY2UgQm9va2luZ1JlcXVlc3Qge1xuICAgIHVzZXJJZDogc3RyaW5nO1xuICAgIHN0dWRpb0lkOiBzdHJpbmc7XG4gICAgcm9vbU5hbWU/OiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIHN0YXJ0VGltZTogc3RyaW5nO1xuICAgIGR1cmF0aW9uSG91cnM6IG51bWJlcjtcbiAgICB1c2VyQ291bnQ6IG51bWJlcjtcbiAgICBlcXVpcG1lbnRJZHM6IHN0cmluZ1tdO1xuICAgIHRvdGFsUHJpY2VPdmVycmlkZT86IG51bWJlcjsgLy8gQWxsb3cgY2xpZW50IGNhbGN1bGF0ZWQgcHJpY2Vcbn1cblxuLy8gLi4uIGNvbnN0YW50cyAuLi5cbmNvbnN0IFBSSUNFX0JBTkRfSE9VUkxZID0gMjUwMDtcbmNvbnN0IFBSSUNFX0lORElWSURVQUxfSE9VUkxZID0gODAwO1xuY29uc3QgUFJJQ0VfTE9DS09VVF9GTEFUID0gMjAwMDA7XG5cbmludGVyZmFjZSBCb29raW5nUmVzcG9uc2Uge1xuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHByaWNlPzogbnVtYmVyO1xuICAgIGJvb2tpbmdJZD86IHN0cmluZztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJvb2tpbmcoZGF0YTogQm9va2luZ1JlcXVlc3QpOiBQcm9taXNlPEJvb2tpbmdSZXNwb25zZT4ge1xuICAgIGNvbnN0IHsgdXNlcklkLCBzdHVkaW9JZCwgcm9vbU5hbWUsIGRhdGUsIHN0YXJ0VGltZSwgZHVyYXRpb25Ib3VycywgdXNlckNvdW50LCB0b3RhbFByaWNlT3ZlcnJpZGUgfSA9IGRhdGE7XG5cbiAgICAvLyAuLi4gYXZhaWxhYmlsaXR5IGNoZWNrIC4uLlxuXG4gICAgLy8gMS4gSU5WRU5UT1JZIENIRUNLIChEb3VibGUgQm9va2luZyBQcmV2ZW50aW9uKVxuICAgIGNvbnN0IGlzQXZhaWxhYmxlID0gY2hlY2tBdmFpbGFiaWxpdHkoc3R1ZGlvSWQsIHJvb21OYW1lLCBkYXRlLCBzdGFydFRpbWUsIGR1cmF0aW9uSG91cnMpO1xuICAgIGlmICghaXNBdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogXCLwn5qrIFRoaXMgdGltZSBzbG90IGlzIGFscmVhZHkgYm9va2VkISBQbGVhc2UgY2hvb3NlIGFub3RoZXIgdGltZS5cIlxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIDIuIENhbGN1bGF0ZSBQcmljZVxuICAgIGxldCB0b3RhbFByaWNlID0gMDtcbiAgICBpZiAodG90YWxQcmljZU92ZXJyaWRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdG90YWxQcmljZSA9IHRvdGFsUHJpY2VPdmVycmlkZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGYWxsYmFjayB0byBsZWdhY3kgbG9naWNcbiAgICAgICAgY29uc3QgYm9va2luZ0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSwgbm93LmdldE1vbnRoKCksIG5vdy5nZXREYXRlKCkpO1xuICAgICAgICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKGJvb2tpbmdEYXRlLmdldEZ1bGxZZWFyKCksIGJvb2tpbmdEYXRlLmdldE1vbnRoKCksIGJvb2tpbmdEYXRlLmdldERhdGUoKSk7XG4gICAgICAgIGNvbnN0IGlzVG9kYXlPclRvbW9ycm93ID0gdGFyZ2V0RGF0ZS5nZXRUaW1lKCkgPT09IHRvZGF5LmdldFRpbWUoKSB8fCB0YXJnZXREYXRlLmdldFRpbWUoKSA9PT0gdG9tb3Jyb3cuZ2V0VGltZSgpO1xuXG4gICAgICAgIGlmIChkdXJhdGlvbkhvdXJzID49IDEwKSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlID0gUFJJQ0VfTE9DS09VVF9GTEFUO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVzZXJDb3VudCA8PSAyICYmIGlzVG9kYXlPclRvbW9ycm93KSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlID0gUFJJQ0VfSU5ESVZJRFVBTF9IT1VSTFkgKiB1c2VyQ291bnQgKiBkdXJhdGlvbkhvdXJzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG90YWxQcmljZSA9IFBSSUNFX0JBTkRfSE9VUkxZICogZHVyYXRpb25Ib3VycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIDMuIFNhdmUgdG8gTG9jYWwgREJcbiAgICBjb25zdCBuZXdCb29raW5nOiBCb29raW5nID0ge1xuICAgICAgICBpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLFxuICAgICAgICB1c2VySWQsXG4gICAgICAgIHN0dWRpb0lkLFxuICAgICAgICByb29tTmFtZSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICBkdXJhdGlvbkhvdXJzLFxuICAgICAgICB1c2VyQ291bnQsXG4gICAgICAgIHRvdGFsUHJpY2UsXG4gICAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgfTtcblxuICAgIHNhdmVCb29raW5nKG5ld0Jvb2tpbmcpO1xuXG4gICAgLy8gNC4gQ3JlYXRlIFBheW1lbnQgUmVjb3JkIChmb3IgcmV2ZW51ZSB0cmFja2luZylcbiAgICAvLyAuLi4gc2FtZSBhcyBiZWZvcmVcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzdHVkaW8gPSBhd2FpdCBmZXRjaFN0dWRpbyhzdHVkaW9JZCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpO1xuXG4gICAgICAgIGF3YWl0IGNyZWF0ZVBheW1lbnQoe1xuICAgICAgICAgICAgYm9va2luZ0lkOiBuZXdCb29raW5nLmlkLFxuICAgICAgICAgICAgc3R1ZGlvSWQ6IHN0dWRpb0lkLFxuICAgICAgICAgICAgc3R1ZGlvTmFtZTogc3R1ZGlvPy5zdG9yZU5hbWUgfHwgXCJVbmtub3duIFN0dWRpb1wiLFxuICAgICAgICAgICAgdXNlck5hbWU6IHVzZXI/Lm5hbWUgfHwgXCJHdWVzdCBVc2VyXCIsXG4gICAgICAgICAgICB1c2VyRW1haWw6IHVzZXI/LmVtYWlsIHx8IFwiXCIsXG4gICAgICAgICAgICB1c2VyUGhvbmU6IHVzZXI/LnBob25lLFxuICAgICAgICAgICAgYW1vdW50OiB0b3RhbFByaWNlLFxuICAgICAgICAgICAgcGF5bWVudE1ldGhvZDogXCJzdHJpcGVcIiAvLyBEZWZhdWx0IGZvciBvbmxpbmUgYm9va2luZ3NcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBwYXltZW50IHJlY29yZFwiLCBlKTtcbiAgICB9XG5cbiAgICAvLyA1LiBBdXRvLXJlZ2lzdGVyIHRvIE15IFN0dWRpb3NcbiAgICAvLyAuLi5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBhZGRNeVN0dWRpb0FjdGlvbihzdHVkaW9JZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGF1dG8tYWRkIG15IHN0dWRpb1wiLCBlKTtcbiAgICB9XG5cbiAgICAvLyA2LiBOb3RpZmljYXRpb25zXG4gICAgLy8gLi4uXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZCk7XG4gICAgY29uc3QgdXNlckVtYWlsID0gdXNlcj8uZW1haWw7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVkgJiYgdXNlckVtYWlsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCByZXNlbmQuZW1haWxzLnNlbmQoe1xuICAgICAgICAgICAgICAgIGZyb206ICdTdHVkaS1HbyA8bm9yZXBseUBzZW5kLnN0dWRpLWdvLmNvbT4nLFxuICAgICAgICAgICAgICAgIHRvOiB1c2VyRW1haWwsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJ+OAkE11c2ljIFN0dWRpb+OAkeS6iOe0hOWujOS6huOBruOBiuefpeOCieOBmycsXG4gICAgICAgICAgICAgICAgaHRtbDogYFxuICAgICAgICAgICAgICAgICAgICA8aDE+5LqI57SE44GM5a6M5LqG44GX44G+44GX44GfPC9oMT5cbiAgICAgICAgICAgICAgICAgICAgPHA+5Lul5LiL44Gu5YaF5a6544Gn5LqI57SE44KS5Y+X44GR5LuY44GR44G+44GX44Gf44CCPC9wPlxuICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7kuojntIRJRDo8L3N0cm9uZz4gJHtuZXdCb29raW5nLmlkfTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7jgrnjgr/jgrjjgqo6PC9zdHJvbmc+ICR7c3R1ZGlvSWR9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPumDqOWxizo8L3N0cm9uZz4gJHtyb29tTmFtZX08L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+5pel5LuYOjwvc3Ryb25nPiAke2RhdGV9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPuaZgumWkzo8L3N0cm9uZz4gJHtzdGFydFRpbWV9ICgke2R1cmF0aW9uSG91cnN95pmC6ZaTKTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7mlpnph5E6PC9zdHJvbmc+IMKlJHt0b3RhbFByaWNlLnRvTG9jYWxlU3RyaW5nKCl9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPHA+44GU5p2l5bqX44KS44GK5b6F44Gh44GX44Gm44GK44KK44G+44GZ44CCPC9wPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFtOb3RpZmljYXRpb25dIPCfk6cgRW1haWwgc2VudCB0byAke3VzZXJFbWFpbH0gdmlhIFJlc2VuZC5gKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tOb3RpZmljYXRpb25dIOKdjCBGYWlsZWQgdG8gc2VuZCBlbWFpbCB2aWEgUmVzZW5kOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiQm9va2luZyBzdWNjZXNzZnVsISBDb25maXJtYXRpb24gc2VudCB0byBlbWFpbC9TTVMuXCIsXG4gICAgICAgIHByaWNlOiB0b3RhbFByaWNlLFxuICAgICAgICBib29raW5nSWQ6IG5ld0Jvb2tpbmcuaWRcbiAgICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2FuY2VsQm9va2luZ0FjdGlvbihib29raW5nSWQ6IHN0cmluZyk6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyBtZXNzYWdlOiBzdHJpbmcgfT4ge1xuICAgIGNvbnN0IHsgdXBkYXRlQm9va2luZywgZ2V0Qm9va2luZ0J5SWQgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLWxvY2FsXCIpO1xuICAgIGNvbnN0IGJvb2tpbmcgPSBnZXRCb29raW5nQnlJZChib29raW5nSWQpO1xuICAgIGlmICghYm9va2luZykgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiQm9va2luZyBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHVwZGF0ZUJvb2tpbmcoYm9va2luZ0lkLCB7IHN0YXR1czogJ2NhbmNlbGxlZCcgfSk7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFtOb3RpZmljYXRpb25dIPCfj6ogU3R1ZGlvICR7Ym9va2luZy5zdHVkaW9JZH06IEJvb2tpbmcgJHtib29raW5nSWR9IGhhcyBiZWVuIENBTkNFTExFRCBieSB1c2VyLmApO1xuICAgICAgICAvLyBIZXJlIHlvdSB3b3VsZCBhbHNvIHVwZGF0ZSBwYXltZW50IHN0YXR1cyB0byAnZmFpbGVkJyBvciAncmVmdW5kZWQnIGlmIG5lZWRlZFxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiBcIkJvb2tpbmcgY2FuY2VsbGVkIHN1Y2Nlc3NmdWxseVwiIH07XG4gICAgfVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIkZhaWxlZCB0byBjYW5jZWwgYm9va2luZ1wiIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVCb29raW5nQWN0aW9uKGJvb2tpbmdJZDogc3RyaW5nLCBkYXRhOiBQYXJ0aWFsPEJvb2tpbmdSZXF1ZXN0Pik6IFByb21pc2U8Qm9va2luZ1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgeyB1cGRhdGVCb29raW5nLCBnZXRCb29raW5nQnlJZCwgY2hlY2tBdmFpbGFiaWxpdHkgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLWxvY2FsXCIpO1xuICAgIGNvbnN0IG9sZEJvb2tpbmcgPSBnZXRCb29raW5nQnlJZChib29raW5nSWQpO1xuICAgIGlmICghb2xkQm9va2luZykgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiQm9va2luZyBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3Qgc3R1ZGlvSWQgPSBkYXRhLnN0dWRpb0lkIHx8IG9sZEJvb2tpbmcuc3R1ZGlvSWQ7XG4gICAgY29uc3Qgcm9vbU5hbWUgPSBkYXRhLnJvb21OYW1lIHx8IG9sZEJvb2tpbmcucm9vbU5hbWU7XG4gICAgY29uc3QgZGF0ZSA9IGRhdGEuZGF0ZSB8fCBvbGRCb29raW5nLmRhdGU7XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gZGF0YS5zdGFydFRpbWUgfHwgb2xkQm9va2luZy5zdGFydFRpbWU7XG4gICAgY29uc3QgZHVyYXRpb25Ib3VycyA9IGRhdGEuZHVyYXRpb25Ib3VycyB8fCBvbGRCb29raW5nLmR1cmF0aW9uSG91cnM7XG5cbiAgICAvLyBDaGVjayBhdmFpbGFiaWxpdHkgKGV4Y2x1ZGluZyB0aGlzIHNwZWNpZmljIGJvb2tpbmcpXG4gICAgY29uc3QgaXNBdmFpbGFibGUgPSBjaGVja0F2YWlsYWJpbGl0eShzdHVkaW9JZCwgcm9vbU5hbWUsIGRhdGUsIHN0YXJ0VGltZSwgZHVyYXRpb25Ib3VycywgYm9va2luZ0lkKTtcbiAgICBpZiAoIWlzQXZhaWxhYmxlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIvCfmqsgVGhpcyB0aW1lIHNsb3QgaXMgYWxyZWFkeSBib29rZWQhXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBzdWNjZXNzID0gdXBkYXRlQm9va2luZyhib29raW5nSWQsIHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgc3RhdHVzOiAnbW9kaWZpZWQnXG4gICAgfSk7XG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICBjb25zb2xlLmxvZyhgW05vdGlmaWNhdGlvbl0g8J+PqiBTdHVkaW8gJHtzdHVkaW9JZH06IEJvb2tpbmcgJHtib29raW5nSWR9IGhhcyBiZWVuIE1PRElGSUVEIGJ5IHVzZXIuYCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiQm9va2luZyB1cGRhdGVkIHN1Y2Nlc3NmdWxseVwiIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBib29raW5nXCIgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoTXlCb29raW5ncygpOiBQcm9taXNlPGFueVtdPiB7XG4gICAgY29uc3QgeyBnZXRDdXJyZW50VXNlciB9ID0gYXdhaXQgaW1wb3J0KFwiLi9sb2dpblwiKTtcbiAgICBjb25zdCB7IGdldEJvb2tpbmdzIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9kYi1sb2NhbFwiKTtcbiAgICBjb25zdCB7IGdldEFsbFN0dWRpb3MgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLXN0dWRpb1wiKTtcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpO1xuICAgIGlmICghdXNlcikgcmV0dXJuIFtdO1xuXG4gICAgY29uc3Qgc3R1ZGlvcyA9IGdldEFsbFN0dWRpb3MoKTtcbiAgICBjb25zdCBzdHVkaW9NYXAgPSBuZXcgTWFwKHN0dWRpb3MubWFwKHMgPT4gW3MuaWQsIHMuc3RvcmVOYW1lXSkpO1xuXG4gICAgcmV0dXJuIGdldEJvb2tpbmdzKClcbiAgICAgICAgLmZpbHRlcihiID0+IGIudXNlcklkID09PSB1c2VyLmlkKVxuICAgICAgICAuc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYi5kYXRlKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShhLmRhdGUpLmdldFRpbWUoKSlcbiAgICAgICAgLm1hcChiID0+ICh7XG4gICAgICAgICAgICAuLi5iLFxuICAgICAgICAgICAgc3R1ZGlvTmFtZTogc3R1ZGlvTWFwLmdldChiLnN0dWRpb0lkKSB8fCBcIlVua25vd24gU3R1ZGlvXCJcbiAgICAgICAgfSkpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIyU0EwTXNCLDRMQUFBIn0=
}),
"[project]/music-studio-app/src/actions/data:8d071c [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelBookingAction",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40e1c759f12b668656bda7a8495bfdfc4b7ceba999":"cancelBookingAction"},"music-studio-app/src/actions/booking.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40e1c759f12b668656bda7a8495bfdfc4b7ceba999", __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "cancelBookingAction");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYm9va2luZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY2hlY2tBdmFpbGFiaWxpdHksIHNhdmVCb29raW5nLCBCb29raW5nIH0gZnJvbSBcIkAvbGliL2RiLWxvY2FsXCI7XG5pbXBvcnQgeyBhZGRNeVN0dWRpb0FjdGlvbiwgZ2V0VXNlckJ5SWQgfSBmcm9tIFwiLi91c2VyXCI7XG5pbXBvcnQgeyBmZXRjaFN0dWRpbyB9IGZyb20gXCIuL3N0dWRpb1wiO1xuaW1wb3J0IHsgY3JlYXRlUGF5bWVudCB9IGZyb20gXCIuL3BheW1lbnRcIjtcbmltcG9ydCB7IFJlc2VuZCB9IGZyb20gJ3Jlc2VuZCc7XG5cbmNvbnN0IHJlc2VuZCA9IG5ldyBSZXNlbmQocHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVkpO1xuXG4vLyBVcGRhdGUgaW50ZXJmYWNlXG5pbnRlcmZhY2UgQm9va2luZ1JlcXVlc3Qge1xuICAgIHVzZXJJZDogc3RyaW5nO1xuICAgIHN0dWRpb0lkOiBzdHJpbmc7XG4gICAgcm9vbU5hbWU/OiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIHN0YXJ0VGltZTogc3RyaW5nO1xuICAgIGR1cmF0aW9uSG91cnM6IG51bWJlcjtcbiAgICB1c2VyQ291bnQ6IG51bWJlcjtcbiAgICBlcXVpcG1lbnRJZHM6IHN0cmluZ1tdO1xuICAgIHRvdGFsUHJpY2VPdmVycmlkZT86IG51bWJlcjsgLy8gQWxsb3cgY2xpZW50IGNhbGN1bGF0ZWQgcHJpY2Vcbn1cblxuLy8gLi4uIGNvbnN0YW50cyAuLi5cbmNvbnN0IFBSSUNFX0JBTkRfSE9VUkxZID0gMjUwMDtcbmNvbnN0IFBSSUNFX0lORElWSURVQUxfSE9VUkxZID0gODAwO1xuY29uc3QgUFJJQ0VfTE9DS09VVF9GTEFUID0gMjAwMDA7XG5cbmludGVyZmFjZSBCb29raW5nUmVzcG9uc2Uge1xuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHByaWNlPzogbnVtYmVyO1xuICAgIGJvb2tpbmdJZD86IHN0cmluZztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJvb2tpbmcoZGF0YTogQm9va2luZ1JlcXVlc3QpOiBQcm9taXNlPEJvb2tpbmdSZXNwb25zZT4ge1xuICAgIGNvbnN0IHsgdXNlcklkLCBzdHVkaW9JZCwgcm9vbU5hbWUsIGRhdGUsIHN0YXJ0VGltZSwgZHVyYXRpb25Ib3VycywgdXNlckNvdW50LCB0b3RhbFByaWNlT3ZlcnJpZGUgfSA9IGRhdGE7XG5cbiAgICAvLyAuLi4gYXZhaWxhYmlsaXR5IGNoZWNrIC4uLlxuXG4gICAgLy8gMS4gSU5WRU5UT1JZIENIRUNLIChEb3VibGUgQm9va2luZyBQcmV2ZW50aW9uKVxuICAgIGNvbnN0IGlzQXZhaWxhYmxlID0gY2hlY2tBdmFpbGFiaWxpdHkoc3R1ZGlvSWQsIHJvb21OYW1lLCBkYXRlLCBzdGFydFRpbWUsIGR1cmF0aW9uSG91cnMpO1xuICAgIGlmICghaXNBdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogXCLwn5qrIFRoaXMgdGltZSBzbG90IGlzIGFscmVhZHkgYm9va2VkISBQbGVhc2UgY2hvb3NlIGFub3RoZXIgdGltZS5cIlxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIDIuIENhbGN1bGF0ZSBQcmljZVxuICAgIGxldCB0b3RhbFByaWNlID0gMDtcbiAgICBpZiAodG90YWxQcmljZU92ZXJyaWRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdG90YWxQcmljZSA9IHRvdGFsUHJpY2VPdmVycmlkZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGYWxsYmFjayB0byBsZWdhY3kgbG9naWNcbiAgICAgICAgY29uc3QgYm9va2luZ0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSwgbm93LmdldE1vbnRoKCksIG5vdy5nZXREYXRlKCkpO1xuICAgICAgICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKGJvb2tpbmdEYXRlLmdldEZ1bGxZZWFyKCksIGJvb2tpbmdEYXRlLmdldE1vbnRoKCksIGJvb2tpbmdEYXRlLmdldERhdGUoKSk7XG4gICAgICAgIGNvbnN0IGlzVG9kYXlPclRvbW9ycm93ID0gdGFyZ2V0RGF0ZS5nZXRUaW1lKCkgPT09IHRvZGF5LmdldFRpbWUoKSB8fCB0YXJnZXREYXRlLmdldFRpbWUoKSA9PT0gdG9tb3Jyb3cuZ2V0VGltZSgpO1xuXG4gICAgICAgIGlmIChkdXJhdGlvbkhvdXJzID49IDEwKSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlID0gUFJJQ0VfTE9DS09VVF9GTEFUO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVzZXJDb3VudCA8PSAyICYmIGlzVG9kYXlPclRvbW9ycm93KSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlID0gUFJJQ0VfSU5ESVZJRFVBTF9IT1VSTFkgKiB1c2VyQ291bnQgKiBkdXJhdGlvbkhvdXJzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG90YWxQcmljZSA9IFBSSUNFX0JBTkRfSE9VUkxZICogZHVyYXRpb25Ib3VycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIDMuIFNhdmUgdG8gTG9jYWwgREJcbiAgICBjb25zdCBuZXdCb29raW5nOiBCb29raW5nID0ge1xuICAgICAgICBpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLFxuICAgICAgICB1c2VySWQsXG4gICAgICAgIHN0dWRpb0lkLFxuICAgICAgICByb29tTmFtZSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICBkdXJhdGlvbkhvdXJzLFxuICAgICAgICB1c2VyQ291bnQsXG4gICAgICAgIHRvdGFsUHJpY2UsXG4gICAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgfTtcblxuICAgIHNhdmVCb29raW5nKG5ld0Jvb2tpbmcpO1xuXG4gICAgLy8gNC4gQ3JlYXRlIFBheW1lbnQgUmVjb3JkIChmb3IgcmV2ZW51ZSB0cmFja2luZylcbiAgICAvLyAuLi4gc2FtZSBhcyBiZWZvcmVcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzdHVkaW8gPSBhd2FpdCBmZXRjaFN0dWRpbyhzdHVkaW9JZCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpO1xuXG4gICAgICAgIGF3YWl0IGNyZWF0ZVBheW1lbnQoe1xuICAgICAgICAgICAgYm9va2luZ0lkOiBuZXdCb29raW5nLmlkLFxuICAgICAgICAgICAgc3R1ZGlvSWQ6IHN0dWRpb0lkLFxuICAgICAgICAgICAgc3R1ZGlvTmFtZTogc3R1ZGlvPy5zdG9yZU5hbWUgfHwgXCJVbmtub3duIFN0dWRpb1wiLFxuICAgICAgICAgICAgdXNlck5hbWU6IHVzZXI/Lm5hbWUgfHwgXCJHdWVzdCBVc2VyXCIsXG4gICAgICAgICAgICB1c2VyRW1haWw6IHVzZXI/LmVtYWlsIHx8IFwiXCIsXG4gICAgICAgICAgICB1c2VyUGhvbmU6IHVzZXI/LnBob25lLFxuICAgICAgICAgICAgYW1vdW50OiB0b3RhbFByaWNlLFxuICAgICAgICAgICAgcGF5bWVudE1ldGhvZDogXCJzdHJpcGVcIiAvLyBEZWZhdWx0IGZvciBvbmxpbmUgYm9va2luZ3NcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBwYXltZW50IHJlY29yZFwiLCBlKTtcbiAgICB9XG5cbiAgICAvLyA1LiBBdXRvLXJlZ2lzdGVyIHRvIE15IFN0dWRpb3NcbiAgICAvLyAuLi5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBhZGRNeVN0dWRpb0FjdGlvbihzdHVkaW9JZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGF1dG8tYWRkIG15IHN0dWRpb1wiLCBlKTtcbiAgICB9XG5cbiAgICAvLyA2LiBOb3RpZmljYXRpb25zXG4gICAgLy8gLi4uXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZCk7XG4gICAgY29uc3QgdXNlckVtYWlsID0gdXNlcj8uZW1haWw7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVkgJiYgdXNlckVtYWlsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCByZXNlbmQuZW1haWxzLnNlbmQoe1xuICAgICAgICAgICAgICAgIGZyb206ICdTdHVkaS1HbyA8bm9yZXBseUBzZW5kLnN0dWRpLWdvLmNvbT4nLFxuICAgICAgICAgICAgICAgIHRvOiB1c2VyRW1haWwsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJ+OAkE11c2ljIFN0dWRpb+OAkeS6iOe0hOWujOS6huOBruOBiuefpeOCieOBmycsXG4gICAgICAgICAgICAgICAgaHRtbDogYFxuICAgICAgICAgICAgICAgICAgICA8aDE+5LqI57SE44GM5a6M5LqG44GX44G+44GX44GfPC9oMT5cbiAgICAgICAgICAgICAgICAgICAgPHA+5Lul5LiL44Gu5YaF5a6544Gn5LqI57SE44KS5Y+X44GR5LuY44GR44G+44GX44Gf44CCPC9wPlxuICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7kuojntIRJRDo8L3N0cm9uZz4gJHtuZXdCb29raW5nLmlkfTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7jgrnjgr/jgrjjgqo6PC9zdHJvbmc+ICR7c3R1ZGlvSWR9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPumDqOWxizo8L3N0cm9uZz4gJHtyb29tTmFtZX08L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+5pel5LuYOjwvc3Ryb25nPiAke2RhdGV9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPuaZgumWkzo8L3N0cm9uZz4gJHtzdGFydFRpbWV9ICgke2R1cmF0aW9uSG91cnN95pmC6ZaTKTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7mlpnph5E6PC9zdHJvbmc+IMKlJHt0b3RhbFByaWNlLnRvTG9jYWxlU3RyaW5nKCl9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPHA+44GU5p2l5bqX44KS44GK5b6F44Gh44GX44Gm44GK44KK44G+44GZ44CCPC9wPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFtOb3RpZmljYXRpb25dIPCfk6cgRW1haWwgc2VudCB0byAke3VzZXJFbWFpbH0gdmlhIFJlc2VuZC5gKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tOb3RpZmljYXRpb25dIOKdjCBGYWlsZWQgdG8gc2VuZCBlbWFpbCB2aWEgUmVzZW5kOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiQm9va2luZyBzdWNjZXNzZnVsISBDb25maXJtYXRpb24gc2VudCB0byBlbWFpbC9TTVMuXCIsXG4gICAgICAgIHByaWNlOiB0b3RhbFByaWNlLFxuICAgICAgICBib29raW5nSWQ6IG5ld0Jvb2tpbmcuaWRcbiAgICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2FuY2VsQm9va2luZ0FjdGlvbihib29raW5nSWQ6IHN0cmluZyk6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyBtZXNzYWdlOiBzdHJpbmcgfT4ge1xuICAgIGNvbnN0IHsgdXBkYXRlQm9va2luZywgZ2V0Qm9va2luZ0J5SWQgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLWxvY2FsXCIpO1xuICAgIGNvbnN0IGJvb2tpbmcgPSBnZXRCb29raW5nQnlJZChib29raW5nSWQpO1xuICAgIGlmICghYm9va2luZykgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiQm9va2luZyBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHVwZGF0ZUJvb2tpbmcoYm9va2luZ0lkLCB7IHN0YXR1czogJ2NhbmNlbGxlZCcgfSk7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFtOb3RpZmljYXRpb25dIPCfj6ogU3R1ZGlvICR7Ym9va2luZy5zdHVkaW9JZH06IEJvb2tpbmcgJHtib29raW5nSWR9IGhhcyBiZWVuIENBTkNFTExFRCBieSB1c2VyLmApO1xuICAgICAgICAvLyBIZXJlIHlvdSB3b3VsZCBhbHNvIHVwZGF0ZSBwYXltZW50IHN0YXR1cyB0byAnZmFpbGVkJyBvciAncmVmdW5kZWQnIGlmIG5lZWRlZFxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiBcIkJvb2tpbmcgY2FuY2VsbGVkIHN1Y2Nlc3NmdWxseVwiIH07XG4gICAgfVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIkZhaWxlZCB0byBjYW5jZWwgYm9va2luZ1wiIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVCb29raW5nQWN0aW9uKGJvb2tpbmdJZDogc3RyaW5nLCBkYXRhOiBQYXJ0aWFsPEJvb2tpbmdSZXF1ZXN0Pik6IFByb21pc2U8Qm9va2luZ1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgeyB1cGRhdGVCb29raW5nLCBnZXRCb29raW5nQnlJZCwgY2hlY2tBdmFpbGFiaWxpdHkgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLWxvY2FsXCIpO1xuICAgIGNvbnN0IG9sZEJvb2tpbmcgPSBnZXRCb29raW5nQnlJZChib29raW5nSWQpO1xuICAgIGlmICghb2xkQm9va2luZykgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiQm9va2luZyBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3Qgc3R1ZGlvSWQgPSBkYXRhLnN0dWRpb0lkIHx8IG9sZEJvb2tpbmcuc3R1ZGlvSWQ7XG4gICAgY29uc3Qgcm9vbU5hbWUgPSBkYXRhLnJvb21OYW1lIHx8IG9sZEJvb2tpbmcucm9vbU5hbWU7XG4gICAgY29uc3QgZGF0ZSA9IGRhdGEuZGF0ZSB8fCBvbGRCb29raW5nLmRhdGU7XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gZGF0YS5zdGFydFRpbWUgfHwgb2xkQm9va2luZy5zdGFydFRpbWU7XG4gICAgY29uc3QgZHVyYXRpb25Ib3VycyA9IGRhdGEuZHVyYXRpb25Ib3VycyB8fCBvbGRCb29raW5nLmR1cmF0aW9uSG91cnM7XG5cbiAgICAvLyBDaGVjayBhdmFpbGFiaWxpdHkgKGV4Y2x1ZGluZyB0aGlzIHNwZWNpZmljIGJvb2tpbmcpXG4gICAgY29uc3QgaXNBdmFpbGFibGUgPSBjaGVja0F2YWlsYWJpbGl0eShzdHVkaW9JZCwgcm9vbU5hbWUsIGRhdGUsIHN0YXJ0VGltZSwgZHVyYXRpb25Ib3VycywgYm9va2luZ0lkKTtcbiAgICBpZiAoIWlzQXZhaWxhYmxlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIvCfmqsgVGhpcyB0aW1lIHNsb3QgaXMgYWxyZWFkeSBib29rZWQhXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBzdWNjZXNzID0gdXBkYXRlQm9va2luZyhib29raW5nSWQsIHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgc3RhdHVzOiAnbW9kaWZpZWQnXG4gICAgfSk7XG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICBjb25zb2xlLmxvZyhgW05vdGlmaWNhdGlvbl0g8J+PqiBTdHVkaW8gJHtzdHVkaW9JZH06IEJvb2tpbmcgJHtib29raW5nSWR9IGhhcyBiZWVuIE1PRElGSUVEIGJ5IHVzZXIuYCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiQm9va2luZyB1cGRhdGVkIHN1Y2Nlc3NmdWxseVwiIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBib29raW5nXCIgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoTXlCb29raW5ncygpOiBQcm9taXNlPGFueVtdPiB7XG4gICAgY29uc3QgeyBnZXRDdXJyZW50VXNlciB9ID0gYXdhaXQgaW1wb3J0KFwiLi9sb2dpblwiKTtcbiAgICBjb25zdCB7IGdldEJvb2tpbmdzIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9kYi1sb2NhbFwiKTtcbiAgICBjb25zdCB7IGdldEFsbFN0dWRpb3MgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLXN0dWRpb1wiKTtcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpO1xuICAgIGlmICghdXNlcikgcmV0dXJuIFtdO1xuXG4gICAgY29uc3Qgc3R1ZGlvcyA9IGdldEFsbFN0dWRpb3MoKTtcbiAgICBjb25zdCBzdHVkaW9NYXAgPSBuZXcgTWFwKHN0dWRpb3MubWFwKHMgPT4gW3MuaWQsIHMuc3RvcmVOYW1lXSkpO1xuXG4gICAgcmV0dXJuIGdldEJvb2tpbmdzKClcbiAgICAgICAgLmZpbHRlcihiID0+IGIudXNlcklkID09PSB1c2VyLmlkKVxuICAgICAgICAuc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYi5kYXRlKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShhLmRhdGUpLmdldFRpbWUoKSlcbiAgICAgICAgLm1hcChiID0+ICh7XG4gICAgICAgICAgICAuLi5iLFxuICAgICAgICAgICAgc3R1ZGlvTmFtZTogc3R1ZGlvTWFwLmdldChiLnN0dWRpb0lkKSB8fCBcIlVua25vd24gU3R1ZGlvXCJcbiAgICAgICAgfSkpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIrU0E4SnNCLGdNQUFBIn0=
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/music-studio-app/src/components/ui/dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/music-studio-app/src/components/UserBookings.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserBookings",
    ()=>UserBookings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-ssr] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/receipt.js [app-ssr] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$data$3a$4a53bf__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/data:4a53bf [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$data$3a$8d071c__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/data:8d071c [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/date-fns/format.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/date-fns/parseISO.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$isFuture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/date-fns/isFuture.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
function UserBookings() {
    const [bookings, setBookings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [actionId, setActionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedReceipt, setSelectedReceipt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const load = async ()=>{
        setIsLoading(true);
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$data$3a$4a53bf__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["fetchMyBookings"])();
        setBookings(data);
        setIsLoading(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        load();
    }, []);
    const handleCancel = async (id)=>{
        if (!confirm("本当にこの予約をキャンセルしますか？")) return;
        setActionId(id);
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$data$3a$8d071c__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["cancelBookingAction"])(id);
        if (res.success) {
            alert("予約をキャンセルしました。");
            await load();
        } else {
            alert(res.message);
        }
        setActionId(null);
    };
    const handlePrint = ()=>{
        window.print();
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center py-20 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "animate-spin h-8 w-8 text-cyan-400"
                }, void 0, false, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 54,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 font-mono tracking-widest animate-pulse",
                    children: "AUTHORIZING ACCESS..."
                }, void 0, false, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 55,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
            lineNumber: 53,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-start mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    onClick: ()=>router.back(),
                    className: "text-gray-500 hover:text-white group flex items-center gap-2 px-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "h-4 w-4 transition-transform group-hover:-translate-x-1"
                        }, void 0, false, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 69,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-mono tracking-tighter",
                            children: "BACK() // RETURN TO PREVIOUS"
                        }, void 0, false, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 70,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 64,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "space-y-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-12 w-1.5 bg-cyan-500 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 76,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-6xl font-black italic tracking-tighter text-white uppercase leading-none",
                                    children: "My Bookings"
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 78,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 font-mono text-sm mt-2 uppercase tracking-[0.3em]",
                                    children: "RESERVATION_HISTORY_v.4.1"
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 81,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 77,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 75,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, this),
            bookings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-slate-900/50 border-white/5 border-dashed py-20 flex flex-col items-center gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-white/5 rounded-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                            className: "h-10 w-10 text-gray-700"
                        }, void 0, false, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 89,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                        lineNumber: 88,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-gray-400",
                                children: "予約履歴がありません"
                            }, void 0, false, {
                                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                lineNumber: 92,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 text-sm",
                                children: "次回のセッションを予約しましょう"
                            }, void 0, false, {
                                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                lineNumber: 93,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                        lineNumber: 91,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>router.push('/studios'),
                        className: "bg-cyan-500 hover:bg-cyan-400 text-black font-bold",
                        children: "スタジオを探す"
                    }, void 0, false, {
                        fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                        lineNumber: 95,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 87,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6",
                children: bookings.map((booking)=>{
                    const canModify = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$isFuture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFuture"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseISO"])(booking.date)) && booking.status !== 'cancelled';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: `bg-slate-900 border-white/10 overflow-hidden group transition-all hover:border-cyan-500/30 ${booking.status === 'cancelled' ? 'opacity-50 grayscale' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-8 flex-1 space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-1",
                                                            children: [
                                                                "ID: ",
                                                                booking.id
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 109,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-3xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase italic",
                                                            children: booking.studioName
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    className: `px-4 py-1 rounded-full border-none font-bold text-[10px] ${booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' : booking.status === 'modified' ? 'bg-orange-500/10 text-orange-400' : 'bg-green-500/10 text-green-400'}`,
                                                    children: booking.status?.toUpperCase() || 'FULLY_RESERVED'
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 107,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/5 pt-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-gray-600 uppercase flex items-center gap-1 font-bold tracking-widest",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 121,
                                                                    columnNumber: 152
                                                                }, this),
                                                                " Date"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 121,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-black text-white",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseISO"])(booking.date), "yyyy.MM.dd")
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 122,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-gray-600 uppercase flex items-center gap-1 font-bold tracking-widest",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 125,
                                                                    columnNumber: 152
                                                                }, this),
                                                                " Time / Slot"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 125,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-black text-white",
                                                            children: [
                                                                booking.startTime,
                                                                " (",
                                                                booking.durationHours,
                                                                "h)"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 126,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-gray-600 uppercase flex items-center gap-1 font-bold tracking-widest",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 129,
                                                                    columnNumber: 152
                                                                }, this),
                                                                " Zone / Studio"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 129,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-black text-white",
                                                            children: booking.roomName || "Main Hall"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 130,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-gray-600 uppercase flex items-center gap-1 font-bold tracking-widest",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 133,
                                                                    columnNumber: 152
                                                                }, this),
                                                                " Ledger Value"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 133,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-black text-cyan-400",
                                                            children: [
                                                                "¥",
                                                                booking.totalPrice.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 119,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 106,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/5 md:w-56 p-6 flex md:flex-col gap-3 justify-center items-center border-t md:border-t-0 md:border-l border-white/5",
                                    children: [
                                        canModify ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    className: "w-full text-xs font-bold text-gray-400 hover:text-white border border-white/5 hover:border-white/20",
                                                    onClick: ()=>alert("誠に恐縮ですが、現在は変更非対応です。一度キャンセルの上、お取り直しください。"),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                            className: "h-3 w-3 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 147,
                                                            columnNumber: 53
                                                        }, this),
                                                        " MODIFY"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 142,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    className: "w-full text-xs font-bold text-red-500 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30",
                                                    disabled: actionId === booking.id,
                                                    onClick: ()=>handleCancel(booking.id),
                                                    children: [
                                                        actionId === booking.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            className: "h-3 w-3 animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 155,
                                                            columnNumber: 80
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                            className: "h-3 w-3 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 155,
                                                            columnNumber: 127
                                                        }, this),
                                                        "CANCEL"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[9px] text-gray-600 italic font-mono mb-2 uppercase",
                                            children: "LOCKED // RECORD_ONLY"
                                        }, void 0, false, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 160,
                                            columnNumber: 45
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            className: "w-full text-xs font-bold text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/10 hover:border-cyan-500/30",
                                            onClick: ()=>setSelectedReceipt(booking),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"], {
                                                    className: "h-3 w-3 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 45
                                                }, this),
                                                " RECEIPT"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 162,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 139,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 105,
                            columnNumber: 33
                        }, this)
                    }, booking.id, false, {
                        fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                        lineNumber: 104,
                        columnNumber: 29
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 100,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-3xl shadow-2xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/30",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                className: "h-6 w-6 text-cyan-400"
                            }, void 0, false, {
                                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                lineNumber: 180,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 179,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-lg font-black text-white uppercase italic",
                                    children: "Security & Policy Log"
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 183,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 text-xs leading-relaxed font-mono uppercase tracking-tighter",
                                    children: "SYS_POLICY: Cancellation window is 24 hours prior to initiation. Unauthorized absences may result in restricted access or financial penalties. Ledger records are permanently archived."
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 184,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 182,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 178,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 177,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: !!selectedReceipt,
                onOpenChange: (open)=>!open && setSelectedReceipt(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "bg-white text-black p-0 overflow-hidden max-w-lg border-none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-10 space-y-8 print:p-0",
                            id: "receipt-content",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                                    className: "flex flex-row justify-between items-start border-b-4 border-black pb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-4xl font-black italic uppercase tracking-tighter",
                                                    children: "Receipt"
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] font-mono uppercase text-gray-500",
                                                    children: "Official Payment Record // Studi-Go"
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 198,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[10px] font-mono font-bold uppercase",
                                                    children: "Issued On"
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-black",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), "yyyy.MM.dd")
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 202,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 197,
                                    columnNumber: 25
                                }, this),
                                selectedReceipt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-mono uppercase text-gray-500",
                                                            children: "Service Provider"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 212,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xl font-bold uppercase",
                                                            children: selectedReceipt.studioName
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-mono uppercase text-gray-500",
                                                            children: "Transaction ID"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 216,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-mono font-bold",
                                                            children: [
                                                                "#",
                                                                selectedReceipt.id
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 210,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 p-6 rounded-lg border border-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-[10px] font-mono uppercase text-gray-500 mb-4 border-b pb-2",
                                                    children: "Booking Description"
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-center text-sm font-bold",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "Session Fee (",
                                                                        selectedReceipt.durationHours,
                                                                        " hours)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 225,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "¥",
                                                                        selectedReceipt.totalPrice.toLocaleString()
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 226,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[11px] text-gray-500 font-mono",
                                                            children: [
                                                                selectedReceipt.roomName,
                                                                " / ",
                                                                selectedReceipt.date,
                                                                " / ",
                                                                selectedReceipt.startTime
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 221,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-end border-t border-black pt-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-mono uppercase text-gray-500 text-left",
                                                            children: "Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 236,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "outline",
                                                            className: "bg-black text-white border-none font-black text-[10px] px-3",
                                                            children: selectedReceipt.status === 'paid' ? 'PAID / 領収済み' : 'VERIFIED / 確定'
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-mono uppercase text-gray-500",
                                                            children: "Total Amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-5xl font-black italic tracking-tighter leading-none",
                                                            children: [
                                                                "¥",
                                                                selectedReceipt.totalPrice.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 234,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 209,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                    className: "text-[8px] font-mono uppercase text-gray-400 text-center leading-normal pt-10",
                                    children: "This receipt is a digital representation of the transaction logged in our secured ledger. For tax inquiries, please refer to the Studio Manager or Platform Operator."
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 247,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 196,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-100 p-4 flex gap-3 justify-end print:hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "border-gray-300 text-gray-600 hover:text-black font-bold h-10",
                                    onClick: ()=>setSelectedReceipt(null),
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 254,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "bg-black text-white hover:bg-gray-800 font-black h-10 px-6 group",
                                    onClick: handlePrint,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                            className: "h-4 w-4 mr-2 group-hover:scale-110 transition-transform"
                                        }, void 0, false, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 258,
                                            columnNumber: 29
                                        }, this),
                                        " Print / PDF Download"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 257,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 253,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 195,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 194,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
        lineNumber: 61,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f5c473ea._.js.map