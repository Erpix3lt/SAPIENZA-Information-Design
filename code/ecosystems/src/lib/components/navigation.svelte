<script lang="ts">
  import { clickOutside } from "svelte-outside";
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

<div
  use:clickOutside={(e) => {
    isFilter.set(false);
  }}
>
  <button
    onclick={toggleFilter}
    class="font-arialBlack text-xl hover:underline text-pink-500 uppercase"
    >Choose ecosystem</button
  >
  {#if $isFilter}
    <div
      class="scroll-container flex flex-col overflow-y-scroll max-h-96"
    >
      {#each ecosystems as ecosystem}
        <button
          onclick={() => onClick(ecosystem)}
          class="font-arialBlack text-lg hover:underline text-pink-400 text-end"
        >
          {ecosystem.name}
        </button>
      {/each}
    </div>
  {/if}
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
