import ResponseError from "../errors/response.error";
import User from "../models/User";
import type { RefreshTokenResponse, SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../types/auth.type";
import type { CustomJwtPayload } from "../types/jwtPayload.type";
import AuthValidation from "../validations/auth.validation"
import { Validation } from "../validations/validation"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default class AuthService {
  static async signup(signUpRequest: SignUpRequest) {
    const validatedData = Validation.validate(AuthValidation.SIGNUP, signUpRequest);

    const existingUser = await User.findOne({
      email: validatedData.email
    });

    if (existingUser != null){
      throw new ResponseError(400, "Email already taken");
    }

    const saltRounds = 10;
    validatedData.password = await bcrypt.hash(validatedData.password, saltRounds);

    const user = new User({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
    });

    await user.save();

    const response: SignUpResponse = {
      _id: user.id,
      name: user.name as string,
      email: user.email as string,
      createdAt: (user.createdAt as Date).toISOString(),
    }

    return response;
  }

  static async signin(signInRequest: SignInRequest): Promise<SignInResponse> {

    const validatedData = Validation.validate(AuthValidation.SIGNIN, signInRequest);

    const user = await User.findOne({
      email: validatedData.email
    });

    if (user == null){
      throw new ResponseError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(validatedData.password as string, user.password as string)

    if(!isPasswordValid){
      throw new ResponseError(400, "Invalid password");
    }

    const accessToken = jwt.sign({
      _id: user.id,
    }, process.env.SECRET_JWT_ACCESS!, {
        expiresIn: "15m"
    });
    const refreshToken = jwt.sign({
      _id: user.id,
    }, process.env.SECRET_JWT_REFRESH!, {
        expiresIn: "7d"
    });

    return {
      _id: user.id,
      name: user.name as string,
      email: user.name as string,
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }

  static async refreshToken(token: string): Promise<RefreshTokenResponse> {

    if(token == "") {
      throw new ResponseError(401, "Unauthorized");
    }

    const payload = jwt.verify(token, process.env.SECRET_JWT_REFRESH!) as CustomJwtPayload;
    
    const accessToken = jwt.sign({
      _id: payload.id,
    }, process.env.SECRET_JWT_ACCESS!, {
        expiresIn: "15m"
    });

    return {
      accessToken,
    }
  }
}
