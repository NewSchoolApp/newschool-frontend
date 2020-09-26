<template>
  <div>
    <div v-if="snackbar" class="bg"></div>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="4000"
      :top="true"
      :right="true"
      style="z-index: 99999;"
    >
      {{ snackbarText }}
      <v-btn color="#FFF" text @click="snackbar = false"
        ><v-icon>mdi-close-circle</v-icon></v-btn
      >
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['status', 'info', 'show'],
  data: () => ({
    snackbarColor: '',
    snackbarText: '',
    snackbar: false,
  }),
  watch: {
    show() {
      if (this.show) {
        this.checkStatus();
      }
    },
  },
  methods: {
    checkStatus() {
      switch (this.status) {
        case 'success':
          this.snackbarColor = 'success';
          this.snackbarText = this.info || 'Boa, deu certo 👍';
          break;
        case 'error':
          this.snackbarColor = 'error';
          this.snackbarText = this.info || 'Vish, deu ruim 👎';
          break;
        case 'warning':
          this.snackbarColor = '#B09F66';
          this.snackbarText = this.info || 'Eita, toma cuidado ⚠️';
          break;
        case 'custom':
          this.snackbarColor = '#6600cc';
          this.snackbarText = this.info;
          break;
        default:
          this.snackbarColor = 'error';
          this.snackbarText = 'Poxa, algo deu errado ☹️';
      }
      this.snackbar = true;
    },
  },
};
</script>

<style>
.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: #c4c4c4;
  opacity: 0.6;
  background-size: cover;
  background-position: center;
}
</style>
