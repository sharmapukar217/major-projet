<script lang="ts">
  import { AirVentIcon } from "lucide-svelte";
  export let data: { ph: number | undefined };

  let progress: HTMLDivElement;

  $: if (progress && data?.ph) {
    const pH = Math.max(0, Math.min(14, data.ph));
    progress.style.left = (pH / 14) * 100 + "%";
  }

  function getpHLevelText(pH?: number) {
    if (!pH) return "Unknown";
    if (pH >= 0 && pH < 3) {
      return "Strongly Acidic";
    } else if (pH >= 3 && pH < 5) {
      return "Moderately Acidic";
    } else if (pH >= 5 && pH < 7) {
      return "Slightly Acidic";
    } else if (pH === 7) {
      return "Neutral";
    } else if (pH > 7 && pH <= 9) {
      return "Slightly Basic";
    } else if (pH > 9 && pH <= 11) {
      return "Moderately Basic";
    } else if (pH > 11 && pH <= 14) {
      return "Strongly Basic";
    } else {
      return "Invalid pH value";
    }
  }

  function getComment(pH: number) {
    if (pH < 0 || pH > 14) {
      return "Invalid pH value. pH should be between 0 and 14.";
    } else if (pH < 6.5) {
      return "Highly acidic water. Not suitable for drinking.";
    } else if (pH < 7.5) {
      return "Slightly acidic water. Generally safe to drink.";
    } else if (pH < 8.5) {
      return "Optimal pH level for drinking water. Safe to drink.";
    } else {
      return "Slightly alkaline to highly alkaline water. Not suitable for drinking.";
    }
  }

  $: label = getpHLevelText(data?.ph);
</script>

<div class="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-6 overflow-clip">
  <div class="inline-flex items-center space-x-3 pb-4">
    <AirVentIcon class="w-4 h-4" />
    <div class="font-semibold">Ph Meter</div>
  </div>

  <div class="mt-4">
    <div
      class="progress relative h-2.5 w-full overflow-hidden rounded-full bg-secondary"
      class:animate-pulse={!data?.ph}>
      {#if data.ph}
        <div
          bind:this={progress}
          title="pH level {data.ph} [{label}]"
          class="z-10 absolute h-2.5 w-2.5 flex-1 rounded-full bg-primary shadow-lg shadow-foreground ring-2 ring-background transition-all cursor-pointer hover:ring-primary hover:ring-offset-1 hover:ring-offset-background" />
      {/if}
    </div>
  </div>

  {#if data?.ph}
    <div class="mt-4 text-sm font-medium text-muted-foreground">{getComment(data.ph)}</div>
  {/if}
</div>

<style lang="postcss">
  .progress {
    background: linear-gradient(
      to right,
      rgba(255, 0, 0, 1) 0%,
      /* pH 0: Red */ rgba(255, 140, 0, 1) 7.1%,
      /* pH 1: Orange */ rgba(255, 255, 0, 1) 14.2%,
      /* pH 2: Yellow */ rgba(0, 255, 0, 1) 21.3%,
      /* pH 3: Green */ rgba(30, 144, 255, 1) 28.4%,
      /* pH 4: Dodger Blue */ rgba(0, 0, 255, 1) 35.5%,
      /* pH 5: Blue */ rgba(75, 0, 130, 1) 42.6%,
      /* pH 6: Indigo */ hsl(var(--color-foreground)) 49.7%,
      /* pH 7: Dark Violet */ rgba(255, 20, 147, 1) 56.8%,
      /* pH 8: Deep Pink */ rgba(255, 105, 180, 1) 63.9%,
      /* pH 9: Hot Pink */ rgba(255, 192, 203, 1) 71%,
      /* pH 10: Pink */ rgba(255, 215, 0, 1) 78.1%,
      /* pH 11: Gold */ rgba(255, 165, 0, 1) 85.2%,
      /* pH 12: Orange */ rgba(255, 69, 0, 1) 92.3%,
      /* pH 13: Orange Red */ rgba(148, 0, 211, 1) 100% /* pH 14: White */
    );
  }
</style>
