<template>
  <div>
    <v-dialog v-model="dialog" max-width="290">
      <v-card-title class="headline">
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-card-title>
      <v-card-text id="textModal">
        <h1>Atenção!</h1>
        {{ dialogMessage }}
      </v-card-text>
      <div class="btn-group">
        <v-btn v-if="toRoute" color="primary" text :to="toRoute.path">{{
          toRoute.name
        }}</v-btn>
        <v-btn v-if="cancel" color="primary" text @click="dialogRun"
          >Cancelar</v-btn
        >
        <v-btn v-if="ok" color="primary" text @click="dialogRun">Ok</v-btn>
      </div>
    </v-dialog>
    <button id="viewModal" hidden @click="dialogRun"></button>
  </div>
</template>

<script>
/**
 * @author Andrews
 * Para usar é necessário passar os seguintes parametros para o componente
 * @param dialogMessage mensagem a ser exibida
 * @param toRoute caso você queira redirecionar para uma rota, passe o objeto dessa forma {path : "/path_rota" , name : "nome_do_botão"}
 * @param cancel flag para opção cancelar
 * @param ok flag para opção ok
 */

export default {
  props: ['dialogMessage', 'toRoute', 'cancel', 'ok'],
  data: () => ({
    dialog: false,
  }),
  methods: {
    dialogRun() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style scoped lang="scss">
.v-dialog--active {
  border-radius: 20px !important;
  h1 {
    margin-bottom: 0.5rem;
  }
  .v-btn {
    color: #ff6868 !important;
    margin-bottom: 1rem;
  }
  .v-card__title {
    justify-content: center;
    background: #ff6868;
    color: #ffffff;
  }
  .v-card__text {
    text-align: center;
    padding-top: 15px;
  }
  .theme--light.v-icon {
    color: #ffffff;
    font-size: 3rem;
  }
  .btn-group {
    display: flex;
    justify-content: center;
  }
}
</style>
