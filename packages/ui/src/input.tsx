// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";
import * as React from "react";
import { cn } from "./util";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    
    return (
      <div
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <input
          type={type}
          className={cn(
            `shadow-input flex h-10 w-full rounded-md border-1 border-white/10 bg-black/40 px-3 py-2 text-sm text-white transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:ring-[2px] focus-visible:ring-accent/50 focus-visible:outline-none disabled:opacity-50 cursor-none`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
