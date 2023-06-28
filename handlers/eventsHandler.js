const fs = require('fs')

module.exports = (client , Discord) => {
    const eventFolders = fs.readdirSync('./events/');
    for(const folder of eventFolders) {
        const eventFiles = fs.readdirSync(`./events/${folder}`).filter(files => files.endsWith('.js'));
        for(const file of eventFiles) {
           const event = require(`../events/${folder}/${file}`);
           console.log(`[NOBODY-EVENTS] ${event.name} eventi yüklendi.`)
           if(event.once) {
            client.once(event.name , (...args) => event.execute(...args , client , Discord));
           }else {
            client.on(event.name , (...args) => event.execute(...args , client , Discord));
           };
        };
    };
};