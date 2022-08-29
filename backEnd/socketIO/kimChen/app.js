const expressApp = require("express")();
const http = require("http").createServer(expressApp);
const { Server } = require("socket.io");
// const { instrument } = require("@socket.io/admin-ui"); 

const app = new Server(http, {
    cors: {
        origin: "*",
    }
});

//broadcast.emit sends data to all sockets except source
//volatile.emit asynchronous in nature
//.join("room");
//.to("room").emit
const firstConnection = app.of("/", () => {
    console.log("firstSocketConnection", socket);
});
firstConnection.on("firstSocketConnection", socket => {
    console.log("firstSocketConnected", socket.connected)
});
firstConnection.use((socket, next) => {
    console.log("firstSocketConnectionId", socket.id);
});

const secondSocketConnection = app.of("/second", () => {
    console.log("secondSocketConnection", socket);
})
secondSocketConnection.on("secondSocketConnection", socket => {
    console.log("secondSocketConnection", socket.connected)
});
secondSocketConnection.use((socket, next) => {
    console.log("secondSocketConnection", socket.id);
});

http.listen(8080, () => {
    console.log("listening 8080");
});

// const instru = instrument(app, { auth: false})
// console.log("instru", instru);

module.exports = app;