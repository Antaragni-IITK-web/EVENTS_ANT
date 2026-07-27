"use client";

import { useState } from "react";
import Image from "next/image";

/* ----------------------------------------------------------------------------
   Cinema — cinematic photography backdrop with ONE consistent grade:
   dark crush from the edges, warm duotone tint in the event's colors,
   vignette, film grain, and a slow Ken Burns drift. Every image on the
   site passes through this treatment so all photography reads as one
   festival. If the image file doesn't exist yet, the layer silently
   degrades to the tinted atmosphere (overlays without the photo).
---------------------------------------------------------------------------- */

/* category → cinema file key (public/cinema/cat-<key>.jpg) */
export function catKey(category?: string): string {
	switch (category) {
		case "Performing Arts":
			return "performing";
		case "Literary Arts":
			return "literary";
		case "Media Arts":
			return "media";
		case "Visual Arts":
			return "visual";
		case "Personality":
			return "personality";
		case "Fashion":
			return "fashion";
		case "Special Event":
			return "special";
		default:
			return "performing";
	}
}

export function Cinema({
	src,
	a = "#ff6b35",
	b = "#d92643",
	opacity = 1,
	priority = false,
	position = "center",
	className = "",
}: {
	src: string;
	a?: string;
	b?: string;
	/* overall presence of the photo layer (zones use less than heroes) */
	opacity?: number;
	priority?: boolean;
	/* object-position — portrait sources in wide slots want "center 30%" */
	position?: string;
	className?: string;
}) {
	const [ok, setOk] = useState(true);

	return (
		<div
			className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
			aria-hidden
		>
			{ok && (
				<Image
					src={src}
					alt=""
					fill
					sizes="100vw"
					quality={70}
					priority={priority}
					onError={() => setOk(false)}
					/* Ken Burns only on hero instances — animating every zone
					   backdrop at once is what makes scrolling feel heavy */
					className={`object-cover ${priority ? "cinema-img" : ""}`}
					style={{ opacity, objectPosition: position }}
				/>
			)}

			{/* dark crush — the photo never fights the type */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(180deg, rgba(28,18,24,0.66) 0%, rgba(28,18,24,0.3) 42%, #1c1218 98%)",
				}}
			/>
			{/* warm duotone tint in the event's own colors */}
			<div
				className="absolute inset-0 mix-blend-color"
				style={{
					background: `linear-gradient(120deg, ${a}59, ${b}4d)`,
					opacity: ok ? 1 : 0.5,
				}}
			/>
			{/* vignette */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(95% 75% at 50% 32%, transparent 42%, rgba(18,10,14,0.82) 100%)",
				}}
			/>
			{/* film grain */}
			<div
				className="absolute inset-0 opacity-[0.1] mix-blend-soft-light"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
				}}
			/>
		</div>
	);
}
