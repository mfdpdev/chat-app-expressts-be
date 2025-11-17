import ConversationService from "./conversation.service";
import MessageService from "./message.service";

export default class ChatService {
  static async create(data: any){
    try {

      const message = await MessageService.create(data);
      const conversation = await ConversationService.create({
        participants: [
          data.senderId,
          data.recipientId,
        ],
        message,
      });

      return {
        conversation,
        lastMessage: message,
      };
    } catch (error) {
      throw error;
    }
  }
}
