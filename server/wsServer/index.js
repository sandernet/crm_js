const expressWs = require("express-ws");
const { jwtVal } = require("@utils");

const clients = {};

module.exports = (app) => {
    expressWs(app, undefined, {
        wsOptions: {
            verifyClient: (data, next) => {
                const query = new URLSearchParams(data.req.url.split("?")[1]);

                next(!!jwtVal(query.get("token")));
            },
        },
    });

    app.ws("/ws/user", (wsClient) => {
        const id = Math.random();
        console.log("new client:", id);

        clients[id] = wsClient;

        wsClient.on("message", (data) => {
            console.log(data, id);

            process.myEvents.emit("webSocketData", {
                data: data,
                send: (sendData) => {
                    wsClient.send(sendData);
                },
            });
        });

        wsClient.on("close", () => {
            console.log("client close", id);
            delete clients[id];
        });
    });
};