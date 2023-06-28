const { Collection } = require('discord.js');
const fs = require('fs')

module.exports = (client , Discord) => {
    const commandFolders = fs.readdirSync('./commands');
    for(const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(files => files.endsWith('.js'));
        for(const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            console.log(`[NOBODY-COMMANDS] ${command.name} komundu yüklendi.`)
            client.commands.set(command.name , command)
        }        
    }        
}        

