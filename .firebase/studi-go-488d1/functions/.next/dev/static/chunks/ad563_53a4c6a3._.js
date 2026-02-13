(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/music-studio-app/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/music-studio-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/music-studio-app/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/music-studio-app/node_modules/next/dist/build/polyfills/fetch/whatwg-fetch.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* globals self */ exports.Headers = self.Headers;
exports.Request = self.Request;
exports.Response = self.Response;
exports.fetch = self.fetch; //# sourceMappingURL=whatwg-fetch.js.map
}),
"[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__addDisposableResource",
    ()=>__addDisposableResource,
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldIn",
    ()=>__classPrivateFieldIn,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__disposeResources",
    ()=>__disposeResources,
    "__esDecorate",
    ()=>__esDecorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__propKey",
    ()=>__propKey,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__rewriteRelativeImportExtension",
    ()=>__rewriteRelativeImportExtension,
    "__runInitializers",
    ()=>__runInitializers,
    "__setFunctionName",
    ()=>__setFunctionName,
    "__spread",
    ()=>__spread,
    "__spreadArray",
    ()=>__spreadArray,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function(o) {
        var ar = [];
        for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return ownKeys(o);
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop()){
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                        fail(e);
                        return next();
                    });
                } else s |= 1;
            } catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
    }
    return path;
}
const __TURBOPACK__default__export__ = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
};
}),
"[project]/music-studio-app/node_modules/@liff/logger/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LogLevel",
    ()=>n,
    "Logger",
    ()=>r,
    "logger",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
;
var n;
!function(o) {
    o[o.DEBUG = 1] = "DEBUG", o[o.INFO = 2] = "INFO", o[o.WARN = 3] = "WARN", o[o.ERROR = 4] = "ERROR";
}(n || (n = {}));
var r = function() {
    function r(o) {
        void 0 === o && (o = n.INFO), this.logLevel = o, this._debug = console.debug, this._info = console.info, this._warn = console.warn, this._error = console.error;
    }
    return r.prototype.debug = function() {
        for(var r = [], i = 0; i < arguments.length; i++)r[i] = arguments[i];
        this.logLevel <= n.DEBUG && (r.unshift("[DEBUG]"), this._debug.apply(this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(r), !1)));
    }, r.prototype.info = function() {
        for(var r = [], i = 0; i < arguments.length; i++)r[i] = arguments[i];
        this.logLevel <= n.INFO && (r.unshift("[INFO]"), this._info.apply(this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(r), !1)));
    }, r.prototype.warn = function() {
        for(var r = [], i = 0; i < arguments.length; i++)r[i] = arguments[i];
        this.logLevel <= n.WARN && (r.unshift("[WARN]"), this._warn.apply(this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(r), !1)));
    }, r.prototype.error = function() {
        for(var r = [], i = 0; i < arguments.length; i++)r[i] = arguments[i];
        this.logLevel <= n.ERROR && (r.unshift("[ERROR]"), this._error.apply(this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(r), !1)));
    }, r;
}(), i = new r(Number("3"));
;
}),
"[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContextHolder",
    ()=>s,
    "LiffModule",
    ()=>a,
    "ModuleDriverImpl",
    ()=>u,
    "UseModule",
    ()=>c,
    "isLiffModule",
    ()=>l
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/logger/lib/index.es.js [app-client] (ecmascript)");
;
;
var i = function(t, e) {
    this._driver = t, this.liff = e, this.hooks = this._driver.hooks, this.internalHooks = this._driver.internalHooks;
}, r = function(t, e) {
    this._driver = t, this.liff = e, this.hooks = this._driver.hooks;
}, s = function() {
    function t(t, e) {
        this.pluginCtx = new r(t, e), this.moduleCtx = new i(t, e);
    }
    return Object.defineProperty(t.prototype, "pluginContext", {
        get: function() {
            return this.pluginCtx;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "moduleContext", {
        get: function() {
            return this.moduleCtx;
        },
        enumerable: !1,
        configurable: !0
    }), t;
}(), u = function() {
    function n() {
        this.modules = new Map, this.hooks = {}, this.internalHooks = {};
    }
    return n.prototype.addModule = function(n, o) {
        this.modules.set(n, o), o.hooks && (this.hooks[n] = Object.entries(o.hooks).reduce(function(n, o) {
            var i, r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(o, 2), s = r[0], u = r[1];
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])({}, n), ((i = {})[s] = u.on.bind(u), i));
        }, {})), "internalHooks" in o && o.internalHooks && (this.internalHooks[n] = Object.entries(o.internalHooks).reduce(function(n, o) {
            var i, r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(o, 2), s = r[0], u = r[1];
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])({}, n), ((i = {})[s] = u.on.bind(u), i));
        }, {}));
    }, n.prototype.hasModule = function(t) {
        return this.modules.has(t);
    }, n;
}(), a = function() {}, l = function(t) {
    return t instanceof a;
}, c = function(t) {
    function e(e, n, o) {
        var i = t.call(this) || this;
        return i.driver = e, i.contextHolder = n, i.option = o, i;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(e, t), e.prototype.install = function() {
        return this.factory(this.driver, this.contextHolder);
    }, Object.defineProperty(e.prototype, "name", {
        get: function() {
            return "use";
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "defaultOption", {
        get: function() {
            return {
                namespacePrefix: "$"
            };
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.factory = function(t, e) {
        var n = Object.assign({}, this.defaultOption, this.option).namespacePrefix;
        return function(i, r) {
            if (!i || "function" != typeof i.install || "string" != typeof i.name) return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warn("To install the plugin, you need to define the `name` property and the `install` method."), this;
            var s = l(i) ? i.name : "".concat(n).concat(i.name);
            if (t.hasModule(s)) return this;
            var u = l(i) ? i.install.call(i, e.moduleContext, r) : i.install.call(i, e.pluginContext, r);
            return this["".concat(s)] ? (__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warn("There is a duplicate plugin name. `".concat(s, "` plugin namespace will be override.")), this["".concat(s)] = u) : void 0 !== u && (this["".concat(s)] = u), t.addModule(s, i), this;
        };
    }, e;
}(a);
;
}),
"[project]/music-studio-app/node_modules/@liff/ready/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "done",
    ()=>e,
    "ready",
    ()=>n
]);
var e, n = new Promise(function(n) {
    e = n;
});
;
}),
"[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CREATE_SUBWINDOW_FAILED",
    ()=>f,
    "CREDENTIAL_KEYS",
    ()=>D,
    "EXCEPTION_IN_SUBWINDOW",
    ()=>N,
    "FORBIDDEN",
    ()=>E,
    "INIT_FAILED",
    ()=>I,
    "INVALID_ARGUMENT",
    ()=>i,
    "INVALID_CONFIG",
    ()=>n,
    "INVALID_ID_TOKEN",
    ()=>T,
    "LIFF_EVENT",
    ()=>o,
    "MAX_NUM_OF_SEND_MESSAGES",
    ()=>O,
    "PERMANENT_LINK_ORIGIN",
    ()=>s,
    "PERMANENT_LINK_ORIGIN_MINI",
    ()=>a,
    "PERMISSION_NAMES",
    ()=>U,
    "STORE_KEY",
    ()=>l,
    "STORE_OBJECT",
    ()=>c,
    "STORE_SUBKEY_IS_IN_CLIENT",
    ()=>r,
    "SUB_WINDOW_GET_APP_DATA_MESSAGE",
    ()=>F,
    "SUB_WINDOW_HEALTH_CHECK_INTERVAL",
    ()=>S,
    "SUB_WINDOW_HEALTH_CHECK_MESSAGE",
    ()=>R,
    "SUB_WINDOW_IDNTIFICATION_KEY",
    ()=>L,
    "SUB_WINDOW_MODAL_SCHEME_URL",
    ()=>m,
    "SUB_WINDOW_MONITOR_CLOSE_INTERVAL",
    ()=>p,
    "SUB_WINDOW_STATUS",
    ()=>C,
    "TIMEOUT",
    ()=>_,
    "UNAUTHORIZED",
    ()=>t,
    "UNKNOWN",
    ()=>e,
    "UTS_REFERRER_QUERY",
    ()=>A
]);
var e = "UNKNOWN", t = "UNAUTHORIZED", i = "INVALID_ARGUMENT", I = "INIT_FAILED", E = "FORBIDDEN", n = "INVALID_CONFIG", T = "INVALID_ID_TOKEN", _ = "TIMEOUT", f = "CREATE_SUBWINDOW_FAILED", N = "EXCEPTION_IN_SUBWINDOW", o = "liffEvent", l = "LIFF_STORE", s = "https://liff.".concat("line.me", "/"), a = "https://miniapp.".concat("line.me", "/"), c = {
    ACCESS_TOKEN: "accessToken",
    ID_TOKEN: "IDToken",
    DECODED_ID_TOKEN: "decodedIDToken",
    FEATURE_TOKEN: "featureToken",
    LOGIN_TMP: "loginTmp",
    CONFIG: "config",
    CONTEXT: "context",
    EXPIRES: "expires",
    RAW_CONTEXT: "rawContext",
    CLIENT_ID: "clientId",
    IS_SUBSEQUENT_LIFF_APP: "isSubsequentLiffApp",
    MST_CHALLENGE: "mstChallenge",
    MSIT: "msit",
    MST: "mst",
    MST_VERIFIER: "mstVerifier",
    APP_DATA: "appData"
}, r = "isInClient", D = [
    "context_token",
    "feature_token",
    "access_token",
    "id_token",
    "client_id",
    "mst_verifier",
    "mst_challenge",
    "msit"
], O = 5, A = [
    "liff.ref.source",
    "liff.ref.medium",
    "liff.ref.campaign",
    "liff.ref.term",
    "liff.ref.content"
], m = "liff://subwindow", C = {
    INIT: "init",
    SUBMIT: "submit",
    CANCEL: "cancel",
    CLOSE: "close",
    ERROR: "error"
}, p = 100, S = 100, L = "liff.subwindow", R = "healthCheck", F = "getAppData", U = [
    "profile",
    "chat_message.write",
    "openid",
    "email"
];
;
}),
"[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HTTPStatusCodes",
    ()=>g,
    "InMemoryStorage",
    ()=>b,
    "LiffError",
    ()=>h,
    "addParamsToUrl",
    ()=>E,
    "base64Url",
    ()=>u,
    "compareVersion",
    ()=>f,
    "convertArgbToRgba",
    ()=>s,
    "convertArrayBuffer",
    ()=>l,
    "convertHexToRgb",
    ()=>d,
    "cookie",
    ()=>v,
    "createLiffError",
    ()=>w,
    "extractChannelIdFromLiffId",
    ()=>m,
    "extractLiffId",
    ()=>k,
    "getOriginOfUrl",
    ()=>T,
    "getRandomValue",
    ()=>U,
    "hexToBase64",
    ()=>y,
    "isIE",
    ()=>M,
    "isIpad",
    ()=>P,
    "isLIFFBrowser",
    ()=>B,
    "isLINEBrowser",
    ()=>W,
    "isLineCustomUrlScheme",
    ()=>F,
    "isNonBrowserEnvironment",
    ()=>J,
    "isSubWindow",
    ()=>G,
    "qs",
    ()=>A,
    "randomAlphaNumericString",
    ()=>x,
    "removeCredential",
    ()=>C,
    "removeOrigin",
    ()=>L,
    "replaceUrlCredentialRemoved",
    ()=>j
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/logger/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
;
;
;
function c(n) {
    return window.atob(n.replace(/-/g, "+").replace(/_/g, "/"));
}
var u = {
    decode: c,
    encode: function(n) {
        return window.btoa(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    },
    decodeUnicode: function(n) {
        var r = c(n).split("").map(function(n) {
            return "%" + ("00" + n.charCodeAt(0).toString(16)).slice(-2);
        }).join("");
        return decodeURIComponent(r);
    }
};
function f(n, r) {
    if (n === r) return 0;
    for(var t = n.split("."), e = r.split("."), o = Math.max(t.length, e.length), i = 0; i < o; i++){
        t[i] || (t[i] = "0"), e[i] || (e[i] = "0");
        var a = parseInt(t[i]) - parseInt(e[i]);
        if (0 !== a) return a > 0 ? 1 : -1;
    }
    return 0;
}
function s(r) {
    var t = r.replace("#", "").match(/.{2}/g) || [];
    if (4 !== t.length) return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warn("convertArgbToRgba: Received invalid ARGB color"), "";
    var e = function(n) {
        var r = p(n);
        return Math.round(r / 255 * 100) / 100;
    }(t[0]), o = p(t[1]), i = p(t[2]), a = p(t[3]);
    return "rgba(".concat(o, ", ").concat(i, ", ").concat(a, ", ").concat(e, ")");
}
function p(n) {
    return parseInt(n, 16);
}
function d(r) {
    var t = r.replace("#", "").match(/.{2}/g) || [];
    if (3 !== t.length) return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warn("convertArgbToRgba: Received invalid hex color"), "";
    var e = p(t[0]), o = p(t[1]), i = p(t[2]);
    return "".concat(e, ", ").concat(o, ", ").concat(i);
}
function l(n) {
    for(var r = n.length, t = new ArrayBuffer(r), e = new Uint8Array(t), o = 0; o < r; o++)e[o] = n.charCodeAt(o);
    return t;
}
var v = {
    get: function(n) {
        var r = new RegExp("(?:(?:^|.*;\\s*)".concat(n, "\\s*\\=\\s*([^;]*).*$)|^.*$"));
        return document.cookie.replace(r, "$1");
    },
    set: function(r, t, e) {
        var o = r + "=" + t;
        if (e) for(var i in e){
            var a = e[i] ? "=".concat(e[i]) : "";
            o += "; ".concat(i).concat(a);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("set cookie", o), document.cookie = o;
    },
    remove: function(n, r) {
        var t = "".concat(n, "=; expires=Thu, 01 Jan 1970 00:00:00 GMT");
        if (r) for(var e in r)t += "; ".concat(e, "=").concat(r[e]);
        document.cookie = t;
    }
}, g = new Set([
    "400",
    "401",
    "403",
    "404",
    "429",
    "500"
]), h = function(n) {
    function t(r, t, e) {
        var o = n.call(this, t, e) || this;
        return o.code = r, o;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(t, n), t;
}(Error);
function w(n, r, t) {
    return (null == t ? void 0 : t.cause) && console.error("This is the cause of LiffError described below.", t.cause), new h(n, r || "", t || {});
}
function m(n) {
    var r = n.match(/([^-]+)-[^-]+/);
    return r && r[1];
}
function y(n) {
    var r = "";
    return n.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ").forEach(function(n) {
        r += String.fromCharCode(parseInt(n));
    }), window.btoa(r);
}
var b = function() {
    function n() {
        this.map = {};
    }
    return n.prototype.clear = function() {
        this.map = {};
    }, n.prototype.getItem = function(n) {
        var r = this.map[n];
        return void 0 === r ? null : r;
    }, n.prototype.setItem = function(n, r) {
        this.map[n] = r;
    }, n.prototype.removeItem = function(n) {
        delete this.map[n];
    }, n.prototype.key = function(n) {
        var r = Object.keys(this.map)[n];
        return void 0 === r ? null : r;
    }, Object.defineProperty(n.prototype, "length", {
        get: function() {
            return Object.keys(this.map).length;
        },
        enumerable: !1,
        configurable: !0
    }), n;
}();
var R, A = {
    parse: function(n) {
        return n.replace(/^\?/, "").replace(/^#\/?/, "").split(/&+/).filter(function(n) {
            return n.length > 0;
        }).reduce(function(n, r) {
            var e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(r.split("=").map(decodeURIComponent), 2), o = e[0], i = e[1], a = n[o];
            return Array.isArray(a) ? a.push(i) : Object.prototype.hasOwnProperty.call(n, o) ? n[o] = [
                a,
                i
            ] : n[o] = i, n;
        }, {});
    },
    stringify: function(n) {
        return Object.keys(n).map(function(r) {
            var t = n[r], e = function(n) {
                return void 0 !== n ? "".concat(encodeURIComponent(r), "=").concat(encodeURIComponent(n)) : encodeURIComponent(r);
            };
            return Array.isArray(t) ? t.map(function(n) {
                return e(n);
            }).join("&") : e(t);
        }).join("&");
    }
}, I = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function U() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
}
function x(n) {
    for(var r = "", t = 0; t < n; t++)r += I[Math.floor(U() * I.length)];
    return r;
}
function C(n) {
    var r = new URL(n), t = r.hash.slice(1).split("&").filter(function(n) {
        return !__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDENTIAL_KEYS"].some(function(r) {
            return n.startsWith("".concat(r, "="));
        });
    }).join("&");
    return r.hash = t, r.toString();
}
function L(n) {
    var r = new URL(n);
    return r.toString().replace(new RegExp(String.raw(O || (O = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__makeTemplateObject"])([
        "^",
        ""
    ], [
        "^",
        ""
    ])), r.origin)), "");
}
var j = function(n) {
    var r = C(n);
    if (r !== n) {
        var t = L(r);
        window.history.replaceState(history.state, "", t);
    }
};
function E(n, r) {
    if (!n) throw new Error("addParamsToUrl: invalid URL");
    var e = new URL(n);
    return Object.entries(r).forEach(function(n) {
        var r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(n, 2), o = r[0], i = r[1];
        e.searchParams.set(o, i);
    }), e.toString();
}
var O, S = ((R = {})[__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMANENT_LINK_ORIGIN"]] = function() {
    var n = $(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMANENT_LINK_ORIGIN"]);
    return new RegExp("^".concat(n, "(\\d+-\\w+)"));
}, R[__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMANENT_LINK_ORIGIN_MINI"]] = function() {
    var n = $(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMANENT_LINK_ORIGIN_MINI"]);
    return new RegExp("^".concat(n, "((\\d+-\\w+)|(\\w+$))"));
}, R);
function k(n) {
    for(var r in S){
        var t = n.match(S[r]());
        if (t) return t[1];
    }
    return null;
}
function $(n) {
    return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function T(n) {
    var r = n.match(/^(https?:\/\/.*?)\//);
    return r && r[1] || "";
}
function F(n) {
    return n.startsWith("line:");
}
function M(n) {
    void 0 === n && (n = window.navigator.userAgent);
    var r = n.toLowerCase();
    return -1 !== r.indexOf("msie") || -1 !== r.indexOf("trident");
}
function P(n) {
    return void 0 === n && (n = window.navigator.userAgent), /ipad/.test(n.toLowerCase());
}
function W(n) {
    return void 0 === n && (n = window.navigator.userAgent), /Line\/\d+\.\d+\.\d+/.test(n);
}
function B(n) {
    return void 0 === n && (n = window.navigator.userAgent), /Line\/\d+\.\d+\.\d+ LIFF/.test(n);
}
function G(n) {
    return void 0 === n && (n = window.navigator.userAgent), /LIFF\/SubWindow/.test(n);
}
var J = function() {
    return "undefined" == typeof window;
};
;
}),
"[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IsInClientModule",
    ()=>f,
    "_cleanupCachedIsInClient",
    ()=>l,
    "isInClient",
    ()=>u
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
var c = null;
function u() {
    return null === c && (c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLIFFBrowser"])() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLINEBrowser"])() && /[#|&]access_token=/.test(location.hash) || "1" === sessionStorage.getItem("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_KEY"], ":").concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_SUBKEY_IS_IN_CLIENT"])), sessionStorage.setItem("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_KEY"], ":").concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_SUBKEY_IS_IN_CLIENT"]), c ? "1" : "0")), !!c;
}
function l() {
    c = null;
}
var f = function(n) {
    function o() {
        return null !== n && n.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(o, n), Object.defineProperty(o.prototype, "name", {
        get: function() {
            return "isInClient";
        },
        enumerable: !1,
        configurable: !0
    }), o.prototype.install = function() {
        return function() {
            return u();
        };
    }, o;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetAIdModule",
    ()=>g,
    "GetAccessTokenModule",
    ()=>V,
    "GetContextModule",
    ()=>T,
    "GetDecodedIDTokenModule",
    ()=>nn,
    "GetIDTokenModule",
    ()=>k,
    "GetIsVideoAutoPlayModule",
    ()=>m,
    "GetProfilePlusModule",
    ()=>d,
    "clean",
    ()=>tn,
    "get",
    ()=>p,
    "getAId",
    ()=>y,
    "getAccessToken",
    ()=>x,
    "getAppData",
    ()=>b,
    "getByLiffId",
    ()=>a,
    "getClientId",
    ()=>j,
    "getConfig",
    ()=>c,
    "getContext",
    ()=>E,
    "getDecodedIDToken",
    ()=>Z,
    "getExpireTime",
    ()=>z,
    "getFeatureToken",
    ()=>w,
    "getIDToken",
    ()=>X,
    "getIsSubsequentLiffApp",
    ()=>O,
    "getIsVideoAutoPlay",
    ()=>_,
    "getLoginTmp",
    ()=>J,
    "getMSIT",
    ()=>v,
    "getMST",
    ()=>D,
    "getMSTChallenge",
    ()=>M,
    "getMSTVerifier",
    ()=>h,
    "getProfilePlus",
    ()=>S,
    "getRawContext",
    ()=>K,
    "remove",
    ()=>H,
    "removeExpireTime",
    ()=>Y,
    "removeLoginTmp",
    ()=>W,
    "set",
    ()=>s,
    "setAccessToken",
    ()=>B,
    "setAppData",
    ()=>N,
    "setClientId",
    ()=>F,
    "setConfig",
    ()=>l,
    "setContext",
    ()=>I,
    "setDecodedIDToken",
    ()=>$,
    "setExpireTime",
    ()=>q,
    "setFeatureToken",
    ()=>U,
    "setIDToken",
    ()=>G,
    "setIsSubsequentLiffApp",
    ()=>P,
    "setLoginTmp",
    ()=>Q,
    "setMSIT",
    ()=>C,
    "setMST",
    ()=>L,
    "setMSTChallenge",
    ()=>R,
    "setMSTVerifier",
    ()=>A
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
;
function c() {
    var n;
    return null !== (n = window.__liffConfig) && void 0 !== n ? n : {};
}
function l(n) {
    window.__liffConfig = n;
}
function a(n, t) {
    if (!t) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_CONFIG"], "liffId is necessary for liff.init()");
    var o = ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? sessionStorage : localStorage).getItem("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_KEY"], ":").concat(t, ":").concat(n));
    try {
        return null === o ? null : JSON.parse(o);
    } catch (f) {
        return null;
    }
}
function p(n) {
    return a(n, c().liffId);
}
function s(n, t) {
    var o = c().liffId;
    if (!o) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_CONFIG"], "liffId is necessary for liff.init()");
    ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? sessionStorage : localStorage).setItem("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_KEY"], ":").concat(o, ":").concat(n), JSON.stringify(t));
}
function E() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].CONTEXT);
}
function I(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].CONTEXT, n);
}
var T = function(t) {
    function r() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(r, t), Object.defineProperty(r.prototype, "name", {
        get: function() {
            return "getContext";
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.install = function() {
        return function() {
            return E();
        };
    }, r;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
function y() {
    return ((E() || {}).d || {}).aId;
}
var g = function(t) {
    function r() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(r, t), Object.defineProperty(r.prototype, "name", {
        get: function() {
            return "getAId";
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.install = function() {
        return function() {
            return y();
        };
    }, r;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
function _() {
    return ((E() || {}).d || {}).autoplay || !1;
}
var m = function(t) {
    function r() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(r, t), Object.defineProperty(r.prototype, "name", {
        get: function() {
            return "getIsVideoAutoPlay";
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.install = function() {
        return function() {
            return _();
        };
    }, r;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
function S() {
    return (E() || {}).profilePlus;
}
var d = function(t) {
    function r() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(r, t), Object.defineProperty(r.prototype, "name", {
        get: function() {
            return "getProfilePlus";
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.install = function() {
        return function() {
            return S();
        };
    }, r;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
function O() {
    return Boolean(p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].IS_SUBSEQUENT_LIFF_APP));
}
function P(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].IS_SUBSEQUENT_LIFF_APP, n);
}
function b() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].APP_DATA);
}
function N(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].APP_DATA, n);
}
function h() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].MST_VERIFIER);
}
function A(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].MST_VERIFIER, n);
}
function v() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].MSIT);
}
function C(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].MSIT, n);
}
function D() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].MST);
}
function L(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].MST, n);
}
function M() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].MST_CHALLENGE);
}
function R(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].MST_CHALLENGE, n);
}
function j() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].CLIENT_ID);
}
function F(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].CLIENT_ID, n);
}
function K() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].RAW_CONTEXT);
}
function w() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].FEATURE_TOKEN);
}
function U(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].FEATURE_TOKEN, n);
}
function X() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].ID_TOKEN);
}
function G(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].ID_TOKEN, n);
}
var k = function(t) {
    function r() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(r, t), Object.defineProperty(r.prototype, "name", {
        get: function() {
            return "getIDToken";
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.install = function() {
        return function() {
            return X();
        };
    }, r;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
function x() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].ACCESS_TOKEN);
}
function B(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].ACCESS_TOKEN, n);
}
var V = function(t) {
    function r() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(r, t), Object.defineProperty(r.prototype, "name", {
        get: function() {
            return "getAccessToken";
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.install = function() {
        return function() {
            return x();
        };
    }, r;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
function H(n) {
    var t = c().liffId;
    if (!t) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_CONFIG"], "liffId is necessary for liff.init()");
    ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? sessionStorage : localStorage).removeItem("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_KEY"], ":").concat(t, ":").concat(n));
}
function J() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].LOGIN_TMP);
}
function Q(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].LOGIN_TMP, n);
}
function W() {
    H(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].LOGIN_TMP);
}
function q(n) {
    var t = c();
    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookie"].set("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_KEY"], ":").concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].EXPIRES, ":").concat(t.liffId), n.getTime(), {
        expires: n.toUTCString(),
        path: "/",
        secure: null
    });
}
function z() {
    var n = c();
    return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookie"].get("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_KEY"], ":").concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].EXPIRES, ":").concat(n.liffId));
}
function Y() {
    var n = c();
    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookie"].remove("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_KEY"], ":").concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].EXPIRES, ":").concat(n.liffId), {
        path: "/"
    });
}
function Z() {
    return p(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].DECODED_ID_TOKEN);
}
function $(n) {
    s(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"].DECODED_ID_TOKEN, n);
}
var nn = function(t) {
    function r() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(r, t), Object.defineProperty(r.prototype, "name", {
        get: function() {
            return "getDecodedIDToken";
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.install = function() {
        return function() {
            return Z();
        };
    }, r;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
function tn() {
    Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"]).forEach(function(n) {
        H(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_OBJECT"][n]);
    }), Y();
}
;
}),
"[project]/music-studio-app/node_modules/@liff/is-logged-in/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IsLoggedInModule",
    ()=>o,
    "isLoggedIn",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
;
function e() {
    return !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])();
}
var o = function(r) {
    function n() {
        return null !== r && r.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(n, r), Object.defineProperty(n.prototype, "name", {
        get: function() {
            return "isLoggedIn";
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.install = function() {
        return function() {
            return e();
        };
    }, n;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/get-version/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetVersionModule",
    ()=>e,
    "getVersion",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
function r() {
    return "2.27.3";
}
var e = function(n) {
    function r() {
        return null !== n && n.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(r, n), Object.defineProperty(r.prototype, "name", {
        get: function() {
            return "getVersion";
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.install = function() {
        return function() {
            return "2.27.3";
        };
    }, r;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/is-sub-window/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IsSubWindowModule",
    ()=>p,
    "isSubWindow",
    ()=>d,
    "module",
    ()=>m
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
;
;
var a = function() {
    function t() {}
    return t.prototype.invoke = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSubWindow"])();
    }, t;
}(), l = function() {
    function t(t) {
        this.storage = t;
    }
    return Object.defineProperty(t, "IN_SUB_WINDOW_KEY", {
        get: function() {
            return "inSubWindow";
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.invoke = function() {
        return new URLSearchParams(window.location.search).has(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_IDNTIFICATION_KEY"]) && this.setInSubWindow(!0), !(!this.getInSubWindow() && !this.getSubWindowIdentifier());
    }, t.prototype.getInSubWindow = function() {
        var n = this.storage.getItem("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_KEY"], ":").concat(this.getLiffId(), ":").concat(t.IN_SUB_WINDOW_KEY));
        return null !== n && JSON.parse(n);
    }, t.prototype.getSubWindowIdentifier = function() {
        var t, n, i = "liff.subwindow.identifier", e = new URLSearchParams(window.location.search);
        return e.get(i) || (t = i, (n = e.get("liff.state")) ? new URLSearchParams(n).get(t) : null) || null;
    }, t.prototype.setInSubWindow = function(n) {
        this.storage.setItem("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_KEY"], ":").concat(this.getLiffId(), ":").concat(t.IN_SUB_WINDOW_KEY), String(n));
    }, t.prototype.getLiffId = function() {
        var t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId;
        if (!t) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_CONFIG"], "liffId is necessary for liff.init()");
        return t;
    }, t;
}(), p = function(n) {
    function i() {
        var t = n.call(this) || this;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNonBrowserEnvironment"])() ? t.impl = {
            invoke: function() {
                return !1;
            }
        } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? t.impl = new a : t.impl = new l(window.sessionStorage), t;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(i, n), Object.defineProperty(i.prototype, "name", {
        get: function() {
            return "isSubWindow";
        },
        enumerable: !1,
        configurable: !0
    }), i.prototype.install = function() {
        return this.impl.invoke.bind(this.impl);
    }, i;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]), m = new p, d = m.install();
;
}),
"[project]/music-studio-app/node_modules/@liff/get-line-version/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetLineVersionModule",
    ()=>e,
    "getLineVersion",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
function r() {
    var n = navigator.userAgent.match(/Line\/\d+(\.\d+)*/i);
    return n ? n[0].slice(5) : null;
}
var e = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(e, t), Object.defineProperty(e.prototype, "name", {
        get: function() {
            return "getLineVersion";
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.install = function() {
        return function() {
            return r();
        };
    }, e;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/get-os/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetOSModule",
    ()=>i,
    "_cleanupCachedOS",
    ()=>o,
    "getOS",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
var r;
function e() {
    if (!r) {
        var t = window.navigator.userAgent.toLowerCase();
        r = /iphone|ipad|ipod/.test(t) ? "ios" : /android/.test(t) ? "android" : "web";
    }
    return r;
}
function o() {
    r = void 0;
}
var i = function(n) {
    function r() {
        return n.call(this) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(r, n), Object.defineProperty(r.prototype, "name", {
        get: function() {
            return "getOS";
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.install = function() {
        return function() {
            return e();
        };
    }, r;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/is-api-available/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IsApiAvailableModule",
    ()=>O,
    "isApiAvailable",
    ()=>k,
    "validators",
    ()=>H
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-sub-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-line-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-logged-in/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-os/lib/index.es.js [app-client] (ecmascript)");
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
function g(e) {
    var r, n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])();
    return null === (r = null == n ? void 0 : n.availability) || void 0 === r ? void 0 : r[e];
}
function h(e, r, n) {
    var i = g(e), o = n || e;
    if (!i) return {
        available: !1,
        error: {
            code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
            message: "".concat(o, " is not allowed in this LIFF app")
        }
    };
    var t = i.minVer, c = i.unsupportedFromVer, s = !t || function(e, r) {
        var n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLineVersion"])();
        return !!n && !(r && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareVersion"])(n, r) > 0) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareVersion"])(n, e) >= 0;
    }(t, c), d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])();
    return d && !s ? {
        available: !1,
        error: {
            code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
            message: "".concat(o, " is unavailable in this client version.")
        }
    } : i.permission ? d && s || r ? {
        available: !0
    } : {
        available: !1,
        error: {
            code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
            message: "".concat(o, " is not allowed in external browser")
        }
    } : {
        available: !1,
        error: {
            code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
            message: "".concat(o, " is not allowed in this LIFF app")
        }
    };
}
var w = function() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])() ? !(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLIFFBrowser"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLINEBrowser"])() ? {
        available: !1,
        error: {
            code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
            message: "Subwindow is not supported in this browser"
        }
    } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSubWindow"])() ? {
        available: !1,
        error: {
            code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
            message: "this api can be only called in parent window"
        }
    } : h("subwindowOpen", !0) : {
        available: !1,
        error: {
            code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"],
            message: "Need access_token for api call, Please login first"
        }
    };
}, S = [
    "subwindowOpen",
    "shareTargetPicker",
    "multipleLiffTransition",
    "scanCode",
    "scanCodeV2",
    "getAdvertisingId",
    "addToHomeScreen",
    "bluetoothLeFunction",
    "skipChannelVerificationScreen",
    "createShortcutOnHomeScreen",
    "internalCreateShortcutOnHomeScreen",
    "iap"
], C = {
    scanCode: function() {
        return h("scanCode");
    },
    getAdvertisingId: function() {
        return h("getAdvertisingId");
    },
    bluetoothLeFunction: function() {
        return h("bluetoothLeFunction");
    },
    shareTargetPicker: function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSubWindow"])() ? {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
                message: "this api can be only called in parent window"
            }
        } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])() ? h("shareTargetPicker", !0) : {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"],
                message: "Need access_token for api call, Please login first"
            }
        };
    },
    multipleLiffTransition: function() {
        var e = g("multipleLiffTransition");
        return e && e.permission ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? {
            available: !0
        } : {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
                message: "multipleLiffTransition is available only in the LINE App browser"
            }
        } : {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
                message: "multipleLiffTransition is not allowed in this LIFF app"
            }
        };
    },
    subwindowOpen: w,
    scanCodeV2: function() {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])()) return {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"],
                message: "Need access_token for api call, Please login first"
            }
        };
        var e = w();
        return e.available ? h("scanCodeV2", !0) : e;
    },
    addToHomeScreen: function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSubWindow"])() ? {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
                message: "this api can be only called in parent window"
            }
        } : h("addToHomeScreen");
    },
    skipChannelVerificationScreen: function() {
        var e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])();
        return e ? "square_chat" === e.type ? {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
                message: "skipChannelVerificationScreen is not allowed in OpenChat"
            }
        } : h("skipChannelVerificationScreen") : {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
                message: "Context is not found"
            }
        };
    },
    createShortcutOnHomeScreen: function() {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSubWindow"])()) return {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
                message: "this api can be only called in parent window"
            }
        };
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])()) return {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"],
                message: "Need access_token for api call, Please login first"
            }
        };
        var e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])();
        return "android" !== e && "ios" !== e ? {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
                message: "this api can be only called in mobile device"
            }
        } : h("addToHomeV2", !0, "createShortcutOnHomeScreen");
    },
    internalCreateShortcutOnHomeScreen: function() {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSubWindow"])()) return {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
                message: "this api can be only called in parent window"
            }
        };
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])()) return {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"],
                message: "Need access_token for api call, Please login first"
            }
        };
        var e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])();
        if ("android" !== e && "ios" !== e) return {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
                message: "this api can be only called in mobile device"
            }
        };
        var r = h("addToHomeV2", !0, "internalCreateShortcutOnHomeScreen");
        return r.available ? h("addToHomeLineScheme", !0, "internalCreateShortcutOnHomeScreen") : r;
    },
    iap: function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])() ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSubWindow"])() ? {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
                message: "this api can be only called in parent window"
            }
        } : h("iap", !1, "In-App Purchase") : {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"],
                message: "Need access_token for api call, Please login first"
            }
        } : {
            available: !1,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"],
                message: "In-App Purchase is not allowed in external browser"
            }
        };
    }
}, T = function(e) {
    return function() {
        var r = e();
        if (!r.available) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(r.error.code, r.error.message);
    };
}, H = {
    scanCode: T(C.scanCode),
    getAdvertisingId: T(C.getAdvertisingId),
    bluetoothLeFunction: T(C.bluetoothLeFunction),
    shareTargetPicker: T(C.shareTargetPicker),
    multipleLiffTransition: T(C.multipleLiffTransition),
    subwindowOpen: T(C.subwindowOpen),
    scanCodeV2: T(C.scanCodeV2),
    addToHomeScreen: T(C.addToHomeScreen),
    skipChannelVerificationScreen: T(C.skipChannelVerificationScreen),
    createShortcutOnHomeScreen: T(C.createShortcutOnHomeScreen),
    internalCreateShortcutOnHomeScreen: T(C.internalCreateShortcutOnHomeScreen),
    iap: T(C.iap)
};
function k(e) {
    if (!function(e) {
        return S.some(function(r) {
            return r === e;
        });
    }(e)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "Unexpected API name.");
    var r = C[e];
    return !r || r().available;
}
var O = function(a) {
    function i() {
        var e = a.apply(this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(arguments), !1)) || this;
        return e.hooks = {}, e;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(i, a), Object.defineProperty(i.prototype, "name", {
        get: function() {
            return "isApiAvailable";
        },
        enumerable: !1,
        configurable: !0
    }), i.prototype.install = function() {
        return function(e) {
            return k(e);
        };
    }, i;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/check-availability/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckAvailability",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-api-available/lib/index.es.js [app-client] (ecmascript)");
;
;
;
var e = function() {
    function t() {}
    return t.prototype.invoke = function(t) {
        var i = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validators"][t];
        return !!i && (i(), !0);
    }, t;
}(), r = function() {
    function t(t) {
        this.liff = t;
    }
    return t.prototype.invoke = function(t) {
        return this.liff.checkFeature(t);
    }, t;
}(), o = function() {
    function n(o) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareVersion"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVersion"])(), n.SDK_VERSION_SUPPORTING_NEW) >= 0 ? this.impl = new e : this.impl = new r(o);
    }
    return Object.defineProperty(n, "SDK_VERSION_SUPPORTING_NEW", {
        get: function() {
            return "2.11.0";
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.invoke = function(t) {
        return this.impl.invoke(t);
    }, n;
}();
;
}),
"[project]/music-studio-app/node_modules/@liff/extensions/lib/es/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LegacyExtensionsModule",
    ()=>f,
    "load",
    ()=>y
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-os/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-line-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
;
var c = function(t, n) {
    return c = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, n) {
        t.__proto__ = n;
    } || function(t, n) {
        for(var e in n)Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e]);
    }, c(t, n);
};
function u(t, n, e, o) {
    return new (e || (e = Promise))(function(r, i) {
        function c(t) {
            try {
                l(o.next(t));
            } catch (n) {
                i(n);
            }
        }
        function u(t) {
            try {
                l(o.throw(t));
            } catch (n) {
                i(n);
            }
        }
        function l(t) {
            var n;
            t.done ? r(t.value) : (n = t.value, n instanceof e ? n : new e(function(t) {
                t(n);
            })).then(c, u);
        }
        l((o = o.apply(t, n || [])).next());
    });
}
function l(t, n) {
    var e, o, r, i, c = {
        label: 0,
        sent: function() {
            if (1 & r[0]) throw r[1];
            return r[1];
        },
        trys: [],
        ops: []
    };
    return i = {
        next: u(0),
        throw: u(1),
        return: u(2)
    }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
        return this;
    }), i;
    //TURBOPACK unreachable
    ;
    function u(i) {
        return function(u) {
            return function(i) {
                if (e) throw new TypeError("Generator is already executing.");
                for(; c;)try {
                    if (e = 1, o && (r = 2 & i[0] ? o.return : i[0] ? o.throw || ((r = o.return) && r.call(o), 0) : o.next) && !(r = r.call(o, i[1])).done) return r;
                    switch(o = 0, r && (i = [
                        2 & i[0],
                        r.value
                    ]), i[0]){
                        case 0:
                        case 1:
                            r = i;
                            break;
                        case 4:
                            return c.label++, {
                                value: i[1],
                                done: !1
                            };
                        case 5:
                            c.label++, o = i[1], i = [
                                0
                            ];
                            continue;
                        case 7:
                            i = c.ops.pop(), c.trys.pop();
                            continue;
                        default:
                            if (!(r = c.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                c = 0;
                                continue;
                            }
                            if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {
                                c.label = i[1];
                                break;
                            }
                            if (6 === i[0] && c.label < r[1]) {
                                c.label = r[1], r = i;
                                break;
                            }
                            if (r && c.label < r[2]) {
                                c.label = r[2], c.ops.push(i);
                                break;
                            }
                            r[2] && c.ops.pop(), c.trys.pop();
                            continue;
                    }
                    i = n.call(t, c);
                } catch (u) {
                    i = [
                        6,
                        u
                    ], o = 0;
                } finally{
                    e = r = 0;
                }
                if (5 & i[0]) throw i[1];
                return {
                    value: i[0] ? i[1] : void 0,
                    done: !0
                };
            }([
                i,
                u
            ]);
        };
    }
}
var s = !1, a = function() {
    return s;
}, f = function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return function(t, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
        function e() {
            this.constructor = t;
        }
        c(t, n), t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype, new e);
    }(n, t), Object.defineProperty(n.prototype, "name", {
        get: function() {
            return "_legacyExtensionsEnabled";
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.install = function() {
        s = !0;
    }, n;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
function p() {
    var t;
    return "ios" === (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])() ? (t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLineVersion"])()) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareVersion"])(t, "9.19.0") < 0 ? "https://static.line-scdn.net/liff/edge/2/ios-918-extensions_2_22_0.js" : "https://static.line-scdn.net/liff/edge/2/ios-extensions_2_22_0.js" : "https://static.line-scdn.net/liff/edge/2/non-ios-extensions_2_22_0.js";
}
function y() {
    return a() ? function() {
        return u(this, void 0, void 0, function() {
            return l(this, function(e) {
                switch(e.label){
                    case 0:
                        return [
                            3,
                            2
                        ];
                    case 1:
                        return [
                            2,
                            e.sent().default
                        ];
                    case 2:
                        return [
                            2,
                            new Promise(function(e, o) {
                                var r = document.createElement("script"), i = p();
                                r.onload = function() {
                                    var r = window.liffClientExtension;
                                    r ? e(r) : o((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Unable to load client features. (Extension is empty)"));
                                }, r.onerror = function(e) {
                                    o((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Unable to load client features.", {
                                        cause: e
                                    }));
                                }, r.src = i, r.type = "text/javascript", document.body.appendChild(r);
                            })
                        ];
                }
            });
        });
    }() : Promise.resolve(void 0);
}
;
}),
"[project]/music-studio-app/node_modules/@liff/logout/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LogoutModule",
    ()=>e,
    "logout",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
;
function o() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])();
}
var e = function(r) {
    function n() {
        return null !== r && r.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(n, r), Object.defineProperty(n.prototype, "name", {
        get: function() {
            return "logout";
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.install = function() {
        return function() {
            return o();
        };
    }, n;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/permanent-link/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PermanentLinkModule",
    ()=>P,
    "module",
    ()=>R,
    "validatePermalinkGeneratability",
    ()=>L
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
;
var g = /([\x90\x9D\x81\x8D\x8F<"{|}>\\^`“›„•‚ŽŠ…’—ž–‘”‡™‰ŒšŸ‹œ†¥¿©áÄýÍÎðô]|\n|.*#.*#|%(?![0-9A-Fa-f]{2})[^%]{0,2})/, v = function(n) {
    if (g.test(n)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "invalid URL.");
    var t = new URL(n), r = t.username, e = t.password, i = t.hash, a = t.search;
    return {
        username: r,
        password: e,
        pathname: t.pathname,
        hash: i,
        origin: t.origin,
        search: a
    };
}, w = function(n) {
    return n.substring(1).split("&").filter(function(n) {
        return !/^liff\./.test(n) && Boolean(n);
    });
}, x = function(n, t) {
    var r = n.substring(t.length);
    return "/" === r ? "" : (r.length > 0 && "/" !== r[0] && (r = "/" + r), r);
}, U = function(n) {
    return encodeURIComponent(n).replace(/[!'()*]/g, function(n) {
        return "%" + n.charCodeAt(0).toString(16).toUpperCase();
    });
}, y = function(e, i) {
    var a = (function(r, e) {
        for(var i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(r), !1), a = 0; a < e.length; a++){
            var o = e[a], c = i.indexOf(o);
            c > -1 && i.splice(c, 1);
        }
        return i;
    })(function(n) {
        var e, i, a = n.replace(/\+/g, "%2B"), o = new URLSearchParams(a), c = [];
        try {
            for(var u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__values"])(o.entries()), s = u.next(); !s.done; s = u.next()){
                var f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(s.value, 2), l = f[0], h = f[1];
                c.push("".concat(U(l), "=").concat(U(h)));
            }
        } catch (m) {
            e = {
                error: m
            };
        } finally{
            try {
                s && !s.done && (i = u.return) && i.call(u);
            } finally{
                if (e) throw e.error;
            }
        }
        if (0 === c.length) return [
            ""
        ];
        var p = n.split("&");
        return c.map(function(n, t) {
            return n.endsWith("=") && !p[t].endsWith("=") ? n.slice(0, -1) : n;
        });
    }(w(e).join("&")), w(i)).join("&");
    return "" !== a ? "?".concat(a) : "";
}, b = function(n) {
    var t = new RegExp("^".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDENTIAL_KEYS"].join("|"))), r = n.substring(1).split("&").filter(function(n) {
        return !t.test(n) && Boolean(n);
    }).join("&");
    return r ? "#".concat(r) : "";
}, C = function(n, t) {
    return 0 === t.indexOf(n) && (n.endsWith("/") && (n = n.substring(0, n.length - 1)), void 0 === t[n.length] || "/" === t[n.length]);
}, L = function(n, t) {
    var r = v(n), e = new URL(t);
    if (r.username !== e.username || r.password !== e.password) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "invalid URL.");
    if (e.origin !== r.origin || !C(e.pathname, r.pathname)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "invalid URL.");
}, P = function(r) {
    function o() {
        var e = r.apply(this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(arguments), !1)) || this;
        return e.extraParams = "", e.getAndValidateContext = function() {
            var n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])();
            if (!n) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Could not get Context from server.");
            if (!n.endpointUrl) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Could not get endpointUrl from server.");
            if (!n.permanentLinkPattern) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Could not get permanentLinkPattern from server.");
            return n;
        }, e.createUrl = function() {
            var n = e.getAndValidateContext(), t = window.location, r = t.pathname, i = t.search, a = t.hash, o = t.origin, u = new URL(n.endpointUrl);
            if (u.origin !== o || !C(u.pathname, r)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_CONFIG"], "Current page is not under entrypoint.");
            var l = r.substring(u.pathname.length);
            l.length > 0 && "/" !== l[0] && (l = "/" + l);
            var p = new RegExp("^".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDENTIAL_KEYS"].join("|"))), d = a.substring(1).split("&").filter(function(n) {
                return !p.test(n) && Boolean(n);
            }).join("&"), g = d === u.hash.substring(1) ? "" : d, v = function(n) {
                return n.substring(1).split("&").filter(function(n) {
                    return !/liff\.state/.test(n) && Boolean(n);
                });
            }, w = v(i), x = v(u.search);
            e.extraParams && w.push(e.extraParams);
            for(var U = 0; U < x.length; U++){
                var y = x[U], b = w.indexOf(y);
                b > -1 && w.splice(b, 1);
            }
            var L = w.join("&"), P = "".concat(l).concat("" !== L ? "?".concat(L) : "").concat(g ? "#".concat(g) : "");
            return "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMANENT_LINK_ORIGIN"]).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId).concat(P);
        }, e.createUrlBy = function(n) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(e, void 0, void 0, function() {
                var t, r, e, i, o, c;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(a) {
                    if (!(t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Should run after liff init.");
                    return r = this.getAndValidateContext(), L(n, r.endpointUrl), e = v(n), i = new URL(r.endpointUrl), o = r.miniDomainAllowed ? __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMANENT_LINK_ORIGIN_MINI"] : __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMANENT_LINK_ORIGIN"], c = r.miniDomainAllowed && r.miniAppId ? r.miniAppId : t, [
                        2,
                        o.concat(c, x(e.pathname, i.pathname), y(e.search, i.search), b(e.hash))
                    ];
                });
            });
        }, e.setExtraQueryParam = function(n) {
            e.extraParams = n;
        }, e.install = function() {
            return {
                createUrl: e.createUrl,
                createUrlBy: e.createUrlBy,
                setExtraQueryParam: e.setExtraQueryParam
            };
        }, e;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(o, r), Object.defineProperty(o.prototype, "name", {
        get: function() {
            return "permanentLink";
        },
        enumerable: !1,
        configurable: !0
    }), o;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]), R = new P;
;
}),
"[project]/music-studio-app/node_modules/@liff/server-api/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetch",
    ()=>f,
    "getEndPoint",
    ()=>l,
    "requestWithoutErrorHandling",
    ()=>p,
    "verifyAccessToken",
    ()=>d
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
function c(a) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var e, r, s;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
            switch(t.label){
                case 0:
                    if (!a.ok) return [
                        3,
                        4
                    ];
                    t.label = 1;
                case 1:
                    return t.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]), [
                        4,
                        a.json()
                    ];
                case 2:
                    return [
                        2,
                        t.sent()
                    ];
                case 3:
                    return t.sent(), [
                        2,
                        a
                    ];
                case 4:
                    return e = String(a.status), r = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HTTPStatusCodes"].has(e) ? e : __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], [
                        4,
                        a.json().catch(function() {
                            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(r, a.statusText);
                        })
                    ];
                case 5:
                    throw s = t.sent(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(s.error || s.errorCode || r, s.error_description || s.message);
            }
        });
    });
}
function u(e) {
    var t = function(e) {
        if (e) return e;
        var t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])();
        if (!t) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "Need access_token for api call, Please login first");
        return {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer ".concat(t)
        };
    }(e && e.headers);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])({}, e), {
        headers: t
    });
}
function f(e, t) {
    var a;
    try {
        a = u(t);
    } catch (n) {
        return Promise.reject(n);
    }
    return fetch(e, a).then(c);
}
function p(e, t) {
    var a;
    try {
        a = u(t);
    } catch (n) {
        return Promise.reject(n);
    }
    return fetch(e, a);
}
function h(e) {
    var t = e.subdomain, a = void 0 === t ? "api" : t, n = e.pathname;
    return "https://".concat(a, ".").concat("line.me", "/").concat(n);
}
var m = {
    token: h({
        pathname: "oauth2/v2.1/token"
    }),
    certs: h({
        pathname: "oauth2/v2.1/certs"
    }),
    "openid-configuration": h({
        subdomain: "access",
        pathname: ".well-known/openid-configuration"
    }),
    authorize: h({
        subdomain: "access",
        pathname: "liff/v1/authorize"
    }),
    profile: h({
        pathname: "v2/profile"
    }),
    message: h({
        pathname: "message/v3/share"
    }),
    friendship: h({
        pathname: "friendship/v1/status"
    }),
    shareTargetPicker: h({
        subdomain: "access",
        pathname: "oauth2/v2.1/liff/shareTargetPicker"
    }),
    shareTargetPickerOtt: h({
        pathname: "liff/v2/apps"
    }),
    shareTargetPickerResult: h({
        subdomain: "access",
        pathname: "oauth2/v2.1/liff/shareTargetPicker/result"
    }),
    apps: h({
        pathname: "liff/v2/apps"
    }),
    subWindowGetMSIT: h({
        pathname: "liff/v2/sub/msit"
    }),
    subWindowGetMSTByMSIT: h({
        pathname: "liff/v2/sub/mst"
    }),
    subWindowSubscribe: h({
        subdomain: "liff",
        pathname: "liff/v2/sub/waitResult"
    }),
    subWindowPost: h({
        pathname: "liff/v2/sub/result"
    }),
    subWindowGetAppData: h({
        pathname: "liff/v2/sub/appData"
    }),
    subWindowGetOrigin: function(e) {
        return h({
            pathname: "liff/v2/sub/".concat(e, "/origin")
        });
    },
    accessTokenVerify: h({
        pathname: "oauth2/v2.1/verify"
    }),
    unauthorizedPermissions: h({
        subdomain: "liff",
        pathname: "liff/v2/incrementalAgreement/unauthorizedPermissions"
    }),
    permanentLink: h({
        subdomain: "liff",
        pathname: "liff/v2/permanentLink"
    }),
    createShortcutOnHomeScreen: h({
        subdomain: "liff-shortcut",
        pathname: "api/shortcut"
    }),
    iapVirtualConfirm: h({
        pathname: "iap/v1/product/virtualConfirm"
    })
};
function l(e) {
    return m[e];
}
function d(e) {
    return f("".concat(l("accessTokenVerify"), "?access_token=").concat(encodeURIComponent(e)), {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    });
}
;
}),
"[project]/music-studio-app/node_modules/@liff/message-bus/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTION",
    ()=>l,
    "CRYPTO_KEY",
    ()=>u,
    "EVENT_NAME",
    ()=>f,
    "GLOBAL_MESSAGE_BUS_IDENTIFIER",
    ()=>v,
    "GLOBAL_MESSAGE_BUS_KEY",
    ()=>p,
    "IDENTIFIER_KEY",
    ()=>d,
    "MessageBus",
    ()=>T,
    "WINDOW",
    ()=>h,
    "getEventAction",
    ()=>E,
    "getUniqId",
    ()=>b,
    "isSameEvent",
    ()=>g,
    "loadMessageHandlerPage",
    ()=>A
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
;
;
;
var d = "liff.subwindow.identifier", u = "liff.subwindow.cryptokey", f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"]), {
    GET_DATA: "getData",
    SET_DATA: "setData",
    NOT_FOUND: "notFound",
    TEARDOWN: "teardown"
}), l = {
    BROADCAST: "broadcast",
    COMMAND: "command"
}, h = {
    MAIN: "main",
    SUB: "sub"
}, v = "__liff_message_bus__", p = "bFSQbce18HC7UXe-lS_mgg", m = function(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(void 0, void 0, void 0, function() {
        var t;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    return n.trys.push([
                        0,
                        2,
                        ,
                        3
                    ]), [
                        4,
                        window.crypto.subtle.importKey("jwk", {
                            kty: "oct",
                            k: e,
                            alg: "A128GCM",
                            ext: !0
                        }, {
                            name: "AES-GCM"
                        }, !1, [
                            "encrypt",
                            "decrypt"
                        ])
                    ];
                case 1:
                    return [
                        2,
                        n.sent()
                    ];
                case 2:
                    throw t = n.sent(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], t);
                case 3:
                    return [
                        2
                    ];
            }
        });
    });
}, w = function(e, i, r) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(void 0, void 0, void 0, function() {
        var t, a, o, d;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    return n.trys.push([
                        0,
                        3,
                        ,
                        4
                    ]), t = (new TextEncoder).encode(e), [
                        4,
                        m(i)
                    ];
                case 1:
                    return a = n.sent(), [
                        4,
                        window.crypto.subtle.encrypt({
                            name: "AES-GCM",
                            iv: t
                        }, a, (new TextEncoder).encode(r))
                    ];
                case 2:
                    return o = n.sent(), [
                        2,
                        btoa(new Uint8Array(o).reduce(function(e, t) {
                            return e + String.fromCharCode(t);
                        }, ""))
                    ];
                case 3:
                    throw d = n.sent(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], d);
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
}, y = function(e, i, r) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(void 0, void 0, void 0, function() {
        var t, a, o, d, u, f, l;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    return n.trys.push([
                        0,
                        3,
                        ,
                        4
                    ]), t = (new TextEncoder).encode(e), [
                        4,
                        m(i)
                    ];
                case 1:
                    for(a = n.sent(), o = atob(r), d = new Uint8Array(o.length), u = 0; u < o.length; u++)d[u] = o.charCodeAt(u);
                    return [
                        4,
                        window.crypto.subtle.decrypt({
                            name: "AES-GCM",
                            iv: t
                        }, a, d.buffer)
                    ];
                case 2:
                    return f = n.sent(), [
                        2,
                        (new TextDecoder).decode(new Uint8Array(f))
                    ];
                case 3:
                    throw l = n.sent(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], l);
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
}, g = function(e, t) {
    return b(e) === b(t);
}, b = function(e) {
    return "".concat(e.identifier, "-").concat(e.action, "-").concat(e.timestamp);
}, E = function(e) {
    return Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"]).map(function(e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"][e];
    }).includes(e) ? l.BROADCAST : l.COMMAND;
};
function A() {
    var e = document.createElement("form");
    e.method = "POST", e.action = "$MESSAGE_HANDLER_URL";
    var t = document.createElement("input");
    t.type = "hidden", t.name = "identifier", t.value = "$IDENTIFIER", e.appendChild(t), document.body.appendChild(e), e.submit();
}
var T = function(o) {
    void 0 === o && (o = h.MAIN);
    var d = this;
    this.identification = {
        identifier: "",
        cryptoKey: ""
    }, this.messageHandlerInstance = null, this.listeners = new Map, this.sentMessages = [], this.generateIdentification = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(d, void 0, void 0, function() {
            var e, i, r, o, d;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(f) {
                switch(f.label){
                    case 0:
                        return e = new URLSearchParams(window.location.search), i = function(t) {
                            var n = e.get("liff.state");
                            return n ? new URLSearchParams(n).get(t) : null;
                        }, r = this, d = {
                            identifier: this.windowType === h.MAIN ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomAlphaNumericString"])(12) : e.get("liff.subwindow.identifier") || i("liff.subwindow.identifier") || ""
                        }, this.windowType !== h.MAIN ? [
                            3,
                            2
                        ] : [
                            4,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(void 0, void 0, void 0, function() {
                                var e, t, i;
                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                                    switch(n.label){
                                        case 0:
                                            return n.trys.push([
                                                0,
                                                3,
                                                ,
                                                4
                                            ]), [
                                                4,
                                                window.crypto.subtle.generateKey({
                                                    name: "AES-GCM",
                                                    length: 128
                                                }, !0, [
                                                    "encrypt",
                                                    "decrypt"
                                                ])
                                            ];
                                        case 1:
                                            return e = n.sent(), [
                                                4,
                                                window.crypto.subtle.exportKey("jwk", e)
                                            ];
                                        case 2:
                                            if (!(t = n.sent()) || !t.k) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], "failed to generate key");
                                            return [
                                                2,
                                                t.k
                                            ];
                                        case 3:
                                            throw i = n.sent(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], i);
                                        case 4:
                                            return [
                                                2
                                            ];
                                    }
                                });
                            })
                        ];
                    case 1:
                        return o = f.sent(), [
                            3,
                            3
                        ];
                    case 2:
                        o = e.get(u) || i(u) || "", f.label = 3;
                    case 3:
                        return r.identification = (d.cryptoKey = o, d), [
                            2
                        ];
                }
            });
        });
    }, this.hasIdentification = function() {
        var e = d.identification, t = e.identifier, n = e.cryptoKey;
        return "string" == typeof t && "string" == typeof n && t.length > 0 && n.length > 0;
    }, this.isReady = function() {
        return d.hasIdentification() && !!d.messageHandlerInstance;
    }, this.setup = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(d, void 0, void 0, function() {
            var e, t, i, r, a, o = this;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                switch(n.label){
                    case 0:
                        return this.messageHandlerInstance ? [
                            2
                        ] : [
                            4,
                            this.generateIdentification()
                        ];
                    case 1:
                        if (n.sent(), !(e = this.identification.identifier)) return [
                            2
                        ];
                        if (t = /^[a-zA-Z0-9]+$/gm, !e.match(t)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], "Invalid identifier");
                        return (i = document.createElement("iframe")).style.display = "none", i.src = "about:blank", document.body.appendChild(i), null === (a = null == i ? void 0 : i.contentWindow) || void 0 === a || a.window.eval("(".concat(A.toString().replace("$MESSAGE_HANDLER_URL", "".concat("https://liff-subwindow.line.me/liff/v2/sub/messageHandler")).replace("$IDENTIFIER", e.split("'")[0]), ")()")), r = "iframe-".concat(e, "-ready"), [
                            4,
                            new Promise(function(e) {
                                var t = function(n) {
                                    n.data[r] && (o.messageHandlerInstance = i, window.addEventListener("message", o.proxyToListeners), e(), document.removeEventListener("message", t));
                                };
                                window.addEventListener("message", t);
                            })
                        ];
                    case 2:
                        return [
                            2,
                            n.sent()
                        ];
                }
            });
        });
    }, this.teardown = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(d, void 0, void 0, function() {
            var e, t;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                switch(n.label){
                    case 0:
                        return this.isReady() ? [
                            4,
                            this.send({
                                eventName: f.TEARDOWN
                            })
                        ] : [
                            3,
                            2
                        ];
                    case 1:
                        n.sent(), window.removeEventListener("message", this.proxyToListeners), this.listeners.clear(), null === (t = null === (e = this.messageHandlerInstance) || void 0 === e ? void 0 : e.parentNode) || void 0 === t || t.removeChild(this.messageHandlerInstance), this.messageHandlerInstance = null, n.label = 2;
                    case 2:
                        return [
                            2
                        ];
                }
            });
        });
    }, this.listen = function(e) {
        d.listeners.set(e, e);
    }, this.listenRepliedEvent = function(e, t) {
        var n = function(i) {
            i.replyTarget && g(i.replyTarget, e) && (t(i), d.listeners.delete(n));
        };
        d.listeners.set(n, n);
    }, this.send = function(e) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(d, void 0, void 0, function() {
            var t, i, r, a, o = this;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                switch(n.label){
                    case 0:
                        if (!this.isReady()) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])("message bus is not ready to send message");
                        return i = {
                            action: E(e.eventName),
                            identifier: this.identification.identifier || "",
                            timestamp: (new Date).getTime()
                        }, [
                            4,
                            this.getEncryptedContext(e)
                        ];
                    case 1:
                        return i.context = n.sent(), t = i, null === (a = null === (r = this.messageHandlerInstance) || void 0 === r ? void 0 : r.contentWindow) || void 0 === a || a.postMessage({
                            messageBusEvent: t
                        }, "*"), this.sentMessages.push(b(t)), [
                            4,
                            new Promise(function(e) {
                                o.listenRepliedEvent(t, function(t) {
                                    e(t.context);
                                });
                            })
                        ];
                    case 2:
                        return [
                            2,
                            n.sent()
                        ];
                }
            });
        });
    }, this.reply = function(e, i) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(d, void 0, void 0, function() {
            var t, r, a, o;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                switch(n.label){
                    case 0:
                        if (!this.isReady()) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])("message bus is not ready to send message");
                        if (!e.identifier || !e.timestamp) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], "target message is not valid");
                        return r = {
                            action: l.BROADCAST
                        }, [
                            4,
                            this.getEncryptedContext(i)
                        ];
                    case 1:
                        return r.context = n.sent(), r.identifier = this.identification.identifier || "", r.timestamp = (new Date).getTime(), r.replyTarget = {
                            action: e.action,
                            identifier: e.identifier,
                            timestamp: e.timestamp
                        }, t = r, null === (o = null === (a = this.messageHandlerInstance) || void 0 === a ? void 0 : a.contentWindow) || void 0 === o || o.postMessage({
                            messageBusEvent: t
                        }, "*"), this.sentMessages.push(b(t)), [
                            2
                        ];
                }
            });
        });
    }, this.setData = function(e, t) {
        void 0 === e && (e = "appData"), d.send({
            eventName: f.SET_DATA,
            key: e,
            data: t
        });
    }, this.getData = function() {
        for(var e = [], s = 0; s < arguments.length; s++)e[s] = arguments[s];
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(d, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(e), !1), void 0, function(e) {
            return void 0 === e && (e = "appData"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
                switch(t.label){
                    case 0:
                        return [
                            4,
                            this.send({
                                eventName: f.GET_DATA,
                                key: e
                            })
                        ];
                    case 1:
                        return [
                            2,
                            t.sent()
                        ];
                }
            });
        });
    }, this.proxyToListeners = function(i) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(d, void 0, void 0, function() {
            var r, s = this;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(a) {
                return r = i.data.messageBusEvent, "https://liff-subwindow.line.me" !== i.origin ? [
                    2
                ] : r ? (this.sentMessages.includes(b(r)) || r.identifier !== this.identification.identifier || r.action !== l.BROADCAST && !r.replyTarget || this.listeners.forEach(function(i) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(s, void 0, void 0, function() {
                        var t, s, a;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                            switch(n.label){
                                case 0:
                                    return t = i, s = [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])({}, r)
                                    ], a = {}, [
                                        4,
                                        this.getDecryptedContext(r.context)
                                    ];
                                case 1:
                                    return t.apply(void 0, [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"].apply(void 0, s.concat([
                                            (a.context = n.sent(), a)
                                        ]))
                                    ]), [
                                        2
                                    ];
                            }
                        });
                    });
                }), [
                    2
                ]) : [
                    2
                ];
            });
        });
    }, this.getEncryptedContext = function(e) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(d, void 0, void 0, function() {
            var t, i, r, s, a, o, c;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                switch(n.label){
                    case 0:
                        return t = this.identification, i = t.identifier, r = t.cryptoKey, a = (s = JSON).stringify, c = {
                            eventName: e.eventName,
                            key: e.key ? e.key : void 0
                        }, e.data ? [
                            4,
                            w(i, r, JSON.stringify(e.data))
                        ] : [
                            3,
                            2
                        ];
                    case 1:
                        return o = n.sent(), [
                            3,
                            3
                        ];
                    case 2:
                        o = void 0, n.label = 3;
                    case 3:
                        return [
                            2,
                            a.apply(s, [
                                (c.data = o, c)
                            ])
                        ];
                }
            });
        });
    }, this.getDecryptedContext = function(i) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(d, void 0, void 0, function() {
            var t, r, s, a, o, c, d, u;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                switch(n.label){
                    case 0:
                        return t = this.identification, r = t.identifier, s = t.cryptoKey, (a = JSON.parse(i)).data && "string" == typeof a.data ? (u = (d = JSON).parse, [
                            4,
                            y(r, s, a.data)
                        ]) : [
                            3,
                            2
                        ];
                    case 1:
                        return c = u.apply(d, [
                            n.sent()
                        ]), [
                            3,
                            3
                        ];
                    case 2:
                        c = void 0, n.label = 3;
                    case 3:
                        return o = c, [
                            2,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])({}, a), {
                                data: o
                            })
                        ];
                }
            });
        });
    }, this.windowType = o;
};
;
}),
"[project]/music-studio-app/node_modules/@liff/native-bridge/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addListener",
    ()=>s,
    "call",
    ()=>w,
    "createEvent",
    ()=>l,
    "dispatch",
    ()=>v,
    "postMessage",
    ()=>p,
    "removeListener",
    ()=>u
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/logger/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
;
;
;
;
;
function l(e) {
    return new CustomEvent(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LIFF_EVENT"], {
        detail: e
    });
}
!function() {
    if ("undefined" != typeof window && "function" != typeof window.CustomEvent) {
        function t(t, e) {
            var i = e || {}, o = i.bubbles, n = void 0 !== o && o, a = i.cancelable, r = void 0 !== a && a, d = i.detail, l = void 0 === d ? void 0 : d, f = document.createEvent("CustomEvent");
            return f.initCustomEvent(t, n, r, l), f;
        }
        t.prototype = Event.prototype, window.CustomEvent = t;
    }
}();
var f = {}, c = !1;
function s(e, i) {
    c || (c = !0, window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LIFF_EVENT"], function(t) {
        t && t.detail && t.detail.type && f[t.detail.type] && f[t.detail.type].forEach(function(e) {
            return e(t);
        });
    })), f[e] ? f[e].push(i) : f[e] = [
        i
    ];
}
function u(t, e) {
    var i = f[t];
    if (i && Array.isArray(i)) {
        var o = i.indexOf(e);
        o >= 0 && i.splice(o, 1);
    }
}
function v(t) {
    var i = {};
    try {
        i = JSON.parse(t);
    } catch (r) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], r.message);
    }
    var a = l(i);
    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[client dispatchEvent to js]", {
        type: a.type,
        detail: a.detail
    }), window.dispatchEvent(a);
}
function p(t, a, d) {
    void 0 === a && (a = {}), void 0 === d && (d = "");
    var l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeatureToken"])();
    if (!l) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"], "Invalid featureToken for client features");
    if (!window._liff || !window._liff.postMessage) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "postMessage is not available from client");
    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[js postMessage to client]", t, d, a), window._liff.postMessage(t, l, d, JSON.stringify(a));
}
function w(t, e, l) {
    return void 0 === e && (e = {}), void 0 === l && (l = {
        once: !0
    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeatureToken"])() ? (l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])({
        callbackId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomAlphaNumericString"])(12),
        once: !0
    }, l), new Promise(function(i, n) {
        var a = function(e) {
            if (e && e.detail) {
                var r = e.detail.callbackId === l.callbackId, d = "string" != typeof e.detail.callbackId;
                (r || d) && (l.once && u(t, a), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[callback detail]", e.detail), e.detail.error ? n(e.detail.error) : e.detail.data ? i(e.detail.data) : n(e.detail));
            }
            n();
        };
        s(t, a), p(t, e, l.callbackId);
    })) : Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"], "Invalid featureToken for client features"));
}
;
}),
"[project]/music-studio-app/node_modules/@liff/close-window/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CloseWindowModule",
    ()=>l,
    "closeWindow",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-os/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-line-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/native-bridge/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
;
;
function r() {
    var o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLineVersion"])();
    null !== o && ("ios" === (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareVersion"])(o, "9.19") >= 0 || "android" === (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareVersion"])(o, "11.6.0") >= 0) ? location.href = "liff://close" : window._liff && window._liff.postMessage ? null !== o && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareVersion"])(o, "10.15.0") >= 0 ? "ios" === (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])() ? window._liff.postMessage("closeWindow", "") : window._liff.postMessage("closeWindow", "", "", "") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["call"])("closeWindow") : window.close();
}
var l = function(i) {
    function n() {
        return null !== i && i.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(n, i), Object.defineProperty(n.prototype, "name", {
        get: function() {
            return "closeWindow";
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.install = function() {
        return function() {
            return r();
        };
    }, n;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/sub-window/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubWindowModule",
    ()=>Rt,
    "getAppData",
    ()=>At,
    "getMSTByMSIT",
    ()=>Dt,
    "getMainWindowOrigin",
    ()=>lt,
    "getMessageBus",
    ()=>ut,
    "initMessageBus",
    ()=>st,
    "setMainWindowOrigin",
    ()=>ft,
    "subWindow",
    ()=>Jt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-api-available/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/logger/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-os/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/server-api/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$message$2d$bus$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/message-bus/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-sub-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$close$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/close-window/lib/index.es.js [app-client] (ecmascript)");
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
;
function G(t) {
    var e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("subWindowGetOrigin");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])(e(t));
}
var V = {};
function F(t, e) {
    t && V[t] && V[t].forEach(function(t) {
        t(e);
    });
}
function _(t, e) {
    V[t] || (V[t] = []), V[t].push(e);
}
function q(t, e) {
    if (V[t]) {
        var n = V[t].indexOf(e);
        n >= 0 && V[t].splice(n, 1);
    }
}
var z, H, Q, X, Y, Z = function() {
    function t(t) {
        this.storage = t;
    }
    return t.prototype.getItem = function(t) {
        return this.storage.getItem("".concat(this.getKeyPrefix(), ":").concat(t));
    }, t.prototype.setItem = function(t, e) {
        this.storage.setItem("".concat(this.getKeyPrefix(), ":").concat(t), e);
    }, t.prototype.removeItem = function(t) {
        this.storage.removeItem("".concat(this.getKeyPrefix(), ":").concat(t));
    }, t.prototype.clear = function() {
        this.storage.clear();
    }, t.prototype.getKeyPrefix = function() {
        return "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORE_KEY"], ":").concat(this.getLiffId());
    }, t.prototype.getLiffId = function() {
        var t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId;
        if (!t) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_CONFIG"], "liffId is necessary for liff.init()");
        return t;
    }, t;
}(), $ = new Z(new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InMemoryStorage"]);
function tt() {
    var t = $.getItem("subWindowStatusUpdated");
    return null !== t && JSON.parse(t);
}
function et(t) {
    $.setItem("subWindowStatusUpdated", String(t));
}
function nt(t) {
    z = t;
}
function rt() {
    return z;
}
function it() {
    return Q;
}
function ot() {
    return X;
}
function st() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, arguments, void 0, function(t) {
        return void 0 === t && (t = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$message$2d$bus$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].MAIN), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
            switch(e.label){
                case 0:
                    return [
                        4,
                        (Y = new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$message$2d$bus$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageBus"](t)).setup()
                    ];
                case 1:
                    return e.sent(), [
                        2,
                        Y
                    ];
            }
        });
    });
}
function ut() {
    return Y;
}
var at = new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InMemoryStorage"], ct = new Z((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNonBrowserEnvironment"])() ? at : window.sessionStorage);
function ft(t) {
    ct.setItem("mainWindowOrigin", t);
}
function lt() {
    return ct.getItem("mainWindowOrigin");
}
function dt(n) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, arguments, void 0, function(t, n) {
        var r, i, o, s, u, a, c, f;
        return void 0 === n && (n = {}), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
            switch(e.label){
                case 0:
                    if (null == (r = ut()) ? void 0 : r.isReady()) return [
                        3,
                        5
                    ];
                    if (i = JSON.stringify(n), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId, s = lt(), !window.opener || !s || !o) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXCEPTION_IN_SUBWINDOW"]);
                    u = !1, e.label = 1;
                case 1:
                    return e.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]), [
                        4,
                        G(o)
                    ];
                case 2:
                    return a = e.sent(), u = a.subwindowCommonModule, [
                        3,
                        4
                    ];
                case 3:
                    throw c = e.sent(), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug(c), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXCEPTION_IN_SUBWINDOW"]);
                case 4:
                    return f = u ? s : location.origin, [
                        2,
                        new Promise(function(e) {
                            window.addEventListener("message", function n(r) {
                                mt(r) && (window.removeEventListener("message", n), e({
                                    status: t,
                                    result: i
                                }));
                            }), window.opener.postMessage({
                                status: t,
                                result: i
                            }, f);
                        })
                    ];
                case 5:
                    return r.send({
                        eventName: t,
                        data: n
                    }), [
                        4,
                        new Promise(function(t) {
                            setTimeout(t, 500);
                        })
                    ];
                case 6:
                    return e.sent(), [
                        2,
                        {
                            status: t,
                            result: JSON.stringify(n)
                        }
                    ];
            }
        });
    });
}
function mt(t) {
    return !(!t.data || "string" != typeof t.data.type || ![
        __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].SUBMIT,
        __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CANCEL
    ].includes(t.data.type));
}
function vt(t) {
    var e, n = ot();
    if (t.origin === n) {
        var r = t.data;
        if (r) {
            var i, o = r.status, s = r.result;
            try {
                i = JSON.parse(s || "{}");
            } catch (u) {
                i = {};
            }
            switch(o){
                case __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_HEALTH_CHECK_MESSAGE"]:
                    window.clearInterval(it()), gt();
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CANCEL:
                case __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].SUBMIT:
                    et(!0), window.clearInterval(it()), window.removeEventListener("message", vt), F(o, i), null === (e = rt()) || void 0 === e || e.postMessage({
                        type: o
                    }, ot());
                    break;
                default:
                    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("unexpected message");
            }
        }
    }
}
var pt = function(n) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(void 0, void 0, void 0, function() {
        var t, r, i, o;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
            if (tt()) return [
                2
            ];
            switch(t = n.context, r = t.eventName, i = t.data, o = ut(), r){
                case __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].INIT:
                    wt(!i.hasOpener);
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CANCEL:
                case __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].SUBMIT:
                    et(!0), F(r, i), null == o || o.reply(n, {
                        eventName: r
                    });
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CLOSE:
                    !1 === tt() && (et(!0), F(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CLOSE, {})), gt();
            }
            return [
                2
            ];
        });
    });
};
function ht() {
    window.clearInterval(H), window.clearInterval(it()), window.removeEventListener("message", vt);
}
function wt(t) {
    if (void 0 === t && (t = !1), ht(), et(!1), t) {
        var e = rt();
        e && (e.close(), nt(null));
    }
}
function gt() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
            switch(e.label){
                case 0:
                    return (t = ut()) ? [
                        4,
                        t.teardown()
                    ] : [
                        3,
                        2
                    ];
                case 1:
                    e.sent(), e.label = 2;
                case 2:
                    return [
                        2
                    ];
            }
        });
    });
}
function bt(i) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t, o, s, u, a, c, f, l, b, y, S, I;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
            switch(e.label){
                case 0:
                    return (t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractLiffId"])(i.url)) ? (wt(!0), [
                        4,
                        gt()
                    ]) : [
                        2,
                        Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "params.url must be liff url or mini url"))
                    ];
                case 1:
                    return e.sent(), nt("ios" !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isIpad"])() ? window.open("", "liffsubwindow", "width=480, height=640, menubar=no, toolbar=no, scrollbars=yes") : window.open()), o = i.url, s = i.appData, (u = new URL(o)).searchParams.append(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_IDNTIFICATION_KEY"], "true"), [
                        4,
                        st()
                    ];
                case 2:
                    return a = e.sent(), u.searchParams.append(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$message$2d$bus$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IDENTIFIER_KEY"], a.identification.identifier), u.searchParams.append(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$message$2d$bus$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CRYPTO_KEY"], a.identification.cryptoKey), u.hostname = function(t) {
                        var e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(t.split(".")), i = e[0], o = e.slice(1);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([
                            "".concat(i, "-ext")
                        ], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(o), !1).join(".");
                    }(u.hostname), c = u.toString(), [
                        4,
                        G(t)
                    ];
                case 3:
                    if (f = e.sent(), l = f.origin, b = f.subwindowCommonModule, !(y = rt())) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREATE_SUBWINDOW_FAILED"]);
                    if (!b) return y.close(), [
                        2
                    ];
                    !function(t) {
                        X = t;
                    }(l), a.listen(pt), a.setData("appData", s), window.addEventListener("message", vt), e.label = 4;
                case 4:
                    return e.trys.push([
                        4,
                        6,
                        ,
                        7
                    ]), [
                        4,
                        null === (I = i.onBeforeTransition) || void 0 === I ? void 0 : I.call(i)
                    ];
                case 5:
                    return e.sent(), [
                        3,
                        7
                    ];
                case 6:
                    throw S = e.sent(), y.close(), S;
                case 7:
                    return y.location.href = c, P = function(t, e) {
                        var n = rt(), r = {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_HEALTH_CHECK_MESSAGE"]
                        };
                        return e && (r.message = JSON.stringify(e)), window.setInterval(function() {
                            null == n || n.postMessage(r, t);
                        }, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_HEALTH_CHECK_INTERVAL"]);
                    }(l, s), Q = P, function(t) {
                        H = t;
                    }(window.setInterval(function() {
                        var t = rt();
                        t && t.closed && (ht(), nt(null), !1 === tt() && (et(!0), F(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CLOSE, {})));
                    }, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_MONITOR_CLOSE_INTERVAL"])), [
                        2
                    ];
            }
            var P;
        });
    });
}
var yt = null;
function St(i) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var o, s, u, a, c, f, l, m, v, h, w, g, y, S, I = this;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(P) {
            switch(P.label){
                case 0:
                    if (o = i.msit, s = i.mstChallenge, u = i.reconnectCount, a = void 0 === u ? 0 : u, c = function() {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(I, void 0, void 0, function() {
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
                                switch(t.label){
                                    case 0:
                                        return [
                                            4,
                                            (e = 1e3, new Promise(function(t) {
                                                return setTimeout(t, e);
                                            }))
                                        ];
                                    case 1:
                                        return t.sent(), [
                                            4,
                                            St({
                                                msit: o,
                                                mstChallenge: s,
                                                onSuccess: i.onSuccess,
                                                onError: i.onError,
                                                reconnectCount: a + 1
                                            })
                                        ];
                                    case 2:
                                        return t.sent(), [
                                            2
                                        ];
                                }
                                var e;
                            });
                        });
                    }, f = function() {
                        for(var t = [], e = 0; e < arguments.length; e++)t[e] = arguments[e];
                        yt = null, i.onSuccess.apply(i, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(t), !1));
                    }, l = function() {
                        for(var t = [], e = 0; e < arguments.length; e++)t[e] = arguments[e];
                        yt = null, i.onError.apply(i, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(t), !1));
                    }, m = Date.now(), null === yt && (yt = m), v = m - yt, a >= 10 || v > 6e5) return l((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], "Failed to connect")), [
                        2
                    ];
                    P.label = 1;
                case 1:
                    return P.trys.push([
                        1,
                        3,
                        ,
                        5
                    ]), [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestWithoutErrorHandling"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("subWindowSubscribe"), {
                            method: "POST",
                            body: JSON.stringify({
                                msit: o,
                                mstChallenge: s
                            })
                        })
                    ];
                case 2:
                    return h = P.sent(), [
                        3,
                        5
                    ];
                case 3:
                    return P.sent(), [
                        4,
                        c()
                    ];
                case 4:
                    return P.sent(), [
                        2
                    ];
                case 5:
                    return h.status >= 500 ? [
                        4,
                        c()
                    ] : [
                        3,
                        7
                    ];
                case 6:
                    return P.sent(), [
                        3,
                        17
                    ];
                case 7:
                    return h.status >= 400 && 500 > h.status ? [
                        4,
                        It(h)
                    ] : [
                        3,
                        9
                    ];
                case 8:
                    return g = P.sent(), w = g ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], g.errorDetail) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], "Some error happened in the server"), l(w), [
                        3,
                        17
                    ];
                case 9:
                    return 200 !== h.status ? [
                        3,
                        16
                    ] : [
                        4,
                        It(h)
                    ];
                case 10:
                    if (!(g = P.sent())) return l((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], "Some error happened in the server")), [
                        2
                    ];
                    switch(y = g.status, S = g.result, y){
                        case __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].ERROR:
                            return [
                                3,
                                11
                            ];
                        case __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CLOSE:
                        case __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CANCEL:
                        case __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].SUBMIT:
                            return [
                                3,
                                13
                            ];
                    }
                    return [
                        3,
                        14
                    ];
                case 11:
                    return [
                        4,
                        c()
                    ];
                case 12:
                    return P.sent(), [
                        3,
                        15
                    ];
                case 13:
                    return f(y, S), [
                        3,
                        15
                    ];
                case 14:
                    l((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], "Some error happened in the server")), P.label = 15;
                case 15:
                    return [
                        3,
                        17
                    ];
                case 16:
                    l((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], "Some error happened in the server")), P.label = 17;
                case 17:
                    return [
                        2
                    ];
            }
        });
    });
}
function It(n) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
            switch(t.label){
                case 0:
                    return t.trys.push([
                        0,
                        2,
                        ,
                        3
                    ]), [
                        4,
                        n.json()
                    ];
                case 1:
                    return [
                        2,
                        t.sent()
                    ];
                case 2:
                    return t.sent(), [
                        2,
                        null
                    ];
                case 3:
                    return [
                        2
                    ];
            }
        });
    });
}
function Ot(t) {
    var e = {};
    return Object.keys(t).forEach(function(n) {
        "closeButtonColor" === n ? "white" === t[n] ? e[n] = "#ffffff" : e[n] = "#000000" : e[n] = t[n];
    }), e;
}
var Pt = {
    height: "full",
    closeButtonPosition: "right",
    closeButtonColor: "black",
    closeButtonLabel: ""
};
function Ct(n) {
    var r = n.appData, i = n.native, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId, s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMSTChallenge"])(), u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractLiffId"])(n.url);
    if (!o) return Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "liffId is invalid"));
    if (!s) return Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "mst_challenge is invalid"));
    if (!u) return Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "params.url must be liff url or mini url"));
    var a = Object.assign({}, Pt, i);
    return (function(t) {
        var e = t.mainLiffId, n = t.subLiffId, r = t.mstChallenge, i = t.appData, o = t.view;
        return e && r ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("subWindowGetMSIT"), {
            method: "POST",
            body: JSON.stringify({
                mainLiffId: e,
                subLiffId: n,
                mstChallenge: r,
                appData: i,
                view: o
            })
        }) : Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "no proper argument"));
    })({
        mainLiffId: o,
        subLiffId: u,
        mstChallenge: s,
        appData: r,
        view: Ot(a)
    }).then(function(t) {
        var e = t.msit;
        return St({
            msit: e,
            mstChallenge: s,
            onSuccess: function(t, e) {
                F(t, e);
            },
            onError: function(t) {
                F(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].ERROR, t);
            }
        }), e;
    }).then(function(r) {
        return function(n, r) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
                var t, i, o;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                    switch(e.label){
                        case 0:
                            return t = n.url, (i = new URLSearchParams).set("msit", r), [
                                4,
                                null === (o = n.onBeforeTransition) || void 0 === o ? void 0 : o.call(n)
                            ];
                        case 1:
                            return e.sent(), location.href = "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_MODAL_SCHEME_URL"], "?url=").concat(encodeURIComponent(t), "&").concat(i.toString()), [
                                2
                            ];
                    }
                });
            });
        }(n, r);
    });
}
function Lt(t) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validators"].subwindowOpen(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? Ct(t) : bt(t);
}
function Et(t) {
    if (!t.mst || !t.status) return Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "no proper argument"));
    var e = JSON.stringify(t);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("subWindowPost"), {
        method: "POST",
        body: e
    });
}
function Nt() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSubWindow"])()) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "this api can be only called in child window");
}
function Tt(n) {
    return void 0 === n && (n = {}), Nt(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, arguments, void 0, function(t) {
            var n, r;
            return void 0 === t && (t = {}), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                switch(e.label){
                    case 0:
                        return (n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMST"])()) ? [
                            4,
                            Et({
                                mst: n,
                                status: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CANCEL,
                                result: t
                            })
                        ] : [
                            2,
                            Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "mst is invalid"))
                        ];
                    case 1:
                        return r = e.sent(), et(!0), [
                            2,
                            r
                        ];
                }
            });
        });
    }(n) : function(t) {
        return void 0 === t && (t = {}), dt(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CANCEL, t);
    }(n);
}
function jt(n) {
    return void 0 === n && (n = {}), Nt(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, arguments, void 0, function(t) {
            var n, r;
            return void 0 === t && (t = {}), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                switch(e.label){
                    case 0:
                        return (n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMST"])()) ? [
                            4,
                            Et({
                                mst: n,
                                status: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].SUBMIT,
                                result: t
                            })
                        ] : [
                            2,
                            Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "mst is invalid"))
                        ];
                    case 1:
                        return r = e.sent(), et(!0), [
                            2,
                            r
                        ];
                }
            });
        });
    }(n) : function(t) {
        return void 0 === t && (t = {}), dt(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].SUBMIT, t);
    }(n);
}
function Mt() {
    return Nt(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            var t;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                switch(e.label){
                    case 0:
                        return !1 !== tt() ? [
                            3,
                            2
                        ] : (t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMST"])()) ? [
                            4,
                            Et({
                                mst: t,
                                status: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CLOSE,
                                result: {}
                            })
                        ] : [
                            2,
                            Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "mst is invalid"))
                        ];
                    case 1:
                        e.sent(), e.label = 2;
                    case 2:
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$close$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closeWindow"])(), [
                            2
                        ];
                }
            });
        });
    }() : function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            var t;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                return (null == (t = ut()) ? void 0 : t.isReady()) ? (t.send({
                    eventName: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CLOSE
                }), [
                    2,
                    new Promise(function(t) {
                        setTimeout(function() {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$close$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closeWindow"])(), t();
                        }, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_HEALTH_CHECK_INTERVAL"]);
                    })
                ]) : ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$close$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closeWindow"])(), [
                    2,
                    Promise.resolve()
                ]);
            });
        });
    }();
}
function Bt() {
    return Nt(), function() {
        var t, e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppData"])();
        try {
            t = e ? JSON.parse(e) : {};
        } catch (n) {
            t = {};
        }
        return Promise.resolve(t);
    }();
}
function Dt(t) {
    var e = t.msit, n = t.mstVerifier;
    return e && n ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("subWindowGetMSTByMSIT"), {
        method: "POST",
        body: JSON.stringify({
            msit: e,
            mstVerifier: n
        })
    }) : Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "no proper argument"));
}
function At(t) {
    var e = t.mst;
    return e ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("subWindowGetAppData"), {
        method: "POST",
        body: JSON.stringify({
            mst: e
        })
    }) : Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "no proper argument"));
}
var Jt = {
    on: _,
    off: q,
    open: Lt,
    cancel: Tt,
    submit: jt,
    close: Mt,
    getAppData: Bt
}, Rt = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(e, t), Object.defineProperty(e.prototype, "name", {
        get: function() {
            return "subWindow";
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.install = function() {
        var t = this;
        return {
            on: _.bind(this),
            off: q.bind(this),
            open: function(e) {
                return Lt.call(t, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])({}, e), {
                    onBeforeTransition: void 0
                }));
            },
            cancel: Tt.bind(this),
            submit: jt.bind(this),
            close: Mt.bind(this),
            getAppData: Bt.bind(this)
        };
    }, e;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/tiny-sha256/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        ((r)=>r !== undefined && __turbopack_context__.v(r))(factory());
    } else if (("TURBOPACK compile-time value", "object") !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        global.sha256 = factory();
    }
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function() {
    var sha256 = function sha256(ascii) {
        function rightRotate(value, amount) {
            return value >>> amount | value << 32 - amount;
        }
        ;
        var mathPow = Math.pow;
        var maxWord = mathPow(2, 32);
        var lengthProperty = 'length';
        var i, j; // Used as a counter across the whole file
        var result = '';
        var words = [];
        var asciiBitLength = ascii[lengthProperty] * 8;
        //* caching results is optional - remove/add slash from front of this line to toggle
        // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
        // (we actually calculate the first 64, but extra values are just ignored)
        var hash = sha256.h = sha256.h || [];
        // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
        var k = sha256.k = sha256.k || [];
        var primeCounter = k[lengthProperty];
        /*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/ var isComposite = {};
        for(var candidate = 2; primeCounter < 64; candidate++){
            if (!isComposite[candidate]) {
                for(i = 0; i < 313; i += candidate){
                    isComposite[i] = candidate;
                }
                hash[primeCounter] = mathPow(candidate, .5) * maxWord | 0;
                k[primeCounter++] = mathPow(candidate, 1 / 3) * maxWord | 0;
            }
        }
        ascii += '\x80'; // Append '1' bit (plus zero padding)
        while(ascii[lengthProperty] % 64 - 56)ascii += '\x00'; // More zero padding
        for(i = 0; i < ascii[lengthProperty]; i++){
            j = ascii.charCodeAt(i);
            if (j >> 8) return; // ASCII check: only accept characters in range 0-255
            words[i >> 2] |= j << (3 - i) % 4 * 8;
        }
        words[words[lengthProperty]] = asciiBitLength / maxWord | 0;
        words[words[lengthProperty]] = asciiBitLength;
        // process each chunk
        for(j = 0; j < words[lengthProperty];){
            var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
            var oldHash = hash;
            // This is now the "working hash", often labelled as variables a...g
            // (we have to truncate as well, otherwise extra entries at the end accumulate
            hash = hash.slice(0, 8);
            for(i = 0; i < 64; i++){
                var i2 = i + j;
                // Expand the message into 64 words
                // Used below if 
                var w15 = w[i - 15], w2 = w[i - 2];
                // Iterate
                var a = hash[0], e = hash[4];
                var temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                 + (e & hash[5] ^ ~e & hash[6]) // ch
                 + k[i] + (w[i] = i < 16 ? w[i] : w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ w15 >>> 3) // s0
                 + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ w2 >>> 10) // s1
                 | 0);
                // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
                var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                 + (a & hash[1] ^ a & hash[2] ^ hash[1] & hash[2]); // maj
                hash = [
                    temp1 + temp2 | 0
                ].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
                hash[4] = hash[4] + temp1 | 0;
            }
            for(i = 0; i < 8; i++){
                hash[i] = hash[i] + oldHash[i] | 0;
            }
        }
        for(i = 0; i < 8; i++){
            for(j = 3; j + 1; j--){
                var b = hash[i] >> j * 8 & 255;
                result += (b < 16 ? 0 : '') + b.toString(16);
            }
        }
        return result;
    };
    sha256.code = "var sha256=function a(b){function c(a,b){return a>>>b|a<<32-b}for(var d,e,f=Math.pow,g=f(2,32),h=\"length\",i=\"\",j=[],k=8*b[h],l=a.h=a.h||[],m=a.k=a.k||[],n=m[h],o={},p=2;64>n;p++)if(!o[p]){for(d=0;313>d;d+=p)o[d]=p;l[n]=f(p,.5)*g|0,m[n++]=f(p,1/3)*g|0}for(b+=\"\\x80\";b[h]%64-56;)b+=\"\\x00\";for(d=0;d<b[h];d++){if(e=b.charCodeAt(d),e>>8)return;j[d>>2]|=e<<(3-d)%4*8}for(j[j[h]]=k/g|0,j[j[h]]=k,e=0;e<j[h];){var q=j.slice(e,e+=16),r=l;for(l=l.slice(0,8),d=0;64>d;d++){var s=q[d-15],t=q[d-2],u=l[0],v=l[4],w=l[7]+(c(v,6)^c(v,11)^c(v,25))+(v&l[5]^~v&l[6])+m[d]+(q[d]=16>d?q[d]:q[d-16]+(c(s,7)^c(s,18)^s>>>3)+q[d-7]+(c(t,17)^c(t,19)^t>>>10)|0),x=(c(u,2)^c(u,13)^c(u,22))+(u&l[1]^u&l[2]^l[1]&l[2]);l=[w+x|0].concat(l),l[4]=l[4]+w|0}for(d=0;8>d;d++)l[d]=l[d]+r[d]|0}for(d=0;8>d;d++)for(e=3;e+1;e--){var y=l[d]>>8*e&255;i+=(16>y?0:\"\")+y.toString(16)}return i};";
    return sha256;
});
}),
"[project]/music-studio-app/node_modules/@liff/hooks/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsyncHook",
    ()=>a,
    "AsyncSeriesHook",
    ()=>o,
    "SyncHook",
    ()=>s
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
;
var s = function() {
    var e = this;
    this.type = "sync", this.fns = new Set, this.on = function(n) {
        e.fns.add(n);
    }, this.call = function() {
        for(var i, s, a = [], o = 0; o < arguments.length; o++)a[o] = arguments[o];
        try {
            for(var l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__values"])(e.fns), c = l.next(); !c.done; c = l.next()){
                var f = c.value;
                f.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(a), !1));
            }
        } catch (u) {
            i = {
                error: u
            };
        } finally{
            try {
                c && !c.done && (s = l.return) && s.call(l);
            } finally{
                if (i) throw i.error;
            }
        }
    };
}, a = function() {
    var s = this;
    this.type = "async", this.fns = new Set, this.on = function(n) {
        s.fns.add(n);
    }, this.call = function() {
        for(var a = [], o = 0; o < arguments.length; o++)a[o] = arguments[o];
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(s, void 0, void 0, function() {
            var e, s, o, l, c, f;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(i) {
                switch(i.label){
                    case 0:
                        e = [];
                        try {
                            for(s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__values"])(this.fns), o = s.next(); !o.done; o = s.next())l = o.value, e.push(l.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(a), !1)));
                        } catch (u) {
                            c = {
                                error: u
                            };
                        } finally{
                            try {
                                o && !o.done && (f = s.return) && f.call(s);
                            } finally{
                                if (c) throw c.error;
                            }
                        }
                        return [
                            4,
                            Promise.all(e)
                        ];
                    case 1:
                        return i.sent(), [
                            2
                        ];
                }
            });
        });
    };
}, o = function() {
    var s = this;
    this.type = "asyncSeries", this.fns = new Set, this.on = function(n) {
        s.fns.add(n);
    }, this.call = function() {
        for(var a = [], o = 0; o < arguments.length; o++)a[o] = arguments[o];
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(s, void 0, void 0, function() {
            var e, s, o, l, c;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(i) {
                switch(i.label){
                    case 0:
                        i.trys.push([
                            0,
                            5,
                            6,
                            7
                        ]), e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__values"])(this.fns), s = e.next(), i.label = 1;
                    case 1:
                        return s.done ? [
                            3,
                            4
                        ] : [
                            4,
                            s.value.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(a), !1))
                        ];
                    case 2:
                        i.sent(), i.label = 3;
                    case 3:
                        return s = e.next(), [
                            3,
                            1
                        ];
                    case 4:
                        return [
                            3,
                            7
                        ];
                    case 5:
                        return o = i.sent(), l = {
                            error: o
                        }, [
                            3,
                            7
                        ];
                    case 6:
                        try {
                            s && !s.done && (c = e.return) && c.call(e);
                        } finally{
                            if (l) throw l.error;
                        }
                        return [
                            7
                        ];
                    case 7:
                        return [
                            2
                        ];
                }
            });
        });
    };
};
;
}),
"[project]/music-studio-app/node_modules/@liff/login/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoginModule",
    ()=>w,
    "login",
    ()=>v
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/logger/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/server-api/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-sub-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tiny$2d$sha256$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tiny-sha256/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$hooks$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/hooks/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/sub-window/lib/index.es.js [app-client] (ecmascript)");
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
;
var v = function(i) {
    var o, r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomAlphaNumericString"])(43), d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBase64"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tiny$2d$sha256$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(r)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, ""), _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
    if (!_ || !_.liffId) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_CONFIG"], "You need to define `liffId` for liff.login()");
    var v = {
        app_id: _.liffId,
        state: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomAlphaNumericString"])(12),
        response_type: "code",
        code_challenge_method: "S256",
        code_challenge: d,
        liff_sdk_version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVersion"])()
    };
    i && i.redirectUri && (v.redirect_uri = i.redirectUri), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSubWindow"])() && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() && ((null === (o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMessageBus"])()) || void 0 === o ? void 0 : o.isReady()) ? v.redirect_uri = window.location.href : v.disable_auto_login = "true"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setLoginTmp"])({
        codeVerifier: r
    });
    var w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("authorize") + "?" + __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].stringify(v);
    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[Redirect] ".concat(w)), window.location.href = w;
}, w = function(e) {
    function t() {
        var i = e.apply(this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(arguments), !1)) || this;
        return i.hooks = {
            before: new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$hooks$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SyncHook"]
        }, i;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(t, e), Object.defineProperty(t.prototype, "name", {
        get: function() {
            return "login";
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.install = function() {
        return this._login.bind(this);
    }, t.prototype._login = function(i) {
        this.hooks.before.call(i), v(i);
    }, t;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/i18n/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I18nModule",
    ()=>d,
    "module",
    ()=>h,
    "t",
    ()=>p
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/server-api/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
;
var a, u = "undefined" == typeof navigator ? "en" : null !== (a = navigator.language) && void 0 !== a ? a : "en", c = null;
function l(n) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
            switch(t.label){
                case 0:
                    return u = n, [
                        4,
                        f()
                    ];
                case 1:
                    return t.sent(), [
                        2
                    ];
            }
        });
    });
}
function f() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var n, t;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
            switch(e.label){
                case 0:
                    return [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])("".concat("https://liffsdk.line-scdn.net/xlt/manifest.json"), {
                            method: "GET",
                            headers: {
                                Accept: "application/json"
                            }
                        })
                    ];
                case 1:
                    return n = e.sent(), t = "".concat(u), !n.languages[t] && u.includes("-") && (t = u.split("-")[0]), n.languages[t] || (t = "en"), [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])("".concat("https://liffsdk.line-scdn.net/xlt", "/").concat(n.languages[t]), {
                            method: "GET",
                            headers: {
                                Accept: "application/json"
                            }
                        })
                    ];
                case 2:
                    return c = e.sent(), [
                        2
                    ];
            }
        });
    });
}
function p(n) {
    if (null === c) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "please call xlt after liff.init");
    return c[n];
}
var d = function(i) {
    function r() {
        return null !== i && i.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(r, i), Object.defineProperty(r.prototype, "name", {
        get: function() {
            return "i18n";
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.install = function(n) {
        return n.internalHooks.init.beforeFinished(this.beforeInitFinished.bind(this)), {
            setLang: l
        };
    }, r.prototype.beforeInitFinished = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                switch(n.label){
                    case 0:
                        return [
                            4,
                            f()
                        ];
                    case 1:
                        return n.sent(), [
                            2
                        ];
                }
            });
        });
    }, r;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]), h = new d;
;
}),
"[project]/music-studio-app/node_modules/@liff/init/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InitModule",
    ()=>lt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$ready$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/ready/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-logged-in/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$check$2d$availability$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/check-availability/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$extensions$2f$lib$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/extensions/lib/es/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logout$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/logout/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-sub-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permanent$2d$link$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/permanent-link/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/sub-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/server-api/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/logger/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-line-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/native-bridge/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-api-available/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-os/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$login$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/login/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$close$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/close-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$message$2d$bus$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/message-bus/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$hooks$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/hooks/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$i18n$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/i18n/lib/index.es.js [app-client] (ecmascript)");
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
;
var Ee = {
    iconColor: "#111111",
    statusBarColor: "BLACK",
    titleTextColor: "#111111",
    titleSubtextColor: "#B7B7B7",
    titleButtonColor: "#111111",
    titleBackgroundColor: "#FFFFFF",
    progressBarColor: "#06C755",
    progressBackgroundColor: "#FFFFFF",
    titleButtonAreaBackgroundColor: "#1FFFFFFF",
    titleButtonAreaBorderColor: "#26000000",
    baseBackgroundColor: "#FFFFFF",
    baseTextColor: "#000000",
    lightButtonBorderColor: "rgba(0, 0, 0, 0.15)"
}, Le = {
    iconColor: "#FFFFFF",
    statusBarColor: "WHITE",
    titleTextColor: "#FFFFFF",
    titleSubtextColor: "#949494",
    titleButtonColor: "#FFFFFF",
    titleBackgroundColor: "#111111",
    progressBarColor: "#06C755",
    progressBackgroundColor: "#111111",
    titleButtonAreaBackgroundColor: "#1FFFFFFF",
    titleButtonAreaBorderColor: "#26000000",
    baseBackgroundColor: "#000000",
    baseTextColor: "#FFFFFF",
    lightButtonBorderColor: "rgba(255, 255, 255, 0.5)"
};
function Ne() {
    var e;
    Ue("color-scheme", ((null == (e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])()) ? void 0 : e.menuColorSetting) || {
        adaptableColorSchemes: [
            "light"
        ]
    }).adaptableColorSchemes.join(" "));
    var t = window.matchMedia("(prefers-color-scheme: dark)");
    De({
        matches: null == t ? void 0 : t.matches,
        media: null == t ? void 0 : t.media
    }), t.addEventListener ? t.addEventListener("change", De) : t.addListener && t.addListener(De);
}
function De(t) {
    var n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])(), r = (null == n ? void 0 : n.menuColorSetting) || {
        adaptableColorSchemes: [
            "light"
        ],
        lightModeColor: Ee,
        darkModeColor: Le
    }, o = r.adaptableColorSchemes, i = r.lightModeColor, a = r.darkModeColor, c = o.includes("dark");
    t.matches && c ? Oe((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])({}, Le), a)) : Oe((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])({}, Ee), i));
}
function Oe(e) {
    var t = e.iconColor, n = e.statusBarColor, r = e.titleTextColor, o = e.titleSubtextColor, i = e.titleButtonColor, a = e.titleBackgroundColor, c = e.progressBarColor, s = e.progressBackgroundColor, l = e.titleButtonAreaBackgroundColor, d = e.titleButtonAreaBorderColor, h = e.baseBackgroundColor, p = e.baseTextColor, v = e.lightButtonBorderColor;
    Ue("--liff-base-background-color", h), Ue("--liff-base-text-color", p), Ue("--liff-base-background-rgb-color", (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertHexToRgb"])(h)), Ue("--liff-base-text-rgb-color", (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertHexToRgb"])(p)), Ue("--liff-light-button-border-color", v), Ue("--liff-title-text-color", r), Ue("--liff-title-background-color", a), Ue("--liff-title-button-color", i), Ue("--liff-icon-color", t), Ue("--liff-status-bar-color", n), Ue("--liff-title-subtext-color", o), Ue("--liff-progress-bar-color", c), Ue("--liff-progress-background-color", s), Ue("--liff-title-button-area-background-color", (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertArgbToRgba"])(l)), Ue("--liff-title-button-area-border-color", (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertArgbToRgba"])(d));
}
function Ue(e, t) {
    document.documentElement.style.setProperty(e, t);
}
var Pe = {
    addToHomeScreen: function(e) {
        if (!new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$check$2d$availability$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckAvailability"](e).invoke("addToHomeScreen")) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"], "No permission for liff.addToHomeScreen()");
    },
    scanCode: function(e) {
        if (!new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$check$2d$availability$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckAvailability"](e).invoke("scanCode")) return Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"], "No permission for liff.scanCode()"));
    },
    getAdvertisingId: function(e) {
        if (!new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$check$2d$availability$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckAvailability"](e).invoke("getAdvertisingId")) return Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"], "No permission for liff.getAdvertisingId()"));
    },
    initPlugins: function() {}
};
function We(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    return [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$extensions$2f$lib$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["load"])()
                    ];
                case 1:
                    return (t = n.sent()) ? (t.install(e, Pe), [
                        2
                    ]) : [
                        2
                    ];
            }
        });
    });
}
function je() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
            switch(e.label){
                case 0:
                    return [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("certs"))
                    ];
                case 1:
                    return [
                        2,
                        e.sent()
                    ];
            }
        });
    });
}
function Me(e, r, o) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    return [
                        4,
                        crypto.subtle.importKey("jwk", e, {
                            name: "ECDSA",
                            namedCurve: "P-256"
                        }, !1, [
                            "verify"
                        ])
                    ];
                case 1:
                    return t = n.sent(), [
                        4,
                        crypto.subtle.verify({
                            name: "ECDSA",
                            hash: {
                                name: "SHA-256"
                            }
                        }, t, o, r)
                    ];
                case 2:
                    return [
                        2,
                        n.sent()
                    ];
            }
        });
    });
}
function Re(e, o) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t, i, a, c, s, l, f, u, v, m, w, g, b, k, C, F;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    return t = e.split("."), i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(t, 3), a = i[0], c = i[1], s = i[2], l = JSON.parse(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base64Url"].decode(a)), f = JSON.parse(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base64Url"].decodeUnicode(c)), u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertArrayBuffer"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base64Url"].decode(s)), v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertArrayBuffer"])("".concat(a, ".").concat(c)), [
                        4,
                        je()
                    ];
                case 1:
                    if (m = n.sent(), !(w = m.keys.find(function(e) {
                        return e.kid === l.kid;
                    }))) return [
                        3,
                        6
                    ];
                    if (delete w.alg, "ES256" !== l.alg) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ID_TOKEN"], 'Invalid "alg" value in ID_TOKEN');
                    g = void 0, n.label = 2;
                case 2:
                    return n.trys.push([
                        2,
                        4,
                        ,
                        5
                    ]), [
                        4,
                        Me(w, v, u)
                    ];
                case 3:
                    return g = n.sent(), [
                        3,
                        5
                    ];
                case 4:
                    throw b = n.sent(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ID_TOKEN"], "".concat("Failed to use Crypto API to verify ID_TOKEN", ": ").concat(b));
                case 5:
                    if (g) {
                        if (k = f.iss !== "https://access.".concat("line.me"), C = f.aud !== o, F = 1e3 * f.exp < Date.now(), k) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ID_TOKEN"], 'Invalid "iss" value in ID_TOKEN');
                        if (C) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ID_TOKEN"], 'Invalid "aud" value in ID_TOKEN');
                        if (F) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ID_TOKEN"], 'Invalid "exp" value in ID_TOKEN');
                        return [
                            2,
                            f
                        ];
                    }
                    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ID_TOKEN"], "Invalid signature in ID_TOKEN");
                case 6:
                    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ID_TOKEN"], 'Invalid "kid" value in ID_TOKEN');
                case 7:
                    return [
                        2
                    ];
            }
        });
    });
}
function He(e) {
    var t = e.split(".");
    if (t[1]) try {
        var n = t[1].replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(window.atob(n));
    } catch (r) {
        return null;
    }
    return null;
}
function Ke(e) {
    var t = e.pathname, n = e.query, r = n ? "?".concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].stringify(n)) : "", o = "".concat("liff://").concat(t).concat(r);
    location.href = o;
}
var Ve = null;
function Je() {
    "boolean" == typeof Ve && __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warn("liff.init is not expected to be called more than once"), Ve = !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIsSubsequentLiffApp"])() || !(!(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() || __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].parse(window.location.hash).feature_token || (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeatureToken"])()) && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setIsSubsequentLiffApp"])(!0), !0);
}
function qe() {
    return Boolean(Ve);
}
function ze(e, r) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    return (t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMST"])()) ? [
                        2,
                        t
                    ] : e && r ? [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMSTByMSIT"])({
                            msit: e,
                            mstVerifier: r
                        })
                    ] : [
                        3,
                        2
                    ];
                case 1:
                    return [
                        2,
                        n.sent().mst
                    ];
                case 2:
                    return [
                        2,
                        null
                    ];
            }
        });
    });
}
function Ge(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])("".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("apps"), "/").concat(e, "/featureToken"));
}
function Qe(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t, r, i, a;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    return t = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].parse(window.location.hash), r = function(e) {
                        for(var t, n, r = [], i = 1; i < arguments.length; i++)r[i - 1] = arguments[i];
                        var a = function(t) {
                            Object.keys(t).filter(function(e) {
                                return null !== t[e] && void 0 !== t[e];
                            }).forEach(function(n) {
                                e[n] = t[n];
                            });
                        };
                        try {
                            for(var c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__values"])(r), s = c.next(); !s.done; s = c.next()){
                                a(s.value);
                            }
                        } catch (l) {
                            t = {
                                error: l
                            };
                        } finally{
                            try {
                                s && !s.done && (n = c.return) && n.call(c);
                            } finally{
                                if (t) throw t.error;
                            }
                        }
                        return e;
                    }({
                        access_token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])(),
                        context_token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRawContext"])(),
                        feature_token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeatureToken"])(),
                        id_token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIDToken"])(),
                        client_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientId"])(),
                        mst_challenge: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMSTChallenge"])(),
                        mst_verifier: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMSTVerifier"])(),
                        msit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMSIT"])()
                    }, t), qe() ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])() ? [
                        4,
                        Ge(e)
                    ] : [
                        3,
                        2
                    ] : [
                        3,
                        3
                    ];
                case 1:
                    i = n.sent().featureToken, r.feature_token || (r.feature_token = i), n.label = 2;
                case 2:
                    (a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractChannelIdFromLiffId"])(e)) && (r.client_id = a), n.label = 3;
                case 3:
                    return [
                        2,
                        r
                    ];
            }
        });
    });
}
function Xe(e) {
    if (e.persisted && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isApiAvailable"])("multipleLiffTransition")) if ("ios" === (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])()) window.location.reload();
    else {
        var t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId, n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeatureToken"])();
        if (!t) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Invalid LIFF ID.");
        if (!n) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"], "Invalid featureToken for client features");
        Ke({
            pathname: "app/".concat(t),
            query: {
                feature_token: n
            }
        });
    }
}
function Ye(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t, r, o, i, a, c, s, f, u, h, p, m, b, k, F, y, I, _, B;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    return [
                        4,
                        new Promise(function(e) {
                            var t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLineVersion"])();
                            if (!t || (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareVersion"])(t, "9.5.0") < 0) e();
                            else if (window._liff && window._liff.features) e();
                            else {
                                __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("cannot find window._liff.features, listen to ready event");
                                var n = function() {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("ready event is fired"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeListener"])("ready", n), e();
                                };
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addListener"])("ready", n);
                            }
                        })
                    ];
                case 1:
                    return n.sent(), Je(), [
                        4,
                        Qe(e.liffId)
                    ];
                case 2:
                    if (t = n.sent(), r = t.access_token, o = t.context_token, i = t.feature_token, a = t.id_token, c = t.client_id, s = t.mst_verifier, f = t.mst_challenge, u = t.msit, o) {
                        if ("string" != typeof o) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Cannot get context token, perhaps there is an incorrect parameter in permanent link");
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setContext"])(He(o));
                    }
                    if (void 0 !== (null === (_ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])()) || void 0 === _ ? void 0 : _.liffId) && (null === (B = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])()) || void 0 === B ? void 0 : B.liffId) !== e.liffId) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Invalid LIFF ID");
                    return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSubWindow"])() && i && (!function(e, t) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isApiAvailable"])("multipleLiffTransition") && Ke({
                            pathname: "app/".concat(e),
                            query: {
                                feature_token: t
                            }
                        });
                    }(e.liffId, i), qe() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setFeatureToken"])(i)), f && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMSTChallenge"])(f), s && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMSTVerifier"])(s), c && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setClientId"])(c), u && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMSIT"])(u), window.addEventListener("pageshow", Xe), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])() ? [
                        3,
                        5
                    ] : i && r ? [
                        3,
                        5
                    ] : qe() ? (h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addParamsToUrl"])(location.href, {
                        "liff.hback": "2"
                    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$login$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["login"])({
                        redirectUri: h
                    }), [
                        4,
                        new Promise(function() {})
                    ]) : [
                        3,
                        4
                    ];
                case 3:
                    n.sent(), n.label = 4;
                case 4:
                    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$login$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["login"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Failed to parse feature_token or access_token");
                case 5:
                    return r && i ? [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyAccessToken"])(r)
                    ] : [
                        3,
                        7
                    ];
                case 6:
                    if (p = n.sent(), m = p.client_id, b = p.expires_in, k = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractChannelIdFromLiffId"])(e.liffId), m !== k) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$login$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["login"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Failed to verify access_token");
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setFeatureToken"])(i), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setExpireTime"])(new Date(Date.now() + 1e3 * b)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAccessToken"])(r), n.label = 7;
                case 7:
                    return [
                        4,
                        ze(u, s)
                    ];
                case 8:
                    return (F = n.sent()) ? ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMST"])(F), [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppData"])({
                            mst: F
                        })
                    ]) : [
                        3,
                        10
                    ];
                case 9:
                    (y = n.sent().data) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAppData"])(JSON.stringify(y)), n.label = 10;
                case 10:
                    return a && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIDToken"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setIDToken"])(a), a && c && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDecodedIDToken"])() ? [
                        4,
                        Re(a, c)
                    ] : [
                        3,
                        12
                    ];
                case 11:
                    (I = n.sent()) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDecodedIDToken"])(I), n.label = 12;
                case 12:
                    return [
                        2
                    ];
            }
        });
    });
}
function Ze(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t, r, o, i, a, c, s;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    return t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("apps"), r = "".concat(t, "/").concat(e, "/contextToken"), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])(), i = {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }, o && (i.Authorization = "Bearer ".concat(o)), [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])(r, {
                            headers: i
                        })
                    ];
                case 1:
                    if (a = n.sent(), !(c = a.contextToken)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Can not get context from server.");
                    if (!(s = He(c))) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Invalid context token.");
                    return [
                        2,
                        s
                    ];
            }
        });
    });
}
function $e() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var e, t;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    if (!(e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Invalid LIFF ID.");
                    return [
                        4,
                        Ze(e)
                    ];
                case 1:
                    return t = n.sent(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setContext"])(t), [
                        2
                    ];
            }
        });
    });
}
function et(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var r, o, i, a = this;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(c) {
            switch(c.label){
                case 0:
                    r = function() {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(a, void 0, void 0, function() {
                            var t, r, o, i, a, c;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                                switch(n.label){
                                    case 0:
                                        return [
                                            4,
                                            (s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])(), l = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].parse(window.location.search), f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLoginTmp"])(), u = {
                                                grant_type: "authorization_code",
                                                client_id: l.liffClientId,
                                                appId: s.liffId,
                                                code: l.code,
                                                code_verifier: f.codeVerifier,
                                                redirect_uri: s.redirectUri || l.liffRedirectUri,
                                                id_token_key_type: "JWK"
                                            }, d = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].stringify(u), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("token"), {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                                                },
                                                body: d
                                            }))
                                        ];
                                    case 1:
                                        return t = n.sent(), r = t.access_token, o = t.id_token, i = t.expires_in, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setClientId"])(e), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAccessToken"])(r), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setExpireTime"])(new Date(Date.now() + 1e3 * i)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeLoginTmp"])(), o ? ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setIDToken"])(o), [
                                            4,
                                            Re(o, e)
                                        ]) : [
                                            3,
                                            3
                                        ];
                                    case 2:
                                        (a = n.sent()) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDecodedIDToken"])(a), n.label = 3;
                                    case 3:
                                        return (c = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].parse(location.hash).context_token) ? ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setContext"])(He(c)), [
                                            3,
                                            6
                                        ]) : [
                                            3,
                                            4
                                        ];
                                    case 4:
                                        return [
                                            4,
                                            $e()
                                        ];
                                    case 5:
                                        n.sent(), n.label = 6;
                                    case 6:
                                        return [
                                            2
                                        ];
                                }
                                var s, l, f, u, d;
                            });
                        });
                    }, c.label = 1;
                case 1:
                    return c.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]), [
                        4,
                        r()
                    ];
                case 2:
                    return c.sent(), [
                        3,
                        4
                    ];
                case 3:
                    throw o = c.sent(), i = o, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeLoginTmp"])(), i;
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
}
function tt() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var e, r, o, i, a, c, s = this;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(f) {
            switch(f.label){
                case 0:
                    return (r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMessageBus"])()) ? [
                        3,
                        2
                    ] : [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initMessageBus"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$message$2d$bus$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].SUB)
                    ];
                case 1:
                    r = f.sent(), f.label = 2;
                case 2:
                    return (e = r).isReady() ? (o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomAlphaNumericString"])(8), [
                        4,
                        e.getData("appData")
                    ]) : [
                        3,
                        8
                    ];
                case 3:
                    return i = f.sent(), a = i.eventName, c = i.data, a !== __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$message$2d$bus$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_NAME"].NOT_FOUND ? [
                        3,
                        6
                    ] : [
                        4,
                        e.teardown()
                    ];
                case 4:
                    return f.sent(), [
                        4,
                        tt()
                    ];
                case 5:
                    return [
                        2,
                        f.sent()
                    ];
                case 6:
                    c && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAppData"])(JSON.stringify(c)), f.label = 7;
                case 7:
                    return e.listen(function(r) {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(s, void 0, void 0, function() {
                            var t, i;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                                return t = r.context, i = t.data, t.eventName === __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].INIT && (null == i ? void 0 : i.subWindowId) !== o && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$close$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closeWindow"])(), t.eventName !== __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].CANCEL && t.eventName !== __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].SUBMIT || e.teardown(), [
                                    2
                                ];
                            });
                        });
                    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])() && e.send({
                        eventName: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_STATUS"].INIT,
                        data: {
                            subWindowId: o,
                            hasOpener: !!window.opener
                        }
                    }), [
                        3,
                        10
                    ];
                case 8:
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMainWindowOrigin"])() ? [
                        3,
                        10
                    ] : [
                        4,
                        new Promise(function(e) {
                            window.addEventListener("message", function(e) {
                                return function t(n) {
                                    var r = n.data, o = n.source, i = n.origin;
                                    if (r) {
                                        var a = r.type, c = r.message;
                                        a === __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_HEALTH_CHECK_MESSAGE"] && (window.removeEventListener("message", t), c && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAppData"])(c), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMainWindowOrigin"])(i), o && o.postMessage && o.postMessage({
                                            status: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUB_WINDOW_HEALTH_CHECK_MESSAGE"]
                                        }, i), e());
                                    }
                                };
                            }(e));
                        })
                    ];
                case 9:
                    return [
                        2,
                        f.sent()
                    ];
                case 10:
                    return [
                        2
                    ];
            }
        });
    });
}
var nt = new (function() {
    function e() {
        var e = this;
        this.getAndValidateContext = function() {
            var e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])();
            if (!e) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Could not get Context from server.");
            if (!e.endpointUrl) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Could not get endpointUrl from server.");
            if (!e.permanentLinkPattern) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Could not get permanentLinkPattern from server.");
            return e;
        }, this.decodeState = function(t) {
            var n = e.getAndValidateContext();
            t = t.replace(/\n/g, "%0D%0A");
            var r = e.hasTrailingSlash(n.endpointUrl) || e.hasTrailingSlash(t), o = new URL(n.endpointUrl), i = o.origin, a = o.pathname, c = o.search, s = new URL("".concat(i).concat(e.attachSlashAtStart(t))), l = s.pathname, f = s.search, u = s.hash, d = "".concat(c).concat(c ? f.replace(/\?/g, "&") : f), h = "".concat(a).concat(e.attachSlashAtStart(l)).replace("//", "/");
            return (h = e.attachSlashAtStart("".concat(h))).endsWith("/") && !r && (h = h.substring(0, h.length - 1)), "".concat(i).concat(h).concat(d).concat(u).replace(/%0D%0A/g, "\n");
        };
    }
    return e.prototype.attachSlashAtStart = function(e) {
        return "".concat(e && e.length > 0 && !e.startsWith("/") ? "/" : "").concat(e);
    }, e.prototype.hasTrailingSlash = function(e) {
        var t = e.indexOf("?"), n = e.indexOf("#"), r = -1;
        return (r = -1 === t && -1 === n ? e.length : -1 === t ? n : -1 === n ? t : Math.min(t, n)) > 0 && "/" === e[r - 1];
    }, e.prototype.invoke = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            var e, t, r, o, i;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                switch(n.label){
                    case 0:
                        if (e = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].parse(window.location.search), "string" != typeof (t = e["liff.state"])) return [
                            2
                        ];
                        n.label = 1;
                    case 1:
                        return n.trys.push([
                            1,
                            4,
                            ,
                            5
                        ]), r = location.href, (o = this.decodeState(t)) === r ? [
                            3,
                            3
                        ] : (e["liff.hback"] ? location.replace((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addParamsToUrl"])(o, {
                            "liff.hback": e["liff.hback"]
                        })) : location.replace(o), [
                            4,
                            new Promise(function() {})
                        ]);
                    case 2:
                        n.sent(), n.label = 3;
                    case 3:
                        return [
                            3,
                            5
                        ];
                    case 4:
                        if ((i = n.sent()).code === __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"]) throw i;
                        return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug(i), [
                            3,
                            5
                        ];
                    case 5:
                        return [
                            2
                        ];
                }
            });
        });
    }, e;
}());
function rt(e, r) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t, o;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    if (!e.liffId) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_CONFIG"], "liffId is necessary for liff.init()");
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setConfig"])(e), !(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])() && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExpireTime"])() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logout$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logout"])()), t = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].parse(window.location.search), !(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSubWindow"])() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? [
                        3,
                        2
                    ] : [
                        4,
                        tt()
                    ];
                case 1:
                    n.sent(), n.label = 2;
                case 2:
                    if (t.error && t.liffOAuth2Error) throw c = t.error, s = t.error_description, f = s.replace(/\+/g, " "), u = "".concat(c, ": ").concat(f), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], u);
                    return i = t.code, a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLoginTmp"])(), Boolean(i && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])() && a && a.codeVerifier) ? [
                        4,
                        et(t.liffClientId)
                    ] : [
                        3,
                        4
                    ];
                case 3:
                    n.sent(), n.label = 4;
                case 4:
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? [
                        4,
                        Ye(e)
                    ] : [
                        3,
                        6
                    ];
                case 5:
                    return n.sent(), [
                        3,
                        8
                    ];
                case 6:
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])() ? [
                        3,
                        8
                    ] : [
                        4,
                        $e()
                    ];
                case 7:
                    n.sent(), n.label = 8;
                case 8:
                    return [
                        4,
                        nt.invoke()
                    ];
                case 9:
                    if (n.sent(), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])()) try {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permanent$2d$link$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validatePermalinkGeneratability"])(location.href, o.endpointUrl);
                    } catch (h) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warn("liff.init() was called with a current URL that is not related to the endpoint URL.\n".concat(location.href, " is not under ").concat(o.endpointUrl));
                    }
                    return [
                        4,
                        r()
                    ];
                case 10:
                    return n.sent(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceUrlCredentialRemoved"])(window.location.href), [
                        2
                    ];
            }
            var i, a, c, s, f, u;
        });
    });
}
var ot = function(e, t) {
    return new Promise(function(n, r) {
        if (e) {
            var o = document.createElement("script");
            o.type = "module", o.onload = function() {
                n();
            }, o.src = e, document.head.appendChild(o);
        } else r((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_CONFIG"], t));
    });
}, it = function(e) {
    var t = "https://static.line-scdn.net/lui/edge/versions/1.13.0/lui-alert.js";
    return t && e && (t = t.replace(/\d{1,2}\.\d{1,2}\.\d{1,3}/, e)), ot(t, "LUI_ALERT_URL is not defined");
}, at = function() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(void 0, void 0, void 0, function() {
        var e;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
            switch(t.label){
                case 0:
                    return e = function() {
                        var e, t = document.querySelector('script[src*="luivendor.js"]');
                        if (t && (null === (e = t.src.match(/\d{1,2}\.\d{1,2}\.\d{1,3}/g)) || void 0 === e ? void 0 : e.length)) return t.src.match(/\d{1,2}\.\d{1,2}\.\d{1,3}/g)[0];
                    }(), e ? [
                        3,
                        2
                    ] : [
                        4,
                        ot("https://static.line-scdn.net/lui/edge/versions/1.13.0/luivendor.js", "LUI_VENDOR_URL is not defined")
                    ];
                case 1:
                    t.sent(), t.label = 2;
                case 2:
                    return [
                        4,
                        it(e)
                    ];
                case 3:
                    return t.sent(), [
                        4,
                        (n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomAlphaNumericString"])(6), new Promise(function() {
                            var e = document.createElement("div");
                            e.innerHTML = '<lui-alert id="'.concat("liffAlert", "-").concat(n, '" shown title="').concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$i18n$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("alert.android.extBrowser.autoLoginWorkaround.title"), '" message="').concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$i18n$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("alert.android.extBrowser.autoLoginWorkaround.desc"), '" button="').concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$i18n$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("alert.android.extBrowser.autoLoginWorkaround.button.text"), '"></lui-alert>'), document.body.appendChild(e);
                            var t = document.getElementById("".concat("liffAlert", "-").concat(n));
                            t && t.addEventListener("lui-button-click", function() {
                                var e = window.open((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addParamsToUrl"])(window.location.href, {
                                    liffIsEscapedFromApp: "true"
                                }), "_blank");
                                e && (e.location.href = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addParamsToUrl"])(window.location.href, {
                                    liffIsEscapedFromApp: "true"
                                }), window.close());
                            });
                        }))
                    ];
                case 4:
                    return t.sent(), [
                        2
                    ];
            }
            var n;
        });
    });
}, ct = function(e) {
    try {
        return new URL(e).searchParams.get("lineAppVersion");
    } catch (t) {
        return null;
    }
};
function st() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var e, t, r;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
            switch(n.label){
                case 0:
                    return e = null !== (r = ct(window.location.href)) && void 0 !== r ? r : ct(window.document.referrer), !!e && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareVersion"])(e, "13.10.0") >= 0 ? [
                        2
                    ] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() || "android" !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])() || (t = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].parse(window.location.search))[__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$message$2d$bus$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IDENTIFIER_KEY"]] || t.liffIsEscapedFromApp ? [
                        2
                    ] : t.liffClientId && document.referrer.includes("access.".concat("line.me")) ? (window.location.href = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addParamsToUrl"])(window.location.href, {
                        liffIsEscapedFromApp: "true"
                    }), [
                        2
                    ]) : t.liffClientId && document.referrer.includes("android-app://") ? [
                        4,
                        at()
                    ] : [
                        3,
                        2
                    ];
                case 1:
                    n.sent(), n.label = 2;
                case 2:
                    return t.liffClientId && "" === document.referrer && 1 === window.history.length ? [
                        4,
                        at()
                    ] : [
                        3,
                        4
                    ];
                case 3:
                    n.sent(), n.label = 4;
                case 4:
                    return !document.referrer.includes("liffClientId") || document.referrer.includes("liffIsEscapedFromApp") ? [
                        3,
                        6
                    ] : [
                        4,
                        at()
                    ];
                case 5:
                    n.sent(), n.label = 6;
                case 6:
                    return [
                        2
                    ];
            }
        });
    });
}
var lt = function(e) {
    function o() {
        var t = e.apply(this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(arguments), !1)) || this;
        return t.hooks = {
            before: new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$hooks$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AsyncHook"],
            after: new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$hooks$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AsyncHook"]
        }, t.internalHooks = {
            beforeFinished: new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$hooks$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AsyncHook"],
            beforeSuccess: new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$hooks$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AsyncHook"],
            error: new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$hooks$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AsyncHook"]
        }, t;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(o, e), Object.defineProperty(o.prototype, "name", {
        get: function() {
            return "init";
        },
        enumerable: !1,
        configurable: !0
    }), o.prototype.install = function(e) {
        var t = e.liff;
        return this.liffForWindow = t, this.init.bind(this);
    }, o.prototype.init = function(e, r, o) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            var t;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(n) {
                switch(n.label){
                    case 0:
                        return [
                            4,
                            this.hooks.before.call()
                        ];
                    case 1:
                        n.sent(), i = this.liffForWindow, window && !window.liff && (window.liff = i), n.label = 2;
                    case 2:
                        return n.trys.push([
                            2,
                            9,
                            ,
                            11
                        ]), [
                            4,
                            Promise.all([
                                We(this.liffForWindow),
                                rt(e, this.internalHooks.beforeFinished.call)
                            ])
                        ];
                    case 3:
                        return n.sent(), Ne(), [
                            4,
                            this.internalHooks.beforeSuccess.call()
                        ];
                    case 4:
                        return n.sent(), !e.withLoginOnExternalBrowser || (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])() ? [
                            3,
                            6
                        ] : ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$login$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["login"])(), [
                            4,
                            new Promise(function() {})
                        ]);
                    case 5:
                        n.sent(), n.label = 6;
                    case 6:
                        return [
                            4,
                            st()
                        ];
                    case 7:
                        return n.sent(), [
                            4,
                            this.hooks.after.call()
                        ];
                    case 8:
                        return n.sent(), "function" == typeof r && r(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$ready$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["done"])(), [
                            3,
                            11
                        ];
                    case 9:
                        return t = n.sent(), [
                            4,
                            this.internalHooks.error.call(t)
                        ];
                    case 10:
                        throw n.sent(), "function" == typeof o && o(t), t;
                    case 11:
                        return [
                            2
                        ];
                }
                var i;
            });
        });
    }, o;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/get-origins/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetOriginsModule",
    ()=>i,
    "getOrigins",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
function e() {
    return {
        liffApp: "https://liff.".concat("line.me"),
        liffServer: "https://api.".concat("line.me"),
        miniApp: "https://miniapp.".concat("line.me")
    };
}
var i = function(n) {
    function i() {
        return null !== n && n.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(i, n), Object.defineProperty(i.prototype, "name", {
        get: function() {
            return "getOrigins";
        },
        enumerable: !1,
        configurable: !0
    }), i.prototype.install = function() {
        return function() {
            return e();
        };
    }, i;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/get-language/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetLanguageModule",
    ()=>e,
    "getLanguage",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
function r() {
    return navigator.language;
}
var e = function(n) {
    function e() {
        return null !== n && n.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(e, n), Object.defineProperty(e.prototype, "name", {
        get: function() {
            return "getLanguage";
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.install = function() {
        return function() {
            return r();
        };
    }, e;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/get-app-language/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetAppLanguageModule",
    ()=>u,
    "getAppLanguage",
    ()=>f
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-line-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-os/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
;
;
function f() {
    var r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLineVersion"])();
    if (!r || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() || "ios" !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])()) return navigator.language;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareVersion"])(r, "14.11.0") >= 0) {
        var t = window.prompt("LIFF:GET_APP_LANGUAGE");
        if (t) return t;
    }
    return navigator.language;
}
var u = function(t) {
    function i() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(i, t), Object.defineProperty(i.prototype, "name", {
        get: function() {
            return "getAppLanguage";
        },
        enumerable: !1,
        configurable: !0
    }), i.prototype.install = function() {
        return function() {
            return f();
        };
    }, i;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/permission/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PermissionModule",
    ()=>z,
    "attachChecker",
    ()=>V,
    "module",
    ()=>B
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/server-api/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/sub-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-api-available/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
function I(r) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var e, i, o, u, l, h, v;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
            switch(t.label){
                case 0:
                    return function(e) {
                        if (!__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMISSION_NAMES"].includes(e)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "Unexpected permission name.");
                        var t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])();
                        return !!(null == t ? void 0 : t.scope.includes(e));
                    }(r) ? (e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])()) ? [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyAccessToken"])(e)
                    ] : [
                        3,
                        2
                    ] : [
                        2,
                        {
                            state: "unavailable"
                        }
                    ];
                case 1:
                    i = t.sent(), o = unescape(i.scope).split(" ");
                    try {
                        for(u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__values"])(o), l = u.next(); !l.done; l = u.next())if (l.value.includes(r)) return [
                            2,
                            {
                                state: "granted"
                            }
                        ];
                    } catch (m) {
                        h = {
                            error: m
                        };
                    } finally{
                        try {
                            l && !l.done && (v = u.return) && v.call(u);
                        } finally{
                            if (h) throw h.error;
                        }
                    }
                    return [
                        2,
                        {
                            state: "prompt"
                        }
                    ];
                case 2:
                    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "Need access_token for api call, Please login first");
            }
        });
    });
}
function A() {
    var e, t, n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])();
    return !!n && "square_chat" !== n.type && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isApiAvailable"])("skipChannelVerificationScreen") || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() && (null === (t = null === (e = n.availability) || void 0 === e ? void 0 : e.skipChannelVerificationScreen) || void 0 === t ? void 0 : t.permission));
}
function P() {
    var e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId;
    if (e) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])("".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("unauthorizedPermissions"), "?liffId=").concat(e), {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])())
        }
    });
    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "liffId is required");
}
var S, T = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"].on, _ = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"].off, q = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"].open, x = function() {
    function n(n, r) {
        var i = this;
        this.onSubmit = function(n) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(i, [
                n
            ], void 0, function(e) {
                var n = e.newAccessToken, r = e.ICA_ERROR;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                    return n ? this.resolve({
                        newAccessToken: n
                    }) : r && this.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], r)), this.teardown(), [
                        2
                    ];
                });
            });
        }, this.onClose = function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(i, void 0, void 0, function() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                    return this.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "user didn't allow the agreement")), this.teardown(), [
                        2
                    ];
                });
            });
        }, this.onCancel = function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(i, void 0, void 0, function() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                    return this.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "user didn't allow the agreement")), this.teardown(), [
                        2
                    ];
                });
            });
        }, this.onError = function(n) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(i, void 0, void 0, function() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                    return this.reject(n), this.teardown(), [
                        2
                    ];
                });
            });
        }, this.resolve = n, this.reject = r, this.setup();
    }
    return n.prototype.setup = function() {
        T("submit", this.onSubmit), T("close", this.onClose), T("cancel", this.onCancel), T("error", this.onError);
    }, n.prototype.teardown = function() {
        _("submit", this.onSubmit), _("close", this.onClose), _("cancel", this.onCancel), _("error", this.onError), S = void 0;
    }, n.prototype.open = function(e) {
        var t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId;
        t ? q({
            url: "".concat("https://liff.line.me/1656032314-Xgrw5Pmk"),
            appData: {
                liffId: t,
                channelId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractChannelIdFromLiffId"])(t),
                accessToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])()
            },
            onBeforeTransition: e
        }).catch(this.reject) : this.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "liffId is required"));
    }, n;
}();
function E() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var n, r, i = this;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(o) {
            switch(o.label){
                case 0:
                    if (!A()) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"], "SkipChannelVerificationScreen is unavailable.");
                    return S && S.teardown(), n = function() {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(i, void 0, void 0, function() {
                            var e;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
                                switch(t.label){
                                    case 0:
                                        return [
                                            4,
                                            P()
                                        ];
                                    case 1:
                                        if (e = t.sent(), ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? e : e.filter(function(e) {
                                            return "chat_message.write" !== e;
                                        })).length <= 0) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"], "All permissions have already been approved.");
                                        return [
                                            2
                                        ];
                                }
                            });
                        });
                    }, [
                        4,
                        new Promise(function(e, t) {
                            (S = new x(e, t)).open(n);
                        })
                    ];
                case 1:
                    return r = o.sent().newAccessToken, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAccessToken"])(r), [
                        2
                    ];
            }
        });
    });
}
function R() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var e, n;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
            switch(t.label){
                case 0:
                    if (!(e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])())) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNAUTHORIZED"], "Need access_token for api call, Please login first");
                    return [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyAccessToken"])(e)
                    ];
                case 1:
                    return n = t.sent(), [
                        2,
                        decodeURIComponent(n.scope).split(" ").filter(function(e) {
                            return "" !== e;
                        })
                    ];
            }
        });
    });
}
function V(n, o) {
    var s = this;
    return function() {
        for(var c = [], a = 0; a < arguments.length; a++)c[a] = arguments[a];
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(s, void 0, void 0, function() {
            var e, s, a;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
                switch(t.label){
                    case 0:
                        return e = (c.length > 0 ? c[c.length - 1] : {}).ignorePermissionCheck, s = void 0 !== e && e, [
                            4,
                            I(o)
                        ];
                    case 1:
                        if ("unavailable" !== (a = t.sent().state)) return [
                            3,
                            2
                        ];
                        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"], "The permission is not in LIFF app scope.");
                    case 2:
                        return "prompt" !== a || !A() || s || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() && "chat_message.write" === o ? [
                            3,
                            4
                        ] : [
                            4,
                            E()
                        ];
                    case 3:
                        return t.sent(), [
                            3,
                            5
                        ];
                    case 4:
                        s && c.pop(), t.label = 5;
                    case 5:
                        return [
                            4,
                            n.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(c), !1))
                        ];
                    case 6:
                        return [
                            2,
                            t.sent()
                        ];
                }
            });
        });
    };
}
var z = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(t, e), Object.defineProperty(t.prototype, "name", {
        get: function() {
            return "permission";
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.install = function() {
        return {
            query: I,
            requestAll: E,
            getGrantedAll: R
        };
    }, t;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]), B = new z;
;
}),
"[project]/music-studio-app/node_modules/@liff/get-profile/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetProfileModule",
    ()=>f,
    "getProfile",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/server-api/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permission$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/permission/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
function n() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("profile"));
}
var f = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(e, t), Object.defineProperty(e.prototype, "name", {
        get: function() {
            return "getProfile";
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.install = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permission$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attachChecker"])(n, "profile");
    }, e;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/open-window/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OpenWindowModule",
    ()=>s,
    "openWindow",
    ()=>p
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-os/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-line-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/native-bridge/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
var a = function(n, i) {
    return n ? "&".concat(n.split("&").filter(function(n) {
        return -1 === n.indexOf("is_liff_external_open_window");
    }).join("&").concat("".concat(i ? "#".concat(i) : ""))) : "".concat(i ? "#".concat(i) : "");
};
function p(n) {
    if (!function(n) {
        if (!n || "object" != typeof n) return !1;
        var t = n, o = t.url, e = t.external, r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])([
            typeof o,
            typeof e
        ], 2), f = r[0], l = r[1];
        return "string" === f && "" !== o && ("undefined" === l || "boolean" === l);
    }(n)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "Invalid parameters for liff.openWindow()");
    var u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLineVersion"])();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])()) if (null !== u && "ios" === (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareVersion"])(u, "9.19") >= 0 || !window._liff.postMessage) {
        var p = n.url, s = n.external, d = void 0 !== s && s;
        window.open(function(n, t) {
            var o, e, r, f, l, c, u, p, s;
            (function(n) {
                return -1 !== n.indexOf("#") && -1 !== n.indexOf("?") && n.indexOf("#") < n.indexOf("?");
            })(n) || function(n) {
                return -1 === n.indexOf("?") && -1 !== n.indexOf("#");
            }(n) ? (u = (o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(n.split("#"), 2))[0], e = o[1], p = (r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])((void 0 === e ? "" : e).split("?"), 2))[0], s = r[1]) : (u = (f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(n.split("?"), 2))[0], l = f[1], s = (c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])((void 0 === l ? "" : l).split("#"), 2))[0], p = c[1]);
            var d = a(s, p);
            return "".concat(u, "?").concat("is_liff_external_open_window", "=").concat(!!t).concat(d);
        }(p, d));
    } else (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["call"])("openWindow", n);
    else window.open(n.url, "_blank");
}
var s = function(i) {
    function t() {
        return null !== i && i.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(t, i), Object.defineProperty(t.prototype, "name", {
        get: function() {
            return "openWindow";
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.install = function() {
        return function(n) {
            return p(n);
        };
    }, t;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/send-messages/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SendMessagesModule",
    ()=>g,
    "alertToPromptUpdate",
    ()=>c,
    "sendMessages",
    ()=>l
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/server-api/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-line-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-os/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permission$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/permission/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
var m = function(r) {
    return "object" == typeof r && null !== r && function(r) {
        return "string" == typeof r || r instanceof String;
    }(r.type);
};
function p(r) {
    return Promise.reject((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], r));
}
function l(r) {
    if (!function(r) {
        return Array.isArray(r) && r.every(m);
    }(r)) return p("Parameter 'messages' must be an array of { type, ... }");
    var e = r.length;
    return e < 1 || e > 5 ? p("Number of messages should be in range 1 to ".concat(5, ".")) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("message"), {
        method: "POST",
        body: JSON.stringify({
            messages: r
        })
    }).catch(c);
}
var c = function(r) {
    if ("403" === r.code) {
        var e = "12.0.0" === (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLineVersion"])(), o = "ios" === (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])(), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isIpad"])();
        e && (o || n) && window.alert("LINEアプリをLINE 12.0.1以降にアップデートしてください。\nPlease update your LINE app to LINE 12.0.1 or later.");
    }
    throw r;
}, g = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(t, e), Object.defineProperty(t.prototype, "name", {
        get: function() {
            return "sendMessages";
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.install = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permission$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attachChecker"])(l, "chat_message.write");
    }, t;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/get-friendship/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetFriendshipModule",
    ()=>f,
    "getFriendship",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/server-api/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permission$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/permission/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
function o() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("friendship"));
}
var f = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(e, t), Object.defineProperty(e.prototype, "name", {
        get: function() {
            return "getFriendship";
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.install = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permission$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attachChecker"])(o, "profile");
    }, e;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/analytics/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalyticsModule",
    ()=>L,
    "sendShareTargetPicker",
    ()=>v
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/logger/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-logged-in/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$profile$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-profile/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
function I() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t, i;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
            switch(e.label){
                case 0:
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])()) return [
                        3,
                        6
                    ];
                    e.label = 1;
                case 1:
                    return e.trys.push([
                        1,
                        5,
                        ,
                        6
                    ]), (t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDecodedIDToken"])()) && t.sub ? [
                        2,
                        t.sub
                    ] : [
                        3,
                        2
                    ];
                case 2:
                    return [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$profile$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProfile"])()
                    ];
                case 3:
                    if ((i = e.sent()) && i.userId) return [
                        2,
                        i.userId
                    ];
                    e.label = 4;
                case 4:
                    return [
                        3,
                        6
                    ];
                case 5:
                    return e.sent(), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("can't retrieve Mid/Uid because of something wrong"), [
                        3,
                        6
                    ];
                case 6:
                    return [
                        2
                    ];
            }
        });
    });
}
function b() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
            switch(e.label){
                case 0:
                    return [
                        4,
                        I()
                    ];
                case 1:
                    return (t = e.sent()) && "u" === t.substring(0, 1) ? [
                        2,
                        t
                    ] : [
                        2
                    ];
            }
        });
    });
}
var L = function(c) {
    function p() {
        var t = c.apply(this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(arguments), !1)) || this;
        return t.utsExtra = {
            isLiffSuccessful: !1,
            isLoggedIn: !1,
            id: "",
            version: ""
        }, t.injected = !1, t;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(p, c), Object.defineProperty(p, "CUSTOMPLACEID_INIT", {
        get: function() {
            return "liff.init";
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(p, "CUSTOMTYPE", {
        get: function() {
            return "liffSdk";
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(p, "LiffUtsLoginStatus", {
        get: function() {
            return {
                isLoggedIn: 1,
                isLiffSuccessful: 2
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(p.prototype, "name", {
        get: function() {
            return "analytics";
        },
        enumerable: !1,
        configurable: !0
    }), p.prototype.install = function(t) {
        var e = t.liff, i = t.internalHooks;
        this.liffCore = e, i.init.beforeFinished(this.beforeInitFinished.bind(this)), i.init.beforeSuccess(this.beforeInitSuccess.bind(this)), i.init.error(this.initError.bind(this));
    }, p.prototype.createDeprecatedUtsProxy = function(t) {
        var e = "LIFF Analytics is deprecated and will be removed in a future version. Please migrate to alternative analytics solutions.";
        return new Proxy(t, {
            get: function(t, i) {
                var r = t[i];
                return "function" == typeof r ? function() {
                    for(var n = [], s = 0; s < arguments.length; s++)n[s] = arguments[s];
                    return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warn("[LIFF Analytics] ".concat(e, " Called method: ").concat(String(i))), r.apply(t, n);
                } : r;
            }
        });
    }, p.prototype.changeRatioToUTSFormat = function(t) {
        if (t && Number.isFinite(t)) return Math.round(100 * t);
    }, p.prototype.setExtra = function() {
        var t, e = this.utsExtra, i = e.isLiffSuccessful, r = e.isLoggedIn, n = e.id, s = e.version, o = (r ? p.LiffUtsLoginStatus.isLoggedIn : 0) | (i ? p.LiffUtsLoginStatus.isLiffSuccessful : 0);
        null === (t = this.uts) || void 0 === t || t.setExtra("liff", {
            id: n,
            loginStatus: o,
            version: s
        });
    }, p.prototype.assignUtsExtra = function(t) {
        Object.assign(this.utsExtra, t);
    }, p.prototype.setVersion = function(t) {
        this.assignUtsExtra({
            version: t
        }), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[LIFFUTS][SDK version] ".concat(t)), this.setExtra();
    }, p.prototype.setLiffId = function(t) {
        this.assignUtsExtra({
            id: t
        }), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[LIFFUTS][LIFFID] ".concat(t)), this.setExtra();
    }, p.prototype.setIsLoggedIn = function(t) {
        this.assignUtsExtra({
            isLoggedIn: t
        }), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[LIFFUTS][isLoggedIn] ".concat(t)), this.setExtra();
    }, p.prototype.sendLiffInit = function() {
        var t;
        __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[LIFFUTS][sendCustom] liff.init"), null === (t = this.uts) || void 0 === t || t.sendCustom({
            type: p.CUSTOMTYPE,
            params: {
                placeId: p.CUSTOMPLACEID_INIT
            }
        });
    }, p.prototype.setIsLiffSuccessful = function(t) {
        this.assignUtsExtra({
            isLiffSuccessful: t
        }), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[LIFFUTS][isLiffInitSuccessful] ".concat(t)), this.setExtra();
    }, p.prototype.prepareReferrer = function(t) {
        var e = {};
        Object.keys(t).forEach(function(i) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UTS_REFERRER_QUERY"].includes(i)) {
                var r = t[i];
                "string" == typeof r && r && (e[i.replace(/^liff\.ref\./, "")] = r);
            }
        }), Object.keys(e).length > 0 && (this.referrer = e);
    }, p.prototype.beforeInitFinished = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            var t, i, r, n, o, c, p, m, I, L, v, y;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                switch(e.label){
                    case 0:
                        if (t = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].parse(window.location.search), this.prepareReferrer(t), i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])(), !(r = null == i ? void 0 : i.utsTracking)) return [
                            2
                        ];
                        if (n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])(), o = n.liffId, c = n.analytics, "auto" !== r.mode || !c) return [
                            3,
                            6
                        ];
                        __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warn("[LIFF Analytics] LIFF Analytics is deprecated and will be removed in a future version. Please migrate to alternative analytics solutions."), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[LIFFUTS] ".concat((new Date).toUTCString())), e.label = 1;
                    case 1:
                        return e.trys.push([
                            1,
                            3,
                            ,
                            4
                        ]), p = this, [
                            4,
                            new Promise(function(t, e) {
                                var i = window.uts, r = document.createElement("script");
                                r.type = "text/javascript", r.src = "https://static.line-scdn.net/uts/edge/4.1.0/uts.js", r.onload = function() {
                                    var e = window.uts;
                                    t(e), window.uts = i;
                                }, r.onerror = function(t) {
                                    e(t);
                                }, document.getElementsByTagName("head")[0].appendChild(r);
                            })
                        ];
                    case 2:
                        return p.uts = e.sent(), [
                            3,
                            4
                        ];
                    case 3:
                        return m = e.sent(), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[LIFFUTS] cannot load UTS, reason: ".concat(m)), [
                            2
                        ];
                    case 4:
                        return I = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])({}, c.context), {
                            utsId: c.context.utsId,
                            appName: c.context.appName,
                            appEnv: c.context.appEnv || "release"
                        }), L = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__assign"])({
                            endpoint: "https://uts-front.line-apps.com"
                        }, c.options), {
                            sampleRate: this.changeRatioToUTSFormat(r.sendRatio),
                            version: "current"
                        }), this.uts.init(I, L), [
                            4,
                            b()
                        ];
                    case 5:
                        (v = e.sent()) && (__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[LIFFUTS][mid] ".concat(v)), this.uts.setMid(v)), (null == i ? void 0 : i.tid) && (__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[LIFFUTS][tid] ".concat(i.tid)), this.uts.setTid(i.tid)), this.referrer && (__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("liff.ref.referrer", this.referrer), this.uts.setSessionParams(this.referrer)), o && this.setLiffId(o), this.setIsLoggedIn((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])()), this.setVersion((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVersion"])()), y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeCredential"])(location.href), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[LIFFUTS][url] ".concat(y)), this.uts.setUrl(y), this.liffCore.analytics = this.createDeprecatedUtsProxy(this.uts), this.injected = !0, e.label = 6;
                    case 6:
                        return [
                            2
                        ];
                }
            });
        });
    }, p.prototype.beforeInitSuccess = function() {
        return this.injected && (this.setIsLiffSuccessful(!0), this.sendLiffInit()), Promise.resolve();
    }, p.prototype.initError = function() {
        return this.injected && (this.setIsLiffSuccessful(!1), this.sendLiffInit()), Promise.resolve();
    }, p;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]), v = function(t) {
    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warn("[LIFF Analytics] LIFF Analytics is deprecated and will be removed in a future version. Please migrate to alternative analytics solutions. Called function: sendShareTargetPicker"), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("[LIFFUTS][sendCustom] liff.shareTargetPicker"), t.sendCustom({
        type: "liffSdk",
        params: {
            placeId: "liff.shareTargetPicker"
        }
    });
};
;
}),
"[project]/music-studio-app/node_modules/@liff/scan-code-v2/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScanCodeV2Module",
    ()=>l,
    "module",
    ()=>c
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/sub-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-api-available/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
var s, u = function() {
    function o(o, t) {
        var n = this;
        this.resolve = o, this.reject = t, this.onSubmit = function(o) {
            var t = o.message;
            n.resolve({
                value: t
            }), n.destroy();
        }, this.onClose = function() {
            n.resolve({
                value: null
            }), n.destroy();
        }, this.onCancel = function() {
            n.resolve({
                value: null
            }), n.destroy();
        }, this.onError = function(o) {
            n.reject(o), n.destroy();
        }, this.start();
    }
    return o.prototype.start = function() {
        __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"].on("submit", this.onSubmit), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"].on("close", this.onClose), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"].on("cancel", this.onCancel), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"].on("error", this.onError);
    }, o.prototype.destroy = function() {
        __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"].off("submit", this.onSubmit), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"].off("close", this.onClose), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"].off("cancel", this.onCancel), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"].off("error", this.onError), s = void 0;
    }, o;
}();
function f() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(o) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validators"].scanCodeV2(), s && s.destroy(), [
                2,
                new Promise(function(o, t) {
                    s = new u(o, t), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"].open({
                        url: "https://liff.line.me/1656359117-jxmx5e11"
                    }).catch(function(o) {
                        null == s || s.destroy(), t(o);
                    });
                })
            ];
        });
    });
}
var l = function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(n, t), Object.defineProperty(n.prototype, "name", {
        get: function() {
            return "scanCodeV2";
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.install = function() {
        return f;
    }, n;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]), c = new l;
;
}),
"[project]/music-studio-app/node_modules/@liff/window-postmessage/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "listen",
    ()=>c,
    "messageReceive",
    ()=>m,
    "messageTell",
    ()=>u,
    "removeListen",
    ()=>s
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/logger/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
var n = {};
function i() {
    return n;
}
function s(e, r) {
    var o = i(), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(r.split("."), 1)[0], s = o[r];
    s && e.removeEventListener(n, s), o[r] = null;
}
var f = !1, a = !1;
function c(e, r, o, i) {
    f || (a = function() {
        var t = !1;
        try {
            var e = Object.defineProperty({}, "passive", {
                get: function() {
                    return t = !0, !1;
                }
            });
            window.addEventListener("test", e, e), window.removeEventListener("test", e, e);
        } catch (r) {
            t = !1;
        }
        return t;
    }(), f = !0);
    var c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(r.split("."), 1)[0];
    return new Promise(function(t) {
        var f = function(n) {
            t(n), o && o(n), i && i.once && s(e, r);
        };
        !function(t, e) {
            n[t] = e;
        }(r, f), e.addEventListener(c, f, !!a && i);
    });
}
function u(t, o, n, i) {
    if (void 0 === n && (n = {}), "object" != typeof t || !t.postMessage) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "target must be window object");
    if ("string" != typeof o) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "keyname must be string");
    if ("object" != typeof n) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "incorrect body format. It should be Object or Array comprised of Object");
    if (!i) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "serverEndPointUrl isn't passed. please fill up with proper url");
    if ("*" === i) throw new Error("serverEndPointUrl doesn't allow to set '*'");
    var s = {
        name: o,
        body: n
    };
    t.postMessage(s, i);
}
function m(t, e, r, n) {
    c(t, "message.".concat(e), function(t, e, r) {
        return function(n) {
            __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("messageReceive", n), n.origin === r && n.data.name === t && e(n);
        };
    }(e, r, n));
}
;
}),
"[project]/music-studio-app/node_modules/@liff/share-target-picker/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShareTargetPickerModule",
    ()=>O,
    "module",
    ()=>E
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$analytics$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/analytics/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-line-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/logger/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/server-api/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-os/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$window$2d$postmessage$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/window-postmessage/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-api-available/lib/index.es.js [app-client] (ecmascript)");
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
;
var R = function() {
    function i() {
        this.payloadToShareTargetPicker = null, this.popupWindow = null, this.doesWaitForSubwindowResult = !1;
    }
    return i.getInstance = function() {
        return i.instance ? i.instance.reset() : i.instance = new i, i.instance;
    }, i.prototype.init = function(i) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            var t, r;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                switch(e.label){
                    case 0:
                        return e.trys.push([
                            0,
                            5,
                            ,
                            6
                        ]), this.liffId = i.referrer.liffId, this.doesWaitForSubwindowResult = !(!i.options || !i.options.waitForSubwindowResult), this.allowPostMessageOrigin = this.initAllowPostMessageOrigin(), this.payloadToShareTargetPicker = this.buildPayloadToShareTargetPicker(i), window.AbortController && (this.abortController = new window.AbortController), this.prepareAnotherWindow(), [
                            4,
                            this.initOtt()
                        ];
                    case 1:
                        return e.sent(), this.initListener(), this.openAnotherWindow(), this.doesWaitForSubwindowResult ? [
                            4,
                            this.pollingShareResult()
                        ] : [
                            3,
                            3
                        ];
                    case 2:
                        return t = e.sent(), this.finalize(), [
                            2,
                            t
                        ];
                    case 3:
                    case 6:
                        return [
                            2
                        ];
                    case 4:
                        return [
                            3,
                            6
                        ];
                    case 5:
                        if (r = e.sent(), this.finalize(), "AbortError" !== r.name) throw r;
                        return [
                            3,
                            6
                        ];
                }
            });
        });
    }, i.prototype.resetAllVariables = function() {
        this.liffId = "", this.allowPostMessageOrigin = "", this.payloadToShareTargetPicker = null, this.ott = "", this.popupWindow = null, this.timeoutIDForHealthCheck = null, this.abortController = null, this.internalError = null, this.doesWaitForSubwindowResult = !1;
    }, i.prototype.reset = function() {
        this.finalize(), this.resetAllVariables();
    }, i.prototype.finalize = function() {
        var t, e;
        this.abortController && this.abortController.abort(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() || (t = this.timeoutIDForHealthCheck, e = this.popupWindow, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$window$2d$postmessage$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeListen"])(window, "message.receivedHealthcheck"), t && clearTimeout(t), e && !e.closed && e.close());
    }, i.prototype.buildPayloadToShareTargetPicker = function(t) {
        return {
            messages: t.messages,
            isMultiple: t.isMultiple,
            referrer: t.referrer
        };
    }, i.prototype.initAllowPostMessageOrigin = function(t) {
        return void 0 === t && (t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("shareTargetPicker")), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOriginOfUrl"])(t);
    }, i.prototype.initOtt = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            var t, i, r;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                switch(e.label){
                    case 0:
                        return this.abortController && (t = this.abortController.signal), i = "".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("shareTargetPickerOtt"), "/").concat(this.liffId, "/ott"), r = this, [
                            4,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])(i, {
                                method: "GET",
                                signal: t
                            }).then(function(t) {
                                return t.ott;
                            })
                        ];
                    case 1:
                        return r.ott = e.sent(), [
                            2
                        ];
                }
            });
        });
    }, i.prototype.prepareAnotherWindow = function() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() || ("ios" !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isIpad"])() ? this.popupWindow = window.open("", "liffpopup", "width=480, height=640, menubar=no, toolbar=no, scrollbars=yes") : this.popupWindow = window.open());
    }, i.prototype.openAnotherWindow = function() {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() && this.payloadToShareTargetPicker) t = this.liffId, e = this.ott, i = this.payloadToShareTargetPicker, r = {
            liffId: t,
            ott: e,
            data: JSON.stringify(i),
            closeModals: !1
        }, location.href = "".concat("line://picker", "?").concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].stringify(r));
        else {
            if (this.timeoutIDForHealthCheck = window.setTimeout(this.healthCheck.bind(this), 1e3), !this.popupWindow) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREATE_SUBWINDOW_FAILED"]);
            !function(t, e, i) {
                var r = {
                    liffId: e,
                    ott: i
                };
                t.location.href = "".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("shareTargetPicker"), "?").concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].stringify(r));
            }(this.popupWindow, this.liffId, this.ott);
        }
        var t, e, i, r;
    }, i.prototype.initListener = function() {
        var t, e;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() || (t = this.onReceivedHealthcheck.bind(this), e = this.allowPostMessageOrigin, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$window$2d$postmessage$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["messageReceive"])(window, "receivedHealthcheck", t, e));
    }, i.prototype.healthCheck = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            var t;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                switch(e.label){
                    case 0:
                        if (this.popupWindow && !this.popupWindow.closed) return [
                            3,
                            7
                        ];
                        if (!this.doesWaitForSubwindowResult) return [
                            3,
                            5
                        ];
                        e.label = 1;
                    case 1:
                        return e.trys.push([
                            1,
                            3,
                            ,
                            4
                        ]), [
                            4,
                            this.onCanceled()
                        ];
                    case 2:
                        return e.sent(), [
                            3,
                            4
                        ];
                    case 3:
                        return t = e.sent(), this.internalError = t, [
                            3,
                            4
                        ];
                    case 4:
                        return [
                            3,
                            6
                        ];
                    case 5:
                        this.finalize(), e.label = 6;
                    case 6:
                        return [
                            3,
                            8
                        ];
                    case 7:
                        i = this.popupWindow, r = this.allowPostMessageOrigin, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$window$2d$postmessage$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["messageTell"])(i, "healthcheck", void 0, r), this.timeoutIDForHealthCheck = window.setTimeout(this.healthCheck.bind(this), 1e3), e.label = 8;
                    case 8:
                        return [
                            2
                        ];
                }
                var i, r;
            });
        });
    }, i.prototype.onReceivedHealthcheck = function() {
        if (!this.popupWindow || !this.payloadToShareTargetPicker) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREATE_SUBWINDOW_FAILED"]);
        var t, e, i;
        t = this.popupWindow, e = this.payloadToShareTargetPicker, i = this.allowPostMessageOrigin, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$window$2d$postmessage$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["messageTell"])(t, "ready", e, i);
    }, i.prototype.onCanceled = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            var t, i;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                switch(e.label){
                    case 0:
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() || !this.ott) throw new Error("need to call with ott in client");
                        return this.abortController && (t = this.abortController.signal), i = {
                            liffId: this.liffId,
                            ott: this.ott
                        }, [
                            4,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])("".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("shareTargetPickerResult"), "?").concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].stringify(i)), {
                                method: "POST",
                                signal: t,
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                body: "result=CANCEL"
                            })
                        ];
                    case 1:
                        return [
                            2,
                            "ok" === e.sent().status
                        ];
                }
            });
        });
    }, i.prototype.getShareResult = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            var t, i;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                if (!this.ott) throw new Error("need to call with ott in client");
                return this.abortController && (t = this.abortController.signal), i = {
                    liffId: this.liffId,
                    ott: this.ott
                }, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logger$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug("fetch: getShareResult"), [
                    2,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])("".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("shareTargetPickerResult"), "?").concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].stringify(i)), {
                        method: "GET",
                        headers: {
                            Accept: "application/json"
                        },
                        signal: t
                    })
                ];
            });
        });
    }, i.isPollingTimeOut = function(t, e) {
        return (e - t) / 6e4 >= 10;
    }, i.prototype.pollingShareResult = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            var t, r;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                switch(e.label){
                    case 0:
                        t = Date.now(), e.label = 1;
                    case 1:
                        if (i.isPollingTimeOut(t, Date.now())) return [
                            3,
                            4
                        ];
                        if (this.internalError) throw this.internalError;
                        return [
                            4,
                            this.getShareResult()
                        ];
                    case 2:
                        if ((r = e.sent()) && r.result) switch(r.result){
                            case "SUCCESS":
                                return [
                                    2,
                                    {
                                        status: "success"
                                    }
                                ];
                            case "CANCEL":
                                return [
                                    2
                                ];
                            default:
                                throw new Error(r.resultDescription);
                        }
                        return [
                            4,
                            new Promise(function(t) {
                                setTimeout(t, 500);
                            })
                        ];
                    case 3:
                        return e.sent(), [
                            3,
                            1
                        ];
                    case 4:
                        throw new Error("Timeout: not finished within ".concat(10, "min"));
                }
            });
        });
    }, i;
}(), O = function(n) {
    function c() {
        var i = n.apply(this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(arguments), !1)) || this;
        return i.shareTargetPicker = function(n) {
            for(var c = [], u = 1; u < arguments.length; u++)c[u - 1] = arguments[u];
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(i, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([
                n
            ], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(c), !1), void 0, function(t, i) {
                var r, o, n, c, u, f, v;
                return void 0 === i && (i = {}), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                    switch(e.label){
                        case 0:
                            if (__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validators"].shareTargetPicker(), !t || !Array.isArray(t) || 0 === t.length) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "no proper argument");
                            if (t.length > __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_NUM_OF_SEND_MESSAGES"]) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "exceed the limit of num of messages");
                            if (!(r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_CONFIG"]);
                            window.liff && (o = window.liff).analytics && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$analytics$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendShareTargetPicker"])(o.analytics), n = void 0 === i.isMultiple || i.isMultiple, e.label = 1;
                        case 1:
                            return e.trys.push([
                                1,
                                3,
                                ,
                                4
                            ]), c = R.getInstance(), u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLineVersion"])(), f = {
                                waitForSubwindowResult: !0
                            }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() && u && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareVersion"])(u, "10.11.0") < 0 && (f.waitForSubwindowResult = !1), [
                                4,
                                c.init({
                                    messages: t,
                                    isMultiple: n,
                                    referrer: {
                                        liffId: r,
                                        url: location.origin
                                    },
                                    options: f
                                })
                            ];
                        case 2:
                            return [
                                2,
                                e.sent()
                            ];
                        case 3:
                            throw (v = e.sent()) instanceof __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffError"] ? v : (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXCEPTION_IN_SUBWINDOW"], v.message);
                        case 4:
                            return [
                                2
                            ];
                    }
                });
            });
        }, i;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(c, n), Object.defineProperty(c.prototype, "name", {
        get: function() {
            return "shareTargetPicker";
        },
        enumerable: !1,
        configurable: !0
    }), c.prototype.install = function() {
        return this.shareTargetPicker;
    }, c;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]), E = new O;
;
}),
"[project]/music-studio-app/node_modules/@liff/create-shortcut-on-home-screen/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateShortcutOnHomeScreenModule",
    ()=>C,
    "InternalCreateShortcutOnHomeScreenModule",
    ()=>N,
    "createShortcutOnHomeScreen",
    ()=>U,
    "internalCreateShortcutOnHomeScreen",
    ()=>L
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-os/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-api-available/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$open$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/open-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/server-api/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permanent$2d$link$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/permanent-link/lib/index.es.js [app-client] (ecmascript)");
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
function S(n, e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t, i;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(r) {
            switch(r.label){
                case 0:
                    return t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("createShortcutOnHomeScreen"), (i = new URL(t)).searchParams.append("liffId", n), i.searchParams.append("url", e.url), e.description && i.searchParams.append("description", e.description), [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])(i.toString())
                    ];
                case 1:
                    return [
                        2,
                        r.sent().shortcutPageUrl
                    ];
            }
        });
    });
}
function g(t) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLineCustomUrlScheme"])(t)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "LINE URL scheme are not supported in the current environment.");
}
function I(n, e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(r) {
            switch(r.label){
                case 0:
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"])() ? [
                        2
                    ] : [
                        4,
                        new Promise(function(t) {
                            setTimeout(t, 1e3);
                        })
                    ];
                case 1:
                    return r.sent(), "hidden" === document.visibilityState ? [
                        2
                    ] : (g(e.url), [
                        4,
                        S(n, e)
                    ]);
                case 2:
                    return t = r.sent(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$open$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openWindow"])({
                        url: t,
                        external: !0
                    }), [
                        2
                    ];
            }
        });
    });
}
function O(n, e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t, i;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(r) {
            switch(r.label){
                case 0:
                    return t = {
                        liffId: n,
                        targetUrl: e.url,
                        description: e.description
                    }, i = "".concat("line://shortcut/liff", "?").concat(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["qs"].stringify(t)), location.href = i, [
                        4,
                        I(n, e)
                    ];
                case 1:
                    return r.sent(), [
                        2
                    ];
            }
        });
    });
}
function P(n, e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(r) {
            switch(r.label){
                case 0:
                    return g(e.url), [
                        4,
                        S(n, e)
                    ];
                case 1:
                    return t = r.sent(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$open$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openWindow"])({
                        url: t,
                        external: !0
                    }), [
                        2
                    ];
            }
        });
    });
}
function H(t) {
    var r;
    if (void 0 === t.url || null === t.url || "" === t.url) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVALID_ARGUMENT"], "no proper argument");
    var n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])();
    if (!(null === (r = null == n ? void 0 : n.availability.addToHomeLineScheme) || void 0 === r ? void 0 : r.permission)) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLineCustomUrlScheme"])(t.url)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"], "No permission to specify line schema in url.");
        if (t.description) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"], "No permission to specify description.");
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLineCustomUrlScheme"])(t.url)) {
        if (!n) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORBIDDEN"], "Could not get Context from server.");
        n.liffId !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractLiffId"])(t.url) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permanent$2d$link$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validatePermalinkGeneratability"])(t.url, n.endpointUrl);
    }
}
function L(n) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
            switch(t.label){
                case 0:
                    return H(n), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validators"].internalCreateShortcutOnHomeScreen(), [
                        4,
                        x(n)
                    ];
                case 1:
                    return t.sent(), [
                        2
                    ];
            }
        });
    });
}
function U(n) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
            switch(t.label){
                case 0:
                    return H(n), __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validators"].createShortcutOnHomeScreen(), [
                        4,
                        x(n)
                    ];
                case 1:
                    return t.sent(), [
                        2
                    ];
            }
        });
    });
}
function x(n) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
        var t;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(r) {
            switch(r.label){
                case 0:
                    if (!(t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId)) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_FAILED"], "Invalid LIFF ID.");
                    return "ios" === (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"])() ? [
                        4,
                        P(t, n)
                    ] : [
                        3,
                        2
                    ];
                case 1:
                    return r.sent(), [
                        3,
                        4
                    ];
                case 2:
                    return [
                        4,
                        O(t, n)
                    ];
                case 3:
                    r.sent(), r.label = 4;
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
}
var C = function(t) {
    function r() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(r, t), Object.defineProperty(r.prototype, "name", {
        get: function() {
            return "createShortcutOnHomeScreen";
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.install = function() {
        return function(t) {
            return U(t);
        };
    }, r;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]), N = function(t) {
    function r() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(r, t), Object.defineProperty(r.prototype, "name", {
        get: function() {
            return "internalCreateShortcutOnHomeScreen";
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.install = function() {
        return function(t) {
            return L(t);
        };
    }, r;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@liff/iap/lib/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IapModule",
    ()=>v
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-api-available/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/native-bridge/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/util/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/consts/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/server-api/lib/index.es.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
function l(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, arguments, void 0, function(t) {
        var e = t.productIds;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
            switch(t.label){
                case 0:
                    return [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["call"])("iap.getPlatformProducts", {
                            productIds: e
                        }).catch(function(t) {
                            if (t.code && t.description) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(t.code, t.description);
                            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], "Failed to get platform products", {
                                cause: t
                            });
                        })
                    ];
                case 1:
                    return [
                        2,
                        t.sent().products
                    ];
            }
        });
    });
}
var h = function(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(void 0, [
        e
    ], void 0, function(t) {
        var e = t.productId, o = t.orderId;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
            switch(t.label){
                case 0:
                    if (!window.confirm("Proceed with a test in-app purchase?")) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])("CANCELED", "Transaction was canceled.");
                    return [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$server$2d$api$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPoint"])("iapVirtualConfirm"), {
                            method: "POST",
                            body: JSON.stringify({
                                productId: e,
                                orderId: o
                            })
                        })
                    ];
                case 1:
                    return t.sent(), [
                        2
                    ];
            }
        });
    });
}, m = function(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(void 0, [
        e
    ], void 0, function(t) {
        var e, o = t.productId, n = t.orderId;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
            switch(t.label){
                case 0:
                    return (null == (e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"])()) ? void 0 : e.isIapSandbox) ? [
                        4,
                        h({
                            productId: o,
                            orderId: n
                        })
                    ] : [
                        3,
                        2
                    ];
                case 1:
                case 3:
                    return t.sent(), [
                        2
                    ];
                case 2:
                    return [
                        4,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["call"])("iap.createPayment", {
                            productId: o,
                            orderId: n
                        }).catch(function(t) {
                            if (t.code && t.description) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(t.code, t.description);
                            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], "Failed to get platform products", {
                                cause: t
                            });
                        })
                    ];
            }
        });
    });
}, v = function(i) {
    function s() {
        return null !== i && i.apply(this, arguments) || this;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__extends"])(s, i), Object.defineProperty(s.prototype, "name", {
        get: function() {
            return "iap";
        },
        enumerable: !1,
        configurable: !0
    }), s.prototype.install = function() {
        var e = this;
        return {
            getPlatformProducts: function() {
                for(var i = [], u = 0; u < arguments.length; u++)i[u] = arguments[u];
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(e, void 0, void 0, function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validators"].iap(), [
                            2,
                            l.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(i), !1))
                        ];
                    });
                });
            },
            createPayment: function() {
                for(var i = [], u = 0; u < arguments.length; u++)i[u] = arguments[u];
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(e, void 0, void 0, function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validators"].iap(), [
                            2,
                            m.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadArray"])([], (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__read"])(i), !1))
                        ];
                    });
                });
            },
            requestConsentAgreement: function() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(e, void 0, void 0, function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(e) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validators"].iap(), [
                            2,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(void 0, void 0, void 0, function() {
                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"])(this, function(t) {
                                    switch(t.label){
                                        case 0:
                                            return [
                                                4,
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["call"])("iap.requestConsentAgreement").catch(function(t) {
                                                    if (t.code && t.description) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(t.code, t.description);
                                                    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$util$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLiffError"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$consts$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN"], "Failed to request consent agreement", {
                                                        cause: t
                                                    });
                                                })
                                            ];
                                        case 1:
                                            return t.sent(), [
                                                2
                                            ];
                                    }
                                });
                            })
                        ];
                    });
                });
            }
        };
    }, s;
}(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiffModule"]);
;
}),
"[project]/music-studio-app/node_modules/@line/liff/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>liff,
    "liff",
    ()=>liff
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$fetch$2f$whatwg$2d$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/polyfills/fetch/whatwg-fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$init$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/init/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$login$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/login/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/store/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-in-client/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$ready$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/ready/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-os/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$origins$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-origins/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$language$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-language/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$app$2d$language$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-app-language/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$profile$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-profile/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-logged-in/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logout$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/logout/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/native-bridge/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-line-version/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-api-available/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$open$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/open-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$close$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/close-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$send$2d$messages$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/send-messages/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$friendship$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/get-friendship/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/sub-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/use/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$analytics$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/analytics/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permanent$2d$link$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/permanent-link/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/is-sub-window/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$scan$2d$code$2d$v2$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/scan-code-v2/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permission$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/permission/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$share$2d$target$2d$picker$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/share-target-picker/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$i18n$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/i18n/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$extensions$2f$lib$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/extensions/lib/es/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$create$2d$shortcut$2d$on$2d$home$2d$screen$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/create-shortcut-on-home-screen/lib/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$iap$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@liff/iap/lib/index.es.js [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
var liffInstance = {};
var liff$1 = Object.defineProperties(liffInstance, {
    getOS: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$os$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOS"],
        enumerable: true,
        writable: true
    },
    getVersion: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVersion"],
        enumerable: true,
        writable: true
    },
    getLanguage: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$language$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLanguage"],
        enumerable: true,
        writable: true
    },
    getAppLanguage: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$app$2d$language$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppLanguage"],
        enumerable: true,
        writable: true
    },
    getOrigins: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$origins$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOrigins"],
        enumerable: true,
        writable: true
    },
    isInClient: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$in$2d$client$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInClient"],
        enumerable: true,
        writable: true
    },
    isLoggedIn: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$logged$2d$in$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"],
        enumerable: true,
        writable: true
    },
    logout: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$logout$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logout"],
        enumerable: true,
        writable: true
    },
    getAccessToken: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"],
        enumerable: true,
        writable: true
    },
    getIDToken: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIDToken"],
        enumerable: true,
        writable: true
    },
    getDecodedIDToken: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDecodedIDToken"],
        enumerable: true,
        writable: true
    },
    getContext: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContext"],
        enumerable: true,
        writable: true
    },
    openWindow: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$open$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openWindow"],
        enumerable: true,
        writable: true
    },
    closeWindow: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$close$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closeWindow"],
        enumerable: true,
        writable: true
    },
    getFriendship: {
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permission$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attachChecker"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$friendship$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFriendship"], 'profile'),
        enumerable: true,
        writable: true
    },
    getAId: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAId"],
        enumerable: true,
        writable: true
    },
    getProfilePlus: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProfilePlus"],
        enumerable: true,
        writable: true
    },
    getIsVideoAutoPlay: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIsVideoAutoPlay"],
        enumerable: true,
        writable: true
    },
    getLineVersion: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$line$2d$version$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLineVersion"],
        enumerable: true,
        writable: true
    },
    isApiAvailable: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$api$2d$available$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isApiAvailable"],
        enumerable: true,
        writable: true
    },
    getProfile: {
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permission$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attachChecker"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$get$2d$profile$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProfile"], 'profile'),
        enumerable: true,
        writable: true
    },
    sendMessages: {
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permission$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attachChecker"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$send$2d$messages$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendMessages"], 'chat_message.write'),
        enumerable: true,
        writable: true
    },
    subWindow: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWindow"],
        enumerable: true,
        writable: true
    },
    ready: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$ready$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ready"],
        enumerable: true,
        writable: true
    },
    id: {
        get: function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$store$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().liffId || null;
        },
        enumerable: true
    },
    _dispatchEvent: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dispatch"],
        enumerable: true,
        writable: true
    },
    _call: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["call"],
        enumerable: true,
        writable: true
    },
    _addListener: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addListener"],
        enumerable: true,
        writable: true
    },
    _removeListener: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeListener"],
        enumerable: true,
        writable: true
    },
    _postMessage: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$native$2d$bridge$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postMessage"],
        enumerable: true,
        writable: true
    }
});
var driver = new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModuleDriverImpl"]();
var contextHolder = new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextHolder"](driver, liff$1);
var use = new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UseModule"](driver, contextHolder).install();
function applyModule(module) {
    use.call(liff$1, module);
}
[
    new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$use$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UseModule"](driver, contextHolder),
    new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$login$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoginModule"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$init$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InitModule"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$analytics$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalyticsModule"](),
    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$scan$2d$code$2d$v2$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["module"],
    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permanent$2d$link$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["module"],
    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$is$2d$sub$2d$window$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["module"],
    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$permission$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["module"],
    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$share$2d$target$2d$picker$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["module"],
    __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$i18n$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["module"],
    new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$extensions$2f$lib$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LegacyExtensionsModule"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$create$2d$shortcut$2d$on$2d$home$2d$screen$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateShortcutOnHomeScreenModule"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$create$2d$shortcut$2d$on$2d$home$2d$screen$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InternalCreateShortcutOnHomeScreenModule"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$liff$2f$iap$2f$lib$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IapModule"]()
].forEach(applyModule);
var liff = liff$1;
;
}),
"[project]/music-studio-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file must be bundled in the app's client layer, it shouldn't be directly
// imported by the server.
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    callServer: null,
    createServerReference: null,
    findSourceMapURL: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    callServer: function() {
        return _appcallserver.callServer;
    },
    createServerReference: function() {
        return _client.createServerReference;
    },
    findSourceMapURL: function() {
        return _appfindsourcemapurl.findSourceMapURL;
    }
});
const _appcallserver = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/client/app-call-server.js [app-client] (ecmascript)");
const _appfindsourcemapurl = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/client/app-find-source-map-url.js [app-client] (ecmascript)");
const _client = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/compiled/react-server-dom-turbopack/client.js [app-client] (ecmascript)"); //# sourceMappingURL=action-client-wrapper.js.map
}),
"[project]/music-studio-app/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/music-studio-app/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/music-studio-app/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/music-studio-app/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/music-studio-app/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/music-studio-app/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/music-studio-app/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/music-studio-app/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/music-studio-app/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _types = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r("[project]/music-studio-app/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
        _react.default.startTransition(()=>{
            dispatchNavigateAction(as || href, replace ? 'replace' : 'push', scroll ?? true, linkInstanceRef.current);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _types.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
"[project]/music-studio-app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "composeRefs",
    ()=>composeRefs,
    "useComposedRefs",
    ()=>useComposedRefs
]);
// packages/react/compose-refs/src/compose-refs.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function setRef(ref, value) {
    if (typeof ref === "function") {
        return ref(value);
    } else if (ref !== null && ref !== void 0) {
        ref.current = value;
    }
}
function composeRefs(...refs) {
    return (node)=>{
        let hasCleanup = false;
        const cleanups = refs.map((ref)=>{
            const cleanup = setRef(ref, node);
            if (!hasCleanup && typeof cleanup == "function") {
                hasCleanup = true;
            }
            return cleanup;
        });
        if (hasCleanup) {
            return ()=>{
                for(let i = 0; i < cleanups.length; i++){
                    const cleanup = cleanups[i];
                    if (typeof cleanup == "function") {
                        cleanup();
                    } else {
                        setRef(refs[i], null);
                    }
                }
            };
        }
    };
}
function useComposedRefs(...refs) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"](composeRefs(...refs), refs);
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/music-studio-app/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Root",
    ()=>Slot,
    "Slot",
    ()=>Slot,
    "Slottable",
    ()=>Slottable,
    "createSlot",
    ()=>createSlot,
    "createSlottable",
    ()=>createSlottable
]);
// src/slot.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[" use ".trim().toString()];
function isPromiseLike(value) {
    return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
    return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
    const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
    const Slot2 = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef((props, forwardedRef)=>{
        let { children, ...slotProps } = props;
        if (isLazyComponent(children) && typeof use === "function") {
            children = use(children._payload);
        }
        const childrenArray = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Children.toArray(children);
        const slottable = childrenArray.find(isSlottable);
        if (slottable) {
            const newElement = slottable.props.children;
            const newChildren = childrenArray.map((child)=>{
                if (child === slottable) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Children.count(newElement) > 1) return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Children.only(null);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.isValidElement(newElement) ? newElement.props.children : null;
                } else {
                    return child;
                }
            });
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SlotClone, {
                ...slotProps,
                ref: forwardedRef,
                children: __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.isValidElement(newElement) ? __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.cloneElement(newElement, void 0, newChildren) : null
            });
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SlotClone, {
            ...slotProps,
            ref: forwardedRef,
            children
        });
    });
    Slot2.displayName = `${ownerName}.Slot`;
    return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
    const SlotClone = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef((props, forwardedRef)=>{
        let { children, ...slotProps } = props;
        if (isLazyComponent(children) && typeof use === "function") {
            children = use(children._payload);
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.isValidElement(children)) {
            const childrenRef = getElementRef(children);
            const props2 = mergeProps(slotProps, children.props);
            if (children.type !== __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Fragment) {
                props2.ref = forwardedRef ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeRefs"])(forwardedRef, childrenRef) : childrenRef;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.cloneElement(children, props2);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Children.count(children) > 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Children.only(null) : null;
    });
    SlotClone.displayName = `${ownerName}.SlotClone`;
    return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function createSlottable(ownerName) {
    const Slottable2 = ({ children })=>{
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children
        });
    };
    Slottable2.displayName = `${ownerName}.Slottable`;
    Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
    return Slottable2;
}
var Slottable = /* @__PURE__ */ createSlottable("Slottable");
function isSlottable(child) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
    const overrideProps = {
        ...childProps
    };
    for(const propName in childProps){
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            if (slotPropValue && childPropValue) {
                overrideProps[propName] = (...args)=>{
                    const result = childPropValue(...args);
                    slotPropValue(...args);
                    return result;
                };
            } else if (slotPropValue) {
                overrideProps[propName] = slotPropValue;
            }
        } else if (propName === "style") {
            overrideProps[propName] = {
                ...slotPropValue,
                ...childPropValue
            };
        } else if (propName === "className") {
            overrideProps[propName] = [
                slotPropValue,
                childPropValue
            ].filter(Boolean).join(" ");
        }
    }
    return {
        ...slotProps,
        ...overrideProps
    };
}
function getElementRef(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.props.ref;
    }
    return element.props.ref || element.ref;
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/music-studio-app/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clsx",
    ()=>clsx,
    "default",
    ()=>__TURBOPACK__default__export__
]);
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for(t = 0; t < o; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for(f in e)e[f] && (n && (n += " "), n += f);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
const __TURBOPACK__default__export__ = clsx;
}),
"[project]/music-studio-app/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cva",
    ()=>cva,
    "cx",
    ()=>cx
]);
/**
 * Copyright 2022 Joe Bell. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/music-studio-app/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = __TURBOPACK__imported__module__$5b$project$5d2f$music$2d$studio$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"];
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };
}),
"[project]/music-studio-app/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTailwindMerge",
    ()=>createTailwindMerge,
    "extendTailwindMerge",
    ()=>extendTailwindMerge,
    "fromTheme",
    ()=>fromTheme,
    "getDefaultConfig",
    ()=>getDefaultConfig,
    "mergeConfigs",
    ()=>mergeConfigs,
    "twJoin",
    ()=>twJoin,
    "twMerge",
    ()=>twMerge,
    "validators",
    ()=>validators
]);
/**
 * Concatenates two arrays faster than the array spread operator.
 */ const concatArrays = (array1, array2)=>{
    // Pre-allocate for better V8 optimization
    const combinedArray = new Array(array1.length + array2.length);
    for(let i = 0; i < array1.length; i++){
        combinedArray[i] = array1[i];
    }
    for(let i = 0; i < array2.length; i++){
        combinedArray[array1.length + i] = array2[i];
    }
    return combinedArray;
};
// Factory function ensures consistent object shapes
const createClassValidatorObject = (classGroupId, validator)=>({
        classGroupId,
        validator
    });
// Factory ensures consistent ClassPartObject shape
const createClassPartObject = (nextPart = new Map(), validators = null, classGroupId)=>({
        nextPart,
        validators,
        classGroupId
    });
const CLASS_PART_SEPARATOR = '-';
const EMPTY_CONFLICTS = [];
// I use two dots here because one dot is used as prefix for class groups in plugins
const ARBITRARY_PROPERTY_PREFIX = 'arbitrary..';
const createClassGroupUtils = (config)=>{
    const classMap = createClassMap(config);
    const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
    const getClassGroupId = (className)=>{
        if (className.startsWith('[') && className.endsWith(']')) {
            return getGroupIdForArbitraryProperty(className);
        }
        const classParts = className.split(CLASS_PART_SEPARATOR);
        // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and skip it.
        const startIndex = classParts[0] === '' && classParts.length > 1 ? 1 : 0;
        return getGroupRecursive(classParts, startIndex, classMap);
    };
    const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier)=>{
        if (hasPostfixModifier) {
            const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
            const baseConflicts = conflictingClassGroups[classGroupId];
            if (modifierConflicts) {
                if (baseConflicts) {
                    // Merge base conflicts with modifier conflicts
                    return concatArrays(baseConflicts, modifierConflicts);
                }
                // Only modifier conflicts
                return modifierConflicts;
            }
            // Fall back to without postfix if no modifier conflicts
            return baseConflicts || EMPTY_CONFLICTS;
        }
        return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
    };
    return {
        getClassGroupId,
        getConflictingClassGroupIds
    };
};
const getGroupRecursive = (classParts, startIndex, classPartObject)=>{
    const classPathsLength = classParts.length - startIndex;
    if (classPathsLength === 0) {
        return classPartObject.classGroupId;
    }
    const currentClassPart = classParts[startIndex];
    const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
    if (nextClassPartObject) {
        const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
        if (result) return result;
    }
    const validators = classPartObject.validators;
    if (validators === null) {
        return undefined;
    }
    // Build classRest string efficiently by joining from startIndex onwards
    const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
    const validatorsLength = validators.length;
    for(let i = 0; i < validatorsLength; i++){
        const validatorObj = validators[i];
        if (validatorObj.validator(classRest)) {
            return validatorObj.classGroupId;
        }
    }
    return undefined;
};
/**
 * Get the class group ID for an arbitrary property.
 *
 * @param className - The class name to get the group ID for. Is expected to be string starting with `[` and ending with `]`.
 */ const getGroupIdForArbitraryProperty = (className)=>className.slice(1, -1).indexOf(':') === -1 ? undefined : (()=>{
        const content = className.slice(1, -1);
        const colonIndex = content.indexOf(':');
        const property = content.slice(0, colonIndex);
        return property ? ARBITRARY_PROPERTY_PREFIX + property : undefined;
    })();
/**
 * Exported for testing only
 */ const createClassMap = (config)=>{
    const { theme, classGroups } = config;
    return processClassGroups(classGroups, theme);
};
// Split into separate functions to maintain monomorphic call sites
const processClassGroups = (classGroups, theme)=>{
    const classMap = createClassPartObject();
    for(const classGroupId in classGroups){
        const group = classGroups[classGroupId];
        processClassesRecursively(group, classMap, classGroupId, theme);
    }
    return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme)=>{
    const len = classGroup.length;
    for(let i = 0; i < len; i++){
        const classDefinition = classGroup[i];
        processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
    }
};
// Split into separate functions for each type to maintain monomorphic call sites
const processClassDefinition = (classDefinition, classPartObject, classGroupId, theme)=>{
    if (typeof classDefinition === 'string') {
        processStringDefinition(classDefinition, classPartObject, classGroupId);
        return;
    }
    if (typeof classDefinition === 'function') {
        processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
        return;
    }
    processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
const processStringDefinition = (classDefinition, classPartObject, classGroupId)=>{
    const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
    classPartObjectToEdit.classGroupId = classGroupId;
};
const processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme)=>{
    if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
    }
    if (classPartObject.validators === null) {
        classPartObject.validators = [];
    }
    classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
const processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme)=>{
    const entries = Object.entries(classDefinition);
    const len = entries.length;
    for(let i = 0; i < len; i++){
        const [key, value] = entries[i];
        processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
    }
};
const getPart = (classPartObject, path)=>{
    let current = classPartObject;
    const parts = path.split(CLASS_PART_SEPARATOR);
    const len = parts.length;
    for(let i = 0; i < len; i++){
        const part = parts[i];
        let next = current.nextPart.get(part);
        if (!next) {
            next = createClassPartObject();
            current.nextPart.set(part, next);
        }
        current = next;
    }
    return current;
};
// Type guard maintains monomorphic check
const isThemeGetter = (func)=>'isThemeGetter' in func && func.isThemeGetter === true;
// LRU cache implementation using plain objects for simplicity
const createLruCache = (maxCacheSize)=>{
    if (maxCacheSize < 1) {
        return {
            get: ()=>undefined,
            set: ()=>{}
        };
    }
    let cacheSize = 0;
    let cache = Object.create(null);
    let previousCache = Object.create(null);
    const update = (key, value)=>{
        cache[key] = value;
        cacheSize++;
        if (cacheSize > maxCacheSize) {
            cacheSize = 0;
            previousCache = cache;
            cache = Object.create(null);
        }
    };
    return {
        get (key) {
            let value = cache[key];
            if (value !== undefined) {
                return value;
            }
            if ((value = previousCache[key]) !== undefined) {
                update(key, value);
                return value;
            }
        },
        set (key, value) {
            if (key in cache) {
                cache[key] = value;
            } else {
                update(key, value);
            }
        }
    };
};
const IMPORTANT_MODIFIER = '!';
const MODIFIER_SEPARATOR = ':';
const EMPTY_MODIFIERS = [];
// Pre-allocated result object shape for consistency
const createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal)=>({
        modifiers,
        hasImportantModifier,
        baseClassName,
        maybePostfixModifierPosition,
        isExternal
    });
const createParseClassName = (config)=>{
    const { prefix, experimentalParseClassName } = config;
    /**
   * Parse class name into parts.
   *
   * Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
   * @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
   */ let parseClassName = (className)=>{
        // Use simple array with push for better performance
        const modifiers = [];
        let bracketDepth = 0;
        let parenDepth = 0;
        let modifierStart = 0;
        let postfixModifierPosition;
        const len = className.length;
        for(let index = 0; index < len; index++){
            const currentCharacter = className[index];
            if (bracketDepth === 0 && parenDepth === 0) {
                if (currentCharacter === MODIFIER_SEPARATOR) {
                    modifiers.push(className.slice(modifierStart, index));
                    modifierStart = index + 1;
                    continue;
                }
                if (currentCharacter === '/') {
                    postfixModifierPosition = index;
                    continue;
                }
            }
            if (currentCharacter === '[') bracketDepth++;
            else if (currentCharacter === ']') bracketDepth--;
            else if (currentCharacter === '(') parenDepth++;
            else if (currentCharacter === ')') parenDepth--;
        }
        const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
        // Inline important modifier check
        let baseClassName = baseClassNameWithImportantModifier;
        let hasImportantModifier = false;
        if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
            baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
            hasImportantModifier = true;
        } else if (/**
     * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
     * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
     */ baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)) {
            baseClassName = baseClassNameWithImportantModifier.slice(1);
            hasImportantModifier = true;
        }
        const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
        return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
    };
    if (prefix) {
        const fullPrefix = prefix + MODIFIER_SEPARATOR;
        const parseClassNameOriginal = parseClassName;
        parseClassName = (className)=>className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, undefined, true);
    }
    if (experimentalParseClassName) {
        const parseClassNameOriginal = parseClassName;
        parseClassName = (className)=>experimentalParseClassName({
                className,
                parseClassName: parseClassNameOriginal
            });
    }
    return parseClassName;
};
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */ const createSortModifiers = (config)=>{
    // Pre-compute weights for all known modifiers for O(1) comparison
    const modifierWeights = new Map();
    // Assign weights to sensitive modifiers (highest priority, but preserve order)
    config.orderSensitiveModifiers.forEach((mod, index)=>{
        modifierWeights.set(mod, 1000000 + index); // High weights for sensitive mods
    });
    return (modifiers)=>{
        const result = [];
        let currentSegment = [];
        // Process modifiers in one pass
        for(let i = 0; i < modifiers.length; i++){
            const modifier = modifiers[i];
            // Check if modifier is sensitive (starts with '[' or in orderSensitiveModifiers)
            const isArbitrary = modifier[0] === '[';
            const isOrderSensitive = modifierWeights.has(modifier);
            if (isArbitrary || isOrderSensitive) {
                // Sort and flush current segment alphabetically
                if (currentSegment.length > 0) {
                    currentSegment.sort();
                    result.push(...currentSegment);
                    currentSegment = [];
                }
                result.push(modifier);
            } else {
                // Regular modifier - add to current segment for batch sorting
                currentSegment.push(modifier);
            }
        }
        // Sort and add any remaining segment items
        if (currentSegment.length > 0) {
            currentSegment.sort();
            result.push(...currentSegment);
        }
        return result;
    };
};
const createConfigUtils = (config)=>({
        cache: createLruCache(config.cacheSize),
        parseClassName: createParseClassName(config),
        sortModifiers: createSortModifiers(config),
        ...createClassGroupUtils(config)
    });
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils)=>{
    const { parseClassName, getClassGroupId, getConflictingClassGroupIds, sortModifiers } = configUtils;
    /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */ const classGroupsInConflict = [];
    const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
    let result = '';
    for(let index = classNames.length - 1; index >= 0; index -= 1){
        const originalClassName = classNames[index];
        const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
        if (isExternal) {
            result = originalClassName + (result.length > 0 ? ' ' + result : result);
            continue;
        }
        let hasPostfixModifier = !!maybePostfixModifierPosition;
        let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
        if (!classGroupId) {
            if (!hasPostfixModifier) {
                // Not a Tailwind class
                result = originalClassName + (result.length > 0 ? ' ' + result : result);
                continue;
            }
            classGroupId = getClassGroupId(baseClassName);
            if (!classGroupId) {
                // Not a Tailwind class
                result = originalClassName + (result.length > 0 ? ' ' + result : result);
                continue;
            }
            hasPostfixModifier = false;
        }
        // Fast path: skip sorting for empty or single modifier
        const variantModifier = modifiers.length === 0 ? '' : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(':');
        const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
        const classId = modifierId + classGroupId;
        if (classGroupsInConflict.indexOf(classId) > -1) {
            continue;
        }
        classGroupsInConflict.push(classId);
        const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
        for(let i = 0; i < conflictGroups.length; ++i){
            const group = conflictGroups[i];
            classGroupsInConflict.push(modifierId + group);
        }
        // Tailwind class not in conflict
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
    }
    return result;
};
/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */ const twJoin = (...classLists)=>{
    let index = 0;
    let argument;
    let resolvedValue;
    let string = '';
    while(index < classLists.length){
        if (argument = classLists[index++]) {
            if (resolvedValue = toValue(argument)) {
                string && (string += ' ');
                string += resolvedValue;
            }
        }
    }
    return string;
};
const toValue = (mix)=>{
    // Fast path for strings
    if (typeof mix === 'string') {
        return mix;
    }
    let resolvedValue;
    let string = '';
    for(let k = 0; k < mix.length; k++){
        if (mix[k]) {
            if (resolvedValue = toValue(mix[k])) {
                string && (string += ' ');
                string += resolvedValue;
            }
        }
    }
    return string;
};
const createTailwindMerge = (createConfigFirst, ...createConfigRest)=>{
    let configUtils;
    let cacheGet;
    let cacheSet;
    let functionToCall;
    const initTailwindMerge = (classList)=>{
        const config = createConfigRest.reduce((previousConfig, createConfigCurrent)=>createConfigCurrent(previousConfig), createConfigFirst());
        configUtils = createConfigUtils(config);
        cacheGet = configUtils.cache.get;
        cacheSet = configUtils.cache.set;
        functionToCall = tailwindMerge;
        return tailwindMerge(classList);
    };
    const tailwindMerge = (classList)=>{
        const cachedResult = cacheGet(classList);
        if (cachedResult) {
            return cachedResult;
        }
        const result = mergeClassList(classList, configUtils);
        cacheSet(classList, result);
        return result;
    };
    functionToCall = initTailwindMerge;
    return (...args)=>functionToCall(twJoin(...args));
};
const fallbackThemeArr = [];
const fromTheme = (key)=>{
    const themeGetter = (theme)=>theme[key] || fallbackThemeArr;
    themeGetter.isThemeGetter = true;
    return themeGetter;
};
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fractionRegex = /^\d+\/\d+$/;
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
// Shadow always begins with x and y offset separated by underscore optionally prepended by inset
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isFraction = (value)=>fractionRegex.test(value);
const isNumber = (value)=>!!value && !Number.isNaN(Number(value));
const isInteger = (value)=>!!value && Number.isInteger(Number(value));
const isPercent = (value)=>value.endsWith('%') && isNumber(value.slice(0, -1));
const isTshirtSize = (value)=>tshirtUnitRegex.test(value);
const isAny = ()=>true;
const isLengthOnly = (value)=>// `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
    // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
    // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
    lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
const isNever = ()=>false;
const isShadow = (value)=>shadowRegex.test(value);
const isImage = (value)=>imageRegex.test(value);
const isAnyNonArbitrary = (value)=>!isArbitraryValue(value) && !isArbitraryVariable(value);
const isArbitrarySize = (value)=>getIsArbitraryValue(value, isLabelSize, isNever);
const isArbitraryValue = (value)=>arbitraryValueRegex.test(value);
const isArbitraryLength = (value)=>getIsArbitraryValue(value, isLabelLength, isLengthOnly);
const isArbitraryNumber = (value)=>getIsArbitraryValue(value, isLabelNumber, isNumber);
const isArbitraryPosition = (value)=>getIsArbitraryValue(value, isLabelPosition, isNever);
const isArbitraryImage = (value)=>getIsArbitraryValue(value, isLabelImage, isImage);
const isArbitraryShadow = (value)=>getIsArbitraryValue(value, isLabelShadow, isShadow);
const isArbitraryVariable = (value)=>arbitraryVariableRegex.test(value);
const isArbitraryVariableLength = (value)=>getIsArbitraryVariable(value, isLabelLength);
const isArbitraryVariableFamilyName = (value)=>getIsArbitraryVariable(value, isLabelFamilyName);
const isArbitraryVariablePosition = (value)=>getIsArbitraryVariable(value, isLabelPosition);
const isArbitraryVariableSize = (value)=>getIsArbitraryVariable(value, isLabelSize);
const isArbitraryVariableImage = (value)=>getIsArbitraryVariable(value, isLabelImage);
const isArbitraryVariableShadow = (value)=>getIsArbitraryVariable(value, isLabelShadow, true);
// Helpers
const getIsArbitraryValue = (value, testLabel, testValue)=>{
    const result = arbitraryValueRegex.exec(value);
    if (result) {
        if (result[1]) {
            return testLabel(result[1]);
        }
        return testValue(result[2]);
    }
    return false;
};
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false)=>{
    const result = arbitraryVariableRegex.exec(value);
    if (result) {
        if (result[1]) {
            return testLabel(result[1]);
        }
        return shouldMatchNoLabel;
    }
    return false;
};
// Labels
const isLabelPosition = (label)=>label === 'position' || label === 'percentage';
const isLabelImage = (label)=>label === 'image' || label === 'url';
const isLabelSize = (label)=>label === 'length' || label === 'size' || label === 'bg-size';
const isLabelLength = (label)=>label === 'length';
const isLabelNumber = (label)=>label === 'number';
const isLabelFamilyName = (label)=>label === 'family-name';
const isLabelShadow = (label)=>label === 'shadow';
const validators = /*#__PURE__*/ Object.defineProperty({
    __proto__: null,
    isAny,
    isAnyNonArbitrary,
    isArbitraryImage,
    isArbitraryLength,
    isArbitraryNumber,
    isArbitraryPosition,
    isArbitraryShadow,
    isArbitrarySize,
    isArbitraryValue,
    isArbitraryVariable,
    isArbitraryVariableFamilyName,
    isArbitraryVariableImage,
    isArbitraryVariableLength,
    isArbitraryVariablePosition,
    isArbitraryVariableShadow,
    isArbitraryVariableSize,
    isFraction,
    isInteger,
    isNumber,
    isPercent,
    isTshirtSize
}, Symbol.toStringTag, {
    value: 'Module'
});
const getDefaultConfig = ()=>{
    /**
   * Theme getters for theme variable namespaces
   * @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
   */ /***/ const themeColor = fromTheme('color');
    const themeFont = fromTheme('font');
    const themeText = fromTheme('text');
    const themeFontWeight = fromTheme('font-weight');
    const themeTracking = fromTheme('tracking');
    const themeLeading = fromTheme('leading');
    const themeBreakpoint = fromTheme('breakpoint');
    const themeContainer = fromTheme('container');
    const themeSpacing = fromTheme('spacing');
    const themeRadius = fromTheme('radius');
    const themeShadow = fromTheme('shadow');
    const themeInsetShadow = fromTheme('inset-shadow');
    const themeTextShadow = fromTheme('text-shadow');
    const themeDropShadow = fromTheme('drop-shadow');
    const themeBlur = fromTheme('blur');
    const themePerspective = fromTheme('perspective');
    const themeAspect = fromTheme('aspect');
    const themeEase = fromTheme('ease');
    const themeAnimate = fromTheme('animate');
    /**
   * Helpers to avoid repeating the same scales
   *
   * We use functions that create a new array every time they're called instead of static arrays.
   * This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
   */ /***/ const scaleBreak = ()=>[
            'auto',
            'avoid',
            'all',
            'avoid-page',
            'page',
            'left',
            'right',
            'column'
        ];
    const scalePosition = ()=>[
            'center',
            'top',
            'bottom',
            'left',
            'right',
            'top-left',
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            'left-top',
            'top-right',
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            'right-top',
            'bottom-right',
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            'right-bottom',
            'bottom-left',
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            'left-bottom'
        ];
    const scalePositionWithArbitrary = ()=>[
            ...scalePosition(),
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleOverflow = ()=>[
            'auto',
            'hidden',
            'clip',
            'visible',
            'scroll'
        ];
    const scaleOverscroll = ()=>[
            'auto',
            'contain',
            'none'
        ];
    const scaleUnambiguousSpacing = ()=>[
            isArbitraryVariable,
            isArbitraryValue,
            themeSpacing
        ];
    const scaleInset = ()=>[
            isFraction,
            'full',
            'auto',
            ...scaleUnambiguousSpacing()
        ];
    const scaleGridTemplateColsRows = ()=>[
            isInteger,
            'none',
            'subgrid',
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleGridColRowStartAndEnd = ()=>[
            'auto',
            {
                span: [
                    'full',
                    isInteger,
                    isArbitraryVariable,
                    isArbitraryValue
                ]
            },
            isInteger,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleGridColRowStartOrEnd = ()=>[
            isInteger,
            'auto',
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleGridAutoColsRows = ()=>[
            'auto',
            'min',
            'max',
            'fr',
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleAlignPrimaryAxis = ()=>[
            'start',
            'end',
            'center',
            'between',
            'around',
            'evenly',
            'stretch',
            'baseline',
            'center-safe',
            'end-safe'
        ];
    const scaleAlignSecondaryAxis = ()=>[
            'start',
            'end',
            'center',
            'stretch',
            'center-safe',
            'end-safe'
        ];
    const scaleMargin = ()=>[
            'auto',
            ...scaleUnambiguousSpacing()
        ];
    const scaleSizing = ()=>[
            isFraction,
            'auto',
            'full',
            'dvw',
            'dvh',
            'lvw',
            'lvh',
            'svw',
            'svh',
            'min',
            'max',
            'fit',
            ...scaleUnambiguousSpacing()
        ];
    const scaleColor = ()=>[
            themeColor,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleBgPosition = ()=>[
            ...scalePosition(),
            isArbitraryVariablePosition,
            isArbitraryPosition,
            {
                position: [
                    isArbitraryVariable,
                    isArbitraryValue
                ]
            }
        ];
    const scaleBgRepeat = ()=>[
            'no-repeat',
            {
                repeat: [
                    '',
                    'x',
                    'y',
                    'space',
                    'round'
                ]
            }
        ];
    const scaleBgSize = ()=>[
            'auto',
            'cover',
            'contain',
            isArbitraryVariableSize,
            isArbitrarySize,
            {
                size: [
                    isArbitraryVariable,
                    isArbitraryValue
                ]
            }
        ];
    const scaleGradientStopPosition = ()=>[
            isPercent,
            isArbitraryVariableLength,
            isArbitraryLength
        ];
    const scaleRadius = ()=>[
            // Deprecated since Tailwind CSS v4.0.0
            '',
            'none',
            'full',
            themeRadius,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleBorderWidth = ()=>[
            '',
            isNumber,
            isArbitraryVariableLength,
            isArbitraryLength
        ];
    const scaleLineStyle = ()=>[
            'solid',
            'dashed',
            'dotted',
            'double'
        ];
    const scaleBlendMode = ()=>[
            'normal',
            'multiply',
            'screen',
            'overlay',
            'darken',
            'lighten',
            'color-dodge',
            'color-burn',
            'hard-light',
            'soft-light',
            'difference',
            'exclusion',
            'hue',
            'saturation',
            'color',
            'luminosity'
        ];
    const scaleMaskImagePosition = ()=>[
            isNumber,
            isPercent,
            isArbitraryVariablePosition,
            isArbitraryPosition
        ];
    const scaleBlur = ()=>[
            // Deprecated since Tailwind CSS v4.0.0
            '',
            'none',
            themeBlur,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleRotate = ()=>[
            'none',
            isNumber,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleScale = ()=>[
            'none',
            isNumber,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleSkew = ()=>[
            isNumber,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleTranslate = ()=>[
            isFraction,
            'full',
            ...scaleUnambiguousSpacing()
        ];
    return {
        cacheSize: 500,
        theme: {
            animate: [
                'spin',
                'ping',
                'pulse',
                'bounce'
            ],
            aspect: [
                'video'
            ],
            blur: [
                isTshirtSize
            ],
            breakpoint: [
                isTshirtSize
            ],
            color: [
                isAny
            ],
            container: [
                isTshirtSize
            ],
            'drop-shadow': [
                isTshirtSize
            ],
            ease: [
                'in',
                'out',
                'in-out'
            ],
            font: [
                isAnyNonArbitrary
            ],
            'font-weight': [
                'thin',
                'extralight',
                'light',
                'normal',
                'medium',
                'semibold',
                'bold',
                'extrabold',
                'black'
            ],
            'inset-shadow': [
                isTshirtSize
            ],
            leading: [
                'none',
                'tight',
                'snug',
                'normal',
                'relaxed',
                'loose'
            ],
            perspective: [
                'dramatic',
                'near',
                'normal',
                'midrange',
                'distant',
                'none'
            ],
            radius: [
                isTshirtSize
            ],
            shadow: [
                isTshirtSize
            ],
            spacing: [
                'px',
                isNumber
            ],
            text: [
                isTshirtSize
            ],
            'text-shadow': [
                isTshirtSize
            ],
            tracking: [
                'tighter',
                'tight',
                'normal',
                'wide',
                'wider',
                'widest'
            ]
        },
        classGroups: {
            // --------------
            // --- Layout ---
            // --------------
            /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */ aspect: [
                {
                    aspect: [
                        'auto',
                        'square',
                        isFraction,
                        isArbitraryValue,
                        isArbitraryVariable,
                        themeAspect
                    ]
                }
            ],
            /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */ container: [
                'container'
            ],
            /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */ columns: [
                {
                    columns: [
                        isNumber,
                        isArbitraryValue,
                        isArbitraryVariable,
                        themeContainer
                    ]
                }
            ],
            /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */ 'break-after': [
                {
                    'break-after': scaleBreak()
                }
            ],
            /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */ 'break-before': [
                {
                    'break-before': scaleBreak()
                }
            ],
            /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */ 'break-inside': [
                {
                    'break-inside': [
                        'auto',
                        'avoid',
                        'avoid-page',
                        'avoid-column'
                    ]
                }
            ],
            /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */ 'box-decoration': [
                {
                    'box-decoration': [
                        'slice',
                        'clone'
                    ]
                }
            ],
            /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */ box: [
                {
                    box: [
                        'border',
                        'content'
                    ]
                }
            ],
            /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */ display: [
                'block',
                'inline-block',
                'inline',
                'flex',
                'inline-flex',
                'table',
                'inline-table',
                'table-caption',
                'table-cell',
                'table-column',
                'table-column-group',
                'table-footer-group',
                'table-header-group',
                'table-row-group',
                'table-row',
                'flow-root',
                'grid',
                'inline-grid',
                'contents',
                'list-item',
                'hidden'
            ],
            /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */ sr: [
                'sr-only',
                'not-sr-only'
            ],
            /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */ float: [
                {
                    float: [
                        'right',
                        'left',
                        'none',
                        'start',
                        'end'
                    ]
                }
            ],
            /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */ clear: [
                {
                    clear: [
                        'left',
                        'right',
                        'both',
                        'none',
                        'start',
                        'end'
                    ]
                }
            ],
            /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */ isolation: [
                'isolate',
                'isolation-auto'
            ],
            /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */ 'object-fit': [
                {
                    object: [
                        'contain',
                        'cover',
                        'fill',
                        'none',
                        'scale-down'
                    ]
                }
            ],
            /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */ 'object-position': [
                {
                    object: scalePositionWithArbitrary()
                }
            ],
            /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */ overflow: [
                {
                    overflow: scaleOverflow()
                }
            ],
            /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */ 'overflow-x': [
                {
                    'overflow-x': scaleOverflow()
                }
            ],
            /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */ 'overflow-y': [
                {
                    'overflow-y': scaleOverflow()
                }
            ],
            /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */ overscroll: [
                {
                    overscroll: scaleOverscroll()
                }
            ],
            /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */ 'overscroll-x': [
                {
                    'overscroll-x': scaleOverscroll()
                }
            ],
            /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */ 'overscroll-y': [
                {
                    'overscroll-y': scaleOverscroll()
                }
            ],
            /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */ position: [
                'static',
                'fixed',
                'absolute',
                'relative',
                'sticky'
            ],
            /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ inset: [
                {
                    inset: scaleInset()
                }
            ],
            /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ 'inset-x': [
                {
                    'inset-x': scaleInset()
                }
            ],
            /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ 'inset-y': [
                {
                    'inset-y': scaleInset()
                }
            ],
            /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ start: [
                {
                    start: scaleInset()
                }
            ],
            /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ end: [
                {
                    end: scaleInset()
                }
            ],
            /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ top: [
                {
                    top: scaleInset()
                }
            ],
            /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ right: [
                {
                    right: scaleInset()
                }
            ],
            /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ bottom: [
                {
                    bottom: scaleInset()
                }
            ],
            /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ left: [
                {
                    left: scaleInset()
                }
            ],
            /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */ visibility: [
                'visible',
                'invisible',
                'collapse'
            ],
            /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */ z: [
                {
                    z: [
                        isInteger,
                        'auto',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // ------------------------
            // --- Flexbox and Grid ---
            // ------------------------
            /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */ basis: [
                {
                    basis: [
                        isFraction,
                        'full',
                        'auto',
                        themeContainer,
                        ...scaleUnambiguousSpacing()
                    ]
                }
            ],
            /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */ 'flex-direction': [
                {
                    flex: [
                        'row',
                        'row-reverse',
                        'col',
                        'col-reverse'
                    ]
                }
            ],
            /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */ 'flex-wrap': [
                {
                    flex: [
                        'nowrap',
                        'wrap',
                        'wrap-reverse'
                    ]
                }
            ],
            /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */ flex: [
                {
                    flex: [
                        isNumber,
                        isFraction,
                        'auto',
                        'initial',
                        'none',
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */ grow: [
                {
                    grow: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */ shrink: [
                {
                    shrink: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */ order: [
                {
                    order: [
                        isInteger,
                        'first',
                        'last',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */ 'grid-cols': [
                {
                    'grid-cols': scaleGridTemplateColsRows()
                }
            ],
            /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */ 'col-start-end': [
                {
                    col: scaleGridColRowStartAndEnd()
                }
            ],
            /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */ 'col-start': [
                {
                    'col-start': scaleGridColRowStartOrEnd()
                }
            ],
            /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */ 'col-end': [
                {
                    'col-end': scaleGridColRowStartOrEnd()
                }
            ],
            /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */ 'grid-rows': [
                {
                    'grid-rows': scaleGridTemplateColsRows()
                }
            ],
            /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */ 'row-start-end': [
                {
                    row: scaleGridColRowStartAndEnd()
                }
            ],
            /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */ 'row-start': [
                {
                    'row-start': scaleGridColRowStartOrEnd()
                }
            ],
            /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */ 'row-end': [
                {
                    'row-end': scaleGridColRowStartOrEnd()
                }
            ],
            /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */ 'grid-flow': [
                {
                    'grid-flow': [
                        'row',
                        'col',
                        'dense',
                        'row-dense',
                        'col-dense'
                    ]
                }
            ],
            /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */ 'auto-cols': [
                {
                    'auto-cols': scaleGridAutoColsRows()
                }
            ],
            /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */ 'auto-rows': [
                {
                    'auto-rows': scaleGridAutoColsRows()
                }
            ],
            /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */ gap: [
                {
                    gap: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */ 'gap-x': [
                {
                    'gap-x': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */ 'gap-y': [
                {
                    'gap-y': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */ 'justify-content': [
                {
                    justify: [
                        ...scaleAlignPrimaryAxis(),
                        'normal'
                    ]
                }
            ],
            /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */ 'justify-items': [
                {
                    'justify-items': [
                        ...scaleAlignSecondaryAxis(),
                        'normal'
                    ]
                }
            ],
            /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */ 'justify-self': [
                {
                    'justify-self': [
                        'auto',
                        ...scaleAlignSecondaryAxis()
                    ]
                }
            ],
            /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */ 'align-content': [
                {
                    content: [
                        'normal',
                        ...scaleAlignPrimaryAxis()
                    ]
                }
            ],
            /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */ 'align-items': [
                {
                    items: [
                        ...scaleAlignSecondaryAxis(),
                        {
                            baseline: [
                                '',
                                'last'
                            ]
                        }
                    ]
                }
            ],
            /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */ 'align-self': [
                {
                    self: [
                        'auto',
                        ...scaleAlignSecondaryAxis(),
                        {
                            baseline: [
                                '',
                                'last'
                            ]
                        }
                    ]
                }
            ],
            /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */ 'place-content': [
                {
                    'place-content': scaleAlignPrimaryAxis()
                }
            ],
            /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */ 'place-items': [
                {
                    'place-items': [
                        ...scaleAlignSecondaryAxis(),
                        'baseline'
                    ]
                }
            ],
            /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */ 'place-self': [
                {
                    'place-self': [
                        'auto',
                        ...scaleAlignSecondaryAxis()
                    ]
                }
            ],
            // Spacing
            /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */ p: [
                {
                    p: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */ px: [
                {
                    px: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */ py: [
                {
                    py: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */ ps: [
                {
                    ps: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */ pe: [
                {
                    pe: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */ pt: [
                {
                    pt: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */ pr: [
                {
                    pr: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */ pb: [
                {
                    pb: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */ pl: [
                {
                    pl: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */ m: [
                {
                    m: scaleMargin()
                }
            ],
            /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */ mx: [
                {
                    mx: scaleMargin()
                }
            ],
            /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */ my: [
                {
                    my: scaleMargin()
                }
            ],
            /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */ ms: [
                {
                    ms: scaleMargin()
                }
            ],
            /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */ me: [
                {
                    me: scaleMargin()
                }
            ],
            /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */ mt: [
                {
                    mt: scaleMargin()
                }
            ],
            /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */ mr: [
                {
                    mr: scaleMargin()
                }
            ],
            /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */ mb: [
                {
                    mb: scaleMargin()
                }
            ],
            /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */ ml: [
                {
                    ml: scaleMargin()
                }
            ],
            /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */ 'space-x': [
                {
                    'space-x': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */ 'space-x-reverse': [
                'space-x-reverse'
            ],
            /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */ 'space-y': [
                {
                    'space-y': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */ 'space-y-reverse': [
                'space-y-reverse'
            ],
            // --------------
            // --- Sizing ---
            // --------------
            /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */ size: [
                {
                    size: scaleSizing()
                }
            ],
            /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */ w: [
                {
                    w: [
                        themeContainer,
                        'screen',
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */ 'min-w': [
                {
                    'min-w': [
                        themeContainer,
                        'screen',
                        /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */ 'none',
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */ 'max-w': [
                {
                    'max-w': [
                        themeContainer,
                        'screen',
                        'none',
                        /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */ 'prose',
                        /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */ {
                            screen: [
                                themeBreakpoint
                            ]
                        },
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */ h: [
                {
                    h: [
                        'screen',
                        'lh',
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */ 'min-h': [
                {
                    'min-h': [
                        'screen',
                        'lh',
                        'none',
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */ 'max-h': [
                {
                    'max-h': [
                        'screen',
                        'lh',
                        ...scaleSizing()
                    ]
                }
            ],
            // ------------------
            // --- Typography ---
            // ------------------
            /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */ 'font-size': [
                {
                    text: [
                        'base',
                        themeText,
                        isArbitraryVariableLength,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */ 'font-smoothing': [
                'antialiased',
                'subpixel-antialiased'
            ],
            /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */ 'font-style': [
                'italic',
                'not-italic'
            ],
            /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */ 'font-weight': [
                {
                    font: [
                        themeFontWeight,
                        isArbitraryVariable,
                        isArbitraryNumber
                    ]
                }
            ],
            /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */ 'font-stretch': [
                {
                    'font-stretch': [
                        'ultra-condensed',
                        'extra-condensed',
                        'condensed',
                        'semi-condensed',
                        'normal',
                        'semi-expanded',
                        'expanded',
                        'extra-expanded',
                        'ultra-expanded',
                        isPercent,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */ 'font-family': [
                {
                    font: [
                        isArbitraryVariableFamilyName,
                        isArbitraryValue,
                        themeFont
                    ]
                }
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-normal': [
                'normal-nums'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-ordinal': [
                'ordinal'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-slashed-zero': [
                'slashed-zero'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-figure': [
                'lining-nums',
                'oldstyle-nums'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-spacing': [
                'proportional-nums',
                'tabular-nums'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-fraction': [
                'diagonal-fractions',
                'stacked-fractions'
            ],
            /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */ tracking: [
                {
                    tracking: [
                        themeTracking,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */ 'line-clamp': [
                {
                    'line-clamp': [
                        isNumber,
                        'none',
                        isArbitraryVariable,
                        isArbitraryNumber
                    ]
                }
            ],
            /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */ leading: [
                {
                    leading: [
                        /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */ themeLeading,
                        ...scaleUnambiguousSpacing()
                    ]
                }
            ],
            /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */ 'list-image': [
                {
                    'list-image': [
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */ 'list-style-position': [
                {
                    list: [
                        'inside',
                        'outside'
                    ]
                }
            ],
            /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */ 'list-style-type': [
                {
                    list: [
                        'disc',
                        'decimal',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */ 'text-alignment': [
                {
                    text: [
                        'left',
                        'center',
                        'right',
                        'justify',
                        'start',
                        'end'
                    ]
                }
            ],
            /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */ 'placeholder-color': [
                {
                    placeholder: scaleColor()
                }
            ],
            /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */ 'text-color': [
                {
                    text: scaleColor()
                }
            ],
            /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */ 'text-decoration': [
                'underline',
                'overline',
                'line-through',
                'no-underline'
            ],
            /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */ 'text-decoration-style': [
                {
                    decoration: [
                        ...scaleLineStyle(),
                        'wavy'
                    ]
                }
            ],
            /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */ 'text-decoration-thickness': [
                {
                    decoration: [
                        isNumber,
                        'from-font',
                        'auto',
                        isArbitraryVariable,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */ 'text-decoration-color': [
                {
                    decoration: scaleColor()
                }
            ],
            /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */ 'underline-offset': [
                {
                    'underline-offset': [
                        isNumber,
                        'auto',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */ 'text-transform': [
                'uppercase',
                'lowercase',
                'capitalize',
                'normal-case'
            ],
            /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */ 'text-overflow': [
                'truncate',
                'text-ellipsis',
                'text-clip'
            ],
            /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */ 'text-wrap': [
                {
                    text: [
                        'wrap',
                        'nowrap',
                        'balance',
                        'pretty'
                    ]
                }
            ],
            /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */ indent: [
                {
                    indent: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */ 'vertical-align': [
                {
                    align: [
                        'baseline',
                        'top',
                        'middle',
                        'bottom',
                        'text-top',
                        'text-bottom',
                        'sub',
                        'super',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */ whitespace: [
                {
                    whitespace: [
                        'normal',
                        'nowrap',
                        'pre',
                        'pre-line',
                        'pre-wrap',
                        'break-spaces'
                    ]
                }
            ],
            /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */ break: [
                {
                    break: [
                        'normal',
                        'words',
                        'all',
                        'keep'
                    ]
                }
            ],
            /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */ wrap: [
                {
                    wrap: [
                        'break-word',
                        'anywhere',
                        'normal'
                    ]
                }
            ],
            /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */ hyphens: [
                {
                    hyphens: [
                        'none',
                        'manual',
                        'auto'
                    ]
                }
            ],
            /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */ content: [
                {
                    content: [
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // -------------------
            // --- Backgrounds ---
            // -------------------
            /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */ 'bg-attachment': [
                {
                    bg: [
                        'fixed',
                        'local',
                        'scroll'
                    ]
                }
            ],
            /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */ 'bg-clip': [
                {
                    'bg-clip': [
                        'border',
                        'padding',
                        'content',
                        'text'
                    ]
                }
            ],
            /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */ 'bg-origin': [
                {
                    'bg-origin': [
                        'border',
                        'padding',
                        'content'
                    ]
                }
            ],
            /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */ 'bg-position': [
                {
                    bg: scaleBgPosition()
                }
            ],
            /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */ 'bg-repeat': [
                {
                    bg: scaleBgRepeat()
                }
            ],
            /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */ 'bg-size': [
                {
                    bg: scaleBgSize()
                }
            ],
            /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */ 'bg-image': [
                {
                    bg: [
                        'none',
                        {
                            linear: [
                                {
                                    to: [
                                        't',
                                        'tr',
                                        'r',
                                        'br',
                                        'b',
                                        'bl',
                                        'l',
                                        'tl'
                                    ]
                                },
                                isInteger,
                                isArbitraryVariable,
                                isArbitraryValue
                            ],
                            radial: [
                                '',
                                isArbitraryVariable,
                                isArbitraryValue
                            ],
                            conic: [
                                isInteger,
                                isArbitraryVariable,
                                isArbitraryValue
                            ]
                        },
                        isArbitraryVariableImage,
                        isArbitraryImage
                    ]
                }
            ],
            /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */ 'bg-color': [
                {
                    bg: scaleColor()
                }
            ],
            /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-from-pos': [
                {
                    from: scaleGradientStopPosition()
                }
            ],
            /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-via-pos': [
                {
                    via: scaleGradientStopPosition()
                }
            ],
            /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-to-pos': [
                {
                    to: scaleGradientStopPosition()
                }
            ],
            /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-from': [
                {
                    from: scaleColor()
                }
            ],
            /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-via': [
                {
                    via: scaleColor()
                }
            ],
            /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-to': [
                {
                    to: scaleColor()
                }
            ],
            // ---------------
            // --- Borders ---
            // ---------------
            /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */ rounded: [
                {
                    rounded: scaleRadius()
                }
            ],
            /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-s': [
                {
                    'rounded-s': scaleRadius()
                }
            ],
            /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-e': [
                {
                    'rounded-e': scaleRadius()
                }
            ],
            /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-t': [
                {
                    'rounded-t': scaleRadius()
                }
            ],
            /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-r': [
                {
                    'rounded-r': scaleRadius()
                }
            ],
            /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-b': [
                {
                    'rounded-b': scaleRadius()
                }
            ],
            /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-l': [
                {
                    'rounded-l': scaleRadius()
                }
            ],
            /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-ss': [
                {
                    'rounded-ss': scaleRadius()
                }
            ],
            /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-se': [
                {
                    'rounded-se': scaleRadius()
                }
            ],
            /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-ee': [
                {
                    'rounded-ee': scaleRadius()
                }
            ],
            /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-es': [
                {
                    'rounded-es': scaleRadius()
                }
            ],
            /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-tl': [
                {
                    'rounded-tl': scaleRadius()
                }
            ],
            /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-tr': [
                {
                    'rounded-tr': scaleRadius()
                }
            ],
            /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-br': [
                {
                    'rounded-br': scaleRadius()
                }
            ],
            /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-bl': [
                {
                    'rounded-bl': scaleRadius()
                }
            ],
            /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w': [
                {
                    border: scaleBorderWidth()
                }
            ],
            /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-x': [
                {
                    'border-x': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-y': [
                {
                    'border-y': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-s': [
                {
                    'border-s': scaleBorderWidth()
                }
            ],
            /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-e': [
                {
                    'border-e': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-t': [
                {
                    'border-t': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-r': [
                {
                    'border-r': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-b': [
                {
                    'border-b': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-l': [
                {
                    'border-l': scaleBorderWidth()
                }
            ],
            /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */ 'divide-x': [
                {
                    'divide-x': scaleBorderWidth()
                }
            ],
            /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */ 'divide-x-reverse': [
                'divide-x-reverse'
            ],
            /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */ 'divide-y': [
                {
                    'divide-y': scaleBorderWidth()
                }
            ],
            /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */ 'divide-y-reverse': [
                'divide-y-reverse'
            ],
            /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */ 'border-style': [
                {
                    border: [
                        ...scaleLineStyle(),
                        'hidden',
                        'none'
                    ]
                }
            ],
            /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */ 'divide-style': [
                {
                    divide: [
                        ...scaleLineStyle(),
                        'hidden',
                        'none'
                    ]
                }
            ],
            /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color': [
                {
                    border: scaleColor()
                }
            ],
            /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-x': [
                {
                    'border-x': scaleColor()
                }
            ],
            /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-y': [
                {
                    'border-y': scaleColor()
                }
            ],
            /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-s': [
                {
                    'border-s': scaleColor()
                }
            ],
            /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-e': [
                {
                    'border-e': scaleColor()
                }
            ],
            /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-t': [
                {
                    'border-t': scaleColor()
                }
            ],
            /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-r': [
                {
                    'border-r': scaleColor()
                }
            ],
            /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-b': [
                {
                    'border-b': scaleColor()
                }
            ],
            /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-l': [
                {
                    'border-l': scaleColor()
                }
            ],
            /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */ 'divide-color': [
                {
                    divide: scaleColor()
                }
            ],
            /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */ 'outline-style': [
                {
                    outline: [
                        ...scaleLineStyle(),
                        'none',
                        'hidden'
                    ]
                }
            ],
            /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */ 'outline-offset': [
                {
                    'outline-offset': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */ 'outline-w': [
                {
                    outline: [
                        '',
                        isNumber,
                        isArbitraryVariableLength,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */ 'outline-color': [
                {
                    outline: scaleColor()
                }
            ],
            // ---------------
            // --- Effects ---
            // ---------------
            /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */ shadow: [
                {
                    shadow: [
                        // Deprecated since Tailwind CSS v4.0.0
                        '',
                        'none',
                        themeShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */ 'shadow-color': [
                {
                    shadow: scaleColor()
                }
            ],
            /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */ 'inset-shadow': [
                {
                    'inset-shadow': [
                        'none',
                        themeInsetShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */ 'inset-shadow-color': [
                {
                    'inset-shadow': scaleColor()
                }
            ],
            /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */ 'ring-w': [
                {
                    ring: scaleBorderWidth()
                }
            ],
            /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */ 'ring-w-inset': [
                'ring-inset'
            ],
            /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */ 'ring-color': [
                {
                    ring: scaleColor()
                }
            ],
            /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */ 'ring-offset-w': [
                {
                    'ring-offset': [
                        isNumber,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */ 'ring-offset-color': [
                {
                    'ring-offset': scaleColor()
                }
            ],
            /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */ 'inset-ring-w': [
                {
                    'inset-ring': scaleBorderWidth()
                }
            ],
            /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */ 'inset-ring-color': [
                {
                    'inset-ring': scaleColor()
                }
            ],
            /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */ 'text-shadow': [
                {
                    'text-shadow': [
                        'none',
                        themeTextShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */ 'text-shadow-color': [
                {
                    'text-shadow': scaleColor()
                }
            ],
            /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */ opacity: [
                {
                    opacity: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */ 'mix-blend': [
                {
                    'mix-blend': [
                        ...scaleBlendMode(),
                        'plus-darker',
                        'plus-lighter'
                    ]
                }
            ],
            /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */ 'bg-blend': [
                {
                    'bg-blend': scaleBlendMode()
                }
            ],
            /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */ 'mask-clip': [
                {
                    'mask-clip': [
                        'border',
                        'padding',
                        'content',
                        'fill',
                        'stroke',
                        'view'
                    ]
                },
                'mask-no-clip'
            ],
            /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */ 'mask-composite': [
                {
                    mask: [
                        'add',
                        'subtract',
                        'intersect',
                        'exclude'
                    ]
                }
            ],
            /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */ 'mask-image-linear-pos': [
                {
                    'mask-linear': [
                        isNumber
                    ]
                }
            ],
            'mask-image-linear-from-pos': [
                {
                    'mask-linear-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-linear-to-pos': [
                {
                    'mask-linear-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-linear-from-color': [
                {
                    'mask-linear-from': scaleColor()
                }
            ],
            'mask-image-linear-to-color': [
                {
                    'mask-linear-to': scaleColor()
                }
            ],
            'mask-image-t-from-pos': [
                {
                    'mask-t-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-t-to-pos': [
                {
                    'mask-t-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-t-from-color': [
                {
                    'mask-t-from': scaleColor()
                }
            ],
            'mask-image-t-to-color': [
                {
                    'mask-t-to': scaleColor()
                }
            ],
            'mask-image-r-from-pos': [
                {
                    'mask-r-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-r-to-pos': [
                {
                    'mask-r-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-r-from-color': [
                {
                    'mask-r-from': scaleColor()
                }
            ],
            'mask-image-r-to-color': [
                {
                    'mask-r-to': scaleColor()
                }
            ],
            'mask-image-b-from-pos': [
                {
                    'mask-b-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-b-to-pos': [
                {
                    'mask-b-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-b-from-color': [
                {
                    'mask-b-from': scaleColor()
                }
            ],
            'mask-image-b-to-color': [
                {
                    'mask-b-to': scaleColor()
                }
            ],
            'mask-image-l-from-pos': [
                {
                    'mask-l-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-l-to-pos': [
                {
                    'mask-l-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-l-from-color': [
                {
                    'mask-l-from': scaleColor()
                }
            ],
            'mask-image-l-to-color': [
                {
                    'mask-l-to': scaleColor()
                }
            ],
            'mask-image-x-from-pos': [
                {
                    'mask-x-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-x-to-pos': [
                {
                    'mask-x-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-x-from-color': [
                {
                    'mask-x-from': scaleColor()
                }
            ],
            'mask-image-x-to-color': [
                {
                    'mask-x-to': scaleColor()
                }
            ],
            'mask-image-y-from-pos': [
                {
                    'mask-y-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-y-to-pos': [
                {
                    'mask-y-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-y-from-color': [
                {
                    'mask-y-from': scaleColor()
                }
            ],
            'mask-image-y-to-color': [
                {
                    'mask-y-to': scaleColor()
                }
            ],
            'mask-image-radial': [
                {
                    'mask-radial': [
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            'mask-image-radial-from-pos': [
                {
                    'mask-radial-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-radial-to-pos': [
                {
                    'mask-radial-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-radial-from-color': [
                {
                    'mask-radial-from': scaleColor()
                }
            ],
            'mask-image-radial-to-color': [
                {
                    'mask-radial-to': scaleColor()
                }
            ],
            'mask-image-radial-shape': [
                {
                    'mask-radial': [
                        'circle',
                        'ellipse'
                    ]
                }
            ],
            'mask-image-radial-size': [
                {
                    'mask-radial': [
                        {
                            closest: [
                                'side',
                                'corner'
                            ],
                            farthest: [
                                'side',
                                'corner'
                            ]
                        }
                    ]
                }
            ],
            'mask-image-radial-pos': [
                {
                    'mask-radial-at': scalePosition()
                }
            ],
            'mask-image-conic-pos': [
                {
                    'mask-conic': [
                        isNumber
                    ]
                }
            ],
            'mask-image-conic-from-pos': [
                {
                    'mask-conic-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-conic-to-pos': [
                {
                    'mask-conic-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-conic-from-color': [
                {
                    'mask-conic-from': scaleColor()
                }
            ],
            'mask-image-conic-to-color': [
                {
                    'mask-conic-to': scaleColor()
                }
            ],
            /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */ 'mask-mode': [
                {
                    mask: [
                        'alpha',
                        'luminance',
                        'match'
                    ]
                }
            ],
            /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */ 'mask-origin': [
                {
                    'mask-origin': [
                        'border',
                        'padding',
                        'content',
                        'fill',
                        'stroke',
                        'view'
                    ]
                }
            ],
            /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */ 'mask-position': [
                {
                    mask: scaleBgPosition()
                }
            ],
            /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */ 'mask-repeat': [
                {
                    mask: scaleBgRepeat()
                }
            ],
            /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */ 'mask-size': [
                {
                    mask: scaleBgSize()
                }
            ],
            /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */ 'mask-type': [
                {
                    'mask-type': [
                        'alpha',
                        'luminance'
                    ]
                }
            ],
            /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */ 'mask-image': [
                {
                    mask: [
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // ---------------
            // --- Filters ---
            // ---------------
            /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */ filter: [
                {
                    filter: [
                        // Deprecated since Tailwind CSS v3.0.0
                        '',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */ blur: [
                {
                    blur: scaleBlur()
                }
            ],
            /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */ brightness: [
                {
                    brightness: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */ contrast: [
                {
                    contrast: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */ 'drop-shadow': [
                {
                    'drop-shadow': [
                        // Deprecated since Tailwind CSS v4.0.0
                        '',
                        'none',
                        themeDropShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */ 'drop-shadow-color': [
                {
                    'drop-shadow': scaleColor()
                }
            ],
            /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */ grayscale: [
                {
                    grayscale: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */ 'hue-rotate': [
                {
                    'hue-rotate': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */ invert: [
                {
                    invert: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */ saturate: [
                {
                    saturate: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */ sepia: [
                {
                    sepia: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */ 'backdrop-filter': [
                {
                    'backdrop-filter': [
                        // Deprecated since Tailwind CSS v3.0.0
                        '',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */ 'backdrop-blur': [
                {
                    'backdrop-blur': scaleBlur()
                }
            ],
            /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */ 'backdrop-brightness': [
                {
                    'backdrop-brightness': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */ 'backdrop-contrast': [
                {
                    'backdrop-contrast': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */ 'backdrop-grayscale': [
                {
                    'backdrop-grayscale': [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */ 'backdrop-hue-rotate': [
                {
                    'backdrop-hue-rotate': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */ 'backdrop-invert': [
                {
                    'backdrop-invert': [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */ 'backdrop-opacity': [
                {
                    'backdrop-opacity': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */ 'backdrop-saturate': [
                {
                    'backdrop-saturate': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */ 'backdrop-sepia': [
                {
                    'backdrop-sepia': [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // --------------
            // --- Tables ---
            // --------------
            /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */ 'border-collapse': [
                {
                    border: [
                        'collapse',
                        'separate'
                    ]
                }
            ],
            /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */ 'border-spacing': [
                {
                    'border-spacing': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */ 'border-spacing-x': [
                {
                    'border-spacing-x': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */ 'border-spacing-y': [
                {
                    'border-spacing-y': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */ 'table-layout': [
                {
                    table: [
                        'auto',
                        'fixed'
                    ]
                }
            ],
            /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */ caption: [
                {
                    caption: [
                        'top',
                        'bottom'
                    ]
                }
            ],
            // ---------------------------------
            // --- Transitions and Animation ---
            // ---------------------------------
            /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */ transition: [
                {
                    transition: [
                        '',
                        'all',
                        'colors',
                        'opacity',
                        'shadow',
                        'transform',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */ 'transition-behavior': [
                {
                    transition: [
                        'normal',
                        'discrete'
                    ]
                }
            ],
            /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */ duration: [
                {
                    duration: [
                        isNumber,
                        'initial',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */ ease: [
                {
                    ease: [
                        'linear',
                        'initial',
                        themeEase,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */ delay: [
                {
                    delay: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */ animate: [
                {
                    animate: [
                        'none',
                        themeAnimate,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // ------------------
            // --- Transforms ---
            // ------------------
            /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */ backface: [
                {
                    backface: [
                        'hidden',
                        'visible'
                    ]
                }
            ],
            /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */ perspective: [
                {
                    perspective: [
                        themePerspective,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */ 'perspective-origin': [
                {
                    'perspective-origin': scalePositionWithArbitrary()
                }
            ],
            /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */ rotate: [
                {
                    rotate: scaleRotate()
                }
            ],
            /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */ 'rotate-x': [
                {
                    'rotate-x': scaleRotate()
                }
            ],
            /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */ 'rotate-y': [
                {
                    'rotate-y': scaleRotate()
                }
            ],
            /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */ 'rotate-z': [
                {
                    'rotate-z': scaleRotate()
                }
            ],
            /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */ scale: [
                {
                    scale: scaleScale()
                }
            ],
            /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */ 'scale-x': [
                {
                    'scale-x': scaleScale()
                }
            ],
            /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */ 'scale-y': [
                {
                    'scale-y': scaleScale()
                }
            ],
            /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */ 'scale-z': [
                {
                    'scale-z': scaleScale()
                }
            ],
            /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */ 'scale-3d': [
                'scale-3d'
            ],
            /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */ skew: [
                {
                    skew: scaleSkew()
                }
            ],
            /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */ 'skew-x': [
                {
                    'skew-x': scaleSkew()
                }
            ],
            /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */ 'skew-y': [
                {
                    'skew-y': scaleSkew()
                }
            ],
            /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */ transform: [
                {
                    transform: [
                        isArbitraryVariable,
                        isArbitraryValue,
                        '',
                        'none',
                        'gpu',
                        'cpu'
                    ]
                }
            ],
            /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */ 'transform-origin': [
                {
                    origin: scalePositionWithArbitrary()
                }
            ],
            /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */ 'transform-style': [
                {
                    transform: [
                        '3d',
                        'flat'
                    ]
                }
            ],
            /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */ translate: [
                {
                    translate: scaleTranslate()
                }
            ],
            /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */ 'translate-x': [
                {
                    'translate-x': scaleTranslate()
                }
            ],
            /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */ 'translate-y': [
                {
                    'translate-y': scaleTranslate()
                }
            ],
            /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */ 'translate-z': [
                {
                    'translate-z': scaleTranslate()
                }
            ],
            /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */ 'translate-none': [
                'translate-none'
            ],
            // ---------------------
            // --- Interactivity ---
            // ---------------------
            /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */ accent: [
                {
                    accent: scaleColor()
                }
            ],
            /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */ appearance: [
                {
                    appearance: [
                        'none',
                        'auto'
                    ]
                }
            ],
            /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */ 'caret-color': [
                {
                    caret: scaleColor()
                }
            ],
            /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */ 'color-scheme': [
                {
                    scheme: [
                        'normal',
                        'dark',
                        'light',
                        'light-dark',
                        'only-dark',
                        'only-light'
                    ]
                }
            ],
            /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */ cursor: [
                {
                    cursor: [
                        'auto',
                        'default',
                        'pointer',
                        'wait',
                        'text',
                        'move',
                        'help',
                        'not-allowed',
                        'none',
                        'context-menu',
                        'progress',
                        'cell',
                        'crosshair',
                        'vertical-text',
                        'alias',
                        'copy',
                        'no-drop',
                        'grab',
                        'grabbing',
                        'all-scroll',
                        'col-resize',
                        'row-resize',
                        'n-resize',
                        'e-resize',
                        's-resize',
                        'w-resize',
                        'ne-resize',
                        'nw-resize',
                        'se-resize',
                        'sw-resize',
                        'ew-resize',
                        'ns-resize',
                        'nesw-resize',
                        'nwse-resize',
                        'zoom-in',
                        'zoom-out',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */ 'field-sizing': [
                {
                    'field-sizing': [
                        'fixed',
                        'content'
                    ]
                }
            ],
            /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */ 'pointer-events': [
                {
                    'pointer-events': [
                        'auto',
                        'none'
                    ]
                }
            ],
            /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */ resize: [
                {
                    resize: [
                        'none',
                        '',
                        'y',
                        'x'
                    ]
                }
            ],
            /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */ 'scroll-behavior': [
                {
                    scroll: [
                        'auto',
                        'smooth'
                    ]
                }
            ],
            /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-m': [
                {
                    'scroll-m': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mx': [
                {
                    'scroll-mx': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-my': [
                {
                    'scroll-my': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-ms': [
                {
                    'scroll-ms': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-me': [
                {
                    'scroll-me': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mt': [
                {
                    'scroll-mt': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mr': [
                {
                    'scroll-mr': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mb': [
                {
                    'scroll-mb': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-ml': [
                {
                    'scroll-ml': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-p': [
                {
                    'scroll-p': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-px': [
                {
                    'scroll-px': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-py': [
                {
                    'scroll-py': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-ps': [
                {
                    'scroll-ps': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pe': [
                {
                    'scroll-pe': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pt': [
                {
                    'scroll-pt': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pr': [
                {
                    'scroll-pr': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pb': [
                {
                    'scroll-pb': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pl': [
                {
                    'scroll-pl': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */ 'snap-align': [
                {
                    snap: [
                        'start',
                        'end',
                        'center',
                        'align-none'
                    ]
                }
            ],
            /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */ 'snap-stop': [
                {
                    snap: [
                        'normal',
                        'always'
                    ]
                }
            ],
            /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */ 'snap-type': [
                {
                    snap: [
                        'none',
                        'x',
                        'y',
                        'both'
                    ]
                }
            ],
            /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */ 'snap-strictness': [
                {
                    snap: [
                        'mandatory',
                        'proximity'
                    ]
                }
            ],
            /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */ touch: [
                {
                    touch: [
                        'auto',
                        'none',
                        'manipulation'
                    ]
                }
            ],
            /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */ 'touch-x': [
                {
                    'touch-pan': [
                        'x',
                        'left',
                        'right'
                    ]
                }
            ],
            /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */ 'touch-y': [
                {
                    'touch-pan': [
                        'y',
                        'up',
                        'down'
                    ]
                }
            ],
            /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */ 'touch-pz': [
                'touch-pinch-zoom'
            ],
            /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */ select: [
                {
                    select: [
                        'none',
                        'text',
                        'all',
                        'auto'
                    ]
                }
            ],
            /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */ 'will-change': [
                {
                    'will-change': [
                        'auto',
                        'scroll',
                        'contents',
                        'transform',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // -----------
            // --- SVG ---
            // -----------
            /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */ fill: [
                {
                    fill: [
                        'none',
                        ...scaleColor()
                    ]
                }
            ],
            /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */ 'stroke-w': [
                {
                    stroke: [
                        isNumber,
                        isArbitraryVariableLength,
                        isArbitraryLength,
                        isArbitraryNumber
                    ]
                }
            ],
            /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */ stroke: [
                {
                    stroke: [
                        'none',
                        ...scaleColor()
                    ]
                }
            ],
            // ---------------------
            // --- Accessibility ---
            // ---------------------
            /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */ 'forced-color-adjust': [
                {
                    'forced-color-adjust': [
                        'auto',
                        'none'
                    ]
                }
            ]
        },
        conflictingClassGroups: {
            overflow: [
                'overflow-x',
                'overflow-y'
            ],
            overscroll: [
                'overscroll-x',
                'overscroll-y'
            ],
            inset: [
                'inset-x',
                'inset-y',
                'start',
                'end',
                'top',
                'right',
                'bottom',
                'left'
            ],
            'inset-x': [
                'right',
                'left'
            ],
            'inset-y': [
                'top',
                'bottom'
            ],
            flex: [
                'basis',
                'grow',
                'shrink'
            ],
            gap: [
                'gap-x',
                'gap-y'
            ],
            p: [
                'px',
                'py',
                'ps',
                'pe',
                'pt',
                'pr',
                'pb',
                'pl'
            ],
            px: [
                'pr',
                'pl'
            ],
            py: [
                'pt',
                'pb'
            ],
            m: [
                'mx',
                'my',
                'ms',
                'me',
                'mt',
                'mr',
                'mb',
                'ml'
            ],
            mx: [
                'mr',
                'ml'
            ],
            my: [
                'mt',
                'mb'
            ],
            size: [
                'w',
                'h'
            ],
            'font-size': [
                'leading'
            ],
            'fvn-normal': [
                'fvn-ordinal',
                'fvn-slashed-zero',
                'fvn-figure',
                'fvn-spacing',
                'fvn-fraction'
            ],
            'fvn-ordinal': [
                'fvn-normal'
            ],
            'fvn-slashed-zero': [
                'fvn-normal'
            ],
            'fvn-figure': [
                'fvn-normal'
            ],
            'fvn-spacing': [
                'fvn-normal'
            ],
            'fvn-fraction': [
                'fvn-normal'
            ],
            'line-clamp': [
                'display',
                'overflow'
            ],
            rounded: [
                'rounded-s',
                'rounded-e',
                'rounded-t',
                'rounded-r',
                'rounded-b',
                'rounded-l',
                'rounded-ss',
                'rounded-se',
                'rounded-ee',
                'rounded-es',
                'rounded-tl',
                'rounded-tr',
                'rounded-br',
                'rounded-bl'
            ],
            'rounded-s': [
                'rounded-ss',
                'rounded-es'
            ],
            'rounded-e': [
                'rounded-se',
                'rounded-ee'
            ],
            'rounded-t': [
                'rounded-tl',
                'rounded-tr'
            ],
            'rounded-r': [
                'rounded-tr',
                'rounded-br'
            ],
            'rounded-b': [
                'rounded-br',
                'rounded-bl'
            ],
            'rounded-l': [
                'rounded-tl',
                'rounded-bl'
            ],
            'border-spacing': [
                'border-spacing-x',
                'border-spacing-y'
            ],
            'border-w': [
                'border-w-x',
                'border-w-y',
                'border-w-s',
                'border-w-e',
                'border-w-t',
                'border-w-r',
                'border-w-b',
                'border-w-l'
            ],
            'border-w-x': [
                'border-w-r',
                'border-w-l'
            ],
            'border-w-y': [
                'border-w-t',
                'border-w-b'
            ],
            'border-color': [
                'border-color-x',
                'border-color-y',
                'border-color-s',
                'border-color-e',
                'border-color-t',
                'border-color-r',
                'border-color-b',
                'border-color-l'
            ],
            'border-color-x': [
                'border-color-r',
                'border-color-l'
            ],
            'border-color-y': [
                'border-color-t',
                'border-color-b'
            ],
            translate: [
                'translate-x',
                'translate-y',
                'translate-none'
            ],
            'translate-none': [
                'translate',
                'translate-x',
                'translate-y',
                'translate-z'
            ],
            'scroll-m': [
                'scroll-mx',
                'scroll-my',
                'scroll-ms',
                'scroll-me',
                'scroll-mt',
                'scroll-mr',
                'scroll-mb',
                'scroll-ml'
            ],
            'scroll-mx': [
                'scroll-mr',
                'scroll-ml'
            ],
            'scroll-my': [
                'scroll-mt',
                'scroll-mb'
            ],
            'scroll-p': [
                'scroll-px',
                'scroll-py',
                'scroll-ps',
                'scroll-pe',
                'scroll-pt',
                'scroll-pr',
                'scroll-pb',
                'scroll-pl'
            ],
            'scroll-px': [
                'scroll-pr',
                'scroll-pl'
            ],
            'scroll-py': [
                'scroll-pt',
                'scroll-pb'
            ],
            touch: [
                'touch-x',
                'touch-y',
                'touch-pz'
            ],
            'touch-x': [
                'touch'
            ],
            'touch-y': [
                'touch'
            ],
            'touch-pz': [
                'touch'
            ]
        },
        conflictingClassGroupModifiers: {
            'font-size': [
                'leading'
            ]
        },
        orderSensitiveModifiers: [
            '*',
            '**',
            'after',
            'backdrop',
            'before',
            'details-content',
            'file',
            'first-letter',
            'first-line',
            'marker',
            'placeholder',
            'selection'
        ]
    };
};
/**
 * @param baseConfig Config where other config will be merged into. This object will be mutated.
 * @param configExtension Partial config to merge into the `baseConfig`.
 */ const mergeConfigs = (baseConfig, { cacheSize, prefix, experimentalParseClassName, extend = {}, override = {} })=>{
    overrideProperty(baseConfig, 'cacheSize', cacheSize);
    overrideProperty(baseConfig, 'prefix', prefix);
    overrideProperty(baseConfig, 'experimentalParseClassName', experimentalParseClassName);
    overrideConfigProperties(baseConfig.theme, override.theme);
    overrideConfigProperties(baseConfig.classGroups, override.classGroups);
    overrideConfigProperties(baseConfig.conflictingClassGroups, override.conflictingClassGroups);
    overrideConfigProperties(baseConfig.conflictingClassGroupModifiers, override.conflictingClassGroupModifiers);
    overrideProperty(baseConfig, 'orderSensitiveModifiers', override.orderSensitiveModifiers);
    mergeConfigProperties(baseConfig.theme, extend.theme);
    mergeConfigProperties(baseConfig.classGroups, extend.classGroups);
    mergeConfigProperties(baseConfig.conflictingClassGroups, extend.conflictingClassGroups);
    mergeConfigProperties(baseConfig.conflictingClassGroupModifiers, extend.conflictingClassGroupModifiers);
    mergeArrayProperties(baseConfig, extend, 'orderSensitiveModifiers');
    return baseConfig;
};
const overrideProperty = (baseObject, overrideKey, overrideValue)=>{
    if (overrideValue !== undefined) {
        baseObject[overrideKey] = overrideValue;
    }
};
const overrideConfigProperties = (baseObject, overrideObject)=>{
    if (overrideObject) {
        for(const key in overrideObject){
            overrideProperty(baseObject, key, overrideObject[key]);
        }
    }
};
const mergeConfigProperties = (baseObject, mergeObject)=>{
    if (mergeObject) {
        for(const key in mergeObject){
            mergeArrayProperties(baseObject, mergeObject, key);
        }
    }
};
const mergeArrayProperties = (baseObject, mergeObject, key)=>{
    const mergeValue = mergeObject[key];
    if (mergeValue !== undefined) {
        baseObject[key] = baseObject[key] ? baseObject[key].concat(mergeValue) : mergeValue;
    }
};
const extendTailwindMerge = (configExtension, ...createConfig)=>typeof configExtension === 'function' ? createTailwindMerge(getDefaultConfig, configExtension, ...createConfig) : createTailwindMerge(()=>mergeConfigs(getDefaultConfig(), configExtension), ...createConfig);
const twMerge = /*#__PURE__*/ createTailwindMerge(getDefaultConfig);
;
 //# sourceMappingURL=bundle-mjs.mjs.map
}),
]);

//# sourceMappingURL=ad563_53a4c6a3._.js.map