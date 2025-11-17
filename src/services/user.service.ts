import ResponseError from "../errors/response.error";
import User from "../models/User";
import UserValidation from "../validations/user.validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt"

export default class UserService {
  static async getAll(): Promise<any[]>{
    const users = await User.find().select(
      "_id name email"
    ).lean();

    return users;
  }

  static async update(request: { name?: string; password?: string }, userId: string) {
    // 1. Validasi dengan Joi
    const validatedData = Validation.validate(UserValidation.UPDATE, request);

    // 2. Cari user
    const user = await User.findById(userId);
    if (!user) {
      throw new ResponseError(404, "Not Found: user not found");
    }

    // 3. Update field yang ada
    if (validatedData.name !== undefined) {
      user.name = validatedData.name.trim();
    }

    if (validatedData.password !== undefined) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(validatedData.password, saltRounds);
    }

    // 4. Simpan
    await user.save();

    // 5. Return user tanpa password
    const result = await User.findById(userId)
      .select("_id name email createdAt updatedAt")
      .lean();

    return result;
  }
}
