"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* ----------------------------------------------------------------------------
   Festival sticker set — hand-drawn-feel SVG shapes scattered around
   sections. FloatingStickers adds slow bobbing + cursor parallax so the
   poster feels alive. All deterministic (no render-time randomness).
---------------------------------------------------------------------------- */

type StickerName =
	| "star"
	| "bolt"
	| "smiley"
	| "flower"
	| "spiral"
	| "flame"
	| "note"
	| "eye";

export function Sticker({
	name,
	className = "",
	color = "var(--lime)",
}: {
	name: StickerName;
	className?: string;
	color?: string;
}) {
	const common = {
		className,
		viewBox: "0 0 100 100",
		fill: "none",
		"aria-hidden": true as const,
	};
	switch (name) {
		case "star":
			return (
				<svg {...common}>
					<path
						d="M50 4 L59 36 L92 38 L64 57 L74 92 L50 70 L26 92 L36 57 L8 38 L41 36 Z"
						fill={color}
						stroke="#0a0612"
						strokeWidth="3"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "bolt":
			return (
				<svg {...common}>
					<path
						d="M58 4 L20 56 L44 56 L36 96 L80 40 L54 40 Z"
						fill={color}
						stroke="#0a0612"
						strokeWidth="3"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "smiley":
			return (
				<svg {...common}>
					<circle cx="50" cy="50" r="44" fill={color} stroke="#0a0612" strokeWidth="3" />
					<circle cx="35" cy="40" r="6" fill="#0a0612" />
					<circle cx="65" cy="40" r="6" fill="#0a0612" />
					<path
						d="M28 60 Q50 82 72 60"
						stroke="#0a0612"
						strokeWidth="5"
						strokeLinecap="round"
					/>
				</svg>
			);
		case "flower":
			return (
				<svg {...common}>
					{[0, 60, 120, 180, 240, 300].map((deg) => (
						<ellipse
							key={deg}
							cx="50"
							cy="26"
							rx="14"
							ry="22"
							fill={color}
							stroke="#0a0612"
							strokeWidth="2.5"
							transform={`rotate(${deg} 50 50)`}
						/>
					))}
					<circle cx="50" cy="50" r="12" fill="#0a0612" />
				</svg>
			);
		case "spiral":
			return (
				<svg {...common}>
					<path
						d="M50 50 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 -8 a14 14 0 1 1 -14 14 a22 22 0 1 1 22 -22 a32 32 0 1 1 -32 32 a44 44 0 1 1 44 -44"
						stroke={color}
						strokeWidth="5"
						strokeLinecap="round"
					/>
				</svg>
			);
		case "flame":
			return (
				<svg {...common}>
					<path
						d="M50 6 C58 26 76 32 76 58 A26 26 0 0 1 24 58 C24 40 38 34 36 18 C44 24 46 30 46 38 C52 30 50 18 50 6 Z"
						fill={color}
						stroke="#0a0612"
						strokeWidth="3"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "note":
			return (
				<svg {...common}>
					<path
						d="M38 78 L38 22 L78 12 L78 66"
						stroke={color}
						strokeWidth="6"
						strokeLinecap="round"
					/>
					<ellipse cx="28" cy="80" rx="12" ry="9" fill={color} stroke="#0a0612" strokeWidth="2.5" />
					<ellipse cx="68" cy="68" rx="12" ry="9" fill={color} stroke="#0a0612" strokeWidth="2.5" />
				</svg>
			);
		case "eye":
			return (
				<svg {...common}>
					<path
						d="M6 50 Q50 12 94 50 Q50 88 6 50 Z"
						fill={color}
						stroke="#0a0612"
						strokeWidth="3"
					/>
					<circle cx="50" cy="50" r="16" fill="#0a0612" />
					<circle cx="56" cy="44" r="5" fill="#f4f1fa" />
				</svg>
			);
	}
}

export interface FloatingSpec {
	name: StickerName;
	color: string;
	/* percentage position within the parent */
	left: string;
	top: string;
	size: number; // px
	rot: number; // deg
	depth: number; // 0..1 — parallax strength
	className?: string;
}

/* absolutely-positioned sticker field; parent must be `relative` */
export function FloatingStickers({ items }: { items: FloatingSpec[] }) {
	const wrapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const wrap = wrapRef.current;
		if (!wrap) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (window.matchMedia("(pointer: coarse)").matches) return;

		const nodes = Array.from(
			wrap.querySelectorAll<HTMLElement>("[data-depth]")
		);
		const movers = nodes.map((n) => ({
			depth: parseFloat(n.dataset.depth || "0.5"),
			x: gsap.quickTo(n, "x", { duration: 0.9, ease: "power3.out" }),
			y: gsap.quickTo(n, "y", { duration: 0.9, ease: "power3.out" }),
		}));

		const onMove = (e: PointerEvent) => {
			const nx = e.clientX / window.innerWidth - 0.5;
			const ny = e.clientY / window.innerHeight - 0.5;
			for (const m of movers) {
				m.x(nx * 46 * m.depth);
				m.y(ny * 30 * m.depth);
			}
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, []);

	return (
		<div
			ref={wrapRef}
			className="pointer-events-none absolute inset-0"
			aria-hidden
		>
			{items.map((s, i) => (
				<div
					key={i}
					data-depth={s.depth}
					className="absolute"
					style={{ left: s.left, top: s.top }}
				>
					<div
						className={`float-slow ${s.className ?? ""}`}
						style={{
							width: s.size,
							height: s.size,
							["--rot" as string]: `${s.rot}deg`,
							animationDelay: `${(i % 5) * 0.7}s`,
							transform: `rotate(${s.rot}deg)`,
						}}
					>
						<Sticker name={s.name} color={s.color} className="h-full w-full" />
					</div>
				</div>
			))}
		</div>
	);
}
