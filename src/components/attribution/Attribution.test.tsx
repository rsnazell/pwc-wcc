import React from "react";
import { render, screen } from "@testing-library/react";
import Attribution from "./Attribution";

describe("<Attribution />", () => {
  it("renders the attribution text", () => {
    render(<Attribution />);
    expect(screen.getByText(/OpenWeatherMap/i)).toBeInTheDocument();
  });
});
