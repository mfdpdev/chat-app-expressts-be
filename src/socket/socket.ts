import express from "express";
import http from "http"
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import publicRouter from "../routes/public-api";
import apiRouter from "../routes/api";
import errorMiddleware from "../middlewares/error.middleware";
import cors from "cors";
import ioMiddleware from "../middlewares/io.middleware";

const app = express();

app.use(express.json())

const prefix: string = "/api/v1";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(cookieParser())

app.use(prefix, publicRouter);
app.use(prefix, apiRouter);

app.use(errorMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      // "http://localhost:8000",
      "http://localhost:5173"
    ],
    credentials: true,
    // methods: [
    //   "POST",
    //   "GET"
    // ]
  }
});

const userSocketMap: any = {};

// Socket.IO with auth
io.use(ioMiddleware);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("send-message", async (msg) => {
    console.log(msg)

    socket.emit('receive-message', msg);
  })

  const _id: any = socket.handshake.query.userId;
	if (_id != "undefined") userSocketMap[_id] = socket.id;

  socket.on("typing", ({to, isTyping}) => {
    const from = Object.keys(userSocketMap).find( userId => userSocketMap[userId] === socket.id);
    if( !from || !to ) return;

    const target = userSocketMap[to];
    if(target){
      io.to(target).emit('typing', {from, isTyping })
    }
  })

	// io.emit() is used to send events to all the connected clients
	io.emit("online-users", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[_id];
		io.emit("online-users", Object.keys(userSocketMap));
	});
});

export {
  app,
  server,
  io
}
