const { Client, Collection, Intents } = require("discord.js");
const config = require('./configs/config.json')
const Discord = require('discord.js');
require('dotenv').config()
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
  ]
}); 

client.commands = new Collection();
client.cooldowns = new Collection();

['eventsHandler' , 'commandsHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client , Discord);
});





client.login(config.bot.token || process.env.token);

