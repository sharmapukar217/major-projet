<script lang="ts">
  import { DropletsIcon } from "lucide-svelte";

  export let data: { humidity: number | undefined };
</script>

<div class="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-6 overflow-clip">
  <div class="inline-flex items-center space-x-3 pb-4">
    <DropletsIcon class="w-4 h-4" />
    <div class="font-semibold">Humidity</div>
  </div>

  {#if data?.humidity}
    <div class="mt-4">
      <h1 class="font-semibold text-lg md:text-xl">{data.humidity} &deg;</h1>
    </div>

    <div class="mt-6">
      <small class="font-medium text-sm text-muted-foreground">
        {data.humidity < 40
          ? "Low humidity. It might feel dry."
          : data.humidity < 70
            ? "Moderate humidity. Comfortable conditions."
            : "High humidity. It might feel humid and uncomfortable."}
      </small>
    </div>
  {:else}
    <div class="block bg-muted animate-pulse rounded-lg h-24 mt-2 mb-3" />
    <div class="block bg-muted animate-pulse rounded-lg h-10" />
  {/if}
</div>
