import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export async function loadJsFiles(dirAbsPath) {
	const out = [];

	const walk = (dir) => {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) walk(full);
			else if (entry.isFile() && (full.endsWith(".js") || full.endsWith(".mjs"))) out.push(full);
		}
	};

	walk(dirAbsPath);

	// stable order helps debugging
	out.sort((a, b) => a.localeCompare(b));
	return out.map((p) => pathToFileURL(p).href);
}
