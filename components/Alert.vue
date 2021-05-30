<template>
  <div>
    <v-row
      v-if="snackbar"
      class="snackbar"
      :style="
        `background: ${snackBackground}; border: 1px solid ${snackBorderColor}`
      "
    >
      <div class="content__container">
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
        />
        <p class="snack__text">
          <span class="bold__text">{{ snackbarBoldText }}</span
          ><br v-if="snackbarStatus === 'warning'" />{{ snackbarText }}
        </p>
        <v-btn
          v-if="snackbarStatus === 'success'"
          color="#15CE9A"
          text
          @click="snackbar = false"
        >
          <v-icon class="icon">mdi-close-circle</v-icon></v-btn
        >
        <v-btn
          v-if="snackbarStatus === 'error'"
          color="#E93F66"
          text
          @click="snackbar = false"
        >
          <v-icon class="icon">mdi-close-circle</v-icon></v-btn
        >
      </div>
      <v-row v-if="snackbarStatus === 'warning'" class="confirm__text">
        <span @click="goBack">Sim</span>
        <span @click="snackbar = false">Não</span>
      </v-row>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data: () => ({
    snackbarColor: '',
    snackbarStyle: '',
    snackbarText: '',
    snackbarBoldText: '',
    snackbarStatus: '',
    snackBackground: 'white',
    snackBorderColor: 'black',
    snackbar: false,
  }),
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        switch (state.snackbar.type) {
          case 'success':
            this.snackbarStatus = 'success';
            this.snackBackground = '#F2FFFB';
            this.snackbarBoldText = 'Show! ';
            this.snackbarText = state.snackbar.message
              ? `${state.snackbar.message} 👍`
              : ' 👍';
            this.snackBorderColor = '#15CE9A';
            break;
          case 'error':
            this.snackbarStatus = 'error';
            this.snackBackground = '#FFF2F5';
            this.snackbarBoldText = 'Ops! ';
            this.snackbarText = state.snackbar.message
              ? `${state.snackbar.message} 👎`
              : ' 👎';
            this.snackBorderColor = '#E93F66';
            break;
          case 'warning':
            this.snackbarStatus = 'warning';
            this.snackBackground = '#FFFAF2';
            this.snackbarBoldText = 'Calma ae. ';
            this.snackbarText = state.snackbar.message
              ? `${state.snackbar.message} ⚠️`
              : ' ⚠️';
            this.snackBorderColor = '#FFC866';
            break;
          default:
            this.snackBackground = '#FFF2F5';
            this.snackbarText = 'Poxa! algo deu errado ☹️';
        }

        this.snackbar = true;
        setTimeout(() => {
          this.snackbar = false;
        }, 3000);
      }
    });
  },
  methods: {
    goBack() {
      this.$router.back();
      this.snackbar = false;
    },
  },
};
</script>

<style scoped>
.snackbar {
  position: fixed;
  top: 10px;
  right: 3px;
  margin: 0 auto;
  padding: 0 15px;
  z-index: 999999;
  width: 98%;
  max-width: 430px;
  height: 109px;
  animation: move 0.3s;
}
.snack__text {
  margin: 0 2% 0 22px !important;
  max-width: 236px;
  font-size: 12px;
  width: 236px;
}

.icon {
  position: absolute;
  right: 0;
}

.content__container {
  display: flex;
  align-items: center;
  width: 100%;
}

.content__container img {
  width: 40px;
  height: 40px;
}

.confirm__text {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.confirm__text span {
  font-size: 14px;
  line-height: 19px;
  text-decoration-line: underline;
  color: #3eabfe;
  margin-right: 20px;
}

.bold__text {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
}

@keyframes move {
  from {
    right: 40px;
  }
  to {
    right: 3px;
  }
}
</style>
