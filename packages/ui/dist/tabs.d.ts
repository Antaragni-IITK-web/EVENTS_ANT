interface Tab {
    id: string;
    title: string;
    content: React.ReactNode;
}
interface TabsProps {
    tabs: Tab[];
    className?: string;
}
export declare function Tabs({ tabs, className }: TabsProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=tabs.d.ts.map