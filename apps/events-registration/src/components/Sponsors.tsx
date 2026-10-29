import type { Sponsor } from "../data/sponsors";

interface SponsorsProps {
	sponsors: Sponsor[];
	theme?: { a: string; b: string };
	/** rendered when there is nothing on the sheet for this slug yet */
	fallback?: React.ReactNode;
}

/* two initials, skipping the filler words in long company names; a
   single-word brand falls back to its first two letters so the plate
   never carries a lone character */
const initials = (name: string) => {
	const words = name
		.replace(/[^\p{L}\s]/gu, " ")
		.split(/\s+/)
		.filter(
			(w) => w && !["the", "and", "of", "art", "pictures"].includes(w.toLowerCase())
		);

	const fromWords = words
		.slice(0, 2)
		.map((w) => w[0]?.toUpperCase() ?? "")
		.join("");

	return fromWords.length > 1
		? fromWords
		: (words[0] ?? name).slice(0, 2).toUpperCase();
};

/* stand-in for a sponsor with no logo file yet - reads as a logo plate,
   not as a broken image */
const LogoPlaceholder = ({
	name,
	a,
	b,
}: {
	name: string;
	a: string;
	b: string;
}) => (
	<div
		className="flex h-full w-full items-center justify-center rounded-2xl border border-white/10"
		style={{ background: `linear-gradient(135deg, ${a}1f, ${b}14)` }}
		aria-hidden
	>
		<span
			className="font-poster text-3xl uppercase leading-none tracking-tight"
			style={{
				background: `linear-gradient(92deg, ${a}, ${b})`,
				WebkitBackgroundClip: "text",
				backgroundClip: "text",
				color: "transparent",
			}}
		>
			{initials(name)}
		</span>
	</div>
);

export const Sponsors = ({ sponsors, theme, fallback }: SponsorsProps) => {
	if (!sponsors.length) {
		return (
			fallback ?? (
				<div className="flex justify-center py-8">
					<p className="font-poster text-4xl uppercase leading-none text-foreground/30 md:text-6xl">
						Coming soon
					</p>
				</div>
			)
		);
	}

	const a = theme?.a || "var(--lime)";
	const b = theme?.b || "var(--lime)";

	return (
		<div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
			{sponsors.map((sponsor) => {
				const inner = (
					<>
						<div className="flex h-24 w-full items-center justify-center">
							{sponsor.logo ? (
								<img
									src={sponsor.logo}
									alt={`${sponsor.name} logo`}
									className="max-h-24 w-auto max-w-full object-contain"
								/>
							) : (
								<LogoPlaceholder name={sponsor.name} a={a} b={b} />
							)}
						</div>
						<h3 className="font-title mt-4 text-center text-sm font-bold leading-tight text-foreground/85">
							{sponsor.name}
						</h3>
					</>
				);

				const shell =
					"glass glow-card flex flex-col items-center justify-center rounded-3xl p-5";

				return sponsor.url ? (
					<a
						key={sponsor.name}
						href={sponsor.url}
						target="_blank"
						rel="noopener noreferrer"
						data-cursor-text="VISIT"
						className={`${shell} transition-transform duration-300 hover:-translate-y-1`}
					>
						{inner}
					</a>
				) : (
					<div key={sponsor.name} className={shell}>
						{inner}
					</div>
				);
			})}
		</div>
	);
};
