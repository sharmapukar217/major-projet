<script lang="ts">
  import type { ForecastData } from "$lib/types";
  import {
    CalendarIcon,
    FlameIcon,
    SnowflakeIcon,
    SunIcon,
    SunMediumIcon,
    SunSnowIcon
  } from "lucide-svelte";
  import emblaCarouselSvelte from "embla-carousel-svelte";

  export let data: Array<ForecastData> | undefined;
</script>

<div class="rounded-xl border bg-card text-card-foreground shadow p-6">
  <div class="inline-flex items-center space-x-3 pb-4">
    <CalendarIcon class="w-4 h-4" />
    <div class="font-semibold">24 hours forecast</div>
  </div>
  <div class="overflow-hidden" use:emblaCarouselSvelte>
    {#if data}
      {#if data.length}
        <div class="flex space-x-5" data-embla-container="">
          {#each data as d}
            <div
              role="group"
              aria-roledescription="slide"
              class="flex flex-col items-center min-w-14 space-y-5 flex-shrink-0 group last:text-primary"
              data-embla-slide>
              <h1
                class="font-medium md:font-semibold text-muted-foreground group-last:text-primary">
                {d.hour}
                {+d.hour > 11 ? "pm" : "am"}
              </h1>

              {#if d.temperature <= 0}
                <SnowflakeIcon />
              {:else if d.temperature <= 10}
                <SunSnowIcon />
              {:else if d.temperature <= 20}
                <SunMediumIcon />
              {:else if d.temperature <= 40}
                <SunIcon />
              {:else}
                <FlameIcon />
              {/if}

              <h1 class="text-sm font-medium text-foreground group-last:text-primary">
                {d.temperature} &deg;C
              </h1>
            </div>
          {/each}
        </div>
      {:else}
        <strong class="text-muted-foreground">No forecast to show currently. ;-( </strong>
      {/if}
    {:else}
      <div class="h-20 w-full bg-muted rounded-lg animate-pulse"></div>
    {/if}
  </div>
</div>
