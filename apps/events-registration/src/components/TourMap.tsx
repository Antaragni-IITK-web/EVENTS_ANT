"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const INDIA_SVG_PATH =
	"M787.521,227.25L789.44,238.701L780.133,244.208L782.34,262.701L763.247,257.276L728.803,277.917L729.57,294.922L714.891,319.728L713.548,334.053L701.65,358.149L680.83,351.485L679.775,381.603L673.731,391.443L676.609,403.698L663.464,410.517L649.361,364.654L642.069,364.752L637.655,383.269L623.072,368.246L631.323,351.683L643.22,350.003L655.501,325.206L640.15,320.176L615.492,320.575L590.067,316.537L587.764,296.026L575.003,294.521L553.895,281.697L544.493,301.841L563.682,317.485L547.083,328.439L541.135,339.113L557.541,346.986L553.032,364.555L562.243,386.355L566.368,410.079L562.626,420.578L544.493,420.238L511.584,426.157L513.119,447.676L498.919,464.477L460.541,483.561L430.702,516.696L410.65,534.386L384.169,552.675L384.073,565.444L370.833,572.31L346.751,582.265L334.374,583.719L326.314,604.786L331.879,640.614L333.318,663.338L321.997,689.262L321.901,735.433L308.085,736.763L295.996,757.37L304.055,766.286L279.781,773.96L270.858,792.254L260.112,800L234.879,774.828L222.598,736.992L212.332,709.622L203.025,696.777L188.825,670.557L182.205,636.292L177.6,619.115L153.326,581.186L142.292,527.185L134.329,491.21L134.425,456.879L129.244,430.179L90.482,447.242L71.677,443.863L36.945,409.154L49.706,398.722L41.838,387.383L10.56,362.783L28.31,343.274L87.028,343.373L81.655,318.183L66.688,303.193L63.713,280.337L46.252,266.954L75.611,235.485L106.601,237.783L134.425,205.977L151.119,174.941L177.024,143.902L176.64,121.668L199.283,103.481L177.792,87.86L168.581,66.32L159.083,38.229L172.227,24.266L212.62,32.16L242.363,27.339L268.076,0L296.667,38.065L293.981,64.265L304.631,80.609L303.767,96.751L284.578,92.523L292.062,127.177L318.255,146.9L355.29,168.529L338.403,182.483L328.041,211.077L353.851,222.586L378.988,237.374L413.72,254.28L450.275,258.138L465.626,273.374L486.254,276.201L518.3,283.158L540.463,282.654L543.533,270.848L540.079,251.841L542.094,238.854L558.405,232.52L560.612,256.21L561.187,262.245L585.365,273.576L602.156,268.927L624.607,270.899L646.386,270.039L648.305,251.638L637.463,242.017L658.955,238.242L683.133,215.758L713.931,196.373L736.287,203.862L755.284,190.99L767.756,209.944L758.738,222.689Z";

const CITY_COORDS: Record<string, { x: number; y: number; offsetX?: number; offsetY?: number; align?: "left" | "right" }> = {
	Bangalore: { x: 262, y: 649, align: "right" },
	Pune: { x: 160, y: 476, align: "left" },
	Ranchi: { x: 477, y: 329, align: "right" },
	Kolkata: { x: 560, y: 353, align: "right" },
	Chandigarh: { x: 240, y: 101, align: "left", offsetY: -10 },
	Delhi: { x: 253, y: 166, align: "right" },
	Nagpur: { x: 303, y: 396, align: "left" },
};

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

	// Animate the map and points on scroll
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

		// Pop in the cities
		tl.fromTo(
			".city-marker",
			{ scale: 0, opacity: 0, transformOrigin: "center center" },
			{ scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)" },
			"-=1"
		);

		// Slide in labels
		tl.fromTo(
			".city-label",
			{ x: -10, opacity: 0 },
			{ x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
			"-=0.8"
		);
	}, { scope: containerRef });

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

					{/* Cities */}
					{schedule.map((item, idx) => {
						// match city ignoring case
						const key = Object.keys(CITY_COORDS).find(
							(k) => k.toLowerCase() === item.city.toLowerCase()
						);
						if (!key) return null;
						const coords = CITY_COORDS[key];

						return (
							<g
								key={idx}
								transform={`translate(${coords.x + (coords.offsetX || 0)}, ${
									coords.y + (coords.offsetY || 0)
								})`}
								className="city-marker-group"
							>
								{/* Connection lines to next city (optional, currently independent dots) */}

								{/* Pulse ring */}
								<circle
									r="12"
									fill={theme.a}
									opacity="0.2"
									className="animate-ping"
								/>

								{/* Core Pin */}
								<circle
									r="6"
									fill={theme.b}
									stroke="#0a0612"
									strokeWidth="2"
									className="city-marker"
								/>

								{/* Label Container */}
								<foreignObject
									x={coords.align === "left" ? -220 : 15}
									y="-20"
									width="200"
									height="60"
									className="city-label overflow-visible"
								>
									<div
										className={`flex flex-col ${
											coords.align === "left" ? "items-end" : "items-start"
										}`}
									>
										<span
											className="font-title text-xl font-black uppercase leading-none drop-shadow-md"
											style={{ color: "white" }}
										>
											{item.city}
										</span>
										<span
											className="tape mt-1 inline-block !text-[9px] -rotate-1 shadow-sm"
											style={{ background: theme.a, color: "#0a0612" }}
										>
											{item.date}
										</span>
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
