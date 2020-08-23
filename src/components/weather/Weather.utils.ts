import { MeasurementUnit } from "./Weather.types";

/**
 * Converts metric wind speeds from meter/second to km/h. Returns string
 * with km/h | mph suffix.
 */
export const getWindSpeed = (speed: number, units: MeasurementUnit) => {
  const perHour = units === "metric" ? speed * 3.6 : speed;
  const speedUnit = units === "metric" ? "km/h" : "mph";

  return `${perHour.toLocaleString("en-AU", { maximumFractionDigits: 1 })} ${speedUnit}`;
};
