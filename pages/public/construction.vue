<template>
  <v-layout class="container">
    <v-flex ref="flex" xs10 sm8 md6>
      <v-container>
        <v-col cols="12" class="initial-text">
          <v-row>
            <p>Salve salve, estamos terminando de criar a New School.</p>
          </v-row>
        </v-col>
        <v-col cols="12" class="initial-text">
          <v-row>
            <p>Então relaxa que logo logo vem novidade ai, Tamo Together wow!</p>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <img class="img" src="../../assets/construction.svg" alt />
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
          <router-link to="/contribua" class="end-text">Quer ajudar a gente?</router-link>
          </v-row>
        </v-col>
      </v-container>
    </v-flex>
    <navigation-bar />
  </v-layout>
</template>

<router>
{
    path: '/construindo'
}
</router>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
// teste
export default {
  components: {
    NavigationBar
  },
};
</script>

<style scoped>
/* Global */
* {
  max-width: 600px;
  margin: 0 auto;
  color: var(--primary);
}
.container {
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* Text Header */
.initial-text {
  font-style: normal !important;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  display: flex;
  text-align: center;
  color: #656565;
  width: 100%;
  margin-bottom: -39px;
}
/* Img */
.img {
  width: 90%;
  margin: 15% 5%;
}
.end-text {
  font-style: normal;
  text-decoration: underline;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  justify-content: center;
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--primary);
  margin: 8px auto;
}
@media (max-width: 340px){
.img{
  margin: 3% 5%;
}
.atribute-data span {
  margin-left: 20%;
}
}
</style>
