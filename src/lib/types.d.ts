export type AirComponent = {
  CO: number;
  NO: number;
  NO2: number;
  O3: number;
  SO2: number;
  NH3: number;
};

// PM2_5: number;
// PM10: number;

export type Weather = {
  temp: number;
  cloud: number;
  pressure: number;
  humidity: number;
  visibility: number;

  sunset: number;
  sunrise: number;

  wind: {
    speed: number;
    deg: number;
  };
};

export type ForecastData = {
  hour: string;
  temperature: number;
};
