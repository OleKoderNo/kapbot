import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("pokefact")
	.setDescription("Get a random pokéfact");

export const meta = {};
