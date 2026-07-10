"use client";

import { useEffect, useRef } from "react";

/* ----------------------------------------------------------------------------
   CharGrid — the site-wide live background.
   A faint dot-matrix of characters covers the page. Characters near the
   cursor heat up (brighten + shift through the brand ramp) and cool back
   down, leaving a soft trail. Two slow autonomous drifters keep the field
   alive when the mouse is idle. Deliberately quiet: base glyphs sit at
   ~6% alpha so foreground text always wins.
---------------------------------------------------------------------------- */

const CELL = 24; // px per grid cell
const DECAY = 0.965; // heat retained per frame (higher = longer trail)
const BASE_ALPHA = 0.06;

/* heat 0→1 maps violet → pink → lime */
function heatColor(t: number, alpha: number): string {
	let r: number, g: number, b: number;
	if (t < 0.5) {
		const k = t * 2;
		r = 124 + (255 - 124) * k;
		g = 58 + (110 - 58) * k;
		b = 237 + (199 - 237) * k;
	} else {
		const k = (t - 0.5) * 2;
		r = 255 + (199 - 255) * k;
		g = 110 + (244 - 110) * k;
		b = 199 + (65 - 199) * k;
	}
	return `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
}

function pickChar(r: number): string {
	if (r < 0.7) return "·"; // ·
	if (r < 0.9) return "+";
	return "✦"; // ✦
}

export function CharGrid() {
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
		let cols = 0;
		let rows = 0;
		let chars: string[] = [];
		let heat: Float32Array = new Float32Array(0);
		let base: HTMLCanvasElement | null = null;
		let dpr = 1;

		function build() {
			const c = canvas!;
			dpr = Math.min(window.devicePixelRatio || 1, 1.5);
			c.width = Math.floor(c.clientWidth * dpr);
			c.height = Math.floor(c.clientHeight * dpr);
			cols = Math.ceil(c.clientWidth / CELL) + 1;
			rows = Math.ceil(c.clientHeight / CELL) + 1;
			chars = Array.from({ length: cols * rows }, () =>
				pickChar(Math.random())
			);
			heat = new Float32Array(cols * rows);

			/* prerender the resting grid once — per-frame cost is one drawImage */
			base = document.createElement("canvas");
			base.width = c.width;
			base.height = c.height;
			const bctx = base.getContext("2d")!;
			bctx.scale(dpr, dpr);
			bctx.font = `13px ui-monospace, monospace`;
			bctx.textAlign = "center";
			bctx.textBaseline = "middle";
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const jitter = 0.5 + Math.random() * 0.9;
					bctx.fillStyle = `rgba(244,241,250,${BASE_ALPHA * jitter})`;
					bctx.fillText(
						chars[y * cols + x]!,
						x * CELL + CELL / 2,
						y * CELL + CELL / 2
					);
				}
			}
		}

		/* stamp a gaussian blob of heat around a grid point */
		function stamp(px: number, py: number, intensity: number, radius: number) {
			const gx = px / CELL;
			const gy = py / CELL;
			const r = Math.ceil(radius);
			for (let y = Math.max(0, Math.floor(gy - r)); y <= Math.min(rows - 1, Math.ceil(gy + r)); y++) {
				for (let x = Math.max(0, Math.floor(gx - r)); x <= Math.min(cols - 1, Math.ceil(gx + r)); x++) {
					const dx = x - gx;
					const dy = y - gy;
					const d2 = (dx * dx + dy * dy) / (radius * radius);
					if (d2 < 1) {
						const i = y * cols + x;
						const v = intensity * Math.exp(-d2 * 3);
						if (v > heat[i]!) heat[i] = Math.min(1, v);
					}
				}
			}
		}

		const onMove = (e: PointerEvent) => {
			stamp(e.clientX, e.clientY, 1, 3.2);
		};

		/* autonomous drifters — keep the field breathing when idle */
		const drifters = [
			{ t: Math.random() * 100, speed: 0.00016, ry: 0.3 },
			{ t: Math.random() * 100, speed: 0.00011, ry: 0.7 },
		];

		function tick(now: number) {
			raf = requestAnimationFrame(tick);
			if (document.hidden || !ctx || !base) return;

			for (const d of drifters) {
				d.t += 1;
				const x =
					(0.5 + 0.42 * Math.sin(now * d.speed + d.t * 0.001)) *
					canvas!.clientWidth;
				const y =
					(d.ry + 0.22 * Math.sin(now * d.speed * 1.7 + d.t * 0.0013)) *
					canvas!.clientHeight;
				stamp(x, y, 0.34, 2.2);
			}

			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, canvas!.width, canvas!.height);
			ctx.drawImage(base, 0, 0);

			/* draw only hot cells */
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.font = `13px ui-monospace, monospace`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			for (let i = 0; i < heat.length; i++) {
				const h = heat[i]!;
				if (h < 0.03) {
					heat[i] = 0;
					continue;
				}
				heat[i] = h * DECAY;
				const x = (i % cols) * CELL + CELL / 2;
				const y = Math.floor(i / cols) * CELL + CELL / 2;
				ctx.fillStyle = heatColor(h, Math.min(0.85, h * 1.1));
				ctx.fillText(h > 0.55 ? "✦" : chars[i]!, x, y);
			}
		}

		build();
		/* paint the resting grid immediately — no blank first frame,
		   and hidden tabs still show the texture */
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.drawImage(base!, 0, 0);

		if (!reduced) {
			window.addEventListener("pointermove", onMove, { passive: true });
			raf = requestAnimationFrame(tick);
		}

		let resizeT: ReturnType<typeof setTimeout>;
		const onResize = () => {
			clearTimeout(resizeT);
			resizeT = setTimeout(() => {
				build();
				if (reduced && ctx && base) {
					ctx.setTransform(1, 0, 0, 1, 0, 0);
					ctx.drawImage(base, 0, 0);
				}
			}, 150);
		};
		window.addEventListener("resize", onResize);

		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(resizeT);
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="block h-full w-full"
			aria-hidden
		/>
	);
}
