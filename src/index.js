import { createClient } from "./client/createClient.js";
import { ENV } from "./config/env.js";
import { registerEvents } from "./events/index.js";
import { loadCommands } from "./commands/index.js";

const client = createClient();

const { commandsByName } = await loadCommands();
registerEvents(client, { commandsByName });

await client.login(ENV.token);
