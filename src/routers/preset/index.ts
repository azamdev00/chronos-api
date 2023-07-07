import { Router } from "express";
import {
  addPreset,
  clearPresets,
  getPresets,
  updatePresets,
} from "../../controllers/presets";

export const presetRouter = Router();

presetRouter.get("/", getPresets);

presetRouter.post("/", addPreset);

presetRouter.put("/:id", updatePresets);

presetRouter.delete("/", clearPresets);
