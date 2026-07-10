"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealViewport = void 0;
const react_1 = require("react");
const ScrollTrigger_1 = require("gsap/ScrollTrigger");
const RealViewport = () => {
    (0, react_1.useEffect)(() => {
        function onWindowResize() {
            document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
            document.documentElement.style.setProperty("--dvh", window.innerHeight * 0.01 + "px");
            document.documentElement.style.setProperty("--svh", document.documentElement.clientHeight * 0.01 + "px");
            document.documentElement.style.setProperty("--lvh", "1vh");
            ScrollTrigger_1.ScrollTrigger.refresh();
        }
        window.addEventListener("resize", onWindowResize, false);
        onWindowResize();
        return () => {
            window.removeEventListener("resize", onWindowResize, false);
        };
    }, []);
    return null;
};
exports.RealViewport = RealViewport;
