import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { CustomJwtPayload } from "../types/jwtPayload.type";
import User from "../models/User";
import type { CustomRequest } from "../types/request.type";

const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({
      statusCode: 401,
      status: "fail",
      message: "Unauthorized: No token provided"
    });
  } else {
      try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_ACCESS!) as CustomJwtPayload;

        const user = await User.findById({
          _id: payload._id
        });

        if (user == null){
          return res.status(404).json({
            statusCode: 404,
            status: "fail",
            message: "Not Found: User Not Found"
          });
        }

        req.user = {
          _id: user._id as string
        };
        next();
      } catch (error) {
        return res.status(401).json({
          statusCode: 401,
          status: "fail",
          message: "Unauthorized: Invalid or expired token"
        });
      }
  }
}

export default authMiddleware;
