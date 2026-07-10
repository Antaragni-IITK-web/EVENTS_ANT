"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactCard = ContactCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const md_1 = require("react-icons/md");
const bs_1 = require("react-icons/bs");
const image_1 = __importDefault(require("next/image"));
function ContactCard({ contact, className, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: `h-[40vh] min-h-[350px] lg:!h-[35vh] w-60 m-4 overflow-hidden text-lg ${className} hover:scale-105 hover:rounded-lg transition-transform-[var(--ease-in-cubic)] border-1 border-[var(--pink)] bg-[var(--red-light)] duration-200 flex flex-col items-center justify-center `, "data-cursor": "pointer", children: [(0, jsx_runtime_1.jsx)("div", { className: "img h-[90%] flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-full border-1 border-[var(--red)] bg-[var(--red-transparent)]", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: contact.image, className: "h-35 w-35 rounded-full bg-contain", alt: "", width: 150, height: 150 }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "info h-full flex flex-col gap-0.5 items-center justify-center text-[var(--white)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "name font-bold text-xl", children: contact.name }), (0, jsx_runtime_1.jsx)("div", { className: "post", children: "Organizer" }), (0, jsx_runtime_1.jsx)("div", { className: "dept", children: "Hospitality and Transport" }), (0, jsx_runtime_1.jsxs)("a", { className: "contact", href: `tel:${contact.contact}`, target: "_blank", rel: "noreferrer", children: ["Mobile: ", contact.contact] }), (0, jsx_runtime_1.jsxs)("div", { className: "socials flex gap-5 justify-evenly items-center", children: [(0, jsx_runtime_1.jsx)("a", { href: `mailto: hospitality@antaragni.in`, target: "_blank", rel: "noreferrer", children: (0, jsx_runtime_1.jsx)(md_1.MdEmail, { size: 33 }) }), (0, jsx_runtime_1.jsx)("a", { href: contact.insta, target: "_blank", rel: "noreferrer", children: (0, jsx_runtime_1.jsx)(bs_1.BsInstagram, { size: 25 }) }), (0, jsx_runtime_1.jsx)("a", { href: contact.linkedin, target: "_blank", rel: "noreferrer", children: (0, jsx_runtime_1.jsx)(bs_1.BsLinkedin, { size: 25 }) })] })] })] }));
}
