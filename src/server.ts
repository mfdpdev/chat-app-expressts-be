import express from "express"
import publicRouter from "./routes/public-api";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/api";
// import { app } from "./socket/socket";

//middlware
app.use(express.json())

const prefix: string = "/api/v1";

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }))
app.use(cookieParser())

app.use(prefix, publicRouter);
app.use(prefix, apiRouter);

app.use(errorMiddleware);

export default app;
