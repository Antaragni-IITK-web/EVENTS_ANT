"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = Select;
const jsx_runtime_1 = require("react/jsx-runtime");
const RadixSelect = __importStar(require("@radix-ui/react-select"));
const fa6_1 = require("react-icons/fa6");
const fa_1 = require("react-icons/fa");
const util_1 = require("./util");
function Select({ value, onValueChange, placeholder = "Select an option", options, }) {
    return ((0, jsx_runtime_1.jsxs)(RadixSelect.Root, { value: value, onValueChange: onValueChange, children: [(0, jsx_runtime_1.jsx)(RadixSelect.Trigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)("button", { className: (0, util_1.cn)("group/select inline-flex h-10 w-full items-center justify-between rounded-md border-1 border-white/10 bg-black/40 px-3 py-2 text-sm text-white shadow-input transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"), children: [(0, jsx_runtime_1.jsx)(RadixSelect.Value, { placeholder: placeholder }), (0, jsx_runtime_1.jsx)(RadixSelect.Icon, { children: (0, jsx_runtime_1.jsx)(fa_1.FaChevronDown, { className: "h-4 w-4 opacity-50" }) })] }) }), (0, jsx_runtime_1.jsx)(RadixSelect.Portal, { children: (0, jsx_runtime_1.jsx)(RadixSelect.Content, { position: "popper", side: "bottom", sideOffset: 4, className: (0, util_1.cn)("z-50 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-white/10 bg-[#0a0a0a] text-white p-1 shadow-lg"), children: (0, jsx_runtime_1.jsx)(RadixSelect.Viewport, { className: "max-h-[20vh] overflow-y-auto", children: options.map((option) => ((0, jsx_runtime_1.jsxs)(RadixSelect.Item, { value: option.value, className: (0, util_1.cn)("relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition hover:bg-white/10 focus:bg-white/10"), children: [(0, jsx_runtime_1.jsx)(RadixSelect.ItemText, { children: option.label }), (0, jsx_runtime_1.jsx)(RadixSelect.ItemIndicator, { className: "absolute right-2", children: (0, jsx_runtime_1.jsx)(fa6_1.FaCheck, { className: "h-4 w-4" }) })] }, option.value))) }) }) })] }));
}
