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

  static async getAll(userId: string, query: any = {}) {
    // const page = parseInt(query.page as string) || 1;
    // const limit = Math.min(parseInt(query.limit as string) || 20, 50); // max 50
    // const skip = (page - 1) * limit;

    // Cari semua conversation yang melibatkan user ini
    const conversations = await Conversation.find({
      participants: userId, // pasti ada user ini di participants
    })
      .sort({ updatedAt: -1 }) // terbaru di atas
      // .skip(skip)
      // .limit(limit)
      // .lean({ virtuals: true }) // biar virtual muncul kalau ada
      .populate([
        {
          path: "participants",
          select: "_id name profileImage profileImageUrl", // tambahin profileImageUrl kalau pakai virtual
        },
        // Populate last message (hanya 1 pesan terakhir)
        {
          path: "messages",
          select: "_id senderId recipientId message createdAt updatedAt",
          options: { sort: { createdAt: -1 }},
        },
      ]);

    // Format biar rapi buat frontend
    const formatted = conversations.map((conv: any) => {
      // const otherParticipant = conv.participants[0] || {}; // pasti cuma 1 karena match $ne

      const lastMessage = conv.messages[0] || null;

      return {
        _id: conv._id,
        participants: conv.participants.find( (e: any) => e._id != userId),
        // participant: {
        //   _id: otherParticipant._id,
        //   name: otherParticipant.name || "Unknown",
        //   profileImageUrl:
        //     otherParticipant.profileImageUrl ||
        //     `${process.env.APP_URL || "http://localhost:8000"}/images/default-profile.jpeg`,
        // },
        lastMessage: lastMessage
          ? {
              _id: lastMessage._id,
              message: lastMessage.message,
              createdAt: lastMessage.createdAt,
              isMine: lastMessage.senderId.toString() === userId,
            }
          : null,
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
        // optional: unread count
        // unreadCount: ... (bisa ditambah nanti)
      };
    });

    // Total untuk pagination
    // const total = await Conversation.countDocuments({
    //   participants: loggedInUserId,
    // });

    return formatted;
    // return {
    //   data: formatted,
    //   pagination: {
    //     page,
    //     limit,
    //     total,
    //     totalPages: Math.ceil(total / limit),
    //     hasNext: page < Math.ceil(total / limit),
    //     hasPrev: page > 1,
    //   },
    // };
  }
}
