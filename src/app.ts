import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import AppError from "./utils/AppError";
import { errorHandler } from "./middlewares/error.handler";
import { mainRouter } from "./routers";

export const initializeApp = () => {
  const app: Application = express();

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(cookieParser());

  // app.use((req, res, next) => {
  //   if (req.originalUrl === "/socket.io") {
  //     return cors()(req, res, next);
  //   }

  //   return express.json()(req, res, next);
  // });
  app.use(express.urlencoded({ extended: true }));

  app.use(morgan("tiny"));

  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

  app.get("/api", (req, res) => {
    return res.status(200).json({
      name: "Chronos Server API",
      version: "v1.1.0",
    });
  });

  // Main Router

  app.use("/api", mainRouter);

  app.use((req, res, next) => {
    next(
      new AppError(
        "url_not_found",
        `The url ${req.originalUrl} does not exist!`,
        404
      )
    );
  });

  app.use(errorHandler);

  return app;
};
