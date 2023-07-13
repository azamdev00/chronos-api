import { getDb } from "../db/conn";
import { Preset, Stop } from "../models/preset";

const db = getDb();

export const collections = {
  STOPS: "stops",
  PRESETS: "presets",
  CURRENTPRESETS: "currentpresets",
};

const stops = db.collection<Stop>(collections.STOPS);

const presets = db.collection<Preset>(collections.PRESETS);

const currentPresets = db.collection<Preset>(collections.CURRENTPRESETS);

const DBCollections = {
  stops,
  presets,
  currentPresets,
};

export default DBCollections;
