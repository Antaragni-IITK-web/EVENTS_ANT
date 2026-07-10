"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
function Card({ href, title, subtitle, imageUrl, newTab = false, }) {
    return ((0, jsx_runtime_1.jsxs)(link_1.default, { href: href, className: "group relative block w-full h-96 overflow-hidden rounded-lg shadow-lg", target: newTab ? "_blank" : "_self", children: [(0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: title, width: 600, height: 800, className: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-0 left-0 p-6 transition-transform duration-500 ease-in-out group-hover:-translate-y-2", children: (0, jsx_runtime_1.jsx)("h3", { className: "mt-2 text-3xl font-title font-bold text-foreground", children: title }) })] }));
}
