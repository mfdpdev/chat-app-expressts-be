import ResponseError from "../errors/response.error";
import User from "../models/User";
import AuthValidation from "../validations/auth.validation"
import { Validation } from "../validations/validation"
import bcrypt from "bcrypt"

export default class AuthService {
  static async signin(data: any) {
    // const validatedData = Validation.validate(AuthValidation.SIGNIN, data);
  }

  static async signup(data) {
    const validatedData = Validation.validate(AuthValidation.SIGNUP, data)

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
    user.save();

    return user;
  }
}
