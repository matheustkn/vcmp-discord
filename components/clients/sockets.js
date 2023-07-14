    // jshint esversion: 11
const handler           = require ('./handler');
const Net               = require('net');
const server            = new Net.Server();
const port              = 5000;
const {client}          = require ('./discord');

    // connection
server.addListener ('connection', socket => {
        // only accepting locals ip
    if (!socket.localAddress.endsWith ("127.0.0.1")) {
        socket.write ("error*connection refused");
        socket.destroy ();
    }

    socket.on ("data", async chunks => {
        try {
                // when sending 2 or more sockets together with vcmp sockets it will read it as a single chunk we don't want this
                // line divider is -[AroliSG]-
            let chunkArray = chunks .toString () .split ("-[ADiscord]-");
            chunkArray .map (chunk => {
                    // if chunk have an empty entry return it.
                if (chunk == '') return 1;
                let json  = JSON.parse (chunk);

                    /**
                        @[vcmp events]
                        @[receive events from vcmp]
                        @[channelEvent, botEvent]
                    */

                handler.emit ("vcmpEvents", socket, json);

                        // login discord
                if (json.botToken) {
                    client.login (json.botToken)
                        .then (() => {
                            handler.emit ("readyListener", socket);
                            handler.emit ("messageListener", socket, json.prefix);
                           // handler.emit ("interactionCreate", json);
                        })
                        .catch (error => {
                            socket.write ("error*", JSON.stringify (error));
                        });
                    }
            });
            socket.pipe(socket);
        } catch (error) {
            socket.write ("error*", error);
        }
    });

    let destroyClient = () => {
        console.log (socket.localAddress + " has quit the connection");
    };

        // destroying client
    socket.on ('error', destroyClient);
    socket.on ('end', destroyClient);
    socket.on ('close', destroyClient);
    socket.on ('timeout', destroyClient);
});

    // listening
server.listen(port, () => console.log( `listening to port ${port}` ));

    // exporting
module.exports = server;