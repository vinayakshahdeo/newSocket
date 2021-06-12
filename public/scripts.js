        // create instance of server in client
        const socket = io.connect("http://localhost:9000")
        //use socket instance to listen to messages sent from server with "messageS" keyword
        socket.on("messageS", ({
            data
        }) => {
            document.querySelector("#messages").innerHTML += `<li>${data}</li>`;
        })
        document.querySelector("#message-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const message = document.querySelector("#user-message").value;
            //send message to server
            socket.emit("messageToServer", {
                text: message
            });
        })