        function joinNS(endPoint){
                nsSocket = io.connect(`http://localhost:9000${endPoint}`);
                nsSocket.on("nsRoomLoad",nsRooms=>{
                    // console.log(nsRooms);
                    let roomList = document.querySelector(".room-list");
                    roomList.innerHTML="";
                    nsRooms.forEach(room=>{
                        let glyph;
                        if(room.privateRoom){
                            glyph="lock";
                        }else{
                            glyph="globe";
                        }
                        // console.log(room);
                        roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}">${room.roomTitle}</span></li>`;
                    })
                    // add a click listener to each room
                    let roomNodes = document.getElementsByClassName("room");
                    Array.from(roomNodes).forEach(el=>{
                        el.addEventListener("click", e=>{
                            console.log("clicked on ", e.target.innerText);
                        })
                    })
                    //add room automatially for first login
                    const topRoom = document.querySelector(".room");
                    const topRoomName= topRoom.innerText;
                    // console.log(topRoomName)
                    joinRoom(topRoomName);
                })
        nsSocket.on("messageToClients",(msg)=>{
            console.log(msg);
            document.querySelector("#messages").innerHTML+=`<li>${msg.text}</li>`
        })
        document.querySelector(".message-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const message = document.querySelector("#user-message").value;
            //send message to server
            socket.emit("messageToServer", {
                text: message
            });
        })
        }