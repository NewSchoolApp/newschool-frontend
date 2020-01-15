<template>
  <v-app class="global-style-class">
    <nuxt />

    <v-snackbar
      v-model="showError"
      color="error"
      :timeout="5000"
      :top="true"
      :center="true"
    >
      {{ message }}
    </v-snackbar>
  </v-app>
</template>

<script scoped>
import { setCaptureError } from '../services/http/error-interceptor'
export default {
  data: () => ({
    showError: true,
    message: '',
  }),
  mounted() {
    setCaptureError(error => {
      this.message = error.message
      this.showError = true
    })
  },
}
</script>

<style>
.global-style-class {
  font-family: 'Montserrat', sans-serif;
}
</style>
