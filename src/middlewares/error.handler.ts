import { ErrorRequestHandler, Request, Response } from "express";
import { ResponseCode, ResponseObject } from "../models/response";
import AppError from "../utils/AppError";

const sendErrorDev = (err: any, req: Request, res: Response) => {
  console.log(err);
  const response: ResponseObject = {
    status: err.status,
    code: err.code as ResponseCode,
    message: err.message,
    error: err,
    stack: err.stack,
  };

  res.status(err.statusCode).json(response);
};

const sendErrorProd = (err: AppError, req: Request, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    const response: ResponseObject = {
      status: err.status,
      code: err.code as ResponseCode,
      message: err.message,
    };

    return res.status(err.statusCode).json(response);
  }
  // Programming or other unknown error
  // 1) Log error
  console.error("ERROR 💥: ", err);

  // 2) Send generic message
  const response: ResponseObject = {
    status: "error",
    code: "server_error",
    message: "Something went very wrong!",
  };
  return res.status(500).json(response);
};

export const errorHandler: ErrorRequestHandler = function (
  err,
  req,
  res,
  next
) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else {
    sendErrorProd(err, req, res);
  }
};
