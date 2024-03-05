<script lang="ts">
  import "../app.pcss";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import { ModeWatcher } from "mode-watcher";
  import { QueryClientProvider } from "@tanstack/svelte-query";

  import { deviceStatus } from "$lib/stores";
  import { mqttClient } from "$lib/mqttClient";
  import Tabs from "$lib/components/Tabs.svelte";
  import Header from "$lib/components/Header.svelte";
  import Sonner from "$lib/components/Sonner.svelte";

  export let data;
  const queryClient = data.queryClient;

  function parsePayload(payload: string) {
    const [action, keyValueString] = payload.split("|");
    if (!keyValueString) return { action, data: undefined };

    const data = Object.fromEntries(
      keyValueString.split(",").map((pair) => pair.split("=").map((str) => str.trim()))
    );
    return { action, data };
  }

  onMount(() => {
    const PING_INTERVAL_MS = 30 * 1000;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    // send PING request to arduino every 30s
    const intervalId = setInterval(() => {
      clearTimeout(timeoutId);
      console.debug("sending `PING`");
      mqttClient.publish("@major-project/browser", "PING");

      // wait for 5s
      timeoutId = setTimeout(() => {
        deviceStatus.set("disconected");
        toast.error("Device disconnected!", { id: "ping" });
        timeoutId = undefined;
      }, 5000);
    }, PING_INTERVAL_MS);

    mqttClient.on("connect", () => {
      console.log("connected!");
      mqttClient.subscribe("@major-project/iot");
      mqttClient.publish("@major-project/browser", "PING");
    });

    mqttClient.on("message", (topic: string, payload: any) => {
      if (!topic.toString().startsWith("@major-project")) return;

      // else handle my payload
      const { action, data } = parsePayload(payload.toString());

      // DEBUG
      // console.log(action, data);

      switch (action) {
        case "PONG": {
          deviceStatus.set("connected");
          if (timeoutId) clearTimeout(timeoutId);
          toast.success("PONG reveived from device! Device up and running!", { id: "ping" });
          break;
        }
        case "DHT11READING": {
          console.log(data);
          queryClient.setQueryData(["dht11-reading"], () => ({
            temperature: Number(data?.temperature),
            humidity: Number(data?.humidity)
          }));

          console.log(queryClient.getQueryData(["dht11-reading"]));

          break;
        }
        default: {
          break;
        }
      }
    });

    // cleanout
    return () => {
      clearInterval(intervalId);
      mqttClient.end();
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
