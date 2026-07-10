"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLenisScroll = useLenisScroll;
const react_1 = require("react");
const gsap_1 = __importDefault(require("gsap"));
const ScrollTrigger_1 = require("gsap/ScrollTrigger");
const store_1 = require("@repo/store");
gsap_1.default.registerPlugin(ScrollTrigger_1.ScrollTrigger);
function useLenisScroll() {
    const lenis = (0, store_1.useStore)((state) => state.lenis);
    (0, react_1.useEffect)(() => {
        if (!lenis)
            return;
        ScrollTrigger_1.ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                if (value !== undefined) {
                    lenis.scrollTo(value, { duration: 0, immediate: true });
                }
                return lenis.scroll ?? 0;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: "transform",
        });
        const onScroll = () => ScrollTrigger_1.ScrollTrigger.update();
        lenis.on("scroll", onScroll);
        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            ScrollTrigger_1.ScrollTrigger.update();
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        requestAnimationFrame(() => {
            ScrollTrigger_1.ScrollTrigger.refresh();
        });
        return () => {
            cancelAnimationFrame(rafId);
            lenis.off("scroll", onScroll);
            ScrollTrigger_1.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            ScrollTrigger_1.ScrollTrigger.scrollerProxy(document.body, undefined);
        };
    }, [lenis]);
}
