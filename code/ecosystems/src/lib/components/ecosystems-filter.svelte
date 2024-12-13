<script lang="ts">
  import Button from "./ui/button/button.svelte";

  export type Ecosystem = {
    name: string;
    count: number;
    latLng?: [number, number];
  };

  interface Props {
    ecosystems: Ecosystem[];
    onClick: (ecosystem: Ecosystem) => void;
  }

  let {
    ecosystems = [],
    onClick,
  }: Props = $props();
</script>

<style>
  .scroll-container {
    -ms-overflow-style: none; 
    scrollbar-width: none;
  }

  .scroll-container::-webkit-scrollbar {
    display: none;
  }
</style>

<div class="scroll-container flex gap-2 overflow-x-scroll">
  {#each ecosystems as ecosystem}
    <Button on:click={() => (onClick(ecosystem))} variant="ghost">{ecosystem.name}</Button>
  {/each}
</div>
