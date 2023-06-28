const config = require('../../configs/config.json')

module.exports = {
    name: "ready",
    execute(client) {
        console.log('bot aktif edildi.')
        client.user.setActivity({ name: config.bot.botdurum , type: 'STREAMING' , url: "https://www.twitch.tv/nobody"})
    }
 
    }
