import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadJsFiles } from "../utils/loadFiles.js";
import { logger } from "../services/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands() {
	const commandsDir = path.join(__dirname);

	const files = await loadJsFiles(commandsDir);

	const commandsByName = new Map();
	const commandData = [];

	// convention: each command has *.command.js + *.execute.js
	const commandFiles = files.filter((f) => f.endsWith(".command.js"));

	for (const commandUrl of commandFiles) {
		const mod = await import(commandUrl);
		const data = mod.data;

		if (!data?.name) {
			logger.warn("Skipping command with no data.name:", commandUrl);
			continue;
		}

		// Resolve execute module next to the command file
		const executeUrl = commandUrl.replace(".command.js", ".execute.js");
		const execMod = await import(executeUrl);

		if (typeof execMod.execute !== "function") {
			logger.warn(`Skipping ${data.name}: missing execute() in ${executeUrl}`);
			continue;
		}

		commandsByName.set(data.name, {
			data,
			execute: execMod.execute,
			meta: mod.meta ?? {},
		});

		commandData.push(data.toJSON());
	}

	logger.info(`Loaded ${commandsByName.size} commands.`);
	return { commandsByName, commandData };
}
