import { MeasurementUnit } from "./Weather.types";

export const OWM_URL = "https://api.openweathermap.org";

export const UNITS: { [key: string]: MeasurementUnit } = Object.freeze({
  METRIC: "metric",
  IMPERIAL: "imperial",
});
