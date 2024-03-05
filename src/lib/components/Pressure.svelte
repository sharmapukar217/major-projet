<script lang="ts">
  import { GaugeCircleIcon } from "lucide-svelte";

  export let data: { pressure: number | undefined };
</script>

<div class="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-6 overflow-clip">
  <div class="inline-flex items-center space-x-3 pb-4">
    <GaugeCircleIcon class="w-4 h-4" />
    <div class="font-semibold">Pressure</div>
  </div>

  {#if data?.pressure}
    <div class="mt-4">
      <h1 class="font-semibold text-lg md:text-xl">{data.pressure} hPa</h1>
    </div>

    <div class="mt-6">
      <small class="font-medium text-sm text-muted-foreground">
        {data.pressure < 1000
          ? "Low pressure. Expect changes in the weather."
          : data.pressure >= 1000 && data.pressure <= 1010
            ? "Normal pressure. Typical weather conditions."
            : "High pressure. Expect stable and clear weather."}
      </small>
    </div>
  {:else}
    <div class="block bg-muted animate-pulse rounded-lg h-16 my-2" />
    <div class="block bg-muted animate-pulse rounded-lg h-10 mt-6" />
  {/if}
</div>
