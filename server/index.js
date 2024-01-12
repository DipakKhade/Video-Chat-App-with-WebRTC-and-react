const bodyParser = require('body-parser')
const express = require('express')
const {Server}= require('socket.io')

const app=express();
const io = new Server();


app.use(bodyParser.json())

const emailToSocketMapping=new Map();

io.on('connection',(socket)=>{
socket.on('join-room',(data)=>{
    const {roomId , emailId}= data
    console.log(roomId,emailId)
    emailToSocketMapping.set(emailId,socket.id)
    socket.join(roomId)
    socket.broadcast.to(roomId).emit('user-joined',{emailId})
})
})

app.listen('8000',()=>{
    console.log('server is running at PORT 3000')
})

io.listen(8001)