<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { type LatLngExpression } from "leaflet";
  import Leaflet from "$lib/components/leaflet.svelte";
  import EcosystemsFilter, {
    type Ecosystem,
  } from "$lib/components/navigation.svelte";
  import { onMount } from "svelte";
  import Position from "$lib/components/position.svelte";
  import GoBackInTime from "$lib/components/go-back-in-time.svelte";

  let ecosystems: Ecosystem[] = [];
  let view: LatLngExpression = [21.56, 24.2744];
  let currentEcosystem: Ecosystem = { name: "AlmaLinux", count: 0 };

  async function getOsvData(page: number, ecosystem: string) {
    const response = await fetch(`/api/osv/${page}/${ecosystem}`);
    return await response.json();
  }

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

  async function handleEcosystemSelect(ecosystem: Ecosystem) {
    currentEcosystem = ecosystem;
    view = ecosystem.latLng || [21.56, 24.2744];
    console.log("Data", await getOsvData(1, ecosystem.name));
  }

  async function handleGoBackInTime(ecosystem: Ecosystem) {
    console.log("Going back in time");
    console.log("Data", await getOsvData(1, ecosystem.name));
  }

</script>

<div class="w-full h-screen">
  <div class="absolute bottom-10 left-10 z-20 flex flex-row gap-4 items-baseline">
    <Position ecosystem={currentEcosystem}></Position>
    <GoBackInTime onClick={() => handleGoBackInTime(currentEcosystem)}></GoBackInTime>
    <EcosystemsFilter onClick={handleEcosystemSelect} {ecosystems}></EcosystemsFilter>

  </div>
  <Leaflet view={view} zoomFactor={10}></Leaflet>
</div>
