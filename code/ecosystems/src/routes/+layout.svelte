<script lang="ts">
  import "../app.css";

  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="w-full max-h-screen bg-cabbage-pont-900">
  {@render children?.()}
</div>
