<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import { type LatLngExpression, type LatLngTuple } from 'leaflet';
	import Leaflet from '$lib/components/leaflet.svelte';
	import { onMount } from 'svelte';

	let initialView: LatLngTuple = $state([48.3789, -119.91067]);

	function move() {
		initialView = [initialView[0], initialView[1] - 1];
	}
</script>

<div class="w-full h-screen">
	<button onclick={move}>Move left</button>
	<Leaflet view={initialView} zoomFactor={10} />
</div>
