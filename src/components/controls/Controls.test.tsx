import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Controls from "./Controls";
import { UNITS } from "../weather/Weather.constants";

const mockProps = {
  units: UNITS.METRIC,
  setUnits: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("<Controls />", () => {
  it("renders an input element with label and aria-role", () => {
    render(<Controls {...mockProps} />);
    expect(screen.getByLabelText(/Metric/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Imperial/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("toggles unit value when input is changed", () => {
    render(<Controls {...mockProps} />);
    const checkbox = screen.getByRole("checkbox");
    expect(mockProps.setUnits).not.toHaveBeenCalled();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(mockProps.setUnits).toHaveBeenLastCalledWith(UNITS.IMPERIAL);
  });
});
