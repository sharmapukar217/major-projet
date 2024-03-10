export type AirComponent = {
  co: number;
  alcohol: number;
  co2: number;
  toulene: number;
  nh4: number;
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
  hour: number;
  temperature: number;
};
