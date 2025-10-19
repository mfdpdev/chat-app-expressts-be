import express from "express"
import { AuthController } from "../controllers/auth.controller";
import AuthValidation from "../validations/auth.validation";

const publicRouter = express.Router();

publicRouter.post('/auth/signin', AuthController.signin);

export default publicRouter;
