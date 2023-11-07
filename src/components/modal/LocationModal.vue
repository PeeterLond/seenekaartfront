<template>
  <Modal ref="modalRef">
    <template #header>
      <h3 v-if="isEdit">Muuda:</h3>
      <h3 v-else>Lisa asukoht:</h3>
    </template>
    <template #body>
      <AlertDanger :alert-message="errorMessage"></AlertDanger>
          <table>
            <tr>
              <td><label for="title"><sup style="color: red">*</sup> Pealkiri</label></td>
              <td><input v-model="title" type="text" id="title" maxlength="30"></td>
            </tr>
            <tr>
              <td><label for="lat"><sup style="color: red">*</sup> Laiuskraad</label></td>
              <td><input v-model="latitude" type="text" id="lat"></td>
            </tr>
            <tr>
              <td><label for="long"><sup style="color: red">*</sup> Pikkuskraad</label></td>
              <td><input v-model="longitude" type="text" id="long"></td>
            </tr>
          </table>
          <textarea v-model="description"
                    placeholder="Asukoha kirjeldus" id="textarea" cols="40" rows="4"></textarea>
    </template>
    <template #footer>
      <div class="my-modal-footer">
        <div>
          <button @click="closeModal" class="btn btn-dark" type="submit">Tagasi</button>
        </div>
        <div>
          <button @click="changeLocationInfo" v-if="isEdit" class="btn btn-dark" type="submit">Muuda</button>
          <button @click="addNewLocation" v-else class="btn btn-dark" type="submit">Lisa</button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>

import {defineComponent} from "vue";
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default defineComponent({
  components: {AlertDanger, Modal},
  data() {
    return {
      isEdit: false,
      latitude: 0,
      longitude: 0,
      title: '',
      description: '',
      errorMessage: '',
      locationRequest: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            0
          ]
        },
        properties: {
          title: '',
          description: ''
        }
      }
    }
  },
  methods: {
    changeLocationInfo() {
      if (!this.mandatoryFieldsAreFilled()) {
        this.errorMessage = 'Täida kõik väljad'
      }else if (!this.coordinatesAreInEstonia()) {
        this.errorMessage = 'Asukoht võiks ikkagi Eesti piiridesse jääda :)'
      } else {
        this.fillRequestFields();
        this.updateLocation();
      }
    },

    mandatoryFieldsAreFilled() {
      return this.title.length > 0 && this.description.length > 0 && this.longitude > 0 && this.latitude > 0
    },

    coordinatesAreInEstonia() {
      return (this.latitude > 57.50 && this.latitude < 59.70) && (this.longitude > 21.70 && this.longitude < 28.21)
    },

    fillRequestFields() {
      this.locationRequest.geometry.coordinates[0] = this.longitude
      this.locationRequest.geometry.coordinates[1] = this.latitude
      this.locationRequest.properties.title = this.title
      this.locationRequest.properties.description = this.description

    },

    updateLocation() {
      this.$http.put("location", this.locationRequest
      ).then(response => {
        this.closeModal()
        window.location.reload()
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    addNewLocation() {
      if (!this.mandatoryFieldsAreFilled()) {
        this.errorMessage = 'Täida kõik väljad';
      } else if (!this.coordinatesAreInEstonia()) {
        this.errorMessage = 'Asukoht võiks ikkagi Eesti lähiümbrusesse jääda :)'
      } else {
        this.fillRequestFields();
        this.addLocation();
      }
    },

    addLocation() {
      this.$http.post("/location", this.locationRequest
      ).then(response => {
        this.closeModal()
        window.location.reload()
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    closeModal() {
      this.$refs.modalRef.closeModal()
    },

    resetAllFields() {
      this.longitude = 0
      this.latitude = 0
      this.title = ''
      this.description = ''
    },
  }
})
</script>
