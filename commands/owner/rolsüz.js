const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "rolsüz",
    async execute(client , message , args) {
        
        let nobody = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
        .setFooter({text: config.bot.footer})
  
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.staffroles.OwnerRoles)) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Maalesef Yetkin Yetersiz.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
          if (args[0] == "ver") {
            nobody.forEach(r => { 
                r.roles.add(config.register.kayitsiz)
            });
            message.reply({ embeds: [embed.setDescription("Sunucu da rolü olmayan \`"+ nobody.size +"\` kullanıcıya **kayıtsız rolü verildi.**")] }).then(message.react(emoji.nbdy_onay)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        } else if (!args[0]) {
            message.reply({ embeds: [embed.setDescription("Sunucu da rolü olmayan \`"+ nobody.size +"\` kullanıcı var rolsüzlere rol vermek icin \`rolsüz ver\` **yazmanız yeterlidir.**")] }).then(message.react(emoji.nbdy_onay)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        }
    }
}
