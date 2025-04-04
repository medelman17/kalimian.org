import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { StreamingLink, Track } from "./types";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Utility functions to generate search URLs for different streaming platforms
 */
export const generateStreamingLinks = (
	track: Pick<Track, "title" | "artist">,
): StreamingLink[] => {
	const { title, artist } = track;
	const encodedSearch = encodeURIComponent(`${artist} ${title}`);

	return [
		{
			platform: "spotify",
			url: `https://open.spotify.com/search/${encodedSearch}`,
			isOfficial: false,
		},
		{
			platform: "youtube",
			url: `https://www.youtube.com/results?search_query=${encodedSearch}`,
			isOfficial: false,
		},
		{
			platform: "appleMusic",
			url: `https://music.apple.com/us/search?term=${encodedSearch}`,
			isOfficial: false,
		},
	];
};

/**
 * Generate direct track URL using specific IDs when you have them
 */
export const createSpotifyTrackUrl = (trackId: string): string =>
	`https://open.spotify.com/track/${trackId}`;

export const createYouTubeVideoUrl = (videoId: string): string =>
	`https://www.youtube.com/watch?v=${videoId}`;

export const createAppleMusicTrackUrl = (
	albumId: string,
	trackId: string,
): string => `https://music.apple.com/us/album/${albumId}?i=${trackId}`;
