<script lang="ts">
  import { run } from 'svelte/legacy';

  import {
    onMount,
    onDestroy,
    setContext,
    createEventDispatcher,
    tick,
  } from "svelte";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { removeLeafletAttribution } from "$lib/helpers";

  interface Props {
    bounds?: L.LatLngBoundsExpression | undefined;
    view?: L.LatLngExpression | undefined;
    zoomFactor?: number | undefined;
    children?: import('svelte').Snippet;
  }

  let {
    bounds = undefined,
    view = undefined,
    zoomFactor = undefined,
    children
  }: Props = $props();
	const mbUrl =
	"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

  const dispatch = createEventDispatcher();

  let map: L.Map | undefined = $state();
  let mapElement: HTMLElement | undefined = $state();

  onMount(() => {
    if (!bounds && (!view || !zoomFactor)) {
      throw new Error("Must set either bounds, or view and zoom.");
    }

    map = L.map(mapElement!)
      .on("zoom", (e) => dispatch("zoom", e))
      .on("popupopen", async (e) => {
        await tick();
        e.popup.update();
      });

    L.tileLayer(mbUrl, { id: "mapbox.streets" }).addTo(
      map
    );
    removeLeafletAttribution(document);
  });

  onDestroy(() => {
    map?.remove();
    map = undefined;
  });

  setContext("map", {
    getMap: () => map,
  });

  run(() => {
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
