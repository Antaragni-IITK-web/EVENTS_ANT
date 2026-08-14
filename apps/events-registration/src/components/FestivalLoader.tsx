"use client";

import { useEffect, useState, useRef } from "react";
import { useStore } from "@repo/store";
import gsap from "gsap";

/* ----------------------------------------------------------------------------
   FestivalLoader — Brutalist No Art style preloader.
   Pitch black screen, digital counter, and an expanding mask that reveals 
   the hero video underneath in stages.
---------------------------------------------------------------------------- */

export default function FestivalLoader() {
	const [status, setStatus] = useState<"loading" | "finished">("loading");
	const { setInitialAnimation } = useStore();
	
	const counterRef = useRef<HTMLDivElement>(null);
	const holeRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const pageLoad = new Promise<void>((resolve) => {
			if (document.readyState === "complete") resolve();
			else window.addEventListener("load", () => resolve(), { once: true });
		});
		
		const tl = gsap.timeline({
			onComplete: () => {
				setStatus("finished");
			}
		});

		// 1. Counter counts from 0 to 100
		tl.to(
			{ val: 0 }, 
			{ 
				val: 100, 
				duration: 2.5, 
				ease: "power2.inOut",
				onUpdate: function() {
					if (counterRef.current) {
						counterRef.current.innerText = Math.round(this.targets()[0].val) + "%";
					}
				}
			}
		);

		// Wait for page to actually load before revealing
		tl.add(async () => {
			await pageLoad;
		});

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

		// Fade out counter during final expansion
		tl.to(counterRef.current, {
			opacity: 0,
			duration: 0.3
		}, "-=1");
        
        // 5. Fade out entire wrapper (graceful exit)
        tl.to(wrapperRef.current, {
            opacity: 0,
            duration: 0.4
        }, "-=0.2");

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

            {/* Counter */}
            <div 
                ref={counterRef}
                className="relative z-10 font-sans text-6xl md:text-8xl font-black text-white mix-blend-difference select-none"
            >
                0%
            </div>
		</div>
	);
}
