import ready from "./ready.js";
import interactionCreate from "./interactionCreate.js";

export function registerEvents(client, ctx) {
	ready(client);
	interactionCreate(client, ctx);
}
