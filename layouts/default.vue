<template>
  <v-app class="global-style-class">
    <nuxt />

    <v-snackbar
      v-model="showError"
      color="error"
      :timeout="5000"
      :top="true"
      :right="true"
    >
      {{ $t(message) }}
      <v-btn color="#FFF" text @click="showError = false">Fechar</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script scoped>
import {
  setCaptureError,
  getErrorMessage,
} from '../services/http/error-interceptor'
export default {
  data: () => ({
    showError: false,
    message: '',
  }),
  mounted() {
    setCaptureError(error => {
      this.message = getErrorMessage(error)
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
