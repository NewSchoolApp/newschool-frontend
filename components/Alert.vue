<template>
  <div>
<v-snackbar
      :style="snackbarStyle"
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="40000000000"
      :top="true"
      :left="true"
      class="v-snackbar__border"
      style="z-index: 99999;"
    >
      <v-btn color="#FFF" text @click="snackbar = false"
        ><div class="icon">
          <img v-if="snackbarStatus === 'success'" src="~/assets/snackbar-success.svg" alt="" />
          <img v-if="snackbarStatus === 'error'" src="~/assets/snackbar-error.svg" alt="" />
          <img v-if="snackbarStatus === 'warning'" src="~/assets/snackbar-warning.svg" alt=""/>
           </div
      ></v-btn>
      {{ snackbarText }}
       <v-btn v-if="snackbarStatus === 'success'" color="#15CE9A" text @click="snackbar = false" >
         <v-icon>mdi-close-circle</v-icon></v-btn
      >
      <v-btn v-if="snackbarStatus === 'error'" color="#E93F66" text @click="snackbar = false" >
         <v-icon>mdi-close-circle</v-icon></v-btn
      >
       <v-btn to="/login" v-if="snackbarStatus === 'warning' "color="blue" text @click="snackbar = false"><p
       style="text-decoration: underline;">Sim</p>
       </v-btn>

       <v-btn v-if="snackbarStatus === 'warning' "color="blue" text @click="snackbar = false"><p
       style="text-decoration: underline;">Não</p>
       </v-btn>
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
            this.snackbarStatus = 'success'
            this.snackbarColor = '#F2FFFB';
      this.snackbarText = state.snackbar.message
        ? `${state.snackbar.message} 👍`
        : 'Show! As mudanças foram salvas com sucesso';
        this.snackbarStyle = 'left: 65% !important; border: 2px solid #15CE9A !important; border-radius: 8px;'
            break;
          case 'error':
            this.snackbarStatus = 'error'
            this.snackbarColor = '#FFF2F5';
            this.snackbarText = state.snackbar.message
              ? `${state.snackbar.message} 👎`
              : 'Ops! Alguma coisa nao saiu bem. Dá mais um confere nas infos.';
            this.snackbarStyle = 'left: 65% !important; border: 2px solid #E93F66 !important; border-radius: 8px;'
            break;
          case 'warning':
            this.snackbarStatus = 'warning'
            this.snackbarColor = '#FFFAF2';
            this.snackbarText = state.snackbar.message
              ? `${state.snackbar.message} ⚠️`
              : 'Calma ae. Quer mesmo sair sem confirmar?';
            this.snackbarStyle = 'left: 65% !important;  border: 2px solid #FFC866 !important; border-radius: 8px;'
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
};
</script>

<style>
/*.bg {
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
}*/

.v-snack__content {
  display: flex;
  justify-content: flex-start;
}
.v-snackbar__border {

  width: 33%;
  color: black;
  border-radius: 8px;
  z-index: 999;
}

.v-btn__content {
  margin-right: 10px !important;
}
</style>
