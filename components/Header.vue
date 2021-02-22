<template>
  <div id="head__bar">
    <v-btn
      v-if="backPage != false"
      class="btn-back"
      text
      icon
      @click="goBackPage"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <h1 class="h1__theme">{{ title }}</h1>
    <v-btn v-if="closeFunc" class="btn-close" text icon @click="closeFunc()">
      <v-icon>mdi-close</v-icon>
    </v-btn>
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
  props: ['title', 'backPage', 'route', 'closeFunc', 'backFunc', 'closeFunc'],
  methods: {
    goBackPage() {
      if (this.backFunc) {
        this.backFunc();
      } else if (this.route) {
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
  padding: 0 50px !important;
}
#head__bar {
  display: flex;
  justify-content: center;
  padding: 20px;
  position: relative;
  align-items: center;
  background: transparent;
}

::v-deep .btn-back .theme--light.v-icon,
::v-deep .btn-close .theme--light.v-icon {
  color: var(--primary);
  font-size: 30px;
}
::v-deep .btn-back {
  position: absolute;
  left: 1rem;
}
::v-deep .btn-close {
  position: absolute;
  right: 1rem;
}
</style>
