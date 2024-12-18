<script>
  import { clickOutside } from "svelte-outside";
  import { writable } from "svelte/store";
  let step = writable(1);
</script>

<div class="w-full h-screen flex flex-col items-center justify-center bg-black">
  {#if $step == 1}
    <div
      class="font-meyrin text-base text-center"
      use:clickOutside={(e) => {
        console.log("display artefacts");
      }}
    >
      <p class="text-red-400">
        This is some introductory text, this is how it works
      </p>
      <div class="flex gap-4 justify-end">
        <a href="/explore" class="underline text-red-300"
          >I already know how it works!</a
        >
        <button
          onclick={() => {
            step.update((n) => n + 1);
          }}
          class="underline text-red-400">next slide</button
        >
      </div>
    </div>
  {/if}
  {#if $step == 2}
    <div class="font-meyrin text-base text-center">
      <p class="text-red-400">Okay this is the second explanation, lalala</p>
      <div class="flex gap-4 justify-end">
        <button
          onclick={() => {
            step.update((n) => n + 1);
          }}
          class="underline text-red-400">next slide</button
        >
      </div>
    </div>
  {/if}
  {#if $step == 3}
    <div class="font-meyrin text-base text-center">
      <p class="text-red-400">Okay this is the third explanation, lalala</p>
      <div class="flex gap-4 justify-end">
        <a href="/explore" class="underline text-red-400 text-end">explore !</a>
      </div>
    </div>
  {/if}
</div>
