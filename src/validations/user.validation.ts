import type { ObjectSchema } from "joi";
import Joi from "joi";

const ALLOWED_MIMES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export default class UserValidation {
  static readonly UPDATE: ObjectSchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).optional(),
    password: Joi.string().min(6).max(100).optional(),
  }).strict().options({
    stripUnknown: true,
  });
}

