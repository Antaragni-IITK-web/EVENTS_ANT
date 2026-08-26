export interface TourLocationInfo {
	city: string;
	venue: string;
	time?: string;
	igPostUrl?: string;
	description?: string;
}

export const tourData: Record<string, TourLocationInfo> = {
	"Lucknow": {
		city: "Lucknow",
		venue: "BBDU",
		time: "TBA",
		description: "Get ready for an electrifying night in the city of Nawabs!"
	},
	"Jaipur": {
		city: "Jaipur",
		venue: "SS Jain College",
		time: "TBA",
		description: "The Pink City gears up for an unforgettable indie rock experience."
	},
	"Delhi": {
		city: "Delhi",
		venue: "NSUT",
		time: "TBA",
		description: "Capital vibes. A massive night of pure energy and incredible performances."
	},
	"Chandigarh": {
		city: "Chandigarh",
		venue: "TBA",
		time: "TBA",
		description: "High energy performances coming to the beautiful city."
	},
	"Indore": {
		city: "Indore",
		venue: "TBA",
		time: "TBA",
		description: "The cleanest city gets down and dirty with some raw rock."
	}
};
