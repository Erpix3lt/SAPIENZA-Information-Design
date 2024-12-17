<script lang="ts">
  export let details = {
    headline: "Headline",
    subheadline: "Subheadline",
    content: "Content",
  };

</script>

<div class="p-2 bg-slate-50">
  <h1 class="text-2xl font-bold text-gray-800 mb-2">{details.headline}</h1>
  <h2 class="text-base text-gray-600 mb-4">{details.subheadline}</h2>
  <p class="text-sm text-gray-800 mb-4">{details.content}</p>
</div>
