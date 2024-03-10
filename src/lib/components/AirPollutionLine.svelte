<script lang="ts">
  import { AirVentIcon } from "lucide-svelte";
  export let data: { aqi: number | undefined };

  let progress: HTMLDivElement;

  $: if (progress && data?.aqi) {
    const leftPos = (data.aqi - 1) * 15 + 5;
    progress.style.left = leftPos + "%";
  }
</script>

<div class="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-6 overflow-clip">
  <div class="inline-flex items-center space-x-3 pb-4">
    <AirVentIcon class="w-4 h-4" />
    <div class="font-semibold">Air Pollution</div>
  </div>

  <div class="mt-4">
    <div
      class="progress relative h-2.5 w-full overflow-hidden rounded-full bg-secondary"
      class:animate-pulse={!data?.aqi}>
      {#if data.aqi}
        <div
          bind:this={progress}
          title="{data.aqi} μg/m³"
          class="z-10 absolute h-2.5 w-2.5 flex-1 rounded-full bg-primary shadow-lg shadow-foreground ring-2 ring-background transition-all cursor-pointer hover:ring-primary hover:ring-offset-1 hover:ring-offset-background" />
      {/if}
    </div>
  </div>

  <div class="mt-4">
    {#if data.aqi}
      {data.aqi == 1
        ? "Air quality is good."
        : data.aqi == 2
          ? "Air quality is moderate."
          : data.aqi == 3
            ? "Air quality is unhealthy for sensitive groups."
            : data.aqi == 4
              ? "Air quality is unhealthy."
              : data.aqi == 5
                ? "Air quality is very unhealthy."
                : "Air quality is hazardous."}
    {:else}
      <div class="h-8 bg-muted rounded-lg animate-pulse"></div>
    {/if}
  </div>
</div>

<style>
  .progress {
    background: linear-gradient(
      90deg,
      rgba(58, 110, 180, 1) 0%,
      rgba(126, 212, 87, 1) 20%,
      rgba(248, 212, 73, 1) 40%,
      rgba(235, 77, 96, 1) 60%,
      rgba(180, 96, 231, 1) 80%,
      rgba(178, 34, 34, 1) 100%
    );
  }
</style>
