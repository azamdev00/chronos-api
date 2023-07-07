import { ObjectId } from "mongodb";

export interface Stop {
  _id: ObjectId;
  ms: number;
  sc: number;
}

export interface Preset {
  _id: ObjectId;
  forceRule: string;
  forceType: string;
  forceValue: number;
  keepForce: boolean;
  name: string;
  selected: boolean;
  showOnTap: boolean;
  tapOnLap: boolean;
  type: string;
  value: string[];
}
