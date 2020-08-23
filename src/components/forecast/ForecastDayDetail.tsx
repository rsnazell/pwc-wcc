import React from "react";
import { List, ListItem } from "./ForecastDay.styled";
import { Typography } from "@material-ui/core";
import { WeatherAttributes } from "../weather/Weather.types";

interface Props {
  attributes: WeatherAttributes[];
}

/**
 * Renders detailed weather attributes for the current day's forecast.
 */
export const ForecastDayDetail: React.FC<Props> = ({ attributes }) =>
  !attributes.length ? null : (
    <List>
      {attributes.map(({ name, value }) => (
        <ListItem key={name}>
          <Typography variant="body1" component="span" color="textSecondary">
            {name}:{" "}
          </Typography>
          <Typography variant="body1" component="span" color="textPrimary">
            {value}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
