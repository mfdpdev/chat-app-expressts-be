import type { Request } from "express"

export interface CustomRequest extends Request {
  user?: {
    _id: string
  },
}
