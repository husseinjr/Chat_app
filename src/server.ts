import express from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { formatMessage } from './utils/messages'
import { PORT } from './envConfig'
import { getCurrentUser, userJoin, getRoomUsers } from './utils/user'
import db from './database/connection/dbSync'

db
const port = PORT || 3000
const app = express()
const server = createServer(app)
const io = new Server(server)
// const botName = 'Real-Time-Chat-App'

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
  // Join Room
  socket.on('joinRoom', async ({ username, room, phone }) => {

      const user = await userJoin(socket.id, username, room, phone)

      socket.join(user.room)
      socket.emit(
        'message',
        formatMessage('System', `Hey ${user.name}, Welcom to Chat_App `)
      )
      // when user connect
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          formatMessage('System', `${user.name} has been joind the chat`)
        )
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: await getRoomUsers(user.room),
      })
  })

  // listen for chatMessage
  socket.on('chatMessage', async (msg) => {
    const user = await getCurrentUser(socket.id)
    if (user) {
      io.to(user.room).emit('message', formatMessage(user.name, msg))
    } else {
      console.log('User is not exist')
    }
    // console.log(msg)
  })

  // when user disconnect
  socket.on('disconnect', async () => {
    const user = await getCurrentUser(socket.id)
    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage('System', `${user.name} has left the chat`)
      )
      user.deactivate()
    } else {
      console.log('Error finding the user')
    }
  })
})

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
