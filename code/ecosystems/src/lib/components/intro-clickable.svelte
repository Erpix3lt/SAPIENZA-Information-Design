<script lang="ts">
  let descriptions = ["This is just some stupid intro text, talking about the project. This goes on and on and on. The user should be able to go to the page right now.", "This is a description of the second page", "This is a description of the third page"];
  let index = 0;

  function handleNext(){
   index = (index + 1) % descriptions.length;
  }
</script>




<div class="text-cabbage-pont-400 flex flex-col items-end ml-2">
  <p class="font-arial font-bold text-2xl">
    {descriptions[index]}
  </p>
  <button onclick={handleNext} class="font-arialBlack font-black hover:underline">NEXT</button>
</div>