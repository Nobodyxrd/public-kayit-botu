const config = require('../../configs/config.json')
require("moment-duration-format");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");
const emoji = require('../../configs/emojis.json')


module.exports = {
    name: "interactionCreate",
    async execute(interaction, message) {

        if(interaction.isButton()) {

            if(interaction.customId === "rol") {
              let member = interaction.member
           {
                await interaction.reply({ content: `
Üzeriniz de bulunan rollerin listesi;
${(await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Herhangi bir rolünüz yok.')}`, ephemeral: true });
              };
            };
            
            if(interaction.customId === "sunucu") {
              let member = interaction.member
           {
                await interaction.reply({ content: `
${emoji.nokta} Sunucumuzun oluşturulma tarihi: \`${moment(interaction.guild.createdAt).locale("tr").format("LLL")}\`
${emoji.nokta} Sunucumuz da ki toplam kullanıcı sayısı: \`${(interaction.guild.memberCount)}\`
${emoji.nokta} Sesli kanallardaki kullanıcı sayımız: \`${(interaction.guild.members.cache.filter((x) => x.voice.channel).size)}\``, ephemeral: true });
              };
            };
            
            
            if(interaction.customId === "uye") {
              let member = interaction.member
           {
                await interaction.reply({ content: `${emoji.nokta} ${member.toString()}, üyesinin katılım Tarihi: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``, ephemeral: true });
              };
            };
        
            if(interaction.customId === "kayıtsız") {
              let member = interaction.member
           {
            await member.roles.set([config.register.kayitsiz]).catch()
            await member.setNickname(config.register.JoinName);
            await interaction.reply({ content: `${emoji.nbdy_onay} ${member.toString()} başarıyla seni kayıtsıza attım!`, ephemeral: true });
              };
            }
          }
    }
}