<template>
  <Modal ref="modalRef">
    <template #header>
      <h3>Kustuta asukoht:</h3>
    </template>
    <template #body>
      <p>Kas oled ikka kindel, et soovid asukoha kustutada?</p>
    </template>
    <template #footer>
      <div class="my-modal-footer">
        <div>
          <button @click="closeModal" class="btn btn-dark" type="submit">Tagasi</button>
        </div>
        <div>
          <button @click="deleteLocation" class="btn btn-dark" type="submit">Kustuta</button>
        </div>
      </div>
    </template>

  </Modal>
</template>

<script>

import {defineComponent} from "vue";
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default defineComponent({
  components: {Modal},
  data() {
    return {
      locationId: 0,
      coordinateId: 0
    }
  },
  methods: {
    deleteLocation() {
      this.$http.delete("/location", {
            params: {
              locationId: this.locationId,
              coordinateId: this.coordinateId
            }
          }
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
  }
})
</script>
