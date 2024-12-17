<script lang="ts">
  export let details = {
    headline: "Headline",
    subheadline: "Subheadline",
    content: "Content",
  };

  function close() {
    console.log("Close");
  }

</script>

<div class="p-2 bg-white rounded shadow-lg border border-gray-200">
  <h1 class="text-lg font-baskervvol text-red-950">{"A headline"}</h1>
  <h2 class="text-base font-baskervvol text-red-900">{"This is a subheadline."}</h2>
  <hr class="border-gray-200" />
  <p class="text-sm font-baskervvol text-gray-950 mb-4">{details.content}</p>
  <div class="flex justify-end gap-2">
    <div class="bg-red-950 text-yellow-50 rounded px-2 font-meyrin">a tag</div>
    <div  class="bg-red-950 text-yellow-50 rounded px-2 font-meyrin">2nd tag</div>
  </div>
</div>
