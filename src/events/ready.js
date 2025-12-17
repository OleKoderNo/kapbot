import { logger } from "../services/logger.js";

export default (client) => {
	client.once("ready", () => {
		logger.info(`Logged in as ${client.user.tag}`);
	});
};
