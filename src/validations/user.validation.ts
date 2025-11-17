import type { ObjectSchema } from "joi";
import Joi from "joi";

export default class UserValidation {
  static readonly UPDATE: ObjectSchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).optional(),
    password: Joi.string().min(6).max(100).optional(),
  }).strict();
}

