/* ----------------------------------------------------------------------------
   PosterArt v3 — collectible festival posters, one scene per motif.
   Not icon-in-a-rectangle: each motif is a small illustrated WORLD —
   vinyl + frequency stage for music, spotlight cones + motion trails for
   dance, manga panels + speed lines for anime, paint drips for fine arts,
   radar rings for quiz, waveform horizon for lit/DJ, punk burst for rock.
   Wrapped in a trading-card frame: corner ticks, serial number, diagonal
   title ribbon, barcode, heavy grain. Deterministic SVG (seeded by slug).
---------------------------------------------------------------------------- */

import type { IconType } from "react-icons";
import {
	FaTheaterMasks,
	FaCamera,
	FaPaintBrush,
	FaQuestion,
	FaCrown,
	FaMicrophoneAlt,
	FaMicrophone,
	FaGuitar,
	FaHeadphones,
	FaTrophy,
	FaBookOpen,
	FaComments,
	FaToriiGate,
	FaShoePrints,
	FaLaughSquint,
	FaTshirt,
	FaWaveSquare,
	FaTicketAlt,
	FaRoute,
	FaFire,
} from "react-icons/fa";
import type { Motif } from "../../data/themes";

const ICONS: Record<string, IconType> = {
	anicon: FaToriiGate,
	dance: FaShoePrints,
	debate: FaComments,
	dramatics: FaTheaterMasks,
	ele: FaBookOpen,
	fnp: FaCamera,
	finearts: FaPaintBrush,
	mnm: FaCrown,
	musicals: FaMicrophoneAlt,
	quiz: FaQuestion,
	ritambhara: FaTshirt,
	battleunderground: FaMicrophone,
	"bug-rap": FaMicrophone,
	"bug-beatboxing": FaWaveSquare,
	synchro: FaGuitar,
	comickaun: FaLaughSquint,
	junoon: FaFire,
	djwar: FaHeadphones,
	nationals: FaTrophy,
	"events-portal": FaTicketAlt,
	"roadtrips-portal": FaRoute,
};

const GLYPHS: Record<string, string> = {
	hle: "अ",
};

function identityFor(slug: string) {
	const key = slug.toLowerCase().replace(/-about$/, "");
	return { Icon: ICONS[key], glyph: GLYPHS[key] };
}

function rng(seed: string) {
	let h = 2166136261;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return () => {
		h = Math.imul(h ^ (h >>> 15), h | 1);
		h ^= h + Math.imul(h ^ (h >>> 7), h | 61);
		return ((h ^ (h >>> 14)) >>> 0) / 4294967296;
	};
}

const W = 320;
const H = 420;

/* ------------------------------ shared bits ------------------------------ */

/* duotone identity mark with a misregistered print echo */
function Mark({
	Icon,
	glyph,
	x,
	y,
	size,
	b,
	rot = 0,
}: {
	Icon?: IconType;
	glyph?: string;
	x: number;
	y: number;
	size: number;
	b: string;
	rot?: number;
}) {
	return (
		<g transform={`rotate(${rot} ${x} ${y})`}>
			{Icon ? (
				<>
					<Icon
						x={x - size / 2 + 4}
						y={y - size / 2 + 5}
						size={size}
						fill={b}
						opacity={0.45}
					/>
					<Icon x={x - size / 2} y={y - size / 2} size={size} fill="#f4f1fa" />
				</>
			) : glyph ? (
				<>
					<text
						x={x + 4}
						y={y + size * 0.36}
						fontSize={size * 1.15}
						fontWeight={900}
						textAnchor="middle"
						fill={b}
						opacity={0.45}
						fontFamily="var(--font-rakkas), sans-serif"
					>
						{glyph}
					</text>
					<text
						x={x}
						y={y + size * 0.34}
						fontSize={size * 1.15}
						fontWeight={900}
						textAnchor="middle"
						fill="#f4f1fa"
						fontFamily="var(--font-rakkas), sans-serif"
					>
						{glyph}
					</text>
				</>
			) : null}
		</g>
	);
}

/* crowd silhouette — rows of heads along the bottom of a stage scene */
function Crowd({ y, r: rand }: { y: number; r: () => number }) {
	const heads: React.ReactNode[] = [];
	for (let row = 0; row < 2; row++) {
		for (let x = 8 + row * 11; x < W; x += 22) {
			heads.push(
				<circle
					key={`${row}-${x}`}
					cx={x + rand() * 6}
					cy={y + row * 12 + rand() * 4}
					r={7 + rand() * 3}
					fill="#070410"
				/>
			);
		}
	}
	return <g>{heads}</g>;
}

/* confetti scatter */
function Confetti({
	r: rand,
	a,
	b,
	n = 14,
	area = [10, 40, W - 20, 240] as [number, number, number, number],
}: {
	r: () => number;
	a: string;
	b: string;
	n?: number;
	area?: [number, number, number, number];
}) {
	return (
		<g>
			{Array.from({ length: n }, (_, i) => (
				<rect
					key={i}
					x={area[0] + rand() * area[2]}
					y={area[1] + rand() * area[3]}
					width={3 + rand() * 4}
					height={6 + rand() * 5}
					fill={i % 2 ? a : b}
					opacity={0.5 + rand() * 0.5}
					transform={`rotate(${rand() * 360} ${area[0] + rand() * area[2]} ${area[1] + rand() * area[3]})`}
				/>
			))}
		</g>
	);
}

/* --------------------------------- scenes -------------------------------- */

type SceneArgs = {
	uid: string;
	a: string;
	b: string;
	r: () => number;
	Icon?: IconType;
	glyph?: string;
};

function scene(motif: Motif, s: SceneArgs) {
	const { uid, a, b, r, Icon, glyph } = s;
	const g = `url(#${uid}-g)`;

	switch (motif) {
		/* ---- MUSIC — vinyl deck over a frequency skyline, crowd below ---- */
		case "bars": {
			const cx = W / 2;
			const cy = 150;
			return (
				<g>
					{/* frequency skyline */}
					{Array.from({ length: 13 }, (_, i) => {
						const bh = 30 + r() * 130;
						return (
							<rect
								key={i}
								x={i * (W / 13) + 3}
								y={318 - bh}
								width={W / 13 - 6}
								height={bh}
								fill={i % 2 ? a : b}
								opacity={0.5 + r() * 0.4}
							/>
						);
					})}
					{/* vinyl */}
					<circle cx={cx} cy={cy} r={104} fill="#070410" />
					<circle cx={cx} cy={cy} r={104} fill="none" stroke={g} strokeWidth={3} />
					{[84, 68, 52].map((rad) => (
						<circle
							key={rad}
							cx={cx}
							cy={cy}
							r={rad}
							fill="none"
							stroke="rgba(244,241,250,0.16)"
							strokeWidth={1.5}
						/>
					))}
					<circle cx={cx} cy={cy} r={38} fill={g} />
					<circle cx={cx} cy={cy} r={4} fill="#070410" />
					{/* light glint on the record */}
					<path
						d={`M ${cx - 70} ${cy - 44} A 82 82 0 0 1 ${cx - 12} ${cy - 82}`}
						stroke="rgba(244,241,250,0.5)"
						strokeWidth={5}
						strokeLinecap="round"
						fill="none"
					/>
					<Mark Icon={Icon} glyph={glyph} x={cx} y={cy} size={44} b="#070410" rot={-6} />
					<Crowd y={330} r={r} />
				</g>
			);
		}

		/* ---- DANCE — spotlight cones, motion trails, stage + crowd ---- */
		case "rays": {
			return (
				<g>
					{/* spotlight cones from top corners */}
					<polygon points={`14,-10 -40,300 150,300`} fill={a} opacity={0.3} />
					<polygon points={`306,-10 170,300 360,300`} fill={b} opacity={0.3} />
					<polygon points={`160,-30 60,310 260,310`} fill="#f4f1fa" opacity={0.14} />
					{/* motion trails arcing through the frame */}
					{[0, 1, 2].map((i) => (
						<path
							key={i}
							d={`M ${-20 + i * 8} ${210 - i * 26} Q ${W / 2} ${120 - i * 30} ${W + 20} ${200 - i * 18}`}
							stroke={i % 2 ? a : b}
							strokeWidth={5 - i}
							strokeLinecap="round"
							strokeDasharray={i === 1 ? "2 14" : undefined}
							fill="none"
							opacity={0.8 - i * 0.2}
						/>
					))}
					{/* stage */}
					<ellipse cx={W / 2} cy={306} rx={120} ry={16} fill={g} opacity={0.5} />
					<rect x={40} y={304} width={240} height={6} fill="#070410" />
					<Mark Icon={Icon} glyph={glyph} x={W / 2} y={252} size={84} b={b} rot={-8} />
					<Confetti r={r} a={a} b={b} n={16} />
					<Crowd y={342} r={r} />
				</g>
			);
		}

		/* ---- QUIZ / DEBATE — radar rings, orbit dots, crosshair ticks ---- */
		case "rings": {
			const cx = W / 2;
			const cy = 172;
			return (
				<g>
					{[124, 96, 68].map((rad, i) => (
						<circle
							key={rad}
							cx={cx}
							cy={cy}
							r={rad}
							fill="none"
							stroke={i % 2 ? a : b}
							strokeWidth={2.5}
							strokeDasharray={`${18 + r() * 30} ${10 + r() * 18}`}
							opacity={0.75}
							transform={`rotate(${r() * 360} ${cx} ${cy})`}
						/>
					))}
					{/* orbit satellites */}
					{[0, 1, 2, 3].map((i) => {
						const ang = r() * Math.PI * 2;
						const rad = [124, 96, 68, 124][i]!;
						return (
							<circle
								key={i}
								cx={cx + Math.cos(ang) * rad}
								cy={cy + Math.sin(ang) * rad}
								r={5 + r() * 3}
								fill={i % 2 ? b : a}
							/>
						);
					})}
					{/* crosshair ticks */}
					{[0, 90, 180, 270].map((deg) => (
						<line
							key={deg}
							x1={cx}
							y1={cy - 140}
							x2={cx}
							y2={cy - 128}
							stroke="rgba(244,241,250,0.5)"
							strokeWidth={2}
							transform={`rotate(${deg} ${cx} ${cy})`}
						/>
					))}
					<circle cx={cx} cy={cy} r={44} fill={g} opacity={0.2} />
					<Mark Icon={Icon} glyph={glyph} x={cx} y={cy} size={78} b={b} />
					{/* thought sparks */}
					<Confetti r={r} a={a} b={b} n={8} area={[20, 60, W - 40, 200]} />
				</g>
			);
		}

		/* ---- LIT / DJ — waveform horizon, big moon disc, reflection ---- */
		case "wave": {
			const cx = W / 2;
			return (
				<g>
					{/* moon disc */}
					<circle cx={cx} cy={150} r={92} fill={g} opacity={0.85} />
					<circle cx={cx} cy={150} r={92} fill={`url(#${uid}-ht2)`} opacity={0.5} />
					{/* waveform sea */}
					{Array.from({ length: 5 }, (_, i) => {
						const y0 = 252 + i * 32;
						const amp = 12 + i * 4;
						const seg = W / 5;
						let d = `M -20 ${y0}`;
						for (let x = -20; x <= W + 20; x += seg) {
							d += ` q ${seg / 2} ${i % 2 ? -amp : amp} ${seg} 0`;
						}
						return (
							<path
								key={i}
								d={d}
								fill="none"
								stroke={i % 2 ? a : b}
								strokeWidth={7 - i}
								strokeLinecap="round"
								opacity={0.85 - i * 0.14}
							/>
						);
					})}
					<Mark Icon={Icon} glyph={glyph} x={cx} y={150} size={80} b="#070410" />
					{/* icon reflection in the waves */}
					<g transform={`translate(0 ${2 * 268}) scale(1 -1)`} opacity={0.14}>
						<Mark Icon={Icon} glyph={glyph} x={cx} y={150} size={80} b={b} />
					</g>
				</g>
			);
		}

		/* ---- ANIME / PHOTO — manga panels, speed lines, halftone, action ---- */
		case "dots": {
			return (
				<g>
					{/* halftone patch */}
					<rect x={0} y={0} width={W} height={H} fill={`url(#${uid}-ht2)`} opacity={0.5} />
					{/* speed lines from top-right corner */}
					{Array.from({ length: 11 }, (_, i) => {
						const ang = 100 + i * 7 + r() * 4;
						const rad = (ang * Math.PI) / 180;
						return (
							<line
								key={i}
								x1={W + 10}
								y1={-10}
								x2={W + 10 + Math.cos(rad) * 420}
								y2={-10 - Math.sin(rad) * 420}
								stroke="rgba(244,241,250,0.35)"
								strokeWidth={1 + r() * 2}
							/>
						);
					})}
					{/* manga panels */}
					<rect x={18} y={54} width={190} height={210} fill="#070410" stroke={a} strokeWidth={3} transform="rotate(-2 113 159)" />
					<rect x={150} y={186} width={150} height={130} fill="#070410" stroke={b} strokeWidth={3} transform="rotate(3 225 251)" />
					{/* action burst in small panel */}
					<path
						d={(() => {
							const cx = 225, cy = 251, pts = 10;
							let d = "";
							for (let j = 0; j < pts; j++) {
								const ang = (j / pts) * Math.PI * 2;
								const rad = j % 2 === 0 ? 44 : 20;
								d += `${j === 0 ? "M" : "L"} ${cx + Math.cos(ang) * rad} ${cy + Math.sin(ang) * rad} `;
							}
							return d + "Z";
						})()}
						fill={b}
						opacity={0.9}
					/>
					<text x={225} y={259} fontSize={22} fontWeight={900} textAnchor="middle" fill="#070410" fontFamily="var(--font-rakkas), sans-serif">
						!!
					</text>
					<Mark Icon={Icon} glyph={glyph} x={113} y={158} size={92} b={a} rot={-2} />
				</g>
			);
		}

		/* ---- FINE ARTS / COMEDY — paint drips, blob, splatter, swash ---- */
		case "blob": {
			return (
				<g>
					{/* drips from the top edge */}
					{Array.from({ length: 7 }, (_, i) => {
						const x = 14 + i * 44 + r() * 16;
						const len = 30 + r() * 90;
						const wdt = 10 + r() * 10;
						return (
							<g key={i}>
								<rect x={x - wdt / 2} y={-4} width={wdt} height={len} rx={wdt / 2} fill={i % 2 ? a : b} opacity={0.85} />
								<circle cx={x} cy={len - 2} r={wdt / 2 + 1} fill={i % 2 ? a : b} opacity={0.85} />
							</g>
						);
					})}
					{/* central paint blob */}
					<path
						d={(() => {
							const cx = W / 2, cy = 226, pts = 9;
							let d = "";
							for (let j = 0; j <= pts; j++) {
								const ang = (j / pts) * Math.PI * 2;
								const rad = 92 * (0.72 + r() * 0.5);
								const x = cx + Math.cos(ang) * rad;
								const y = cy + Math.sin(ang) * rad * 0.92;
								d += j === 0 ? `M ${x} ${y}` : ` T ${x} ${y}`;
							}
							return d + " Z";
						})()}
						fill={g}
					/>
					{/* splatter */}
					{Array.from({ length: 12 }, (_, i) => (
						<circle
							key={i}
							cx={20 + r() * (W - 40)}
							cy={130 + r() * 220}
							r={2 + r() * 5}
							fill={i % 2 ? a : b}
							opacity={0.7}
						/>
					))}
					{/* brush swash */}
					<path
						d={`M 24 330 Q ${W / 2} ${292 + r() * 30} ${W - 24} 322`}
						stroke="#f4f1fa"
						strokeWidth={9}
						strokeLinecap="round"
						fill="none"
						opacity={0.35}
					/>
					<Mark Icon={Icon} glyph={glyph} x={W / 2} y={222} size={80} b="#070410" rot={6} />
				</g>
			);
		}

		/* ---- ROCK / RAP / DRAMA — punk burst, echo, caution band, sparks ---- */
		case "burst": {
			const cx = W / 2;
			const cy = 190;
			const burst = (scale: number) => {
				const pts = 16;
				let d = "";
				for (let j = 0; j < pts; j++) {
					const ang = (j / pts) * Math.PI * 2 + r() * 0.06;
					const rad = (j % 2 === 0 ? 132 : 62) * scale;
					d += `${j === 0 ? "M" : "L"} ${cx + Math.cos(ang) * rad} ${cy + Math.sin(ang) * rad} `;
				}
				return d + "Z";
			};
			return (
				<g>
					{/* caution stripes along the top */}
					<g transform="rotate(-4 160 30)">
						{Array.from({ length: 12 }, (_, i) => (
							<rect key={i} x={-20 + i * 32} y={16} width={16} height={22} fill={i % 2 ? a : "#070410"} />
						))}
					</g>
					{/* burst echo (misregistered) then main burst */}
					<path d={burst(1)} fill={b} opacity={0.4} transform="translate(9 8)" />
					<path d={burst(1)} fill="#070410" stroke={g} strokeWidth={4} strokeLinejoin="round" />
					<path d={burst(0.55)} fill={g} opacity={0.25} />
					{/* spark crosses */}
					{Array.from({ length: 7 }, (_, i) => {
						const x = 24 + r() * (W - 48);
						const y = 60 + r() * 280;
						const s2 = 5 + r() * 7;
						return (
							<g key={i} stroke={i % 2 ? a : b} strokeWidth={3} strokeLinecap="round" opacity={0.85}>
								<line x1={x - s2} y1={y} x2={x + s2} y2={y} />
								<line x1={x} y1={y - s2} x2={x} y2={y + s2} />
							</g>
						);
					})}
					<Mark Icon={Icon} glyph={glyph} x={cx} y={cy} size={86} b={a} rot={-5} />
				</g>
			);
		}
	}
}

/* -------------------------------- component ------------------------------- */

export function PosterArt({
	slug,
	title,
	a,
	b,
	motif,
	index,
	className = "",
}: {
	slug: string;
	title: string;
	a: string;
	b: string;
	motif: Motif;
	index?: number;
	className?: string;
}) {
	const r = rng(slug);
	const uid = `pa-${slug.replace(/[^a-zA-Z0-9]/g, "")}`;
	const { Icon, glyph } = identityFor(slug);
	const serial = `Nº ${String((index ?? Math.floor(r() * 26)) + 1).padStart(2, "0")}/26`;

	return (
		<svg
			viewBox={`0 0 ${W} ${H}`}
			className={className}
			role="img"
			aria-label={title}
			preserveAspectRatio="xMidYMid slice"
		>
			<defs>
				<linearGradient id={`${uid}-g`} x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor={a} />
					<stop offset="100%" stopColor={b} />
				</linearGradient>
				<radialGradient id={`${uid}-glow`} cx="0.5" cy="0.35" r="0.8">
					<stop offset="0%" stopColor={a} stopOpacity="0.4" />
					<stop offset="100%" stopColor="#0a0612" stopOpacity="0" />
				</radialGradient>
				<pattern id={`${uid}-ht2`} width="8" height="8" patternUnits="userSpaceOnUse">
					<circle cx="2" cy="2" r="1.5" fill={b} />
				</pattern>
				<filter id={`${uid}-n`}>
					<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
					<feColorMatrix type="saturate" values="0" />
					<feComponentTransfer>
						<feFuncA type="linear" slope="0.27" />
					</feComponentTransfer>
				</filter>
				<clipPath id={`${uid}-clip`}>
					<rect width={W} height={H} rx="3" />
				</clipPath>
			</defs>

			<g clipPath={`url(#${uid}-clip)`}>
				{/* base — rich printed stock, not digital black */}
				<rect width={W} height={H} fill="#17101f" />
				<rect width={W} height={H} fill={`url(#${uid}-glow)`} />

				{/* the scene */}
				{scene(motif, { uid, a, b, r, Icon, glyph })}

				{/* diagonal title ribbon */}
				<g transform={`rotate(-5 ${W / 2} 372)`}>
					<rect x={-30} y={348} width={W + 60} height={48} fill={`url(#${uid}-g)`} />
					<rect x={-30} y={348} width={W + 60} height={48} fill="none" stroke="#070410" strokeWidth={2.5} />
					<text
						x={18}
						y={382}
						fontSize={title.length > 11 ? 26 : 34}
						fontWeight={900}
						fill="#0a0612"
						fontFamily="var(--font-poster), var(--font-rakkas), sans-serif"
						letterSpacing={1}
					>
						{title.toUpperCase()}
					</text>
				</g>

				{/* trading-card chrome: serial, edition, barcode, corner ticks */}
				<text
					x={14}
					y={30}
					fontSize={11}
					fontWeight={700}
					fill="#f4f1fa"
					opacity={0.85}
					fontFamily="var(--font-inter), monospace"
					letterSpacing={2}
				>
					{serial}
				</text>
				<text
					x={W - 14}
					y={30}
					fontSize={10}
					fontWeight={700}
					textAnchor="end"
					fill={b}
					fontFamily="var(--font-inter), sans-serif"
					letterSpacing={2.5}
				>
					ANTARAGNI &#8217;26
				</text>
				{/* barcode */}
				<g transform={`translate(${W - 74} ${H - 26})`} opacity={0.9}>
					{Array.from({ length: 18 }, (_, i) => (
						<rect key={i} x={i * 3.4} y={0} width={r() > 0.5 ? 2.2 : 1.1} height={14} fill="#f4f1fa" />
					))}
				</g>
				{/* corner ticks */}
				{(
					[
						[10, 10, 1, 1],
						[W - 10, 10, -1, 1],
						[10, H - 10, 1, -1],
						[W - 10, H - 10, -1, -1],
					] as const
				).map(([x, y, sx, sy], i) => (
					<path
						key={i}
						d={`M ${x} ${y + 12 * sy} L ${x} ${y} L ${x + 12 * sx} ${y}`}
						fill="none"
						stroke="rgba(244,241,250,0.55)"
						strokeWidth={2}
					/>
				))}

				{/* print grain */}
				<rect width={W} height={H} filter={`url(#${uid}-n)`} opacity={0.5} />
			</g>
		</svg>
	);
}
