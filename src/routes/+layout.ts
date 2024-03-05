import { browser } from "$app/environment";
import { QueryClient } from "@tanstack/svelte-query";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const load = async () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { enabled: browser } }
  });

  if (browser) {
    const persister = createSyncStoragePersister({
      storage: window.localStorage
    });
    persistQueryClient({ queryClient, persister });
  }

  return { queryClient };
};
