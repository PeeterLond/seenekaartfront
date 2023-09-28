<template>
  <DeleteModal ref="deleteModal"></DeleteModal>
  <LocationModal ref="locationModal"></LocationModal>
  <div class="location-master">
    <div class="location-info">
      <div class="location-table">
        <table v-if="locationsExist" class="table table-hover table-striped table-bordered">
          <tbody>
          <tr v-for="location in locationResponse">
            <td @click="zoomInToLocationOnMap(location)" class="table-title">{{ location.properties.title }}</td>
            <td class="icons-td">
              <i @click="openEditLocationModal(location)" class="fa-regular fa-pen-to-square icons"></i>
              <i @click="openDeleteModal(location)" class="fa-solid fa-trash icons"></i>
            </td>
          </tr>
          </tbody>
        </table>
        <div v-else>
          <AlertDanger :alert-message="errorResponse.message"></AlertDanger>
        </div>
      </div>
      <div class="location-table-button">
        <button @click="openLocationModal(0)" class="btn btn-dark btn-lg" type="submit">Lisa asukoht</button>
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
import mushroomIcon from "@/assets/image/mushroom-icon.png"
import {Icon} from 'leaflet'
import router from "@/router";
import DeleteModal from "@/components/modal/DeleteModal.vue";
import LocationModal from "@/components/modal/LocationModal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'LocationView',
  components: {AlertDanger, LocationModal, DeleteModal},
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
      ],
      errorResponse: {
        message: '',
        errorCode: 0
      },
      locationsExist: true,
    }
  },
  methods: {
    zoomInToLocationOnMap(location) {
      this.map.setView([location.geometry.coordinates[0], location.geometry.coordinates[1]], 10)
    },

    openEditLocationModal(location) {
      this.resetModalErrorMessage()
      this.fillLocationModalFields(location);
      this.$refs.locationModal.isEdit = true
      this.$refs.locationModal.$refs.modalRef.openModal()
    },

    resetModalErrorMessage() {
      this.$refs.locationModal.errorMessage = ''
    },

    fillLocationModalFields(location) {
      this.$refs.locationModal.locationRequest = location
      this.$refs.locationModal.longitude = location.geometry.coordinates[0]
      this.$refs.locationModal.latitude = location.geometry.coordinates[1]
      this.$refs.locationModal.title = location.properties.title
      this.$refs.locationModal.description = location.properties.description
    },

    openDeleteModal(location) {
      this.$refs.deleteModal.locationId = location.properties.locationId
      this.$refs.deleteModal.coordinateId = location.properties.coordinateId
      this.$refs.deleteModal.$refs.modalRef.openModal()
    },

    openLocationModal(latLng) {
      this.resetModalErrorMessage()
      this.$refs.locationModal.isEdit = false
      this.$refs.locationModal.resetAllFields()
      if (latLng !== 0) {
        this.$refs.locationModal.longitude = latLng.lat.toFixed(6)
        this.$refs.locationModal.latitude = latLng.lng.toFixed(6)
      }
      this.$refs.locationModal.$refs.modalRef.openModal()
    },

    getAllLocations() {
      this.setUpMap()
      this.$http.get("/location")
          .then(response => {
            this.locationResponse = response.data
            this.addLocationsToMap()
          })
          .catch(error => {
            this.errorResponse = error.response.data
            this.locationsExist = false
            if (this.errorResponse.errorCode !== 111) {
              router.push({name: 'errorRoute'});
            }
          })
    },

    onMapClick(e) {
      const self = this
      const latLng = e.latlng
      const popup = L.popup()
          .setLatLng(latLng)
          .setContent(`<p>Vajutasid asukohta koordinaatidega: ${e.latlng.toString()}</p>
                       <button class="btn btn-dark" type="submit" id="popupButton">Lisa asukoht</button>`)
          .openOn(this.map)

      const popupButton = popup._contentNode.querySelector('#popupButton')

      popupButton.addEventListener('click', function () {
        self.openLocationModal(latLng)
        self.map.closePopup(popup)
      })
    },

    setUpMap() {
      this.map = L.map('map').setView([58.69, 25.00], 7);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      this.map.on('click', this.onMapClick)
    },

    addLocationsToMap() {
      const myIcon = new Icon({iconUrl: mushroomIcon, iconSize: [20, 30], iconAnchor: [10, 30]})

      for (const feature of this.locationResponse) {
        let long = feature.geometry.coordinates[0];
        let lat = feature.geometry.coordinates[1];
        let marker = L.marker([long, lat], {icon: myIcon}).addTo(this.map)
        marker.bindPopup(feature.properties.description)
      }
    },
  },
  mounted() {
    this.getAllLocations()
  }
}

</script>


