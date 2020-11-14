<template>
  <div>
    <v-snackbar
      :style="snackbarStyle"
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="40000000000"
      :top="true"
      :right="true"
      style="z-index: 99999;"
    >
      <v-btn color="#FFF" text @click="snackbar = false"
        ><div class="icon">
          <img
            v-if="snackbarStatus === 'success'"
            src="~/assets/snackbar-success.svg"
            alt=""
          />
          <img
            v-if="snackbarStatus === 'error'"
            src="~/assets/snackbar-error.svg"
            alt=""
          />
          <img
            v-if="snackbarStatus === 'warning'"
            src="~/assets/snackbar-warning.svg"
            alt=""
          /></div
      ></v-btn>
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data: () => ({
    snackbarColor: '',
    snackbarStyle: '',
    snackbarStatus: '',
    snackbarText: '',
    snackbarImage: '~/assets/snackbar-success.svg',
    snackbar: false,
  }),
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        switch (state.snackbar.type) {
          case 'success':
            this.snackbarStatus = 'success';
            this.snackbarColor = '#F2FFFB';
            this.snackbarText = state.snackbar.message
              ? `${state.snackbar.message} 👍`
              : 'Boa! deu certo 👍';

            this.snackbarStyle =
              '  border: 2px solid #15CE9A !important; border-radius: 8px;';
            break;
          case 'error':
            this.snackbarStatus = 'error';
            this.snackbarColor = '#FFF2F5';
            this.snackbarText = state.snackbar.message
              ? `${state.snackbar.message} 👎`
              : 'Vish! deu ruim 👎';
            this.snackbarStyle =
              '  border: 2px solid #E93F66 !important; border-radius: 8px;';
            break;
          case 'warning':
            this.snackbarStatus = 'warning';
            this.snackbarColor = '#FFFAF2';
            this.snackbarText = state.snackbar.message
              ? `${state.snackbar.message} ⚠️`
              : 'Eita! toma cuidado ⚠️';
            this.snackbarStyle =
              '  border: 2px solid #FFC866 !important; border-radius: 8px;';
            break;
          case 'custom':
            this.snackbarColor = '#6600cc';
            this.snackbarText = state.snackbar.message;
            break;
          default:
            this.snackbarColor = 'error';
            this.snackbarText = 'Poxa! algo deu errado ☹️';
        }
        this.snackbar = true;
      }
    });
  },
  methods: {},
};
</script>

<style>
/* .bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1;
  border-radius: 8px;
  background: #c4c4c4;
  opacity: 0.6;
  background-size: cover;
  background-position: center;
} */

.v-snack__content {
  display: flex;
  justify-content: flex-start;
}
.v-snack__wrapper {
  height: 70px;
  color: black;
  border-radius: 8px;
  z-index: 999;
}

.v-btn__content {
  margin-right: 40px !important;
}
</style>
