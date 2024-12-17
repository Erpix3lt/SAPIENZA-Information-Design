import L from "leaflet";
// @ts-ignore
import Popup from '$lib/components/popup.svelte';
import { mount } from 'svelte';


const _imageUrl = "/mask.png";
const _errorUrl = "";
const _altText = "alt";
const _latLngBounds = L.latLngBounds([
  [21.56, 24.2744],
  [21.4, 24.1],
]);

export function createOverlay(
  imageUrl: string = _imageUrl,
  latLngBounds: L.LatLngBounds = _latLngBounds,
  errorUrl: string = _errorUrl,
  altText: string = _altText
) {
  return L.imageOverlay(imageUrl, latLngBounds, {
    errorOverlayUrl: errorUrl,
    alt: altText,
    interactive: true,
  });
}

// Function to create an overlay with a bound Svelte popup
export function createOverlayWithPopup(
  message: string,
  imageUrl: string = _imageUrl,
  latLngBounds: L.LatLngBounds = _latLngBounds,
  errorUrl: string = _errorUrl,
  altText: string = _altText
) {
  // Create the image overlay
  const overlay = L.imageOverlay(imageUrl, latLngBounds, {
    errorOverlayUrl: errorUrl,
    alt: altText,
    interactive: true,
    className: "custom-popup",
  });

  const container = document.createElement("div");
  mount(Popup, { target: container, props: {  } });

  overlay.bindPopup(container, {
    maxWidth: 600,
  });

  overlay.on("click", () => {
    overlay.openPopup();
  });

  return overlay;
}
