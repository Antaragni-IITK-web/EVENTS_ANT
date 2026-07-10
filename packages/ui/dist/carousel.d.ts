import React from "react";
import { EmblaOptionsType } from "embla-carousel";
interface EventData {
    slug: string;
    title: string;
    category: string;
    imageUrl: string;
}
interface CarouselProps {
    events: EventData[];
    options?: EmblaOptionsType;
}
export declare const Carousel: React.FC<CarouselProps>;
export {};
//# sourceMappingURL=carousel.d.ts.map