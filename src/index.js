//Line 5 of chat-app/front/package.json  = will let the webpack (something that allows changes to code to be immediately rendered) proxy the API requests to the backend Express
const http = require('http');
const socketio = require('socket.io')

const express = require('express');
const app = express();
const server = http.createServer(app)
const io = socketio(server) //cannot pass in app here

const port = process.env.PORT || 3009;

//reminder about setting publicdirectorypath

io.on('connection', (socket) => {
   console.log("New connection")
   
   // ------Standard procedures when a user join ------- //
   socket.emit('message',"Welcome!") //sends welcome message when user immediately joins the room
   socket.broadcast.emit('message', "A new user has joined!") //everyone apart from the newly connected socket will know that someone new has joiend 

   // ------Procedures based on if anyone wants to send a message ------- //
   socket.on('send_message', (message) => { //message is the input from the form
      io.emit('message', message)
   })
   socket.on('send_location',(pos) => {
      console.log(pos)
      io.emit('message', `One user is from https:google.com/maps?q=${pos.latitude},${pos.longitude}`)
   })

   // ------If and when a connected client disconnects---- //
   socket.on('disconnect', () => {
      io.emit('message', "A user has disconnected")
   })

})

server.listen(port, () => console.log(`Listening on port ${port}`)); 

app.get('/express_backend', (req,res) => { //a GET url route that the React front end can fetch
   res.send({express:'Hey'}) //if this is shown it shows that the express backend is connected to the react frontent
})