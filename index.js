const http = require("http")

const webSocketServer = require('websocket').server

let connections = [] 

const httpServer = http.createServer()

// passes the httpserver object to the websocketServer library to do all the job, this class will 
const websocket = new webSocketServer({"httpServer": httpServer})
// listen to the tcp socket 
httpServer.listen(8080, () => console.log("server is up and listening to the port 8080"))

    // when a legit websocket req comes and listens to it and get a connection ... other users are notified.

websocket.on("request", request=> {
    const connection = request.accept(null, request.origin);
    connections.push(connection);
    connection.on("message", message => {
        // sb sent a message , tell everybody 
        connections.forEach(c=> {
            if(c!== connection){
                c.send(`user ${connection.socket.remotePort} says : ${message.utf8Data}`)
            }
        })
    })
    // when sb just got connected , tell everybody 
    connections.forEach(c=> {
        if(c!== connection){
            c.send(`user ${connection.socket.remotePort} just joined the lobby`)
        }
    })

    connection.on("close", () => {
        const index = connections.indexOf(connection)
        
        if(index !== -1)
            connections.splice(index,  1)
    })
})

