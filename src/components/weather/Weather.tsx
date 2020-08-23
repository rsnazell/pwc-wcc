import React, { useState } from "react";
import { Box, useMediaQuery } from "@material-ui/core";
import Location from "../location/Location";
import ForecastDay from "../forecast/ForecastDay";
import ForecastWeek from "../forecast/ForecastWeek";
import Attribution from "../attribution/Attribution";
import Controls from "../controls/Controls";
import { GeoCoordinates, MeasurementUnit } from "./Weather.types";
import { UNITS } from "./Weather.constants";

/**
 * Renders the current weather and weekly forecast for a given location. User
 * can input new location and change units.
 */
const Weather: React.FC = () => {
  const [location, setLocation] = useState<string>("Sydney");
  const [coordinates, setCoordinates] = useState<GeoCoordinates | null>(null);
  const [units, setUnits] = useState<MeasurementUnit>(UNITS.METRIC);
  const isDesktop = useMediaQuery("(min-width:720px)");

  return (
    <Box padding={3} border="solid 1px #e9e9e9" borderRadius={4} data-testid="weather-container">
      <Box
        display="flex"
        flexDirection={isDesktop ? "row" : "column"}
        marginBottom={isDesktop ? 0 : 3}
      >
        <Box flexGrow="1">
          <Location location={location} setLocation={setLocation} setCoordinates={setCoordinates} />
        </Box>
        <Controls units={units} setUnits={setUnits} />
      </Box>
      <ForecastDay location={location} units={units} setCoordinates={setCoordinates} />
      <ForecastWeek coordinates={coordinates} units={units} />
      <Attribution />
    </Box>
  );
};

export default Weather;
