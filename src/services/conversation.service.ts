import mongoose, { Mongoose, type ClientSession } from "mongoose";
import Conversation from "../models/Conversation";
import ConversationValidation from "../validations/conversation.validation";
import { Validation } from "../validations/validation";
import MessageService from "./message.service";
import User from "../models/User";
import ResponseError from "../errors/response.error";

export default class ConversationService {
  static async create(data: any) {
    const validatedData = Validation.validate(ConversationValidation.CREATE, data);

    const participants: string[] = validatedData.participants;
    //participants[0] = sender
    //participants[1] = receiver

    const existingUsers = await User.find({
      _id: {
        $in: participants,
      }
    });

    if(existingUsers.length !== 2) {
      throw new ResponseError(404, "Participants must be exactly two valid users");
    }

    const existingConversation = await Conversation.findOne({
      participants: {
        $all: participants,
      }
    }).lean();

    if(existingConversation) return existingConversation;
    
    const conversation = new Conversation({
      participants,
    });

    await conversation.save();

    return conversation; 
  }  
}
