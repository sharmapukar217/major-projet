<script>
  import { deviceStatus } from "$lib/stores";
  import Temperature from "$lib/components/Temperature.svelte";
  import WindMeter from "$lib/components/WindMeter.svelte";
  import Humidity from "$lib/components/Humidity.svelte";
  import Visibility from "$lib/components/Visibility.svelte";

  import AirPollutionLine from "$lib/components/AirPollutionLine.svelte";
  import AirComponentsPieChart from "$lib/components/AirComponentsPieChart.svelte";
  import {
    createDB18B20ReadingQuery,
    createAirQualityApiQuery,
    createDHT11ReadingQUery,
    createWeatherApi,

    createMQ135ReadingQuery

  } from "$lib/utilities/queries";

  const weatherQuery = createWeatherApi();
  const dht11Query = createDHT11ReadingQUery();
  const db18b20Query = createDB18B20ReadingQuery();
  const airQualityQuery = createAirQualityApiQuery();
  const mq135ReadingQuery = createMQ135ReadingQuery();
</script>

{#if $deviceStatus === "disconected"}
  <strong class="text-sm text-muted-foreground">Device inactive. Please try again later...</strong>
{/if}
<div class="grid w-full grid-cols-1 lg:grid-cols-3 gap-4">
  <!-- left col -->
  <div class="flex w-full min-w-[16rem] flex-col gap-4">
    <Temperature
      data={{
        location: "Kathmandu",
        temperature: $db18b20Query.data?.temperature,
        refTemperature: $weatherQuery.data?.temp
      }} />
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
