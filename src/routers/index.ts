import { Router } from "express";
import { presetRouter } from "./preset";
import { stopRouter } from "./stops";

export const mainRouter = Router();

mainRouter.use("/", presetRouter);
mainRouter.use("/", stopRouter);
