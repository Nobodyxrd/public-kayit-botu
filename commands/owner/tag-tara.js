const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')
const { MessageEmbed , MessageButton } = require('discord.js')

module.exports = {
    name: "tag-tara",
    aliases: ['ttara' , 't-tara' , 'tara' , 'tagtara'], 
    async execute(client , message , args) {

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
        .setFooter({text: config.bot.footer})
  
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.staffroles.OwnerRoles)) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Maalesef Yetkin Yetersiz.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));

        let rol = config.register.TaglıRolü 
        let tag = config.register.isimTag
        let tag2 = config.register.EtiketTag
        let taglılar = message.guild.members.cache.filter(s => s.user.discriminator === tag2 || s.user.username.includes(tag) && !s.roles.cache.has(rol)).forEach(m => m.roles.add(rol))
    message.reply({ embeds: [embed.setDescription(`
${emoji.nbdy_onay} Kullanıcı adında  \`${config.register.isimTag ? config.register.isimTag[0] : "bulunmuyor"}\` veya etiketinde \`${config.register.EtiketTag ? `#${config.register.EtiketTag}` :"bulunmuyor"}\` bulunduran üyelere taglı rolü verildi.
`)] }).then(message.react(emoji.nbdy_onay)).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

    }
}

  
