"use client";

import { ReactNode } from "react";

export function Marquee({
	children,
	duration = 28,
	reverse = false,
	pauseOnHover = false,
	className = "",
}: {
	children: ReactNode;
	duration?: number;
	reverse?: boolean;
	pauseOnHover?: boolean;
	className?: string;
}) {
	return (
		<div
			className={`overflow-hidden ${pauseOnHover ? "marquee-paused" : ""} ${className}`}
		>
			<div
				className="marquee-track"
				style={{
					["--marquee-dur" as string]: `${duration}s`,
					animationDirection: reverse ? "reverse" : undefined,
				}}
			>
				<div className="flex shrink-0 items-center">{children}</div>
				<div className="flex shrink-0 items-center" aria-hidden>
					{children}
				</div>
			</div>
		</div>
	);
}
