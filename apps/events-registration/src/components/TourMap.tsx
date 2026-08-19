"use client";

import React, { useRef, useId, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const INDIA_SVG_PATH =
	"M787.521,227.25L789.44,238.701L780.133,244.208L782.34,262.701L763.247,257.276L728.803,277.917L729.57,294.922L714.891,319.728L713.548,334.053L701.65,358.149L680.83,351.485L679.775,381.603L673.731,391.443L676.609,403.698L663.464,410.517L649.361,364.654L642.069,364.752L637.655,383.269L623.072,368.246L631.323,351.683L643.22,350.003L655.501,325.206L640.15,320.176L615.492,320.575L590.067,316.537L587.764,296.026L575.003,294.521L553.895,281.697L544.493,301.841L563.682,317.485L547.083,328.439L541.135,339.113L557.541,346.986L553.032,364.555L562.243,386.355L566.368,410.079L562.626,420.578L544.493,420.238L511.584,426.157L513.119,447.676L498.919,464.477L460.541,483.561L430.702,516.696L410.65,534.386L384.169,552.675L384.073,565.444L370.833,572.31L346.751,582.265L334.374,583.719L326.314,604.786L331.879,640.614L333.318,663.338L321.997,689.262L321.901,735.433L308.085,736.763L295.996,757.37L304.055,766.286L279.781,773.96L270.858,792.254L260.112,800L234.879,774.828L222.598,736.992L212.332,709.622L203.025,696.777L188.825,670.557L182.205,636.292L177.6,619.115L153.326,581.186L142.292,527.185L134.329,491.21L134.425,456.879L129.244,430.179L90.482,447.242L71.677,443.863L36.945,409.154L49.706,398.722L41.838,387.383L10.56,362.783L28.31,343.274L87.028,343.373L81.655,318.183L66.688,303.193L63.713,280.337L46.252,266.954L75.611,235.485L106.601,237.783L134.425,205.977L151.119,174.941L177.024,143.902L176.64,121.668L199.283,103.481L177.792,87.86L168.581,66.32L159.083,38.229L172.227,24.266L212.62,32.16L242.363,27.339L268.076,0L296.667,38.065L293.981,64.265L304.631,80.609L303.767,96.751L284.578,92.523L292.062,127.177L318.255,146.9L355.29,168.529L338.403,182.483L328.041,211.077L353.851,222.586L378.988,237.374L413.72,254.28L450.275,258.138L465.626,273.374L486.254,276.201L518.3,283.158L540.463,282.654L543.533,270.848L540.079,251.841L542.094,238.854L558.405,232.52L560.612,256.21L561.187,262.245L585.365,273.576L602.156,268.927L624.607,270.899L646.386,270.039L648.305,251.638L637.463,242.017L658.955,238.242L683.133,215.758L713.931,196.373L736.287,203.862L755.284,190.99L767.756,209.944L758.738,222.689Z";

/* The seven original pins turned out to sit on a plain equirectangular
   projection (x = 27.633*lon - 1882.5, y = -30.829*lat + 1041.4, fits all seven
   to within 1.1px), so the rest of the tour cities are placed on that same
   transform rather than guessed by eye. */
const CITY_COORDS: Record<string, { x: number; y: number; offsetX?: number; offsetY?: number; align?: "left" | "right" }> = {
	Bangalore: { x: 262, y: 649, align: "right" },
	Pune: { x: 160, y: 476, align: "left" },
	Ranchi: { x: 477, y: 329, align: "right" },
	Kolkata: { x: 560, y: 353, align: "right" },
	Chandigarh: { x: 240, y: 101, align: "left", offsetY: -10 },
	Delhi: { x: 253, y: 166, align: "right" },
	Nagpur: { x: 303, y: 396, align: "left" },
	Mumbai: { x: 132, y: 460, align: "left" },
	Hyderabad: { x: 287, y: 512, align: "right" },
	Chennai: { x: 336, y: 645, align: "right" },
	Ahmedabad: { x: 124, y: 338, align: "left" },
	Jaipur: { x: 213, y: 218, align: "left" },
	Lucknow: { x: 356, y: 221, align: "right" },
	Indore: { x: 215, y: 348, align: "left" },
	Goa: { x: 167, y: 576, align: "left" },
	Bhubaneswar: { x: 490, y: 423, align: "right" },
	Shillong: { x: 658, y: 261, align: "right" },
	/* Gurugram is 6px from Delhi - nudge it down so the two labels clear */
	Gurugram: { x: 247, y: 171, align: "left", offsetY: 26 },
	Kathmandu: { x: 477, y: 194, align: "right" },
	Karachi: { x: -30, y: 281, align: "right" },
	Lahore: { x: 174, y: 76, align: "right" },
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
	const maskId = `tour-road-reveal-${useId().replace(/:/g, "")}`;

	/* which city is showing its date */
	const [hovered, setHovered] = useState<string | null>(null);

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
	}, { scope: containerRef, dependencies: [routeD] });

	return (
		<div
			ref={containerRef}
			className="relative w-full max-w-4xl mx-auto py-12 px-4 flex justify-center items-center overflow-visible"
		>
			<div className="relative w-full aspect-square md:aspect-[4/3] max-w-[800px]">
				<svg
					viewBox="-50 0 900 850"
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

						{/* wipes the dashed road on along the route */}
						{routeD && (
							<mask
								id={maskId}
								maskUnits="userSpaceOnUse"
								x="-50"
								y="0"
								width="900"
								height="850"
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
					</defs>
					<rect width="100%" height="100%" fill="url(#grid)" />

					{/* Map Outline */}
					<path
						ref={mapRef}
						d={INDIA_SVG_PATH}
						fill="transparent"
						stroke="currentColor"
						strokeWidth="4"
						className="text-white/20"
						vectorEffect="non-scaling-stroke"
					/>

					{/* Filled background for map */}
					<path
						d={INDIA_SVG_PATH}
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
								style={{ cursor: "pointer" }}
							>
								{/* generous invisible hit area around the pin */}
								<circle r="20" fill="transparent" pointerEvents="all" />

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
									fill={theme.b}
									stroke="#0a0612"
									strokeWidth="2"
									className="city-marker"
									pointerEvents="none"
								/>

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
