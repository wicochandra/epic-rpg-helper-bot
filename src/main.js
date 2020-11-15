const Discord = require('discord.js');
const config = require('./config');
const libs = [
    require('./event')
]
const client = new Discord.Client();

function main() {
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });
    client.on('message', message => {
        libs.forEach(function(value) {
            value.listen(message)
        })
    });
    client.login(config.botToken);
}

main()
