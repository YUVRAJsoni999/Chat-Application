import {Server} from "socket.io"
import http from "http"
import express from "express"

const app = express()

const server= http.createServer(app); //put the express server inside http server as the http server is going to be socket io

const io=new Server(server, {
    cors:{
        origin:['http://localhost:3000'],
        methods:['GET','POST'],
    }
})
export const getRecieverSocketId=(receiverId)=>{
    return userSocketMap[receiverId]
}


const userSocketMap={} //user.id is the same as socket.id


//this is basically turing on the connection using socket io

io.on('connection',(socket)=>{//runs everytiimee a user connects
    console.log('user connected', socket.id )
    const userId=socket.handshake.query.userId
    // socket.userId=userId
    if(userId!==undefined){
        userSocketMap[userId]=socket.id//to store the ids of people who r online
    }

    io.emit('getOnlineUsers',Object.keys(userSocketMap))//emit basicallt emits info of online users from here to frontend

    socket.on('disconnect',()=>{
        console.log('user disconnedted',socket.id)
        delete userSocketMap[socket.userId]
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
    })
})



export {app, io, server} 