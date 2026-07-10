"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Scroll-triggered stagger reveal of direct children. */
export function Reveal({
	children,
	className = "",
	y = 48,
	stagger = 0.09,
	delay = 0,
	start = "top 85%",
}: {
	children: ReactNode;
	className?: string;
	y?: number;
	stagger?: number;
	delay?: number;
	start?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			/* hidden tab at mount → rAF is paused and a from-tween would strand
			   children invisible; skip the entrance entirely */
			if (!ref.current || document.hidden) return;
			gsap.from(ref.current.children, {
				opacity: 0,
				y,
				stagger,
				delay,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: { trigger: ref.current, start },
			});
		},
		{ scope: ref }
	);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}

/* Big display heading that reveals per-word with a clip effect. */
export function RevealTitle({
	text,
	className = "",
	as: Tag = "h2",
}: {
	text: string;
	className?: string;
	as?: "h1" | "h2" | "h3";
}) {
	const ref = useRef<HTMLHeadingElement>(null);

	useGSAP(
		() => {
			if (!ref.current || document.hidden) return;
			gsap.from(ref.current.querySelectorAll(".rw"), {
				yPercent: 110,
				stagger: 0.07,
				duration: 0.9,
				ease: "power4.out",
				scrollTrigger: { trigger: ref.current, start: "top 88%" },
			});
		},
		{ scope: ref }
	);

	return (
		<Tag ref={ref} className={className} aria-label={text}>
			{text.split(" ").map((word, i) => (
				<span
					key={i}
					className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
					aria-hidden
				>
					<span className="rw inline-block">{word}&nbsp;</span>
				</span>
			))}
		</Tag>
	);
}
