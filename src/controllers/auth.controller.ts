import type { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";

export class AuthController {
  static async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken, ...data} = await AuthService.signin(req.body);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.APP_ENV == "production",
        sameSite: "lax",
        path: "/",
        maxAge: req.body.rememberMe ? 1000 * 60 * 60 * 24 * 7 : undefined //7 hari
      });

      res
      .status(200)
      .json({
          statusCode: 200,
          status: "success",
          data: data,
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

  static async signout(_: Request, res: Response, next: NextFunction){
    try {
      res.clearCookie('refreshToken', { 
        httpOnly: true, 
        secure: process.env.APP_ENV == "production",
        sameSite: 'lax',
        path: "/",
      });

      res.status(200).json({
        statusCode: 200,
        status: "success",
        data: "OK",
      });

    } catch (e) {
      next(e);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction){
    try {
      const { accessToken } = await AuthService.refreshToken(req.cookies.refreshToken)
      res.status(200).json({
        statusCode: 200,
        status: "success",
        data: {
          accessToken,
        },
      });

    } catch (e) {
      next(e);
    }
  }
}
