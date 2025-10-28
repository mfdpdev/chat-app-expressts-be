import express from "express"
import publicRouter from "./routes/public-api";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/api";
import { app } from "./socket/socket";

//middlware
app.use(express.json())

const prefix: string = "/api/v1";

app.use(cors())
app.use(cookieParser())
app
app.use(prefix, publicRouter);
app.use(prefix, apiRouter);
app
app.use(errorMiddleware);

export default app;
