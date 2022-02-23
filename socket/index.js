const io = require('socket.io')(8900, {
    cors: {
        origin:'http://localhost:3000'
    }
});

let users = [];

const addUsers = (userId,socketId)=>{
    !users.some((user)=>user.userId === userId) &&
        users.push({userId, socketId})
}

const removeUser = (socketId) => {
  users = users.filter((user)=>user.socketId !== socketId)
}

const getUser = (receiverId) => {
    return users.find((user)=>user.userId==receiverId)
}

io.on("connection",(socket)=>{
    console.log("a user connected")
    socket.on('addUser',(userId)=>{
        addUsers(userId,socket.id)
        io.emit("getUsers",users)
    })

    socket.on('disconnect',()=>{
        console.log('a user disconnected')
        removeUser(socket.id)
        io.emit("getUsers",users)
    })

    socket.on('sendmessage',({senderId, receiverId, text})=>{
        const user = getUser(receiverId)
        io.to(user.socketId).emit("getmessages",{
            senderId,
            text
        })
    })
})

