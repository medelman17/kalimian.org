#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { albumData } from "../lib/data";
import type { StreamingLink } from "../lib/data";

// Directory for storing results
const OUTPUT_DIR = path.join(process.cwd(), "scripts", "output");
if (!fs.existsSync(OUTPUT_DIR)) {
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// CSV file path
const CSV_PATH = path.join(process.cwd(), "tracklist.csv");

interface TrackCSVData {
	trackName: string;
	artistName: string;
	album: string;
	playlistName: string;
	type: string;
	isrc: string;
	appleId: string;
}

interface TrackWithLinks {
	movement: string;
	movementTitle: string;
	title: string;
	artist: string;
	links: StreamingLink[];
}

// Read and parse CSV
console.log("Reading CSV data...");
const csvContent = fs.readFileSync(CSV_PATH, "utf-8");
const trackData: TrackCSVData[] = parse(csvContent, {
	columns: [
		"trackName",
		"artistName",
		"album",
		"playlistName",
		"type",
		"isrc",
		"appleId",
	],
	from_line: 2, // Skip header
}).map((record: Record<string, string>) => ({
	...record,
	// Clean up field names and data
	trackName: record.trackName.trim(),
	artistName: record.artistName.trim(),
	isrc: record.isrc.trim(),
	appleId: record.appleId.trim(),
}));

console.log(`Loaded ${trackData.length} tracks from CSV file.`);

// Extract all tracks from album data
const allTracks: TrackWithLinks[] = [];

for (const movement of albumData) {
	for (const track of movement.tracks) {
		allTracks.push({
			movement: movement.number,
			movementTitle: movement.title,
			title: track.title,
			artist: track.artist,
			links: [], // Will be populated with streaming links
		});
	}
}

console.log(`Found ${allTracks.length} tracks in album data to process.`);

// Function to generate streaming links for tracks
function generateLinks() {
	let matchCount = 0;

	// Process each track and find matching data from CSV
	for (const track of allTracks) {
		// Try exact match first
		let matchingCSVTrack = trackData.find(
			(csvTrack) =>
				normalizeTitle(csvTrack.trackName) === normalizeTitle(track.title) &&
				csvTrack.artistName.includes(track.artist),
		);

		// If no exact match, try a more flexible match
		if (!matchingCSVTrack) {
			matchingCSVTrack = trackData.find((csvTrack) => {
				// Handle special cases
				if (
					track.title === "I Want It All" &&
					csvTrack.trackName.includes("I Want It All")
				) {
					return true;
				}
				if (
					track.title === "Stronger" &&
					csvTrack.trackName.includes("Stronger")
				) {
					return true;
				}
				if (
					track.title === "Science Genius Girl" &&
					csvTrack.trackName.includes("Science Genius Girl")
				) {
					return true;
				}
				if (
					track.title === "The Trial" &&
					csvTrack.trackName.includes("Carmina Burana")
				) {
					return true;
				}
				if (
					track.title === "All I Do Is Win" &&
					csvTrack.trackName.includes("All I Do Is Win")
				) {
					return true;
				}
				if (
					track.title === "Brave New World" &&
					csvTrack.trackName.includes("Brave New World")
				) {
					return true;
				}
				if (
					track.title === "Know Your Enemy" &&
					csvTrack.trackName.includes("Know Your Enemy")
				) {
					return true;
				}

				// Try partial matching
				return (
					normalizeTitle(csvTrack.trackName).includes(
						normalizeTitle(track.title),
					) ||
					normalizeTitle(track.title).includes(
						normalizeTitle(csvTrack.trackName),
					)
				);
			});
		}

		if (matchingCSVTrack) {
			matchCount++;

			// Generate the streaming links based on CSV data
			const streamingLinks: StreamingLink[] = [];

			// Apple Music link (direct from ID)
			if (matchingCSVTrack.appleId) {
				streamingLinks.push({
					platform: "appleMusic",
					url: `https://music.apple.com/us/album/id${matchingCSVTrack.appleId}`,
					isOfficial: true,
				});
			}

			// Spotify link (generated from ISRC or search query)
			if (matchingCSVTrack.isrc) {
				streamingLinks.push({
					platform: "spotify",
					url: `https://open.spotify.com/search/${matchingCSVTrack.isrc}`,
					isOfficial: false,
				});
			} else {
				const encodedSearch = encodeURIComponent(
					`${track.artist} ${track.title}`,
				);
				streamingLinks.push({
					platform: "spotify",
					url: `https://open.spotify.com/search/${encodedSearch}`,
					isOfficial: false,
				});
			}

			// YouTube link (generated from search)
			const encodedYTSearch = encodeURIComponent(
				`${track.artist} ${track.title} official audio`,
			);
			streamingLinks.push({
				platform: "youtube",
				url: `https://www.youtube.com/results?search_query=${encodedYTSearch}`,
				isOfficial: false,
			});

			// Log matched tracks
			console.log(
				`✅ Matched: ${track.title} by ${track.artist} => ${matchingCSVTrack.trackName}`,
			);

			track.links = streamingLinks;
		} else {
			console.log(`⚠️ No match found for: ${track.title} by ${track.artist}`);

			// Generate generic search links for unmatched tracks
			const streamingLinks: StreamingLink[] = [];

			const encodedSearch = encodeURIComponent(
				`${track.artist} ${track.title}`,
			);
			streamingLinks.push({
				platform: "spotify",
				url: `https://open.spotify.com/search/${encodedSearch}`,
				isOfficial: false,
			});

			const encodedYTSearch = encodeURIComponent(
				`${track.artist} ${track.title} official audio`,
			);
			streamingLinks.push({
				platform: "youtube",
				url: `https://www.youtube.com/results?search_query=${encodedYTSearch}`,
				isOfficial: false,
			});

			const encodedAppleSearch = encodeURIComponent(
				`${track.artist} ${track.title}`,
			);
			streamingLinks.push({
				platform: "appleMusic",
				url: `https://music.apple.com/us/search?term=${encodedAppleSearch}`,
				isOfficial: false,
			});

			track.links = streamingLinks;
		}
	}

	console.log(
		`Successfully matched ${matchCount} of ${allTracks.length} tracks with CSV data.`,
	);
}

// Helper function to normalize track titles for better matching
function normalizeTitle(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^\w\s]/g, "") // Remove punctuation
		.replace(/\s+/g, " ") // Normalize whitespace
		.trim();
}

// Generate final TypeScript file with updated tracks
function generateOutputFile() {
	const outputTsPath = path.join(OUTPUT_DIR, "updated-album-data.ts");

	// Create a deep copy of the album data
	const updatedAlbumData = JSON.parse(JSON.stringify(albumData));

	// Update tracks with collected links
	for (const movement of updatedAlbumData) {
		for (const track of movement.tracks) {
			const matchingTrack = allTracks.find(
				(t) => t.title === track.title && t.artist === track.artist,
			);

			if (matchingTrack && matchingTrack.links.length > 0) {
				track.streamingLinks = matchingTrack.links;
			}
		}
	}

	// Write to TS file
	const fileContent = `// Auto-generated file with streaming links
export const updatedAlbumData = ${JSON.stringify(updatedAlbumData, null, 2)};
`;

	fs.writeFileSync(outputTsPath, fileContent);
	console.log(
		`Updated album data with streaming links saved to ${outputTsPath}`,
	);

	// Also save raw data as JSON
	const jsonOutputPath = path.join(OUTPUT_DIR, "track-links.json");
	fs.writeFileSync(jsonOutputPath, JSON.stringify(allTracks, null, 2));
	console.log(`Raw track link data saved to ${jsonOutputPath}`);
}

// Run the script
console.log("Generating streaming links...");
generateLinks();
generateOutputFile();
console.log("Done!");
