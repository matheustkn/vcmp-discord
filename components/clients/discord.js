    // jshint esversion: 11
const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes } = require('discord.js');

    // message content must be enable on discord developer panel
const client        = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

    // exporting client
module.exports = {
    client,
    EmbedBuilder,
    REST,
    Routes
};