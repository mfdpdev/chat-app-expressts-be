import type { ObjectSchema } from "joi";
import Joi from "joi";
import { MessageStatus } from "../models/Message";

export default class MessageValidation {
  static readonly CREATE: ObjectSchema = Joi.object({
    conversationId: Joi.string().trim().min(1).required().messages({
      "string.empty": `"conversationId" cannot be empty`,
    }),
    senderId: Joi.string().trim().min(1).required().messages({
      "string.empty": `"senderId" cannot be empty`,
    }),
    content: Joi.string().trim().min(1).required().messages({
      "string.empty": `"content" cannot be empty`,
    }),
    readStatus: Joi.string()
    .valid(...Object.values(MessageStatus))
    .default(MessageStatus.SENT),
  }).strict();
}
