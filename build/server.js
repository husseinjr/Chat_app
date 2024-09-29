"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const messages_1 = require("./utils/messages");
const port = 3000;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
// const botName = 'Real-Time-Chat-App'
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
io.on('connection', (socket) => {
    // console.log("New WS connection...")
    socket.emit('message', (0, messages_1.formatMessage)("User", 'Welcom to Chat_App'));
    // when user connect
    socket.broadcast.emit('message', (0, messages_1.formatMessage)("User", 'a User has been joind the chat'));
    // when user disconnect
    socket.on('disconnect', () => {
        io.emit('message', (0, messages_1.formatMessage)("User", 'user has left the chat'));
    });
    // listen for chatMessage
    socket.on('chatMessage', (msg) => {
        // console.log(msg)
        io.emit('message', (0, messages_1.formatMessage)("User", msg));
    });
});
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
