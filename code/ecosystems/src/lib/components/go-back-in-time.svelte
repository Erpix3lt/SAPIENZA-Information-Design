<script lang="ts">
  import type { Ecosystem } from "./navigation.svelte";

  interface Props {
    onClick: () => void;
  }

  let { onClick }: Props = $props();
</script>

<button onclick={onClick} class="rounded font-meyrin font-black text-white text-lg whitespace-nowrap bg-red-950 hover:bg-red-900 px-2 h-fit">
 go back in time
</button>
