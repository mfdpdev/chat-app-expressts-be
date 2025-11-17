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
// apiRouter.post('/chats/:recipientId', ChatController.create);
apiRouter.post('/chats', ChatController.create);
apiRouter.get('/chats/:conversationId', ChatController.getById);
// apiRouter.update('/chats/:conversationId', ChatController.create);
// apiRouter.delete('/chats/:conversationId', ChatController.create);

//message
// apiRouter.post('/messages', ChatController.create);

//user
apiRouter.get("/users", UserController.getAll);
apiRouter.patch("/users", UserController.update);

export default apiRouter;
