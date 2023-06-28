const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')
const {Client} = require('discord.js')

module.exports = {
    name: "interactionCreate",
    async execute(interaction , client) {

        const member = await client.guilds.cache.get(config.bot.sunucuid).members.fetch(interaction.member.user.id)
        if (!member) return;
      
        if (interaction.customId === "süpheli") {
          if (!member.roles.cache.has(config.register.şüpheliRolü)) {
          await interaction.reply({ content: `Şüpheli Hesap değilsiniz.`, ephemeral: true });
        return }
      
       let guvenilirlik = Date.now() - member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7;
      
       if (guvenilirlik) {
        await interaction.reply({ content: `Hesabınız (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) tarihinde oluşturulmuş şüpheli kategorisinden çıkmaya uygun değildir.`, ephemeral: true });
      } else {
        await interaction.reply({ content: `7 gün süreniz dolduğu için karantinadan çıkarıldınız.`, ephemeral: true });
        await member.roles.add(config.register.kayitsiz) && member.roles.remove(config.register.şüpheliRolü)
      } 
      }
      }
      
    }
