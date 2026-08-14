"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Marquee } from "../components/fx/Marquee";
import { Reveal, RevealTitle } from "../components/fx/Reveal";
import { CardArt } from "../components/fx/CardArt";
import { Embers } from "../components/fx/Embers";
import { Magnetic } from "../components/fx/Magnetic";
import { Cinema } from "../components/fx/Cinema";
import { eventTheme, tripTheme } from "../data/themes";
import { Contact } from "../components/Contact";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------------------------------- HERO ----------------------------------
   An album cover, not a landing page: left-anchored giant wordmark with a
   live gradient sweeping through it, repeated outline type wallpapering the
   back, festival stickers floating with cursor parallax, ticket-stamp date. */

const TITLE = "ANTARAGNI";

function Hero() {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!document.hidden) {
				const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
				tl.from(".hero-letter", {
					yPercent: 120,
					rotate: 6,
					stagger: 0.055,
					duration: 1.2,
					delay: 0.25,
				})
					.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.7 }, "-=0.7")
					.from(".hero-sub", { opacity: 0, y: 24, duration: 0.8 }, "-=0.5")
					.from(
						".hero-cta",
						{ opacity: 0, y: 24, stagger: 0.12, duration: 0.7 },
						"-=0.55"
					)
					.from(".hero-stamp", { opacity: 0, scale: 0.6, rotate: -12, duration: 0.6, ease: "back.out(2)" }, "-=0.6")
					.from(".hero-scroll", { opacity: 0, duration: 1 }, "-=0.2");
			}

			gsap.to(".hero-title", {
				yPercent: -16,
				opacity: 0.3,
				ease: "none",
				scrollTrigger: {
					trigger: ref.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});
			gsap.to(".hero-backdrop", {
				yPercent: 22,
				ease: "none",
				scrollTrigger: {
					trigger: ref.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});
		},
		{ scope: ref }
	);

	return (
		<section
			ref={ref}
			className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 md:px-12"
		>
			{/* typographic wallpaper — three warm outline rows drifting slowly,
			    faded at the edges so they never fight the wordmark */}
			<div className="hero-backdrop hero-rows pointer-events-none absolute -inset-x-[12%] inset-y-0 flex -rotate-3 flex-col justify-center gap-[3vw]">
				{[
					{ dur: "85s", rev: false },
					{ dur: "62s", rev: true },
					{ dur: "74s", rev: false },
				].map((row, i) => (
					<div
						key={i}
						className="marquee-track"
						style={{
							["--marquee-dur" as string]: row.dur,
							animationDirection: row.rev ? "reverse" : "normal",
						}}
					>
						{[0, 1].map((c) => (
							<span
								key={c}
								className="backdrop-word backdrop-word-warm font-poster whitespace-nowrap px-6 text-[8.5vw] uppercase"
							>
								{"ANTARAGNI ✦ ".repeat(5)}
							</span>
						))}
					</div>
				))}
			</div>

			{/* stage beam falling on the wordmark */}
			<div className="hero-beam pointer-events-none absolute left-[38%] top-[-24%] h-[95%] w-[48vw] -translate-x-1/2" />

			{/* sparks rising from the fire — the hero breathes */}
			<Embers count={72} />

			{/* cinematic vignette — center pops, edges fall away */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_45%_42%,transparent_52%,rgba(12,7,8,0.6)_100%)]" />

			{/* ticket-stamp date, pinned top-right — 61st Edition headlines it */}
			<div className="hero-stamp absolute right-5 top-24 rotate-6 md:right-14 md:top-28">
				<div className="flex flex-col items-center gap-1.5">
					<span className="tape tape-pink !text-sm">61ST EDITION</span>
					<span className="tape">OCT 2026</span>
					<span className="tape tape-cyan">IIT KANPUR</span>
				</div>
			</div>

			<div className="relative max-w-[1500px]">
				<p className="hero-eyebrow mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-foreground/85 md:text-lg">
					<span className="inline-block h-3.5 w-3.5 rotate-45" style={{ background: "var(--gold)" }} />
					North India&rsquo;s biggest college cultural festival
				</p>

				{/* the identity — ONE line: molten letters with an ink outline,
				    hard poster shadow + ember bloom. No misregistered echo. */}
				<div className="hero-title relative w-fit select-none">
					<h1
						className="hero-word hero-fire-shadow font-title relative text-[10.5vw] font-black md:text-[9.3vw]"
						aria-label={TITLE}
					>
						{TITLE.split("").map((ch, i) => (
							<span
								key={i}
								className="inline-block overflow-hidden align-bottom"
								aria-hidden
							>
								<span
									className="hero-letter text-chrome inline-block"
									style={{ animationDelay: `${i * 0.4}s` }}
								>
									{ch}
								</span>
							</span>
						))}
					</h1>
				</div>

				<div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
					<p className="hero-sub max-w-md text-base leading-relaxed text-foreground/70 md:text-lg">
						Four days. Hundreds of stages. One incredible story — and
						you&rsquo;re in it. The 61st edition returns louder than ever.
					</p>

					<div className="flex flex-wrap items-center gap-5">
						<Magnetic>
							<Link href="/events" className="hero-cta btn-lime" data-cursor-text="GO">
								Explore Events
							</Link>
						</Magnetic>
						<Magnetic>
							<Link href="/roadtrips" className="hero-cta btn-festival" data-cursor-text="GO">
								Ride the Roadtrips
							</Link>
						</Magnetic>
					</div>
				</div>
			</div>

			<div className="hero-scroll absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground/40">
				<span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
				<span className="block h-10 w-px animate-pulse bg-gradient-to-b from-foreground/60 to-transparent" />
			</div>
		</section>
	);
}

/* ------------------------- CROSSING MARQUEE BANDS ------------------------- */

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
				<Marquee duration={22} className="py-3">
					{WORDS.map((w) => (
						<span
							key={w}
							className="font-title mx-4 flex items-center gap-8 text-xl font-bold uppercase tracking-wide text-[#0a0612]"
						>
							{w}
							<span className="text-[#0a0612]/60">&#10022;</span>
						</span>
					))}
				</Marquee>
			</div>
			<div
				className="rotate-1 scale-[1.04] border-y-2 border-[#1c1218]"
				style={{ background: "var(--sun)", marginTop: "-0.5rem" }}
			>
				<Marquee duration={30} reverse className="py-2">
					{Array.from({ length: 6 }).map((_, i) => (
						<span
							key={i}
							className="font-poster mx-6 flex items-center gap-6 text-lg uppercase tracking-wider text-[#0a0612]"
						>
							Oct 2026 <span>&#9733;</span> IIT Kanpur <span>&#9733;</span> 300+
							colleges <span>&#9733;</span> 40+ competitions
						</span>
					))}
				</Marquee>
			</div>
		</div>
	);
}

/* ------------------------------ PORTAL POSTERS ----------------------------
   Two tilted, overlapping gig posters taped to the wall — not cards. */

function Portals() {
	return (
		<section className="relative mx-auto max-w-6xl px-4 py-28">
			<div className="backdrop-word font-poster pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 text-[16vw] uppercase">
				Two Worlds
			</div>

			<Reveal className="relative mb-20 max-w-lg">
				<span className="tape tape-pink mb-4 inline-block -rotate-2">
					Pick your universe
				</span>
				<h2 className="font-title text-4xl font-black uppercase leading-none md:text-6xl">
					One fest.
					<br />
					<span className="text-gradient-live">Two worlds.</span>
				</h2>
			</Reveal>

			<div className="relative grid gap-14 md:grid-cols-2 md:gap-8">
				{/* Events poster */}
				<Reveal>
					<Link
						href="/events"
						data-cursor-text="ENTER"
						className="group relative block -rotate-2 border-2 border-white/15 shadow-[10px_10px_0_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-2 hover:rotate-0"
					>
						<span className="tape absolute -top-3 left-8 z-10 rotate-3">On campus</span>
						<div className="relative h-[520px] overflow-hidden">
							<CardArt
								slug="events-portal"
								title="Events"
								a="#ff8a3d"
								b="#d92643"
								motif="rays"
								className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-transparent to-transparent" />
							<div className="absolute bottom-0 w-full p-7">
								<h3 className="font-poster text-7xl uppercase leading-none">
									Events
								</h3>
								<p className="mt-3 max-w-sm text-sm text-foreground/75">
									40+ competitions across dance, music, drama, literary arts,
									quizzing and fashion. The main arena awaits.
								</p>
								<span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--lime)]">
									Enter the arena
									<span className="transition-transform duration-300 group-hover:translate-x-2">
										&rarr;
									</span>
								</span>
							</div>
						</div>
					</Link>
				</Reveal>

				{/* Roadtrips poster — offset lower, opposite tilt */}
				<Reveal delay={0.12} className="md:mt-24">
					<Link
						href="/roadtrips"
						data-cursor-text="ENTER"
						className="group relative block rotate-2 border-2 border-white/15 shadow-[10px_10px_0_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-2 hover:rotate-0"
					>
						<span className="tape tape-cyan absolute -top-3 right-8 z-10 -rotate-3">
							Across India
						</span>
						<div className="relative h-[520px] overflow-hidden">
							<CardArt
								slug="roadtrips-portal"
								title="Roadtrips"
								a="#ffc94d"
								b="#d92643"
								motif="burst"
								className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-transparent to-transparent" />
							<div className="absolute bottom-0 w-full p-7">
								<h3 className="font-poster text-7xl uppercase leading-none">
									Roadtrips
								</h3>
								<p className="mt-3 max-w-sm text-sm text-foreground/75">
									Rock, rap, beatboxing, comedy and DJ battles hit your city
									before the grand finale at IIT Kanpur.
								</p>
								<span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--pink)]">
									Hit the road
									<span className="transition-transform duration-300 group-hover:translate-x-2">
										&rarr;
									</span>
								</span>
							</div>
						</div>
					</Link>
				</Reveal>
			</div>
		</section>
	);
}

/* --------------------------------- NUMBERS --------------------------------
   No boxes. The numbers ARE the layout — a giant typographic stack. */

function Counter({ to, suffix }: { to: number; suffix: string }) {
	const ref = useRef<HTMLSpanElement>(null);

	useGSAP(() => {
		if (!ref.current) return;
		const obj = { v: 0 };
		gsap.to(obj, {
			v: to,
			duration: 2,
			ease: "power2.out",
			scrollTrigger: { trigger: ref.current, start: "top 90%" },
			onUpdate: () => {
				if (ref.current)
					ref.current.textContent = `${Math.round(obj.v)}${suffix}`;
			},
		});
	});

	return <span ref={ref}>0{suffix}</span>;
}

const STATS = [
	{ to: 60, suffix: "+", label: "years of legacy", style: "solid" },
	{ to: 300, suffix: "+", label: "colleges", style: "outline" },
	{ to: 40, suffix: "+", label: "competitions", style: "gradient" },
	{ to: 15, suffix: "+", label: "roadtrip cities", style: "solid" },
];

function About() {
	return (
		<section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-28">
			<div className="grid items-start gap-16 md:grid-cols-[1.1fr_1fr]">
				<Reveal>
					<span className="tape mb-5 inline-block rotate-1">
						Unleashing the fire within
					</span>
					<h2 className="font-title text-4xl font-black leading-tight md:text-5xl">
						Six decades of{" "}
						<span className="marker-pink marker -rotate-1 inline-block">
							goosebumps.
						</span>
					</h2>
					<p className="mt-6 leading-relaxed text-foreground/70">
						Since 1966, Antaragni has been where India&rsquo;s most fearless
						performers collide. From midnight jam sessions to roaring pronites,
						from street plays that stop crowds to quizzes that break brains —
						this is the stage where legends take their first bow.
					</p>
					<p className="mt-4 leading-relaxed text-foreground/70">
						In 2026 we return <span className="marker">louder, brighter and bolder</span>.
						Register, compete, and write yourself into the story.
					</p>
				</Reveal>

				{/* typographic stat stack — numbers bleed into the background */}
				<Reveal className="flex flex-col gap-2" stagger={0.12}>
					{STATS.map((s, i) => (
						<div
							key={s.label}
							className="flex items-baseline gap-4"
							style={{ transform: `rotate(${i % 2 ? 1 : -1}deg) translateX(${(i % 3) * 14}px)` }}
						>
							<span
								className={`font-poster text-7xl leading-[0.9] md:text-8xl ${
									s.style === "gradient"
										? "text-gradient-live"
										: s.style === "outline"
											? "text-stroke-lime"
											: ""
								}`}
							>
								<Counter to={s.to} suffix={s.suffix} />
							</span>
							<span className="tape tape-pink shrink-0 -rotate-2 !text-[10px]">
								{s.label}
							</span>
						</div>
					))}
				</Reveal>
			</div>
		</section>
	);
}

/* ------------------------------ LEGACY WALL ------------------------------- */

const ARTISTS = [
	"Sunidhi Chauhan",
	"Amit Trivedi",
	"Farhan Akhtar",
	"Mohit Chauhan",
	"KK",
	"Javed Ali",
	"Nucleya",
	"The Local Train",
	"Shaan",
	"Salim–Sulaiman",
];

/* poster wall — generated art, one per marquee slot */
const WALL = [
	{ slug: "musicals", title: "Music" },
	{ slug: "junoon", title: "Junoon", trip: true },
	{ slug: "dance", title: "Dance" },
	{ slug: "djwar", title: "DJ Wars", trip: true },
	{ slug: "dramatics", title: "Dramatics" },
	{ slug: "nationals", title: "Nationals", trip: true },
	{ slug: "ritambhara", title: "Ritambhara" },
	{ slug: "comickaun", title: "ComicKaun", trip: true },
];

function Legacy() {
	return (
		<section className="relative overflow-hidden py-28">
			{/* the crowd — festival night photography under the poster wall */}
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
						<div
							key={i}
							className={`relative mx-4 h-64 w-48 shrink-0 border-2 border-white/15 shadow-[7px_7px_0_rgba(0,0,0,0.5)] md:h-80 md:w-60 ${
								i % 2 ? "translate-y-4 rotate-2" : "-translate-y-2 -rotate-2"
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
						</div>
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

/* ---------------------------------- PAGE ---------------------------------- */

export default function Home() {
	return (
		<>
			<Hero />
			<Band />
			<Portals />
			<About />
			<Legacy />
			<Contact />
		</>
	);
}
