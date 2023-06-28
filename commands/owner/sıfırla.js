const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const moment = require("moment");
const db = require("quick.db");
require("moment-duration-format");
const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')

module.exports = {
    name: "sıfırla",
    aliases: ["teyit-sıfırla", "isimler-sıfırla" , "teyit-sifirla" , "teyitsifirla", "teyitsıfırla" , "isimlersıfırla" , "sifirla"],
    async execute(client, message, args) { 

      const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
      .setFooter({text: config.bot.footer})

      if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.staffroles.OwnerRoles)) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Maalesef Yetkin Yetersiz.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    var Teyitler = new MessageButton()  
    .setLabel("Teyitlerini Sıfırla")
    .setCustomId("teyit_sıfırla")
    .setStyle("SUCCESS")
    .setEmoji('915754671728132126')


    var İsimler = new MessageButton()
    .setLabel("İsimlerini Sıfırla")
    .setCustomId("isim_sıfırla")
    .setStyle("SUCCESS")
    .setEmoji('915754671728132126')

    var Bb = new MessageButton()
    .setLabel("İşlemi iptal Et!")
    .setCustomId("iptal")
    .setStyle("DANGER")
    .setEmoji('920412153712889877')

    const row = new MessageActionRow()
    .addComponents([Teyitler, İsimler, Bb])


embed.setDescription(`
${emoji.kirmiziok} ${member.toString()} kullanıcısının hangi verisini sıfırlamak istiyorsanız butonlar ile etkileşime geçiniz.

${emoji.nokta} \`İsimlerini Sıfırla:\` **önceki Kayıtlı isim verilerini Sıfırlar.**
${emoji.nokta} \`Teyitlerini Sıfırla:\` **önceki bütün Kayıt teyitlerini Sıfırlar.** (${emoji.nbdy_man} , ${emoji.nbdy_girl})

\`\`\`fix
NOT: Bu işlem geri alınamaz!\`\`\`

Lütfen **30 saniye** içerisinde hangi Sıfırlamayı ${member.toString()} kullanıcısına yapacağınızı aşağıdaki butonlara tıklayarak cevaplayınız

${emoji.revusome} Gecen Süre: <t:${Math.floor(Date.now() / 1000)}:R>`)

    let msg = await message.channel.send({ embeds: [embed], components: [row] }).then(message.react(emoji.nbdy_onay))
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

      if(button.customId === "isim_sıfırla") {
        await button.deferUpdate();
        client.channels.cache.find(x => x.name == "veri_log").send({embeds: [embed.setDescription(`
${member.toString()} kullanıcısının isim geçmişi ${message.author} tarafından temizlendi

**isim geçmişi temizlenen:** ${member} - \`${member.id}\`
**isim geçmişini temizleyen yetkili:** ${message.author} - \`${message.author.id}\`
    `)]})
        let isimler = db.delete(`isimler_${member.id}`) || [];
        let kke = db.delete(`kke_${member.id}`) || [];
        const isim = new MessageEmbed()
      .setDescription(`${member.toString()} kullanıcısının isim geçmişi ${message.author} tarafından temizlendi!`)
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
      .setFooter({text: config.bot.footer})


msg.edit({ 
  embeds : [isim],
  components : []
})
      
      }

  if(button.customId === "teyit_sıfırla") {
    await button.deferUpdate();
    let erkek = db.delete(`erkek_${member.id}`) || [];
    let kadın = db.delete(`kadın_${member.id}`) || [];
    let toplam = db.delete(`toplam_${member.id}`) || [];

    client.channels.cache.find(x => x.name == "veri_log").send({embeds: [embed.setDescription(`
    ${member.toString()} kullanıcısının teyit geçmişi ${message.author} tarafından temizlendi
    
**teyit geçmişi temizlenen:** ${member} - \`${member.id}\`
**teyit geçmişi temizleyen yetkili:** ${message.author} - \`${message.author.id}\``)]})
    

    const teyit = new MessageEmbed()
    .setDescription(`${member.toString()} kullanıcısının teyit geçmişi ${message.author} tarafından başarıyla temizlendi.`) 
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
    .setFooter({text: config.bot.footer})


msg.edit({
  embeds: [teyit],
  components : []
})  

    }

 if(button.customId === "iptal") {   
    await button.deferUpdate();
    const iptal = new MessageEmbed()
    .setDescription(`${emoji.nbdy_onay} ${member} kullanıcısının verilerini sıfırlama işlemi ${message.author} tarafından iptal edildi.`) 
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
    .setFooter({text: config.bot.footer})


msg.edit({
  embeds: [iptal],
  components : []
})  
    }


  })
  }
};
