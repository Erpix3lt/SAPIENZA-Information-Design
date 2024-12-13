<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import { type LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/components/leaflet.svelte';

	const initialView: LatLngExpression = [21.56, 24.2744];
</script>

<div class="w-full h-screen">
	<Leaflet view={initialView} zoomFactor={10} />
</div>