<script>
  import Temperature from "$lib/components/Temperature.svelte";
  import PhMeter from "$lib/components/PhMeter.svelte";

  import { createDB18B20ReadingQuery, createpHReadingQuery } from "$lib/utilities/queries";

  const db18b20Query = createDB18B20ReadingQuery();
  const pHQuery = createpHReadingQuery();

  let dippedInWater = false;
</script>

<button
  on:click={() => (dippedInWater = !dippedInWater)}
  class="font-medium text-base bg-primary text-primary-foreground px-6 py-2 rounded-lg mt-2 mb-5 hover:bg-primary/9 0 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
  {!dippedInWater ? "Start" : "Stop"}
</button>

{#if !dippedInWater}
  <div class="pb-2">
    <strong class="font-medium md:font-semibold text-muted-foreground"
      >Please make sure that both ds18b20 probe and pH probe are dipped in water...</strong>
  </div>
{/if}
<div class="grid w-full grid-cols-1 lg:grid-cols-3 gap-4">
  <!-- left col -->
  <div class="flex w-full min-w-[16rem] flex-col gap-4">
    <Temperature
      data={{ location: "", temperature: dippedInWater ? $db18b20Query.data?.temperature : NaN }}
      showClock={false}>
      <div slot="header" class="font-medium text-lg !text-foreground">Water Temperature</div>
    </Temperature>
  </div>

  <!-- middle col -->
  <div>
    <div class="flex flex-col gap-4">
      <PhMeter data={{ ph: dippedInWater ? $pHQuery.data : NaN }} />
    </div>
  </div>
</div>
