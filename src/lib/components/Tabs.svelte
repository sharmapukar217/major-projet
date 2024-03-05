<script lang="ts">
  import { page } from "$app/stores";
  import { cn } from "$lib/utilities/functions";

  const tabs = [
    { label: "Overview", href: "/" },
    { label: "Air", href: "/air" },
    { label: "Water", href: "/water" }
  ];
</script>

<div
  class="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
  {#each tabs as tab (tab.label)}
    <a
      href={tab.href}
      class={cn(
        "inline-flex items-center justify-center capitalize whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        $page.url.pathname === tab.href && "bg-background text-foreground shadow"
      )}>
      {tab.label}
    </a>
  {/each}
</div>
