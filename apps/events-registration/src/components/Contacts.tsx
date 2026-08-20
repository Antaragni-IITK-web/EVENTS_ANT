import ReactMarkdown from "react-markdown";
import { FaPhone, FaInstagram } from "react-icons/fa";

interface ContactData {
	name: string;
	number: string;
	insta?: string;
	image?: string;
	rawDesc: string;
}

interface ContactProps {
	contacts: ContactData[];
	theme?: { a: string; b: string };
}

export const Contacts = ({ contacts, theme }: ContactProps) => {
	// If we have at least one parsed contact with a number
	if (contacts.length > 0 && contacts.some(c => c.number)) {
		return (
			<div className="flex flex-wrap justify-center gap-8">
				{contacts.map((contact, idx) => (
					<div
						key={idx}
						className="glass glow-card flex w-72 flex-col items-center rounded-3xl p-6 text-center"
					>
						<div
							className="mb-4 h-36 w-36 overflow-hidden rounded-full border-2 flex items-center justify-center bg-foreground/5"
							style={{ borderColor: theme?.b || 'var(--lime)' }}
						>
							{contact.image ? (
								<img
									src={contact.image}
									alt={contact.name}
									width={150}
									height={150}
									className="h-full w-full object-cover"
								/>
							) : (
								<span className="font-title text-4xl text-foreground/30">
									{contact.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
								</span>
							)}
						</div>
						<h3 className="font-title text-2xl text-secondary">
							{contact.name}
						</h3>
						<div className="mt-4 space-y-2 text-sm text-foreground/70">
							{contact.number && (
								<a
									href={`tel:${contact.number}`}
									className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
								>
									<FaPhone className="text-secondary/60" />
									<span>{contact.number}</span>
								</a>
							)}
							{contact.insta && (
								<a
									href={contact.insta}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
								>
									<FaInstagram className="text-secondary/60" />
									<span>Instagram</span>
								</a>
							)}
						</div>
					</div>
				))}
			</div>
		);
	}

	// Fallback to simple markdown if parsing fails or no valid structure is found
	const rawCombined = contacts.map(c => c.rawDesc).join('\n');
	return (
		<div className="bg-foreground/5 p-6 sm:p-8 rounded-lg border border-primary/10">
			<div className="prose prose-invert prose-lg max-w-none text-foreground/80 prose-a:text-primary hover:prose-a:text-secondary">
				<ReactMarkdown>{rawCombined}</ReactMarkdown>
			</div>
		</div>
	);
};
