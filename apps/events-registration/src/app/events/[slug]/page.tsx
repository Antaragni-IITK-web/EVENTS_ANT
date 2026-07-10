"use client";

import { doc, getSingleDoc } from "@repo/firebase";
import { EventDetails } from "./EventDetails";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useStore } from "@repo/store";
import Link from "next/link";
import { eventsData } from "../../../data/events";
import { eventTheme } from "../../../data/themes";
import { Reveal, RevealTitle } from "../../../components/fx/Reveal";
import { Marquee } from "../../../components/fx/Marquee";
import { PosterArt } from "../../../components/fx/PosterArt";
import { FloatingStickers } from "../../../components/fx/Stickers";

const IndividualEventPage = () => {
	const params = useParams<{ slug: string }>();
	const [eventData, setEventData] = useState<doc | null>(null);
	const { setLoading } = useStore();

	const cardInfo = eventsData.find((e) => e.slug === params.slug);
	const theme = eventTheme(params.slug, cardInfo?.category);

	const fetchData = async () => {
		setLoading(true);
		let data;
		if (params.slug === "ritambhara") {
			data = await getSingleDoc("WebContentsNew", `events_ritambhara_New`);
		} else {
			data = await getSingleDoc("WebContentsNew", `events_${params.slug}`);
		}
		if (data) {
			setLoading(false);
		}
		setEventData(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const title = (eventData?.title || cardInfo?.title || params.slug) as string;

	return (
		eventData && (
			<section className="min-h-screen pb-10">
				{/* ------------------------------ HERO ------------------------------ */}
				<div className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden px-4 pt-32 text-center">
					{/* oversized themed motif floating behind the title */}
					<div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
						<PosterArt
							slug={params.slug}
							title={title}
							a={theme.a}
							b={theme.b}
							motif={theme.motif}
							className="h-[130%] w-auto max-w-none blur-[1px]"
						/>
					</div>
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0a0612_78%)]" />
					{/* the event's own stage light */}
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background: `radial-gradient(70% 55% at 50% 8%, ${theme.a}26 0%, transparent 60%), radial-gradient(50% 45% at 82% 80%, ${theme.b}1c 0%, transparent 65%)`,
						}}
						aria-hidden
					/>
					<FloatingStickers
						items={[
							{ name: "star", color: theme.b, left: "12%", top: "26%", size: 52, rot: -10, depth: 0.7 },
							{ name: "bolt", color: theme.a, left: "84%", top: "20%", size: 46, rot: 12, depth: 0.9 },
							{ name: "spiral", color: theme.b, left: "78%", top: "68%", size: 54, rot: 0, depth: 0.5, className: "spin-slow" },
						]}
					/>

					<Reveal className="relative">
						<Link
							href="/events"
							data-cursor-text="BACK"
							className="chip mb-8 !text-[10px] hover:border-[var(--lime)]"
						>
							&larr; All events
						</Link>
					</Reveal>

					<p
						className="relative text-xs font-bold uppercase tracking-[0.35em]"
						style={{ color: theme.b }}
					>
						{(eventData.category as string) || cardInfo?.category}
					</p>

					<RevealTitle
						as="h1"
						text={title}
						className="font-title relative mt-4 text-6xl font-black uppercase leading-[0.95] md:text-[9vw]"
					/>

					<Reveal delay={0.2}>
						<p
							className="font-title relative mt-6 text-xl font-bold md:text-2xl"
							style={{
								background: `linear-gradient(92deg, ${theme.a}, ${theme.b})`,
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								color: "transparent",
							}}
						>
							{theme.tagline}
						</p>
					</Reveal>

					<div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 text-foreground/40">
						<span className="text-[10px] uppercase tracking-[0.4em]">
							Scroll
						</span>
						<span className="block h-8 w-px animate-pulse bg-gradient-to-b from-foreground/60 to-transparent" />
					</div>
				</div>

				{/* gradient marquee divider */}
				<div
					className="mb-16 -rotate-1 scale-[1.01]"
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
								{title}
								<span>&#10022;</span>
								{theme.tagline}
								<span>&#10022;</span>
							</span>
						))}
					</Marquee>
				</div>

				<div className="container mx-auto px-6">
					<EventDetails
						eventData={eventData}
						slug={params.slug}
						theme={theme}
					/>
				</div>
			</section>
		)
	);
};

export default IndividualEventPage;
