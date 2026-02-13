(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/music-studio-app/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/music-studio-app/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/music-studio-app/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
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
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        "data-variant": variant,
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
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
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/music-studio-app/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
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
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "span";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/music-studio-app/src/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/music-studio-app/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/music-studio-app/src/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Select;
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = SelectGroup;
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = SelectValue;
function SelectTrigger({ className, size = "default", children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = SelectTrigger;
function SelectContent({ className, children, position = "item-aligned", align = "center", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            align: align,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c4 = SelectContent;
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground px-2 py-1.5 text-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c5 = SelectLabel;
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "data-slot": "select-item-indicator",
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_c6 = SelectItem;
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border pointer-events-none -mx-1 my-1 h-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
_c7 = SelectSeparator;
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
            lineNumber: 156,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_c8 = SelectScrollUpButton;
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
            lineNumber: 174,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/select.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
_c9 = SelectScrollDownButton;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "SelectGroup");
__turbopack_context__.k.register(_c2, "SelectValue");
__turbopack_context__.k.register(_c3, "SelectTrigger");
__turbopack_context__.k.register(_c4, "SelectContent");
__turbopack_context__.k.register(_c5, "SelectLabel");
__turbopack_context__.k.register(_c6, "SelectItem");
__turbopack_context__.k.register(_c7, "SelectSeparator");
__turbopack_context__.k.register(_c8, "SelectScrollUpButton");
__turbopack_context__.k.register(_c9, "SelectScrollDownButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/music-studio-app/src/actions/data:03c0a8 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchMyBookings",
    ()=>$$RSC_SERVER_ACTION_3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"009fac75e4b6a1feb2ea8dc5377028ac985fe25f7e":"fetchMyBookings"},"music-studio-app/src/actions/booking.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("009fac75e4b6a1feb2ea8dc5377028ac985fe25f7e", __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "fetchMyBookings");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYm9va2luZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY2hlY2tBdmFpbGFiaWxpdHksIHNhdmVCb29raW5nLCBCb29raW5nIH0gZnJvbSBcIkAvbGliL2RiLWxvY2FsXCI7XG5pbXBvcnQgeyBhZGRNeVN0dWRpb0FjdGlvbiwgZ2V0VXNlckJ5SWQgfSBmcm9tIFwiLi91c2VyXCI7XG5pbXBvcnQgeyBmZXRjaFN0dWRpbyB9IGZyb20gXCIuL3N0dWRpb1wiO1xuaW1wb3J0IHsgY3JlYXRlUGF5bWVudCB9IGZyb20gXCIuL3BheW1lbnRcIjtcbmltcG9ydCB7IFJlc2VuZCB9IGZyb20gJ3Jlc2VuZCc7XG5cbmNvbnN0IHJlc2VuZCA9IG5ldyBSZXNlbmQocHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVkpO1xuXG4vLyBVcGRhdGUgaW50ZXJmYWNlXG5pbnRlcmZhY2UgQm9va2luZ1JlcXVlc3Qge1xuICAgIHVzZXJJZDogc3RyaW5nO1xuICAgIHN0dWRpb0lkOiBzdHJpbmc7XG4gICAgcm9vbU5hbWU/OiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIHN0YXJ0VGltZTogc3RyaW5nO1xuICAgIGR1cmF0aW9uSG91cnM6IG51bWJlcjtcbiAgICB1c2VyQ291bnQ6IG51bWJlcjtcbiAgICBlcXVpcG1lbnRJZHM6IHN0cmluZ1tdO1xuICAgIHRvdGFsUHJpY2VPdmVycmlkZT86IG51bWJlcjsgLy8gQWxsb3cgY2xpZW50IGNhbGN1bGF0ZWQgcHJpY2Vcbn1cblxuLy8gLi4uIGNvbnN0YW50cyAuLi5cbmNvbnN0IFBSSUNFX0JBTkRfSE9VUkxZID0gMjUwMDtcbmNvbnN0IFBSSUNFX0lORElWSURVQUxfSE9VUkxZID0gODAwO1xuY29uc3QgUFJJQ0VfTE9DS09VVF9GTEFUID0gMjAwMDA7XG5cbmludGVyZmFjZSBCb29raW5nUmVzcG9uc2Uge1xuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHByaWNlPzogbnVtYmVyO1xuICAgIGJvb2tpbmdJZD86IHN0cmluZztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJvb2tpbmcoZGF0YTogQm9va2luZ1JlcXVlc3QpOiBQcm9taXNlPEJvb2tpbmdSZXNwb25zZT4ge1xuICAgIGNvbnN0IHsgdXNlcklkLCBzdHVkaW9JZCwgcm9vbU5hbWUsIGRhdGUsIHN0YXJ0VGltZSwgZHVyYXRpb25Ib3VycywgdXNlckNvdW50LCB0b3RhbFByaWNlT3ZlcnJpZGUgfSA9IGRhdGE7XG5cbiAgICAvLyAuLi4gYXZhaWxhYmlsaXR5IGNoZWNrIC4uLlxuXG4gICAgLy8gMS4gSU5WRU5UT1JZIENIRUNLIChEb3VibGUgQm9va2luZyBQcmV2ZW50aW9uKVxuICAgIGNvbnN0IGlzQXZhaWxhYmxlID0gY2hlY2tBdmFpbGFiaWxpdHkoc3R1ZGlvSWQsIHJvb21OYW1lLCBkYXRlLCBzdGFydFRpbWUsIGR1cmF0aW9uSG91cnMpO1xuICAgIGlmICghaXNBdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogXCLwn5qrIFRoaXMgdGltZSBzbG90IGlzIGFscmVhZHkgYm9va2VkISBQbGVhc2UgY2hvb3NlIGFub3RoZXIgdGltZS5cIlxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIDIuIENhbGN1bGF0ZSBQcmljZVxuICAgIGxldCB0b3RhbFByaWNlID0gMDtcbiAgICBpZiAodG90YWxQcmljZU92ZXJyaWRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdG90YWxQcmljZSA9IHRvdGFsUHJpY2VPdmVycmlkZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGYWxsYmFjayB0byBsZWdhY3kgbG9naWNcbiAgICAgICAgY29uc3QgYm9va2luZ0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSwgbm93LmdldE1vbnRoKCksIG5vdy5nZXREYXRlKCkpO1xuICAgICAgICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKGJvb2tpbmdEYXRlLmdldEZ1bGxZZWFyKCksIGJvb2tpbmdEYXRlLmdldE1vbnRoKCksIGJvb2tpbmdEYXRlLmdldERhdGUoKSk7XG4gICAgICAgIGNvbnN0IGlzVG9kYXlPclRvbW9ycm93ID0gdGFyZ2V0RGF0ZS5nZXRUaW1lKCkgPT09IHRvZGF5LmdldFRpbWUoKSB8fCB0YXJnZXREYXRlLmdldFRpbWUoKSA9PT0gdG9tb3Jyb3cuZ2V0VGltZSgpO1xuXG4gICAgICAgIGlmIChkdXJhdGlvbkhvdXJzID49IDEwKSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlID0gUFJJQ0VfTE9DS09VVF9GTEFUO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVzZXJDb3VudCA8PSAyICYmIGlzVG9kYXlPclRvbW9ycm93KSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlID0gUFJJQ0VfSU5ESVZJRFVBTF9IT1VSTFkgKiB1c2VyQ291bnQgKiBkdXJhdGlvbkhvdXJzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG90YWxQcmljZSA9IFBSSUNFX0JBTkRfSE9VUkxZICogZHVyYXRpb25Ib3VycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIDMuIFNhdmUgdG8gTG9jYWwgREJcbiAgICBjb25zdCBuZXdCb29raW5nOiBCb29raW5nID0ge1xuICAgICAgICBpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLFxuICAgICAgICB1c2VySWQsXG4gICAgICAgIHN0dWRpb0lkLFxuICAgICAgICByb29tTmFtZSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICBkdXJhdGlvbkhvdXJzLFxuICAgICAgICB1c2VyQ291bnQsXG4gICAgICAgIHRvdGFsUHJpY2UsXG4gICAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgfTtcblxuICAgIHNhdmVCb29raW5nKG5ld0Jvb2tpbmcpO1xuXG4gICAgLy8gNC4gQ3JlYXRlIFBheW1lbnQgUmVjb3JkIChmb3IgcmV2ZW51ZSB0cmFja2luZylcbiAgICAvLyAuLi4gc2FtZSBhcyBiZWZvcmVcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzdHVkaW8gPSBhd2FpdCBmZXRjaFN0dWRpbyhzdHVkaW9JZCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpO1xuXG4gICAgICAgIGF3YWl0IGNyZWF0ZVBheW1lbnQoe1xuICAgICAgICAgICAgYm9va2luZ0lkOiBuZXdCb29raW5nLmlkLFxuICAgICAgICAgICAgc3R1ZGlvSWQ6IHN0dWRpb0lkLFxuICAgICAgICAgICAgc3R1ZGlvTmFtZTogc3R1ZGlvPy5zdG9yZU5hbWUgfHwgXCJVbmtub3duIFN0dWRpb1wiLFxuICAgICAgICAgICAgdXNlck5hbWU6IHVzZXI/Lm5hbWUgfHwgXCJHdWVzdCBVc2VyXCIsXG4gICAgICAgICAgICB1c2VyRW1haWw6IHVzZXI/LmVtYWlsIHx8IFwiXCIsXG4gICAgICAgICAgICB1c2VyUGhvbmU6IHVzZXI/LnBob25lLFxuICAgICAgICAgICAgYW1vdW50OiB0b3RhbFByaWNlLFxuICAgICAgICAgICAgcGF5bWVudE1ldGhvZDogXCJzdHJpcGVcIiAvLyBEZWZhdWx0IGZvciBvbmxpbmUgYm9va2luZ3NcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBwYXltZW50IHJlY29yZFwiLCBlKTtcbiAgICB9XG5cbiAgICAvLyA1LiBBdXRvLXJlZ2lzdGVyIHRvIE15IFN0dWRpb3NcbiAgICAvLyAuLi5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBhZGRNeVN0dWRpb0FjdGlvbihzdHVkaW9JZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGF1dG8tYWRkIG15IHN0dWRpb1wiLCBlKTtcbiAgICB9XG5cbiAgICAvLyA2LiBOb3RpZmljYXRpb25zXG4gICAgLy8gLi4uXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZCk7XG4gICAgY29uc3QgdXNlckVtYWlsID0gdXNlcj8uZW1haWw7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVkgJiYgdXNlckVtYWlsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCByZXNlbmQuZW1haWxzLnNlbmQoe1xuICAgICAgICAgICAgICAgIGZyb206ICdTdHVkaS1HbyA8bm9yZXBseUBzZW5kLnN0dWRpLWdvLmNvbT4nLFxuICAgICAgICAgICAgICAgIHRvOiB1c2VyRW1haWwsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJ+OAkE11c2ljIFN0dWRpb+OAkeS6iOe0hOWujOS6huOBruOBiuefpeOCieOBmycsXG4gICAgICAgICAgICAgICAgaHRtbDogYFxuICAgICAgICAgICAgICAgICAgICA8aDE+5LqI57SE44GM5a6M5LqG44GX44G+44GX44GfPC9oMT5cbiAgICAgICAgICAgICAgICAgICAgPHA+5Lul5LiL44Gu5YaF5a6544Gn5LqI57SE44KS5Y+X44GR5LuY44GR44G+44GX44Gf44CCPC9wPlxuICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7kuojntIRJRDo8L3N0cm9uZz4gJHtuZXdCb29raW5nLmlkfTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7jgrnjgr/jgrjjgqo6PC9zdHJvbmc+ICR7c3R1ZGlvSWR9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPumDqOWxizo8L3N0cm9uZz4gJHtyb29tTmFtZX08L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+5pel5LuYOjwvc3Ryb25nPiAke2RhdGV9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPuaZgumWkzo8L3N0cm9uZz4gJHtzdGFydFRpbWV9ICgke2R1cmF0aW9uSG91cnN95pmC6ZaTKTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7mlpnph5E6PC9zdHJvbmc+IMKlJHt0b3RhbFByaWNlLnRvTG9jYWxlU3RyaW5nKCl9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPHA+44GU5p2l5bqX44KS44GK5b6F44Gh44GX44Gm44GK44KK44G+44GZ44CCPC9wPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFtOb3RpZmljYXRpb25dIPCfk6cgRW1haWwgc2VudCB0byAke3VzZXJFbWFpbH0gdmlhIFJlc2VuZC5gKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tOb3RpZmljYXRpb25dIOKdjCBGYWlsZWQgdG8gc2VuZCBlbWFpbCB2aWEgUmVzZW5kOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiQm9va2luZyBzdWNjZXNzZnVsISBDb25maXJtYXRpb24gc2VudCB0byBlbWFpbC9TTVMuXCIsXG4gICAgICAgIHByaWNlOiB0b3RhbFByaWNlLFxuICAgICAgICBib29raW5nSWQ6IG5ld0Jvb2tpbmcuaWRcbiAgICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2FuY2VsQm9va2luZ0FjdGlvbihib29raW5nSWQ6IHN0cmluZyk6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyBtZXNzYWdlOiBzdHJpbmcgfT4ge1xuICAgIGNvbnN0IHsgdXBkYXRlQm9va2luZywgZ2V0Qm9va2luZ0J5SWQgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLWxvY2FsXCIpO1xuICAgIGNvbnN0IGJvb2tpbmcgPSBnZXRCb29raW5nQnlJZChib29raW5nSWQpO1xuICAgIGlmICghYm9va2luZykgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiQm9va2luZyBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHVwZGF0ZUJvb2tpbmcoYm9va2luZ0lkLCB7IHN0YXR1czogJ2NhbmNlbGxlZCcgfSk7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFtOb3RpZmljYXRpb25dIPCfj6ogU3R1ZGlvICR7Ym9va2luZy5zdHVkaW9JZH06IEJvb2tpbmcgJHtib29raW5nSWR9IGhhcyBiZWVuIENBTkNFTExFRCBieSB1c2VyLmApO1xuICAgICAgICAvLyBIZXJlIHlvdSB3b3VsZCBhbHNvIHVwZGF0ZSBwYXltZW50IHN0YXR1cyB0byAnZmFpbGVkJyBvciAncmVmdW5kZWQnIGlmIG5lZWRlZFxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiBcIkJvb2tpbmcgY2FuY2VsbGVkIHN1Y2Nlc3NmdWxseVwiIH07XG4gICAgfVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIkZhaWxlZCB0byBjYW5jZWwgYm9va2luZ1wiIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVCb29raW5nQWN0aW9uKGJvb2tpbmdJZDogc3RyaW5nLCBkYXRhOiBQYXJ0aWFsPEJvb2tpbmdSZXF1ZXN0Pik6IFByb21pc2U8Qm9va2luZ1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgeyB1cGRhdGVCb29raW5nLCBnZXRCb29raW5nQnlJZCwgY2hlY2tBdmFpbGFiaWxpdHkgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLWxvY2FsXCIpO1xuICAgIGNvbnN0IG9sZEJvb2tpbmcgPSBnZXRCb29raW5nQnlJZChib29raW5nSWQpO1xuICAgIGlmICghb2xkQm9va2luZykgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiQm9va2luZyBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3Qgc3R1ZGlvSWQgPSBkYXRhLnN0dWRpb0lkIHx8IG9sZEJvb2tpbmcuc3R1ZGlvSWQ7XG4gICAgY29uc3Qgcm9vbU5hbWUgPSBkYXRhLnJvb21OYW1lIHx8IG9sZEJvb2tpbmcucm9vbU5hbWU7XG4gICAgY29uc3QgZGF0ZSA9IGRhdGEuZGF0ZSB8fCBvbGRCb29raW5nLmRhdGU7XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gZGF0YS5zdGFydFRpbWUgfHwgb2xkQm9va2luZy5zdGFydFRpbWU7XG4gICAgY29uc3QgZHVyYXRpb25Ib3VycyA9IGRhdGEuZHVyYXRpb25Ib3VycyB8fCBvbGRCb29raW5nLmR1cmF0aW9uSG91cnM7XG5cbiAgICAvLyBDaGVjayBhdmFpbGFiaWxpdHkgKGV4Y2x1ZGluZyB0aGlzIHNwZWNpZmljIGJvb2tpbmcpXG4gICAgY29uc3QgaXNBdmFpbGFibGUgPSBjaGVja0F2YWlsYWJpbGl0eShzdHVkaW9JZCwgcm9vbU5hbWUsIGRhdGUsIHN0YXJ0VGltZSwgZHVyYXRpb25Ib3VycywgYm9va2luZ0lkKTtcbiAgICBpZiAoIWlzQXZhaWxhYmxlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIvCfmqsgVGhpcyB0aW1lIHNsb3QgaXMgYWxyZWFkeSBib29rZWQhXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBzdWNjZXNzID0gdXBkYXRlQm9va2luZyhib29raW5nSWQsIHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgc3RhdHVzOiAnbW9kaWZpZWQnXG4gICAgfSk7XG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICBjb25zb2xlLmxvZyhgW05vdGlmaWNhdGlvbl0g8J+PqiBTdHVkaW8gJHtzdHVkaW9JZH06IEJvb2tpbmcgJHtib29raW5nSWR9IGhhcyBiZWVuIE1PRElGSUVEIGJ5IHVzZXIuYCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiQm9va2luZyB1cGRhdGVkIHN1Y2Nlc3NmdWxseVwiIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBib29raW5nXCIgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoTXlCb29raW5ncygpOiBQcm9taXNlPGFueVtdPiB7XG4gICAgY29uc3QgeyBnZXRDdXJyZW50VXNlciB9ID0gYXdhaXQgaW1wb3J0KFwiLi9sb2dpblwiKTtcbiAgICBjb25zdCB7IGdldEJvb2tpbmdzIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9kYi1sb2NhbFwiKTtcbiAgICBjb25zdCB7IGdldEFsbFN0dWRpb3MgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLXN0dWRpb1wiKTtcbiAgICBjb25zdCBmcyA9IGF3YWl0IGltcG9ydChcImZzXCIpO1xuICAgIGNvbnN0IHBhdGggPSBhd2FpdCBpbXBvcnQoXCJwYXRoXCIpO1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKCk7XG4gICAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgICBjb25zdCBzdHVkaW9zID0gZ2V0QWxsU3R1ZGlvcygpO1xuICAgIGNvbnN0IHN0dWRpb01hcCA9IG5ldyBNYXAoc3R1ZGlvcy5tYXAocyA9PiBbcy5pZCwgeyBuYW1lOiBzLnN0b3JlTmFtZSwgaW52b2ljZTogcy5pbnZvaWNlTnVtYmVyIH1dKSk7XG5cbiAgICBsZXQgcGF5bWVudHM6IGFueVtdID0gW107XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJkYXRhXCIsIFwicGF5bWVudHMuanNvblwiKTtcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocFBhdGgpKSB7XG4gICAgICAgICAgICBwYXltZW50cyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBQYXRoLCBcInV0Zi04XCIpKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIHBheW1lbnRzIGZvciBzdGF0dXMgY2hlY2tcIiwgZSk7XG4gICAgfVxuICAgIGNvbnN0IHBheW1lbnRTdGF0dXNNYXAgPSBuZXcgTWFwKHBheW1lbnRzLm1hcChwID0+IFtwLmJvb2tpbmdJZCwgcC5zdGF0dXNdKSk7XG5cbiAgICByZXR1cm4gZ2V0Qm9va2luZ3MoKVxuICAgICAgICAuZmlsdGVyKGIgPT4gYi51c2VySWQgPT09IHVzZXIuaWQpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShiLmRhdGUpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGEuZGF0ZSkuZ2V0VGltZSgpKVxuICAgICAgICAubWFwKGIgPT4ge1xuICAgICAgICAgICAgY29uc3QgcyA9IHN0dWRpb01hcC5nZXQoYi5zdHVkaW9JZCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmIsXG4gICAgICAgICAgICAgICAgc3R1ZGlvTmFtZTogcz8ubmFtZSB8fCBcIlVua25vd24gU3R1ZGlvXCIsXG4gICAgICAgICAgICAgICAgaW52b2ljZU51bWJlcjogcz8uaW52b2ljZSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgIHBheW1lbnRTdGF0dXM6IHBheW1lbnRTdGF0dXNNYXAuZ2V0KGIuaWQpIHx8IFwicGVuZGluZ1wiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiMlNBME1zQiw0TEFBQSJ9
}),
"[project]/music-studio-app/src/actions/data:c4ebf1 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelBookingAction",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40e1c759f12b668656bda7a8495bfdfc4b7ceba999":"cancelBookingAction"},"music-studio-app/src/actions/booking.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40e1c759f12b668656bda7a8495bfdfc4b7ceba999", __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "cancelBookingAction");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYm9va2luZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY2hlY2tBdmFpbGFiaWxpdHksIHNhdmVCb29raW5nLCBCb29raW5nIH0gZnJvbSBcIkAvbGliL2RiLWxvY2FsXCI7XG5pbXBvcnQgeyBhZGRNeVN0dWRpb0FjdGlvbiwgZ2V0VXNlckJ5SWQgfSBmcm9tIFwiLi91c2VyXCI7XG5pbXBvcnQgeyBmZXRjaFN0dWRpbyB9IGZyb20gXCIuL3N0dWRpb1wiO1xuaW1wb3J0IHsgY3JlYXRlUGF5bWVudCB9IGZyb20gXCIuL3BheW1lbnRcIjtcbmltcG9ydCB7IFJlc2VuZCB9IGZyb20gJ3Jlc2VuZCc7XG5cbmNvbnN0IHJlc2VuZCA9IG5ldyBSZXNlbmQocHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVkpO1xuXG4vLyBVcGRhdGUgaW50ZXJmYWNlXG5pbnRlcmZhY2UgQm9va2luZ1JlcXVlc3Qge1xuICAgIHVzZXJJZDogc3RyaW5nO1xuICAgIHN0dWRpb0lkOiBzdHJpbmc7XG4gICAgcm9vbU5hbWU/OiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIHN0YXJ0VGltZTogc3RyaW5nO1xuICAgIGR1cmF0aW9uSG91cnM6IG51bWJlcjtcbiAgICB1c2VyQ291bnQ6IG51bWJlcjtcbiAgICBlcXVpcG1lbnRJZHM6IHN0cmluZ1tdO1xuICAgIHRvdGFsUHJpY2VPdmVycmlkZT86IG51bWJlcjsgLy8gQWxsb3cgY2xpZW50IGNhbGN1bGF0ZWQgcHJpY2Vcbn1cblxuLy8gLi4uIGNvbnN0YW50cyAuLi5cbmNvbnN0IFBSSUNFX0JBTkRfSE9VUkxZID0gMjUwMDtcbmNvbnN0IFBSSUNFX0lORElWSURVQUxfSE9VUkxZID0gODAwO1xuY29uc3QgUFJJQ0VfTE9DS09VVF9GTEFUID0gMjAwMDA7XG5cbmludGVyZmFjZSBCb29raW5nUmVzcG9uc2Uge1xuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHByaWNlPzogbnVtYmVyO1xuICAgIGJvb2tpbmdJZD86IHN0cmluZztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJvb2tpbmcoZGF0YTogQm9va2luZ1JlcXVlc3QpOiBQcm9taXNlPEJvb2tpbmdSZXNwb25zZT4ge1xuICAgIGNvbnN0IHsgdXNlcklkLCBzdHVkaW9JZCwgcm9vbU5hbWUsIGRhdGUsIHN0YXJ0VGltZSwgZHVyYXRpb25Ib3VycywgdXNlckNvdW50LCB0b3RhbFByaWNlT3ZlcnJpZGUgfSA9IGRhdGE7XG5cbiAgICAvLyAuLi4gYXZhaWxhYmlsaXR5IGNoZWNrIC4uLlxuXG4gICAgLy8gMS4gSU5WRU5UT1JZIENIRUNLIChEb3VibGUgQm9va2luZyBQcmV2ZW50aW9uKVxuICAgIGNvbnN0IGlzQXZhaWxhYmxlID0gY2hlY2tBdmFpbGFiaWxpdHkoc3R1ZGlvSWQsIHJvb21OYW1lLCBkYXRlLCBzdGFydFRpbWUsIGR1cmF0aW9uSG91cnMpO1xuICAgIGlmICghaXNBdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogXCLwn5qrIFRoaXMgdGltZSBzbG90IGlzIGFscmVhZHkgYm9va2VkISBQbGVhc2UgY2hvb3NlIGFub3RoZXIgdGltZS5cIlxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIDIuIENhbGN1bGF0ZSBQcmljZVxuICAgIGxldCB0b3RhbFByaWNlID0gMDtcbiAgICBpZiAodG90YWxQcmljZU92ZXJyaWRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdG90YWxQcmljZSA9IHRvdGFsUHJpY2VPdmVycmlkZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGYWxsYmFjayB0byBsZWdhY3kgbG9naWNcbiAgICAgICAgY29uc3QgYm9va2luZ0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSwgbm93LmdldE1vbnRoKCksIG5vdy5nZXREYXRlKCkpO1xuICAgICAgICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKGJvb2tpbmdEYXRlLmdldEZ1bGxZZWFyKCksIGJvb2tpbmdEYXRlLmdldE1vbnRoKCksIGJvb2tpbmdEYXRlLmdldERhdGUoKSk7XG4gICAgICAgIGNvbnN0IGlzVG9kYXlPclRvbW9ycm93ID0gdGFyZ2V0RGF0ZS5nZXRUaW1lKCkgPT09IHRvZGF5LmdldFRpbWUoKSB8fCB0YXJnZXREYXRlLmdldFRpbWUoKSA9PT0gdG9tb3Jyb3cuZ2V0VGltZSgpO1xuXG4gICAgICAgIGlmIChkdXJhdGlvbkhvdXJzID49IDEwKSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlID0gUFJJQ0VfTE9DS09VVF9GTEFUO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVzZXJDb3VudCA8PSAyICYmIGlzVG9kYXlPclRvbW9ycm93KSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlID0gUFJJQ0VfSU5ESVZJRFVBTF9IT1VSTFkgKiB1c2VyQ291bnQgKiBkdXJhdGlvbkhvdXJzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG90YWxQcmljZSA9IFBSSUNFX0JBTkRfSE9VUkxZICogZHVyYXRpb25Ib3VycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIDMuIFNhdmUgdG8gTG9jYWwgREJcbiAgICBjb25zdCBuZXdCb29raW5nOiBCb29raW5nID0ge1xuICAgICAgICBpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLFxuICAgICAgICB1c2VySWQsXG4gICAgICAgIHN0dWRpb0lkLFxuICAgICAgICByb29tTmFtZSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICBkdXJhdGlvbkhvdXJzLFxuICAgICAgICB1c2VyQ291bnQsXG4gICAgICAgIHRvdGFsUHJpY2UsXG4gICAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgfTtcblxuICAgIHNhdmVCb29raW5nKG5ld0Jvb2tpbmcpO1xuXG4gICAgLy8gNC4gQ3JlYXRlIFBheW1lbnQgUmVjb3JkIChmb3IgcmV2ZW51ZSB0cmFja2luZylcbiAgICAvLyAuLi4gc2FtZSBhcyBiZWZvcmVcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzdHVkaW8gPSBhd2FpdCBmZXRjaFN0dWRpbyhzdHVkaW9JZCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpO1xuXG4gICAgICAgIGF3YWl0IGNyZWF0ZVBheW1lbnQoe1xuICAgICAgICAgICAgYm9va2luZ0lkOiBuZXdCb29raW5nLmlkLFxuICAgICAgICAgICAgc3R1ZGlvSWQ6IHN0dWRpb0lkLFxuICAgICAgICAgICAgc3R1ZGlvTmFtZTogc3R1ZGlvPy5zdG9yZU5hbWUgfHwgXCJVbmtub3duIFN0dWRpb1wiLFxuICAgICAgICAgICAgdXNlck5hbWU6IHVzZXI/Lm5hbWUgfHwgXCJHdWVzdCBVc2VyXCIsXG4gICAgICAgICAgICB1c2VyRW1haWw6IHVzZXI/LmVtYWlsIHx8IFwiXCIsXG4gICAgICAgICAgICB1c2VyUGhvbmU6IHVzZXI/LnBob25lLFxuICAgICAgICAgICAgYW1vdW50OiB0b3RhbFByaWNlLFxuICAgICAgICAgICAgcGF5bWVudE1ldGhvZDogXCJzdHJpcGVcIiAvLyBEZWZhdWx0IGZvciBvbmxpbmUgYm9va2luZ3NcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBwYXltZW50IHJlY29yZFwiLCBlKTtcbiAgICB9XG5cbiAgICAvLyA1LiBBdXRvLXJlZ2lzdGVyIHRvIE15IFN0dWRpb3NcbiAgICAvLyAuLi5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBhZGRNeVN0dWRpb0FjdGlvbihzdHVkaW9JZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGF1dG8tYWRkIG15IHN0dWRpb1wiLCBlKTtcbiAgICB9XG5cbiAgICAvLyA2LiBOb3RpZmljYXRpb25zXG4gICAgLy8gLi4uXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZCk7XG4gICAgY29uc3QgdXNlckVtYWlsID0gdXNlcj8uZW1haWw7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVkgJiYgdXNlckVtYWlsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCByZXNlbmQuZW1haWxzLnNlbmQoe1xuICAgICAgICAgICAgICAgIGZyb206ICdTdHVkaS1HbyA8bm9yZXBseUBzZW5kLnN0dWRpLWdvLmNvbT4nLFxuICAgICAgICAgICAgICAgIHRvOiB1c2VyRW1haWwsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJ+OAkE11c2ljIFN0dWRpb+OAkeS6iOe0hOWujOS6huOBruOBiuefpeOCieOBmycsXG4gICAgICAgICAgICAgICAgaHRtbDogYFxuICAgICAgICAgICAgICAgICAgICA8aDE+5LqI57SE44GM5a6M5LqG44GX44G+44GX44GfPC9oMT5cbiAgICAgICAgICAgICAgICAgICAgPHA+5Lul5LiL44Gu5YaF5a6544Gn5LqI57SE44KS5Y+X44GR5LuY44GR44G+44GX44Gf44CCPC9wPlxuICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7kuojntIRJRDo8L3N0cm9uZz4gJHtuZXdCb29raW5nLmlkfTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7jgrnjgr/jgrjjgqo6PC9zdHJvbmc+ICR7c3R1ZGlvSWR9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPumDqOWxizo8L3N0cm9uZz4gJHtyb29tTmFtZX08L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+5pel5LuYOjwvc3Ryb25nPiAke2RhdGV9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPuaZgumWkzo8L3N0cm9uZz4gJHtzdGFydFRpbWV9ICgke2R1cmF0aW9uSG91cnN95pmC6ZaTKTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7mlpnph5E6PC9zdHJvbmc+IMKlJHt0b3RhbFByaWNlLnRvTG9jYWxlU3RyaW5nKCl9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPHA+44GU5p2l5bqX44KS44GK5b6F44Gh44GX44Gm44GK44KK44G+44GZ44CCPC9wPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFtOb3RpZmljYXRpb25dIPCfk6cgRW1haWwgc2VudCB0byAke3VzZXJFbWFpbH0gdmlhIFJlc2VuZC5gKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tOb3RpZmljYXRpb25dIOKdjCBGYWlsZWQgdG8gc2VuZCBlbWFpbCB2aWEgUmVzZW5kOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiQm9va2luZyBzdWNjZXNzZnVsISBDb25maXJtYXRpb24gc2VudCB0byBlbWFpbC9TTVMuXCIsXG4gICAgICAgIHByaWNlOiB0b3RhbFByaWNlLFxuICAgICAgICBib29raW5nSWQ6IG5ld0Jvb2tpbmcuaWRcbiAgICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2FuY2VsQm9va2luZ0FjdGlvbihib29raW5nSWQ6IHN0cmluZyk6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyBtZXNzYWdlOiBzdHJpbmcgfT4ge1xuICAgIGNvbnN0IHsgdXBkYXRlQm9va2luZywgZ2V0Qm9va2luZ0J5SWQgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLWxvY2FsXCIpO1xuICAgIGNvbnN0IGJvb2tpbmcgPSBnZXRCb29raW5nQnlJZChib29raW5nSWQpO1xuICAgIGlmICghYm9va2luZykgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiQm9va2luZyBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHVwZGF0ZUJvb2tpbmcoYm9va2luZ0lkLCB7IHN0YXR1czogJ2NhbmNlbGxlZCcgfSk7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFtOb3RpZmljYXRpb25dIPCfj6ogU3R1ZGlvICR7Ym9va2luZy5zdHVkaW9JZH06IEJvb2tpbmcgJHtib29raW5nSWR9IGhhcyBiZWVuIENBTkNFTExFRCBieSB1c2VyLmApO1xuICAgICAgICAvLyBIZXJlIHlvdSB3b3VsZCBhbHNvIHVwZGF0ZSBwYXltZW50IHN0YXR1cyB0byAnZmFpbGVkJyBvciAncmVmdW5kZWQnIGlmIG5lZWRlZFxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiBcIkJvb2tpbmcgY2FuY2VsbGVkIHN1Y2Nlc3NmdWxseVwiIH07XG4gICAgfVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIkZhaWxlZCB0byBjYW5jZWwgYm9va2luZ1wiIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVCb29raW5nQWN0aW9uKGJvb2tpbmdJZDogc3RyaW5nLCBkYXRhOiBQYXJ0aWFsPEJvb2tpbmdSZXF1ZXN0Pik6IFByb21pc2U8Qm9va2luZ1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgeyB1cGRhdGVCb29raW5nLCBnZXRCb29raW5nQnlJZCwgY2hlY2tBdmFpbGFiaWxpdHkgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLWxvY2FsXCIpO1xuICAgIGNvbnN0IG9sZEJvb2tpbmcgPSBnZXRCb29raW5nQnlJZChib29raW5nSWQpO1xuICAgIGlmICghb2xkQm9va2luZykgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiQm9va2luZyBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3Qgc3R1ZGlvSWQgPSBkYXRhLnN0dWRpb0lkIHx8IG9sZEJvb2tpbmcuc3R1ZGlvSWQ7XG4gICAgY29uc3Qgcm9vbU5hbWUgPSBkYXRhLnJvb21OYW1lIHx8IG9sZEJvb2tpbmcucm9vbU5hbWU7XG4gICAgY29uc3QgZGF0ZSA9IGRhdGEuZGF0ZSB8fCBvbGRCb29raW5nLmRhdGU7XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gZGF0YS5zdGFydFRpbWUgfHwgb2xkQm9va2luZy5zdGFydFRpbWU7XG4gICAgY29uc3QgZHVyYXRpb25Ib3VycyA9IGRhdGEuZHVyYXRpb25Ib3VycyB8fCBvbGRCb29raW5nLmR1cmF0aW9uSG91cnM7XG5cbiAgICAvLyBDaGVjayBhdmFpbGFiaWxpdHkgKGV4Y2x1ZGluZyB0aGlzIHNwZWNpZmljIGJvb2tpbmcpXG4gICAgY29uc3QgaXNBdmFpbGFibGUgPSBjaGVja0F2YWlsYWJpbGl0eShzdHVkaW9JZCwgcm9vbU5hbWUsIGRhdGUsIHN0YXJ0VGltZSwgZHVyYXRpb25Ib3VycywgYm9va2luZ0lkKTtcbiAgICBpZiAoIWlzQXZhaWxhYmxlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIvCfmqsgVGhpcyB0aW1lIHNsb3QgaXMgYWxyZWFkeSBib29rZWQhXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBzdWNjZXNzID0gdXBkYXRlQm9va2luZyhib29raW5nSWQsIHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgc3RhdHVzOiAnbW9kaWZpZWQnXG4gICAgfSk7XG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICBjb25zb2xlLmxvZyhgW05vdGlmaWNhdGlvbl0g8J+PqiBTdHVkaW8gJHtzdHVkaW9JZH06IEJvb2tpbmcgJHtib29raW5nSWR9IGhhcyBiZWVuIE1PRElGSUVEIGJ5IHVzZXIuYCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiQm9va2luZyB1cGRhdGVkIHN1Y2Nlc3NmdWxseVwiIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBib29raW5nXCIgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoTXlCb29raW5ncygpOiBQcm9taXNlPGFueVtdPiB7XG4gICAgY29uc3QgeyBnZXRDdXJyZW50VXNlciB9ID0gYXdhaXQgaW1wb3J0KFwiLi9sb2dpblwiKTtcbiAgICBjb25zdCB7IGdldEJvb2tpbmdzIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9kYi1sb2NhbFwiKTtcbiAgICBjb25zdCB7IGdldEFsbFN0dWRpb3MgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLXN0dWRpb1wiKTtcbiAgICBjb25zdCBmcyA9IGF3YWl0IGltcG9ydChcImZzXCIpO1xuICAgIGNvbnN0IHBhdGggPSBhd2FpdCBpbXBvcnQoXCJwYXRoXCIpO1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKCk7XG4gICAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgICBjb25zdCBzdHVkaW9zID0gZ2V0QWxsU3R1ZGlvcygpO1xuICAgIGNvbnN0IHN0dWRpb01hcCA9IG5ldyBNYXAoc3R1ZGlvcy5tYXAocyA9PiBbcy5pZCwgeyBuYW1lOiBzLnN0b3JlTmFtZSwgaW52b2ljZTogcy5pbnZvaWNlTnVtYmVyIH1dKSk7XG5cbiAgICBsZXQgcGF5bWVudHM6IGFueVtdID0gW107XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJkYXRhXCIsIFwicGF5bWVudHMuanNvblwiKTtcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocFBhdGgpKSB7XG4gICAgICAgICAgICBwYXltZW50cyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBQYXRoLCBcInV0Zi04XCIpKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIHBheW1lbnRzIGZvciBzdGF0dXMgY2hlY2tcIiwgZSk7XG4gICAgfVxuICAgIGNvbnN0IHBheW1lbnRTdGF0dXNNYXAgPSBuZXcgTWFwKHBheW1lbnRzLm1hcChwID0+IFtwLmJvb2tpbmdJZCwgcC5zdGF0dXNdKSk7XG5cbiAgICByZXR1cm4gZ2V0Qm9va2luZ3MoKVxuICAgICAgICAuZmlsdGVyKGIgPT4gYi51c2VySWQgPT09IHVzZXIuaWQpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShiLmRhdGUpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGEuZGF0ZSkuZ2V0VGltZSgpKVxuICAgICAgICAubWFwKGIgPT4ge1xuICAgICAgICAgICAgY29uc3QgcyA9IHN0dWRpb01hcC5nZXQoYi5zdHVkaW9JZCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmIsXG4gICAgICAgICAgICAgICAgc3R1ZGlvTmFtZTogcz8ubmFtZSB8fCBcIlVua25vd24gU3R1ZGlvXCIsXG4gICAgICAgICAgICAgICAgaW52b2ljZU51bWJlcjogcz8uaW52b2ljZSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgIHBheW1lbnRTdGF0dXM6IHBheW1lbnRTdGF0dXNNYXAuZ2V0KGIuaWQpIHx8IFwicGVuZGluZ1wiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiK1NBOEpzQixnTUFBQSJ9
}),
"[project]/music-studio-app/src/actions/data:4e825b [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateBookingAction",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60a7856d8be55f0af9c652115e1718d17f98d647d6":"updateBookingAction"},"music-studio-app/src/actions/booking.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60a7856d8be55f0af9c652115e1718d17f98d647d6", __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateBookingAction");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYm9va2luZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY2hlY2tBdmFpbGFiaWxpdHksIHNhdmVCb29raW5nLCBCb29raW5nIH0gZnJvbSBcIkAvbGliL2RiLWxvY2FsXCI7XG5pbXBvcnQgeyBhZGRNeVN0dWRpb0FjdGlvbiwgZ2V0VXNlckJ5SWQgfSBmcm9tIFwiLi91c2VyXCI7XG5pbXBvcnQgeyBmZXRjaFN0dWRpbyB9IGZyb20gXCIuL3N0dWRpb1wiO1xuaW1wb3J0IHsgY3JlYXRlUGF5bWVudCB9IGZyb20gXCIuL3BheW1lbnRcIjtcbmltcG9ydCB7IFJlc2VuZCB9IGZyb20gJ3Jlc2VuZCc7XG5cbmNvbnN0IHJlc2VuZCA9IG5ldyBSZXNlbmQocHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVkpO1xuXG4vLyBVcGRhdGUgaW50ZXJmYWNlXG5pbnRlcmZhY2UgQm9va2luZ1JlcXVlc3Qge1xuICAgIHVzZXJJZDogc3RyaW5nO1xuICAgIHN0dWRpb0lkOiBzdHJpbmc7XG4gICAgcm9vbU5hbWU/OiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIHN0YXJ0VGltZTogc3RyaW5nO1xuICAgIGR1cmF0aW9uSG91cnM6IG51bWJlcjtcbiAgICB1c2VyQ291bnQ6IG51bWJlcjtcbiAgICBlcXVpcG1lbnRJZHM6IHN0cmluZ1tdO1xuICAgIHRvdGFsUHJpY2VPdmVycmlkZT86IG51bWJlcjsgLy8gQWxsb3cgY2xpZW50IGNhbGN1bGF0ZWQgcHJpY2Vcbn1cblxuLy8gLi4uIGNvbnN0YW50cyAuLi5cbmNvbnN0IFBSSUNFX0JBTkRfSE9VUkxZID0gMjUwMDtcbmNvbnN0IFBSSUNFX0lORElWSURVQUxfSE9VUkxZID0gODAwO1xuY29uc3QgUFJJQ0VfTE9DS09VVF9GTEFUID0gMjAwMDA7XG5cbmludGVyZmFjZSBCb29raW5nUmVzcG9uc2Uge1xuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHByaWNlPzogbnVtYmVyO1xuICAgIGJvb2tpbmdJZD86IHN0cmluZztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJvb2tpbmcoZGF0YTogQm9va2luZ1JlcXVlc3QpOiBQcm9taXNlPEJvb2tpbmdSZXNwb25zZT4ge1xuICAgIGNvbnN0IHsgdXNlcklkLCBzdHVkaW9JZCwgcm9vbU5hbWUsIGRhdGUsIHN0YXJ0VGltZSwgZHVyYXRpb25Ib3VycywgdXNlckNvdW50LCB0b3RhbFByaWNlT3ZlcnJpZGUgfSA9IGRhdGE7XG5cbiAgICAvLyAuLi4gYXZhaWxhYmlsaXR5IGNoZWNrIC4uLlxuXG4gICAgLy8gMS4gSU5WRU5UT1JZIENIRUNLIChEb3VibGUgQm9va2luZyBQcmV2ZW50aW9uKVxuICAgIGNvbnN0IGlzQXZhaWxhYmxlID0gY2hlY2tBdmFpbGFiaWxpdHkoc3R1ZGlvSWQsIHJvb21OYW1lLCBkYXRlLCBzdGFydFRpbWUsIGR1cmF0aW9uSG91cnMpO1xuICAgIGlmICghaXNBdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogXCLwn5qrIFRoaXMgdGltZSBzbG90IGlzIGFscmVhZHkgYm9va2VkISBQbGVhc2UgY2hvb3NlIGFub3RoZXIgdGltZS5cIlxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIDIuIENhbGN1bGF0ZSBQcmljZVxuICAgIGxldCB0b3RhbFByaWNlID0gMDtcbiAgICBpZiAodG90YWxQcmljZU92ZXJyaWRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdG90YWxQcmljZSA9IHRvdGFsUHJpY2VPdmVycmlkZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGYWxsYmFjayB0byBsZWdhY3kgbG9naWNcbiAgICAgICAgY29uc3QgYm9va2luZ0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSwgbm93LmdldE1vbnRoKCksIG5vdy5nZXREYXRlKCkpO1xuICAgICAgICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKGJvb2tpbmdEYXRlLmdldEZ1bGxZZWFyKCksIGJvb2tpbmdEYXRlLmdldE1vbnRoKCksIGJvb2tpbmdEYXRlLmdldERhdGUoKSk7XG4gICAgICAgIGNvbnN0IGlzVG9kYXlPclRvbW9ycm93ID0gdGFyZ2V0RGF0ZS5nZXRUaW1lKCkgPT09IHRvZGF5LmdldFRpbWUoKSB8fCB0YXJnZXREYXRlLmdldFRpbWUoKSA9PT0gdG9tb3Jyb3cuZ2V0VGltZSgpO1xuXG4gICAgICAgIGlmIChkdXJhdGlvbkhvdXJzID49IDEwKSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlID0gUFJJQ0VfTE9DS09VVF9GTEFUO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVzZXJDb3VudCA8PSAyICYmIGlzVG9kYXlPclRvbW9ycm93KSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlID0gUFJJQ0VfSU5ESVZJRFVBTF9IT1VSTFkgKiB1c2VyQ291bnQgKiBkdXJhdGlvbkhvdXJzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG90YWxQcmljZSA9IFBSSUNFX0JBTkRfSE9VUkxZICogZHVyYXRpb25Ib3VycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIDMuIFNhdmUgdG8gTG9jYWwgREJcbiAgICBjb25zdCBuZXdCb29raW5nOiBCb29raW5nID0ge1xuICAgICAgICBpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLFxuICAgICAgICB1c2VySWQsXG4gICAgICAgIHN0dWRpb0lkLFxuICAgICAgICByb29tTmFtZSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICBkdXJhdGlvbkhvdXJzLFxuICAgICAgICB1c2VyQ291bnQsXG4gICAgICAgIHRvdGFsUHJpY2UsXG4gICAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgfTtcblxuICAgIHNhdmVCb29raW5nKG5ld0Jvb2tpbmcpO1xuXG4gICAgLy8gNC4gQ3JlYXRlIFBheW1lbnQgUmVjb3JkIChmb3IgcmV2ZW51ZSB0cmFja2luZylcbiAgICAvLyAuLi4gc2FtZSBhcyBiZWZvcmVcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzdHVkaW8gPSBhd2FpdCBmZXRjaFN0dWRpbyhzdHVkaW9JZCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpO1xuXG4gICAgICAgIGF3YWl0IGNyZWF0ZVBheW1lbnQoe1xuICAgICAgICAgICAgYm9va2luZ0lkOiBuZXdCb29raW5nLmlkLFxuICAgICAgICAgICAgc3R1ZGlvSWQ6IHN0dWRpb0lkLFxuICAgICAgICAgICAgc3R1ZGlvTmFtZTogc3R1ZGlvPy5zdG9yZU5hbWUgfHwgXCJVbmtub3duIFN0dWRpb1wiLFxuICAgICAgICAgICAgdXNlck5hbWU6IHVzZXI/Lm5hbWUgfHwgXCJHdWVzdCBVc2VyXCIsXG4gICAgICAgICAgICB1c2VyRW1haWw6IHVzZXI/LmVtYWlsIHx8IFwiXCIsXG4gICAgICAgICAgICB1c2VyUGhvbmU6IHVzZXI/LnBob25lLFxuICAgICAgICAgICAgYW1vdW50OiB0b3RhbFByaWNlLFxuICAgICAgICAgICAgcGF5bWVudE1ldGhvZDogXCJzdHJpcGVcIiAvLyBEZWZhdWx0IGZvciBvbmxpbmUgYm9va2luZ3NcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBwYXltZW50IHJlY29yZFwiLCBlKTtcbiAgICB9XG5cbiAgICAvLyA1LiBBdXRvLXJlZ2lzdGVyIHRvIE15IFN0dWRpb3NcbiAgICAvLyAuLi5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBhZGRNeVN0dWRpb0FjdGlvbihzdHVkaW9JZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGF1dG8tYWRkIG15IHN0dWRpb1wiLCBlKTtcbiAgICB9XG5cbiAgICAvLyA2LiBOb3RpZmljYXRpb25zXG4gICAgLy8gLi4uXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZCk7XG4gICAgY29uc3QgdXNlckVtYWlsID0gdXNlcj8uZW1haWw7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVkgJiYgdXNlckVtYWlsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCByZXNlbmQuZW1haWxzLnNlbmQoe1xuICAgICAgICAgICAgICAgIGZyb206ICdTdHVkaS1HbyA8bm9yZXBseUBzZW5kLnN0dWRpLWdvLmNvbT4nLFxuICAgICAgICAgICAgICAgIHRvOiB1c2VyRW1haWwsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJ+OAkE11c2ljIFN0dWRpb+OAkeS6iOe0hOWujOS6huOBruOBiuefpeOCieOBmycsXG4gICAgICAgICAgICAgICAgaHRtbDogYFxuICAgICAgICAgICAgICAgICAgICA8aDE+5LqI57SE44GM5a6M5LqG44GX44G+44GX44GfPC9oMT5cbiAgICAgICAgICAgICAgICAgICAgPHA+5Lul5LiL44Gu5YaF5a6544Gn5LqI57SE44KS5Y+X44GR5LuY44GR44G+44GX44Gf44CCPC9wPlxuICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7kuojntIRJRDo8L3N0cm9uZz4gJHtuZXdCb29raW5nLmlkfTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7jgrnjgr/jgrjjgqo6PC9zdHJvbmc+ICR7c3R1ZGlvSWR9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPumDqOWxizo8L3N0cm9uZz4gJHtyb29tTmFtZX08L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+5pel5LuYOjwvc3Ryb25nPiAke2RhdGV9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPuaZgumWkzo8L3N0cm9uZz4gJHtzdGFydFRpbWV9ICgke2R1cmF0aW9uSG91cnN95pmC6ZaTKTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz7mlpnph5E6PC9zdHJvbmc+IMKlJHt0b3RhbFByaWNlLnRvTG9jYWxlU3RyaW5nKCl9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPHA+44GU5p2l5bqX44KS44GK5b6F44Gh44GX44Gm44GK44KK44G+44GZ44CCPC9wPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFtOb3RpZmljYXRpb25dIPCfk6cgRW1haWwgc2VudCB0byAke3VzZXJFbWFpbH0gdmlhIFJlc2VuZC5gKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tOb3RpZmljYXRpb25dIOKdjCBGYWlsZWQgdG8gc2VuZCBlbWFpbCB2aWEgUmVzZW5kOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiQm9va2luZyBzdWNjZXNzZnVsISBDb25maXJtYXRpb24gc2VudCB0byBlbWFpbC9TTVMuXCIsXG4gICAgICAgIHByaWNlOiB0b3RhbFByaWNlLFxuICAgICAgICBib29raW5nSWQ6IG5ld0Jvb2tpbmcuaWRcbiAgICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2FuY2VsQm9va2luZ0FjdGlvbihib29raW5nSWQ6IHN0cmluZyk6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyBtZXNzYWdlOiBzdHJpbmcgfT4ge1xuICAgIGNvbnN0IHsgdXBkYXRlQm9va2luZywgZ2V0Qm9va2luZ0J5SWQgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLWxvY2FsXCIpO1xuICAgIGNvbnN0IGJvb2tpbmcgPSBnZXRCb29raW5nQnlJZChib29raW5nSWQpO1xuICAgIGlmICghYm9va2luZykgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiQm9va2luZyBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHVwZGF0ZUJvb2tpbmcoYm9va2luZ0lkLCB7IHN0YXR1czogJ2NhbmNlbGxlZCcgfSk7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFtOb3RpZmljYXRpb25dIPCfj6ogU3R1ZGlvICR7Ym9va2luZy5zdHVkaW9JZH06IEJvb2tpbmcgJHtib29raW5nSWR9IGhhcyBiZWVuIENBTkNFTExFRCBieSB1c2VyLmApO1xuICAgICAgICAvLyBIZXJlIHlvdSB3b3VsZCBhbHNvIHVwZGF0ZSBwYXltZW50IHN0YXR1cyB0byAnZmFpbGVkJyBvciAncmVmdW5kZWQnIGlmIG5lZWRlZFxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiBcIkJvb2tpbmcgY2FuY2VsbGVkIHN1Y2Nlc3NmdWxseVwiIH07XG4gICAgfVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIkZhaWxlZCB0byBjYW5jZWwgYm9va2luZ1wiIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVCb29raW5nQWN0aW9uKGJvb2tpbmdJZDogc3RyaW5nLCBkYXRhOiBQYXJ0aWFsPEJvb2tpbmdSZXF1ZXN0Pik6IFByb21pc2U8Qm9va2luZ1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgeyB1cGRhdGVCb29raW5nLCBnZXRCb29raW5nQnlJZCwgY2hlY2tBdmFpbGFiaWxpdHkgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLWxvY2FsXCIpO1xuICAgIGNvbnN0IG9sZEJvb2tpbmcgPSBnZXRCb29raW5nQnlJZChib29raW5nSWQpO1xuICAgIGlmICghb2xkQm9va2luZykgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiQm9va2luZyBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3Qgc3R1ZGlvSWQgPSBkYXRhLnN0dWRpb0lkIHx8IG9sZEJvb2tpbmcuc3R1ZGlvSWQ7XG4gICAgY29uc3Qgcm9vbU5hbWUgPSBkYXRhLnJvb21OYW1lIHx8IG9sZEJvb2tpbmcucm9vbU5hbWU7XG4gICAgY29uc3QgZGF0ZSA9IGRhdGEuZGF0ZSB8fCBvbGRCb29raW5nLmRhdGU7XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gZGF0YS5zdGFydFRpbWUgfHwgb2xkQm9va2luZy5zdGFydFRpbWU7XG4gICAgY29uc3QgZHVyYXRpb25Ib3VycyA9IGRhdGEuZHVyYXRpb25Ib3VycyB8fCBvbGRCb29raW5nLmR1cmF0aW9uSG91cnM7XG5cbiAgICAvLyBDaGVjayBhdmFpbGFiaWxpdHkgKGV4Y2x1ZGluZyB0aGlzIHNwZWNpZmljIGJvb2tpbmcpXG4gICAgY29uc3QgaXNBdmFpbGFibGUgPSBjaGVja0F2YWlsYWJpbGl0eShzdHVkaW9JZCwgcm9vbU5hbWUsIGRhdGUsIHN0YXJ0VGltZSwgZHVyYXRpb25Ib3VycywgYm9va2luZ0lkKTtcbiAgICBpZiAoIWlzQXZhaWxhYmxlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIvCfmqsgVGhpcyB0aW1lIHNsb3QgaXMgYWxyZWFkeSBib29rZWQhXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBzdWNjZXNzID0gdXBkYXRlQm9va2luZyhib29raW5nSWQsIHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgc3RhdHVzOiAnbW9kaWZpZWQnXG4gICAgfSk7XG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICBjb25zb2xlLmxvZyhgW05vdGlmaWNhdGlvbl0g8J+PqiBTdHVkaW8gJHtzdHVkaW9JZH06IEJvb2tpbmcgJHtib29raW5nSWR9IGhhcyBiZWVuIE1PRElGSUVEIGJ5IHVzZXIuYCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiQm9va2luZyB1cGRhdGVkIHN1Y2Nlc3NmdWxseVwiIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBib29raW5nXCIgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoTXlCb29raW5ncygpOiBQcm9taXNlPGFueVtdPiB7XG4gICAgY29uc3QgeyBnZXRDdXJyZW50VXNlciB9ID0gYXdhaXQgaW1wb3J0KFwiLi9sb2dpblwiKTtcbiAgICBjb25zdCB7IGdldEJvb2tpbmdzIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9kYi1sb2NhbFwiKTtcbiAgICBjb25zdCB7IGdldEFsbFN0dWRpb3MgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2RiLXN0dWRpb1wiKTtcbiAgICBjb25zdCBmcyA9IGF3YWl0IGltcG9ydChcImZzXCIpO1xuICAgIGNvbnN0IHBhdGggPSBhd2FpdCBpbXBvcnQoXCJwYXRoXCIpO1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKCk7XG4gICAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgICBjb25zdCBzdHVkaW9zID0gZ2V0QWxsU3R1ZGlvcygpO1xuICAgIGNvbnN0IHN0dWRpb01hcCA9IG5ldyBNYXAoc3R1ZGlvcy5tYXAocyA9PiBbcy5pZCwgeyBuYW1lOiBzLnN0b3JlTmFtZSwgaW52b2ljZTogcy5pbnZvaWNlTnVtYmVyIH1dKSk7XG5cbiAgICBsZXQgcGF5bWVudHM6IGFueVtdID0gW107XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJkYXRhXCIsIFwicGF5bWVudHMuanNvblwiKTtcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocFBhdGgpKSB7XG4gICAgICAgICAgICBwYXltZW50cyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBQYXRoLCBcInV0Zi04XCIpKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIHBheW1lbnRzIGZvciBzdGF0dXMgY2hlY2tcIiwgZSk7XG4gICAgfVxuICAgIGNvbnN0IHBheW1lbnRTdGF0dXNNYXAgPSBuZXcgTWFwKHBheW1lbnRzLm1hcChwID0+IFtwLmJvb2tpbmdJZCwgcC5zdGF0dXNdKSk7XG5cbiAgICByZXR1cm4gZ2V0Qm9va2luZ3MoKVxuICAgICAgICAuZmlsdGVyKGIgPT4gYi51c2VySWQgPT09IHVzZXIuaWQpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShiLmRhdGUpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGEuZGF0ZSkuZ2V0VGltZSgpKVxuICAgICAgICAubWFwKGIgPT4ge1xuICAgICAgICAgICAgY29uc3QgcyA9IHN0dWRpb01hcC5nZXQoYi5zdHVkaW9JZCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmIsXG4gICAgICAgICAgICAgICAgc3R1ZGlvTmFtZTogcz8ubmFtZSB8fCBcIlVua25vd24gU3R1ZGlvXCIsXG4gICAgICAgICAgICAgICAgaW52b2ljZU51bWJlcjogcz8uaW52b2ljZSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgIHBheW1lbnRTdGF0dXM6IHBheW1lbnRTdGF0dXNNYXAuZ2V0KGIuaWQpIHx8IFwicGVuZGluZ1wiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiK1NBNEtzQixnTUFBQSJ9
}),
"[project]/music-studio-app/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/music-studio-app/src/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/music-studio-app/src/components/UserBookings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserBookings",
    ()=>UserBookings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/receipt.js [app-client] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$data$3a$03c0a8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/data:03c0a8 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$data$3a$c4ebf1__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/data:c4ebf1 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$data$3a$4e825b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/music-studio-app/src/actions/data:4e825b [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/date-fns/parseISO.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$isFuture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/date-fns/isFuture.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/src/components/ui/dialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
;
;
function UserBookings() {
    _s();
    const [bookings, setBookings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [actionId, setActionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedReceipt, setSelectedReceipt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Modification States
    const [isModifyOpen, setIsModifyOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modifyingBooking, setModifyingBooking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mDate, setMDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [mTime, setMTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [mDuration, setMDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const load = async ()=>{
        setIsLoading(true);
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$data$3a$03c0a8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["fetchMyBookings"])();
        setBookings(data);
        setIsLoading(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserBookings.useEffect": ()=>{
            load();
        }
    }["UserBookings.useEffect"], []);
    const handleCancel = async (id)=>{
        if (!confirm("本当にこの予約をキャンセルしますか？")) return;
        setActionId(id);
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$data$3a$c4ebf1__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["cancelBookingAction"])(id);
        if (res.success) {
            alert("予約をキャンセルしました。");
            await load();
        } else {
            alert(res.message);
        }
        setActionId(null);
    };
    const openModifyDialog = (booking)=>{
        setModifyingBooking(booking);
        setMDate(booking.date);
        setMTime(booking.startTime);
        setMDuration(booking.durationHours.toString());
        setIsModifyOpen(true);
    };
    const handleUpdate = async ()=>{
        if (!modifyingBooking) return;
        setActionId(modifyingBooking.id);
        setIsModifyOpen(false);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$actions$2f$data$3a$4e825b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateBookingAction"])(modifyingBooking.id, {
                date: mDate,
                startTime: mTime,
                durationHours: parseInt(mDuration)
            });
            if (res.success) {
                alert("予約内容を変更しました。");
                await load();
            } else {
                alert(res.message);
            }
        } catch (e) {
            alert("通信エラーが発生しました。");
        } finally{
            setActionId(null);
            setModifyingBooking(null);
        }
    };
    const handlePrint = ()=>{
        window.print();
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center py-20 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "animate-spin h-8 w-8 text-cyan-400"
                }, void 0, false, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 99,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 font-mono tracking-widest animate-pulse",
                    children: "AUTHORIZING ACCESS..."
                }, void 0, false, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 100,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
            lineNumber: 98,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-start mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    onClick: ()=>router.back(),
                    className: "text-gray-500 hover:text-white group flex items-center gap-2 px-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "h-4 w-4 transition-transform group-hover:-translate-x-1"
                        }, void 0, false, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 114,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-mono tracking-tighter",
                            children: "BACK() // RETURN TO PREVIOUS"
                        }, void 0, false, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 115,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 109,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 108,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "space-y-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-12 w-1.5 bg-cyan-500 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 121,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-6xl font-black italic tracking-tighter text-white uppercase leading-none",
                                    children: "My Bookings"
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 123,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 font-mono text-sm mt-2 uppercase tracking-[0.3em]",
                                    children: "RESERVATION_HISTORY_v.4.1"
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 126,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 122,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 120,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 119,
                columnNumber: 13
            }, this),
            bookings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-slate-900/50 border-white/5 border-dashed py-20 flex flex-col items-center gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-white/5 rounded-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                            className: "h-10 w-10 text-gray-700"
                        }, void 0, false, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 134,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                        lineNumber: 133,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-gray-400",
                                children: "予約履歴がありません"
                            }, void 0, false, {
                                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                lineNumber: 137,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 text-sm",
                                children: "次回のセッションを予約しましょう"
                            }, void 0, false, {
                                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                lineNumber: 138,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                        lineNumber: 136,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>router.push('/studios'),
                        className: "bg-cyan-500 hover:bg-cyan-400 text-black font-bold",
                        children: "スタジオを探す"
                    }, void 0, false, {
                        fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                        lineNumber: 140,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 132,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6",
                children: bookings.map((booking)=>{
                    const canModify = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$isFuture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFuture"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseISO"])(booking.date)) && booking.status !== 'cancelled';
                    const isActioned = actionId === booking.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: `bg-slate-900 border-white/10 overflow-hidden group transition-all hover:border-cyan-500/30 ${booking.status === 'cancelled' ? 'opacity-50 grayscale' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-8 flex-1 space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-1",
                                                            children: [
                                                                "ID: ",
                                                                booking.id
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 156,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-3xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase italic",
                                                            children: booking.studioName
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    className: `px-4 py-1 rounded-full border-none font-bold text-[10px] ${booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' : booking.status === 'modified' ? 'bg-orange-500/10 text-orange-400' : 'bg-green-500/10 text-green-400'}`,
                                                    children: booking.status?.toUpperCase() || 'FULLY_RESERVED'
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 154,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/5 pt-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-gray-600 uppercase flex items-center gap-1 font-bold tracking-widest",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 168,
                                                                    columnNumber: 152
                                                                }, this),
                                                                " Date"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 168,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-black text-white",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseISO"])(booking.date), "yyyy.MM.dd")
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 169,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-gray-600 uppercase flex items-center gap-1 font-bold tracking-widest",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 172,
                                                                    columnNumber: 152
                                                                }, this),
                                                                " Time / Slot"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 172,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-black text-white",
                                                            children: [
                                                                booking.startTime,
                                                                " (",
                                                                booking.durationHours,
                                                                "h)"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 173,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-gray-600 uppercase flex items-center gap-1 font-bold tracking-widest",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 176,
                                                                    columnNumber: 152
                                                                }, this),
                                                                " Zone / Studio"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-black text-white",
                                                            children: booking.roomName || "Main Hall"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-gray-600 uppercase flex items-center gap-1 font-bold tracking-widest",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 152
                                                                }, this),
                                                                " Ledger Value"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-black text-cyan-400",
                                                            children: [
                                                                "¥",
                                                                booking.totalPrice.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 181,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 166,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 153,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/5 md:w-56 p-6 flex md:flex-col gap-3 justify-center items-center border-t md:border-t-0 md:border-l border-white/5",
                                    children: [
                                        canModify ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    className: "w-full text-xs font-bold text-gray-400 hover:text-white border border-white/5 hover:border-white/20",
                                                    disabled: isActioned,
                                                    onClick: ()=>openModifyDialog(booking),
                                                    children: [
                                                        isActioned && modifyingBooking?.id === booking.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            className: "h-3 w-3 animate-spin mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 195,
                                                            columnNumber: 106
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                            className: "h-3 w-3 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 195,
                                                            columnNumber: 158
                                                        }, this),
                                                        "MODIFY"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    className: "w-full text-xs font-bold text-red-500 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30",
                                                    disabled: isActioned,
                                                    onClick: ()=>handleCancel(booking.id),
                                                    children: [
                                                        isActioned && modifyingBooking === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            className: "h-3 w-3 animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 204,
                                                            columnNumber: 96
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                            className: "h-3 w-3 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 204,
                                                            columnNumber: 143
                                                        }, this),
                                                        "CANCEL"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[9px] text-gray-600 italic font-mono mb-2 uppercase",
                                            children: "LOCKED // RECORD_ONLY"
                                        }, void 0, false, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 209,
                                            columnNumber: 45
                                        }, this),
                                        booking.paymentStatus === 'paid' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            className: "w-full text-xs font-bold text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/10 hover:border-cyan-500/30",
                                            onClick: ()=>setSelectedReceipt(booking),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"], {
                                                    className: "h-3 w-3 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 49
                                                }, this),
                                                " RECEIPT"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 212,
                                            columnNumber: 45
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[10px] text-orange-500 font-mono font-bold uppercase py-2 px-4 border border-orange-500/20 bg-orange-500/5 rounded text-center w-full",
                                            children: "UNPAID // 支払い待ち"
                                        }, void 0, false, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 220,
                                            columnNumber: 45
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 186,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 152,
                            columnNumber: 33
                        }, this)
                    }, booking.id, false, {
                        fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                        lineNumber: 151,
                        columnNumber: 29
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 145,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-3xl shadow-2xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/30",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                className: "h-6 w-6 text-cyan-400"
                            }, void 0, false, {
                                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                lineNumber: 235,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 234,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-lg font-black text-white uppercase italic",
                                    children: "Security & Policy Log"
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 238,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 text-xs leading-relaxed font-mono uppercase tracking-tighter",
                                    children: "SYS_POLICY: Cancellation window is 24 hours prior to initiation. Unauthorized absences may result in restricted access or financial penalties. Ledger records are permanently archived."
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 239,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 237,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 233,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 232,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isModifyOpen,
                onOpenChange: setIsModifyOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "bg-slate-950 border border-white/10 text-white shadow-[0_0_50px_rgba(6,182,212,0.1)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "text-2xl font-black italic uppercase tracking-tighter",
                                    children: "Modify Session Details"
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 252,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    className: "text-gray-500 uppercase text-[10px] font-mono",
                                    children: [
                                        "Update your reservation for ",
                                        modifyingBooking?.studioName
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 253,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 251,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-6 py-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                            children: "New Date"
                                        }, void 0, false, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 260,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "date",
                                            className: "bg-white/5 border-white/10 text-white focus:border-cyan-500 transition-colors",
                                            value: mDate,
                                            onChange: (e)=>setMDate(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 261,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 259,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                                    children: "Start Time"
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "time",
                                                    className: "bg-white/5 border-white/10 text-white focus:border-cyan-500 transition-colors",
                                                    value: mTime,
                                                    onChange: (e)=>setMTime(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 269,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                                    children: "Duration (h)"
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: mDuration,
                                                    onValueChange: setMDuration,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            className: "bg-white/5 border-white/10 text-white focus:border-cyan-500",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                lineNumber: 282,
                                                                columnNumber: 41
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 281,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            className: "bg-slate-900 border-white/10 text-white",
                                                            children: [
                                                                1,
                                                                2,
                                                                3,
                                                                4,
                                                                5,
                                                                6,
                                                                8,
                                                                10,
                                                                12
                                                            ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: h.toString(),
                                                                    children: [
                                                                        h,
                                                                        "時間"
                                                                    ]
                                                                }, h, true, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 45
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 278,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 268,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-cyan-400 font-bold uppercase tracking-widest leading-relaxed",
                                        children: "※ 変更により料金が変動する場合があります。また、空き状況によっては変更できないことがございます。"
                                    }, void 0, false, {
                                        fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                        lineNumber: 293,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 292,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 258,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            className: "gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    className: "text-xs text-gray-500 hover:text-white",
                                    onClick: ()=>setIsModifyOpen(false),
                                    children: "CANCEL Changes"
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 300,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase italic",
                                    onClick: handleUpdate,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                            className: "h-4 w-4 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 304,
                                            columnNumber: 29
                                        }, this),
                                        " Commit modification"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 303,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 299,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 250,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 249,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: !!selectedReceipt,
                onOpenChange: (open)=>!open && setSelectedReceipt(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "bg-white text-black p-0 overflow-hidden max-w-lg border-none shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-10 space-y-8 print:p-0",
                            id: "receipt-content",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                                    className: "flex flex-row justify-between items-start border-b-4 border-black pb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-4xl font-black italic uppercase tracking-tighter",
                                                    children: "領収書"
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] font-mono uppercase text-gray-500",
                                                    children: "決済記録 // Studi-Go"
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 315,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[10px] font-mono font-bold uppercase text-gray-400",
                                                    children: "発行日"
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-black",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), "yyyy年MM月dd日")
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 319,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 314,
                                    columnNumber: 25
                                }, this),
                                selectedReceipt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-mono uppercase text-gray-500",
                                                            children: "サービス提供者"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xl font-bold uppercase",
                                                            children: selectedReceipt.studioName
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 330,
                                                            columnNumber: 41
                                                        }, this),
                                                        selectedReceipt.invoiceNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-gray-100 px-2 py-1 rounded inline-block",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[9px] font-bold text-gray-600",
                                                                children: [
                                                                    "適格事業者番号: ",
                                                                    selectedReceipt.invoiceNumber
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                lineNumber: 333,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 332,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-mono uppercase text-gray-500",
                                                            children: "取引ID"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 338,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-mono font-bold",
                                                            children: [
                                                                "#",
                                                                selectedReceipt.id.toUpperCase()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 339,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 327,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 p-6 rounded-lg border border-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-[10px] font-mono uppercase text-gray-500 mb-4 border-b pb-2",
                                                    children: "ご利用明細"
                                                }, void 0, false, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-center text-sm font-bold",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "スタジオ利用料 (",
                                                                        selectedReceipt.durationHours,
                                                                        "時間)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 347,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "¥",
                                                                        selectedReceipt.totalPrice.toLocaleString()
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                                    lineNumber: 348,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[11px] text-gray-500 font-mono",
                                                            children: [
                                                                "部屋: ",
                                                                selectedReceipt.roomName,
                                                                " / 日時: ",
                                                                selectedReceipt.date,
                                                                " ",
                                                                selectedReceipt.startTime,
                                                                "~"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 350,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 343,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-end border-t border-black pt-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-mono uppercase text-gray-500 text-left",
                                                            children: "ステータス"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 358,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "outline",
                                                            className: "bg-black text-white border-none font-black text-[10px] px-3",
                                                            children: selectedReceipt.paymentStatus === 'paid' ? '入金済み' : '確定済み'
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-mono uppercase text-gray-500",
                                                            children: "合計金額 (税込)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 364,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-5xl font-black italic tracking-tighter leading-none",
                                                            children: [
                                                                "¥",
                                                                selectedReceipt.totalPrice.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                            lineNumber: 365,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                                    lineNumber: 363,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 356,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 326,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                    className: "text-[8px] font-mono uppercase text-gray-400 text-center leading-normal pt-10 border-t border-gray-100 mt-10",
                                    children: [
                                        "本領収書はStudi-Goのデータベースに記録された決済情報を元に作成されています。",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 372,
                                            columnNumber: 71
                                        }, this),
                                        "税務上の詳細については、各スタジオまたは運営者までお問い合わせください。"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 371,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 313,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-100 p-4 flex gap-3 justify-end print:hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "border-gray-300 text-gray-600 hover:text-black font-bold h-10",
                                    onClick: ()=>setSelectedReceipt(null),
                                    children: "閉じる"
                                }, void 0, false, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 378,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "bg-black text-white hover:bg-gray-800 font-black h-10 px-6 group",
                                    onClick: handlePrint,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                            className: "h-4 w-4 mr-2 group-hover:scale-110 transition-transform"
                                        }, void 0, false, {
                                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                            lineNumber: 382,
                                            columnNumber: 29
                                        }, this),
                                        " 印刷 / PDF保存"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                                    lineNumber: 381,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                            lineNumber: 377,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                    lineNumber: 312,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
                lineNumber: 311,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/music-studio-app/src/components/UserBookings.tsx",
        lineNumber: 106,
        columnNumber: 9
    }, this);
}
_s(UserBookings, "GRMC3YvrHhNN/X8+cxHgqRYQgEk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = UserBookings;
var _c;
__turbopack_context__.k.register(_c, "UserBookings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=music-studio-app_src_dbca2696._.js.map