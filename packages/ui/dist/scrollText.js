"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollText = ScrollText;
const jsx_runtime_1 = require("react/jsx-runtime");
const gsap_1 = __importDefault(require("gsap"));
const ScrollTrigger_1 = require("gsap/ScrollTrigger");
const react_1 = require("@gsap/react");
const react_2 = require("react");
gsap_1.default.registerPlugin(react_1.useGSAP, ScrollTrigger_1.ScrollTrigger);
function ScrollText({ text, className, bulk, fadeOut, }) {
    const wrapper = (0, react_2.useRef)(null);
    (0, react_1.useGSAP)(() => {
        const chars = gsap_1.default.utils.toArray(".char", wrapper.current);
        if (!chars)
            return;
        const tl = gsap_1.default.timeline({
            scrollTrigger: {
                trigger: wrapper.current,
                start: "-30% center",
                end: "+=50%",
                pin: true,
                pinSpacing: false,
                scrub: true,
                markers: true,
            },
        });
        tl.fromTo(chars, {
            opacity: 0,
        }, {
            opacity: 1,
            stagger: {
                each: 0.05,
                amount: 0.6,
            },
            ease: "power3.out",
        });
        if (fadeOut)
            tl.to(chars.reverse(), {
                opacity: 0,
                stagger: {
                    each: 0.5,
                    amount: 0.6,
                },
                ease: "power3.in",
            }, "+=0.5");
    }, { scope: wrapper });
    return ((0, jsx_runtime_1.jsx)("div", { className: "h-screen w-screen p-3 absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2", ref: wrapper, children: (0, jsx_runtime_1.jsx)("div", { className: "text-center ", children: text.split("").map((char, index) => ((0, jsx_runtime_1.jsx)("span", { className: `${className} char`, children: char }, index))) }) }));
}
