import express from "express"
import authMiddleware from "../middlewares/auth.middleware";
import { AuthController } from "../controllers/auth.controller";
import { ConversationController } from "../controllers/conversation.controller";
import { MessageController } from "../controllers/message.controller";

const apiRouter = express.Router();

//middleware
apiRouter.use(authMiddleware);

//auth
apiRouter.delete('/auth/signout', AuthController.signout);

//conversations
apiRouter.post('/conversations', ConversationController.create);
apiRouter.post('/messages', MessageController.create);

export default apiRouter;
