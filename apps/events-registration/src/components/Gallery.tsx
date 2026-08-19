"use client";

import { useCallback, useEffect, useState } from "react";
import { driveImage } from "../data/gallery";
import { Reveal } from "./fx/Reveal";
import type { VisualTheme } from "../data/themes";

/* ----------------------------------------------------------------------------
   Gallery - a wall of taped-up prints from past editions, with a lightbox.

   NOTE: images are served straight off Google Drive's CDN (public folder
   1o61w-HkX8lFSEnE41WDKwh0beRoUk1DU). That is fine while the shoot is being
   sorted, but before launch these should be pulled into /public - Drive is
   rate-limited, uncached by our host, and breaks the moment the folder's
   sharing changes.
---------------------------------------------------------------------------- */

const GRID_WIDTH = 800;
const FULL_WIDTH = 1600;

export function Gallery({
	photos,
	theme,
	title,
}: {
	photos: string[];
	theme: VisualTheme;
	title: string;
}) {
	const [open, setOpen] = useState<number | null>(null);

	/* the CMS title arrives as a join of every entry, so it carries the blank
	   lines of all the non-heading rows */
	const label = title.trim().replace(/\s+/g, " ") || "Gallery";

	const close = useCallback(() => setOpen(null), []);
	const step = useCallback(
		(dir: number) =>
			setOpen((i) => (i === null ? null : (i + dir + photos.length) % photos.length)),
		[photos.length]
	);

	useEffect(() => {
		if (open === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
			if (e.key === "ArrowRight") step(1);
			if (e.key === "ArrowLeft") step(-1);
		};
		window.addEventListener("keydown", onKey);
		/* the lightbox owns the screen while it is up */
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [open, close, step]);

	if (!photos.length) return null;

	return (
		<>
			{/* the print wall */}
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
				{photos.map((id, i) => (
					<Reveal key={id} delay={Math.min(i * 0.05, 0.4)}>
						<button
							type="button"
							onClick={() => setOpen(i)}
							data-cursor-text="VIEW"
							aria-label={`Open photo ${i + 1} of ${photos.length}`}
							className="group block w-full overflow-hidden border-2 border-white/15 shadow-[6px_6px_0_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[9px_9px_0_rgba(0,0,0,0.6)]"
							style={{ transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}
						>
							<div className="relative aspect-[4/3] overflow-hidden bg-white/5">
								<img
									src={driveImage(id, GRID_WIDTH)}
									alt={`${label} photo ${i + 1}`}
									loading="lazy"
									decoding="async"
									referrerPolicy="no-referrer"
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								{/* keep the wall on one grade, like the rest of the site */}
								<div
									className="pointer-events-none absolute inset-0 opacity-45 mix-blend-color transition-opacity duration-500 group-hover:opacity-0"
									style={{
										background: `linear-gradient(150deg, ${theme.a}, ${theme.b})`,
									}}
								/>
							</div>
						</button>
					</Reveal>
				))}
			</div>

			{/* lightbox */}
			{open !== null && (
				<div
					className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0a0612]/95 p-4 backdrop-blur-sm md:p-10"
					onClick={close}
					role="dialog"
					aria-modal="true"
					aria-label={`${label} gallery`}
				>
					<button
						type="button"
						onClick={close}
						aria-label="Close gallery"
						className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border-2 border-white/25 text-2xl leading-none text-white transition-colors hover:border-[var(--lime)] hover:text-[var(--lime)] md:right-8 md:top-8"
					>
						&times;
					</button>

					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							step(-1);
						}}
						aria-label="Previous photo"
						className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center border-2 border-white/25 text-2xl text-white transition-colors hover:border-[var(--lime)] hover:text-[var(--lime)] md:left-8"
					>
						&larr;
					</button>

					<figure
						className="relative max-h-full max-w-5xl"
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={driveImage(photos[open]!, FULL_WIDTH)}
							alt={`${label} photo ${open + 1}`}
							referrerPolicy="no-referrer"
							className="max-h-[80vh] w-auto border-2 border-white/15 object-contain shadow-[10px_10px_0_rgba(0,0,0,0.6)]"
						/>
						<figcaption className="mt-4 text-center">
							<span
								className="tape inline-block -rotate-1 !text-[10px]"
								style={{ background: theme.a, color: "#0a0612" }}
							>
								{label} &middot; {open + 1} / {photos.length}
							</span>
						</figcaption>
					</figure>

					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							step(1);
						}}
						aria-label="Next photo"
						className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center border-2 border-white/25 text-2xl text-white transition-colors hover:border-[var(--lime)] hover:text-[var(--lime)] md:right-8"
					>
						&rarr;
					</button>
				</div>
			)}
		</>
	);
}
