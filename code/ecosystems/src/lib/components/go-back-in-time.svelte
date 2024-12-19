<script lang="ts">
  import type { Ecosystem } from "./navigation.svelte";

  interface Props {
    onClick: () => void;
  }

  let { onClick }: Props = $props();
</script>

<button onclick={onClick} class="font-arialBlack text-xl hover:underline text-pink-500 uppercase">
  Back in time
</button>
