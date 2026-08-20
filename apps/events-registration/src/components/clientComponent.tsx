"use client";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@repo/store";
import { InitialState } from "@repo/firebase";
import FestivalLoader from "./FestivalLoader";
import SessionLoader from "./SessionLoader";
import Header from "./Header";
import Footer from "./Footer";
import { CharGrid } from "./fx/CharGrid";
import { Atmosphere } from "./fx/Atmosphere";

/* every route change starts at the top - Lenis + App Router can otherwise
   carry the previous scroll position onto the new page */
function ScrollReset() {
	const pathname = usePathname();
	useEffect(() => {
		requestAnimationFrame(() => {
			window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
			document.documentElement.scrollTop = 0;
		});
	}, [pathname]);
	return null;
}

export function ClientComponent({ children }: { children: ReactNode }) {
	const { initialAnimation, loading } = useStore();
	const showSessionLoader = loading && !initialAnimation;

	return (
		<>
			<ScrollReset />
			<InitialState document="eventsUsers2026" />
			{initialAnimation && <FestivalLoader />}
			{showSessionLoader && <SessionLoader />}
			<div className="fixed inset-0 pointer-events-none">
				<Atmosphere />
				<CharGrid />
			</div>
			<div className="grain-overlay" />
			<div className="relative z-10">
				<Header />
				<main>{children}</main>
				<Footer />
			</div>
		</>
	);
}
