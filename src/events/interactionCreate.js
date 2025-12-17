import { logger } from "../services/logger.js";

export default (client, { commandsByName }) => {
	client.on("interactionCreate", async (interaction) => {
		if (!interaction.isChatInputCommand()) return;

		const command = commandsByName.get(interaction.commandName);
		if (!command) {
			logger.warn("Unknown command:", interaction.commandName);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (err) {
			logger.error(err);

			const msg = "Something went wrong running that command.";
			if (interaction.deferred || interaction.replied) {
				await interaction.followUp({ content: msg, ephemeral: true }).catch(() => {});
			} else {
				await interaction.reply({ content: msg, ephemeral: true }).catch(() => {});
			}
		}
	});
};
