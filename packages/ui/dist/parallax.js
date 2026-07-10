"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parallax = Parallax;
const jsx_runtime_1 = require("react/jsx-runtime");
const gsap_1 = require("gsap");
const math_1 = require("@repo/math");
const react_1 = require("react");
const react_use_1 = require("react-use");
const react_2 = require("@gsap/react");
const ScrollTrigger_1 = require("gsap/ScrollTrigger");
gsap_1.gsap.registerPlugin(react_2.useGSAP, ScrollTrigger_1.ScrollTrigger);
function Parallax({ className = "", children, speed = 1, id = "parallax", position = "", }) {
    const trigger = (0, react_1.useRef)(null);
    const target = (0, react_1.useRef)(null);
    const { width: windowWidth } = (0, react_use_1.useWindowSize)();
    (0, react_2.useGSAP)(() => {
        const y = windowWidth * speed * 0.1;
        const setY = gsap_1.gsap.quickSetter(target.current, "y", "px");
        const set3d = gsap_1.gsap.quickSetter(target.current, "force3d");
        gsap_1.gsap.timeline({
            scrollTrigger: {
                id: id,
                trigger: trigger.current,
                scrub: true,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (e) => {
                    if (position === "top") {
                        setY(e.progress * y);
                    }
                    else {
                        setY(-(0, math_1.mapRange)(0, 1, e.progress, -y, y));
                    }
                    set3d(e.progress > 0 && e.progress < 1);
                },
            },
        });
    }, [id, speed, position, windowWidth]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: trigger, children: (0, jsx_runtime_1.jsx)("div", { ref: target, className: className, children: children }) }));
}
