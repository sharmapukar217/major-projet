import { createQuery } from "@tanstack/svelte-query";

export const createDHT11ReadingQUery = () => {
  return createQuery({
    queryKey: ["dht11-reading"],
    initialData: { temperature: NaN, humidity: NaN }
  });
};
