import { Router } from "express";
import { addStop, clearStops, getStops } from "../../controllers/stops";

export const stopRouter = Router();

stopRouter.get("/", getStops);

stopRouter.post("/", addStop);

stopRouter.delete("/", clearStops);
