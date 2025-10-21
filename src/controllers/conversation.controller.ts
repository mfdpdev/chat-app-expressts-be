import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../types/request.type";
import ConversationService from "../services/conversation.service";

export class ConversationController {
  static async create(req: CustomRequest, res: Response, next: NextFunction){
    try {
      const conversation = await ConversationService.create({
        ...req.body,
      });
      res.status(200)
      .json({
          statusCode: 200,
          status: "success",
          data: {
            conversation
          }
        });
    } catch (error) {
      next(error);
    }
  }
}
