import Conversation from "../models/Conversation";
import ConversationValidation from "../validations/conversation.validation";
import { Validation } from "../validations/validation";
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

    let conversation: any = await Conversation.findOne({
      participants: {
        $all: participants,
      }
    });

    if(conversation){
      conversation.messages.push(data.message._id);
      await conversation.save();
      return conversation;
    }

    conversation = new Conversation({
      participants,
    });

    conversation.messages.push(data.message._id);
    
    await conversation.save();

    return conversation; 
  }  

  static async getById(conversationId){
    let conversation: any = await Conversation.findOne({
      _id: conversationId,
    }).populate({
        path: "messages",
        select: "_id senderId recipientId message createdAt"
      }).sort({
        createdAt: 1,
      }).lean();
    return conversation;
  }

  static async getByParticipants(participants){
    let conversation: any = await Conversation.findOne({
      participants: {
        $all: participants,
      }
    }).populate({
        path: "messages",
        select: "_id senderId recipientId message createdAt"
      }).sort({
        createdAt: 1,
      }).lean();
          // .sort({ createdAt: 1 }) 
          // .limit(100) 
          // .lean(); 
    return conversation;
  }
}
