import { Events } from "discord.js";
import { ENV } from "../config/env.js";
import { logger } from "../services/logger.js";

export default (client) => {
	client.on(Events.GuildMemberAdd, async (member) => {
		logger.info(`Member joined: ${member.user.tag}`);

		const channel = await member.guild.channels.fetch(ENV.welcomeChannelId).catch(() => null);
		if (!channel?.isTextBased()) return;

		const msg = await channel.send(
			`👋 Welcome ${member} to **${member.guild.name}**!\nMake yourself at home ⚓`
		);

		await msg.react("👋").catch(() => {});
	});
};
