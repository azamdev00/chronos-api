import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch.async";
import AppError from "../../utils/AppError";
import { ObjectId, WithoutId } from "mongodb";
import { Stop } from "../../models/preset";
import DBCollections from "../../config/DBCollections";
import { ResponseObject } from "../../models/response";

export const addStop = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: WithoutId<Stop> = req.body;

      console.log(data);

      const insertData: Stop = {
        _id: new ObjectId(),
        ...data,
      };

      const result = await DBCollections.stops.insertOne(insertData);

      if (!result.acknowledged)
        return next(
          new AppError("Database_error", "Please try again later", 500)
        );

      const response: ResponseObject = {
        code: "created",
        message: "Stop is added successfully",
        status: "success",
        items: insertData,
      };

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return next(new AppError("server_error", "Please try again later", 500));
    }
  }
);

export const getStops = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stops: Stop[] = await DBCollections.stops.find().toArray();

      const response: ResponseObject = {
        code: "ok",
        message: "Stops fetch successfully",
        status: "success",
        items: stops,
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return next(new AppError("server_error", "Please try again later", 500));
    }
  }
);

export const clearStops = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await DBCollections.stops.deleteMany();
      if (!result.acknowledged)
        return next(
          new AppError("Database_error", "Please try again later", 500)
        );

      const response: ResponseObject = {
        code: "deleted",
        message: "Stops deleted successfully",
        status: "success",
      };

      res.status(202).json(response);
    } catch (error) {
      console.log(error);
      return next(new AppError("server_error", "Please try again later", 500));
    }
  }
);
