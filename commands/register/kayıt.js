const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const moment = require("moment");
const db = require("quick.db");
require("moment-duration-format");
const config = require("../../configs/config.json")
const emoji = require("../../configs/emojis.json")


module.exports = {
    name: "kayıt",
    aliases: ["k" , "kayit" , "erkek" , "kadin" , "kadın" , "erkekk" , "e"],
    async execute(client, message, args) {


        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
        .setFooter({text: config.bot.footer})

        const hembed = new MessageEmbed()
        .setColor('#ffffac')
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
        .setFooter({text: config.bot.footer})



        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.staffroles.KayitYetkiliRole)) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Maalesef Yetkin Yetersiz.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
      var name = args[1]
    const age = args[2]


    const kayitKanali = config.kanallar.KayitKanali
    if (!member) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Geçerli bir üye belirtmelisin!`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (member.roles.cache.has(config.register.ekrekRolü) || member.roles.cache.get(config.register.KadinRolü)) return message.reply({embeds: [embed.setDescription(`Kayıtlı Bir Kullanıcıyı Tekrar Kayıt Edemezsin.`)]}).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if(member.user.bot) return message.reply({embeds: [embed.setDescription(`${emoji.nbdy_unlem} Bir Bot'a İşlem Uygulayamazsın.`)]}).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if(message.member.roles.highest.position <= member.roles.highest.position)  return message.channel.send({embeds: [embed.setDescription(`Senden yüksekte olan birisini kayıt edemezsin.`)]}).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (!name) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Geçerli bir isim belirtmelisin.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (!age) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Geçerli bir yaş belirtmelisin.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (isNaN(age)) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Belirtilen yaş geçerli rakamlardan oluşmalı.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if(message.author.id === member.id) return message.channel.send({embeds: [embed.setDescription(`${emoji.nbdy_unlem} Kendini kayıt edemezsin.`)]}).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (age < config.register.minimumyaş) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Kullanıcı için belirtilen yaş minimum yaştan küçük.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    const names = db.get(`isimler_${member.id}`)

        
        var Erkek = new MessageButton()
        .setCustomId("erkek")
        .setStyle("SECONDARY")
        .setEmoji('1117125911637139626')
    
    
        var Kadın = new MessageButton()
        .setCustomId("kadin")
        .setStyle("SECONDARY")
        .setEmoji('1117125848189915188')
    
        var Bb = new MessageButton()
        .setCustomId("iptal")
        .setEmoji('1117125173385121802')
        .setStyle("SECONDARY")
    
        const row = new MessageActionRow()
        .addComponents([Erkek, Kadın, Bb])

        var hg = new MessageButton()
        .setCustomId("hoşgeldin")
        .setLabel(`hoşgeldin ${name}`)
        .setStyle("SECONDARY")
        .setDisabled(true)
        .setEmoji('1117130352826269780')

        const welcome = new MessageActionRow()
        .addComponents([hg])

        var tamam = new MessageButton()
        .setCustomId("tamamlandi")
        .setLabel(`kayıt Tamamlandı`)
        .setStyle("SECONDARY")
        .setDisabled(true)
        .setEmoji('1118708358183145575')

        const tammalandi = new MessageActionRow()
        .addComponents([tamam])


        var iptal = new MessageButton()
        .setCustomId("iptal")
        .setLabel(`işlem iptal edildi`)
        .setStyle("SECONDARY")
        .setDisabled(true)
        .setEmoji('1118708358183145575')

        const iptaledildi = new MessageActionRow()
        .addComponents([iptal])

    
        hembed.setDescription(`
${member.toString()} kullanıcının ismi \`${config.register.tagsymbol} ${name} ${config.register.symbol} ${age}\` olarak değiştirildi.
    
${emoji.nbdy_unlem} butonlarla iletişime geçerek kullanıcının cinsiyetini seçebilirsiniz. 

${emoji.kirmiziok} üyenin önceki isimlerine \`${config.bot.prefix}isimler <@Nobody/ID>\` komutuyla bakarak kayıt İşlemini gerçekliştirmeniz önelir.`)
    
        let msg = await message.channel.send({ embeds: [hembed], components: [row] });
        var filter = (button) => button.user.id === message.author.id;
       
        let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
        collector.on("collect", async (button) => {
    
          if(button.customId === "erkek") {
            await button.deferUpdate();
            const guild = message.guild
                if (!name) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisin!")] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
                if (!age) return message.reply({ embeds: [embed.setDescription("Geçerli bir yaş belirtmelisin!")] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
                if (isNaN(age)) return message.reply({ embeds: [embed.setDescription("Belirtilen yaş geçerli rakamlardan oluşsun!")] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
                if (age < config.register.minimumyaş) return message.reply({ embeds: [embed.setDescription("Kullanıcı için belirtilen yaş minimum yaştan küçük!")] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));

                let erkek = db.get(`erkek_${message.author.id}`) || 0;
                let kadın = db.get(`kadın_${message.author.id}`) || 0;
                let toplam = db.get(`toplam_${message.author.id}`) || 0;
                await guild.members.cache.get(member.id).setNickname(`${config.register.tagsymbol} ${name} ${config.register.symbol} ${age}`); 
                db.add(`erkek_${message.author.id}`, 1)
                db.add(`toplam_${message.author.id}`, 1)
                 const names = db.get(`isimler_${member.id}`)
                db.push(`isimler_${member.id}`, `\`${config.register.tagsymbol} ${name} ${config.register.symbol} ${age}\` (kayıt) (<@&${config.register.ekrekRolü}>) (${emoji.nbdy_man})  -  (${message.author}) \`(${message.author.id})\``);
                db.push(`kke_${member.id}`, `${message.author} - \`${message.author.id}\` - \`${moment(Date.now()).format("LLL")}\` (<@&${config.register.ekrekRolü}>) (${emoji.nbdy_man})`)
                await guild.members.cache.get(member.id).roles.add(config.register.ekrekRolü);
                await guild.members.cache.get(member.id).roles.remove(config.register.kayitsiz)
            const nobody = new MessageEmbed().setColor('RANDOM').setAuthor({name: message.member.displayName, iconURL: message.guild.iconURL({ dynamic: true})}).setFooter({text:(`Toplam kayıt: ${db.get(`toplam_${message.author.id}`) || 0} (${db.get(`kadın_${message.author.id}`) || 0} Kadın, ${db.get(`erkek_${message.author.id}`) || 0} Erkek)`) , iconURL: message.guild.iconURL({ dynamic: true})})
            if (!names) {
              nobody.setDescription(`${emoji.nbdy_man} Kullanıcının ismi \`${name} ${config.register.symbol} ${age}\` olarak değiştirildi ve <@&${config.register.ekrekRolü}> rolü verilerek kayıt edildi.`) 
            } else {
              nobody.setDescription(`${emoji.nbdy_man} Kullanıcının ismi \`${name} ${config.register.symbol} ${age}\` olarak değiştirildi ve <@&${config.register.ekrekRolü}> rolü verilerek kayıt edildi. \n\n ${emoji.kirmiziok} Kullanıcının toplamda **${names.length}** isim kayıtı görüntülendi. isimleri görüntülemek için \`${config.bot.prefix}isimler [Nobody/ID]\` komundunu kullanabilirsiniz.`) 
            }
            client.channels.cache.find(x => x.name == "kayıt_log").send({ embeds: [embed.setDescription(`${member} kullanıcısına ${message.author} tarafından <@&${config.register.ekrekRolü}> olarak kayıt edildi.
          
**Kullanıcı:** ${member} - \`(${member.id})\`
**İsim ve Yaşı:** \`${name} | ${age}\`
**Yetkili:** ${message.author} -  \`(${message.author.id})\`
**Cinsiyet:** <@&${config.register.ekrekRolü}> (${emoji.nbdy_man})     
**Tarih:** \`${moment(Date.now()).format("LLL")}\``)] });
        
      client.channels.cache.get(config.kanallar.SohbetKanali).send({content: `${emoji.tada} ${member} kullanıcısı sunucumuza kayıt oldu ona **Merhaba** diyelim!` , components: [welcome]})
        
        
    msg.edit({
      embeds : [nobody],
      components : [tammalandi]
    })
          
          }
    
      if(button.customId === "kadin") {
        await button.deferUpdate();
        const guild = message.guild
            if (!name) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisin!")] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
            if (!age) return message.reply({ embeds: [embed.setDescription("Geçerli bir yaş belirtmelisin!")] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
            if (isNaN(age)) return message.reply({ embeds: [embed.setDescription("Belirtilen yaş geçerli rakamlardan oluşsun!")] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
            if (age < config.register.minimumyaş) return message.reply({ embeds: [embed.setDescription("Kullanıcı için belirtilen yaş minimum yaştan küçük!")] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));

            await guild.members.cache.get(member.id).setNickname(`${config.register.tagsymbol} ${name} ${config.register.symbol} ${age}`); 
            db.add(`kadın_${message.author.id}`, 1)
            db.add(`toplam_${message.author.id}`, 1)
              const names = db.get(`isimler_${member.id}`)
            db.push(`isimler_${member.id}`, ` \`${config.register.tagsymbol} ${name} ${config.register.symbol} ${age}\` (kayıt) (<@&${config.register.KadinRolü}>) (${emoji.nbdy_girl})  -  (${message.author}) \`(${message.author.id})\``);
            db.push(`kke_${member.id}`, `${message.author} - \`${message.author.id}\` - \`${moment(Date.now()).format("LLL")}\` (<@&${config.register.KadinRolü}>) (${emoji.nbdy_girl})`)
            await guild.members.cache.get(member.id).roles.add(config.register.KadinRolü);
            await guild.members.cache.get(member.id).roles.remove(config.register.kayitsiz)
        const nobody = new MessageEmbed().setColor('RANDOM').setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })}).setFooter({text: (`Toplam kayıt: ${db.get(`toplam_${message.author.id}`) || 0} (${db.get(`kadın_${message.author.id}`) || 0} Kadın, ${db.get(`erkek_${message.author.id}`) || 0} Erkek)`) , iconURL: message.guild.iconURL({ dynamic: true})})
        if (!names) {
            nobody.setDescription(`${emoji.nbdy_girl} Kullanıcının ismi \`${name} ${config.register.symbol} ${age}\` olarak değiştirildi ve <@&${config.register.KadinRolü}> rolü verilerek kayıt edildi.`) 
        } else {
            nobody.setDescription(`${emoji.nbdy_girl} Kullanıcının ismi \`${name} ${config.register.symbol} ${age}\`olarak değiştirildi ve <@&${config.register.KadinRolü}> olarak kayıt edildi. \n\n ${emoji.kirmiziok} Kullanıcının toplamda **${names.length}** isim kayıtı görüntülendi. isimleri görüntülemek için \`${config.bot.prefix}isimler [Nobody/ID]\` komundunu kullanabilirsiniz`) 
        }
        client.channels.cache.find(x => x.name == "kayıt_log").send({ embeds: [embed.setDescription(`
${member} kullanıcısına ${message.author} tarafından <@&${config.register.KadinRolü}> olarak kayıt edildi. 
      
**Kullanıcı:** ${member} - \`(${member.id})\`
**İsim ve Yaşı:** \`${config.register.tagsymbol} ${name} ${config.register.symbol} ${age}\`
**Yetkili:** ${message.author} - \`(${message.author.id})\`
**Cinsiyet:** <@&${config.register.KadinRolü}> (${emoji.nbdy_girl})
**Tarih:** \`${moment(Date.now()).format("LLL")}\``)] });
    
        client.channels.cache.get(config.kanallar.SohbetKanali).send({content: `${emoji.tada} ${member} kullanıcısı sunucumuza kayıt oldu ona **Merhaba** diyelim!` , components: [welcome]})
    
    msg.edit({ 
      embeds: [nobody],
      components : [tammalandi]
    })  
    
        }
    
     if(button.customId === "iptal") {   
        await button.deferUpdate();
        const iptal = new MessageEmbed()
        .setDescription(`${emoji.nbdy_onay} ${member} kullanıcısının kayıt işlemi ${message.author} yetkilisi tarafından iptal edildi.`) 
        .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
        .setFooter({text: config.bot.footer})
        

    msg.edit({
      embeds: [iptal],
      components : [iptaledildi]  
    })  
        }
    
    
      })
    }
}
