//using express server instead of http
const express = require("express");
//using instance of express in app
const app = express();
//importing socket.io
const socketio = require("socket.io");
//using static fileSystem of nodejs instead of creating routes
app.use(express.static(__dirname + "/public"));
//configuring app to listen on port 9000
const expressServer = app.listen(9000);
/*using io to save instance of socketio passing server instance
and for cors passing origin as "*". TBH it will work without cors since app is serving file statically*/
const io = socketio(expressServer, {
    cors: {
        origin: "*"
    }
});
//connect socket
io.on("connect", (socket) => {
    //receive message from client and emit it back so everybody can see
    socket.on("messageToServer", ({
        text
    }) => {
        // console.log(text);
        io.emit("messageS", {
            data: text
        });
    })
})