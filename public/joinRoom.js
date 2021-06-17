function joinRoom(roomName){
//send to server
nsSocket.emit("joinRoom", roomName,(newNumberOfMembers)=>{
    // we ant to update roomnumber tootal when joined
    document.querySelector(".curr-room-num-users").innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`;
});
};