/* ----------------------------------------------------------------------------
   Dreamons / sponsor commitments, transcribed from "Dreamons Sheet.xlsx".
   Keyed by the site's own slugs (lowercased) so both the events pages and the
   roadtrip pages read from one place.

   The sheet's "Company's logo" column holds Drive / CDN links to logo files
   rather than image URLs the site can render, so `url` carries only a real
   company page (Instagram) and `logo` is left for a file dropped into
   public/sponsors/ later - the card shows the logo as soon as one exists.
---------------------------------------------------------------------------- */

export interface Sponsor {
	name: string;
	/** the sponsor's own page, when the sheet gives one */
	url?: string;
	/** optional logo under /public, e.g. "/sponsors/inglu.png" */
	logo?: string;
	/** what they have committed to, one line per commitment */
	perks: string[];
}

const INGLU = "INGLU";
const MUSICULTURE = "MusiCulture";
const MUSICULTURE_URL = "https://www.instagram.com/musiculture.in/?hl=en";
const SOULTALK = "The Soultalk Art and Literature Foundation";

const BATTLE_UNDERGROUND: Sponsor[] = [
	{
		name: "Rapgods India",
		url: "https://www.instagram.com/rapgods_india/?hl=en",
		perks: [
			"Rapgods India will feature the winners of Battle Underground on their social media platform.",
		],
	},
	{
		name: MUSICULTURE,
		url: MUSICULTURE_URL,
		perks: [
			"MusiCulture will promote the winners of Battle Underground through its official social media handles.",
		],
	},
	{
		name: INGLU,
		perks: [
			"Inglu will provide 10 gigs, management, and song distribution to the winner of Battle Underground.",
			"Inglu will provide 7 gigs and song distribution to the 1st runner-up of Battle Underground.",
			"Inglu will provide 5 gigs to the 2nd runner-up of Battle Underground.",
		],
	},
];

export const sponsorsBySlug: Record<string, Sponsor[]> = {
	/* ------------------------------ EVENTS ------------------------------ */
	musicals: [
		{
			name: INGLU,
			perks: [
				"Inglu will provide 5 gigs, management, and song distribution to the winner, 3 gigs and song distribution to the 1st runner-up, and 2 gigs to the 2nd runner-up of Battle of Bands.",
			],
		},
		{
			name: MUSICULTURE,
			url: MUSICULTURE_URL,
			perks: [
				"MusiCulture will promote the winners of Musicals through its official social media handles.",
			],
		},
	],

	ele: [
		{
			name: SOULTALK,
			perks: [
				"The Soultalk Art and Literature Foundation will provide 3 gift hampers to the winners of Poetry Slam.",
			],
		},
	],

	hle: [
		{
			name: SOULTALK,
			url: "https://www.instagram.com/the_soultalk",
			perks: [
				"The Soultalk Art and Literature Foundation will provide 3 gift hampers to the winners of Kavyanjali.",
			],
		},
	],

	dance: [
		{
			name: "Urshilla Dance Company",
			perks: [
				"Urshilla Dance Company will provide workshops to the winners of Jitterbug and Tour de Force, as well as workshops for the winners, 1st runner-up and 2nd runner-up of Duet and Estampie.",
			],
		},
		{
			name: INGLU,
			perks: [
				"Inglu will provide 5 gigs, management, and song distribution to the winner, 3 gigs and song distribution to the 1st runner-up, and 2 gigs to the 2nd runner-up of the Tour de Force & Jitterbug competition.",
			],
		},
	],

	dramatics: [
		{
			name: INGLU,
			perks: ["Inglu will provide 2 gigs to the winner of Street Play (Nukkad Natak)."],
		},
		{
			name: "Anukriti Rangmandal",
			perks: [
				"Anukriti Rangmandal Kanpur will provide a 3 day acting workshop to the stage and street play winners.",
			],
		},
		{
			name: "TWS Pictures Drama School - Actor's Karkhana",
			perks: [
				"TWS Pictures Drama School - Actor's Karkhana will provide a 12 day acting workshop to the winners of stage play and street play (all four events).",
				"TWS Pictures Drama School - Actor's Karkhana will provide performing stages to the winners.",
			],
		},
		{
			name: "Awaaz Art Centre",
			perks: [
				"Awaaz Art Centre will provide a 15 day workshop to the stage and street play winners.",
				"Awaaz Art Centre will provide a performing stage to the winners.",
			],
		},
	],

	ritambhara: [
		{
			name: "ELIOS",
			perks: [
				"Elios shall provide team portfolio shoots each to the winning team of Ritambhara and Disenador.",
				"Elios shall provide portfolio shoots each to Mr. and Ms. Antaragni.",
				"Elios shall provide grooming and modelling workshops to advertise to Mr. and Ms. Ritambhara.",
				"Elios shall provide dress designing workshops to the winners of Disenador.",
				"Elios shall provide direct entry to Mr. and Ms. Antaragni and Mr. and Ms. Ritambhara in some reality shows and fashion shows.",
				"Elios shall provide 10 gift hampers to the participants.",
				"Elios shall provide internships to all the members of the winning team of Ritambhara.",
			],
		},
		{
			name: "Be Original Productions",
			perks: [
				"Be Original Productions shall provide certificates to 150 participants of Ritambhara.",
				"Be Original Productions shall provide advertisement in newsletters and magazines like Newwali and Pranam Bharat to the winning team of Ritambhara and Mr. and Ms. Ritambhara.",
				"Be Original Productions shall provide team portfolio shoots worth INR 60,000 - INR 30,000 each to the 1st runner-up and 2nd runner-up teams of Ritambhara.",
				"Be Original Productions shall provide portfolio shoots worth INR 12,000 - INR 6,000 each to Mr. and Ms. Ritambhara.",
				"Be Original Productions shall provide a coverage team worth INR 30,000 for the final event of Ritambhara.",
				"Be Original Productions shall provide 10 gift hampers to the participants.",
				"Be Original Productions shall provide a 3 day grooming, pageant training and runway workshop to Mr. and Ms. Ritambhara.",
				"Be Original Productions shall try to provide advertisement and modelling contracts to the 1st runner-up of Ritambhara, if possible at that time.",
				"Be Original Productions shall provide 4 makeup artists - 2 on the pre-finals and 2 on the final day of Ritambhara.",
			],
		},
		{
			name: "Stylz Salon",
			perks: [
				"Stylz Salon shall provide 5 gift hampers to the winners of Mr. and Ms. Ritambhara, and Mr. and Ms. Antaragni.",
				"Stylz Salon shall provide 2 makeup artists on the final day of Ritambhara (31st October 2026) and on the final day of Mr. and Ms. Antaragni (31st October 2026).",
				"Stylz Salon shall provide a 3 day grooming, pageant training and runway workshop to the winners of Ritambhara, Disenador, Mr. and Ms. Ritambhara, and Mr. and Ms. Antaragni.",
			],
		},
		{
			name: INGLU,
			perks: [
				"Inglu will provide 5 gigs, management, and song distribution to the winner, 3 gigs and song distribution to the 1st runner-up, and 2 gigs to the 2nd runner-up of the event.",
			],
		},
	],

	/* ----------------------------- ROADTRIPS ----------------------------- */
	battleunderground: BATTLE_UNDERGROUND,
	/* Battle Underground splits into two sub-pages; both carry its sponsors */
	"bug-rap": BATTLE_UNDERGROUND,
	"bug-beatboxing": BATTLE_UNDERGROUND,

	synchro: [
		{
			name: INGLU,
			perks: [
				"Inglu will provide 2 gigs, management, and song distribution to every participant of Synchronicity.",
			],
		},
		{
			name: MUSICULTURE,
			url: MUSICULTURE_URL,
			perks: [
				"MusiCulture will promote the winners of Synchronicity through its official social media handles.",
			],
		},
	],

	junoon: [
		{
			name: INGLU,
			perks: [
				"Inglu will provide 8 gigs, management, and song distribution to the winner, 4 gigs and song distribution to the 1st runner-up, and 2 gigs to the 2nd runner-up of Junoon.",
			],
		},
		{
			name: MUSICULTURE,
			url: MUSICULTURE_URL,
			perks: [
				"MusiCulture will promote the winners of Junoon through its official social media handles.",
			],
		},
	],

	djwar: [
		{
			name: INGLU,
			perks: [
				"Inglu will provide 10 gigs, management, and song distribution to the winner, 5 gigs and song distribution to the 1st runner-up, and 3 gigs to the 2nd runner-up of DJ War.",
			],
		},
		{
			name: MUSICULTURE,
			url: MUSICULTURE_URL,
			perks: [
				"MusiCulture will promote the winners of DJ War through its official social media handles.",
			],
		},
		{
			name: "Infini Music Academy",
			url: "https://www.instagram.com/infinimusicacademy",
			perks: [
				"Infini Music Academy will provide cash prizes worth INR 10,000 to the winner, INR 5,000 to the 1st runner-up, and headphones to the 2nd runner-up.",
				"DJ kits (a pendrive case along with 2 pendrives) to be awarded to the winner, 1st runner-up and 2nd runner-up.",
				"Infini Music Academy will provide customised T-shirts with Infini branding for all participants, certificates for participants, and trophies for the winner, 1st runner-up and 2nd runner-up.",
			],
		},
	],

	comickaun: [
		{
			name: INGLU,
			perks: [
				"Inglu will provide 5 gigs, management, and show recording to the winner, 3 gigs and management to the 1st runner-up, and 2 gigs to the 2nd runner-up of Comic Kaun.",
			],
		},
		{
			name: "The BlackLab Entertainment",
			perks: [
				"BlackLab will provide 3 gigs to the winners, 2 gigs to each runner-up and 1 gig to the 2nd runner-up of ComicKaun '26, feature the winners on Instagram, and offer genre-specific gigs to Got Latent '26 winners.",
			],
		},
	],
};

export const getSponsors = (slug?: string): Sponsor[] =>
	(slug && sponsorsBySlug[slug.toLowerCase()]) || [];
