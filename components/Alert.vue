<template>
  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    :timeout="5000"
    :top="true"
    :right="true"
  >
    {{ snackbarText }}
    <v-btn color="#FFF" text @click="snackbar = false">Fechar</v-btn>
  </v-snackbar>
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

<style></style>
