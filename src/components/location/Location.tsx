import React, { useState } from "react";
import { Box, TextField } from "@material-ui/core";
import { GeoCoordinates } from "../weather/Weather.types";

interface Props {
  location: string;
  setLocation: (location: string) => void;
  setCoordinates: (coordinates: GeoCoordinates | null) => void;
}

/**
 * Renders an input element to capture weather location. Current location and coordinates
 * are cleared/invalidated on input change. User is required to submit form (press enter)
 * to trigger search.
 */
const Location: React.FC<Props> = ({ location, setLocation, setCoordinates }) => {
  const [value, setValue] = useState(location);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setLocation("");
    setCoordinates(null);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLocation(value);
  };

  return (
    <Box maxWidth={400} marginBottom={3} marginRight={3}>
      <form onSubmit={handleOnSubmit}>
        <TextField
          id="location"
          value={value}
          label="Location"
          fullWidth
          onChange={handleOnChange}
          inputProps={{
            style: { fontSize: 34 },
          }}
        />
      </form>
    </Box>
  );
};

export default Location;
