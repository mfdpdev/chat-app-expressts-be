import type { NextFunction, Request, Response } from "express";
import MessageService from "../services/message.service";
import type { CustomRequest } from "../types/request.type";

export class MessageController {
  static async create(req: CustomRequest, res: Response, next: NextFunction){
    try {
      const message = await MessageService.create({
        ...req.body,
        senderId: req.user?._id.toString(),
      });
      res.status(200)
      .json({
          statusCode: 200,
          status: "success",
          data: {
            message
          }
        });
    } catch(err) {
      next(err);
    }
  }
}
