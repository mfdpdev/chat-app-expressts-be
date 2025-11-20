import express from "express";
import cookieParser from "cookie-parser";
import publicRouter from "./routes/public-api";
import apiRouter from "./routes/api";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
import { defaultLimiter } from "./middlewares/rateLimiter.middleware";

const app = express();

app.use(express.json())
app.use(defaultLimiter)

const prefix: string = "/api/v1";

app.use("/uploads", express.static("public/uploads"))
app.use("/images", express.static("public/images"))

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(cookieParser())

app.use(prefix, publicRouter);
app.use(prefix, apiRouter);

app.use(errorMiddleware);

export default app;
