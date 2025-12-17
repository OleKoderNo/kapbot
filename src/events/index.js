import ready from "./ready.js";
import interactionCreate from "./interactionCreate.js";
import guildMemberAdd from "./guildMemberAdd.js";

export function registerEvents(client, ctx) {
	ready(client);
	interactionCreate(client, ctx);
	guildMemberAdd(client);
}
