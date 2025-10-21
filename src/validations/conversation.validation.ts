import type { ObjectSchema } from "joi";
import Joi from "joi";

export default class ConversationValidation {
  static readonly CREATE: ObjectSchema = Joi.object({
    participants: Joi.array()
    .items(Joi.string().required())
    .length(2)
    .required()
  }).strict();
}
