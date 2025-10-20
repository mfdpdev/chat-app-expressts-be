import express from "express"
import authMiddleware from "../middlewares/auth.middleware";
import { AuthController } from "../controllers/auth.controller";

const apiRouter = express.Router();

//middleware
apiRouter.use(authMiddleware);

apiRouter.delete('/auth/signout', AuthController.signout);
export default apiRouter;
