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
  props: ['title', 'backPage', 'route'],
  methods: {
    comeBackPage() {
      if (this.route) {
        this.$router.push(this.route);
      } else {
        this.$router.back();
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'Roboto', sans-serif;
}
.h1__theme {
  font-size: 1rem;
  line-height: 1.2;
  font-weight: 900;
  text-align: center;
  padding: 0 2.5rem !important;
}
#head__bar {
  display: flex;
  justify-content: center;
  padding: 1.2rem 0;
  position: relative;
  align-items: center;
  background: transparent;
}

::v-deep .btn-back .theme--light.v-icon {
  color: var(--primary);
  font-size: 35px;
}
::v-deep .btn-back {
  position: absolute;
  left: 1rem;
}
</style>
