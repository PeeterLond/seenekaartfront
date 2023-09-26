<template>
  <div class="location-master">
    <div class="location-info">
      <div class="location-table">
        <table class="table table-dark">
          <tbody>
            <tr v-for="location in locationResponse">
              <td>{{location.properties.title}}</td>
              <td> muuda/kustuta nupud</td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="location-table-button">
        <button class="btn btn-dark" type="submit">Lisa asukoht</button>
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
import router from "@/router";

export default {
  name: 'LocationView',
  data() {
    return {
      locationResponse: [
        {
          type: '',
          geometry: {
            type: '',
            coordinates: [
              0
            ]
          },
          properties: {
            locationId: 0,
            coordinateId: 0,
            title: '',
            description: ''
          }
        }
      ]

    }
  },
  methods: {
    addLocation() {

    },
    getAllLocations() {
      this.$http.get("/location")
          .then(response => {
            this.locationResponse = response.data
            this.setUpMap()
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },

    onMapClick(e) {
      let popup = L.popup()
          .setLatLng(e.latlng)
          .setContent(`<p>you clicked the map at: ${e.latlng.toString()}</p>
                       <button class="btn btn-dark" type="submit">Lisa asukoht</button>`)
          .openOn(this.map)
    },

    setUpMap() {
      this.map = L.map('map').setView([58.69, 25.00], 7);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      const myIcon = new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})


      for (const feature of this.locationResponse) {
        let long = feature.geometry.coordinates[0];
        let lat = feature.geometry.coordinates[1];
        let marker = L.marker([long, lat], {icon: myIcon}).addTo(this.map)
        marker.bindPopup(feature.properties.description)
      }

      this.map.on('click', this.onMapClick)
    }
  },
  beforeMount() {
    this.getAllLocations()
  }
}

</script>


