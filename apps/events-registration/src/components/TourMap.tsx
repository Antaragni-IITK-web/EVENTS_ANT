"use client";

import React, { useRef, useId, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RoadtripScheduleItem } from "../data/roadtripsData2026";

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
	Ludhiana: { x: 315, y: 240, align: "left" },
	Delhi: { x: 344, y: 320, align: "right" },
	Agra: { x: 360, y: 345, align: "right" },
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
	ahemdabad: "Ahmedabad",
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

export type ScheduleItem = RoadtripScheduleItem;

interface TourMapProps {
	schedule: ScheduleItem[];
	theme: { a: string; b: string; tag: string };
}

export function TourMap({ schedule, theme }: TourMapProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const tiltRef = useRef<HTMLDivElement>(null);
	const zoomGroupRef = useRef<SVGGElement>(null);
	const mapRef = useRef<SVGPathElement>(null);

	/* which city is showing its date */
	const [hovered, setHovered] = useState<string | null>(null);

	/* the runner is SMIL, which CSS media queries cannot switch off */
	const [reduceMotion, setReduceMotion] = useState(false);
	useEffect(() => {
		setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	}, []);

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

	useGSAP(() => {
		if (!containerRef.current) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top 75%",
			},
		});

		// Animate the map outline (neon draw)
		tl.fromTo(
			mapRef.current,
			{ strokeDasharray: 4000, strokeDashoffset: 4000, opacity: 0 },
			{ strokeDashoffset: 0, opacity: 0.8, duration: 2.5, ease: "power2.inOut" }
		);

		// Animate the gritty map fill fading in
		tl.fromTo(
			".map-fill",
			{ opacity: 0 },
			{ opacity: 1, duration: 2, ease: "power2.out" },
			"-=1.5"
		);

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
	}, { scope: containerRef, dependencies: [reduceMotion] });

	// Interactive zooming effect on hover/click without clipping
	useGSAP(() => {
		if (!zoomGroupRef.current) return;
		if (hovered) {
			const [key] = hovered.split("-");
			const stop = stops.find((s) => s.key === key);
			if (stop) {
				const { x, y, offsetX = 0, offsetY = 0 } = stop.coords;
				const targetX = x + offsetX;
				const targetY = y + offsetY;
				
				// SVG viewBox is "-150 -150 1050 1150". 
				// Center of viewBox: Cx = 375, Cy = 425
				const cx = 375;
				const cy = 425;
				const scale = 1.6;
				
				// Move the target coordinates to the center of the viewport
				const dx = cx - targetX * scale;
				const dy = cy - targetY * scale;

				gsap.to(zoomGroupRef.current, {
					x: dx,
					y: dy,
					scale: scale,
					transformOrigin: "0 0",
					duration: 0.8,
					ease: "power3.inOut",
				});
			}
		} else {
			// Reset to original view
			gsap.to(zoomGroupRef.current, {
				x: 0,
				y: 0,
				scale: 1,
				duration: 0.8,
				ease: "power3.inOut",
			});
		}
	}, { scope: containerRef, dependencies: [hovered, stops] });

	return (
		<div
			ref={containerRef}
			className="relative w-full max-w-4xl mx-auto py-12 px-4 flex justify-center items-center overflow-visible"
		>
			<div
				ref={tiltRef}
				className="relative w-full aspect-[1/1.1] max-w-[800px] -mt-8 md:-mt-16"
			>
				<svg
					viewBox="-150 -150 1050 1150"
					className="w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-visible"
					preserveAspectRatio="xMidYMid meet"
				>
					<g ref={zoomGroupRef} className="will-change-transform">
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
					</defs>

					<rect width="1200" height="1200" x="-150" y="-150" fill="url(#grid)" />

					{/* Filled background for map */}
					<g className="map-fill" opacity="0">
						<use
							href="/in.svg#features"
							fill="currentColor"
							className="text-white/5"
						/>
						<use
							href="/in.svg#features"
							fill={theme.b}
							opacity="0.08"
							style={{ mixBlendMode: "color-dodge" }}
						/>
					</g>

					{/* Map Outline */}
					<use
						ref={mapRef as any}
						href="/in.svg#features"
						fill="transparent"
						stroke={theme.a}
						strokeWidth="2"
						opacity="0"
						style={{ filter: `drop-shadow(0 0 8px ${theme.a})` }}
						vectorEffect="non-scaling-stroke"
					/>

					{/* Cities */}
					{[...stops].sort((a, b) => {
						const idA = `${a.key}-${a.idx}`;
						const idB = `${b.key}-${b.idx}`;
						if (hovered === idA) return 1;
						if (hovered === idB) return -1;
						return 0;
					}).map((stop) => {
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
									{/* Crosshair Target Ring */}
									<circle
										r="14"
										fill="none"
										stroke="#fff"
										strokeWidth="1.5"
										strokeDasharray="4 4"
										className="city-marker animate-[spin_6s_linear_infinite]"
										opacity={open ? 1 : 0.6}
										pointerEvents="none"
									/>
									<line x1="-18" y1="0" x2="-8" y2="0" stroke="#fff" strokeWidth="1" className="city-marker" />
									<line x1="8" y1="0" x2="18" y2="0" stroke="#fff" strokeWidth="1" className="city-marker" />
									<line x1="0" y1="-18" x2="0" y2="-8" stroke="#fff" strokeWidth="1" className="city-marker" />
									<line x1="0" y1="8" x2="0" y2="18" stroke="#fff" strokeWidth="1" className="city-marker" />

									{/* Core Pin */}
									<circle
										r="4"
										fill={open ? theme.b : "#fff"}
										className="city-marker"
										pointerEvents="none"
										style={{ filter: `drop-shadow(0 0 4px #fff)` }}
									/>
								</g>

								{/* Label Container - expanded into a rich data panel on hover */}
								<foreignObject
									x="-200"
									y="-200"
									width="400"
									height="400"
									className="city-label overflow-visible pointer-events-none"
								>
									<div className="relative w-[400px] h-[400px] pointer-events-none">
										<div
											className={`absolute flex flex-col pointer-events-auto transition-all duration-300 w-[240px] md:w-[280px]
												/* Mobile: centered above pin (using inset + mx-auto to avoid WebKit transform bugs) */
												bottom-[215px] left-0 right-0 mx-auto items-center text-center
												/* Desktop: left or right */
												${coords.align === "left" 
													? "md:bottom-auto md:top-[185px] md:right-[220px] md:left-auto md:mx-0 md:items-end md:text-right" 
													: "md:bottom-auto md:top-[185px] md:left-[220px] md:right-auto md:mx-0 md:items-start md:text-left"}
											`}
										>
											{!open ? (
												<span className="font-title text-[28px] md:text-xl font-black uppercase leading-none drop-shadow-md text-white">
													{item.city}
												</span>
											) : (
												<div className="bg-[#0a0612]/95 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center gap-3 w-full text-center">
													<span className="text-sm font-bold px-3 py-1.5 rounded bg-white/5 border border-white/10 whitespace-nowrap" style={{ color: theme.a }}>
														{item.date}
													</span>
													{item.venuePost ? (
														<a
															href={item.venuePost}
															target="_blank"
															rel="noreferrer"
															className="w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 transition-colors py-2.5 rounded text-[11px] font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2"
														>
															<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
																<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
															</svg>
															View on Instagram
														</a>
													) : (
														<p className="text-[11px] text-white/50 italic text-center py-2">Details coming soon...</p>
													)}
												</div>
											)}
										</div>
									</div>
								</foreignObject>
							</g>
						);
					})}
					</g>
				</svg>
			</div>
		</div>
	);
}
