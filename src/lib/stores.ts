import { writable } from "svelte/store";

type DeviceStatus = "unknown" | "connected" | "disconected";

export const deviceStatus = writable<DeviceStatus>("unknown");
