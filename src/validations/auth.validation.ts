import type { ObjectSchema } from "joi";
import Joi from "joi";

export default class AuthValidation {
  static readonly SIGNUP: ObjectSchema = Joi.object({
    name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name should have at least 2 characters',
      'string.max': 'Name should have at most 50 characters',
    }),

    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Username is required',
      'string.alphanum': 'Username must only contain alpha-numeric characters',
      'string.min': 'Username should have at least 3 characters',
      'string.max': 'Username should have at most 30 characters',
    }),

    password: Joi.string()
    .min(6)
    .max(128)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password should have at least 6 characters',
      'string.max': 'Password should have at most 128 characters',
    }),
  }).strict();

  static readonly SIGNIN: ObjectSchema = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Username is required',
      'string.alphanum': 'Username must only contain alpha-numeric characters',
      'string.min': 'Username should have at least 3 characters',
      'string.max': 'Username should have at most 30 characters',
    }),

    password: Joi.string()
    .min(6)
    .max(128)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password should have at least 6 characters',
      'string.max': 'Password should have at most 128 characters',
    }),
  }).strict();
}
