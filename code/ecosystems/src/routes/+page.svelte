<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { type LatLngExpression } from "leaflet";
  import Leaflet from "$lib/components/leaflet.svelte";
  import EcosystemsFilter, {
    type Ecosystem,
  } from "$lib/components/ecosystems-filter.svelte";
  import { onMount } from "svelte";
  import Position from "$lib/components/position.svelte";

  let ecosystems: Ecosystem[] = [];
  let initialView: LatLngExpression = [21.56, 24.2744];
  let currentEcosystem: Ecosystem = { name: "AlmaLinux", count: 0 };

  onMount(async () => {
    try {
      const response = await fetch("/ecosystems.json");
      if (!response.ok) {
        throw new Error("Failed to load ecosystems data");
      }
      ecosystems = await response.json();
    } catch (error) {
      console.error("Error fetching ecosystems:", error);
    }
  });

  function handleEcosystemSelect(ecosystem: Ecosystem) {
    initialView = ecosystem.latLng || [21.56, 24.2744];
    currentEcosystem = ecosystem;
  }

</script>

<div class="w-full h-screen">
  <div class="absolute bottom-10 left-10 z-20 flex flex-row gap-4 items-baseline">
    <Position ecosystem={currentEcosystem}></Position>
    <EcosystemsFilter onClick={handleEcosystemSelect} {ecosystems}></EcosystemsFilter>
  </div>
  <Leaflet view={initialView} zoomFactor={10}></Leaflet>
</div>
