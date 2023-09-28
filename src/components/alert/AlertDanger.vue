<template>
  <div class="alert-master">
    <div v-if="alertMessage != null && alertMessage.length > 0" class="alert alert-danger" role="alert" >
      {{alertMessage}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertDanger',
  props: {
    alertMessage: String
  }
}
</script>