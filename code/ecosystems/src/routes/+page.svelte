<script>
  import Header from "$lib/components/header.svelte";
  import IntroClickable from "$lib/components/intro-clickable.svelte";
  
  let isMobile = false;

  if (typeof window !== 'undefined') {
    isMobile = /Mobi|Android/i.test(window.navigator.userAgent);
  }
</script>

{#if isMobile}
  <div class="font-arialBlack text-3xl uppercase text-pink-500 h-screen flex flex-col items-center justify-center bg-black">
   <p>VIEW ON DESKTOP</p>
   <p>IEW ON DESKTOP</p>
   <p>EW ON DESKTOP</p>
   <p>W ON DESKTOP</p>
   <p> ON DESKTOP</p>
   <p>N DESKTOP</p>
  </div>
{:else}
  <Header></Header>
  <div class="">
    <div class="grid grid-cols-5 place-items-end mt-20">
      <div class="col-start-2">
        <IntroClickable></IntroClickable>
      </div>
      <a
        href="/explore"
        class="font-arialBlack text-xl hover:underline text-pink-500 col-start-3 self-center"
        >JUST TAKE ME THERE!</a
      >
    </div>
    <div class="grid grid-cols-5 place-items-end">
      <div class="col-span-3 col-start-2">
        <img src="/mask.png" alt="vulnerability" />
      </div>
    </div>
    <div class="grid grid-cols-5 place-items-end text-cabbage-pont-400 text-xs mr-2 mb-2">
      <p>IDK yet.</p>
      <p>A project by Adrian, Max.</p>
      <p>2024</p>
      <p>Information Design</p>
      <p>Universita Sapienza</p>
    </div>
  </div>
{/if}
