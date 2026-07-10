"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = Section;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
function Section({ spacer, children, className, id, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "", children: [(0, jsx_runtime_1.jsx)("div", { id: id, className: (0, clsx_1.default)(className, "w-screen relative z-10 max-w-full"), children: children }), spacer && (0, jsx_runtime_1.jsx)("div", { style: { height: `${spacer}vh` } })] }));
}
