"use client";

import { useEffect, useState, useRef } from "react";
import { useStore } from "@repo/store";
import gsap from "gsap";

/* ----------------------------------------------------------------------------
   FestivalLoader - Brutalist No Art style preloader.
   Pitch black screen, the Antaragni mark igniting from the bottom up as the
   digital counter climbs, then an expanding mask that reveals the hero video
   underneath in stages.
---------------------------------------------------------------------------- */

export default function FestivalLoader() {
	const [status, setStatus] = useState<"loading" | "finished">("loading");
	const { setInitialAnimation } = useStore();

	const counterRef = useRef<HTMLDivElement>(null);
	const holeRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const markRef = useRef<HTMLDivElement>(null);
	const fireRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const pageLoad = new Promise<void>((resolve) => {
			if (document.readyState === "complete") resolve();
			else window.addEventListener("load", () => resolve(), { once: true });
		});

		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		/* First paint is the heaviest moment on the page (hero video + canvas
		   background), so frames here routinely exceed GSAP's 500ms lag
		   threshold. With smoothing on, GSAP treats each of those as 33ms and
		   the 2.5s count stretches into a minute-long crawl. Run the preloader
		   on real elapsed time instead, and restore the default on unmount. */
		gsap.ticker.lagSmoothing(0);

		const tl = gsap.timeline({
			onComplete: () => {
				setStatus("finished");
			}
		});

		// 0. The mark fades up before the count starts. Keep this short - until it
		//    lands there is nothing on screen but the counter.
		tl.from(markRef.current, {
			opacity: 0,
			scale: 0.9,
			duration: reduce ? 0.01 : 0.4,
			ease: "power3.out"
		});

		// 1. Counter counts from 0 to 100, and the molten fill rises through the
		//    logo in lockstep - the mark IS the progress bar.
		tl.to(
			{ val: 0 },
			{
				val: 100,
				duration: reduce ? 0.4 : 2.5,
				ease: "power2.inOut",
				onUpdate: function () {
					const val = this.targets()[0].val as number;
					if (counterRef.current) {
						counterRef.current.innerText = Math.round(val) + "%";
					}
					if (fireRef.current) {
						fireRef.current.style.clipPath = `inset(${100 - val}% 0 0 0)`;
					}
				}
			},
			reduce ? ">" : "-=0.15"
		);

		// Wait for page to actually load before revealing
		tl.add(async () => {
			await pageLoad;
		});

		// 1b. Ignition kick once the mark is fully lit
		if (!reduce) {
			tl.to(markRef.current, {
				scale: 1.06,
				duration: 0.22,
				ease: "power2.out"
			}).to(markRef.current, {
				scale: 1,
				duration: 0.35,
				ease: "elastic.out(1, 0.5)"
			});
		}

		// 2. Open the tiny square hole
		tl.to(holeRef.current, {
			width: "5rem",
			height: "5rem",
			duration: 0.5,
			ease: "power4.out"
		});

		// Pause
		tl.to({}, { duration: 0.3 });

		// 3. Expand to cinematic rectangle
		tl.to(holeRef.current, {
			width: "50vw",
			height: "25vh",
			duration: 0.8,
			ease: "power3.inOut"
		});

		// Pause
		tl.to({}, { duration: 0.2 });

		// 4. Expand to full screen (hole becomes massive)
		tl.to(holeRef.current, {
			width: "200vw",
			height: "200vh",
			duration: 1.2,
			ease: "power4.inOut"
		});

		// Mark + counter lift away as the hole swallows the screen
		tl.to(contentRef.current, {
			opacity: 0,
			scale: 1.15,
			duration: 0.5,
			ease: "power2.in"
		}, "-=1.3");

		// 5. Fade out entire wrapper (graceful exit)
		tl.to(wrapperRef.current, {
			opacity: 0,
			duration: 0.4
		}, "-=0.2");

		return () => {
			tl.kill();
			gsap.ticker.lagSmoothing(500, 33);
		};
	}, []);

	useEffect(() => {
		if (status === "finished") setInitialAnimation(false);
	}, [status, setInitialAnimation]);

	if (status === "finished") return null;

	return (
		<div
			ref={wrapperRef}
			className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-auto"
			aria-hidden
		>
			{/*
                THE SHADOW HOLE TRICK:
                A transparent div in the center with a massive black box-shadow that covers the screen.
                When the div's width/height expand, the "hole" in the blackness grows, revealing the page!
            */}
			<div
                ref={holeRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-transparent rounded-sm"
                style={{ boxShadow: "0 0 0 100vmax #0a0612" }}
            />

            {/* the mark igniting, with the counter under it */}
            <div
                ref={contentRef}
                className="relative z-10 flex select-none flex-col items-center gap-7"
            >
                <div
                    ref={markRef}
                    className="loader-mark relative aspect-[503/752] h-[clamp(7rem,26vh,13rem)]"
                >
                    <div className="loader-halo pointer-events-none absolute -inset-[55%]" />
                    {/* unlit shell of the logo */}
                    <div className="loader-logo-ghost absolute inset-0" />
                    {/* molten fill, clipped to the counter % */}
                    <div ref={fireRef} className="loader-logo-fire absolute inset-0" />
                </div>

                {/* Counter */}
                <div
                    ref={counterRef}
                    className="font-sans text-6xl md:text-8xl font-black text-white mix-blend-difference"
                >
                    0%
                </div>
            </div>
		</div>
	);
}
