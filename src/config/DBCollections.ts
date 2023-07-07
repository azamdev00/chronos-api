import { getDb } from "../db/conn";
import { Preset, Stop } from "../models/preset";

const db = getDb();

export const collections = {
  STOPS: "stops",
  PRESETS: "presets",
};

const stops = db.collection<Stop>(collections.STOPS);

const presets = db.collection<Preset>(collections.PRESETS);

const DBCollections = {
  stops,
  presets,
};

export default DBCollections;
