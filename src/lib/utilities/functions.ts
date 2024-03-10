import { cubicOut } from "svelte/easing";
import { twMerge } from "tailwind-merge";
import type { TransitionConfig } from "svelte/transition";
import { cnBase, type ClassValue } from "tailwind-variants";
import type { AirComponent } from "$lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(cnBase(inputs));
}

export function toFahrenheit(celsius: number) {
  return (celsius * 9) / 5 + 32;
}

export function flyAndScale(
  node: Element,
  params: { x?: number; y?: number; start?: number; duration?: number } = {}
): TransitionConfig {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (style: Record<string, number | string | undefined>): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + `${key}:${style[key]};`;
    }, "");
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
}

export function calculateAQI(values: AirComponent): number {
  const { co, alcohol, co2, toulene, nh4 } = values;

  // Calculate AQI for each pollutant
  const aqiCO = calculateAQIForPollutant("co", co) || 0;
  const aqiAlcohol = calculateAQIForPollutant("alcohol", alcohol) || 0;
  const aqiCO2 = calculateAQIForPollutant("co2", co2) || 0;
  const aqiToulene = calculateAQIForPollutant("toulene", toulene) || 0;
  const aqiNH4 = calculateAQIForPollutant("nh4", nh4) || 0;

  // Return the maximum AQI among all pollutants
  return Math.max(aqiCO, aqiAlcohol, aqiCO2, aqiToulene, aqiNH4);
}

function calculateAQIForPollutant(pollutant: keyof AirComponent, concentration: number): number {
  // AQI calculation for each pollutant
  const c = concentration;
  let AQI = NaN;
  let c_high;
  let c_low;
  let i_high;
  let i_low;

  switch (pollutant) {
    case "co":
      c_low = [0.0, 4.4, 9.4, 12.4, 15.4, 30.4, 40.4, 50.4];
      c_high = [4.4, 9.4, 12.4, 15.4, 30.4, 40.4, 50.4, Number.MAX_VALUE];
      i_low = [0, 51, 101, 151, 201, 301, 401, 501];
      i_high = [50, 100, 150, 200, 300, 400, 500, 500];
      break;
    case "alcohol":
      c_low = [0, 0.05, 0.1, 0.15, 0.2, 0.4, 0.5, 0.6];
      c_high = [0.05, 0.1, 0.15, 0.2, 0.4, 0.5, 0.6, Number.MAX_VALUE];
      i_low = [0, 51, 101, 151, 201, 301, 401, 501];
      i_high = [50, 100, 150, 200, 300, 400, 500, 500];
      break;
    case "co2":
      c_low = [0, 1000, 2000, 4000, 6000, 10000, 12000, 14000];
      c_high = [1000, 2000, 4000, 6000, 10000, 12000, 14000, Number.MAX_VALUE];
      i_low = [0, 51, 101, 151, 201, 301, 401, 501];
      i_high = [50, 100, 150, 200, 300, 400, 500, 500];
      break;
    case "toulene":
      c_low = [0, 0.56, 1.13, 2.13, 3.03, 6.04, 8.04, 10.04];
      c_high = [0.56, 1.13, 2.13, 3.03, 6.04, 8.04, 10.04, Number.MAX_VALUE];
      i_low = [0, 51, 101, 151, 201, 301, 401, 501];
      i_high = [50, 100, 150, 200, 300, 400, 500, 500];
      break;
    case "nh4":
      c_low = [0, 0.25, 0.5, 0.75, 1.0, 2.0, 2.5, 3.0];
      c_high = [0.25, 0.5, 0.75, 1.0, 2.0, 2.5, 3.0, Number.MAX_VALUE];
      i_low = [0, 51, 101, 151, 201, 301, 401, 501];
      i_high = [50, 100, 150, 200, 300, 400, 500, 500];
      break;
    default:
      return 0;
  }

  for (let i = 0; i < c_low.length; i++) {
    if (c >= c_low[i] && c <= c_high[i]) {
      AQI = ((i_high[i] - i_low[i]) / (c_high[i] - c_low[i])) * (c - c_low[i]) + i_low[i];
      break;
    }
  }

  return Math.round(AQI);
}
