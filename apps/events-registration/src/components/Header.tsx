"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@repo/store";
import { firebaseGoogleSignIn, firebaseLogout } from "@repo/firebase";
import { Magnetic } from "./fx/Magnetic";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/events", label: "Events" },
	{ href: "/roadtrips", label: "Roadtrips" },
];

/* Festival nav: rotated sticker wordmark + wristband link strip +
   backstage-pass auth. No glass, no pills, hard shadows only. */
const Header = () => {
	const pathname = usePathname();
	const { user, setUser, setLoading } = useStore();
	const [scrolled, setScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const profileMenuRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setIsMobileMenuOpen(false);
		setIsProfileMenuOpen(false);

		const handleClickOutside = (event: MouseEvent) => {
			if (
				profileMenuRef.current &&
				!profileMenuRef.current.contains(event.target as Node)
			) {
				setIsProfileMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [pathname]);

	useEffect(() => {
		document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	const handleSignIn = async () => {
		setLoading(true);
		const result = await firebaseGoogleSignIn();
		if (!result) {
			setLoading(false);
		} else {
			router.push("/register");
		}
	};

	const handleSignOut = async () => {
		await firebaseLogout(setUser);
	};

	return (
		<>
			<header className="fixed left-0 right-0 top-0 z-40 px-4 pt-4 md:px-6">
				<nav className="flex items-start justify-between">
					{/* Wordmark — rotated lime sticker */}
					<Magnetic strength={0.2}>
						<Link
							href="/"
							className={`font-title inline-block -rotate-2 border-2 border-[#0a0612] px-3.5 py-2 text-base font-black tracking-tight transition-shadow duration-300 ${
								scrolled ? "shadow-[4px_4px_0_rgba(0,0,0,0.55)]" : "shadow-[5px_5px_0_var(--violet)]"
							}`}
							style={{ background: "var(--lime)", color: "#0a0612", borderRadius: 8 }}
						>
							ANTARAGNI&rsquo;26
						</Link>
					</Magnetic>

					{/* Desktop — wristband strip */}
					<div className="hidden items-center md:!flex">
						<div
							className="flex rotate-1 items-center border-2 border-white/15 bg-[var(--ink)] px-1.5 py-1 shadow-[5px_5px_0_rgba(0,0,0,0.5)]"
							style={{ borderRadius: 8 }}
						>
							{/* wristband punch hole */}
							<span className="mx-2 h-3 w-3 rounded-full border-2 border-white/25 bg-background" />
							{navLinks.map((link) => {
								const isActive = pathname === link.href;
								return (
									<Link
										key={link.href}
										href={link.href}
										className={`px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200 ${
											isActive
												? "-rotate-1 bg-[var(--pink)] text-[#0a0612]"
												: "text-foreground/75 hover:-rotate-1 hover:text-[var(--lime)]"
										}`}
										style={isActive ? { borderRadius: 4 } : undefined}
									>
										{link.label}
									</Link>
								);
							})}
							<span className="mx-2 h-3 w-3 rounded-full border-2 border-white/25 bg-background" />
						</div>

						{/* Auth — backstage pass */}
						<div className="ml-4">
							{user ? (
								<div className="relative" ref={profileMenuRef}>
									<button
										onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
										className="flex rotate-1 items-center gap-2 border-2 border-white/15 bg-[var(--ink)] px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
										style={{ borderRadius: 8 }}
									>
										<span
											className="h-2 w-2 rounded-full"
											style={{ background: "var(--lime)" }}
										/>
										<span className="max-w-32 truncate normal-case tracking-normal">
											{user.user.displayName || "Profile"}
										</span>
										<svg
											width="12"
											height="12"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="3"
											strokeLinecap="round"
											className={`transition-transform duration-300 ${isProfileMenuOpen ? "rotate-180" : ""}`}
										>
											<path d="m6 9 6 6 6-6" />
										</svg>
									</button>
									{isProfileMenuOpen && (
										<div
											className="absolute right-0 top-full mt-3 w-64 -rotate-1 overflow-hidden border-2 border-white/15 bg-[var(--ink)] shadow-[6px_6px_0_rgba(0,0,0,0.55)]"
											style={{ borderRadius: 10 }}
										>
											<div
												className="border-b-2 border-dashed border-white/15 px-5 py-4"
												style={{ background: "rgba(199,244,65,0.06)" }}
											>
												<p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--lime)]">
													Backstage pass
												</p>
												<p className="mt-1 truncate text-sm font-bold">
													{user.user.displayName || "Welcome"}
												</p>
												<p className="truncate text-xs text-foreground/50">
													{user.user.email}
												</p>
											</div>
											<div className="p-2">
												<Link
													href={user.details ? "/dashboard" : "/register"}
													className="block px-4 py-2.5 text-sm font-bold hover:bg-white/10"
												>
													{user.details ? "Dashboard" : "Complete Registration"}
												</Link>
												<button
													onClick={handleSignOut}
													className="block w-full px-4 py-2.5 text-left text-sm font-bold text-[var(--pink)] hover:bg-white/10"
												>
													Sign out
												</button>
											</div>
										</div>
									)}
								</div>
							) : (
								<Magnetic strength={0.25}>
									<button
										onClick={handleSignIn}
										className="btn-lime !px-5 !py-2 !text-xs"
									>
										Sign in
									</button>
								</Magnetic>
							)}
						</div>
					</div>

					{/* Mobile burger — sticker square */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="flex h-11 w-11 rotate-2 flex-col items-center justify-center gap-1.5 border-2 border-white/15 bg-[var(--ink)] shadow-[4px_4px_0_rgba(0,0,0,0.5)] md:!hidden"
						style={{ borderRadius: 8 }}
						aria-label="Menu"
					>
						<span
							className={`h-0.5 w-5 bg-foreground transition-transform duration-300 ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
						/>
						<span
							className={`h-0.5 w-5 bg-foreground transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
						/>
						<span
							className={`h-0.5 w-5 bg-foreground transition-transform duration-300 ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
						/>
					</button>
				</nav>
			</header>

			{/* Mobile overlay — solid poster wall */}
			<div
				className={`fixed inset-0 z-30 flex flex-col justify-between bg-[#0a0612] px-8 pb-10 pt-32 transition-all duration-500 md:!hidden ${
					isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
				}`}
			>
				<div className="halftone pointer-events-none absolute inset-0 opacity-30" />
				<div className="relative flex flex-col gap-4">
					{navLinks.map((link, i) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setIsMobileMenuOpen(false)}
							className={`font-poster text-6xl uppercase transition-all duration-500 ${
								isMobileMenuOpen
									? "translate-y-0 opacity-100"
									: "translate-y-6 opacity-0"
							} ${pathname === link.href ? "text-gradient-live" : ""}`}
							style={{
								transitionDelay: `${100 + i * 80}ms`,
								transform: `rotate(${i % 2 ? 1 : -1}deg)`,
							}}
						>
							{link.label}
						</Link>
					))}
					{user && (
						<Link
							href={user.details ? "/dashboard" : "/register"}
							onClick={() => setIsMobileMenuOpen(false)}
							className={`font-poster text-6xl uppercase transition-all duration-500 ${
								isMobileMenuOpen
									? "translate-y-0 opacity-100"
									: "translate-y-6 opacity-0"
							}`}
							style={{ transitionDelay: "340ms" }}
						>
							{user.details ? "Dashboard" : "Register"}
						</Link>
					)}
				</div>
				<div className="relative">
					{user ? (
						<button onClick={handleSignOut} className="btn-ghost w-full">
							Sign out
						</button>
					) : (
						<button
							onClick={() => {
								setIsMobileMenuOpen(false);
								handleSignIn();
							}}
							className="btn-lime w-full"
						>
							Sign in with Google
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default Header;
