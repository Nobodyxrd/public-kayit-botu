const config = require('../../configs/config.json')
const emoji = require('../../configs/emojis.json')

module.exports = {
    name: "tag",
    aliases: ['isimtag' , 'isim-tag' , 'etikettag' , 'etiket-tag' , 'tag' , 'sunucutag' , 'sunucu-tag'],
    async execute(client , message , args) {

        message.react(emoji.nbdy_onay)


        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(member){message.reply({ content: `**isim tag:** \`${config.register.isimTag ? config.register.isimTag[0] : "bulunmuyor"} \` ${member.user.username}  \`${config.register.EtiketTag ? `#${config.register.EtiketTag[0]}` : "bulunmuyor"}**`}) }else if(!member){message.reply({ content: `**isim tag:** \`${config.register.isimTag ? config.register.isimTag : "bulunmuyor"}\` **etiket tag:** \`${config.register.EtiketTag ? `#${config.register.EtiketTag}` :"bulunmuyor"}\``}) }}}

                