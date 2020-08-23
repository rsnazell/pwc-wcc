import React from "react";
import { render, screen, act } from "@testing-library/react";
import ForecastDay from "./ForecastDay";
import { UNITS } from "../weather/Weather.constants";
import { mockData } from "./mockData";

declare let global: { fetch: {} };

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData.weatherAPIResponse),
  })
);

const mockProps = {
  units: UNITS.METRIC,
  location: "Sydney",
  setCoordinates: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  sessionStorage.clear();
});

describe("<ForecastDay />", () => {
  it("renders the component successfully", async () => {
    render(<ForecastDay {...mockProps} />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    await act(() => Promise.resolve());
    await expect(screen.getByTestId("forecast-day-weather")).toBeInTheDocument();
  });

  it("renders the current date", async () => {
    render(<ForecastDay {...mockProps} />);
    await act(() => Promise.resolve());
    expect(screen.getByTestId("forecast-day-container")).toBeInTheDocument();
  });

  it("renders current weather description", async () => {
    render(<ForecastDay {...mockProps} />);
    await act(() => Promise.resolve());
    await expect(screen.getByTestId("forecast-day-weather")).toBeInTheDocument();
    expect(screen.getByText(/Clear/i)).toBeInTheDocument();
  });

  it("renders current weather icon with descriptive aria-label", async () => {
    render(<ForecastDay {...mockProps} />);
    await act(() => Promise.resolve());
    await expect(screen.getByTestId("forecast-day-weather")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByAltText("Clear icon")).toBeInTheDocument();
  });

  it("renders current weather temperature", async () => {
    render(<ForecastDay {...mockProps} />);
    await act(() => Promise.resolve());
    await expect(screen.getByTestId("forecast-day-weather")).toBeInTheDocument();
    expect(screen.getByTestId("forecast-day-weather")).toHaveTextContent("10°C");
  });

  it("renders detailed weather attributes", async () => {
    render(<ForecastDay {...mockProps} />);
    await act(() => Promise.resolve());
    await expect(screen.getByTestId("forecast-day-weather")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByRole("list")).toHaveTextContent("Humidity: 51%");
    expect(screen.getByRole("list")).toHaveTextContent("Cloudiness: 8%");
    expect(screen.getByRole("list")).toHaveTextContent("Wind: 17.7 km/h");
  });
});
