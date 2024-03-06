<script>
  import Temperature from "$lib/components/Temperature.svelte";
  import PhMeter from "$lib/components/PhMeter.svelte";
  
</script>

<div class="grid w-full grid-cols-1 lg:grid-cols-3 gap-4">
  <!-- left col -->
  <div class="flex w-full min-w-[16rem] flex-col gap-4">
    <Temperature data={{ location: "", temperature: 10 }} showClock={false}>
      <div slot="header" class="font-medium text-lg !text-foreground">Water Temperature</div>
    </Temperature>
  </div>

  <!-- middle col -->
  <div>
    <div class="flex flex-col gap-4">
      <PhMeter data={{ ph: 7 }} />
    </div>
  </div>
</div>
