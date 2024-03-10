import { createQuery } from "@tanstack/svelte-query";
import type { AirComponent, Weather } from "$lib/types";

export const createDHT11ReadingQUery = () => {
  return createQuery({
    queryKey: ["dht11-reading"],
    initialData: { temperature: NaN, humidity: NaN }
  });
};

export const createDB18B20ReadingQuery = () => {
  return createQuery({
    queryKey: ["ds18b20-reading"],
    initialData: { temperature: NaN }
  });
};

export const createpHReadingQuery = () => {
  return createQuery({
    queryKey: ["pH-reading"],
    initialData: NaN
  });
};

export const createMQ135ReadingQuery = () => {
  return createQuery<AirComponent>({
    queryKey: ["mq135-reading"],
    initialData: { co2: NaN, co: NaN, alcohol: NaN, toulene: NaN, nh4: NaN }
  });
};

/** get data from api */
export const createWeatherApi = () => {
  return createQuery<Weather>({
    queryKey: ["weather(api)"],
    refetchInterval: 5 * 60 * 1000,
    queryFn: async ({ signal }) => {
      const latitdue = 27.6955136;
      const longitude = 85.3311488;

      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.searchParams.set("appid", "b85fbaaae73c3ed27bd3e39ddbeba6d1");

      url.searchParams.set("lat", String(latitdue));
      url.searchParams.set("lon", String(longitude));

      const response = await fetch(url, { signal });
      const json = await response.json();

      if (!response.ok) throw json.message;

      return {
        sunrise: Number(json.sys?.sunrise),
        sunset: Number(json.sys?.sunset),
        temp: Number(json.main?.temp) - 273.15,
        pressure: Number(json.main?.pressure),
        humidity: Number(json.main?.humidity),
        wind: {
          speed: Number(json.wind?.speed),
          deg: Number(json.wind?.deg)
        },
        visibility: Number(json.visibility),
        cloud: Number(json.clouds?.all)
      };
    }
  });
};

/** get air pollution data from api */
export const createAirQualityApiQuery = () => {
  return createQuery<{ aqi: number; components: AirComponent }>({
    queryKey: ["air-pollution (api)"],
    refetchInterval: 5 * 60 * 1000,
    queryFn: async ({ signal }) => {
      const latitdue = 27.6955136;
      const longitude = 85.3311488;

      const url = new URL("https://api.openweathermap.org/data/2.5/air_pollution");
      url.searchParams.set("appid", "b85fbaaae73c3ed27bd3e39ddbeba6d1");

      url.searchParams.set("lat", String(latitdue));
      url.searchParams.set("lon", String(longitude));

      const response = await fetch(url, { signal });
      const json = await response.json();

      if (!response.ok) throw json.message;

      const data = json?.list?.[0] ?? {};

      return {
        aqi: Number(data.main?.aqi),
        components: {
          co: Number(data.components?.co),
          co2: Number(data.components?.co2),
          alcohol: Number(data.components?.alcohol),
          toulene: Number(data.components?.so2),
          nh4: Number(data.components?.nh3)
        }
      };
    }
  });
};
