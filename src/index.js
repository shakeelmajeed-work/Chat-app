//Line 5 of chat-app/front/package.json  = will let the webpack (something that allows changes to code to be immediately rendered) proxy the API requests to the backend Express
const http = require('http');
const socketio = require('socket.io')

const express = require('express');
const app = express();
const server = http.createServer(app)
const io = socketio(server) //cannot pass in app here

const port = process.env.PORT || 5000;

//reminder about setting publicdirectorypath

io.on('connection', (socket) => {
   console.log("New connection")

   socket.emit('welcome_message',"Welcome!")
   
})

server.listen(port, () => console.log(`Listening on port ${port}`)); 

app.get('/express_backend', (req,res) => { //a GET url route that the React front end will fetch
   res.send({express:'Hey'}) //if this is show it shows that the express backend is connected to the react frontent
})