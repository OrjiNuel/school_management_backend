import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const methodNotAllowed = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`Method Not Allowed - ${req.originalUrl}`);
  res.status(405);
  next(error);
};

export const errorHandler = (err: ZodError, _req: Request, res: Response) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env["NODE_ENV"] === "production" ? null : err.stack,
  });
};