import L from "leaflet";

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
