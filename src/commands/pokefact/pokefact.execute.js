import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const factsPath = path.join(__dirname, "../../data/pokefacts.json");
const FUN_FACTS = JSON.parse(fs.readFileSync(factsPath, "utf8"));

export async function execute(interaction) {
	if (!Array.isArray(FUN_FACTS) || FUN_FACTS.length === 0) {
		await interaction.reply({
			content: "No poké facts available right now",
			ephemeral: true,
		});
		return;
	}

	const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];

	await interaction.reply(`🧠 **Poké Fact:** ${randomFact}`);
}
