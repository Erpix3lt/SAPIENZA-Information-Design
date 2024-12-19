<script lang="ts">
  import type { Ecosystem } from "./navigation.svelte";

  interface Props {
    ecosystem: Ecosystem;
  }

  let { ecosystem }: Props = $props();
</script>

<div class="">
  <p class="p-0 m-0">{ecosystem.name}</p>
</div>
