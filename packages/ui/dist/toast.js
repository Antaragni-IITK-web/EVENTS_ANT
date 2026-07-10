"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Toaster;
const jsx_runtime_1 = require("react/jsx-runtime");
function Toaster() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "fixed bottom-5 md:!right-5 w-[90vw] border-1 md:!w-[20vw] h-[10vh] z-10", children: [(0, jsx_runtime_1.jsx)("div", { className: "progress" }), "HELLO"] }));
}
