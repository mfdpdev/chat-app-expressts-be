import type { ClientSession } from "mongoose";
import ResponseError from "../errors/response.error";
import Message from "../models/Message";
import MessageValidation from "../validations/message.validation";
import { Validation } from "../validations/validation";

export default class MessageService {
  static async create(data: any){
    const validatedData = Validation.validate(MessageValidation.CREATE, data)

    if(!validatedData.content || validatedData.content.length > 2000) {
      throw new ResponseError(400, "Message content is invalid or too long");
    }

    let message = new Message({
      conversationId: validatedData.conversationId,
      senderId: validatedData.senderId,
      content: validatedData.content,
    });

    message = await message.save();

    return message;
  }
}
