"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";

/* Physical 3D tilt on hover — the card leans away from the cursor like a
   real piece of cardstock, with a moving sheen. Fine pointers only. */
export function TiltCard({
	children,
	className = "",
	max = 10,
}: {
	children: ReactNode;
	className?: string;
	max?: number;
}) {
	const outerRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);
	const sheenRef = useRef<HTMLDivElement>(null);

	const onMove = (e: React.MouseEvent) => {
		const el = innerRef.current;
		const outer = outerRef.current;
		if (!el || !outer) return;
		if (window.matchMedia("(pointer: coarse)").matches) return;
		const rect = outer.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width - 0.5;
		const py = (e.clientY - rect.top) / rect.height - 0.5;
		gsap.to(el, {
			rotateY: px * max,
			rotateX: -py * max,
			duration: 0.5,
			ease: "power2.out",
			transformPerspective: 700,
		});
		if (sheenRef.current) {
			gsap.to(sheenRef.current, {
				opacity: 0.5,
				x: px * rect.width * 0.7,
				y: py * rect.height * 0.7,
				duration: 0.5,
				ease: "power2.out",
			});
		}
	};

	const onLeave = () => {
		const el = innerRef.current;
		if (!el) return;
		gsap.to(el, {
			rotateY: 0,
			rotateX: 0,
			duration: 0.9,
			ease: "elastic.out(1, 0.5)",
		});
		if (sheenRef.current) {
			gsap.to(sheenRef.current, { opacity: 0, duration: 0.5 });
		}
	};

	return (
		<div
			ref={outerRef}
			onMouseMove={onMove}
			onMouseLeave={onLeave}
			className={className}
			style={{ perspective: 700 }}
		>
			<div ref={innerRef} className="relative h-full w-full will-change-transform">
				{children}
				{/* moving sheen */}
				<div
					ref={sheenRef}
					className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
					style={{
						background:
							"radial-gradient(circle, rgba(244,241,250,0.28), transparent 70%)",
						mixBlendMode: "overlay",
					}}
					aria-hidden
				/>
			</div>
		</div>
	);
}
