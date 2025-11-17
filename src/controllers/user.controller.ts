import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../types/request.type";
import UserService from "../services/user.service";

export class UserController {
  static async getAll(req: CustomRequest, res: Response, next: NextFunction){
    try {
      const users = await UserService.getAll();
      res.status(200)
      .json({
          statusCode: 200,
          status: "success",
          data: {
            users,
          }
        });
    } catch (error) {
      next(error);
    }
  }
  static async update(req: CustomRequest, res: Response, next: NextFunction){
    try {
      const userId = req.user?._id as string;
      const result = await UserService.update(req.body, userId);
      res.status(200)
      .json({
          statusCode: 200,
          status: "success",
          data: result,
        });
    } catch (error) {
      next(error);
    }
  }
}
