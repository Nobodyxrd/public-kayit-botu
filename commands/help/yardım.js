const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')

const { MessageActionRow , MessageSelectMenu, MessageEmbed } = require('discord.js')

module.exports = {
    name: "yardım" , 
    aliases: ['yardim', 'yardimm' , 'kyardim' , 'kyardım' , 'k-yardim' , 'k-yardım' , "ky" , "k-y" , "y"],
    async execute(client , message , args) {

        const embed = new MessageEmbed()
        .setAuthor({name: message.guild.name , iconURL: message.guild.iconURL({dynamic: true})})
        .setFooter({text: config.bot.footer})
        .setColor('RANDOM')

        const yeni = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('yardimm')
                .setPlaceholder(`yardım için Tıkla / ${config.bot.footer}`)
                .addOptions([
                    {
                        label: 'Sunucu Taglarımız',
                        value: 'tag',
                        description: `${config.bot.footer}`,
                        emoji: '1121486659536556152'
                    },  
                    {
                        label: 'kayıt komutları',
                        value: 'kayıt',
                        description: `${config.bot.footer}`,
                        emoji: '1121483553973215292'
                    },
                    {
                        label: 'owner komutları',
                        value: 'owner',
                        description: `${config.bot.footer}`,
                        emoji: '1121483158379045005'
                    },							
                    {
                        label: 'developer komutları',
                        value: 'developer',
                        description: `${config.bot.footer}`,
                        emoji: '1121482727858905088'
                    },	

                ]),
        );

        let msg = await message.reply({ content : `${emoji.kalp} alttaki butonlara basarak iletişime geçebilirsin.`, components: [yeni] });

        var filter = (menu) => menu.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, max: 2, time: 30000 }) 
                  
        
        client.on('interactionCreate', interaction => {
        if (!interaction.isSelectMenu()) return;  
    
    if (interaction.values[0] === "owner") {
    if (!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.roles.cache.has(config.staffroles.OwnerRoles)) return interaction.reply({content:`${emoji.nbdy_red} Maalesef yeteri rütbelere Sahip degilsin.` , ephemeral: true})

        interaction.reply({ content : `
\`\`\`
${config.bot.prefix}rolsüz [ver]
${config.bot.prefix}tag-tara
${config.bot.prefix}perm [Nobody/ID]
${config.bot.prefix}kke [Nobody/ID]
${config.bot.prefix}kayıtsız-etiketle\`\`\`
${config.bot.footer}
        `, ephemeral: true })
        };

        if (interaction.values[0] === "kayıt") {
        if (!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.roles.cache.has(config.staffroles.KayitYetkiliRole)) return interaction.reply({content:`${emoji.nbdy_red} Maalesef yeteri rütbelere Sahip degilsin.` , ephemeral: true})
      
            interaction.reply({ content : `
    \`\`\`
${config.bot.prefix}kayıt [Nobody/ID]
${config.bot.prefix}isim [Nobody/ID] [isim ${config.register.symbol} yaş]
${config.bot.prefix}isimler [Nobody/ID]
${config.bot.prefix}teyitlerim [Nobody/ID]\`\`\`
${config.bot.footer}
            `, ephemeral: true })
            };

            if (interaction.values[0] === "developer") {
   
                if (!config.bot.BotDeveloper.includes(interaction.member.id)) {
                    return interaction.reply({ content: `${emoji.nbdy_red} Bot developerı olmadığın için kurulumu yapamazsın.`, ephemeral: true })
                  } else {              
                    interaction.reply({ content : `
            \`\`\`
${config.bot.prefix}şüphelibutton
${config.bot.prefix}kurulum
${config.bot.prefix}fakekatıl
${config.bot.prefix}panel\`\`\`
${config.bot.footer}
                    `, ephemeral: true })
                    };
                }

                if (interaction.values[0] === "tag") {  
                  
                    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
                    if(member){interaction.reply({ content: `**isim tag:** \`${config.register.isimTag ? config.register.isimTag[0] : "bulunmuyor"} \` ${member.user.username}  \`${config.register.EtiketTag ? `#${config.register.EtiketTag[0]}` : "bulunmuyor"}**`}) }else if(!member){interaction.reply({ content: `**isim tag:** \`${config.register.isimTag ? config.register.isimTag : "bulunmuyor"}\` **etiket tag:** \`${config.register.EtiketTag ? `#${config.register.EtiketTag}` :"bulunmuyor"}\`` , ephemeral: true}) }
                                    };
            })          


      
    }
}