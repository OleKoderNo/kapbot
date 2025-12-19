import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve JSON once at module load (fast & clean)
const factsPath = path.join(__dirname, "../../data/funfacts.json");
const FUN_FACTS = JSON.parse(fs.readFileSync(factsPath, "utf8"));

export async function execute(interaction) {
	if (!Array.isArray(FUN_FACTS) || FUN_FACTS.length === 0) {
		await interaction.reply({
			content: "No fun facts available right now 😢",
			ephemeral: true,
		});
		return;
	}

	const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];

	await interaction.reply(`🧠 **Fun Fact:** ${randomFact}`);
}
