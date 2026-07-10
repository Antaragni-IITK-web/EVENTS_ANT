"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carousel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const embla_carousel_react_1 = __importDefault(require("embla-carousel-react"));
const navigation_1 = require("next/navigation");
const util_1 = require("./util");
const usePrevNextButtons = (emblaApi) => {
    const [prevBtnDisabled, setPrevBtnDisabled] = (0, react_1.useState)(true);
    const [nextBtnDisabled, setNextBtnDisabled] = (0, react_1.useState)(true);
    const onPrevButtonClick = (0, react_1.useCallback)(() => {
        if (!emblaApi)
            return;
        emblaApi.scrollPrev();
    }, [emblaApi]);
    const onNextButtonClick = (0, react_1.useCallback)(() => {
        if (!emblaApi)
            return;
        emblaApi.scrollNext();
    }, [emblaApi]);
    const onSelect = (0, react_1.useCallback)((emblaApi) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);
    (0, react_1.useEffect)(() => {
        if (!emblaApi)
            return;
        onSelect(emblaApi);
        emblaApi.on("reInit", onSelect).on("select", onSelect);
    }, [emblaApi, onSelect]);
    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    };
};
const PrevButton = (props) => {
    const { children, ...restProps } = props;
    return ((0, jsx_runtime_1.jsxs)("button", { className: "w-12 h-12 rounded-full bg-background/50 border border-primary/20 text-primary flex items-center justify-center disabled:opacity-30 transition-all duration-300 hover:bg-primary/20 hover:scale-110", type: "button", ...restProps, children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("polyline", { points: "15 18 9 12 15 6" }) }), children] }));
};
const NextButton = (props) => {
    const { children, ...restProps } = props;
    return ((0, jsx_runtime_1.jsxs)("button", { className: "w-12 h-12 rounded-full bg-background/50 border border-primary/20 text-primary flex items-center justify-center disabled:opacity-30 transition-all duration-300 hover:bg-primary/20 hover:scale-110", type: "button", ...restProps, children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("polyline", { points: "9 18 15 12 9 6" }) }), children] }));
};
const Thumbnail = ({ selected, imgSrc, onClick }) => ((0, jsx_runtime_1.jsx)("div", { className: "flex-grow-0 flex-shrink-0 w-1/5 md:!w-1/6 min-w-0 pl-3", children: (0, jsx_runtime_1.jsx)("button", { onClick: onClick, className: "block w-full h-20 rounded-lg overflow-hidden relative", children: (0, jsx_runtime_1.jsx)("img", { className: (0, util_1.cn)("absolute inset-0 h-full w-full object-cover transition-all duration-300", selected ? "opacity-100 scale-110" : "opacity-40 hover:opacity-70"), src: imgSrc, alt: "Event Thumbnail" }) }) }));
const TWEEN_FACTOR_BASE = 0.42;
const numberWithinRange = (number, min, max) => Math.min(Math.max(number, min), max);
const Carousel = ({ events, options }) => {
    const router = (0, navigation_1.useRouter)();
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(0);
    const [mainRef, mainApi] = (0, embla_carousel_react_1.default)(options);
    const [thumbRef, thumbApi] = (0, embla_carousel_react_1.default)({
        containScroll: "keepSnaps",
        dragFree: true,
    });
    const tweenFactor = (0, react_1.useRef)(0);
    const tweenNodes = (0, react_1.useRef)([]);
    const onThumbClick = (0, react_1.useCallback)((index) => {
        if (!mainApi || !thumbApi)
            return;
        mainApi.scrollTo(index);
    }, [mainApi]);
    const onSelect = (0, react_1.useCallback)(() => {
        if (!mainApi || !thumbApi)
            return;
        setSelectedIndex(mainApi.selectedScrollSnap());
        thumbApi.scrollTo(mainApi.selectedScrollSnap());
    }, [mainApi, thumbApi]);
    const setTweenNodes = (0, react_1.useCallback)((emblaApi) => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector(".embla__slide__number");
        });
    }, []);
    const setTweenFactor = (0, react_1.useCallback)((emblaApi) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    }, []);
    const tweenScale = (0, react_1.useCallback)((emblaApi, eventName) => {
        const engine = emblaApi.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const slidesInView = emblaApi.slidesInView();
        const isScrollEvent = eventName === "scroll";
        emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
            let diffToTarget = scrollSnap - scrollProgress;
            const slidesInSnap = engine.slideRegistry[snapIndex];
            slidesInSnap?.forEach((slideIndex) => {
                if (isScrollEvent && !slidesInView.includes(slideIndex))
                    return;
                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target();
                        if (slideIndex === loopItem.index && target !== 0) {
                            const sign = Math.sign(target);
                            if (sign === -1)
                                diffToTarget = scrollSnap - (1 + scrollProgress);
                            if (sign === 1)
                                diffToTarget = scrollSnap + (1 - scrollProgress);
                        }
                    });
                }
                const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
                const scale = numberWithinRange(tweenValue, 0, 1).toString();
                const tweenNode = tweenNodes.current[slideIndex];
                if (tweenNode) {
                    tweenNode.style.transform = `scale(${scale})`;
                }
            });
        });
    }, []);
    (0, react_1.useEffect)(() => {
        if (!mainApi)
            return;
        onSelect();
        setTweenNodes(mainApi);
        setTweenFactor(mainApi);
        tweenScale(mainApi);
        mainApi
            .on("select", onSelect)
            .on("reInit", onSelect)
            .on("reInit", setTweenNodes)
            .on("reInit", setTweenFactor)
            .on("reInit", tweenScale)
            .on("scroll", tweenScale);
    }, [mainApi, onSelect, setTweenNodes, setTweenFactor, tweenScale]);
    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick, } = usePrevNextButtons(mainApi);
    const handleClick = (slug) => {
        router.push(`/events/${slug}`);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-7xl mx-auto relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "overflow-hidden", ref: mainRef, children: (0, jsx_runtime_1.jsx)("div", { className: "flex -ml-4 md:!-ml-8", children: events.map((event, index) => ((0, jsx_runtime_1.jsx)("div", { className: "flex-grow-0 flex-shrink-0 w-full md:!w-3/5 lg:!w-1/3 min-w-0 pl-4 md:!pl-8", children: (0, jsx_runtime_1.jsx)("div", { className: "embla__slide__number relative block h-[60vh] rounded-2xl bg-cover bg-center overflow-hidden cursor-pointer", style: { backgroundImage: `url(${event.imageUrl})` }, onClick: () => {
                                if (selectedIndex === index)
                                    handleClick(event.slug);
                            }, children: selectedIndex === index && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute bottom-0 left-0 p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-title text-3xl font-bold text-foreground", children: event.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-foreground/80 mt-1", children: event.category })] })] })) }) }, index))) }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-1/2 -translate-y-1/2 left-[1rem] xl:!left-[-2.5rem] hidden md:!block", children: (0, jsx_runtime_1.jsx)(PrevButton, { onClick: onPrevButtonClick, disabled: prevBtnDisabled }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-1/2 -translate-y-1/2 right-[1rem] xl:!right-[-2.5rem] hidden md:!block", children: (0, jsx_runtime_1.jsx)(NextButton, { onClick: onNextButtonClick, disabled: nextBtnDisabled }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4", children: (0, jsx_runtime_1.jsx)("div", { className: "overflow-hidden", ref: thumbRef, children: (0, jsx_runtime_1.jsx)("div", { className: "flex -ml-3", children: events.map((event, index) => ((0, jsx_runtime_1.jsx)(Thumbnail, { onClick: () => onThumbClick(index), selected: index === selectedIndex, imgSrc: event.imageUrl }, index))) }) }) })] }));
};
exports.Carousel = Carousel;
