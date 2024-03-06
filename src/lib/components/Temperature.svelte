<script lang="ts">
  import Clock from "./Clock.svelte";

  type $$Props = {
    showClock?: boolean;

    data: {
      location: string;
      temperature: number;
      refTemperature?: number;

      minTemperature?: number;
      maxTemperature?: number;
    };
  };

  export let data: $$Props["data"];
  export let showClock: $$Props["showClock"] = true;
</script>

<div class="rounded-xl border bg-card text-card-foreground shadow p-6">
  <!-- title -->
  <slot name="header">
  <div class="flex flex-col space-y-1.5 font-semibold">
    {#if showClock}
      <div class="inline-flex items-center justify-between">
        <div>{new Date().toLocaleDateString("en-US", { weekday: "long" })}</div>
        <Clock />
      </div>
    {/if}
    <div class="capitalize">{data.location}</div>
  </div>
</slot>

  {#if data?.temperature}
    <div class="flex flex-col items-center justify-center py-7 md:py-10">
      <div class="inline-flex items-center">
        <h1 class="text-7xl font-bold">{data.temperature}</h1>
        <h2 class="ms-1 text-6xl font-bold text-primary">&deg;C</h2>
      </div>
      {#if data.refTemperature}
        {@const threshold = Math.abs(data.refTemperature - data.temperature).toFixed(2)}
        <div class="mt-5 text-muted-foreground font-medium">± {threshold} &deg;C</div>
      {/if}
    </div>

    {#if data.minTemperature && data.maxTemperature}
      <div class="font-medium text-sm text-muted-foreground inline-flex space-x-2 pt-2">
        <p>Min: {data.minTemperature} &deg;C</p>
        <p>Min: {data.maxTemperature} &deg;C</p>
      </div>
    {/if}
  {:else}
    <div class="bg-muted rounded-lg animate-pulse mt-7 md:mt-10 h-32" />
    <div class="bg-muted rounded-lg animate-pulse h-10 mt-5" />
  {/if}
</div>
