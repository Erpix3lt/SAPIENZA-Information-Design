<script lang="ts">
  export type Ecosystem = {
    name: string;
    count: number;
    latLng?: [number, number];
  };

  interface Props {
    ecosystems: Ecosystem[];
    onClick: (ecosystem: Ecosystem) => void;
  }

  let { ecosystems = [], onClick }: Props = $props();

  import { writable } from "svelte/store";

  let isFilter = writable(false);
  function toggleFilter() {
    isFilter.update((value) => !value);
  }
</script>

<div>
  {#if $isFilter}
    <div class="scroll-container flex gap-8 overflow-x-scroll text-9xl max-w-7xl">
      {#each ecosystems as ecosystem}
        <button
          onclick={() => onClick(ecosystem)}
          class="font-baskervvol whitespace-nowrap text-red-700 hover:text-yellow-200 transition-colors duration-200"
        >
          {ecosystem.name}
        </button>
      {/each}
    </div>
  {/if}
  <button
    onclick={toggleFilter}
    class="font-meyrin text-yellow-200 text-lg whitespace-nowrap bg-red-700 px-2 hover:bg-red-600"
    >Choose ecosystem</button
  >
</div>

<style>
  .scroll-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scroll-container::-webkit-scrollbar {
    display: none;
  }
</style>
