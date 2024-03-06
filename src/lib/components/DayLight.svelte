<script lang="ts">
  import { SunriseIcon } from "lucide-svelte";

  export let data: { sunrise?: number; sunset?: number };
  export let timeZone: string | undefined = undefined;

  const convertUTCtoLocal = (unixTimestampUTC: number) => {
    return new Date(unixTimestampUTC * 1000).toLocaleTimeString("en-US", {
      timeZone,
      hour12: true
    });
  };
</script>

<div class="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-6 overflow-clip">
  <div class="inline-flex items-center space-x-3 pb-4">
    <SunriseIcon class="w-4 h-4" />
    <div class="font-semibold">Sunset</div>
  </div>

  {#if data?.sunrise && data?.sunset}
    <div class="mt-4">
      <h1 class="font-semibold text-lg md:text-xl">
        {convertUTCtoLocal(data.sunrise)}
      </h1>
    </div>

    <div class="mt-auto">
      <small class="font-medium text-sm text-muted-foreground">
        {convertUTCtoLocal(data.sunset)}
      </small>
    </div>
  {:else}
    <div class="block bg-muted animate-pulse rounded-lg h-24 my-2" />
    <div class="block bg-muted animate-pulse rounded-lg h-10" />
  {/if}
</div>
