"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const messages_1 = require("./utils/messages");
const envConfig_1 = require("./envConfig");
const user_1 = require("./utils/user");
const dbSync_1 = __importDefault(require("./database/connection/dbSync"));
dbSync_1.default;
const port = envConfig_1.PORT || 3000;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
// const botName = 'Real-Time-Chat-App'
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
io.on('connection', (socket) => {
    // Join Room
    socket.on('joinRoom', (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, room, phone }) {
        const user = yield (0, user_1.userJoin)(socket.id, username, room, phone);
        socket.join(user.room);
        socket.emit('message', (0, messages_1.formatMessage)('System', `Hey ${user.name}, Welcom to Chat_App `));
        // when user connect
        socket.broadcast
            .to(user.room)
            .emit('message', (0, messages_1.formatMessage)('System', `${user.name} has been joind the chat`));
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: yield (0, user_1.getRoomUsers)(user.room),
        });
    }));
    // listen for chatMessage
    socket.on('chatMessage', (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, user_1.getCurrentUser)(socket.id);
        if (user) {
            io.to(user.room).emit('message', (0, messages_1.formatMessage)(user.name, msg));
        }
        else {
            console.log('User is not exist');
        }
        // console.log(msg)
    }));
    // when user disconnect
    socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, user_1.getCurrentUser)(socket.id);
        if (user) {
            io.to(user.room).emit('message', (0, messages_1.formatMessage)('System', `${user.name} has left the chat`));
            user.deactivate();
        }
        else {
            console.log('Error finding the user');
        }
    }));
});
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
