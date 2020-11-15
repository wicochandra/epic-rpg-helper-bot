const config = require('./config');

class Event {
    static handlerEventChs = [];
    static runningEventChs = [];

    static deleteMessages = [
        'catch',
        'fish',
        'chop',
        'join',
        'fight',
        'time to fight'
    ];

    constructor(message) {
        this.message = message;
    }

    run() {
        const message = this.message;
        const embed = message.embeds[0];

        if (message.author.id == config.users.epicRpg && embed) {
            let title = embed.title?embed.title.toLowerCase():"";
            let description = title + (embed.description?embed.description.toLowerCase():"");
            if (embed.fields) {
                embed.fields.forEach(function (current) {
                    description += "\n" + current.name.toLowerCase() + " " + current.value.toLowerCase() + " \n";
                })
            }
            if (
                description.includes("everyone got") ||
                description.includes("the legendary boss has not been defeated") ||
                description.includes("the legendary boss died!") ||
                description.includes("has been defeated!")
            ) {
                // this.sendEventOverMessage();
                this.clearChannelHandlerInSec(message.channel.id, 15);
            }
            let isTrigger = false;
            if (description.includes("it's raining coins")) {
                message.channel.send(`<@&${config.roles.coin}>`);
                isTrigger = true
            }
            if (description.includes("a megalodon has spawned")) {
                message.channel.send(`<@&${config.roles.fish}>`);
                isTrigger = true
            }
            if (description.includes("an epic tree has just grown")) {
                message.channel.send(`<@&${config.roles.chop}>`);
                isTrigger = true
            }
            if (description.includes("chance to win:")) {
                message.channel.send(`<@&${config.roles.miniboss}>`);
                isTrigger = true
            }
            if (description.includes("to join the arena!")) {
                message.channel.send(`<@&${config.roles.arena}>`);
                isTrigger = true
            }
            if (description.includes("a legendary boss just spawned")) {
                message.channel.send(`<@&${config.roles.boss}>`);
                isTrigger = true
            }
            if (isTrigger) {
                this.constructor.runningEventChs[message.channel.id] = true;
                this.clearChannelHandlerInSec(message.channel.id, 60);
            }
        }

        // Delete message if the event is in progress
        if (this.constructor.runningEventChs[message.channel.id]) {
            if (this.constructor.deleteMessages.includes(message.content.toLowerCase())) {
                setTimeout(function () {
                    message.delete();
                }, 5000);
            }
        }
    }

    isValid() {
        const embed = this.message.embeds[0];
        return (this.message.author.id == config.users.epicRpg && embed)
            || this.constructor.deleteMessages.includes(this.message.content.toLowerCase());
    }

    sendEventOverMessage() {
        this.message.channel.send({
            embed: {
                title: "EVENT IS OVER",
                image: {
                    url: "https://media.discordapp.net/attachments/719104227170975754/720413885299163187/stop-banner-center-1024x307.png"
                }
            }
        });
    }

    clearChannelHandlerInSec(channelId, sec) {
        const _self = this;
        if (this.constructor.handlerEventChs[channelId]) {
            clearTimeout(this.constructor.handlerEventChs[channelId]);
        }
        this.constructor.handlerEventChs[channelId] = setTimeout(function () {
            delete _self.constructor.runningEventChs[channelId];
            delete _self.constructor.handlerEventChs[channelId];
        }, sec*1000)
    }
}


exports.listen = function (message) {
    const event = new Event(message);
    if (event.isValid()) {
        event.run();
        return;
    }
    delete event;
}
