// jshint esversion: 11
const {client, REST, Routes}      = require ('./clients/discord');
const handler       = require ('./clients/handler');
    // on process
handler.on ('interactionCreate', async json => {
    let data = json.commandSlash;

    const rest = new REST({ version: '10' }).setToken(json.botToken);
    try {
        await rest.put(Routes.applicationCommands(data.clientId), { body: data.slash });
    } catch (error) {
        console.error(error);
    }

    client.on ('interactionCreate', async interaction => {

    });
});