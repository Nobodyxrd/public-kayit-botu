const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')


module.exports = {
    name: "fakekatıl",
    aliases: ["fakekatil" , "fake-katıl" , "fake-katil" , "fakejoin" , "fake-join"],
    async execute(client , message , args) {


        if (message.guild === null) {
            return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
          } else if (!config.bot.BotDeveloper.includes(message.author.id)) {
            return message.reply({ content: `${emoji.nbdy_onay} Bot developerı olmadığın için bu komundu kullanamazsın.`, ephemeral: true })
          } else {


    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author))

    }
}
}