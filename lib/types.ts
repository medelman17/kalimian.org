export type ConceptAlbumReview = {
	theme: string; // Core lesson/theme (e.g. "Power Isn't Always Where You Expect It")
	actReferences: string[]; // Relevant Acts from the album liner notes
	reviewer: {
		name: string;
		affiliation: string;
		type:
			| "Critic"
			| "Fan"
			| "Musician"
			| "Tenant Advocate"
			| "Landlord"
			| "Podcast Host";
	};
	review: string; // The full text of the review
};

export type StreamingPlatform = "spotify" | "youtube" | "appleMusic" | string;

export type StreamingLink = {
	platform: StreamingPlatform;
	url: string;
	isOfficial?: boolean;
};

export type Track = {
	title: string;
	artist: string;
	duration: string;
	description: string;
	streamingLinks?: StreamingLink[];
};

export type Movement = {
	number: string;
	title: string;
	description: string;
	content: string;
	tracks: Track[];
};

export type TourStop = {
	venueName: string; // A satirical or real property name
	propertyAddress: string; // Street address of the location
	city: string;
	state: string;
	date: string; // ISO 8601 date string (e.g., "2025-05-15")
	eventTitle: string; // Funny or dramatic title for the stop
	supportingActs?: string[]; // Optional fake or themed openers
	notes?: string; // Optional snarky commentary or legal satire
};
