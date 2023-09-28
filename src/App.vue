<template>
  <div class="master">
    <header>
      <h2 @click="goToHome">SeeneKaart</h2>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import router from "@/router";

export default defineComponent({
  methods: {
    goToHome() {
      router.push({name: 'homeRoute'})
    },
  }
})
</script>
