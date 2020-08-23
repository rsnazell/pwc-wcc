import React from "react";
import { render, screen } from "@testing-library/react";
import Weather from "./Weather";

describe("<Weather />", () => {
  it("renders the weather component", () => {
    render(<Weather />);
    expect(screen.getByTestId("weather-container")).toBeInTheDocument();
  });
});
