const db = require('quick.db')
const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')
const moment = require("moment");
const { MessageEmbed } = require('discord.js');
require('moment-duration-format');

module.exports = {
    name: "teyitlerim",
    aliases: ['kayitlarim' , "kayıtlarım" , "Kayıt.larım" , "kayit-larim" , "Kayitlarım" , "Kayıtlarim"],
    async execute(client , message , args) {

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
        .setFooter({text: config.bot.footer})
  
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.staffroles.KayitYetkiliRoles)) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Maalesef Yetkin Yetersiz.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
              var member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
            let erkek = db.get(`erkek_${message.author.id}`) || 0;
            let kadın = db.get(`kadın_${message.author.id}`) || 0;
            let toplam = db.get(`toplam_${message.author.id}`) || 0;
            message.reply({ embeds: [embed.setDescription(`  
${member} kullanıcısının **${message.guild.name}** Sunucusundaki Kayıt verileri.
     
${emoji.nbdy_man} Toplam Erkek: **${erkek}**
${emoji.nbdy_girl} Toplam Kadın: **${kadın}**
${emoji.kirmiziok} Toplam Kayıt: **${toplam}**

${emoji.revusome} Son Güncellenme Tarihi: <t:${Math.floor(Date.now() / 1000)}:R>`)] }).then(message.react(emoji.nbdy_onay))
        }
    }