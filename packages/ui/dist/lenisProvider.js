// @repo/ui/LenisProvider.tsx
"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LenisProvider = LenisProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const lenis_1 = __importDefault(require("lenis"));
const react_1 = require("react");
const store_1 = require("@repo/store");
const useLenis_1 = require("./useLenis");
function LenisProvider({ children }) {
    const setLenis = (0, store_1.useStore)((state) => state.setLenis);
    const [ready, setReady] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const lenis = new lenis_1.default({ lerp: 0.1, smoothWheel: true });
        setLenis(lenis);
        setReady(true);
        return () => lenis.destroy();
    }, []);
    (0, useLenis_1.useLenisScroll)();
    if (!ready)
        return null;
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}
