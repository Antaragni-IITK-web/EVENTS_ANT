/* ----------------------------------------------------------------------------
   Single source of truth for per-event / per-roadtrip visual identity.
   Used by lineup lists, detail pages and generated poster art.
   motif → which generative composition PosterArt draws.
---------------------------------------------------------------------------- */

export type Motif = "bars" | "rays" | "rings" | "wave" | "dots" | "blob" | "burst";

export interface VisualTheme {
	a: string; // gradient start
	b: string; // gradient end
	tag: string; // short label shown on chips
	motif: Motif;
	tagline: string; // one-liner used in hover marquees / detail heroes
}

/* per-category fallback gradients (Spotify-Wrapped energy) */
export const CAT_THEME: Record<string, { a: string; b: string }> = {
	"Performing Arts": { a: "#7c3aed", b: "#ff6ec7" },
	"Literary Arts": { a: "#4dd8ff", b: "#7c3aed" },
	"Media Arts": { a: "#ff8a3d", b: "#ff6ec7" },
	"Visual Arts": { a: "#4dd8ff", b: "#c7f441" },
	Personality: { a: "#ff6ec7", b: "#ff8a3d" },
	Fashion: { a: "#ff6ec7", b: "#7c3aed" },
	"Special Event": { a: "#c7f441", b: "#4dd8ff" },
};

export const EVENT_THEME: Record<string, VisualTheme> = {
	anicon: { a: "#c7f441", b: "#4dd8ff", tag: "Special Event", motif: "dots", tagline: "Cosplay. Manga. Mayhem." },
	dance: { a: "#7c3aed", b: "#ff6ec7", tag: "Performing Arts", motif: "rays", tagline: "Own the floor." },
	debate: { a: "#4dd8ff", b: "#7c3aed", tag: "Literary Arts", motif: "rings", tagline: "Win the argument." },
	dramatics: { a: "#ff6ec7", b: "#7c3aed", tag: "Performing Arts", motif: "burst", tagline: "Stop the crowd." },
	ele: { a: "#4dd8ff", b: "#7c3aed", tag: "Literary Arts", motif: "wave", tagline: "Words that cut." },
	fnp: { a: "#ff8a3d", b: "#ff6ec7", tag: "Media Arts", motif: "dots", tagline: "Frame the fire." },
	finearts: { a: "#4dd8ff", b: "#c7f441", tag: "Visual Arts", motif: "blob", tagline: "Paint it loud." },
	hle: { a: "#ff8a3d", b: "#e11d48", tag: "Literary Arts", motif: "wave", tagline: "शब्दों की आग।" },
	MnM: { a: "#ff6ec7", b: "#ff8a3d", tag: "Personality", motif: "rays", tagline: "Be the moment." },
	musicals: { a: "#7c3aed", b: "#ff6ec7", tag: "Performing Arts", motif: "bars", tagline: "Turn it up." },
	quiz: { a: "#4dd8ff", b: "#7c3aed", tag: "Literary Arts", motif: "rings", tagline: "Know everything." },
	ritambhara: { a: "#ff6ec7", b: "#7c3aed", tag: "Fashion", motif: "burst", tagline: "Walk like thunder." },
};

export const TRIP_THEME: Record<string, VisualTheme> = {
	BattleUnderground: { a: "#ff8a3d", b: "#e11d48", tag: "Rap Battle", motif: "burst", tagline: "Bars over everything." },
	"bug-rap": { a: "#ff8a3d", b: "#e11d48", tag: "Rap Battle", motif: "burst", tagline: "Bars over everything." },
	"bug-beatboxing": { a: "#ff8a3d", b: "#e11d48", tag: "Beatboxing", motif: "bars", tagline: "No instruments. No mercy." },
	synchro: { a: "#4dd8ff", b: "#7c3aed", tag: "Battle of Bands", motif: "bars", tagline: "Loudest band wins." },
	comickaun: { a: "#c7f441", b: "#ff8a3d", tag: "Stand-up Comedy", motif: "blob", tagline: "Make them cry laughing." },
	junoon: { a: "#e11d48", b: "#7c3aed", tag: "Rock", motif: "burst", tagline: "Feel the junoon." },
	djwar: { a: "#7c3aed", b: "#4dd8ff", tag: "Electronic Music", motif: "wave", tagline: "Drop it heavy." },
	nationals: { a: "#c7f441", b: "#ff6ec7", tag: "Grand Finale", motif: "rays", tagline: "One stage. One crown." },
};

export function eventTheme(slug: string, category?: string): VisualTheme {
	return (
		EVENT_THEME[slug] ?? {
			...(CAT_THEME[category ?? ""] ?? { a: "#7c3aed", b: "#ff6ec7" }),
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
			a: "#7c3aed",
			b: "#ff6ec7",
			tag: category ?? "Roadtrip",
			motif: "rays" as Motif,
			tagline: "Antaragni on tour.",
		}
	);
}
