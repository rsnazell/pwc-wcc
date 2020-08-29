import { MeasurementUnit } from "./Weather.types";

export const OWM_URL = "http://api.openweathermap.org";

export const UNITS: { [key: string]: MeasurementUnit } = Object.freeze({
  METRIC: "metric",
  IMPERIAL: "imperial",
});
