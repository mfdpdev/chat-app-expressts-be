import express from "express"
import { AuthController } from "../controllers/auth.controller";
import { signInLimiter, signUpLimiter } from "../middlewares/rateLimiter.middleware";

const publicRouter = express.Router();

publicRouter.post('/auth/signin', signInLimiter, AuthController.signin);
publicRouter.post('/auth/signup', signUpLimiter, AuthController.signup);
publicRouter.post('/auth/refresh', AuthController.refreshToken);

export default publicRouter;
