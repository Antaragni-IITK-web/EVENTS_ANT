"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
function Card({ title, content, icon, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "card border-2 h-[60vh] max-h-[300px] md:!max-h-[350px] lg:!max-h-[450px] w-[80vw] md:!w-[50vw] lg:!w-[40vw] xl:!w-[30vw] flex flex-col justify-between items-start text-center m-[1vw] bg-[var(--white-transparent)] backdrop-blur-lg shrink-0 text-[var(--white)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-4xl md:!text-5xl lg:!text-6xl xl:!text-6xl text-[var(--pink)] p-5 w-full", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "w-full flex items-center justify-center", children: icon && (0, jsx_runtime_1.jsx)(image_1.default, { src: icon, alt: "icon", height: 60, width: 60 }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-xl text-gray-300 lg:!text-3xl p-5 font-serif", children: content })] }));
}
