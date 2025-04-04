#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { movements } from "../lib/data";
import type { Movement, Track } from "../lib/types";

// Path to data file
const DATA_FILE_PATH = path.join(process.cwd(), "lib", "data.ts");

/**
 * Convert HTML to Markdown
 */
async function htmlToMarkdown(html: string): Promise<string> {
	const processor = unified()
		.use(rehypeParse, { fragment: true }) // Parse HTML as a fragment
		.use(rehypeRemark) // Convert to markdown AST
		.use(remarkStringify); // Convert to markdown string

	const result = await processor.process(html);
	return String(result);
}

/**
 * Clean up markdown by removing extra newlines and whitespace
 */
function cleanMarkdown(markdown: string): string {
	return markdown
		.trim()
		.replace(/\n{3,}/g, "\n\n") // Replace 3+ newlines with 2
		.replace(/^\s+/gm, "") // Remove leading whitespace on each line
		.replace(/\n+$/g, ""); // Remove trailing newlines
}

/**
 * Process the content field of a movement
 */
async function processMovement(movement: Movement): Promise<Movement> {
	// Make a deep copy to avoid mutating the original
	const updatedMovement = { ...movement };

	// Convert the content field from HTML to Markdown if it exists
	if (updatedMovement.content) {
		const markdown = await htmlToMarkdown(updatedMovement.content);
		updatedMovement.content = cleanMarkdown(markdown);
	}

	// Process any description fields that might contain HTML
	if (updatedMovement.description?.includes("<")) {
		const markdown = await htmlToMarkdown(updatedMovement.description);
		updatedMovement.description = cleanMarkdown(markdown);
	}

	// Process tracks
	if (updatedMovement.tracks) {
		updatedMovement.tracks = await Promise.all(
			updatedMovement.tracks.map(async (track) => {
				return await processTrack(track);
			}),
		);
	}

	return updatedMovement;
}

/**
 * Process the track description field
 */
async function processTrack(track: Track): Promise<Track> {
	// Make a deep copy to avoid mutating the original
	const updatedTrack = { ...track };

	// Convert the description field from HTML to Markdown if it contains HTML
	if (updatedTrack.description?.includes("<")) {
		const markdown = await htmlToMarkdown(updatedTrack.description);
		updatedTrack.description = cleanMarkdown(markdown);
	}

	return updatedTrack;
}

/**
 * Main function to process all data
 */
async function processData() {
	console.log("Starting HTML to Markdown conversion...");

	// Create a deep copy of the album data
	const updatedAlbumData = JSON.parse(JSON.stringify(movements));

	// Process each movement
	for (let i = 0; i < updatedAlbumData.length; i++) {
		console.log(
			`Processing movement ${i + 1}/${updatedAlbumData.length}: ${updatedAlbumData[i].title}`,
		);
		updatedAlbumData[i] = await processMovement(updatedAlbumData[i]);
	}

	// Read the current data.ts file
	const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");

	// Create a backup of the original file
	const backupPath = `${DATA_FILE_PATH}.html-backup`;
	fs.writeFileSync(backupPath, fileContent);
	console.log(`✅ Backup created at ${backupPath}`);

	// Replace the albumData in the file with the updated version
	const updatedContent = fileContent.replace(
		/export const movements: Movement\[\] = \[([\s\S]+?)\];/,
		`export const movements: Movement[] = ${JSON.stringify(updatedAlbumData, null, 2)};`,
	);

	// Write the updated content back to the file
	fs.writeFileSync(DATA_FILE_PATH, updatedContent);
	console.log(
		`✅ Successfully updated ${DATA_FILE_PATH} with Markdown content`,
	);

	console.log("HTML to Markdown conversion complete!");
}

// Run the script
processData().catch((error) => {
	console.error("Error processing data:", error);
	process.exit(1);
});
