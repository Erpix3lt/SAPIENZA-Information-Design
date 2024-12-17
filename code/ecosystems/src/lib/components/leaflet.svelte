<script lang="ts">
  import { onMount, onDestroy, setContext } from "svelte";
  import L, { latLngBounds } from "leaflet";
  import { removeLeafletAttribution } from "$lib/leaflet/helpers";
  import { createGTileLayer } from "$lib/leaflet/map";
  import { createOverlayWithPopup } from "$lib/leaflet/overlay";

  interface Props {
    bounds?: L.LatLngBoundsExpression | undefined;
    view?: L.LatLngExpression | undefined;
    zoomFactor?: number | undefined;
    children?: import("svelte").Snippet;
  }

  let {
    bounds = undefined,
    view = undefined,
    zoomFactor = undefined,
    children,
  }: Props = $props();

  let map: L.Map | undefined = $state();
  let mapElement: HTMLElement | undefined = $state();
  let imageOverlay: L.ImageOverlay | undefined = $state();

  onMount(() => {
    if (!bounds && (!view || !zoomFactor)) {
      throw new Error("Must set either bounds, or view and zoom.");
    }

    map = L.map(mapElement!);
    createGTileLayer().addTo(map);
    imageOverlay = createOverlayWithPopup("GG");
    imageOverlay.addTo(map);
    imageOverlay = createOverlayWithPopup("GG", L.latLngBounds([
  [21.66, 24.3744],
  [21.5, 24.2],
]));
    imageOverlay.addTo(map);
    imageOverlay = createOverlayWithPopup("GG", L.latLngBounds([
  [21.76, 24.9744],
  [21.2, 24.3],
]));
    imageOverlay.addTo(map);
    imageOverlay = createOverlayWithPopup("GG", L.latLngBounds([
  [21.36, 24.5744],
  [21.1, 24.0],
]));
    imageOverlay.addTo(map);

    removeLeafletAttribution(document);
  });

  onDestroy(() => {
    map?.remove();
    map = undefined;
  });

  setContext("map", {
    getMap: () => map,
  });

  $effect(() => {
    if (map) {
      if (bounds) {
        map.fitBounds(bounds);
      } else if (view && zoomFactor) {
        map.setView(view, zoomFactor);
      }
    }
  });
</script>

<div class="w-full h-full" bind:this={mapElement}>
  {@render children?.()}
</div>

<style>
  :global(.leaflet-popup-content-wrapper) {
    background: none;
    box-shadow: none;
  }

  :global(.leaflet-popup-close-button) {
   display: none;
  }

  :global(.leaflet-popup-tip-container) {
   display: none;
  }

  :global(.leaflet-control-zoom) {
   display: none;
  }

  :global(.leaflet-pane) {
    z-index: 10;
  }
</style>