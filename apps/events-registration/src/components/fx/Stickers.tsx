"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { IconType } from "react-icons";
import {
	FaMicrophoneAlt,
	FaGuitar,
	FaTheaterMasks,
	FaCamera,
	FaFilm,
	FaDrum,
	FaTrophy,
	FaTicketAlt,
	FaPaintBrush,
	FaHeadphones,
	FaMusic,
	FaFeatherAlt,
	FaFire,
} from "react-icons/fa";

/* ----------------------------------------------------------------------------
   Festival stickers — every decorative element is a real festival object:
   microphones, guitars, theatre masks, cameras, film reels, drums, trophies,
   tickets, brushes. Rendered as merch-style badge stickers (ink disc, colored
   ring, hard shadow). FloatingStickers adds slow bobbing + cursor parallax.
---------------------------------------------------------------------------- */

export type StickerName =
	| "mic"
	| "guitar"
	| "masks"
	| "camera"
	| "film"
	| "drum"
	| "trophy"
	| "ticket"
	| "brush"
	| "headphones"
	| "note"
	| "quill"
	| "antaragni";

const OBJECT_ICONS: Record<StickerName, IconType> = {
	mic: FaMicrophoneAlt,
	guitar: FaGuitar,
	masks: FaTheaterMasks,
	camera: FaCamera,
	film: FaFilm,
	drum: FaDrum,
	trophy: FaTrophy,
	ticket: FaTicketAlt,
	brush: FaPaintBrush,
	headphones: FaHeadphones,
	note: FaMusic,
	quill: FaFeatherAlt,
	antaragni: FaFire,
};

export function Sticker({
	name,
	className = "",
	color = "var(--yellow)",
}: {
	name: StickerName;
	className?: string;
	color?: string;
}) {
	const Icon = OBJECT_ICONS[name];
	return (
		<svg
			className={className}
			viewBox="0 0 100 100"
			fill="none"
			aria-hidden
		>
			{/* hard offset shadow */}
			<circle cx="54" cy="56" r="42" fill="rgba(0,0,0,0.45)" />
			{/* badge disc */}
			<circle cx="48" cy="48" r="42" fill="#241620" stroke={color} strokeWidth="3.5" />
			{/* stitched inner ring — merch patch feel */}
			<circle
				cx="48"
				cy="48"
				r="35"
				fill="none"
				stroke={color}
				strokeWidth="1.2"
				strokeDasharray="4 5"
				opacity="0.55"
			/>
			<Icon x={29} y={29} size={38} fill={color} />
		</svg>
	);
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

export const SHOW_STICKERS = true; // Set to false to remove stickers completely (Plan A)

/* absolutely-positioned sticker field; parent must be `relative` */
export function FloatingStickers({ items }: { items: FloatingSpec[] }) {
	const wrapRef = useRef<HTMLDivElement>(null);

	if (!SHOW_STICKERS) return null;

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
