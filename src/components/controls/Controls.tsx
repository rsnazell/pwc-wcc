import React from "react";
import { Grid, Switch, Typography } from "@material-ui/core";
import { MeasurementUnit } from "../weather/Weather.types";
import { UNITS } from "../weather/Weather.constants";

interface Props {
  units: MeasurementUnit;
  setUnits: (units: MeasurementUnit) => void;
}

/**
 * Renders control(s) for interacting with weather widget.
 */
const Controls: React.FC<Props> = ({ units, setUnits }) => {
  const handleOnChange = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setUnits(checked ? UNITS.METRIC : UNITS.IMPERIAL);
  };

  return (
    <Typography component="div">
      <Grid component="label" container alignItems="center">
        <Grid item>Imperial</Grid>
        <Grid item>
          <Switch
            checked={units === UNITS.METRIC}
            onChange={handleOnChange}
            color="default"
            inputProps={{ "aria-label": "toggle units between metric and imperial" }}
          />
        </Grid>
        <Grid item>Metric</Grid>
      </Grid>
    </Typography>
  );
};

export default Controls;
