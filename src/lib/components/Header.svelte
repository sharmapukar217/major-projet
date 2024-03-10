<script lang="ts">
  import { mode, toggleMode } from "mode-watcher";
  import { LightbulbIcon, MoonIcon } from "lucide-svelte";

  import Button from "./Button.svelte";
  import { deviceStatus } from "$lib/stores";
  import HeaderIcon from "./HeaderIcon.svelte";
  import { cn } from "$lib/utilities/functions";
  import { toast } from "svelte-sonner";

  let isPinging = false;

  const handleClick = () => {
    isPinging = true;
    deviceStatus.set("unknown");

    window.ws.send("PING");
    toast.loading("Sending `PING` event", { id: "ping" });
  };

  $: if ($deviceStatus === "connected" && isPinging) {
    toast.success("Received `PONG`, device is online!", { id: "ping" });
    isPinging = false;
  }
</script>

<header class="sticky top-0 bg-background z-50 border-b py-2 md:py-4">
  <div class="container flex">
    <a href="/"><HeaderIcon class="w-10 h-10" /></a>
    <div class="inline-flex items-center ml-auto space-x-4">
      <Button
        variant="outline"
        size="icon"
        title={$deviceStatus}
        on:click={handleClick}
        disabled={isPinging}>
        <div
          class={cn(
            "w-2 h-2 rounded-full",
            $deviceStatus === "unknown" && "bg-muted",
            $deviceStatus === "connected" && "bg-green-500",
            $deviceStatus === "disconected" && "bg-red-500"
          )} />
      </Button>

      <Button variant="outline" size="icon" title={$mode} on:click={() => toggleMode()}>
        {#if $mode === "light"}
          <LightbulbIcon />
        {:else}
          <MoonIcon />
        {/if}
      </Button>
    </div>
  </div>
</header>
