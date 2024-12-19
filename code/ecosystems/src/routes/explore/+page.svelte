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
  import ItemInformation from "$lib/components/item-information.svelte";

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

<div class="grid grid-cols-5 h-screen">
  <div class="bg-black pt-2 flex flex-col justify-between h-screen">
    <div class="flex flex-col items-end mr-2">
      <p class="font-arialBlack text-xl uppercase text-gray-500 text-end">Explore</p>
      <GoBackInTime onClick={() => handleGoBackInTime(currentEcosystem)}></GoBackInTime>
      <EcosystemsFilter onClick={handleEcosystemSelect} {ecosystems}></EcosystemsFilter>
    </div>
  </div>
  <div class="col-span-4">
    <Leaflet view={view} zoomFactor={10}></Leaflet>
  </div>
</div>
