import express from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {formatMessage} from './utils/messages'

const port = 3000
const app = express()
const server = createServer(app)
const io = new Server(server)
// const botName = 'Real-Time-Chat-App'

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
  // console.log("New WS connection...")
  socket.emit('message', formatMessage("User", 'Welcom to Chat_App'))
  // when user connect
  socket.broadcast.emit('message', formatMessage("User", 'a User has been joind the chat'))
  // when user disconnect
  socket.on('disconnect', () => {
    io.emit('message', formatMessage("User", 'user has left the chat'))
  })

  // listen for chatMessage
  socket.on('chatMessage', (msg) => {
    // console.log(msg)
    io.emit('message', formatMessage("User", msg))
  })
})

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
