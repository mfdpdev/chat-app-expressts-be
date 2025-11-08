import type { Socket } from "socket.io";
import jwt from "jsonwebtoken"
import User from "../models/User";
import type { CustomJwtPayload } from "../types/jwtPayload.type";

interface CustomSocket extends Socket {
  _id: string;
}

const ioMiddleware = async (socket: Socket, next: (err?: Error | undefined) => void) => {
  const authSocket = socket as CustomSocket;
  const token = authSocket.handshake.auth.accessToken;
  if (!token) return next(new Error('Authentication error'));

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_ACCESS!) as CustomJwtPayload;

    const user = await User.findById(payload._id);

    if (!user && user?._id !== payload._id){
      return next(new Error('Not Found: User not found!'));
    }

    authSocket._id = payload._id;

    return next();
  } catch (err) {
    return next(new Error('Invalid token'));
  }
}

export default ioMiddleware;
