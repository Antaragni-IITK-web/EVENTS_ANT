// Label component extends from shadcnui - https://ui.shadcn.com/docs/components/label
"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelInputContainer = exports.Label = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const LabelPrimitive = __importStar(require("@radix-ui/react-label"));
const util_1 = require("./util");
const LabelInputContainer = ({ children, className, }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, util_1.cn)("flex w-full md:!w-3xs lg:!w-3xs xl:!w-md flex-col space-y-2", className), children: children }));
};
exports.LabelInputContainer = LabelInputContainer;
const Label = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(LabelPrimitive.Root, { ref: ref, className: (0, util_1.cn)("text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-fit", className), ...props })));
exports.Label = Label;
Label.displayName = LabelPrimitive.Root.displayName;
