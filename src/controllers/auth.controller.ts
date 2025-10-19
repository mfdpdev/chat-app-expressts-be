import type { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";

export class AuthController {
  static async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.signin(req.body);
      res
      .status(200)
      .json({
          statusCode: 200,
          status: "success",
          data: result,
        });
    } catch (err) {
      next(err);
    }
  }

  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.signup(req.body);
      res
      .status(200)
      .json({
          statusCode: 200,
          status: "success",
          data: result,
        });
    } catch (err) {
      next(err);
    }
  }
}
