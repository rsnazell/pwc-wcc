import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@material-ui/core";
import hash from "object-hash";
import dayjs from "../../services/dayjs";
import { GeoCoordinates, MeasurementUnit, OneCallAPIResponse } from "../weather/Weather.types";
import { OWM_URL } from "../weather/Weather.constants";

interface Props {
  coordinates: GeoCoordinates | null;
  units: MeasurementUnit;
}

/**
 * Renders daily weather forecast for next week based on given lon/lat coordinates.
 * API data is cached to sessionStorage for max 1 hour.
 */
const ForecastWeek: React.FC<Props> = ({ coordinates, units }) => {
  const [data, setData] = useState<OneCallAPIResponse | null>(null);
  const isDesktop = useMediaQuery("(min-width:780px)");

  useEffect(() => {
    if (coordinates) {
      fetchData();
    } else {
      setData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates, units]);

  const fetchData = async () => {
    try {
      const key = hash(`${JSON.stringify(coordinates)}${units}${dayjs().format("YYYYMMDDHH")}`); // max cache time: 60 mins
      const cached = sessionStorage?.getItem(key);
      if (cached) {
        setData(JSON.parse(cached));
      } else {
        const url = process.env.NODE_ENV === "development" ? "" : OWM_URL;
        const response = await fetch(
          `${url}/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&units=${units}&exclude=current,minutely,hourly&APPID=${process.env.REACT_APP_OWM_ID}`
        );
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setData(json);
        sessionStorage?.setItem(key, JSON.stringify(json));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    data && (
      <Box
        data-testid="forecast-week-container"
        display="flex"
        flexDirection="row"
        alignContent="flex-start"
        flexWrap={isDesktop ? "nowrap" : "wrap"}
        role="grid"
      >
        {data.daily.map((daily, index) => {
          const weekday = dayjs(daily.dt * 1000).format("dddd");
          const icon = daily.weather[0].icon;
          const description = daily.weather[0].main;
          const tempMax = `${daily.temp.max.toLocaleString("en-AU", {
            maximumFractionDigits: 0,
          })}°`;
          const tempMin = `${daily.temp.min.toLocaleString("en-AU", {
            maximumFractionDigits: 0,
          })}°`;
          return (
            index < 7 && (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                marginBottom={3}
                flexGrow={isDesktop ? 1 : 0}
                minWidth={100}
                key={index}
                role="gridcell"
              >
                <Typography align="center" variant="body2">
                  {index === 0 ? "Today" : weekday}
                </Typography>
                <img
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  width={100}
                  height={100}
                  alt={`${description} icon`}
                />
                <Box display="flex" flexDirection="row" justifyContent="space-around">
                  <Box marginRight={1}>
                    <Typography
                      variant="body1"
                      component="span"
                      aria-label="Maximum daily temperature"
                    >
                      {tempMax}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      component="span"
                      color="textSecondary"
                      aria-label="Minimum daily temperature"
                    >
                      {tempMin}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          );
        })}
      </Box>
    )
  );
};

export default ForecastWeek;
