import type { NextFunction, Request, Response } from "express"
import logger from "../utils/logger";
import joi from "joi";
import ResponseError from "../errors/response.error";

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if(error instanceof joi.ValidationError){
    const joiError = error as joi.ValidationError;

    logger.warn({
      msg: 'Validation failed',
      path: req.path,
      method: req.method,
      details: joiError.details,
    });

    res.status(400).json({
      statusCode: 400,
      status: "fail",
      message: error.message,
    });
  } else if(error instanceof ResponseError) {
    logger.warn({
      msg: 'Handled ResponseError',
      status: error.status,
      message: error.message,
      path: req.path,
      method: req.method,
    });

    res.status(error.status).json({
      statusCode: error.status,
      status: "fail",
      message: error.message,
    });
  } else {
    logger.error({
      msg: 'Unhandled server error',
      error: error.message,
      stack: error.stack,
      path: req.path,
      method: req.method,
    });

    res.status(500).json({
      statusCode: 500,
      status: "fail",
      errors: error.message,
    });
  }
}

export default errorMiddleware;
