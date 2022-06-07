"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());
dotenv.config();
const port = process.env.PORT;
const socketPort = process.env.SOCKET_PORT;
const origin = process.env.ORIGIN;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: origin,
        methods: "GET,POST",
    }
});
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('send_message', (data) => {
        console.log(data);
        socket.emit("receive_message", data);
    });
});
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
server.listen(socketPort, () => {
    console.log("SERVER IS RUNNING");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
