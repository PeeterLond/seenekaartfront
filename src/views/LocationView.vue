<template>
  <div class="location-master">
    <div class="location-info">
      <div class="location-table">
        <table>
          <tbody>
            <tr>
              <td>Asukoht 1</td>
              <td> muuda/kustuta nupud</td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="location-table-button">

      </div>

    </div>
    <div class="location-map">
      <div id="map">

      </div>



    </div>
  </div>


</template>

<script>

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

export default{
  name: 'LocationView',
  data() {
    return {

    }
  },
  methods: {
    onMapClick(e) {
      let popup = L.popup()
          .setLatLng(e.latlng)
          .setContent(`you clicked the map at: ${e.latlng.toString()}`)
          .openOn(this.map)
    },

  },
  mounted() {
    this.map = L.map('map').setView([58.69, 25.00], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    const myIcon = new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})



    let marker = L.marker([59.401149, 24.690146], {icon: myIcon}).addTo(this.map)
    marker.bindPopup("minu kodu")

    this.map.on('click', this.onMapClick)

  }
}

</script>


