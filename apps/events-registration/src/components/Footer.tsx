"use client";

import Link from "next/link";
import { Marquee } from "./fx/Marquee";
import { Sticker } from "./fx/Stickers";

/* Festival ending screen — the encore, not a sitemap.
   Giant closing type, film-style credits, a stamped ticket strip. */
const Footer = () => {
	return (
		<footer className="relative mt-28 overflow-hidden">
			{/* closing statement */}
			<div className="relative px-4 pb-6 pt-16 text-center">
				<div className="pointer-events-none absolute left-6 top-10 hidden rotate-12 md:block">
					<Sticker name="smiley" color="var(--orange)" className="h-16 w-16" />
				</div>
				<div className="pointer-events-none absolute right-8 top-24 hidden -rotate-12 md:block">
					<Sticker name="star" color="var(--cyan)" className="h-14 w-14" />
				</div>

				<p className="font-poster text-[11vw] uppercase leading-[0.9] md:text-[8vw]">
					<span className="text-gradient-live">See you</span>
					<br />
					<span className="text-stroke">in October</span>
				</p>
			</div>

			{/* full-width closing marquee */}
			<div className="-rotate-1 scale-[1.02]" style={{ background: "var(--lime)" }}>
				<Marquee duration={24} className="py-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<span
							key={i}
							className="font-title mx-6 flex items-center gap-6 text-xl font-black uppercase text-[#0a0612]"
						>
							Antaragni &rsquo;26 <span>&#10022;</span> IIT Kanpur
							<span>&#10022;</span> The rebirth of culture <span>&#10022;</span>
						</span>
					))}
				</Marquee>
			</div>

			{/* film credits */}
			<div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
				<div>
					<p className="font-title inline-block -rotate-1 border-2 border-[#0a0612] bg-[var(--pink)] px-3 py-1.5 text-xl font-black text-[#0a0612] shadow-[4px_4px_0_rgba(0,0,0,0.5)]" style={{ borderRadius: 8 }}>
						ANTARAGNI&rsquo;26
					</p>
					<p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground/60">
						The 61st edition of the annual cultural festival of IIT Kanpur.
						Compete, perform, belong.
					</p>

					{/* admit-one ticket strip */}
					<div className="ticket mt-8 inline-flex items-center gap-4 px-6 py-3">
						<div
							className="h-8 w-20"
							style={{
								background:
									"repeating-linear-gradient(90deg, #f4f1fa 0 2px, transparent 2px 5px)",
							}}
						/>
						<div className="text-[9px] font-bold uppercase leading-tight tracking-[0.25em] text-foreground/70">
							Admit all
							<br />
							Oct 2026
						</div>
					</div>
				</div>

				<div>
					<p className="tape mb-6 inline-block -rotate-1">Explore</p>
					<ul className="space-y-3 text-sm font-bold uppercase tracking-wider text-foreground/70">
						<li>
							<Link href="/events" className="hover:text-[var(--lime)]">
								Events
							</Link>
						</li>
						<li>
							<Link href="/roadtrips" className="hover:text-[var(--lime)]">
								Roadtrips
							</Link>
						</li>
						<li>
							<a
								href="https://antaragni.in"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[var(--lime)]"
							>
								Main Website
							</a>
						</li>
						<li>
							<a
								href="https://ca.antaragni.in"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[var(--lime)]"
							>
								CA Portal
							</a>
						</li>
					</ul>
				</div>

				<div>
					<p className="tape tape-pink mb-6 inline-block rotate-1">Connect</p>
					<ul className="space-y-3 text-sm font-bold uppercase tracking-wider text-foreground/70">
						<li>
							<a
								href="https://www.instagram.com/antaragni.iitkanpur/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[var(--pink)]"
							>
								Instagram
							</a>
						</li>
						<li>
							<a
								href="https://www.facebook.com/antaragni.iitk"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[var(--pink)]"
							>
								Facebook
							</a>
						</li>
						<li>
							<a
								href="https://www.youtube.com/user/antaragniiitkanpur"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[var(--pink)]"
							>
								YouTube
							</a>
						</li>
						<li>
							<a
								href="mailto:events@antaragni.in"
								className="normal-case hover:text-[var(--pink)]"
							>
								events@antaragni.in
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="border-t-2 border-dashed border-white/15 py-6 text-center text-xs uppercase tracking-[0.3em] text-foreground/40">
				Made with love by the Antaragni Web Team &middot; IIT Kanpur
			</div>
		</footer>
	);
};

export default Footer;
