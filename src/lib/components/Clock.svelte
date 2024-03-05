<script lang="ts">
  import { onMount } from "svelte";

  let date: Date = new Date();
  export let timeZone: string | undefined = undefined;

  onMount(() => {
    const timer = setInterval(() => (date = new Date()), 1000);
    return () => clearInterval(timer);
  });
</script>

<div class="tabular-nums">
  {date.toLocaleTimeString("en-US", {
    timeZone,
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  })}
</div>
