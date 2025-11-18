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

    email: Joi.string()
    .email()  
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
      'string.min': 'Email should have at least 5 characters',
      'string.max': 'Email should have at most 100 characters',
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

  }).strict().options({
    stripUnknown: true,
  });

  static readonly SIGNIN: ObjectSchema = Joi.object({
    email: Joi.string()
    .email()  
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
      'string.min': 'Email should have at least 5 characters',
      'string.max': 'Email should have at most 100 characters',
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
    rememberMe: Joi.boolean()
    .default(false)
    .optional()
    .messages({
      'boolean.base': 'Remember Me must be true or false',
    }),
  }).strict();
}
