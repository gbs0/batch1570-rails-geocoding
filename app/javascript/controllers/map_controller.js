import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

// Connects to data-controller="map"
export default class extends Controller {
  static values = { apiKey: String, markers: Array }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/gbspenha/clasux0rs002a15nvrujpfdmd"
    })

    this.#addMarkersToMap()
    this.#fitMapToMarkers()
    this.map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }))
  }


  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      // marker = {latitude: X, longitude: X, info_window_html: "<h2>Teste</h2><p></p>"}
      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html)

      // Create a HTML element for your custom marker
      const customMarker = document.createElement("div")
      customMarker.innerHTML = marker.marker_html

      new mapboxgl.Marker(customMarker)
        .setLngLat([ marker.longitude, marker.latitude ])
        .setPopup(popup) // Add this
        .addTo(this.map)
    })
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.longitude, marker.latitude ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }
}
