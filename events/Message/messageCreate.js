const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')
const {Client , Message , MessageEmbed} = require('discord.js')

module.exports = {
    name: "messageCreate",

    async execute(message , client , Discord) {

    if (!message.content.toLowerCase().startsWith(config.bot.prefix) || message.author.bot) return;
    let args = message.content.substring(config.bot.prefix.length).trim().split(" "); 
    let commandName = args[0].toLowerCase() 

    args = args.splice(1) 

    let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        try {
            cmd.execute(client, message, args);
            client.channels.cache.find(x => x.name == "command_log").send(`${emoji.kirmiziok} \`(${message.member.user.tag})\` kullanıcısı <#${message.channel.id}> Kanalında \`${config.bot.prefix}${commandName}\` komundunu kullandı`)
        } catch (error) {
            
        }
        }
        
    }
