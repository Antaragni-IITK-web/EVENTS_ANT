"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollRefresh = ScrollRefresh;
const navigation_1 = require("next/navigation");
const ScrollTrigger_1 = require("gsap/ScrollTrigger");
const react_1 = require("react");
const gsap_1 = __importDefault(require("gsap"));
gsap_1.default.registerPlugin(ScrollTrigger_1.ScrollTrigger);
function ScrollRefresh() {
    const pathname = (0, navigation_1.usePathname)();
    (0, react_1.useEffect)(() => {
        const timeout = setTimeout(() => {
            ScrollTrigger_1.ScrollTrigger.refresh();
            ScrollTrigger_1.ScrollTrigger.update();
        }, 200);
        return () => clearTimeout(timeout);
    }, [pathname]);
    return null;
}
