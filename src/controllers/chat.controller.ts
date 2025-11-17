import type { NextFunction, Request, Response } from "express";
import type { CustomRequest } from "../types/request.type";
import ChatService from "../services/chat.service";
import ConversationService from "../services/conversation.service";

export class ChatController {
  static async create(req: CustomRequest, res: Response, next: NextFunction){
    try {
      const chat = await ChatService.create({
        message: req.body.message || "",
        senderId: req.user?._id.toString(),
        recipientId: req.body.recipientId || "",
        // recipientId: req.params.receiverId?.toString(),
      });
      res.status(200)
      .json({
          statusCode: 200,
          status: "success",
          data: {
            chat
          }
        });
    } catch(err) {
      next(err);
    }
  }
  static async getById(req: CustomRequest, res: Response, next: NextFunction){
    try {
      const chat = await ConversationService.getById(
        req.params.conversationId?.toString(),
      );
      res.status(200)
      .json({
          statusCode: 200,
          status: "success",
          data: {
            chat
          }
        });
    } catch(err) {
      next(err);
    }
  }
}
