const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')
const moment = require("moment");
require("moment-duration-format");



module.exports = {
    name: "perm",
    async execute(client , message , args) { 

  
      const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})}) 
      .setFooter({text: config.bot.footer})

      if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.staffroles.botcommanRole)) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Maalesef Yetkin Yetersiz.`)] }).then(message.react(emoji.nbdy_red)).then((e) => setTimeout(() => { e.delete(); }, 10000));

  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!uye) return message.reply({ embeds: [embed.setDescription(`${emoji.nbdy_unlem} Hatalı kullanım! doğru kullanım: \`${config.bot.prefix}perm @Nobody/ID\``)]});
  if(message.author.id === uye.id) return message.reply({embeds: [embed.setDescription(`${emoji.nbdy_unlem} Kendine Rol Veremezsin.`)], ephemeral: true })
  
  const perm = new MessageActionRow()
  .addComponents(
      new MessageSelectMenu()
          .setCustomId('perm')
          .setPlaceholder('menüyü kullanınız')
          .addOptions([
              {
                  label: 'Vip',
                  value: 'vip',
                  description: `${config.bot.footer}`,
                  emoji: '970343074150621215'
              },
              {
                  label: 'Müzisyen',
                  value: 'müzisyen',
                  description: `${config.bot.footer}`,
                  emoji: '1121491089514315906'
              },						
              {
                  label: 'Tasarımcı',
                  value: 'tasarımcı',
                  description: `${config.bot.footer}`,
                  emoji: '1121488904843956255'
              },
              {
                  label: 'Streamer',
                  value: 'streamer',
                  description: `${config.bot.footer}`,
                  emoji: '1121488891048886373'
              },
          ]),
  );
  
  const msg = await message.reply({ content : `${uye} kullanıcısına perm eklemek için aşağıdaki menüyü kullanınız`, components: [perm] });
  
  const filter = i => i.user.id == message.author.id 
  const collector = msg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 1, time: 20000 });
  collector.on("collect", async (interaction) => {
  
       if (interaction.values[0] === "vip") {
          uye.roles.cache.has(config.roles.vipRole) ? uye.roles.remove(config.roles.vipRole) : uye.roles.add(config.roles.vipRole);
          if(!uye.roles.cache.has(config.roles.vipRole)) {
            client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Vip** adlı rol verildi.`)]})
            msg.edit({ content:`${emoji.nbdy_onay} Başarıyla ${uye}, isimli kişiye **Vip** rolü verildi.`, components: [] });
          } else {
            client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Vip** adlı rol geri alındı.`)]})
            msg.edit({ content:`${emoji.nbdy_onay} Başarıyla ${uye}, isimli kişinin **Vip** rolü geri alındı.`, components: [] });
          };
       }
  
       if (interaction.values[0] === "müzisyen") {
          uye.roles.cache.has(config.roles.müzisyenRole) ? uye.roles.remove(config.roles.müzisyenRole) : uye.roles.add(config.roles.müzisyenRole);
          if(!uye.roles.cache.has(config.roles.müzisyenRole)) {
            client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Müzisyen** adlı rol verildi.`)]})
            msg.edit({ content:`${emoji.nbdy_onay} Başarıyla ${uye}, isimli kişiye **Müzisyen** rolü verildi.`, components: [] });
          } else {
            client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Müzisyen** adlı rol geri alındı.`)]})
            msg.edit({ content:`${emoji.nbdy_onay} Başarıyla ${uye}, isimli kişinin **Müzisyen** rolü geri alındı.`, components: [] });
          };
       }
  
      if (interaction.values[0] === "tasarımcı") {
          uye.roles.cache.has(config.roles.tasarımcıRole) ? uye.roles.remove(config.roles.tasarımcıRole) : uye.roles.add(config.roles.tasarımcıRole);
          if(!uye.roles.cache.has(config.roles.tasarımcıRole)) {
            client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Tasarımcı** adlı rol verildi.`)]})
            msg.edit({ content:`${emoji.nbdy_onay} Başarıyla ${uye}, isimli kişiye **Tasarımcı** rolü verildi.`, components: [] });
          } else {
            client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Tasarımcı** adlı rol geri alındı.`)]})
            msg.edit({ content:`${emoji.nbdy_onay} Başarıyla ${uye}, isimli kişinin **Tasarımcı** rolü geri alındı.`, components: [] });
          };
       }
  
      if (interaction.values[0] === "streamer") {
          uye.roles.cache.has(config.roles.streamerRole) ? uye.roles.remove(config.roles.streamerRole) : uye.roles.add(config.roles.streamerRole);
          if(!uye.roles.cache.has(config.roles.streamerRole)) {
            client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Streamer** adlı rol verildi.`)]})
            msg.edit({ content:`${emoji.nbdy_onay} Başarıyla ${uye}, isimli kişiye **Streamer** rolü verildi.`, components: [] });
          } else {
            client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Streamer** adlı rol geri alındı.`)]})
            msg.edit({ content:`${emoji.nbdy_onay} Başarıyla ${uye}, isimli kişinin **Streamer** rolü geri alındı.`, components: [] });
          };
       }
      })
  
  }
  }
