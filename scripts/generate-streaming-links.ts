#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { albumData, generateStreamingLinks } from "../lib/data";
import type { StreamingLink } from "../lib/data";
import { exec } from "node:child_process";
import readline from "node:readline";

// Directory for storing results
const OUTPUT_DIR = path.join(process.cwd(), "scripts", "output");
if (!fs.existsSync(OUTPUT_DIR)) {
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

interface TrackWithLinks {
	movement: string;
	movementTitle: string;
	title: string;
	artist: string;
	links: StreamingLink[];
	saved: boolean;
}

// Extract all tracks from album data with empty streaming links
const allTracks: TrackWithLinks[] = [];

for (const movement of albumData) {
	for (const track of movement.tracks) {
		allTracks.push({
			movement: movement.number,
			movementTitle: movement.title,
			title: track.title,
			artist: track.artist,
			links: [], // Will be populated later
			saved: false,
		});
	}
}

// Path to save the JSON file
const outputJsonPath = path.join(OUTPUT_DIR, "track-links.json");

// Initialize or load existing JSON file
let savedTracks: TrackWithLinks[] = [];
if (fs.existsSync(outputJsonPath)) {
	try {
		savedTracks = JSON.parse(fs.readFileSync(outputJsonPath, "utf-8"));
		console.log(`Loaded ${savedTracks.length} previously saved tracks.`);

		// Update allTracks with saved data
		for (const savedTrack of savedTracks) {
			const matchingTrack = allTracks.find(
				(t) => t.title === savedTrack.title && t.artist === savedTrack.artist,
			);
			if (matchingTrack) {
				matchingTrack.links = savedTrack.links;
				matchingTrack.saved = true;
			}
		}
	} catch (error) {
		console.error("Error loading saved tracks:", error);
	}
}

// Function to open browser with search URLs
function openBrowserForTrack(track: TrackWithLinks) {
	const searchLinks = generateStreamingLinks({
		title: track.title,
		artist: track.artist,
	});

	console.log(`\nSearching for: ${track.title} by ${track.artist}`);
	console.log("Opening browser tabs for search results...");

	// Open each URL in the default browser
	for (const link of searchLinks) {
		const command =
			process.platform === "win32"
				? `start ${link.url}`
				: process.platform === "darwin"
					? `open "${link.url}"`
					: `xdg-open "${link.url}"`;

		exec(command, (error) => {
			if (error) {
				console.error(`Error opening browser: ${error}`);
			} else {
				console.log(`Opened ${link.platform} search`);
			}
		});
	}

	return searchLinks;
}

// Interface for user input
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Function to prompt for and save links for a track
async function promptForLinks(track: TrackWithLinks): Promise<void> {
	return new Promise((resolve) => {
		if (track.saved) {
			console.log(
				`Track "${track.title}" already has saved links. Skip? (y/n)`,
			);
			rl.question("> ", (answer) => {
				if (answer.toLowerCase() === "y") {
					resolve();
					return;
				}
				collectLinks();
			});
		} else {
			collectLinks();
		}

		function collectLinks() {
			const searchLinks = openBrowserForTrack(track);
			track.links = [...searchLinks]; // Initialize with search links

			console.log(
				"\nAfter finding the correct links, please enter them below:",
			);

			askForLink("Spotify");

			function askForLink(platform: string) {
				rl.question(
					`Enter ${platform} URL (or press Enter to skip): `,
					(url) => {
						if (url?.trim()) {
							// Update or add the link
							const existingLinkIndex = track.links.findIndex(
								(l) => l.platform.toLowerCase() === platform.toLowerCase(),
							);

							if (existingLinkIndex >= 0) {
								track.links[existingLinkIndex] = {
									platform: platform.toLowerCase(),
									url: url.trim(),
									isOfficial: true,
								};
							} else {
								track.links.push({
									platform: platform.toLowerCase(),
									url: url.trim(),
									isOfficial: true,
								});
							}
						}

						if (platform === "Spotify") {
							askForLink("YouTube");
						} else if (platform === "YouTube") {
							askForLink("appleMusic");
						} else {
							// All platforms done, save and move to next track
							track.saved = true;
							saveCurrentState();
							resolve();
						}
					},
				);
			}
		}
	});
}

// Save current state to JSON file
function saveCurrentState() {
	fs.writeFileSync(outputJsonPath, JSON.stringify(allTracks, null, 2));
	console.log("Progress saved to track-links.json");
}

// Main function to process all tracks
async function processAllTracks() {
	for (let i = 0; i < allTracks.length; i++) {
		console.log(
			`\nTrack ${i + 1}/${allTracks.length}: ${allTracks[i].title} by ${allTracks[i].artist}`,
		);
		console.log(
			`From Movement ${allTracks[i].movement}: ${allTracks[i].movementTitle}`,
		);

		await promptForLinks(allTracks[i]);
	}

	// Generate final output
	generateOutputFile();

	console.log("\nAll tracks processed. Exiting...");
	rl.close();
}

// Generate final TypeScript file with updated tracks
function generateOutputFile() {
	const outputTsPath = path.join(OUTPUT_DIR, "updated-album-data.ts");

	// Create a deep copy of the album data
	const updatedAlbumData = JSON.parse(JSON.stringify(albumData));

	// Update tracks with collected links
	for (const movement of updatedAlbumData) {
		for (const track of movement.tracks) {
			const savedTrack = allTracks.find(
				(t) => t.title === track.title && t.artist === track.artist && t.saved,
			);

			if (savedTrack && savedTrack.links.length > 0) {
				track.streamingLinks = savedTrack.links;
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
}

// Handle termination
process.on("SIGINT", () => {
	console.log("\nProcess interrupted. Saving current progress...");
	saveCurrentState();
	process.exit(0);
});

// Start processing
processAllTracks().catch((error) => {
	console.error("Error processing tracks:", error);
	saveCurrentState();
	rl.close();
});
