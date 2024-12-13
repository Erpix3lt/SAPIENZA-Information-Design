<script lang="ts">
  import { onMount, onDestroy, setContext } from "svelte";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { removeLeafletAttribution } from "$lib/helpers";

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

  //image overlay
  const imageUrl ="/mask.png";
  const errorOverlayUrl = ""
  const altText = "alt"
  const latLngBounds = L.latLngBounds([
    [21.56, 24.2744],
    [21.4, 24.1]
  ]);

  onMount(() => {
    if (!bounds && (!view || !zoomFactor)) {
      throw new Error("Must set either bounds, or view and zoom.");
    }

    map = L.map(mapElement!);
    L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(map);

    //add image overlay
    L.imageOverlay(imageUrl, latLngBounds, {
      errorOverlayUrl: errorOverlayUrl,
      alt: altText,
      interactive: true,
    }).addTo(map);
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
        console.log("NEW VIEW", view, zoomFactor);
        map.setView(view, zoomFactor);
      }
    }
  });
</script>

<div class="w-full h-full" bind:this={mapElement}>
  {@render children?.()}
</div>
