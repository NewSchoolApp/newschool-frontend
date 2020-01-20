<template>
  <v-container>
    <main>
      <h1>Desculpa :(</h1>
      <p>Página não encontrada</p>
      <img src="~/assets/page-404.svg" alt />
   
      <v-btn text @click="gotoBack()" color="primary">Voltar</v-btn>
    </main>
    <navigation-bar />
  </v-container>
</template>

<script>
import NavigationBar from "~/components/NavigationBar.vue";

export default {
  components: {
    NavigationBar
  },
  methods: {
    gotoBack() {
      $nuxt._router.back();
    }
  }
};
</script>

<style scoped>
main {
  text-align: center;
}
main h1 {
  color: #6600cc;
}
.container {
  position: absolute;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .btn-back {
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 3px;
}
::v-deep .btn-back .theme--light.v-icon {
  color: #60c;
  font-size: 35px;
}
</style>
