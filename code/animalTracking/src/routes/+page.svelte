<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import { type LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/components/leaflet.svelte';

	const initialView: LatLngExpression = [48.3789, -119.91067];
</script>

<div class="w-full h-screen">
	<Leaflet view={initialView} zoomFactor={10}>
		
	</Leaflet>
</div>