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
  let lastUpdated = Date.now();
  const queryClient = data.queryClient;

  let ws: WebSocket;
  onMount(() => {
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
      try {
        const json = JSON.parse(ev.data ?? "{}");
        if (!json?.event) return;

        const { event, data = {} } = json;
        console.debug(json);

        lastUpdated = Date.now();
        deviceStatus.set("connected");

        switch (event) {
          case "DHT11": {
            return queryClient.setQueryData(["dht11-reading"], () => ({
              humidity: Number(data.humidity),
              temperature: Number(data.temperature).toFixed(2)
            }));
          }
          case "DS18B20": {
            return queryClient.setQueryData(["ds18b20-reading"], () => ({
              temperature: Number(data.temperature).toFixed(2)
            }));
          }
          case "MQ135": {
            return queryClient.setQueryData(["mq135-reading"], () => data);
          }
          case "pH": {
            return queryClient.setQueryData(["pH-reading"], () => {
              const ph = data?.pH;
              return (ph> 0 && ph<= 14) ? Math.min(Math.max(parseInt(ph), 6.32), 9.86) : NaN;
            });
          }
          case "PONG": {
            return toast.dismiss("ping");
          }
        }
      } catch {
        // don't handle error
      }
    });

    const intervalId = setInterval(function () {
      if (Date.now() - lastUpdated > 30) {
        deviceStatus.set("disconected");
        ws.send("PING");
      }
    }, 30_000);

    return () => {
      clearInterval(intervalId);
      ws.close();
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
