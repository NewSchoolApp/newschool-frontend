<template>
  <div>
    <HeaderBar :title="'DEU RUIM :/'" :back-page="true"></HeaderBar>
    <v-container>
      <main class="middle">
        <p>Página não encontrada.</p>
        <p>Tenta de novo, mano.</p>
        <img src="~/assets/page-404.svg" alt />
        <v-btn
        class="btn-block btn-primary"
        @click="gotoBack">
          Voltar
        </v-btn>
      </main>
    </v-container>
    <navigation-bar />
  </div>
</template>

<script>
import HeaderBar from '~/components/Header.vue';
import NavigationBar from '~/components/NavigationBar.vue';

export default {
  components: {
    HeaderBar,
    NavigationBar,
},
  methods: {
    gotoBack() {
      $nuxt._router.back();
    },
  },
};
</script>

<style scoped>
.middle {
  text-align: center;
  width: 90%;
  max-width: 500px;
  margin: 10% auto;
}
.middle p {
  color: #656565;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
}
::v-deep .container {
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  padding-bottom: 50px;
}
</style>