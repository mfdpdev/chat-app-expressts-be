import express from "express"
import { AuthController } from "../controllers/auth.controller";

const publicRouter = express.Router();

publicRouter.post('/auth/signin', AuthController.signin);
publicRouter.post('/auth/signup', AuthController.signup);
publicRouter.post('/auth/refresh', AuthController.refreshToken);

export default publicRouter;
