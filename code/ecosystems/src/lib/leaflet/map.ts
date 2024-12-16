import L from "leaflet";

const _domain = "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
const _subdomains = ["mt0", "mt1", "mt2", "mt3"]

export function createGTileLayer(domain: string = _domain, subdomains: string[] = _subdomains) {
  return  L.tileLayer(domain, {
    subdomains: subdomains,
  })
}