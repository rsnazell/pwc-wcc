import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import hash from "object-hash";
import dayjs from "../../services/dayjs";
import {
  GeoCoordinates,
  MeasurementUnit,
  WeatherAPIResponse,
  WeatherAttributes,
} from "../weather/Weather.types";
import { getWindSpeed } from "../weather/Weather.utils";
import { ForecastDayDetail } from "./ForecastDayDetail";
import { OWM_URL, UNITS } from "../weather/Weather.constants";

interface Props {
  location: string;
  units: MeasurementUnit;
  setCoordinates: (coordinates: GeoCoordinates | null) => void;
}

/**
 * Renders weather forecast for the current day based on given location query string.
 * If location match found, sets geo coordinates (required for weekly forecast API call).
 * API data is cached to sessionStorage for max 1 hour.
 */
const ForecastDay: React.FC<Props> = ({ location, units, setCoordinates }) => {
  const [data, setData] = useState<WeatherAPIResponse | null>(null);
  const [isError, setIsError] = useState(false);
  const [attributes, setAttributes] = useState<WeatherAttributes[]>([]);
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [temp, setTemp] = useState("");
  const [tempUnit, setTempUnit] = useState("");

  const today = dayjs().format("dddd, MMMM Do");

  useEffect(() => {
    setIsError(false);
    if (location) {
      fetchData();
    } else {
      setData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, units]);

  const fetchData = async () => {
    try {
      const key = hash(`${location}${units}${dayjs().format("YYYYMMDDHH")}`); // max cache time: 60 mins
      const cached = sessionStorage?.getItem(key);
      if (cached) {
        setWeatherData(JSON.parse(cached));
      } else {
        const url = process.env.NODE_ENV === "development" ? "" : OWM_URL;
        const response = await fetch(
          `${url}/data/2.5/weather?q=${location}&units=${units}&APPID=${process.env.REACT_APP_OWM_ID}`
        );
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setWeatherData(json);
        sessionStorage?.setItem(key, JSON.stringify(json));
      }
    } catch (_error) {
      setIsError(true);
    }
  };

  const setWeatherData = (data: WeatherAPIResponse) => {
    setData(data);
    setCoordinates({ ...data.coord });
    setAttributes([
      { name: "Humidity", value: `${data.main.humidity}%` },
      { name: "Cloudiness", value: `${data.clouds.all}%` },
      { name: "Pressure", value: `${data.main.pressure} hPa` },
      {
        name: "Wind",
        value: `${getWindSpeed(data.wind.speed, units)}`,
      },
    ]);
    setDescription(data.weather[0].main);
    setIcon(data.weather[0].icon);
    setTemp(data.main.temp.toLocaleString("en-AU", { maximumFractionDigits: 0 }));
    setTempUnit(units === UNITS.METRIC ? "°C" : "°F");
  };

  const isLoading = location && !data;
  const isSuccess = location && data && !isError;

  return (
    <Box data-testid="forecast-day-container">
      <Typography variant="body1" gutterBottom>
        {today}
      </Typography>
      <Box marginBottom={3}>
        {isLoading && (
          <Box display="flex" justifyContent="center" padding={4}>
            <CircularProgress />
          </Box>
        )}
        {isError && (
          <Box display="flex" justifyContent="center" padding={4}>
            <Typography variant="body1">No weather data for this location.</Typography>
          </Box>
        )}
        {isSuccess && (
          <Box data-testid="forecast-day-weather">
            <Typography variant="body1" gutterBottom>
              {description}
            </Typography>
            <Box display="flex" flexDirection="row">
              <Box flexGrow={1} width="50%" marginRight={3}>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <img
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                    width={100}
                    height={100}
                    alt={`${description} icon`}
                  />
                  <Box display="flex" alignItems="flex-start">
                    <Typography variant="h3">{temp}</Typography>
                    <Typography variant="h6" color="textSecondary">
                      {tempUnit}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box flexGrow={1} width="50%">
                <ForecastDayDetail attributes={attributes} />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ForecastDay;
