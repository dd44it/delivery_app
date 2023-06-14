import { LatLngExpression, Marker, icon, LeafletEvent } from "leaflet";

export function createLeafletMarker(
  position: LatLngExpression,
  options: any,
): Marker {
  const marker = new Marker(position, {
    draggable: true,
    icon: icon({
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconSize: [35, 40],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      ...options,
    }),
  });
  return marker
}