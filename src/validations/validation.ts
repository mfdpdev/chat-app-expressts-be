import type { Schema } from "joi";

export class Validation {
  static validate<T>(schema: Schema, data: T): T {
    const { error, value } = schema.validate(data, {
      abortEarly: false,
    });

    if(error){
      throw error;
    }

    return value;
  }
}
