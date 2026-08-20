"use client";

import React, { useRef, useId, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

/* The cities are placed according to the in.svg state centers */
const CITY_COORDS: Record<string, { x: number; y: number; offsetX?: number; offsetY?: number; align?: "left" | "right" }> = {
	Bangalore: { x: 302, y: 728, align: "right" },
	Pune: { x: 280, y: 610, align: "left" },
	Ranchi: { x: 564, y: 476, align: "right" },
	Kolkata: { x: 637, y: 486, align: "right" },
	Chandigarh: { x: 335, y: 255, align: "left", offsetY: -10 },
	Delhi: { x: 344, y: 320, align: "right" },
	Nagpur: { x: 380, y: 560, align: "left" },
	Mumbai: { x: 260, y: 597, align: "left" },
	Hyderabad: { x: 397, y: 642, align: "right" },
	Chennai: { x: 380, y: 836, align: "right" },
	Ahmedabad: { x: 199, y: 481, align: "left" },
	Jaipur: { x: 257, y: 376, align: "left" },
	Lucknow: { x: 439, y: 376, align: "right" },
	Bhubaneswar: { x: 550, y: 559, align: "right" },
	Indore: { x: 340, y: 494, align: "left" },
	Goa: { x: 262, y: 714, align: "left" },
	Shillong: { x: 737, y: 418, align: "right" },
	Gurugram: { x: 339, y: 325, align: "left", offsetY: 26 },
	Kathmandu: { x: 540, y: 280, align: "right" },
	Karachi: { x: 40, y: 420, align: "right" },
	Lahore: { x: 280, y: 230, align: "right" },
};

/* schedules are hand-typed in the CMS, so normalise before matching */
const CITY_ALIASES: Record<string, string> = {
	banglore: "Bangalore",
	bengaluru: "Bangalore",
	bombay: "Mumbai",
	calcutta: "Kolkata",
	madras: "Chennai",
	gurgaon: "Gurugram",
	newdelhi: "Delhi",
};

function resolveCity(raw: string) {
	/* drop parentheticals like "Kathmandu(NEPAL)" and any punctuation/spacing */
	const cleaned = raw.replace(/\(.*?\)/g, "").trim();
	const flat = cleaned.toLowerCase().replace(/[^a-z]/g, "");
	if (!flat) return null;

	const alias = CITY_ALIASES[flat];
	const target = alias ?? cleaned;
	const key = Object.keys(CITY_COORDS).find(
		(k) => k.toLowerCase().replace(/[^a-z]/g, "") === target.toLowerCase().replace(/[^a-z]/g, "")
	);
	return key ? { key, coords: CITY_COORDS[key]! } : null;
}

const MONTHS = [
	"january", "february", "march", "april", "may", "june",
	"july", "august", "september", "october", "november", "december",
];

/* The CMS dates are free text - "18/08/23", "10th September, 4:00 PM",
   "3 August, 2024", "1 October", "TBA", "Coming Soon...". Return a sortable
   key, or null when there is no date to sort on. */
export function parseTourDate(raw: string): number | null {
	if (!raw) return null;
	const s = raw.trim().toLowerCase();
	if (!s || /^(tba|to be announced|coming soon)/.test(s)) return null;

	/* dd/mm/yy or dd/mm/yyyy */
	const slash = s.match(/(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{2,4})/);
	if (slash) {
		const day = Number(slash[1]);
		const month = Number(slash[2]);
		let year = Number(slash[3]);
		if (year < 100) year += 2000;
		if (month >= 1 && month <= 12) return year * 10000 + month * 100 + day;
	}

	/* "10 August", "10th September, 4:00 PM", "3 August, 2024" */
	const dayFirst = s.match(/(\d{1,2})\s*(?:st|nd|rd|th)?\s*,?\s*([a-z]+)/);
	if (dayFirst) {
		const month = MONTHS.indexOf(dayFirst[2]!);
		if (month >= 0) {
			const year = s.match(/\b(20\d{2})\b/);
			return (year ? Number(year[1]) : 2026) * 10000 + (month + 1) * 100 + Number(dayFirst[1]);
		}
	}

	/* "August 10" */
	const monthFirst = s.match(/([a-z]+)\s+(\d{1,2})/);
	if (monthFirst) {
		const month = MONTHS.indexOf(monthFirst[1]!);
		if (month >= 0) {
			const year = s.match(/\b(20\d{2})\b/);
			return (year ? Number(year[1]) : 2026) * 10000 + (month + 1) * 100 + Number(monthFirst[2]);
		}
	}

	return null;
}

/* one gently curved leg per hop, so the route reads as a road rather than a
   zig-zag of straight rules */
function buildRoute(points: { x: number; y: number }[]) {
	if (points.length < 2) return "";
	let d = `M ${points[0]!.x} ${points[0]!.y}`;
	for (let i = 1; i < points.length; i++) {
		const from = points[i - 1]!;
		const to = points[i]!;
		const dx = to.x - from.x;
		const dy = to.y - from.y;
		const len = Math.hypot(dx, dy) || 1;
		/* control point pushed perpendicular to the leg, always the same side */
		const bow = Math.min(len * 0.14, 60);
		const cx = (from.x + to.x) / 2 + (-dy / len) * bow;
		const cy = (from.y + to.y) / 2 + (dx / len) * bow;
		d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${to.x} ${to.y}`;
	}
	return d;
}

export type ScheduleItem = {
	city: string;
	date: string;
	img?: string;
};

interface TourMapProps {
	schedule: ScheduleItem[];
	theme: { a: string; b: string; tag: string };
}

export function TourMap({ schedule, theme }: TourMapProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<SVGPathElement>(null);
	const revealRef = useRef<SVGPathElement>(null);
	const runnerRef = useRef<SVGGElement>(null);
	const tiltRef = useRef<HTMLDivElement>(null);
	const uid = useId().replace(/:/g, "");
	const maskId = `tour-road-reveal-${uid}`;
	const routeId = `tour-road-path-${uid}`;

	/* which city is showing its date */
	const [hovered, setHovered] = useState<string | null>(null);

	/* the runner is SMIL, which CSS media queries cannot switch off */
	const [reduceMotion, setReduceMotion] = useState(false);
	useEffect(() => {
		setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	}, []);

	/* the map leans away from the cursor, same idiom as TiltCard */
	const onTilt = (e: React.MouseEvent) => {
		const el = tiltRef.current;
		const outer = containerRef.current;
		if (!el || !outer) return;
		if (window.matchMedia("(pointer: coarse)").matches) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const rect = outer.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width - 0.5;
		const py = (e.clientY - rect.top) / rect.height - 0.5;
		gsap.to(el, {
			rotateY: px * 9,
			rotateX: -py * 9,
			duration: 0.6,
			ease: "power2.out",
			transformPerspective: 1200,
		});
	};

	const onTiltLeave = () => {
		if (!tiltRef.current) return;
		gsap.to(tiltRef.current, {
			rotateY: 0,
			rotateX: 0,
			duration: 1,
			ease: "elastic.out(1, 0.5)",
		});
	};

	/* plottable stops, ordered by date; undated stops keep their CMS order and
	   fall to the back of the tour */
	const stops = (schedule ?? [])
		.map((item, idx) => {
			const hit = resolveCity(item.city);
			if (!hit) return null;
			return { item, idx, key: hit.key, coords: hit.coords, when: parseTourDate(item.date) };
		})
		.filter((s): s is NonNullable<typeof s> => s !== null)
		.sort((a, b) => {
			if (a.when !== null && b.when !== null) return a.when - b.when || a.idx - b.idx;
			if (a.when !== null) return -1;
			if (b.when !== null) return 1;
			return a.idx - b.idx;
		});

	const routeD = buildRoute(
		stops.map((s) => ({
			x: s.coords.x + (s.coords.offsetX || 0),
			y: s.coords.y + (s.coords.offsetY || 0),
		}))
	);

	useGSAP(() => {
		if (!containerRef.current) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top 75%",
			},
		});

		// Animate the map outline
		tl.fromTo(
			mapRef.current,
			{ strokeDasharray: 4000, strokeDashoffset: 4000, opacity: 0 },
			{ strokeDashoffset: 0, opacity: 1, duration: 2, ease: "power2.inOut" }
		);

		/* Lay the road down city by city. The visible road is dashed, so the
		   reveal rides on a solid stroke used as its mask - animating the dash
		   offset of the road itself would just slide the dashes along. */
		if (revealRef.current && routeD) {
			const len = revealRef.current.getTotalLength();
			tl.fromTo(
				revealRef.current,
				{ strokeDasharray: len, strokeDashoffset: len },
				{ strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" },
				"-=1.1"
			);
		}

		// Pop in the cities, in tour order, riding just behind the road
		tl.fromTo(
			".city-marker",
			{ scale: 0, opacity: 0, transformOrigin: "center center" },
			{ scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)" },
			"-=1.4"
		);

		// Slide in labels
		tl.fromTo(
			".city-label",
			{ x: -10, opacity: 0 },
			{ x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
			"-=1.2"
		);

		// Send the runner out once there is a road for it to drive on
		if (runnerRef.current) {
			tl.to(runnerRef.current, { opacity: 1, duration: 0.6 }, "-=0.6");
		}
	}, { scope: containerRef, dependencies: [routeD, reduceMotion] });

	return (
		<div
			ref={containerRef}
			className="relative w-full max-w-4xl mx-auto py-12 px-4 flex justify-center items-center overflow-visible"
			onMouseMove={onTilt}
			onMouseLeave={onTiltLeave}
		>
			<div
				ref={tiltRef}
				className="relative w-full aspect-[1/1.1] max-w-[800px] will-change-transform -mt-8 md:-mt-16"
			>
				<svg
					viewBox="-150 -150 1050 1150"
					className="w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
					preserveAspectRatio="xMidYMid meet"
				>
					{/* Grid background for brutalist vibe */}
					<defs>
						<pattern
							id="grid"
							width="40"
							height="40"
							patternUnits="userSpaceOnUse"
						>
							<path
								d="M 40 0 L 0 0 0 40"
								fill="none"
								stroke="currentColor"
								strokeWidth="0.5"
								className="text-white/5"
							/>
						</pattern>

						{/* Mask to reveal the path via scroll */}
						{routeD && (
							<mask
								id={maskId}
								maskUnits="userSpaceOnUse"
								x="-150"
								y="-150"
								width="1200"
								height="1200"
							>
								<path
									ref={revealRef}
									d={routeD}
									fill="none"
									stroke="white"
									strokeWidth="18"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</mask>
						)}

						{/* the route, referenced by the runner's animateMotion */}
						{routeD && <path id={routeId} d={routeD} />}
					</defs>

					<rect width="1200" height="1200" x="-150" y="-150" fill="url(#grid)" />

					{/* Map Outline */}
					<use
						ref={mapRef as any}
						href="/in.svg#features"
						fill="transparent"
						stroke="currentColor"
						strokeWidth="4"
						className="text-white/20"
						vectorEffect="non-scaling-stroke"
					/>

					{/* Filled background for map */}
					<use
						href="/in.svg#features"
						fill="currentColor"
						className="text-white/5 mix-blend-screen"
					/>

					{/* The tour road: every stop joined in date order */}
					{routeD && (
						<g mask={`url(#${maskId})`}>
							{/* soft under-glow so the road reads over the map fill */}
							<path
								d={routeD}
								fill="none"
								stroke={theme.a}
								strokeWidth="7"
								strokeLinecap="round"
								opacity="0.18"
							/>
							<path
								d={routeD}
								fill="none"
								stroke={theme.a}
								strokeWidth="3"
								strokeDasharray="12 14"
								strokeLinecap="round"
								className="tour-road"
							/>
						</g>
					)}

					{/* the tour itself, running the route on a loop */}
					{routeD && stops.length > 1 && !reduceMotion && (
						<g ref={runnerRef} opacity="0" pointerEvents="none">
							<circle r="11" fill={theme.a} opacity="0.22" />
							<circle
								r="4.5"
								fill="#fff6e5"
								style={{ filter: `drop-shadow(0 0 6px ${theme.a})` }}
							/>
							<animateMotion
								dur={`${Math.max(9, stops.length * 1.7)}s`}
								repeatCount="indefinite"
								rotate="auto"
							>
								<mpath href={`#${routeId}`} />
							</animateMotion>
						</g>
					)}

					{/* Cities */}
					{stops.map((stop) => {
						const { item, coords } = stop;
						const id = `${stop.key}-${stop.idx}`;
						const open = hovered === id;

						return (
							<g
								key={id}
								transform={`translate(${coords.x + (coords.offsetX || 0)}, ${
									coords.y + (coords.offsetY || 0)
								})`}
								className="city-marker-group"
								onMouseEnter={() => setHovered(id)}
								onMouseLeave={() => setHovered((h) => (h === id ? null : h))}
								/* touch devices have no hover - tap toggles the date */
								onClick={() => setHovered((h) => (h === id ? null : id))}
								style={{
									cursor: "pointer",
									/* everything else steps back while one city is held */
									opacity: hovered && !open ? 0.4 : 1,
									transition: "opacity 220ms ease",
								}}
							>
								{/* generous invisible hit area around the pin */}
								<circle r="20" fill="transparent" pointerEvents="all" />

								{/* scales about the city centre - the parent <g> is already
								    translated there, and SVG transform-origin is 0 0 */}
								<g
									style={{
										transform: open ? "scale(1.5)" : "scale(1)",
										transition: "transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1)",
									}}
								>
									{/* Pulse ring */}
									<circle
										r="12"
										fill={theme.a}
										opacity="0.2"
										className="animate-ping"
										pointerEvents="none"
									/>

									{/* Core Pin */}
									<circle
										r="6"
										fill={open ? theme.a : theme.b}
										stroke="#0a0612"
										strokeWidth="2"
										className="city-marker"
										pointerEvents="none"
									/>
								</g>

								{/* Label Container - the name is always up, the date drops
								    down out of it on hover */}
								<foreignObject
									x={coords.align === "left" ? -220 : 15}
									y="-20"
									width="200"
									height="60"
									className="city-label overflow-visible"
								>
									<div
										className={`pointer-events-none flex ${
											coords.align === "left" ? "justify-end" : "justify-start"
										}`}
									>
										<div
											className={`pointer-events-auto flex w-fit flex-col ${
												coords.align === "left" ? "items-end" : "items-start"
											}`}
										>
											<span
												className="font-title text-xl font-black uppercase leading-none drop-shadow-md"
												style={{ color: "white" }}
											>
												{item.city}
											</span>
											{/* kept mounted so the name never shifts when it opens */}
											<span
												className={`tape mt-1 inline-block !text-[9px] -rotate-1 shadow-sm transition-all duration-200 ease-out ${
													open
														? "translate-y-0 opacity-100"
														: "pointer-events-none -translate-y-1 opacity-0"
												}`}
												style={{ background: theme.a, color: "#0a0612" }}
												aria-hidden={!open}
											>
												{item.date}
											</span>
										</div>
									</div>
								</foreignObject>
							</g>
						);
					})}
				</svg>
			</div>
		</div>
	);
}
