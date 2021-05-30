<template>
  <div id="header">
    <div id="left" class="header-part">
      <v-btn
        v-if="backPage != false"
        class="btn-back"
        text
        icon
        @click="goBackPage"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>

    <div id="center" class="header-part">
      <div class="h1__theme">
        {{ title }}
      </div>
    </div>

    <div id="right" class="header-part">
      <v-btn v-if="closeFunc" class="btn-close" text icon @click="closeFunc()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <slot></slot>
    </div>

    <!-- <v-btn
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
    </v-btn> -->
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
  font-size: 21px;
  font-weight: 900;
  text-align: center;
}
::v-deep .btn-back .theme--light.v-icon,
::v-deep .btn-close .theme--light.v-icon {
  color: var(--primary);
  font-size: 27px;
}
#header {
  display: flex;
  margin: 20px;
}

.header-part {
  display: flex;
  align-items: center;
}
#left {
  flex: 1;
}
#center {
  flex: 6;
  justify-content: center;
}
#right {
  flex: 1;
  justify-content: flex-end;
}
</style>
