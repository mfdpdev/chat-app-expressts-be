import express from "express"
import authMiddleware from "../middlewares/auth.middleware";
import { AuthController } from "../controllers/auth.controller";
import { ChatController } from "../controllers/chat.controller";
import { UserController } from "../controllers/user.controller";

const apiRouter = express.Router();

//middleware
apiRouter.use(authMiddleware);

//auth
apiRouter.get('/auth/me', AuthController.me);
apiRouter.delete('/auth/signout', AuthController.signout);

//chat
apiRouter.post('/chats/:receiverId', ChatController.create);

//user
apiRouter.get("/users", UserController.getAll);

export default apiRouter;
