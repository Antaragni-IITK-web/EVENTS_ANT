"use client";

import { useState } from "react";
import Image from "next/image";
import { PosterArt } from "./PosterArt";
import type { Motif } from "../../data/themes";

/* ----------------------------------------------------------------------------
   CardArt - the collectible festival card, photographic edition.
   Real cinematic photography (public/cards/<slug>.jpg) graded in the event's
   fire colors, wrapped in the trading-card chrome: serial number, corner
   registration ticks, diagonal title ribbon, barcode. If the photo doesn't
   exist, falls back to the generative PosterArt vector scene - same API.
---------------------------------------------------------------------------- */

function cardKey(slug: string): string {
	return slug.toLowerCase().replace(/-about$/, "");
}

export function CardArt({
	slug,
	title,
	a,
	b,
	motif,
	index,
	className = "",
}: {
	slug: string;
	title: string;
	a: string;
	b: string;
	motif: Motif;
	index?: number;
	className?: string;
}) {
	const [ok, setOk] = useState(true);

	if (!ok) {
		return (
			<PosterArt
				slug={slug}
				title={title}
				a={a}
				b={b}
				motif={motif}
				index={index}
				className={className}
			/>
		);
	}

	const serial = `Nº ${String((index ?? 7) + 1).padStart(2, "0")}/26`;

	return (
		<div className={`card-fx relative overflow-hidden bg-[#17101f] ${className}`}>
			{/* the photograph */}
			<Image
				src={`/cards/${cardKey(slug)}.jpg`}
				alt={title}
				fill
				sizes="(max-width: 768px) 70vw, 340px"
				quality={75}
				onError={() => setOk(false)}
				className="object-cover"
			/>

			{/* unified grade - dark crush + the event's duotone */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"linear-gradient(180deg, rgba(23,16,31,0.35) 0%, transparent 30%, transparent 55%, rgba(23,16,31,0.78) 100%)",
				}}
			/>
			<div
				className="pointer-events-none absolute inset-0 mix-blend-color"
				style={{
					background: `linear-gradient(150deg, ${a}40, ${b}36)`,
				}}
			/>
			{/* grain */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
				}}
			/>

			{/* ---- trading-card chrome ---- */}
			{/* serial */}
			<span className="absolute left-3 top-2.5 font-mono text-[10px] font-bold tracking-[0.18em] text-[#f7f0e4]/85">
				{serial}
			</span>
			{/* brand */}
			<span
				className="absolute right-3 top-2.5 text-[9px] font-bold tracking-[0.22em]"
				style={{ color: b }}
			>
				ANTARAGNI &rsquo;26
			</span>

			{/* corner registration ticks */}
			<span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-[#f7f0e4]/50" />
			<span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-[#f7f0e4]/50" />
			<span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-[#f7f0e4]/50" />
			<span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-[#f7f0e4]/50" />

			{/* diagonal title ribbon */}
			<div
				className="absolute -left-4 -right-4 bottom-[7%] -rotate-3 border-y-2 border-[#17101f] px-6 py-1.5"
				style={{ background: `linear-gradient(90deg, ${a}, ${b})` }}
			>
				<span className="font-poster block truncate text-xl uppercase leading-tight text-[#1a1114] md:text-2xl">
					{title}
				</span>
			</div>

			{/* barcode */}
			<div
				className="absolute bottom-2.5 right-4 h-3.5 w-14 opacity-90"
				style={{
					background:
						"repeating-linear-gradient(90deg, #f7f0e4 0 2px, transparent 2px 4px, #f7f0e4 4px 5px, transparent 5px 8px)",
				}}
			/>
		</div>
	);
}
