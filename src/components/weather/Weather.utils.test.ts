import { getWindSpeed } from "./Weather.utils";
import { UNITS } from "./Weather.constants";

describe("Weather Utils", () => {
  it("calcuates the correct wind speed", () => {
    expect(getWindSpeed(1, UNITS.METRIC)).toEqual("3.6 km/h");
    expect(getWindSpeed(5, UNITS.METRIC)).toEqual("18 km/h");
    expect(getWindSpeed(10, UNITS.METRIC)).toEqual("36 km/h");
    expect(getWindSpeed(20.75, UNITS.METRIC)).toEqual("74.7 km/h");
    expect(getWindSpeed(1, UNITS.IMPERIAL)).toEqual("1 mph");
    expect(getWindSpeed(5, UNITS.IMPERIAL)).toEqual("5 mph");
    expect(getWindSpeed(10, UNITS.IMPERIAL)).toEqual("10 mph");
    expect(getWindSpeed(20.75, UNITS.IMPERIAL)).toEqual("20.8 mph");
  });
});
