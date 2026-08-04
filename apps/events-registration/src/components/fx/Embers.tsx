"use client";

import { useEffect, useRef } from "react";

/* ----------------------------------------------------------------------------
   Embers — sparks rising from the fire. Tiny glowing particles drift upward
   with a lazy sway, flickering between gold, ember and crimson. Replaces the
   sticker field on the landing hero. Pauses when hidden; static dots under
   reduced motion.
---------------------------------------------------------------------------- */

const COLORS = ["255,201,77", "255,138,61", "255,95,60", "217,38,67"];

export function Embers({ count = 60 }: { count?: number }) {
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
		type E = {
			x: number; y: number; r: number; vy: number; sway: number;
			ph: number; c: string; tw: number;
		};
		let embers: E[] = [];

		const spawn = (atBottom: boolean): E => ({
			x: Math.random() * w,
			y: atBottom ? h + 6 : Math.random() * h,
			r: 0.8 + Math.random() * 2.1,
			vy: 0.25 + Math.random() * 0.6,
			sway: 8 + Math.random() * 22,
			ph: Math.random() * Math.PI * 2,
			c: COLORS[(Math.random() * COLORS.length) | 0]!,
			tw: 0.5 + Math.random() * 0.5,
		});

		const build = () => {
			w = canvas.width = canvas.clientWidth;
			h = canvas.height = canvas.clientHeight;
			embers = Array.from({ length: count }, () => spawn(false));
		};

		const draw = (now: number) => {
			raf = requestAnimationFrame(draw);
			if (document.hidden) return;
			ctx.clearRect(0, 0, w, h);
			for (let i = 0; i < embers.length; i++) {
				const e = embers[i]!;
				e.y -= e.vy;
				const x = e.x + Math.sin(now * 0.0006 + e.ph) * e.sway;
				if (e.y < -8) embers[i] = spawn(true);
				const flicker =
					e.tw * (0.55 + 0.45 * Math.sin(now * 0.004 + e.ph * 3));
				/* soft glow core */
				const g = ctx.createRadialGradient(x, e.y, 0, x, e.y, e.r * 4);
				g.addColorStop(0, `rgba(${e.c},${(0.9 * flicker).toFixed(2)})`);
				g.addColorStop(1, `rgba(${e.c},0)`);
				ctx.fillStyle = g;
				ctx.beginPath();
				ctx.arc(x, e.y, e.r * 4, 0, Math.PI * 2);
				ctx.fill();
			}
		};

		build();
		if (reduced) {
			/* one static frame */
			for (const e of embers) {
				ctx.fillStyle = `rgba(${e.c},0.5)`;
				ctx.beginPath();
				ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
				ctx.fill();
			}
		} else {
			raf = requestAnimationFrame(draw);
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
	}, [count]);

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none absolute inset-0 h-full w-full"
			aria-hidden
		/>
	);
}
