<script lang="ts">
  import { clickOutside } from "svelte-outside"
  import { writable } from "svelte/store";

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
  let isFilter = writable(false);

  function toggleFilter() {
    isFilter.update((value) => !value);
  }
</script>

<div use:clickOutside={(e) => {isFilter.set(false) }}>
  {#if $isFilter}
    <div 
      class="scroll-container flex gap-8 overflow-x-scroll text-9xl max-w-7xl"
    >
      {#each ecosystems as ecosystem}
        <button
          onclick={() => onClick(ecosystem)}
          class="font-baskervvol whitespace-nowrap text-red-950 hover:text-white transition-colors duration-200"
        >
          {ecosystem.name}
        </button>
      {/each}
    </div>
  {/if}

  <button
    onclick={toggleFilter}
    class="rounded font-meyrin text-white text-lg whitespace-nowrap bg-red-950 px-2 hover:bg-red-900"
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
