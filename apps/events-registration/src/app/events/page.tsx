"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@repo/store";
import { firebaseGoogleSignIn } from "@repo/firebase";
import { eventsData } from "../../data/events";
import { eventTheme, CAT_THEME } from "../../data/themes";
import { Marquee } from "../../components/fx/Marquee";
import { Reveal, RevealTitle } from "../../components/fx/Reveal";
import { TiltCard } from "../../components/fx/TiltCard";
import { CardArt } from "../../components/fx/CardArt";
import { Cinema } from "../../components/fx/Cinema";

/* ----------------------------------------------------------------------------
   THE LINEUP - every event on one wall, like a rack of collectible cards.
   No mile-long stage sections: a compact hero, a stage filter rail, and a
   single continuous grid on one unbroken atmosphere (no bg jumps).
---------------------------------------------------------------------------- */

const STAGES: Record<string, string> = {
	"Performing Arts": "Performing Arts Stage",
	"Literary Arts": "Literary Arena",
	"Media Arts": "Media District",
	"Visual Arts": "Visual District",
	Personality: "Spotlight Stage",
	Fashion: "The Runway",
	"Special Event": "After Dark Zone",
};

const CATEGORIES = Array.from(new Set(eventsData.map((e) => e.category)));

export default function EventsPage() {
	const [active, setActive] = useState("All");
	const router = useRouter();
	const { user } = useStore();

	const visible =
		active === "All"
			? eventsData
			: eventsData.filter((e) => e.category === active);

	const handleRegisterClick = async () => {
		if (user) {
			router.push("/dashboard");
		} else {
			try {
				await firebaseGoogleSignIn();
			} catch (error) {
				console.error("Failed to sign in:", error);
			}
		}
	};

	return (
		<div className="pt-36">
			{/* --------------------------- COMPACT HERO -------------------------- */}
			<section className="relative -mt-36 overflow-hidden pb-8 pt-36">
				<Cinema src="/cinema/events-hero.jpg" a="#ff6b35" b="#8c2333" priority />
				<div className="relative mx-auto max-w-7xl px-4 md:px-8">
					<Reveal>
						<span className="tape mb-4 inline-block -rotate-2">
							The main arena &middot; On campus
						</span>
					</Reveal>
					<div className="flex flex-wrap items-end justify-between gap-6">
						<RevealTitle
							as="h1"
							text="THE LINEUP"
							className="font-poster text-[16vw] uppercase leading-[0.85] md:text-[9rem]"
						/>
						<Reveal delay={0.15}>
							<p className="mb-3 max-w-sm text-foreground/70">
								Seven stages, forty-plus battles, the whole bill on one
								wall. Pick a stage, pick your card, enter the arena.
							</p>
						</Reveal>
					</div>
				</div>
			</section>

			{/* --------------------------- STAGE FILTER -------------------------- */}
			<div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 py-8 md:px-8">
				{["All", ...CATEGORIES].map((cat, i) => {
					const theme = CAT_THEME[cat] ?? { a: "#ffc94d", b: "#ff5f3c" };
					const isActive = active === cat;
					return (
						<button
							key={cat}
							onClick={() => setActive(cat)}
							data-cursor-text="PICK"
							className={`ticket px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-200 hover:-translate-y-1 ${
								isActive ? "!border-transparent" : ""
							}`}
							style={{
								color: isActive ? "#1a1114" : theme.b,
								background: isActive
									? `linear-gradient(92deg, ${theme.a}, ${theme.b})`
									: undefined,
								transform: `rotate(${(i % 3) - 1}deg)`,
							}}
						>
							{cat === "All" ? "All Stages" : (STAGES[cat] ?? cat)}
						</button>
					);
				})}
			</div>

			{/* ---------------------------- CARD WALL ---------------------------- */}
			<section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
				<div
					key={active}
					className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-7"
				>
					{visible.map((e, j) => {
						const t = eventTheme(e.slug, e.category);
						return (
							<Link
								key={e.slug}
								href={`/events/${e.slug}`}
								data-cursor-text="OPEN"
								className="group block wall-card"
								style={{
									transform: `rotate(${j % 2 ? 0.9 : -0.9}deg)`,
									animationDelay: `${Math.min(j * 55, 500)}ms`,
								}}
							>
								<TiltCard className="w-full" max={8}>
									<div className="relative aspect-[3/4] overflow-hidden border-2 border-white/15 shadow-[7px_7px_0_rgba(0,0,0,0.5)] transition-shadow duration-300 group-hover:shadow-[10px_10px_0_rgba(0,0,0,0.6)]">
										<CardArt
											slug={e.slug}
											title={e.title}
											a={t.a}
											b={t.b}
											motif={t.motif}
											index={j}
											className="absolute inset-0 h-full w-full"
										/>
									</div>
								</TiltCard>
								{/* stage tag under the card */}
								<p
									className="mt-2.5 px-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 transition-colors duration-300 group-hover:text-[var(--gold)]"
								>
									{STAGES[e.category] ?? e.category}
								</p>
							</Link>
						);
					})}
				</div>
			</section>

			{/* --------------------------- CTA STRIP ---------------------------- */}
			<section className="py-12">
				<div
					className="-rotate-1 scale-[1.01]"
					style={{ background: "linear-gradient(92deg, var(--warm-red), var(--sun))" }}
				>
					<Marquee duration={26} className="py-5">
						{Array.from({ length: 8 }).map((_, i) => (
							<button
								key={i}
								onClick={handleRegisterClick}
								className="font-poster mx-8 flex items-center gap-8 text-3xl uppercase text-[#1a1114] hover:opacity-80 transition-opacity"
							>
								<span>Ready to compete?</span>
								<span className="underline decoration-4 underline-offset-4">
									Register now
								</span>
								<span>&#10022;</span>
							</button>
						))}
					</Marquee>
				</div>
			</section>
		</div>
	);
}
