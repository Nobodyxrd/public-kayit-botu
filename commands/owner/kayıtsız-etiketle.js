const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const config = require("../../configs/config.json")
const emoji = require("../../configs/emojis.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");


module.exports = {
    name: "kayıtsız-etiketle",
    aliases: ["kayıtsızlar", "kayitsizlar" , "kayitsizetiketle" , "kayitsiz-etiketle",  "kayıtsızetiketle" , "kayitsizetiketle"],    async execute(client, message, args) {

      
        const buton = new MessageButton()
        .setStyle('SECONDARY')
        .setEmoji(`1122543056906895410`)
        .setDisabled(true)
        .setLabel(`sizde kayıt olun`)
        .setCustomId('buton')

        const row = new MessageActionRow()
        .addComponents([buton])
    
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
        .setFooter({text: config.bot.footer})

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.staffroles.OwnerRoles)) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Maalesef Yetkin Yetersiz.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));


        if (1 > 0 && limit.has(message.author.id) && limit.get(message.author.id) == 1) return message.channel.send(`${emoji.nbdy_unlem} Saatlik kayıtsız etiketleme sınırına ulaştınız`).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let role =  message.guild.roles.cache.find(rol => rol.id === config.register.kayitsiz)
        message.channel.send({content: `<@&${config.register.kayitsiz}> merhaba, sizi teyit kanallarına bekliyoruz. sizde **${message.guild.name}** kayıt olun. ${emoji.kalp}`, components: [row]}).then(message.react(emoji.nbdy_onay))
    if (1 > 0) {
      if (!limit.has(message.author.id)) limit.set(message.author.id, 1);
      else limit.set(message.author.id, limit.get(message.author.id) + 1);
      setTimeout(() => {
        if (limit.has(message.author.id)) limit.delete(message.author.id);
      }, 1000 * 60 * 60)
    }
  }
}
