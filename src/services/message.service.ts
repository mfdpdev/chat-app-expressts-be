import type { ClientSession } from "mongoose";
import ResponseError from "../errors/response.error";
import Message from "../models/Message";
import MessageValidation from "../validations/message.validation";
import { Validation } from "../validations/validation";

export default class MessageService {
  static async create(data: any){
    const validatedData = Validation.validate(MessageValidation.CREATE, data)

    let message = new Message({
      senderId: validatedData.senderId,
      receiverId: validatedData.receiverId,
      message: validatedData.message,
    });

    message = await message.save();
    return message;
  }
}
