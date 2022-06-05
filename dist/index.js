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
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5500",
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
        // console.log('user send message');
        socket.emit("receive_message", data);
    });
});
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
