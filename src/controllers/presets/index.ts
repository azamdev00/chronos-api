import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch.async";
import AppError from "../../utils/AppError";
import DBCollections from "../../config/DBCollections";
import { Preset } from "../../models/preset";
import { ObjectId, WithoutId } from "mongodb";
import { ResponseObject } from "../../models/response";

export const addPreset = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: WithoutId<Preset> = req.body;

      console.log(data);

      const insertData: Preset = {
        _id: new ObjectId(),
        ...data,
      };

      const result = await DBCollections.presets.insertOne(insertData);

      if (!result.acknowledged)
        return next(
          new AppError("Database_error", "Please try again later", 500)
        );

      const response: ResponseObject = {
        code: "created",
        message: "Preset added successfully",
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

export const getPresets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const presets: Preset[] = await DBCollections.presets.find().toArray();

      const response: ResponseObject = {
        code: "ok",
        message: "Presets fetch successfully",
        status: "success",
        items: presets,
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return next(new AppError("server_error", "Please try again later", 500));
    }
  }
);

export const clearPresets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      console.log(error);
      return next(new AppError("server_error", "Please try again later", 500));
    }
  }
);

export const updatePresets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      console.log(error);
      return next(new AppError("server_error", "Please try again later", 500));
    }
  }
);

export const updateCurrentPresets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, data } = req.body;

      const preset = await DBCollections.currentPresets.findOne({ email });

      if (!preset)
        await DBCollections.currentPresets.insertOne({ email, ...data });
      else
        await DBCollections.currentPresets.updateOne(
          { email },
          { $set: { ...data } }
        );

      const response: ResponseObject = {
        code: "ok",
        message: "Presets Updated Successfully",
        status: "success",
      };

      res.status(203).json(response);
    } catch (error) {
      console.log(error);
      return next(new AppError("server_error", "Please try again later", 500));
    }
  }
);

export const getCurrentPresets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, data } = req.body;

      const preset = await DBCollections.currentPresets.findOne({ email });

      const response: ResponseObject = {
        code: "ok",
        message: "Presets Updated Successfully",
        status: "success",
        items: preset,
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return next(new AppError("server_error", "Please try again later", 500));
    }
  }
);
