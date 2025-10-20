import express from "express"
import publicRouter from "./routes/public-api";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/api";

const server = express();

//middlware
server.use(express.json())

const prefix: string = "/api/v1";

server.use(cors())
server.use(cookieParser())

server.use(prefix, publicRouter);
server.use(prefix, apiRouter);

server.use(errorMiddleware);

export default server;
