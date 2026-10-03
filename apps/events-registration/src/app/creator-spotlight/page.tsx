"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cinema } from "../../components/fx/Cinema";
import { PosterArt } from "../../components/fx/PosterArt";
import { Marquee } from "../../components/fx/Marquee";
import { Reveal } from "../../components/fx/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const theme = {
	a: "#ff3c00",
	b: "#ff8a3d",
	tag: "SPOTLIGHT",
	tagline: "The flagship creator initiative of Antaragni '26",
};

const NAV = [
	{ id: "overview", label: "Overview" },
	{ id: "perks", label: "The Loot" },
	{ id: "rubric", label: "Rubric" },
];

export default function CreatorSpotlightPage() {
	const SectionHead = ({ id, label }: { id: string; label: string }) => (
		<Reveal>
			<span
				className="tape mb-4 inline-block -rotate-1"
				style={{ background: theme.b, color: "#0a0612" }}
			>
				{String(NAV.findIndex((n) => n.id === id) + 1).padStart(2, "0")} / {theme.tag}
			</span>
			<h2
				className="font-poster mb-10 text-5xl uppercase leading-none md:text-7xl"
				style={{
					background: `linear-gradient(92deg, ${theme.a}, ${theme.b})`,
					WebkitBackgroundClip: "text",
					backgroundClip: "text",
					color: "transparent",
				}}
			>
				{label}
			</h2>
		</Reveal>
	);

	return (
		<div className="min-h-screen pb-10">
			
			{/* HERO */}
			<section className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden px-4 pt-32 text-center">
				<Cinema
					src={`/cards/events-portal.jpg`}
					a={theme.a}
					b={theme.b}
					position="center 28%"
					priority
				/>
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
					<PosterArt
						slug="creator"
						title="CREATOR"
						a={theme.a}
						b={theme.b}
						motif="burst"
						className="h-[130%] w-auto max-w-none blur-[1px]"
					/>
				</div>
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#1c1218_82%)]" />
				
				<div
					className="pointer-events-none absolute inset-0"
					style={{
						background: `radial-gradient(70% 55% at 50% 8%, ${theme.a}26 0%, transparent 60%), radial-gradient(50% 45% at 82% 80%, ${theme.b}1c 0%, transparent 65%)`,
					}}
					aria-hidden
				/>

				<Reveal className="relative z-10">
					<Link
						href="/"
						className="chip mb-8 !text-[10px] hover:border-[#ff8a3d]"
					>
						&larr; Back to home
					</Link>
				</Reveal>

				<p className="relative z-10 text-xs font-bold uppercase tracking-[0.35em]" style={{ color: theme.b }}>
					Spotlight
				</p>

				<Reveal className="relative z-10">
					<h1 className="font-title mt-4 text-6xl font-black uppercase leading-[0.95] md:text-[9vw]">
						CREATOR'S<br/>SPOTLIGHT
					</h1>
				</Reveal>

				<Reveal delay={0.2} className="relative z-10">
					<p
						className="font-mono mt-6 text-sm uppercase tracking-widest opacity-80"
						style={{
							background: `linear-gradient(90deg, ${theme.a}, ${theme.b})`,
							WebkitBackgroundClip: "text",
							backgroundClip: "text",
							color: "transparent",
						}}
					>
						{theme.tagline}
					</p>
				</Reveal>

				<div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 text-foreground/40 z-10">
					<span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
					<span className="block h-8 w-px animate-pulse bg-gradient-to-b from-foreground/60 to-transparent" />
				</div>
			</section>

			{/* MARQUEE */}
			<div
				className="mb-16 -rotate-1 scale-[1.01] relative z-10"
				style={{ background: `linear-gradient(90deg, ${theme.a}, ${theme.b})` }}
			>
				<Marquee duration={18} className="py-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<span key={i} className="font-title mx-6 flex items-center gap-6 text-lg font-black uppercase text-[#0a0612]">
							CREATOR'S SPOTLIGHT <span>&#10022;</span> {theme.tagline} <span>&#10022;</span>
						</span>
					))}
				</Marquee>
			</div>

			<div className="mx-auto max-w-6xl px-6 relative z-10">
				{/* NAV */}
				<nav className="sticky top-24 z-20 mx-auto mb-16 flex w-fit max-w-full justify-center gap-1 overflow-x-auto rounded-full p-1.5 glass">
					{NAV.map((n) => (
						<a
							key={n.id}
							href={`#${n.id}`}
							className="shrink-0 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest text-foreground/60 transition-all duration-300 hover:bg-[#ff8a3d] hover:text-[#0a0612]"
						>
							{n.label}
						</a>
					))}
				</nav>

				{/* OVERVIEW */}
				<section id="overview" className="scroll-mt-32 pb-24">
					<SectionHead id="overview" label="Overview" />
					<div className="grid gap-10 md:grid-cols-[1fr_280px]">
						<Reveal>
							<div className="prose prose-invert prose-lg max-w-none text-foreground/80 prose-headings:font-title prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-secondary prose-p:leading-relaxed [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:text-7xl [&>p:first-of-type]:first-letter:font-black [&>p:first-of-type]:first-letter:leading-[0.8] [&>p:first-of-type]:first-letter:text-[#ff8a3d]">
								<p>
									Creator's Spotlight is the flagship creator initiative of Antaragni '26, IIT Kanpur. Designed to celebrate India's growing creator economy, the program brings together passionate content creators from across the country and empowers them to become the official brand ambassadors of one of Asia's largest cultural festivals.
								</p>
								<h3 className="text-2xl mt-8 mb-4">Beyond the Rewards</h3>
								<ul>
									<li>Get featured on Antaragni IIT Kanpur's official social media platforms.</li>
									<li>Connect and collaborate with leading creators and influencers through Influencers United.</li>
								</ul>
							</div>
						</Reveal>
						<Reveal delay={0.1}>
							<aside className="glass sticky top-44 h-fit rounded-3xl p-6">
								<p className="font-title text-2xl font-black leading-tight" style={{ color: theme.b }}>
									FESTIVAL DATES
								</p>
								<p className="mt-2 font-mono text-sm">29 Oct – 1 Nov 2026</p>

								<p className="font-title text-xl font-black leading-tight mt-6" style={{ color: theme.b }}>
									DEADLINE
								</p>
								<p className="mt-2 font-mono text-sm">26 Sep 2026</p>

								<a
									href="https://docs.google.com/forms/d/e/1FAIpQLSfAJq2OqxqeRSp1svoHVspD-ivCnFkHevt9IztEmcCZaNrg7Q/viewform"
									target="_blank"
									rel="noopener noreferrer"
									className="mt-8 block w-full text-center px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#0a0612] transition-transform hover:scale-105 rounded-full"
									style={{ background: theme.a }}
								>
									Apply Now
								</a>
							</aside>
						</Reveal>
					</div>
				</section>

				{/* THE LOOT (PERKS) */}
				<section id="perks" className="scroll-mt-32 pb-24">
					<SectionHead id="perks" label="The Loot" />
					<Reveal>
						<div className="glass rounded-3xl p-6 md:p-10">
							<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#ff8a3d]/50 transition-colors">
									<span className="text-2xl text-[#ff8a3d]">✦</span>
									<span className="font-bold">Complimentary Pro Night Passes</span>
								</li>
								<li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#ff8a3d]/50 transition-colors">
									<span className="text-2xl text-[#ff8a3d]">✦</span>
									<span className="font-bold">Official Certificate from IIT Kanpur</span>
								</li>
								<li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#ff8a3d]/50 transition-colors">
									<span className="text-2xl text-[#ff8a3d]">✦</span>
									<span className="font-bold">Letter of Recommendation (LOR)</span>
								</li>
								<li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#ff8a3d]/50 transition-colors">
									<span className="text-2xl text-[#ff8a3d]">✦</span>
									<span className="font-bold">Free Accommodation <span className="text-xs text-white/50 block font-mono">(for eligible winners)</span></span>
								</li>
								<li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#ff8a3d]/50 transition-colors">
									<span className="text-2xl text-[#ff8a3d]">✦</span>
									<span className="font-bold">Meet Influencers from all over India</span>
								</li>
								<li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#ff8a3d]/50 transition-colors">
									<span className="text-2xl text-[#ff8a3d]">✦</span>
									<span className="font-bold">Official Antaragini Merchandise</span>
								</li>
								<li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#ff8a3d]/50 transition-colors md:col-span-2">
									<span className="text-2xl text-[#ff8a3d]">✦</span>
									<span className="font-bold">Exclusive Creator Gift Hamper <span className="text-xs text-white/50 block font-mono">(T-shirt, Cap, Lanyard & Stickers)</span></span>
								</li>
							</ul>
						</div>
					</Reveal>
				</section>

				{/* RUBRIC */}
				<section id="rubric" className="scroll-mt-32 pb-24">
					<SectionHead id="rubric" label="Evaluation" />
					<Reveal>
						<div className="glass rounded-3xl p-6 md:p-10 space-y-12">
							<div>
								<div className="flex justify-between font-mono text-sm uppercase text-[#ff8a3d] mb-2 font-bold tracking-wider">
									<span>Audience Engagement</span>
									<span>50%</span>
								</div>
								<div className="w-full h-4 bg-white/10 rounded-r-full overflow-hidden">
									<div className="h-full bg-gradient-to-r from-[#ff3c00] to-[#ff8a3d] w-[50%] shadow-[0_0_15px_rgba(255,138,61,0.5)]"></div>
								</div>
								<p className="text-xs text-white/50 mt-3 font-mono uppercase tracking-widest">Likes 10% &nbsp;•&nbsp; Comments 10% &nbsp;•&nbsp; Shares 20% &nbsp;•&nbsp; Saves 10%</p>
							</div>
							<div>
								<div className="flex justify-between font-mono text-sm uppercase text-white mb-2 font-bold tracking-wider">
									<span>Creativity & Storytelling (Jury)</span>
									<span>30%</span>
								</div>
								<div className="w-full h-4 bg-white/10 rounded-r-full overflow-hidden">
									<div className="h-full bg-white/80 w-[30%]"></div>
								</div>
							</div>
							<div>
								<div className="flex justify-between font-mono text-sm uppercase text-white mb-2 font-bold tracking-wider">
									<span>Originality & Brand Relevance</span>
									<span>20%</span>
								</div>
								<div className="w-full h-4 bg-white/10 rounded-r-full overflow-hidden">
									<div className="h-full bg-white/60 w-[20%]"></div>
								</div>
							</div>
						</div>
					</Reveal>
				</section>
			</div>
		</div>
	);
}
