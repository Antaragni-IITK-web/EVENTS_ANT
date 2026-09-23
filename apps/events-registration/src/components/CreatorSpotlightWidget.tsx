"use client";
import React from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function CreatorSpotlightWidget() {
	const widgetRef = React.useRef<HTMLAnchorElement>(null);

	useGSAP(() => {
		if (!widgetRef.current) return;
		gsap.fromTo(
			widgetRef.current,
			{ y: 100, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 1.5 }
		);
	});

	return (
		<Link
			href="/creator-spotlight"
			ref={widgetRef}
			className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center bg-gradient-to-br from-[#ff3c00] to-[#ff8a3d] transition-all px-8 py-6 shadow-[0_0_20px_rgba(255,60,0,0.4)] hover:shadow-[0_0_35px_rgba(255,60,0,0.6)] group cursor-pointer hover:scale-105"
			style={{
				clipPath: "polygon(4% 0%, 96% 3%, 100% 95%, 2% 98%)",
				borderRadius: "2px",
			}}
		>
			<span className="font-title uppercase font-black text-xl md:text-2xl text-[#060408] tracking-widest text-center leading-none rotate-[-1deg] group-hover:rotate-[1deg] transition-transform">
				Creator<br/>Spotlight
			</span>
		</Link>
	);
}
