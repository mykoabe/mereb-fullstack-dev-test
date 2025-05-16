import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse";

interface ErrorWithStatusCode extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}

const errorHandler = (
  err: ErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err };

  error.message = err.message;
  
  // Log to console for dev
  console.log(err);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

const urlNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ErrorResponse(`URL ${req.originalUrl} not found 🤷‍♂️`, 404);
  return next(new ErrorResponse(error.message, error.statusCode));
};

export { errorHandler, urlNotFound };
