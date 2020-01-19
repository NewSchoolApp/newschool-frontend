<template>
  <v-container>
    <main>
      <h1>Desculpa :(</h1>
      <v-btn class="btn-back" text icon @click="gotoBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <p>Página não encontrada</p>
      <img src="~/assets/page-404.svg" alt />
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
      $nuxt._router.go(-1);
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
  height: 100%;
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
