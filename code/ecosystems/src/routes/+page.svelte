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

    try {
      const osvResponse = await fetch("/api/osv");
      if (!osvResponse.ok) {
        throw new Error("Failed to fetch OSV vulnerabilities data");
      }
      const osvData = await osvResponse.json();
      console.log("OSV Vulnerabilities:", osvData);
    } catch (error) {
      console.error("Error fetching vulnerabilities:", error);
    }
  });

  async function handleEcosystemSelect(ecosystem: Ecosystem) {
    initialView = ecosystem.latLng || [21.56, 24.2744];
    currentEcosystem = ecosystem;
    const response = await fetch('/api/osv/commit', {
			method: 'POST',
      body: JSON.stringify({ commit: "6879efc2c1596d11a6a6ad296f80063b558d5e0f" }),
			headers: {
				'content-type': 'application/json'
			}
		});

    const data = await response.json();
    console.log("Data", data);
  }

</script>

<div class="w-full h-screen">
  <div class="absolute bottom-10 left-10 z-20 flex flex-row gap-4 items-baseline">
    <Position ecosystem={currentEcosystem}></Position>
    <EcosystemsFilter onClick={handleEcosystemSelect} {ecosystems}></EcosystemsFilter>
  </div>
  <Leaflet view={initialView} zoomFactor={10}></Leaflet>
</div>
