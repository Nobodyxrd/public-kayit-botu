const db = require('quick.db');
const Discord = require("discord.js");
const moment = require("moment");
const limit = new Map();
moment.locale("tr");
const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')

module.exports = {
    name: "panel",
    async execute(client , message , args) {

        if (message.guild === null) {
            return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
          } else if (!config.bot.BotDeveloper.includes(message.author.id)) {
            return message.reply({ content: `${emoji.nbdy_red} Bot developerı olmadığın için komundu kullanamazsın.`, ephemeral: true })
          } else {  


        let button1 = new Discord.MessageButton()
        .setStyle('SUCCESS')
        .setLabel('Üzerinizde ki Roller')
        .setCustomId('rol')
    
        let button2 = new Discord.MessageButton()
        .setStyle('SUCCESS')
        .setLabel('Sunucu Bilgi')
        .setCustomId('sunucu')  
  
        let button3 = new Discord.MessageButton()
        .setStyle('SUCCESS')
        .setLabel('Kullanıcı')
        .setCustomId('uye')  
  
  
        let button4 = new Discord.MessageButton()
        .setStyle('SUCCESS')
        .setLabel('Kayıtsız')
        .setCustomId('kayıtsız')
    
       
    
    
        let row = new Discord.MessageActionRow()
            .addComponents(button1, button2, button3, button4)
        
      
    
        message.channel.send({ content:`

Merhaba \`${message.guild.name}\` sunucusu içerisi yapmak istediğiniz işlem veya ulaşmak istediğiniz bilgi için gerekli butonlara tıklamanız yeterli olucaktır!

**1:** \`Üzeriniz de bulunan tüm rolleri görüntülersiniz.\`

**2:** \`Sunucu hakkında detaylı bilgi için tıkla.\`

**3:** \`Sunucuya giriş tarihinizi gösterir.\` 

**4:** \`Sizi kayıtsıza atar ihtiyacınız yoksa kullanmayınız.\`

\`\`\`fix
NOT: kayıtsıza butonunu ihtiyacınız yoksa kullanmayınız ban sebebidir!\`\`\`


        `, components: [row]  }).then(message.react(emoji.nbdy_onay))
    
    
    
    
      }
  
    }
}
