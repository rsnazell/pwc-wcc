import { MeasurementUnit } from "./Weather.types";

export const APPID = "5debbf2f87fa13a9ff3183d7b91f2f20";

export const UNITS: { [key: string]: MeasurementUnit } = Object.freeze({
  METRIC: "metric",
  IMPERIAL: "imperial",
});
