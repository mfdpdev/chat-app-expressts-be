import type { ObjectSchema } from "joi";
import Joi from "joi";
import { MessageStatus } from "../models/Message";

export default class MessageValidation {
  static readonly CREATE: ObjectSchema = Joi.object({
    senderId: Joi.string().required().messages({
      "string.empty": `"senderId" cannot be empty`,
    }),
    recipientId: Joi.string().required().messages({
      "string.empty": `"receiverId" cannot be empty`,
    }),
    message: Joi.string().min(1).max(2000).required().messages({
      "string.empty": `"Message" cannot be empty or too long`,
    }),
  }).strict();
}
