<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import { type LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/components/leaflet.svelte';
  import EcosystemsFilter, { type Ecosystem } from '$lib/components/ecosystems-filter.svelte';
  import { onMount } from 'svelte';

	let ecosystems: Ecosystem[] = [];
	let initialView: LatLngExpression = [21.56, 24.2744];

	onMount(async () => {
    try {
      const response = await fetch('/ecosystems.json');
      if (!response.ok) {
        throw new Error('Failed to load ecosystems data');
      }
      ecosystems = await response.json();
    } catch (error) {
      console.error('Error fetching ecosystems:', error);
    }
  });


	function handleEcosystemSelect(ecosystem: Ecosystem) {
		//change initial view to the selected ecosystem's latLng
		initialView = ecosystem.latLng || [21.56, 24.2744];
  }
</script>

<div class="w-full h-screen">
	<EcosystemsFilter onClick={handleEcosystemSelect} ecosystems={ecosystems}></EcosystemsFilter>
	<Leaflet view={initialView} zoomFactor={10} ></Leaflet>
</div>