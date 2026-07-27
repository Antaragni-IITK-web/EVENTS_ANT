"use client";

import { useEffect, useState } from "react";
import { useStore } from "@repo/store";

/* ----------------------------------------------------------------------------
   FestivalLoader — the opening curtain.
   The Antaragni brush mark draws itself in a single stroke (like a hand
   painting it), embers glow behind it, the wordmark stamps in, then the
   whole screen wipes upward like a stage curtain. Same contract as the
   shared Loader: waits for page load + minimum time, then releases
   `initialAnimation` in the store.
---------------------------------------------------------------------------- */

/* the Antaragni mark, traced as one continuous brush stroke */
const MARK_PATH =
	"M 62 5 C 56 21, 40 52, 24 84 C 18 96, 13 106, 9 117 C 33 126, 62 124, 85 116 C 89 114, 91 112, 90 109 C 81 93, 69 71, 58 48 C 55 42, 52 37, 50 32";

export default function FestivalLoader() {
	const [status, setStatus] = useState<"loading" | "leaving" | "finished">(
		"loading"
	);
	const { setInitialAnimation } = useStore();

	useEffect(() => {
		const pageLoad = new Promise<void>((resolve) => {
			if (document.readyState === "complete") resolve();
			else window.addEventListener("load", () => resolve(), { once: true });
		});
		const minTime = new Promise<void>((r) => setTimeout(r, 2000));
		Promise.all([pageLoad, minTime]).then(() => setStatus("leaving"));
	}, []);

	useEffect(() => {
		if (status === "leaving") {
			const t = setTimeout(() => setStatus("finished"), 850);
			return () => clearTimeout(t);
		}
	}, [status]);

	useEffect(() => {
		if (status === "finished") setInitialAnimation(false);
	}, [status, setInitialAnimation]);

	if (status === "finished") return null;

	return (
		<div
			className={`fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
				status === "leaving" ? "-translate-y-full" : ""
			}`}
			style={{ background: "#1a1114" }}
			aria-hidden
		>
			{/* ember atmosphere behind the mark */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"radial-gradient(50% 42% at 50% 46%, rgba(255,107,53,0.16) 0%, transparent 65%), radial-gradient(90% 60% at 50% 100%, rgba(217,38,67,0.1) 0%, transparent 60%)",
				}}
			/>
			<div className="halftone pointer-events-none absolute inset-0 opacity-20" />

			{/* the mark, drawing itself */}
			<div
				className={`loader-mark relative transition-transform duration-500 ${
					status === "leaving" ? "scale-110" : ""
				}`}
			>
				<svg
					width="130"
					height="164"
					viewBox="0 0 100 130"
					fill="none"
					className="overflow-visible"
				>
					{/* faint ember echo behind the stroke */}
					<path
						d={MARK_PATH}
						stroke="rgba(255,138,61,0.25)"
						strokeWidth="16"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="loader-stroke"
						pathLength={1}
					/>
					<path
						d={MARK_PATH}
						stroke="#b32024"
						strokeWidth="11"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="loader-stroke"
						pathLength={1}
					/>
				</svg>
			</div>

			{/* wordmark stamps in after the stroke */}
			<p className="loader-word font-title mt-6 text-2xl font-black tracking-tight text-[#f7f0e4]">
				ANTARAGNI<span style={{ color: "var(--gold)" }}>&rsquo;26</span>
			</p>
			<p className="loader-sub mt-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#f7f0e4]/45">
				The rebirth of culture
			</p>

			{/* ember progress line */}
			<div className="absolute bottom-14 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
				<div className="loader-bar h-full w-full origin-left rounded-full" />
			</div>
		</div>
	);
}
