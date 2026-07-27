/* ----------------------------------------------------------------------------
   Single source of truth for per-event / per-roadtrip visual identity.
   Used by lineup lists, detail pages and generated poster art.
   motif → which generative composition PosterArt draws.

   THE ANTARAGNI PALETTE — fire only. Every identity is a pairing from:
   gold #ffc94d · amber #ffb769 · ember #ff8a3d · flame #ff5f3c ·
   crimson #d92643 · maroon #8c2333 · cream #fff1d6
   Variety comes from heat (light↔dark), not from hue families.
---------------------------------------------------------------------------- */

export type Motif = "bars" | "rays" | "rings" | "wave" | "dots" | "blob" | "burst";

export interface VisualTheme {
	a: string; // gradient start
	b: string; // gradient end
	tag: string; // short label shown on chips
	motif: Motif;
	tagline: string; // one-liner used in hover marquees / detail heroes
}

/* per-category fallback gradients — fire, graded by heat */
export const CAT_THEME: Record<string, { a: string; b: string }> = {
	"Performing Arts": { a: "#ff8a3d", b: "#d92643" },
	"Literary Arts": { a: "#ffc94d", b: "#8c2333" },
	"Media Arts": { a: "#ff5f3c", b: "#ffc94d" },
	"Visual Arts": { a: "#ffb769", b: "#d92643" },
	Personality: { a: "#ffc94d", b: "#ff5f3c" },
	Fashion: { a: "#d92643", b: "#8c2333" },
	"Special Event": { a: "#ffb769", b: "#ff8a3d" },
};

export const EVENT_THEME: Record<string, VisualTheme> = {
	anicon: { a: "#ffb769", b: "#ff8a3d", tag: "Special Event", motif: "dots", tagline: "Cosplay. Manga. Mayhem." },
	dance: { a: "#ff8a3d", b: "#d92643", tag: "Performing Arts", motif: "rays", tagline: "Own the floor." },
	debate: { a: "#ffc94d", b: "#8c2333", tag: "Literary Arts", motif: "rings", tagline: "Win the argument." },
	dramatics: { a: "#d92643", b: "#8c2333", tag: "Performing Arts", motif: "burst", tagline: "Stop the crowd." },
	ele: { a: "#ffb769", b: "#8c2333", tag: "Literary Arts", motif: "wave", tagline: "Words that cut." },
	fnp: { a: "#ff5f3c", b: "#ffc94d", tag: "Media Arts", motif: "dots", tagline: "Frame the fire." },
	finearts: { a: "#ffb769", b: "#d92643", tag: "Visual Arts", motif: "blob", tagline: "Paint it loud." },
	hle: { a: "#ff8a3d", b: "#d92643", tag: "Literary Arts", motif: "wave", tagline: "शब्दों की आग।" },
	MnM: { a: "#ffc94d", b: "#ff5f3c", tag: "Personality", motif: "rays", tagline: "Be the moment." },
	musicals: { a: "#ff5f3c", b: "#8c2333", tag: "Performing Arts", motif: "bars", tagline: "Turn it up." },
	quiz: { a: "#ffc94d", b: "#ff8a3d", tag: "Literary Arts", motif: "rings", tagline: "Know everything." },
	ritambhara: { a: "#d92643", b: "#8c2333", tag: "Fashion", motif: "burst", tagline: "Walk like thunder." },
};

export const TRIP_THEME: Record<string, VisualTheme> = {
	BattleUnderground: { a: "#ff8a3d", b: "#d92643", tag: "Rap Battle", motif: "burst", tagline: "Bars over everything." },
	"bug-rap": { a: "#ff8a3d", b: "#d92643", tag: "Rap Battle", motif: "burst", tagline: "Bars over everything." },
	"bug-beatboxing": { a: "#ff5f3c", b: "#8c2333", tag: "Beatboxing", motif: "bars", tagline: "No instruments. No mercy." },
	synchro: { a: "#ffc94d", b: "#d92643", tag: "Battle of Bands", motif: "bars", tagline: "Loudest band wins." },
	comickaun: { a: "#ffc94d", b: "#ff8a3d", tag: "Stand-up Comedy", motif: "blob", tagline: "Make them cry laughing." },
	junoon: { a: "#d92643", b: "#8c2333", tag: "Rock", motif: "burst", tagline: "Feel the junoon." },
	djwar: { a: "#ff5f3c", b: "#ffb769", tag: "Electronic Music", motif: "wave", tagline: "Drop it heavy." },
	nationals: { a: "#ffc94d", b: "#ff5f3c", tag: "Grand Finale", motif: "rays", tagline: "One stage. One crown." },
};

export function eventTheme(slug: string, category?: string): VisualTheme {
	return (
		EVENT_THEME[slug] ?? {
			...(CAT_THEME[category ?? ""] ?? { a: "#ff8a3d", b: "#d92643" }),
			tag: category ?? "Event",
			motif: "rays" as Motif,
			tagline: "Enter the arena.",
		}
	);
}

export function tripTheme(slug: string, category?: string): VisualTheme {
	const ciKey = Object.keys(TRIP_THEME).find(
		(k) => k.toLowerCase() === slug.toLowerCase()
	);
	return (
		TRIP_THEME[slug] ??
		(ciKey ? TRIP_THEME[ciKey] : undefined) ?? {
			a: "#ff8a3d",
			b: "#d92643",
			tag: category ?? "Roadtrip",
			motif: "rays" as Motif,
			tagline: "Antaragni on tour.",
		}
	);
}
