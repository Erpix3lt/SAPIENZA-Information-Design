<script lang="ts">
  import type { Ecosystem } from "./ecosystems-filter.svelte";

  interface Props {
    ecosystem: Ecosystem;
  }

  let { ecosystem }: Props = $props();
</script>

<div class="font-meyrin font-black text-red-600 text-lg underline">
  <p class="p-0 m-0">{ecosystem.name}</p>
</div>
