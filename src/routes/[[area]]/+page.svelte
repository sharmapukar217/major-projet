<script>
  import Temperature from "$lib/components/Temperature.svelte";
  import TemperatureList from "$lib/components/TemperatureList.svelte";
  import WindMeter from "$lib/components/WindMeter.svelte";
  import DayLight from "$lib/components/DayLight.svelte";
  import Pressure from "$lib/components/Pressure.svelte";
  import Humidity from "$lib/components/Humidity.svelte";
  import Visibility from "$lib/components/Visibility.svelte";

  import AirPollutionLine from "$lib/components/AirPollutionLine.svelte";
  import AirComponentsPieChart from "$lib/components/AirComponentsPieChart.svelte";
  import { createDHT11ReadingQUery } from "$lib/utilities/queries";

  const dht11Query = createDHT11ReadingQUery();
</script>

<div class="grid w-full grid-cols-1 lg:grid-cols-3 gap-4">
  <!-- left col -->
  <div class="flex w-full min-w-[16rem] flex-col gap-4">
    <Temperature data={{ location: "Kathmandu", temperature: $dht11Query.data?.temperature }} />
    <TemperatureList data={[]} />
  </div>

  <!-- middle col -->
  <div>
    <div class="flex flex-col gap-4">
      <AirComponentsPieChart data={{ composition: {
        CO: 10,
        NH3: 20,
        NO2: 30
      } }} />
      <AirPollutionLine data={{ ppm: 2 }} />
    </div>
  </div>

  <!-- right col -->
  <div>
    <div class="grid sm:grid-cols-2 gap-4">
      <div>
        <WindMeter data={{ deg: 30, speed: 10 }} />
      </div>
      <DayLight data={{ sunrise: Date.now(), sunset: Date.now() }} />
      <div class="col-span-2">
        <Pressure data={{ pressure: 10 }} />
      </div>
      <div>
        <Humidity data={{ humidity: $dht11Query.data?.humidity }} />
      </div>
      <div>
        <Visibility data={{ visibility: 1 }} />
      </div>
    </div>
  </div>
</div>
