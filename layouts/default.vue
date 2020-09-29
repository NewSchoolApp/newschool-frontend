<template>
  <v-app class="global-style-class">
    <nuxt />
    <Alert></Alert>
  </v-app>
</template>

<script scoped>
import {
  setCaptureError,
  getErrorMessage,
} from '../services/http/error-interceptor';

import Alert from '~/components/Alert.vue';

export default {
  data: () => ({
    showError: false,
    message: '',
  }),
  components: { Alert },
  mounted() {
    setCaptureError(error => {
      this.message = getErrorMessage(error);
      this.showError = $nuxt._router.currentRoute.path !== '/login';
    });
  },
};
</script>

<style>
.global-style-class {
  font-family: 'Montserrat', sans-serif;
}
</style>
