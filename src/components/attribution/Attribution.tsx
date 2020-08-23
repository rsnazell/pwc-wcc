import React from "react";
import { Box, Typography } from "@material-ui/core";

/**
 * Renders attribution text for weather data.
 */
const Attribution: React.FC = () => (
  <Box display="flex" justifyContent="flex-end">
    <Typography variant="subtitle2" component="p" color={"textSecondary"}>
      Weather data by OpenWeatherMap
    </Typography>
  </Box>
);

export default Attribution;
