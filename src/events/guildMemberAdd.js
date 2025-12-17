import { Events } from "discord.js";
import { logger } from "../services/logger.js";

export default (client) => {
	client.on(Events.GuildMemberAdd, async (member) => {
		logger.info(`Member joined: ${member.user.tag}`);

		// Try system channel first
		const channel =
			member.guild.systemChannel ??
			member.guild.channels.cache.find(
				(c) => c.isTextBased() && c.permissionsFor(member.guild.members.me)?.has("SendMessages")
			);

		if (!channel) return;

		await channel.send(`👋 Welcome **${member.user.username}** to **${member.guild.name}**!`);
	});
};
