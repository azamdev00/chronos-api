import { Router } from "express";
import {
  addPreset,
  clearPresets,
  getCurrentPresets,
  getPresets,
  updateCurrentPresets,
  updatePresets,
} from "../../controllers/presets";

export const presetRouter = Router();

presetRouter.get("/", getPresets);
presetRouter.get("/current", getCurrentPresets);

presetRouter.post("/", addPreset);

presetRouter.put("/current", updateCurrentPresets);
presetRouter.put("/:id", updatePresets);

presetRouter.delete("/", clearPresets);
