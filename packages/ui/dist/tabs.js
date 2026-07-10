"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = Tabs;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const gsap_1 = __importDefault(require("gsap"));
function Tabs({ tabs, className = "" }) {
    const [activeTab, setActiveTab] = (0, react_1.useState)(tabs[0]?.id);
    const panelsRef = (0, react_1.useRef)({});
    const handleTabChange = (newTab) => {
        if (newTab === activeTab)
            return;
        const currentPanel = panelsRef.current[activeTab];
        const nextPanel = panelsRef.current[newTab];
        if (currentPanel && nextPanel) {
            gsap_1.default.to(currentPanel, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: () => {
                    setActiveTab(newTab);
                    gsap_1.default.fromTo(nextPanel, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "sling" });
                },
            });
        }
        else {
            setActiveTab(newTab);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: `w-full mx-auto p-6 h-full flex flex-col justify-center items-center ${className}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mb-4 overflow-x-auto", children: tabs.map((tab) => ((0, jsx_runtime_1.jsx)("button", { onClick: () => handleTabChange(tab.id), className: `px-4 py-2 mx-2 whitespace-nowrap text-md transition ${activeTab === tab.id
                        ? "border-b-2 border-[var(--pink)] text-[var(--pink)]"
                        : "text-white"}`, children: tab.title }, tab.id))) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative h-full w-full flex justify-center", children: [tabs.map((tab) => ((0, jsx_runtime_1.jsx)("div", { ref: (el) => { panelsRef.current[tab.id] = el; }, style: { display: activeTab === tab.id ? "block" : "none" }, className: "absolute inset-0 w-full h-full z-1", children: (0, jsx_runtime_1.jsx)("div", { className: "p-4 h-full w-full flex justify-center", children: tab.content }) }, tab.id))), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 w-full h-full flex justify-center p-4 z-0", children: (0, jsx_runtime_1.jsx)("div", { className: "w-[80%] h-full backdrop-blur-lg" }) })] })] }));
}
