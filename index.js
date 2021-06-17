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

        let namespaces = require("./data/namespaces");
        console.log(namespaces)


        //loop through each namespace and listen for connection
        namespaces.forEach((ns) => {
            //console.log(ns))
            io.of(ns.endpoint).on("connection", (nsSocket) => {
                console.log(`${nsSocket.id} has joined ${ns.endpoint}`);
                // a socket has connected to HTMLOptGroupElement
                // go to that client
                nsSocket.emit("nsRoomLoad", namespaces[0].rooms);
                nsSocket.on("joinRoom", (roomToJoin, numberOfUsersCallback) => {
                    nsSocket.join(roomToJoin);
                    io.of("/wiki", roomToJoin => {
                        var numClients = io.sockets.adapter.rooms["/wiki"] != undefined ? Object.keys(io.sockets.adapter.rooms["/wiki"]).length : 0;
                        console.log(numClients);
                        // var numClients = clientsList.length;
                        // console.log(numClients)
                    })
                    numberOfUsersCallback();
                })
            })

        });
        //connect socket
        io.on("connect", (socket) => {
            //receive message from client and emit it back so everybody can see
            // socket.on("messageToServer", ({
            //     text
            // }) => {
            //     // console.log(text);
            //     io.emit("messageS", {
            //         data: text
            //     });
            // })
            //build an array to sned back with the img and endpoint for ns
            let nsData = namespaces.map(ns => {
                return {
                    img: ns.img,
                    endpoint: ns.endpoint
                }
            })
            // console.log(nsData);
            // we use socket not io bcz we want only to go to client
            socket.emit("nsList", nsData);
        })