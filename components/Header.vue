<template>
  <div id="head__bar">
    <v-btn class="btn-back" text icon @click="comeBackPage" v-if="backPage">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <h1 class="h1__theme">{{ title }}</h1>
  </div>
</template>

<script>
/**
 * @author Andrews
 * para usar, basta passar os dois parametros via props
 * @param title Título da página
 * @param backPage botão para voltar ? true ou false
 */
export default {
  props: ["title", "backPage"],
  methods: {
    comeBackPage() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.h1__theme {
  font-size: 1.4444rem;
}
#head__bar {
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  position: relative;
  align-items: center;
  background: transparent;
}

::v-deep .btn-back .theme--light.v-icon {
  color: #60c;
  font-size: 35px;
}
::v-deep .btn-back {
  position: absolute;
  left: 1rem;
}
</style>
