import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401).json({
      statusCode: 401,
      status: "fail",
      message: "Unauthorized: No token provided"
    });
  } else {
    try {
      const payload = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN!);

      //

      next();
    } catch (error) {
      res.status(403).json({
        statusCode: 403,
        status: "fail",
        message: "Forbidden: Invalid or expired token"
      });
    }
  }
}

export default authMiddleware;
