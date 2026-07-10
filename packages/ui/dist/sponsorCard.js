"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SponsorCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const image_1 = __importDefault(require("next/image"));
const util_1 = require("./util");
function SponsorCard({ sponsor, index, }) {
    const cardRef = (0, react_1.useRef)(null);
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry && entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, {
            threshold: 0.1,
        });
        const currentRef = cardRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { ref: cardRef, className: (0, util_1.cn)(`transform transition-all duration-700 ease-out border-t-2 border-[var(--pink)] rounded-xl hover:-translate-y-2 $`, isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"), style: { transitionDelay: `${index * 100}ms` }, children: (0, jsx_runtime_1.jsx)("a", { href: sponsor.url, target: "_blank", rel: "noopener noreferrer", className: "group flex h-full items-center justify-center rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: sponsor.image, alt: `${sponsor.name} Logo`, width: 150, height: 75, className: "h-full w-full max-w-[150px] object-contain opacity-70 grayscale-[50%] transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" }) }) }));
}
