"use client";

import Link from "next/link";
import { roadtrips } from "../../data/roadtrips";
import { tripTheme } from "../../data/themes";
import { Reveal, RevealTitle } from "../../components/fx/Reveal";
import { FloatingStickers } from "../../components/fx/Stickers";
import { TiltCard } from "../../components/fx/TiltCard";
import { PosterArt } from "../../components/fx/PosterArt";
import { Marquee } from "../../components/fx/Marquee";

/* ----------------------------------------------------------------------------
   ANTARAGNI ON TOUR — a national tour announcement, not a list.
   Every battle is a collectible tour poster (TiltCard + PosterArt) with tour
   branding, a caption strip and a dramatic scroll-in. Nationals headlines.
---------------------------------------------------------------------------- */

const STEPS = [
	{
		n: "01",
		title: "Register your act",
		desc: "Pick your battle — rock, rap, beatbox, comedy or decks — and sign up online.",
	},
	{
		n: "02",
		title: "Win your city",
		desc: "Face the best of your city at the prelims when the Antaragni caravan rolls in.",
	},
	{
		n: "03",
		title: "Finale at IIT Kanpur",
		desc: "City champions clash on the biggest stage of them all — the Nationals at Antaragni '26.",
	},
];

/* one collectible tour poster */
function TourPoster({
	slug,
	title,
	i,
}: {
	slug: string;
	title: string;
	i: number;
}) {
	const t = tripTheme(slug);
	const rot = i % 2 ? 1.6 : -1.6;
	return (
		<Reveal>
			<Link
				href={`/roadtrips/${slug}`}
				data-cursor-text="ENTER"
				className="group block"
				style={{ transform: `rotate(${rot}deg)` }}
			>
				<TiltCard className="w-full" max={9}>
					<div className="relative overflow-hidden border-2 border-white/15 shadow-[10px_10px_0_rgba(0,0,0,0.5)] transition-shadow duration-300 group-hover:shadow-[14px_14px_0_rgba(0,0,0,0.6)]">
						{/* the collectible poster */}
						<div className="relative aspect-[3/4]">
							<PosterArt
								slug={slug}
								title={title}
								a={t.a}
								b={t.b}
								motif={t.motif}
								index={i}
								className="absolute inset-0 h-full w-full"
							/>
							{/* tour stamp */}
							<span
								className="tape absolute right-4 top-12 z-10 rotate-6 !text-[9px]"
								style={{
									background: t.a,
								}}
							>
								2026 India Tour
							</span>
						</div>
					</div>
				</TiltCard>

				{/* caption strip — tour billing */}
				<div className="mt-4 flex items-center justify-between gap-3 px-1">
					<div className="min-w-0">
						<p
							className="font-title truncate text-sm font-bold uppercase tracking-wide"
							style={{ color: t.b }}
						>
							{t.tag}
						</p>
						<p className="truncate text-xs text-foreground/55">{t.tagline}</p>
					</div>
					<span className="shrink-0 text-sm font-bold uppercase tracking-widest text-foreground/50 transition-all duration-300 group-hover:text-[var(--lime)]">
						Enter&nbsp;
						<span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
							&rarr;
						</span>
					</span>
				</div>
			</Link>
		</Reveal>
	);
}

export default function RoadtripsPage() {
	const nationals = roadtrips.find((r) => r.slug === "nationals");
	const rest = roadtrips.filter((r) => r.slug !== "nationals");
	const nat = nationals ? tripTheme(nationals.slug) : null;

	return (
		<div className="pt-36">
			{/* ------------------------------ HERO ------------------------------ */}
			<section className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-6 md:px-8">
				<div
					className="backdrop-word font-poster pointer-events-none absolute -top-4 left-0 text-[16vw] uppercase"
					aria-hidden
				>
					On Tour &#10022; On Tour
				</div>

				<FloatingStickers
					items={[
						{ name: "flame", color: "var(--orange)", left: "78%", top: "12%", size: 66, rot: 8, depth: 0.8 },
						{ name: "note", color: "var(--cyan)", left: "60%", top: "52%", size: 52, rot: -10, depth: 0.6 },
						{ name: "star", color: "var(--pink)", left: "6%", top: "62%", size: 56, rot: 14, depth: 0.9 },
					]}
				/>

				<Reveal className="relative">
					<span className="tape tape-pink mb-5 inline-block rotate-1">
						On tour &middot; Across India
					</span>
				</Reveal>
				<RevealTitle
					as="h1"
					text="ON THE ROAD"
					className="font-poster relative text-[16vw] uppercase leading-[0.85] md:text-[10rem]"
				/>
				<Reveal delay={0.15}>
					<p className="relative mt-6 max-w-xl text-foreground/70">
						Before the fest comes home, it hits the road. Six travelling
						battles storm 15+ cities hunting for India&rsquo;s loudest bands,
						sharpest comics and fiercest crews.
					</p>
				</Reveal>
			</section>

			{/* --------------------------- NATIONALS ----------------------------
			     the headline act — full-width featured tour banner */}
			{nationals && nat && (
				<section className="relative mx-auto max-w-7xl px-4 py-14 md:px-8">
					<Reveal>
						<Link
							href={`/roadtrips/${nationals.slug}`}
							data-cursor-text="ENTER"
							className="group grid items-center gap-8 md:grid-cols-[1fr_1.1fr]"
						>
							<TiltCard className="mx-auto w-full max-w-sm md:order-2" max={8}>
								<div className="relative aspect-[3/4] overflow-hidden border-2 border-white/15 shadow-[12px_12px_0_rgba(0,0,0,0.55)]">
									<PosterArt
										slug={nationals.slug}
										title={nationals.title}
										a={nat.a}
										b={nat.b}
										motif={nat.motif}
										className="absolute inset-0 h-full w-full"
									/>
								</div>
							</TiltCard>

							<div className="md:order-1">
								<span className="tape mb-4 inline-block -rotate-2">
									The headline act
								</span>
								<h2
									className="font-poster text-6xl uppercase leading-[0.85] md:text-8xl"
									style={{
										background: `linear-gradient(94deg, ${nat.a}, ${nat.b})`,
										WebkitBackgroundClip: "text",
										backgroundClip: "text",
										color: "transparent",
									}}
								>
									{nationals.title}
								</h2>
								<p className="mt-4 max-w-md text-lg text-foreground/70">
									{nat.tagline} Every city champion converges on IIT Kanpur for
									one final, deafening night.
								</p>
								<span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--lime)]">
									Enter the finale
									<span className="transition-transform duration-300 group-hover:translate-x-2">
										&rarr;
									</span>
								</span>
							</div>
						</Link>
					</Reveal>
				</section>
			)}

			{/* ------------------------- THE TOUR BILL --------------------------- */}
			<section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
				<Reveal className="mb-12">
					<span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--pink)]">
						The tour bill
					</span>
					<h2 className="font-poster mt-1 text-5xl uppercase leading-[0.9] md:text-7xl">
						Six battles. <span className="text-stroke-lime">One crown.</span>
					</h2>
				</Reveal>

				<div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
					{rest.map((trip, i) => (
						<TourPoster
							key={trip.slug}
							slug={trip.slug}
							title={trip.title}
							i={i}
						/>
					))}
				</div>
			</section>

			{/* ------------------------- TOUR MARQUEE ---------------------------- */}
			<div className="my-6 -rotate-1 scale-[1.02]" style={{ background: "var(--cyan)" }}>
				<Marquee duration={26} className="py-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<span
							key={i}
							className="font-poster mx-6 flex items-center gap-6 text-xl uppercase text-[#0a0612]"
						>
							15+ cities <span>&#9733;</span> 6 battles <span>&#9733;</span> one
							national crown <span>&#9733;</span>
						</span>
					))}
				</Marquee>
			</div>

			{/* --------------------------- HOW IT WORKS -------------------------- */}
			<section className="mx-auto max-w-6xl px-4 pb-28 pt-14">
				<Reveal className="mb-12">
					<span className="tape tape-cyan inline-block -rotate-1">
						How the tour works
					</span>
				</Reveal>
				<div className="grid gap-10 md:grid-cols-3">
					{STEPS.map((s, i) => (
						<Reveal key={s.n} delay={i * 0.1}>
							<div
								className="ticket relative px-7 py-8"
								style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
							>
								<span className="font-poster text-6xl text-gradient-live">
									{s.n}
								</span>
								<h3 className="font-title mt-3 text-xl font-bold uppercase">
									{s.title}
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-foreground/60">
									{s.desc}
								</p>
								<div
									className="mt-6 h-6 w-24"
									style={{
										background:
											"repeating-linear-gradient(90deg, rgba(244,241,250,0.6) 0 2px, transparent 2px 5px)",
									}}
								/>
							</div>
						</Reveal>
					))}
				</div>
			</section>
		</div>
	);
}
