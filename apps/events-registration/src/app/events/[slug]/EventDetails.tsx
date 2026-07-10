"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { doc } from "@repo/firebase";
import { Guidelines } from "../../../components/Guidelines";
import { Competitions } from "../../../components/Competitions";
import { Contacts } from "../../../components/Contacts";
import { Reveal } from "../../../components/fx/Reveal";
import type { VisualTheme } from "../../../data/themes";

interface inter {
	content: string;
	type: string;
}

interface Competition {
	name: string;
	desc: string;
}

interface EventData {
	Id: string;
	desc: inter;
	flag: inter;
	title: inter;
}

/* ----------------------------------------------------------------------------
   EventDetails — editorial scroll layout (replaces the old tab box).
   One continuous page: Overview → Competitions → Guidelines → Contacts,
   with a sticky anchor nav. Firestore parsing is untouched.
---------------------------------------------------------------------------- */

export function EventDetails({
	eventData,
	slug,
	theme,
}: {
	eventData: doc;
	slug: string;
	theme: VisualTheme;
}) {
	const [openCompetition, setOpenCompetition] = useState<string | null>(null);

	const details = eventData.data as EventData[];

	const overview = details
		.map((detail) => {
			if (detail.flag.content === "overview") {
				return detail.desc.content;
			}
		})
		.join("\n");

	const title = details
		.map((detail) => {
			if (detail.flag.content === "heading") {
				return detail.title.content;
			}
		})
		.join("\n");

	const competitions: Competition[] = [];
	details.forEach((detail) => {
		if (detail.flag.content === "comp") {
			competitions.push({
				name: detail.title.content,
				desc: detail.desc.content,
			});
		}
	});

	const contacts = details
		.map((detail) => {
			if (detail.flag.content === "contacts") {
				return detail.desc.content;
			}
		})
		.join("\n");

	const showComps = slug !== "MnM";

	const jumpToCompetition = (competitionName: string) => {
		setOpenCompetition(competitionName);
		document
			.getElementById("competitions")
			?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	const NAV = [
		{ id: "overview", label: "Overview" },
		...(showComps ? [{ id: "competitions", label: "Competitions" }] : []),
		{ id: "guidelines", label: "Guidelines" },
		{ id: "contacts", label: "Contacts" },
	];

	const SectionHead = ({ id, label }: { id: string; label: string }) => (
		<Reveal>
			<span
				className="tape mb-4 inline-block -rotate-1"
				style={{ background: theme.b, color: "#0a0612" }}
			>
				{String(NAV.findIndex((n) => n.id === id) + 1).padStart(2, "0")} /{" "}
				{theme.tag}
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
		<div className="mx-auto max-w-6xl">
			{/* sticky in-page nav */}
			<nav className="sticky top-24 z-20 mx-auto mb-16 flex w-fit max-w-full justify-center gap-1 overflow-x-auto rounded-full p-1.5 glass">
				{NAV.map((n) => (
					<a
						key={n.id}
						href={`#${n.id}`}
						className="shrink-0 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest text-foreground/60 transition-all duration-300 hover:bg-[var(--lime)] hover:text-[#0a0612]"
					>
						{n.label}
					</a>
				))}
			</nav>

			{/* ----------------------------- OVERVIEW ---------------------------- */}
			<section id="overview" className="scroll-mt-32 pb-24">
				<SectionHead id="overview" label={title || "Overview"} />

				<div className="grid gap-10 md:grid-cols-[1fr_280px]">
					<Reveal>
						<div
							className="prose prose-invert prose-lg max-w-none text-foreground/80 prose-headings:font-title prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-secondary prose-p:leading-relaxed [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:text-7xl [&>p:first-of-type]:first-letter:font-black [&>p:first-of-type]:first-letter:leading-[0.8] [&>p:first-of-type]:first-letter:text-[var(--lime)]"
						>
							<ReactMarkdown>{overview}</ReactMarkdown>
						</div>
					</Reveal>

					{/* side rail */}
					<Reveal delay={0.1}>
						<aside className="glass sticky top-44 h-fit rounded-3xl p-6">
							<p
								className="font-title text-2xl font-black leading-tight"
								style={{ color: theme.b }}
							>
								{theme.tagline}
							</p>
							{showComps && competitions.length > 0 && (
								<>
									<p className="mb-3 mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">
										On the bill
									</p>
									<ul className="flex flex-col gap-2">
										{competitions.map((comp) => (
											<li key={comp.name}>
												<button
													onClick={() => jumpToCompetition(comp.name)}
													data-cursor-text="GO"
													className="text-left text-sm font-bold text-foreground/75 transition-colors hover:text-[var(--lime)]"
												>
													&#10022; {comp.name}
												</button>
											</li>
										))}
									</ul>
								</>
							)}
						</aside>
					</Reveal>
				</div>
			</section>

			{/* --------------------------- COMPETITIONS -------------------------- */}
			{showComps && (
				<section id="competitions" className="scroll-mt-32 pb-24">
					<SectionHead id="competitions" label="Competitions" />
					<Competitions
						competitions={competitions}
						openCompetition={openCompetition}
						setOpenCompetition={setOpenCompetition}
					/>
				</section>
			)}

			{/* ---------------------------- GUIDELINES --------------------------- */}
			<section id="guidelines" className="scroll-mt-32 pb-24">
				<SectionHead id="guidelines" label="Guidelines" />
				<Guidelines />
			</section>

			{/* ----------------------------- CONTACTS ---------------------------- */}
			<section id="contacts" className="scroll-mt-32 pb-10">
				<SectionHead id="contacts" label="Contacts" />
				<Contacts contacts={contacts} />
			</section>
		</div>
	);
}
