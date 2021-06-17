        // create instance of server in client
        const socket = io.connect("http://localhost:9000");
        let nsSocket = "";
        //use socket instance to listen to messages sent from server with "messageS" keyword
        // socket.on("messageS", ({
        //     data
        // }) => {
        //     document.querySelector("#messages").innerHTML += `<li>${data}</li>`;
        // })
        //listen for nsList
        socket.on("nsList", nsData=>{
        //    console.log("the list of nsData", nsData);
        let namespaceDiv = document.querySelector(".namespaces");
        namespaceDiv.innerHTML="";
        nsData.forEach(ns => {
            namespaceDiv.innerHTML+=`<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}"/></div>`;
        });
        // add a click listener for each namespace
        Array.from(document.getElementsByClassName("namespace")).forEach(el=>{
            el.addEventListener("click",event=>{
                // console.log(event.target)
                const nsEndpoint = el.getAttribute("ns");
                // console.log(nsEndpoint)
            });
        })
        joinNS("/wiki");
        });