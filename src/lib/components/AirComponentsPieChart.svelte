<script lang="ts">
  import { ComponentIcon } from "lucide-svelte";
  // @ts-expect-error
  import { VisSingleContainer, VisTooltip, VisDonut } from "@unovis/svelte";
  import { Donut } from "@unovis/ts";
  import type { AirComponent } from "$lib/types";
  import { onMount } from "svelte";

  export let data: { aqi?: number; components: AirComponent | undefined };

  $: dataset = Object.keys(data.components ?? {}).map((key) => ({
    id: key,
    // @ts-expect-error
    value: data.components[key]
  }));

  const triggers = {
    [Donut.selectors.segment]: (d: any) => {
      return `${d.data.id}: ${d.data.value}`;
    }
  };

  let mounted = false;

  const value = (d: { id: string; value: string }) => d.value;
  onMount(() => (mounted = true));

  const getFreshnessStatus = (aqi?: number) => {
    if (!aqi) return;
    if (aqi < 12) return "Clean";
    else if (aqi >= 12 && aqi < 35.5) return "Good";
    else if (aqi >= 35.5 && aqi < 55.5) return "Fair";
    else if (aqi >= 55.5 && aqi < 150.5) return "Poor";
    else if (aqi >= 150.5 && aqi < 250.5) return "Very Poor";
    else return "Unclean";
  };
</script>

<div class="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-6 overflow-clip">
  <div class="inline-flex items-center space-x-3 pb-4">
    <ComponentIcon class="w-4 h-4" />
    <div class="font-semibold">Air components</div>
  </div>

  {#if data?.components && mounted}
    <div id="air-components-chart">
      <VisSingleContainer
        width="100%"
        data={dataset}
        margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
        <VisTooltip {value} {triggers} />
        <VisDonut
          {value}
          arcWidth={40}
          centralLabel={data?.aqi ? `${data?.aqi} μg/m³` : undefined}
          centralSubLabel={getFreshnessStatus(data?.aqi)} />
      </VisSingleContainer>
    </div>
  {:else}
    <div class="flex items-center justify-center py-2">
      <div
        class="w-72 h-72 rounded-full bg-transparent border-[32px] animate-pulse flex-shrink-0" />
    </div>
  {/if}
</div>

<style lang="postcss">
  :global(#air-components-chart) {
    --vis-donut-central-label-font-size: 16px;
    --vis-donut-central-label-text-color: theme("colors.foreground");

    --vis-donut-central-sub-label-font-size: 14px;
    --vis-donut-central-sub-label-text-color: theme("colors.muted.foreground");
  }
</style>
