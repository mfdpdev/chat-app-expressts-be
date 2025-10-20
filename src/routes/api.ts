import express from "express"
import authMiddleware from "../middlewares/auth.middleware";

const apiRouter = express.Router();

//middleware
apiRouter.use(authMiddleware);

// apiRouter.get('/auth/signout', );
