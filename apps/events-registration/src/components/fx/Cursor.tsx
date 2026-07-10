"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Custom cursor: lime dot + lagging ring.
   Ring expands over interactive elements; shows optional label via [data-cursor-text]. */
export function Cursor() {
	const dotRef = useRef<HTMLDivElement>(null);
	const ringRef = useRef<HTMLDivElement>(null);
	const labelRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (window.matchMedia("(pointer: coarse)").matches) return;
		const dot = dotRef.current;
		const ring = ringRef.current;
		const label = labelRef.current;
		if (!dot || !ring || !label) return;

		gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

		const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
		const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
		const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
		const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

		let shown = false;
		const onMove = (e: MouseEvent) => {
			if (!shown) {
				gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
				shown = true;
			}
			dotX(e.clientX);
			dotY(e.clientY);
			ringX(e.clientX);
			ringY(e.clientY);
		};

		const INTERACTIVE =
			"a, button, input, select, textarea, label, [role='button'], [data-cursor]";

		const onOver = (e: MouseEvent) => {
			const el = (e.target as HTMLElement).closest?.(INTERACTIVE);
			if (el) {
				const text = (el as HTMLElement).dataset.cursorText || "";
				label.textContent = text;
				gsap.to(ring, {
					scale: text ? 3.2 : 1.8,
					backgroundColor: text
						? "rgba(199,244,65,0.95)"
						: "rgba(199,244,65,0.12)",
					duration: 0.35,
					ease: "power3.out",
				});
				gsap.to(dot, { scale: text ? 0 : 0.5, duration: 0.3 });
			} else {
				label.textContent = "";
				gsap.to(ring, {
					scale: 1,
					backgroundColor: "rgba(199,244,65,0)",
					duration: 0.35,
					ease: "power3.out",
				});
				gsap.to(dot, { scale: 1, duration: 0.3 });
			}
		};

		window.addEventListener("mousemove", onMove, { passive: true });
		document.addEventListener("mouseover", onOver, { passive: true });
		return () => {
			window.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseover", onOver);
		};
	}, []);

	return (
		<>
			<div
				ref={dotRef}
				className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full"
				style={{ background: "var(--lime)" }}
			/>
			<div
				ref={ringRef}
				className="pointer-events-none fixed left-0 top-0 z-[99] flex h-10 w-10 items-center justify-center rounded-full border"
				style={{ borderColor: "rgba(199,244,65,0.55)" }}
			>
				<span
					ref={labelRef}
					className="select-none text-[3.5px] font-bold uppercase tracking-widest text-black"
				/>
			</div>
		</>
	);
}
