"use client";

import { useEffect, useState, useRef } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@repo/store";
import { doc, getSingleDoc } from "@repo/firebase";
import { roadtrips } from "../../../data/roadtrips";
import { tripTheme } from "../../../data/themes";
import roadtripDetails from "./roadtripDetails.json";
import { Section } from "@repo/ui/section";
import { FaPhone, FaEnvelope, FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Comickaun_registration from "../../../components/Comickaun_registration";
import Junoon_registration from "../../../components/Junoon_registration";
import Djwar_registration from "../../../components/Djwar_registration";
import Bugrap_registration from "../../../components/Bug-rap_registration";
import Bugbeatboxing_registration from "../../../components/Bug-beatboxing_registration";
import Synchro_registration from "../../../components/Synchro_registration";
import { Marquee } from "../../../components/fx/Marquee";
import { RevealTitle } from "../../../components/fx/Reveal";
import { PosterArt } from "../../../components/fx/PosterArt";
import { FloatingStickers } from "../../../components/fx/Stickers";
import { TiltCard } from "../../../components/fx/TiltCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* numbered, theme-gradient section shell with scroll reveal */
const PageSection = ({
	n,
	title,
	a,
	b,
	tag,
	children,
}: {
	n: string;
	title: string;
	a: string;
	b: string;
	tag: string;
	children: React.ReactNode;
}) => {
	const sectionRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!sectionRef.current) return;
			gsap.from(sectionRef.current.children, {
				opacity: 0,
				y: 50,
				stagger: 0.1,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 85%",
				},
			});
		},
		{ scope: sectionRef }
	);

	return (
		<section ref={sectionRef} className="relative py-16">
			{/* per-battle stage light */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background: `radial-gradient(60% 50% at 50% 0%, ${a}14 0%, transparent 60%)`,
				}}
				aria-hidden
			/>
			<span
				className="tape relative mb-4 inline-block -rotate-1"
				style={{ background: b, color: "#0a0612" }}
			>
				{n} / {tag}
			</span>
			<h2
				className="font-poster relative mb-12 w-fit text-5xl uppercase leading-none md:text-7xl"
				style={{
					background: `linear-gradient(92deg, ${a}, ${b})`,
					WebkitBackgroundClip: "text",
					backgroundClip: "text",
					color: "transparent",
				}}
			>
				{title}
			</h2>
			{children}
		</section>
	);
};

export default function RoadtripDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
	const router = useRouter();
    const { slug } = React.use(params);
	const { setLoading } = useStore();

	const [eventData, setEventData] = useState<doc | null>(null);

	const cardInfo = roadtrips.find(
		(r) => r.slug.toLowerCase() === slug.toLowerCase()
	);
	const detailInfo = roadtripDetails.find(
		(r) => r.slug.toLowerCase() === slug.toLowerCase()
	);

	const isSplitPage = slug.toLowerCase() === "battleunderground";
	const theme = tripTheme(slug, cardInfo?.category);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const data = await getSingleDoc(
					"WebContentsNew",
					`new_${slug.toLowerCase()}`
				);
				setEventData(data);
			} catch (error) {
				console.error("Failed to fetch roadtrip data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [slug, setLoading]);

	const details = eventData?.data as any[] | undefined;
	const contactInfo = details
		?.filter((d) => d.flag?.content === "contact")
		.map((c) => ({
			name: c.name.content,
			number: c.number.content,
			insta: c.insta?.content,
			email: c.email?.content,
			image: c.image.content.url,
		}));
	const sponsorsInfo = details
		?.filter((d) => d.flag?.content === "sponsor")
		.map((s) => ({ name: s.name.content, img: s.image.content.url }));
	const scheduleInfo = details
		?.filter((d) => d.flag?.content === "schedule")
		.map((s) => ({
			city: s.city.content,
			date: s.date.content,
			img: s.image.content.url,
		}));
	const partnersInfo = details
		?.filter((d) => d.flag?.content === "partners")
		.map((p) => ({ name: p.name.content, role: p.role.content }));

	const renderRegistrationForm = () => {
		switch (slug.toLowerCase()) {
			case "comickaun":
				return <Comickaun_registration />;
			case "junoon":
				return <Junoon_registration />;
			case "djwar":
				return <Djwar_registration />;
			case "bug-rap":
				return <Bugrap_registration />;
			case "bug-beatboxing":
				return <Bugbeatboxing_registration />;
			case "synchro":
				return <Synchro_registration />;
			default:
				return null;
		}
	};

	if (isSplitPage) {
		const beatbox = tripTheme("bug-beatboxing");
		const rap = tripTheme("bug-rap");
		const forks = [
			{ slug: "bug-beatboxing", label: "Beatboxing", theme: beatbox, kicker: "No instruments. No mercy." },
			{ slug: "bug-rap", label: "Rap Battle", theme: rap, kicker: "Bars over everything." },
		];
		return (
			<Section className="relative flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden pb-16 pt-32 text-center">
				<div
					className="pointer-events-none absolute inset-0"
					style={{
						background:
							"radial-gradient(60% 50% at 50% 0%, rgba(255,138,61,0.22) 0%, transparent 60%), radial-gradient(50% 50% at 50% 100%, rgba(225,29,72,0.18) 0%, transparent 65%)",
					}}
					aria-hidden
				/>
				<FloatingStickers
					items={[
						{ name: "flame", color: "var(--orange)", left: "14%", top: "24%", size: 58, rot: -12, depth: 0.8 },
						{ name: "bolt", color: "var(--pink)", left: "82%", top: "20%", size: 50, rot: 14, depth: 0.9 },
					]}
				/>

				<div className="relative">
					<span className="tape mb-5 inline-block -rotate-2">
						Battle Underground &middot; Pick your arena
					</span>
					<RevealTitle
						as="h1"
						text={cardInfo?.title ?? "Battle Underground"}
						className="font-poster text-6xl uppercase leading-[0.85] md:text-9xl"
					/>
					<p className="mx-auto mt-5 max-w-2xl text-lg text-foreground/70">
						Two underground battles, one stage. Choose your weapon.
					</p>
				</div>

				<div className="relative mt-4 flex flex-col gap-10 md:!flex-row">
					{forks.map((f, i) => (
						<div
							key={f.slug}
							onClick={() => router.push(`/roadtrips/${f.slug}`)}
							data-cursor-text="ENTER"
							className="group cursor-pointer"
							style={{ transform: `rotate(${i ? 2 : -2}deg)` }}
						>
							<TiltCard className="h-[420px] w-72" max={11}>
								<div className="relative h-full w-full overflow-hidden border-2 border-white/15 shadow-[10px_10px_0_rgba(0,0,0,0.55)] transition-shadow duration-300 group-hover:shadow-[14px_14px_0_rgba(0,0,0,0.65)]">
									<PosterArt
										slug={f.slug}
										title={f.label}
										a={f.theme.a}
										b={f.theme.b}
										motif={f.theme.motif}
										index={i}
										className="absolute inset-0 h-full w-full"
									/>
								</div>
							</TiltCard>
							<p className="mt-4 text-sm font-bold uppercase tracking-widest text-foreground/60 transition-colors duration-300 group-hover:text-[var(--lime)]">
								{f.kicker}
							</p>
						</div>
					))}
				</div>
			</Section>
		);
	}

	const heroTitle = detailInfo?.title ?? cardInfo?.title ?? slug;

	return (
		<div className="">
			{/* ------------------------------ HERO ------------------------------
			     a campaign world: the tour poster tilts beside massive type */}
			<section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 md:px-12">
				{/* the battle's own lighting */}
				<div
					className="pointer-events-none absolute inset-0"
					style={{
						background: `radial-gradient(70% 60% at 20% 15%, ${theme.a}2e 0%, transparent 55%), radial-gradient(60% 55% at 90% 85%, ${theme.b}24 0%, transparent 60%)`,
					}}
					aria-hidden
				/>
				{/* repeated backdrop word */}
				<div
					className="backdrop-word font-poster pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 text-[22vw] uppercase opacity-90"
					aria-hidden
				>
					{heroTitle}
				</div>
				<FloatingStickers
					items={[
						{ name: "flame", color: theme.a, left: "8%", top: "22%", size: 56, rot: -12, depth: 0.7 },
						{ name: "bolt", color: theme.b, left: "46%", top: "16%", size: 46, rot: 10, depth: 0.9 },
						{ name: "star", color: theme.a, left: "40%", top: "78%", size: 50, rot: 8, depth: 0.5 },
					]}
				/>

				<div className="relative grid w-full max-w-7xl items-center gap-10 md:mx-auto md:grid-cols-[1.2fr_1fr]">
					<div>
						<span className="tape mb-5 inline-block -rotate-2" style={{ background: theme.a }}>
							{cardInfo?.category ?? "Roadtrip"} &middot; On tour
						</span>
						<RevealTitle
							as="h1"
							text={heroTitle}
							className="font-poster text-[15vw] uppercase leading-[0.82] md:text-[9rem]"
						/>
						<p
							className="font-poster mt-5 text-2xl uppercase md:text-4xl"
							style={{
								background: `linear-gradient(92deg, ${theme.a}, ${theme.b})`,
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								color: "transparent",
							}}
						>
							{theme.tagline}
						</p>
						<p className="mt-6 text-xs font-bold uppercase tracking-[0.4em] text-foreground/45">
							Antaragni &rsquo;26 &middot; The national tour
						</p>
					</div>

					{/* the collectible tour poster, tilting */}
					<div className="hidden md:block">
						<TiltCard className="mx-auto w-full max-w-xs" max={10}>
							<div className="relative aspect-[3/4] overflow-hidden border-2 border-white/15 shadow-[12px_12px_0_rgba(0,0,0,0.55)]">
								<PosterArt
									slug={slug.toLowerCase()}
									title={heroTitle}
									a={theme.a}
									b={theme.b}
									motif={theme.motif}
									className="absolute inset-0 h-full w-full"
								/>
							</div>
						</TiltCard>
					</div>
				</div>

				<div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground/40">
					<span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
					<span className="block h-10 w-px animate-pulse bg-gradient-to-b from-foreground/60 to-transparent" />
				</div>
			</section>

			{/* gradient marquee divider */}
			<div
				className="-rotate-1 scale-[1.01]"
				style={{
					background: `linear-gradient(90deg, ${theme.a}, ${theme.b})`,
				}}
			>
				<Marquee duration={18} className="py-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<span
							key={i}
							className="font-title mx-6 flex items-center gap-6 text-lg font-black uppercase text-[#0a0612]"
						>
							{heroTitle}
							<span>&#10022;</span>
							{theme.tagline}
							<span>&#10022;</span>
						</span>
					))}
				</Marquee>
			</div>

			<div className="bg-background text-foreground py-10">
				<div className="container mx-auto px-4 max-w-6xl">
					{/* ----------------------------- ABOUT ----------------------------- */}
					<PageSection
						n="01"
						title="The Battle"
						a={theme.a}
						b={theme.b}
						tag={theme.tag}
					>
						<div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
							<p className="text-lg leading-relaxed text-foreground/75 md:text-xl [&:first-letter]:float-left [&:first-letter]:mr-3 [&:first-letter]:text-7xl [&:first-letter]:font-black [&:first-letter]:leading-[0.8] [&:first-letter]:text-[var(--lime)]">
								{detailInfo?.aboutUs.title ?? "Details Coming Soon"}
							</p>
							<div className="mx-auto h-80 w-60 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 -rotate-2">
								<PosterArt
									slug={`${slug.toLowerCase()}-about`}
									title={heroTitle}
									a={theme.a}
									b={theme.b}
									motif={theme.motif}
									className="h-full w-full"
								/>
							</div>
						</div>
					</PageSection>

					{/* --------------------------- TOUR DATES --------------------------- */}
					{scheduleInfo && scheduleInfo.length > 0 && (
						<PageSection
							n="02"
							title="Tour Dates"
							a={theme.a}
							b={theme.b}
							tag={theme.tag}
						>
							<div className="border-t border-white/10">
								{scheduleInfo.map((item, idx) => (
									<div
										key={idx}
										className="group flex items-center gap-5 border-b border-white/10 px-2 py-5 transition-colors duration-300 hover:bg-white/5 md:gap-8 md:px-6"
									>
										<span
											className="font-title w-14 shrink-0 text-sm font-bold md:text-base"
											style={{ color: theme.b }}
										>
											{String(idx + 1).padStart(2, "0")}
										</span>
										<h3 className="font-title min-w-0 flex-1 truncate text-3xl font-black uppercase leading-none text-foreground/85 md:text-5xl">
											{item.city}
										</h3>
										<span className="chip shrink-0 !text-[10px]" style={{ color: theme.a }}>
											{item.date}
										</span>
										{item.img && (
											<span className="hidden h-16 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10 md:block">
												{/* CMS-served city poster */}
												<img
													src={item.img}
													alt={item.city}
													className="h-full w-full object-cover"
												/>
											</span>
										)}
									</div>
								))}
							</div>
						</PageSection>
					)}

					{renderRegistrationForm() && (
						<section className="relative py-16">
							<div
								className="pointer-events-none absolute inset-0"
								style={{
									background: `radial-gradient(60% 60% at 50% 30%, ${theme.a}1f 0%, transparent 65%)`,
								}}
								aria-hidden
							/>
							<div className="relative text-center">
								<span
									className="tape relative mb-4 inline-block rotate-1"
									style={{ background: theme.b, color: "#0a0612" }}
								>
									Registration &middot; {theme.tag}
								</span>
								<h2
									className="font-poster mx-auto w-fit text-5xl uppercase leading-none md:text-7xl"
									style={{
										background: `linear-gradient(92deg, ${theme.a}, ${theme.b})`,
										WebkitBackgroundClip: "text",
										backgroundClip: "text",
										color: "transparent",
									}}
								>
									Enter the Arena
								</h2>
								<p className="mx-auto mt-3 max-w-md text-sm text-foreground/60">
									Lock your spot on the bill. Fill your details, claim your
									slot, and we&rsquo;ll see you in the pit.
								</p>
							</div>
							<div className="relative mt-10">{renderRegistrationForm()}</div>
						</section>
					)}

					{/* ---------------------------- SPONSORS ---------------------------- */}
					{sponsorsInfo && sponsorsInfo.length > 0 && (
						<PageSection
							n="03"
							title="Sponsors"
							a={theme.a}
							b={theme.b}
							tag={theme.tag}
						>
							<div className="flex flex-wrap justify-center gap-8">
								{sponsorsInfo.map((sponsor, idx) => (
									<div
										key={idx}
										className="glass glow-card w-64 rounded-3xl p-6 text-center"
									>
										<div className="mx-auto mb-4 flex h-52 items-center overflow-hidden rounded-xl">
											<img
												src={sponsor.img}
												alt={sponsor.name}
												width={170}
												height={213}
												className="h-fit w-full object-contain"
											/>
										</div>
										<h3 className="font-title text-2xl font-bold text-secondary">
											{sponsor.name}
										</h3>
									</div>
								))}
							</div>
						</PageSection>
					)}

					{/* ---------------------------- PARTNERS ---------------------------- */}
					{partnersInfo && partnersInfo.length > 0 && (
						<PageSection
							n="04"
							title="Partners"
							a={theme.a}
							b={theme.b}
							tag={theme.tag}
						>
							<div className="flex flex-wrap justify-center gap-8">
								{partnersInfo.map((item, idx) => (
									<div
										key={idx}
										className="glass glow-card w-64 rounded-3xl p-6 text-center"
									>
										<h3 className="font-title text-2xl font-bold text-secondary">
											{item.name}
										</h3>
										<p className="mt-1 text-foreground/70">{item.role}</p>
									</div>
								))}
							</div>
						</PageSection>
					)}

					{/* ---------------------------- CONTACTS ---------------------------- */}
					{contactInfo && contactInfo.length > 0 && (
						<PageSection
							n="05"
							title="Contact Us"
							a={theme.a}
							b={theme.b}
							tag={theme.tag}
						>
							<div className="flex flex-wrap justify-center gap-8">
								{contactInfo.map((contact, idx) => (
									<div
										key={idx}
										className="glass glow-card flex w-72 flex-col items-center rounded-3xl p-6 text-center"
									>
										<div
											className="mb-4 h-36 w-36 overflow-hidden rounded-full border-2"
											style={{ borderColor: theme.b }}
										>
											<img
												src={contact.image}
												alt={contact.name}
												width={150}
												height={150}
												className="h-full w-full object-cover"
											/>
										</div>
										<h3 className="font-title text-2xl text-secondary">
											{contact.name}
										</h3>
										<div className="mt-4 space-y-2 text-sm text-foreground/70">
											<a
												href={`tel:${contact.number}`}
												className="flex items-center justify-center gap-2 hover:text-primary"
											>
												<FaPhone />
												<span>{contact.number}</span>
											</a>
											{contact.email && (
												<a
													href={`mailto:${contact.email}`}
													className="flex items-center justify-center gap-2 hover:text-primary"
												>
													<FaEnvelope />
													<span>{contact.email}</span>
												</a>
											)}
											{contact.insta && (
												<a
													href={contact.insta}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center justify-center gap-2 hover:text-primary"
												>
													<FaInstagram />
													<span>Instagram</span>
												</a>
											)}
										</div>
									</div>
								))}
							</div>
						</PageSection>
					)}
				</div>
			</div>
		</div>
	);
}
