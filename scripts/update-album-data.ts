#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

// Paths
const OUTPUT_DIR = path.join(process.cwd(), "scripts", "output");
const ALBUM_DATA_PATH = path.join(process.cwd(), "lib", "data.ts");
const UPDATED_DATA_PATH = path.join(OUTPUT_DIR, "updated-album-data.ts");

// Check if updated data exists
if (!fs.existsSync(UPDATED_DATA_PATH)) {
	console.error(
		"❌ Updated album data not found. Please run the auto-links script first.",
	);
	process.exit(1);
}

// Read the files
console.log("Reading files...");
const albumDataContent = fs.readFileSync(ALBUM_DATA_PATH, "utf-8");
const updatedDataContent = fs.readFileSync(UPDATED_DATA_PATH, "utf-8");

// Extract the updated album data
const updatedDataMatch = updatedDataContent.match(
	/export const updatedAlbumData = ([\s\S]+);/,
);
if (!updatedDataMatch || !updatedDataMatch[1]) {
	console.error("❌ Failed to extract updated album data.");
	process.exit(1);
}

// The updated album data as a string
const updatedAlbumDataStr = updatedDataMatch[1];

// Replace the album data in the original file
console.log("Updating the main data.ts file...");
const updatedContent = albumDataContent.replace(
	/export const albumData: Movement\[\] = \[([\s\S]+?)\];/,
	`export const albumData: Movement[] = ${updatedAlbumDataStr};`,
);

// Create a backup of the original file
const backupPath = `${ALBUM_DATA_PATH}.bak`;
fs.writeFileSync(backupPath, albumDataContent);
console.log(`✅ Backup created at ${backupPath}`);

// Write the updated content
fs.writeFileSync(ALBUM_DATA_PATH, updatedContent);
console.log(`✅ Successfully updated ${ALBUM_DATA_PATH} with streaming links`);

console.log("Done!");
