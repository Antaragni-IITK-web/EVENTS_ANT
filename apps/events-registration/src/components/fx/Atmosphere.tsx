"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* ----------------------------------------------------------------------------
   Atmosphere — the night-festival environment behind everything.
   Layer 1: deep gradient base (midnight violet / navy / magenta — no pure black)
   Layer 2: drifting glow blobs (stage wash) with cursor parallax
   Layer 3: light beams sweeping like distant stage rigs
   Layer 4: floating dust / haze particles (canvas)
---------------------------------------------------------------------------- */

const BLOBS = [
	{ x: "12%", y: "8%", size: 560, from: "rgba(130,72,240,0.3)", depth: 0.5, dur: 34 },
	{ x: "70%", y: "16%", size: 480, from: "rgba(255,110,199,0.17)", depth: 0.9, dur: 42 },
	{ x: "48%", y: "68%", size: 660, from: "rgba(52,30,88,0.5)", depth: 0.3, dur: 38 },
	{ x: "86%", y: "70%", size: 440, from: "rgba(255,138,61,0.1)", depth: 1.1, dur: 30 },
	{ x: "4%", y: "62%", size: 400, from: "rgba(239,71,111,0.13)", depth: 0.7, dur: 46 },
	{ x: "60%", y: "94%", size: 520, from: "rgba(86,214,240,0.08)", depth: 0.6, dur: 40 },
];

function Dust() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		let raf = 0;
		let w = 0;
		let h = 0;
		type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; tw: number };
		let parts: P[] = [];

		const build = () => {
			w = canvas.width = canvas.clientWidth;
			h = canvas.height = canvas.clientHeight;
			const count = Math.min(56, Math.floor((w * h) / 34000));
			parts = Array.from({ length: count }, () => ({
				x: Math.random() * w,
				y: Math.random() * h,
				r: 0.6 + Math.random() * 1.8,
				vy: -(0.08 + Math.random() * 0.22),
				vx: (Math.random() - 0.5) * 0.12,
				a: 0.08 + Math.random() * 0.3,
				tw: Math.random() * Math.PI * 2,
			}));
		};

		const draw = (now: number) => {
			raf = requestAnimationFrame(draw);
			if (document.hidden) return;
			ctx.clearRect(0, 0, w, h);
			for (const p of parts) {
				p.y += p.vy;
				p.x += p.vx;
				if (p.y < -4) {
					p.y = h + 4;
					p.x = Math.random() * w;
				}
				if (p.x < -4) p.x = w + 4;
				if (p.x > w + 4) p.x = -4;
				const tw = 0.65 + 0.35 * Math.sin(now * 0.0012 + p.tw);
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(244,241,250,${(p.a * tw).toFixed(3)})`;
				ctx.fill();
			}
		};

		build();
		if (!reduced) raf = requestAnimationFrame(draw);
		else {
			/* one static frame of haze */
			for (const p of parts) {
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(244,241,250,${p.a})`;
				ctx.fill();
			}
		}

		let t: ReturnType<typeof setTimeout>;
		const onResize = () => {
			clearTimeout(t);
			t = setTimeout(build, 150);
		};
		window.addEventListener("resize", onResize);
		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(t);
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}

export function Atmosphere() {
	const wrapRef = useRef<HTMLDivElement>(null);

	/* cursor parallax on the glow blobs */
	useEffect(() => {
		const wrap = wrapRef.current;
		if (!wrap) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (window.matchMedia("(pointer: coarse)").matches) return;

		const nodes = Array.from(wrap.querySelectorAll<HTMLElement>("[data-depth]"));
		const movers = nodes.map((n) => ({
			depth: parseFloat(n.dataset.depth || "0.5"),
			x: gsap.quickTo(n, "x", { duration: 1.4, ease: "power2.out" }),
			y: gsap.quickTo(n, "y", { duration: 1.4, ease: "power2.out" }),
		}));
		const onMove = (e: PointerEvent) => {
			const nx = e.clientX / window.innerWidth - 0.5;
			const ny = e.clientY / window.innerHeight - 0.5;
			for (const m of movers) {
				m.x(nx * 60 * m.depth);
				m.y(ny * 40 * m.depth);
			}
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, []);

	return (
		<div ref={wrapRef} className="absolute inset-0 overflow-hidden" aria-hidden>
			{/* Layer 1 — deep atmospheric base, rich printed-poster dark */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(125% 95% at 50% -5%, #2a1a42 0%, #201436 34%, #191024 68%, #140d1e 100%)",
				}}
			/>
			{/* warm floor glow — festival-hall light pooling at the bottom */}
			<div
				className="absolute inset-x-0 bottom-0 h-1/2"
				style={{
					background:
						"radial-gradient(80% 100% at 50% 100%, rgba(255,138,61,0.06), transparent 70%)",
				}}
			/>

			{/* Layer 2 — drifting stage-wash glows */}
			{BLOBS.map((b, i) => (
				<div key={i} data-depth={b.depth} className="absolute" style={{ left: b.x, top: b.y }}>
					<div
						className="atmo-blob rounded-full"
						style={{
							width: b.size,
							height: b.size,
							marginLeft: -b.size / 2,
							marginTop: -b.size / 2,
							background: `radial-gradient(circle, ${b.from} 0%, transparent 65%)`,
							animationDuration: `${b.dur}s`,
							animationDelay: `${i * -7}s`,
						}}
					/>
				</div>
			))}

			{/* Layer 3 — distant stage-light beams */}
			<div
				className="atmo-beam absolute -top-1/4 left-[18%] h-[150%] w-40 origin-top"
				style={{
					background:
						"linear-gradient(180deg, rgba(124,58,237,0.14), transparent 70%)",
					animationDuration: "17s",
				}}
			/>
			<div
				className="atmo-beam absolute -top-1/4 right-[22%] h-[150%] w-56 origin-top"
				style={{
					background:
						"linear-gradient(180deg, rgba(255,110,199,0.1), transparent 72%)",
					animationDuration: "23s",
					animationDelay: "-8s",
				}}
			/>

			{/* Layer 4 — floating dust / concert haze */}
			<Dust />
		</div>
	);
}
