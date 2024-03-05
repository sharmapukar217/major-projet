import mqtt from "mqtt";

declare global {
  // eslint-disable-next-line no-var
  var _mqttClient: any;
}

export const mqttClient = globalThis._mqttClient ?? mqtt.connect("mqtt://public.mqtthq.com/mqtt");

if (!import.meta.env.PROD) globalThis._mqttClient = mqttClient;
