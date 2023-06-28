const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')
const Discord = require('discord.js');
const {MessageEmbed} = require("discord.js");


module.exports = {
    name: "userUpdate",
    async execute(oldUser, newUser , client , message) {

        const guild = client.guilds.cache.get(config.bot.sunucuid)
        const role = guild.roles.cache.find(roleInfo => roleInfo.id === config.register.TaglıRolü)
        const ownerr = client.users.cache.get(config.bot.BotDeveloper);
        const member = guild.members.cache.get(newUser.id)
        let taglıüye = await guild.members.cache.filter(member => member.user.username.includes(config.register.isimTag)).size
        const embed = new MessageEmbed().setTimestamp().setFooter({text: `Sunucumuz da toplam ${taglıüye} taglı var.`}).setColor('#ff1d1d')
        const hembed = new MessageEmbed().setTimestamp().setFooter({text: `Sunucumuz da toplam ${taglıüye} taglı var.`}).setColor('#14ff00')


        if (newUser.username !== oldUser.username) {
            if (oldUser.username.includes(config.register.isimTag) && !newUser.username.includes(config.register.isimTag)) {
                member.roles.remove(config.register.TaglıRolü)
                client.channels.cache.find(x => x.name == "tag_log").send({ embeds: [embed.setDescription(`${newUser} isminden \`${config.register.isimTag}\` çıkartarak ailemizden ayrıldı! \n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` - Sonra ki kullanıcı adı: \`${newUser.tag}\``)]})
            } else if (!oldUser.username.includes(config.register.isimTag) && newUser.username.includes(config.register.isimTag)) {
                member.roles.add(config.register.TaglıRolü)
                client.channels.cache.get(config.kanallar.SohbetKanali).send(`${newUser} kullanıcısı tagımızı (**${config.register.isimTag}**) alarak ailemize katıldı.`)
                client.channels.cache.find(x => x.name == "tag_log").send({ embeds: [hembed.setDescription(`${newUser} ismine \`${config.register.isimTag}\` alarak ailemize katıldı! \n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` - Sonra ki kullanıcı adı: \`${newUser.tag}\``)]})
            }
        }
      
      
        if (newUser.discriminator !== oldUser.discriminator) {
            if (oldUser.discriminator == config.register.EtiketTag && newUser.discriminator !== config.register.EtiketTag) {
                member.roles.remove(role)
                client.channels.cache.find(x => x.name == "tag_log").send({ embeds: [embed.setDescription(`${newUser} kullanıcısı etiket tagımızı çıkartarak ailemizden ayrıldı! \n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` - Sonra ki kullanıcı adı: \`${newUser.tag}\``)]})
            } else if (oldUser.discriminator !== config.register.EtiketTag && newUser.discriminator == config.register.EtiketTag) {
                member.roles.add(role)
                client.channels.cache.find(x => x.name == "tag_log").send({ embeds: [hembed.setDescription(`${newUser} kullanıcısı etiket tagımızı alarak ailemize katıldı! \n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` - Sonra ki kullanıcı adı: \`${newUser.tag}\``)]})
                client.channels.cache.get(config.kanallar.SohbetKanali).send(`${newUser} kullanıcısı etiket tagımızı alarak ailemize katıldı.`)
            }
        }
    }
    
}