import http from "http"
import connectToDB from "./config/mongoose.config";
import logger from "./utils/logger";
import app from "./app.ts";
import { Server } from "socket.io";
import { init } from "./socket/socket.ts";

const server = http.createServer(app)

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

init(io);

const port: number = parseInt(process.env.APP_PORT!) ?? 8000;
const hostname: string = process.env.HOSTNAME ?? "localhost";

connectToDB();
server.listen(port, hostname, () => {
  logger.info(`Listening on port: ${port}`);
});
