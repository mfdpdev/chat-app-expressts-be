import { getReceiverSocketId, io } from "../socket/socket";
import ConversationService from "./conversation.service";
import MessageService from "./message.service";

export default class ChatService {
  static async create(data: any){
    try {

      const message = await MessageService.create(data);
      const _ = await ConversationService.create({
        participants: [
          data.senderId,
          data.receiverId,
        ],
        message,
      });

      // const receiverSocketId = getReceiverSocketId(data.receiverId);
      // if (receiverSocketId) {
      //   // io.to(<socket_id>).emit() used to send events to specific client
      //   io.to(receiverSocketId).emit("newMessage", message);
      // }

      return message;
    } catch (error) {
      throw error;
    }
  }
}
