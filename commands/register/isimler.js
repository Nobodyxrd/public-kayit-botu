const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const emoji = require('../../configs/emojis.json')
const config = require('../../configs/config.json')

module.exports = {
    name: 'isimler',
    aliases: ["names", "nicknames"],
  
    async execute(client, message, args){
        var member = message.mentions.users.first() || message.guild.members.cache.get(args[0])

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
        .setFooter({text: config.bot.footer})
  
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.staffroles.KayitYetkiliRole)) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Maalesef Yetkin Yetersiz.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!member) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Geçerli bir kullanıcı belirtmelisin!`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let names = db.get(`isimler_${member.id}`);
        let kke = db.get(`kke_${member.id}`);
        if (!names) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} ${member} kullanıcısının isim geçmişi yok.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));

        
        const newembed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})}) 
        .setFooter({text: config.bot.footer})
        .setDescription(`
${member} Kullanıcının daha önce ki isimleri     
 
${names.map((data, n) => `**${n + 1}.** ${data}`).join("\n")}
        
${emoji.revusome} Son Güncellenme Tarihi: <t:${Math.floor(Date.now() / 1000)}:R>
        `)


        message.reply({embeds: [newembed]}).then(message.react(emoji.nbdy_onay))


        
    }
}