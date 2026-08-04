import * as React from "react";
interface SelectProps {
    value: string;
    onValueChange: (val: string) => void;
    placeholder?: string;
    options: {
        label: string;
        value: string;
    }[];
}
export declare function Select({ value, onValueChange, placeholder, options, }: SelectProps): React.JSX.Element;
export {};
//# sourceMappingURL=select.d.ts.map