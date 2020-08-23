import React from "react";
import { render, screen, act } from "@testing-library/react";
import ForecastWeek from "./ForecastWeek";
import { UNITS } from "../weather/Weather.constants";
import { mockData } from "./mockData";

declare let global: { fetch: {} };

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData.oneCallAPIResponse),
  })
);

const mockProps = {
  units: UNITS.METRIC,
  coordinates: { lat: -33.87, lon: 151.21 },
};

beforeEach(() => {
  jest.clearAllMocks();
  sessionStorage.clear();
});

describe("<ForecastWeek />", () => {
  it("renders the component successfully", async () => {
    render(<ForecastWeek {...mockProps} />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    await act(() => Promise.resolve());
    await expect(screen.getByTestId("forecast-week-container")).toBeInTheDocument();
  });

  it("renders nothing if no location coordinates", () => {
    render(<ForecastWeek {...mockProps} coordinates={null} />);
    expect(global.fetch).not.toHaveBeenCalled();
    expect(screen.queryByTestId("forecast-week-container")).not.toBeInTheDocument();
  });

  it("renders weather forecast for 7 days", async () => {
    render(<ForecastWeek {...mockProps} />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    await act(() => Promise.resolve());
    await expect(screen.getByTestId("forecast-week-container")).toBeInTheDocument();
    expect(screen.getAllByRole("gridcell")).toHaveLength(7);
  });

  it("renders correct day names", async () => {
    render(<ForecastWeek {...mockProps} />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    await act(() => Promise.resolve());
    await expect(screen.getByTestId("forecast-week-container")).toBeInTheDocument();
    expect(screen.getAllByRole("gridcell")[0]).toHaveTextContent("Today");
    expect(screen.getByText(/Monday/i)).toBeInTheDocument();
    expect(screen.getByText(/Tuesday/i)).toBeInTheDocument();
    expect(screen.getByText(/Wednesday/i)).toBeInTheDocument();
    expect(screen.getByText(/Thursday/i)).toBeInTheDocument();
    expect(screen.getByText(/Friday/i)).toBeInTheDocument();
    expect(screen.getByText(/Saturday/i)).toBeInTheDocument();
  });

  it("renders weather icons with descriptive aria-labels", async () => {
    render(<ForecastWeek {...mockProps} />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    await act(() => Promise.resolve());
    await expect(screen.getByTestId("forecast-week-container")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(7);
    expect(screen.getAllByAltText("Clouds icon")).toHaveLength(2);
    expect(screen.getAllByAltText("Clear icon")).toHaveLength(5);
  });

  it("renders maximum daily temperature", async () => {
    render(<ForecastWeek {...mockProps} />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    await act(() => Promise.resolve());
    await expect(screen.getByTestId("forecast-week-container")).toBeInTheDocument();
    const monday = screen.getAllByRole("gridcell")[1];
    expect(monday).toHaveTextContent("Monday");
    expect(monday).toHaveTextContent("14°");
  });

  it("renders minimum daily temperature", async () => {
    render(<ForecastWeek {...mockProps} />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    await act(() => Promise.resolve());
    await expect(screen.getByTestId("forecast-week-container")).toBeInTheDocument();
    const monday = screen.getAllByRole("gridcell")[1];
    expect(monday).toHaveTextContent("Monday");
    expect(monday).toHaveTextContent("8°");
  });
});
