"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PosterArt } from "./PosterArt";
import type { Motif } from "../../data/themes";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ----------------------------------------------------------------------------
   KineticLineup — festival-lineup typography list.
   Huge type rows; hovering a row slides a gradient marquee curtain over it
   and a floating generated poster chases the cursor. Replaces card grids.
---------------------------------------------------------------------------- */

export interface LineupItem {
	slug: string;
	title: string;
	tag: string;
	tagline: string;
	href: string;
	a: string;
	b: string;
	motif: Motif;
}

export function KineticLineup({ items }: { items: LineupItem[] }) {
	const scope = useRef<HTMLDivElement>(null);
	const previewRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(-1);
	const quick = useRef<{
		x?: (v: number) => void;
		y?: (v: number) => void;
		r?: (v: number) => void;
	}>({});
	const lastX = useRef(0);

	useGSAP(
		() => {
			/* skip the reveal if the tab is hidden at mount — a paused rAF would
			   otherwise leave rows stranded at opacity 0 */
			if (!document.hidden) {
				gsap.from(".lineup-row", {
					y: 70,
					opacity: 0,
					stagger: 0.07,
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: { trigger: scope.current, start: "top 82%" },
				});
			}
			const el = previewRef.current;
			if (el) {
				quick.current.x = gsap.quickTo(el, "x", {
					duration: 0.4,
					ease: "power3.out",
				});
				quick.current.y = gsap.quickTo(el, "y", {
					duration: 0.4,
					ease: "power3.out",
				});
				quick.current.r = gsap.quickTo(el, "rotation", {
					duration: 0.6,
					ease: "power3.out",
				});
			}
		},
		{ scope }
	);

	const onMouseMove = (e: React.MouseEvent) => {
		quick.current.x?.(e.clientX + 36);
		quick.current.y?.(e.clientY - 168);
		/* tilt the poster with cursor velocity */
		const dx = e.clientX - lastX.current;
		lastX.current = e.clientX;
		quick.current.r?.(Math.max(-16, Math.min(16, dx * 1.1)));
	};

	const activeItem = active >= 0 ? items[active] : null;

	return (
		<div
			ref={scope}
			onMouseMove={onMouseMove}
			onMouseLeave={() => setActive(-1)}
			className="relative"
		>
			{/* floating poster that chases the cursor (fine pointers only) */}
			<div
				ref={previewRef}
				className={`pointer-events-none fixed left-0 top-0 z-40 hidden h-[336px] w-64 origin-center overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/60 transition-[opacity,scale] duration-300 md:block ${
					activeItem ? "scale-100 opacity-100" : "scale-75 opacity-0"
				}`}
				aria-hidden
			>
				{activeItem && (
					<PosterArt
						slug={activeItem.slug}
						title={activeItem.title}
						a={activeItem.a}
						b={activeItem.b}
						motif={activeItem.motif}
						index={active}
						className="h-full w-full"
					/>
				)}
			</div>

			<div className="border-t border-white/10">
				{items.map((item, i) => (
					<Link
						key={item.slug}
						href={item.href}
						data-cursor-text="OPEN"
						onMouseEnter={() => setActive(i)}
						style={{ ["--tc" as string]: item.b }}
						className="lineup-row group relative block overflow-hidden border-b border-white/10"
					>
						{/* gradient fill wipes in from the left on hover
						    (clip-path inset — no transform/scale, bulletproof) */}
						<div
							className="lineup-fill pointer-events-none absolute inset-0"
							style={{
								background: `linear-gradient(90deg, ${item.a}, ${item.b})`,
							}}
							aria-hidden
						/>

						<div className="relative flex items-center gap-4 px-3 py-5 md:gap-7 md:px-8 md:py-6">
							<span className="font-title hidden w-10 shrink-0 text-sm font-bold text-foreground/30 transition-colors duration-500 group-hover:text-[#0a0612]/70 md:block">
								{String(i + 1).padStart(2, "0")}
							</span>

							{/* poster thumb — always visible, pops on hover */}
							<span className="block h-20 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 shadow-lg transition-transform duration-500 group-hover:scale-105 md:h-24 md:w-16">
								<PosterArt
									slug={item.slug}
									title={item.title}
									a={item.a}
									b={item.b}
									motif={item.motif}
									className="h-full w-full"
								/>
							</span>

							<h3 className="font-title min-w-0 flex-1 truncate text-3xl font-black uppercase leading-none tracking-tight text-foreground/85 transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-[#0a0612] sm:text-5xl md:text-6xl">
								{item.title}
							</h3>

							{/* tagline slides in on hover */}
							<span className="hidden max-w-0 shrink overflow-hidden whitespace-nowrap font-sans text-sm font-bold uppercase tracking-widest text-[#0a0612] opacity-0 transition-all duration-500 group-hover:max-w-[16rem] group-hover:opacity-100 lg:block">
								{item.tagline}
							</span>

							<span className="chip hidden shrink-0 !text-[10px] text-[color:var(--tc)] transition-colors duration-500 group-hover:!text-[#0a0612] sm:inline-flex">
								{item.tag}
							</span>
							<span className="hidden shrink-0 text-xl text-foreground/40 transition-[color,transform] duration-500 group-hover:translate-x-1 group-hover:text-[#0a0612] md:block">
								&rarr;
							</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
