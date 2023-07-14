    // jshint esversion: 11
const handler   = require ('./clients/handler');
const {client}  = require ('./clients/discord');

handler.on ('readyListener', socket => {
    client.on ('ready', () =>  { console.log ("discord bot has initialized"); });

    let roles_push      = [];
    let guild_push      = [];
    let channel_push    = [];
    let emojis_push     = [];

   client.guilds.cache.forEach (guild => {
        if (guild) {
                // channels
            if (guild.channels) {
                guild.channels.cache.forEach (channel => {
                    channel_push.push ({
                        "name": channel.name,
                        "id": channel.id,
                        "topic": channel.topic,
                        "nsfw": channel.nsfw
                    });
                });
            }

                // roles
            if (guild.roles) {
                guild.roles.cache.forEach (role => {
                    roles_push.push ({
                        "name": role.name,
                        "id": role.id,
                        "isBotRol": role.tags.botId ? true : false
                    });
                });
            }
                // emojis
            if (guild.emojis) {
                guild.emojis.cache.forEach (emoji => {
                    emojis_push.push ({
                        "name": emoji.name,
                        "id": emoji.id,
                        "animated": emoji.animated,
                        "author": emoji.author,
                        "createdAt": emoji.createdAt
                    });
                });
            }

            // guilds
            guild_push .push ({
                "name": guild.name,
                "id": guild.id,
                "ownerId": guild.ownerId,
                "icon": guild.icon,
                "features": guild.features,
            });
        }
    });

    let guildJson = {
        "application": client.application,
        "guilds": guild_push,
        "channels":  channel_push,
        "roles": roles_push,
        "emojis": emojis_push,
        "user": client.user,
    };

    socket.write ("ready*" + JSON.stringify (guildJson));
});