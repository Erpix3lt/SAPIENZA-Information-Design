<script lang="ts">
  import type { Ecosystem } from "./ecosystems-filter.svelte";

  interface Props {
    ecosystem: Ecosystem;
  }

  let { ecosystem }: Props = $props();
</script>

<div class="rounded font-meyrin font-black text-red-950 text-lg underline bg-white px-2 h-fit">
  <p class="p-0 m-0">{ecosystem.name}</p>
</div>
