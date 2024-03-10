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
    createDB18B20ReadingQuery,
    createAirQualityApiQuery,
    createMQ135ReadingQuery,
    createDHT11ReadingQUery,
    createWeatherApi
  } from "$lib/utilities/queries";

  const weatherQuery = createWeatherApi();
  const dht11Query = createDHT11ReadingQUery();
  const ds18b20Query = createDB18B20ReadingQuery();
  const airQualityQuery = createAirQualityApiQuery();
  const mq135ReadingQuery = createMQ135ReadingQuery();

  // $: temperatureLists =

  // let temperatureLists: Array<ForecastData> = [];
  const temperatureLists = new Map<ForecastData["hour"], ForecastData>();

  $: {
    const temp = $dht11Query.data?.temperature || $ds18b20Query.data?.temperature;

    if (temp) {
      // temperatureLists.push({ })
      const hour = new Date().getHours();
      const temperature = temp;
      temperatureLists.set(hour, { hour, temperature });
    }
  }
</script>

<div class="grid w-full grid-cols-1 lg:grid-cols-3 gap-4 pb-4">
  <!-- left col -->
  <div class="flex w-full min-w-[16rem] flex-col gap-4">
    <Temperature
      data={{
        location: "Kathmandu",
        temperature: $ds18b20Query.data?.temperature,
        refTemperature: $weatherQuery.data?.temp
        // maxTemperature: $weatherQuery.data?.
      }} />
    <TemperatureList data={Array.from(temperatureLists.values())} />
  </div>

  <!-- middle col -->
  <div>
    <div class="flex flex-col gap-4">
      <AirComponentsPieChart
        data={{ aqi: $airQualityQuery.data?.aqi, components: $mq135ReadingQuery.data }} />
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
      <div class="md:col-span-2">
        <Pressure data={{ pressure: $weatherQuery.data?.pressure }} />
      </div>
      <div>
        <Humidity
          data={{
            humidity: $weatherQuery.data?.humidity,
            refHumidity: $weatherQuery.data?.humidity
          }} />
      </div>
      <div>
        <Visibility data={{ visibility: $weatherQuery.data?.visibility }} />
      </div>
    </div>
  </div>
</div>
