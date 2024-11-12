<script lang="ts">
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

  export let bounds: L.LatLngBoundsExpression | undefined = undefined;
  export let view: L.LatLngExpression | undefined = undefined;
  export let zoomFactor: number | undefined = undefined;
	const mbUrl =
	"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

  const dispatch = createEventDispatcher();

  let map: L.Map | undefined;
  let mapElement: HTMLElement;

  onMount(() => {
    if (!bounds && (!view || !zoomFactor)) {
      throw new Error("Must set either bounds, or view and zoom.");
    }

    map = L.map(mapElement)
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

  $: if (map) {
    if (bounds) {
      map.fitBounds(bounds);
    } else if (view && zoomFactor) {
      map.setView(view, zoomFactor);
    }
  }
</script>

<div class="w-full h-full" bind:this={mapElement}>
  <slot></slot>
</div>
