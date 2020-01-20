<template>
<div>
          <HeaderBar :title="'DEU RUIM :/'" :backPage="true"></HeaderBar>
  <v-container>
    <main>
      <p>Página não encontrada.</p>
      <p>Tenta de novo, mano.</p>
      <img src="~/assets/page-404.svg" alt />
       <v-btn
                class="back"
                color="#60c"
                dark
                block
                depressed
                large
                @click="gotoBack"
              >Voltar</v-btn>
       </main>

    <navigation-bar />
  </v-container>

  </div>
</template>

<script>
import NavigationBar from "~/components/NavigationBar.vue";
import HeaderBar from "~/components/Header.vue";


export default {
  components: {
    NavigationBar,
    HeaderBar
  },
  methods: {
    gotoBack() {
      $nuxt._router.go(-2);
    }
  }
};
</script>

<style scoped>
main {
  text-align: center;
}
main p{
  color: #656565;
  font-family: Montserrat;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 20px;
}
.container {
  position: absolute;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .v-btn__content {
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  line-height: 15px;
}
::v-deep .back{
  margin-top: 50px;
  width: 100%;
  box-shadow: 0 4px 5px gray!important;
}
</style>
