import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import general from "../constants/general";
import router from "../routes";
import {
  errorHandler,
  methodNotAllowed,
  notFound,
} from "./../middlewares/ErrorHandler";

const createServer = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));

  // To enable logging during development / staging
  if (!general.PRODUCTION) app.use(morgan("dev"));

  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: general.CORS_ORIGIN,
      credentials: true,
      allowedHeaders: ["Content-Type", "Accept", "Authorization"],
    })
  );

  app.use(express.json());

  app.use(router);

  app.use(notFound);

  app.use(methodNotAllowed);

  app.use(errorHandler);

  app.use(function (
    err: any,
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.status(err.status || 500).json({ error: err.message });
    next();
  });

  return app;
};

export default createServer;
