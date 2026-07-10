"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cursor = Cursor;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const gsap_1 = __importDefault(require("gsap"));
const react_1 = require("react");
const navigation_1 = require("next/navigation");
function Cursor({ color }) {
    const pathname = (0, navigation_1.usePathname)();
    const cursor = (0, react_1.useRef)(null);
    const [isPointer, setIsPointer] = (0, react_1.useState)(false);
    const [hasMoved, setHasMoved] = (0, react_1.useState)(false);
    const onMouseMove = (0, react_1.useCallback)(({ clientX, clientY }) => {
        gsap_1.default.to(cursor.current, {
            x: clientX,
            y: clientY,
            duration: hasMoved ? 0.6 : 0,
            ease: "expo.out",
        });
        setHasMoved(true);
    }, [hasMoved]);
    (0, react_1.useEffect)(() => {
        window.addEventListener("mousemove", onMouseMove, false);
        return () => {
            window.removeEventListener("mousemove", onMouseMove, false);
        };
    }, [hasMoved, onMouseMove]);
    (0, react_1.useEffect)(() => {
        setIsPointer(false);
        const onMouseEnter = () => {
            setIsPointer(true);
        };
        const onMouseLeave = () => {
            setIsPointer(false);
        };
        const attachListeners = () => {
            const elements = [
                ...document.querySelectorAll("button,a,input,label,[data-cursor='pointer']"),
            ];
            elements.forEach((element) => {
                element.addEventListener("mouseenter", onMouseEnter, false);
                element.addEventListener("mouseleave", onMouseLeave, false);
            });
            return () => {
                elements.forEach((element) => {
                    element.removeEventListener("mouseenter", onMouseEnter, false);
                    element.removeEventListener("mouseleave", onMouseLeave, false);
                });
            };
        };
        const detach = attachListeners();
        const observer = new MutationObserver(() => {
            detach();
            attachListeners();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
        return () => {
            observer.disconnect();
            detach();
        };
    }, [pathname]);
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed top-0 left-0 h-screen w-[100%] z-[10000] overflow-hidden pointer-events-none [@media(hover:none)]:hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "", ref: cursor, children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)("absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px]  w-10 h-10 opacity-40 transition-transform duration-[600ms] ease-[var(--ease-out-expo)]", color ? "border-[var(--color-primary)]" : "border-[var(--pink)]", isPointer && (color ?
                    "-translate-x-1/2 -translate-y-1/2 scale-50 bg-[var(--color-primary)]"
                    : "-translate-x-1/2 -translate-y-1/2 scale-50 bg-[var(--pink)]")) }) }) }));
}
