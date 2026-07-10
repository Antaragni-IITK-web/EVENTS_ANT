"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = Loader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const gsap_1 = __importDefault(require("gsap"));
const react_2 = require("@gsap/react");
const store_1 = require("@repo/store");
gsap_1.default.registerPlugin(react_2.useGSAP);
function Loader({ type }) {
    const ref = (0, react_1.useRef)(null);
    const [status, setStatus] = (0, react_1.useState)("loading");
    const { setInitialAnimation } = (0, store_1.useStore)();
    (0, react_1.useEffect)(() => {
        const pageLoadPromise = new Promise((resolve) => {
            if (document.readyState === "complete") {
                resolve();
            }
            else {
                window.addEventListener("load", () => resolve(), { once: true });
            }
        });
        const minTimePromise = new Promise((resolve) => {
            setTimeout(() => resolve(), 1500);
        });
        Promise.all([pageLoadPromise, minTimePromise]).then(() => {
            setStatus("animating");
        });
    }, []);
    (0, react_1.useEffect)(() => {
        if (status === "animating") {
            if (type === 1) {
                gsap_1.default.to(".blinder", {
                    scaleY: 0,
                    stagger: 0.2,
                    ease: "power3.inOut",
                    duration: 1,
                    delay: 0.2,
                });
                const timer = setTimeout(() => {
                    setStatus("finished");
                }, 1500);
                return () => clearTimeout(timer);
            }
            else {
                const timer = setTimeout(() => {
                    setStatus("finished");
                }, 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [status, type, setInitialAnimation]);
    (0, react_1.useEffect)(() => {
        if (status === "finished")
            setInitialAnimation(false);
    }, [status, setInitialAnimation]);
    if (status === "finished") {
        setTimeout(() => { }, 5);
        return null;
    }
    const binduLoaderClasses = `
    fixed top-0 left-0 w-full h-full bg-[var(--color-background)] 
    flex items-center justify-center 
    z-50 transition-opacity duration-1000 ease-out
    ${status === "animating" ? "opacity-0" : "opacity-100"}
  `;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, children: type === 1 ?
            (0, jsx_runtime_1.jsxs)("div", { className: "fixed top-0 left-0 w-screen h-screen flex flex-row z-[10000]", children: [(0, jsx_runtime_1.jsx)("div", { className: "blinder w-[20%] h-screen bg-[var(--pink)] origin-top" }), (0, jsx_runtime_1.jsx)("div", { className: "blinder w-[20%] h-screen bg-[var(--pink)] origin-top" }), (0, jsx_runtime_1.jsx)("div", { className: "blinder w-[20%] h-screen bg-[var(--pink)] origin-top" }), (0, jsx_runtime_1.jsx)("div", { className: "blinder w-[20%] h-screen bg-[var(--pink)] origin-top" }), (0, jsx_runtime_1.jsx)("div", { className: "blinder w-[20%] h-screen bg-[var(--pink)] origin-top" })] })
            : (0, jsx_runtime_1.jsx)("div", { className: binduLoaderClasses, children: (0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 bg-[var(--color-accent)] rounded-full animate-pulse" }) }) }));
}
exports.default = Loader;
