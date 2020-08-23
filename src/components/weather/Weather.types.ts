export type MeasurementUnit = "metric" | "imperial";

export interface GeoCoordinates {
  lat: number;
  lon: number;
}

export interface OneCallAPIResponse {
  daily: DailyWeather[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

export interface DailyWeather {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: {
    day: number;
    eve: number;
    morn: number;
    night: number;
  };
  humidity: number;
  pop: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
  uvi: number;
  weather: WeatherCondition[];
  wind_deg: number;
  wind_speed: number;
}

export interface WeatherAttributes {
  name: string;
  value: string;
}

export interface WeatherCondition {
  description: string;
  icon: string;
  id: 803;
  main: string;
}

export interface WeatherAPIResponse {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: { type: number; id: number; country: string; sunrise: number; sunset: number };
  timezone: number;
  visibility: number;
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  precipitation?: {
    value: number;
    mode: string;
  };
}
