const { MessageEmbed } = require("discord.js");
const config = require("../../configs/config.json")
const emoji = require("../../configs/emojis.json")
const db = require("quick.db");

module.exports = {
    name: 'kke',
    aliases: ["kayıtçı"],

    async execute(client, message, args) {
        var member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        

        const embed = new MessageEmbed() 
        .setColor("RANDOM")
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})}) 
        .setFooter({text: config.bot.footer})
  
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.staffroles.OwnerRoles)) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Maalesef Yetkin Yetersiz.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!member) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Geçerli bir kullanıcı belirtmelisin!`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let kke = db.get(`kke_${member.id}`);
        if (!kke) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Bu kullanıcı daha önce sunucumuza kayıt olmamış!`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        message.reply({ embeds: [embed.setDescription(`
${member} kullanıcısının kayıt görevlisi:
        
${kke.map((data, n) => `**${n + 1}.**${data}`).join("\n")}

${emoji.revusome} Son Güncellenme Tarihi: <t:${Math.floor(Date.now() / 1000)}:R>
`)] }).then(message.react(emoji.nbdy_onay))
    }
}