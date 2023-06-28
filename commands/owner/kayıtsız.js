const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')
const { MessageEmbed , MessageActionRow, MessageButton } = require('discord.js')


module.exports = {
    name: "kayıtsız",
    aliases: ['kayitsiz'],
    async execute(client , message , args) {


        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})}) 
        .setFooter({text: config.bot.footer})
  
        const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        if (uye.roles.cache.has(config.register.kayitsiz)) return message.reply({embeds: [embed.setDescription(`${emoji.nbdy_unlem} kullanıcı zaten kayıtsız bu işlemi bu kullanıcıda uygulayamazsın.`)]}).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.staffroles.OwnerRoles)) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Maalesef Yetkin Yetersiz.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if(uye.user.bot) return message.reply({embeds: [embed.setDescription(`${emoji.nbdy_unlem} Botları kayıtsıza atamazsınız.`)]}).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (uye.id == message.member.id) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Kendinizi kayıtsıza atamazsınız.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));

  

    var kayitsizat = new MessageButton()
    .setLabel(`kayıtsız'a at`)
    .setCustomId("kayitsiz")
    .setStyle("SUCCESS")
    .setEmoji('915754671728132126')

    var iptalet = new MessageButton()
    .setLabel("İşlemi iptal Et!")
    .setCustomId("iptal")
    .setStyle("DANGER")
    .setEmoji('920412153712889877')

    const row = new MessageActionRow()
    .addComponents([kayitsizat , iptalet])




    let msg = await message.channel.send({embeds: [embed.setDescription(`${uye} kullanıcısını <@&${config.register.kayitsiz} atmak istediğine emin misin? **30 saniye** içinde butonlardan secimini yapmalsın!`)] , components: [row]}).then(message.react(emoji.nbdy_onay))

    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

        if(button.customId === "kayitsiz") {
            await button.deferUpdate();
            await uye.roles.set([config.register.kayitsiz]).catch()
            await uye.setNickname(config.register.JoinName);
     client.channels.cache.find(x => x.name == "kayıtsız_log").send({embeds: [embed.setDescription(` 
${uye} kullanıcısı ${message.author} - \`${message.author.id}\` Tarafından **kayıtsız'a atıldı!**  

**Atılan Kullanıcı:** ${uye} - \`${uye.id}\`
**Atan Yetkili:** ${message.author} - \`${message.author.id}\`
            `)]})

            msg.edit({
                embeds: [embed.setDescription(`${emoji.nbdy_onay} ${uye} - \`${uye.id}\` Kullanıcısı basşrıyla ${message.author} - \`${message.author.id}\` Tarafından kayıtsız'a atıldı`)],
                components: []
            })
        }

        if(button.customId === "iptal") {

            msg.edit({
                embeds: [embed.setDescription(`${emoji.nbdy_onay} kayıtsız atma işlemi Başarıyla ${message.author} Tarafından iptal edildi!`)],
                components: []
            })

        }
    
    
    })
}
}
