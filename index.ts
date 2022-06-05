import { Express,Request, Response } from "express";
const express = require('express');


const app: Express = express();
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());
dotenv.config();
const port = process.env.PORT;
const origin = process.env.ORIGIN

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: origin,
    methods: "GET,POST",
  }
})

io.on('connection', (socket: any) => {
  console.log('a user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('send_message', (data: any) => {
    console.log(data)
    socket.emit("receive_message", data);
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});