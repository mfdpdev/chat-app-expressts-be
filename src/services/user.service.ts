import User from "../models/User";

export default class UserService {
  static async getAll(): Promise<any[]>{
    const users = await User.find().select(
      "_id name email"
    ).lean();

    return users;
  }
}
