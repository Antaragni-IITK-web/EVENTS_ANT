"use client";

import Link from "next/link";
import { Marquee } from "./fx/Marquee";
import { Reveal, RevealTitle } from "./fx/Reveal";
import { CardArt } from "./fx/CardArt";
import { Embers } from "./fx/Embers";
import { Magnetic } from "./fx/Magnetic";
import { Cinema } from "./fx/Cinema";
import { eventTheme, tripTheme } from "../data/themes";

const WORDS = [
	"Music",
	"Dance",
	"Dramatics",
	"Comedy",
	"Fashion",
	"Quiz",
	"Fine Arts",
	"Literary",
	"Films",
	"Rock",
	"Rap",
	"EDM",
];

function Band() {
	return (
		<div className="relative z-10 -my-6 overflow-hidden py-10">
			<div
				className="-rotate-2 scale-[1.04]"
				style={{ background: "var(--lime)" }}
			>
				<Marquee duration={25} className="py-2.5">
					{WORDS.map((w, i) => (
						<span
							key={i}
							className="font-title mx-4 text-2xl font-black uppercase text-[#0a0612] md:text-3xl"
						>
							{w}
						</span>
					))}
				</Marquee>
			</div>
			<div
				className="absolute left-0 top-1/2 w-full -translate-y-1/2 rotate-2 scale-[1.04]"
				style={{ background: "var(--pink)" }}
			>
				<Marquee duration={30} reverse className="py-2.5">
					{WORDS.map((w, i) => (
						<span
							key={i}
							className="font-title mx-4 text-2xl font-black uppercase text-[#0a0612] md:text-3xl"
						>
							{w}
						</span>
					))}
				</Marquee>
			</div>
		</div>
	);
}

/* -------------------------------- PORTALS --------------------------------- */

const CATEGORIES = [
	{ slug: "music", title: "Music", desc: "Decibels pushing the redline." },
	{ slug: "dance", title: "Dance", desc: "Gravity is optional." },
	{ slug: "fashion", title: "Fashion", desc: "The runway cuts through the pit." },
	{ slug: "literary", title: "Literary", desc: "Words that hit like a snare." },
];

function Portals() {
	return (
		<section className="relative px-5 py-24 md:px-12 md:py-36">
			<div className="mx-auto max-w-7xl">
				<Reveal className="mb-16 md:mb-24">
					<span className="tape tape-cyan mb-4 inline-block -rotate-2">
						Choose your poison
					</span>
					<h2 className="font-title max-w-2xl text-4xl font-black uppercase leading-none md:text-6xl">
						8 Categories. <span className="text-gradient-live">70+ Events.</span>
					</h2>
				</Reveal>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
					{CATEGORIES.map((c, i) => (
						<Reveal key={c.slug} delay={i * 0.1}>
							<Link
								href={`/events#${c.slug}`}
								className="group relative block aspect-[4/3] overflow-hidden border-2 border-white/15 bg-[#0a0612] shadow-[8px_8px_0_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0_rgba(0,0,0,0.7)]"
							>
								{/* Image with extreme contrast and grain */}
								<img
									src={`/cinema/cat-${c.slug}.jpg`}
									alt={c.title}
									className="absolute inset-0 h-full w-full object-cover filter contrast-125 grayscale brightness-75 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
								/>
								
								{/* Color tone overlays */}
								<div className="absolute inset-0 bg-[var(--lime)] opacity-20 mix-blend-color transition-opacity duration-300 group-hover:opacity-0" />
								<div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-transparent to-transparent opacity-90" />
								
								{/* Corner brackets */}
								<div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-[var(--lime)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								<div className="absolute right-4 bottom-4 h-8 w-8 border-b-2 border-r-2 border-[var(--lime)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

								<div className="absolute bottom-0 left-0 p-6 md:p-8">
									<h3 className="font-poster mb-2 text-4xl uppercase text-white drop-shadow-md">
										{c.title}
									</h3>
									<p className="font-mono text-sm uppercase tracking-widest text-[var(--lime)]">
										{c.desc}
									</p>
								</div>
							</Link>
						</Reveal>
					))}
				</div>

				<Reveal className="mt-16 flex justify-center">
					<Magnetic>
						<Link href="/events" className="btn-solid" data-cursor-text="VIEW">
							View full schedule
						</Link>
					</Magnetic>
				</Reveal>
			</div>
		</section>
	);
}

/* --------------------------------- ABOUT ---------------------------------- */

function About() {
	return (
		<section className="relative overflow-hidden py-32 md:py-48">
			{/* The background here is a deep red molten pool */}
			<div className="absolute inset-0 bg-[#0a0612]">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,38,67,0.15)_0%,transparent_70%)]" />
			</div>
			
			<Embers count={40} />

			<div className="relative mx-auto max-w-4xl px-5 text-center">
				<Reveal>
					<span className="tape mb-8 inline-block rotate-1">
						The Manifesto
					</span>
				</Reveal>
				
				<RevealTitle
					text="WE DON'T JUST HOST A FESTIVAL. WE BUILD A TEMPLE TO THE NOISE, THE ART, AND THE CHAOS OF YOUTH. FOR FOUR DAYS, THE RULES ARE SUSPENDED. PLAY LOUD."
					className="font-title text-3xl font-black uppercase leading-tight md:text-5xl lg:text-6xl"
				/>
				
				<Reveal className="mt-16 flex justify-center gap-6">
					<div className="flex flex-col items-center">
						<span className="font-poster text-5xl text-[var(--pink)] md:text-7xl">61</span>
						<span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/60">Editions</span>
					</div>
					<div className="flex flex-col items-center">
						<span className="font-poster text-5xl text-[var(--cyan)] md:text-7xl">130K</span>
						<span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/60">Footfall</span>
					</div>
					<div className="flex flex-col items-center">
						<span className="font-poster text-5xl text-[var(--lime)] md:text-7xl">300+</span>
						<span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/60">Colleges</span>
					</div>
				</Reveal>
			</div>
		</section>
	);
}

/* --------------------------------- LEGACY --------------------------------- */

const ARTISTS = [
	"Sunidhi Chauhan",
	"Vishal-Shekhar",
	"Amit Trivedi",
	"Salim-Sulaiman",
	"Gajendra Verma",
	"The Local Train",
	"Yellow Diary",
	"KK",
];

const WALL = [
	{ slug: "battleunderground", title: "Battle Underground", trip: true },
	{ slug: "music", title: "Music" },
	{ slug: "djwar", title: "DJ War", trip: true },
	{ slug: "dance", title: "Dance" },
	{ slug: "bug-rap", title: "Rap", trip: true },
	{ slug: "fashion", title: "Fashion" },
	{ slug: "bug-beatboxing", title: "Beatboxing", trip: true },
	{ slug: "literary", title: "Literary" },
	{ slug: "synchro", title: "Synchro", trip: true },
	{ slug: "dramatics", title: "Dramatics" },
	{ slug: "nationals", title: "Nationals", trip: true },
	{ slug: "ritambhara", title: "Ritambhara" },
	{ slug: "comickaun", title: "ComicKaun", trip: true },
];

function Legacy() {
	return (
		<section className="relative overflow-hidden py-28">
			{/* the crowd - festival night photography under the poster wall */}
			<Cinema src="/cinema/home-crowd.jpg" a="#ff6b35" b="#8c2333" opacity={0.4} />
			<div className="backdrop-word font-poster pointer-events-none absolute left-0 top-6 w-full text-center text-[13vw] uppercase">
				Legends
			</div>

			<Reveal className="relative mx-auto mb-16 max-w-6xl px-4">
				<span className="tape tape-cyan mb-4 inline-block -rotate-1">
					The wall of legends
				</span>
				<h2 className="font-title max-w-xl text-4xl font-black uppercase leading-none md:text-6xl">
					They played <span className="text-gradient-live">our stage.</span>
				</h2>
			</Reveal>

			{/* taped-up poster wall */}
			<Marquee duration={45} pauseOnHover className="mb-12">
				{WALL.map((p, i) => {
					const t = p.trip ? tripTheme(p.slug) : eventTheme(p.slug);
					return (
						<Link
							key={i}
							href={p.trip ? `/roadtrips/${p.slug}` : `/events/${p.slug}`}
							className={`relative mx-4 h-64 w-48 shrink-0 border-2 border-white/15 shadow-[7px_7px_0_rgba(0,0,0,0.5)] md:h-80 md:w-60 block hover:scale-105 transition-transform ${i % 2 ? "translate-y-4 rotate-2" : "-translate-y-2 -rotate-2"
								}`}
						>
							<span
								className={`tape absolute -top-3 left-1/2 z-10 -translate-x-1/2 ${i % 3 === 1 ? "tape-pink" : i % 3 === 2 ? "tape-cyan" : ""}`}
								style={{ width: 70, height: 18, padding: 0 }}
							/>
							<CardArt
								slug={p.slug}
								title={p.title}
								a={t.a}
								b={t.b}
								motif={t.motif}
								index={i}
								className="h-full w-full"
							/>
						</Link>
					);
				})}
			</Marquee>

			{/* artist name marquee */}
			<Marquee duration={30} reverse className="py-2">
				{ARTISTS.map((a) => (
					<span
						key={a}
						className="font-poster mx-6 flex items-center gap-12 text-4xl uppercase md:text-6xl"
					>
						<span className="text-stroke transition-colors duration-300 hover:text-[var(--lime)]">
							{a}
						</span>
						<span style={{ color: "var(--pink)" }}>&#10022;</span>
					</span>
				))}
			</Marquee>
		</section>
	);
}

export default function LandingBelowFold() {
	return (
		<>
			<Band />
			<Portals />
			<About />
			<Legacy />
		</>
	);
}
