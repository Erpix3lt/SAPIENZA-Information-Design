export function removeLeafletAttribution(document: Document): void {
  const attributions = document.getElementsByClassName('leaflet-control-attribution');
  if (attributions.length > 0) {
    attributions[0].remove();
  }
}