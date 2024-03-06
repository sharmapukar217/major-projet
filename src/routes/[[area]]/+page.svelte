<script lang="ts">
  import Temperature from "$lib/components/Temperature.svelte";
  import TemperatureList from "$lib/components/TemperatureList.svelte";
  import WindMeter from "$lib/components/WindMeter.svelte";
  import DayLight from "$lib/components/DayLight.svelte";
  import Pressure from "$lib/components/Pressure.svelte";
  import Humidity from "$lib/components/Humidity.svelte";
  import Visibility from "$lib/components/Visibility.svelte";

  import type { ForecastData } from "$lib/types";
  import AirPollutionLine from "$lib/components/AirPollutionLine.svelte";
  import AirComponentsPieChart from "$lib/components/AirComponentsPieChart.svelte";
  import {
    createAirQualityApiQuery,
    createDHT11ReadingQUery,
    createWeatherApi
  } from "$lib/utilities/queries";

  const weatherQuery = createWeatherApi();
  const dht11Query = createDHT11ReadingQUery();
  const airQualityQuery = createAirQualityApiQuery();

  // $: temperatureLists =

  // let temperatureLists: Array<ForecastData> = [];
  const temperatureLists = new Map<ForecastData["hour"], ForecastData>();

  $: {
    if ($dht11Query.data?.temperature) {
      // temperatureLists.push({ })
      const hour = new Date().getHours();
      const temperature = $dht11Query.data?.temperature;
      temperatureLists.set(hour, { hour, temperature });
    }
  }
</script>

<div class="grid w-full grid-cols-1 lg:grid-cols-3 gap-4">
  <!-- left col -->
  <div class="flex w-full min-w-[16rem] flex-col gap-4">
    <Temperature
      data={{
        location: "Kathmandu",
        temperature: $dht11Query.data?.temperature,
        refTemperature: $weatherQuery.data?.temp
        // maxTemperature: $weatherQuery.data?.
      }} />
    <TemperatureList data={Array.from(temperatureLists.values())} />
  </div>

  <!-- middle col -->
  <div>
    <div class="flex flex-col gap-4">
      <AirComponentsPieChart
        data={{ aqi: $airQualityQuery.data?.aqi, components: $airQualityQuery.data?.components }} />
      <AirPollutionLine data={{ aqi: $airQualityQuery.data?.aqi }} />
    </div>
  </div>

  <!-- right col -->
  <div>
    <div class="grid sm:grid-cols-2 gap-4">
      <div>
        <WindMeter
          data={{ deg: $weatherQuery.data?.wind?.deg, speed: $weatherQuery.data?.wind?.speed }} />
      </div>
      <DayLight
        data={{ sunrise: $weatherQuery.data?.sunrise, sunset: $weatherQuery.data?.sunset }} />
      <div class="col-span-2">
        <Pressure data={{ pressure: $weatherQuery.data?.pressure }} />
      </div>
      <div>
        <Humidity
          data={{
            humidity: $dht11Query.data?.humidity,
            refHumidity: $weatherQuery.data?.humidity
          }} />
      </div>
      <div>
        <Visibility data={{ visibility: $weatherQuery.data?.visibility }} />
      </div>
    </div>
  </div>
</div>
