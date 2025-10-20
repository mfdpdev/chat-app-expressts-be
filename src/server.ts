import express from "express"
import publicRouter from "./routes/public-api";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";

const server = express();

//middlware
server.use(express.json())

const prefix: string = "/api/v1";

server.use(cors())
// server.use();
server.use(prefix, publicRouter);
server.use(errorMiddleware);

export default server;
