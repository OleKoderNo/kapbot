import { REST, Routes } from "discord.js";
import { ENV } from "./config/env.js";
import { loadCommands } from "./commands/index.js";

const { commandData } = await loadCommands();

const rest = new REST({ version: "10" }).setToken(ENV.token);

await rest.put(Routes.applicationGuildCommands(ENV.clientId, ENV.guildId), { body: commandData });

console.log(`Deployed ${commandData.length} guild commands.`);
