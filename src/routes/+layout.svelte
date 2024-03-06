<script lang="ts">
  import "../app.pcss";
  import { onMount } from "svelte";
  import { ModeWatcher } from "mode-watcher";
  import { QueryClientProvider } from "@tanstack/svelte-query";

  import { toast } from "svelte-sonner";
  import { deviceStatus } from "$lib/stores";
  import Tabs from "$lib/components/Tabs.svelte";
  import Header from "$lib/components/Header.svelte";
  import Sonner from "$lib/components/Sonner.svelte";

  export let data;
  const queryClient = data.queryClient;

  let ws: WebSocket;
  onMount(() => {
    const PING_INTERVAL_MS = 30 * 1000;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (!ws) {
      ws = new WebSocket(
        "wss://free.blr2.piesocket.com/v3/1?api_key=orFnMkDESWthOXRcl0J4yJo05uMHtkWbUOMxYDPK"
      );
    }

    window.ws = ws;
    ws.addEventListener("open", function () {
      ws.send("PING");
    });

    ws.addEventListener("message", function (ev) {
      const json = JSON.parse(ev.data ?? "{}");
      if (!json?.event) return;

      const { event, data = {} } = json;
      console.debug(json);

      switch (event) {
        case "DHT11": {
          deviceStatus.set("connected");
          queryClient.setQueryData(["dht11-reading"], () => ({
            humidity: Number(data.humidity),
            temperature: Number(data.temperature).toFixed(2)
          }));
        }
        case "PONG": {
          deviceStatus.set("connected");
          toast.dismiss("ping");

          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = undefined;
          }
        }
      }
    });

    // send ping every 30s
    const intervalId = setInterval(() => {
      ws.send("PING");
    }, PING_INTERVAL_MS);

    return () => {
      ws.close();
      // clearInterval(intervalId);
    };
  });
</script>

<QueryClientProvider client={queryClient}>
  <Sonner />
  <ModeWatcher />

  <Header />

  <div class="container pt-4">
    <Tabs />
  </div>

  <main class="pt-4 container">
    <slot />
  </main>
</QueryClientProvider>
