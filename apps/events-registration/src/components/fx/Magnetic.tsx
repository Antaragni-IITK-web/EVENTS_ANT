"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";

/* Magnetic wrapper — the child leans toward the cursor while hovered
   and snaps back on leave. Fine pointers only; no-op on touch. */
export function Magnetic({
	children,
	strength = 0.35,
	className = "",
}: {
	children: ReactNode;
	strength?: number;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);

	const onMove = (e: React.MouseEvent) => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(pointer: coarse)").matches) return;
		const rect = el.getBoundingClientRect();
		const dx = e.clientX - (rect.left + rect.width / 2);
		const dy = e.clientY - (rect.top + rect.height / 2);
		gsap.to(el, {
			x: dx * strength,
			y: dy * strength,
			duration: 0.4,
			ease: "power3.out",
		});
	};

	const onLeave = () => {
		const el = ref.current;
		if (!el) return;
		gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
	};

	return (
		<div
			ref={ref}
			onMouseMove={onMove}
			onMouseLeave={onLeave}
			className={`inline-block ${className}`}
		>
			{children}
		</div>
	);
}
