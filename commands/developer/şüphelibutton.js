const emoji = require('../../configs/emojis.json')
const config = require('../../configs/config.json')


module.exports = {
    name: "şüphelibutton",
    aliases: ['süphelibutton' , 'süphelibuton' , 'süpheli-buton' , 'şüphelibuton' , 'şüpheli-button' , 'şüphelibuton' , 'süpheli-button'],
    async execute(client , message , args) {
    
           if (message.guild === null) {
            return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
          } else if (!config.bot.BotDeveloper.includes(message.author.id)) {
            return message.reply({ content: `${emoji.nbdy_red} Bot developerı olmadığın için bu komundu kullanamazsın.`, ephemeral: true }).then(message.react(emoji.nbdy_red))
          } else {
           
        
    client.api.channels(message.channel.id).messages.post({  
        data: {
          "content": `${emoji.Jail} Aşağıda ki düğmeden hesabınızın 7 gün süresini dolurmasına kalan süresini görüntüleyebilirsiniz ve tıklayarak şüpheliden çıkabilirsiniz.`, "components": [{
            "type": 1, "components": [
  
              { "type": 2, "style": 4, "custom_id": "süpheli", "label": "Hesap Kontrol", "emoji": { "id": "916734243328114718" } },
  
            ]
          }]
        }
      })
    }
  }
}
