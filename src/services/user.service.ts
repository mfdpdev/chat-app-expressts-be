import ResponseError from "../errors/response.error";
import User from "../models/User";
import UserValidation from "../validations/user.validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt"
import path from "path";
import fs from "fs";

export default class UserService {
  static async getAll(): Promise<any[]>{
    const users = await User.find().select(
      "_id name email profileImageUrl"
    ).lean();

    return users;
  }

  static async update(request: { name?: string; password?: string }, requestFile: any, userId: string) {
    // 1. Validasi dengan Joi
    const validatedData = Validation.validate(UserValidation.UPDATE, request);

    // 2. Cari user
    const user = await User.findById(userId);
    if (!user) {
      throw new ResponseError(404, "Not Found: user not found");
    }

    // 3. Update field yang ada
    if (validatedData && validatedData.name !== undefined) {
      user.name = validatedData.name.trim();
    }

    if (validatedData && validatedData.password !== undefined) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(validatedData.password, saltRounds);
    }

    if (requestFile) {
      // Hapus foto lama kalau bukan default
      if (user.profileImage && user.profileImage !== "default-profile.png") {
        const oldPath = path.join("public/uploads/profiles", user.profileImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      // Simpan foto baru
      user.profileImage = requestFile.filename;
    }

    // 4. Simpan
    await user.save();

    // 5. Return user tanpa password
    // const result = await User.findById(userId)
    //   .select("_id name email profileImageUrl createdAt updatedAt")
    //   .lean();

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl, // selalu full URL
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    // return result;
  }
}
