// jshint esversion: 11
const {client}      = require ('./clients/discord');
const handler       = require ('./clients/handler');

handler.on ('messageListener', (socket, prefix) => {
    client.on ('messageCreate', message => {
        if (message.author.bot) return 0;

            // channels
        let channel = {
            type: message.channel.type,
            lastMessageId: message.channel.lastMessageId,
            rawPosition: message.channel.rawPosition,
            createdTimestamp: message.channel.createdTimestamp,
            id: message.channel.id,
            topic: message.channel.topic,
            permissionOverwrites: message.channel.permissionOverwrites,
            guildId: message.channel.guildId,
            guild: message.channel.guild,
            parentId: message.channel.parentId,
            nsfw: message.channel.nsfw,
            name: message.channel.name,
            rateLimitPerUser: message.channel.rateLimitPerUser
        }
            // message json
        let messageJson = {
            "channelId": message.channelId,
            "guildId": message.guildId,
            "id": message.id,
            "createdTimestamp": message.createdTimestamp,
            "type": message.type,
            "system": message.system,
            "content": message.content,
            "authorId": message.authorId,
            "pinned": message.pinned,
            "tts": message.tts,
            "nonce": message.nonce,
            "webhookId": message.webhookId,
            "groupActivityApplicationId": message.groupActivityApplication,
            "applicationId": message.applicationId,
            "activity": message.activity,
            "flags": message.flags,
            "reference": message.reference,
            "interaction": message.interaction,
            "cleanContent": message.cleanContent,
            "member": message.member,
            "author": message.author,
            channel
        };

        let args = message.content .trim() .split(/ +/g);
        let command = args .shift() .toLowerCase();

        if (command.slice (0,1) == prefix) {
            messageJson.command = command.slice (1);
            messageJson.content = args. join(' ');
            messageJson.prefix  = prefix;
        }
        socket.write ("message*" + JSON.stringify (messageJson));
    });
});