<script lang="ts">
  import { DropletsIcon } from "lucide-svelte";

  export let data: { visibility: number | undefined };
</script>

<div class="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-6 overflow-clip">
  <div class="inline-flex items-center space-x-3 pb-4">
    <DropletsIcon class="w-4 h-4" />
    <div class="font-semibold">Visibility</div>
  </div>

  {#if data?.visibility}
    <div class="mt-4">
      <h1 class="font-semibold text-lg md:text-xl">{data.visibility} km</h1>
    </div>

    <div class="mt-6">
      <small class="font-medium text-sm text-muted-foreground">
        {data.visibility >= 10
          ? "It's perfectly clear right now."
          : data.visibility >= 5
            ? "Good visibility."
            : "Poor visibility. Exercise caution while driving or moving around."}
      </small>
    </div>
  {:else}
    <div class="block bg-muted animate-pulse rounded-lg h-16 mt-2 mb-2" />
    <div class="block bg-muted animate-pulse rounded-lg h-9" />
  {/if}
</div>
