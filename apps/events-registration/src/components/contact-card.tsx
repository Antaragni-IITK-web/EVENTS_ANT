"use client";

import { ContactItem } from "@repo/model";
import { MdEmail } from "react-icons/md";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import Image from "next/image";
import { cn } from "@repo/ui/util";

export interface ContactCardProps {
	contact: ContactItem;
	className?: string;
}

/* Contact card as a festival CREW PASS - ink stock, punched lanyard slot,
   molten-ring portrait, dashed tear line, barcode. Matches the poster system. */
export function ContactCard({ contact, className }: ContactCardProps) {
	return (
		<div
			className={cn(
				"group relative w-64 -rotate-1 border-2 border-white/15 bg-[var(--ink)] shadow-[7px_7px_0_rgba(0,0,0,0.5)] transition-transform duration-300 even:rotate-1 hover:-translate-y-1.5 hover:rotate-0",
				className
			)}
			style={{ borderRadius: 12 }}
			data-cursor="pointer"
		>
			{/* lanyard slot */}
			<div className="mx-auto mt-3 h-2.5 w-16 rounded-full border-2 border-white/20 bg-background" />

			{/* pass header */}
			<p className="mt-3 text-center text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--gold)]">
				Crew &middot; Antaragni &rsquo;26
			</p>

			{/* portrait in a molten ring */}
			<div className="mt-4 flex justify-center">
				<div
					className="rounded-full p-[3px]"
					style={{
						background:
							"linear-gradient(140deg, var(--gold), var(--ember), var(--crimson))",
					}}
				>
					<Image
						src={contact.image}
						alt={contact.name}
						width={120}
						height={120}
						className="h-28 w-28 rounded-full border-2 border-[var(--ink)] object-cover"
					/>
				</div>
			</div>

			{/* identity */}
			<div className="px-5 pb-4 pt-3 text-center">
				<p className="font-title text-lg font-black leading-tight">
					{contact.name}
				</p>
				<span className="tape mt-2 inline-block !px-3 !text-[9px]">
					Organizer &middot; Hospitality
				</span>
				<a
					href={`tel:${contact.contact}`}
					className="mt-3 block text-sm font-bold text-foreground/75 transition-colors hover:text-[var(--gold)]"
				>
					{contact.contact}
				</a>
			</div>

			{/* tear line + socials + barcode */}
			<div className="border-t-2 border-dashed border-white/15 px-5 py-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4 text-foreground/70">
						<a
							href="mailto:events@antaragni.in"
							target="_blank"
							rel="noreferrer"
							className="transition-colors hover:text-[var(--gold)]"
							aria-label="Email"
						>
							<MdEmail size={20} />
						</a>
						{contact.insta && (
							<a
								href={contact.insta}
								target="_blank"
								rel="noreferrer"
								className="transition-colors hover:text-[var(--flame)]"
								aria-label="Instagram"
							>
								<BsInstagram size={17} />
							</a>
						)}
						{contact.linkedin && (
							<a
								href={contact.linkedin}
								target="_blank"
								rel="noreferrer"
								className="transition-colors hover:text-[var(--amber)]"
								aria-label="LinkedIn"
							>
								<BsLinkedin size={17} />
							</a>
						)}
					</div>
					<div
						className="h-5 w-16 opacity-80"
						style={{
							background:
								"repeating-linear-gradient(90deg, rgba(247,240,228,0.85) 0 2px, transparent 2px 4px, rgba(247,240,228,0.85) 4px 5px, transparent 5px 8px)",
						}}
					/>
				</div>
			</div>
		</div>
	);
}
