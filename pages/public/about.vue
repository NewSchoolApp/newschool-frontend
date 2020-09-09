<template>
  <div>
    <div class="bg"></div>
    <HeaderBar class="top" :backPage="true"  ></HeaderBar>
    <header><h1 id="titulo">O QUE É A NEW SCHOOL?</h1></header>
    <div class="container">
      <v-layout text-left>
        <v-flex>
          <div class="subtext">
            <p>
              Você deve estar se perguntando o que é a
              <span>New School</span>, né?
            </p>
            <p>
              A New School não é só um app, uma escola ou uma startup. É um
              <span>movimento.</span>
            </p>
            <p>
              A gente leva
              <span>educação de qualidade</span> traduzida na linguagem da quebrada para todo o Brasil
              através da
              <span>tecnologia</span> e de conteúdos baseados nas novas
              <span>habilidades do futuro.</span>
            </p>
            <p>
              Nosso objetivo é formar
              <span>protagonistas</span> por meio de um conceito diferente de educação prática, futurista e
              <span>descolada.</span>
              Criamos experiências transformadoras de aprendizagem para que jovens como você encarem melhor os
              <span>desafios da vida.</span>
            </p>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <navigation-bar />
  </div>
</template>
<router>
  {
    path: '/sobre'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';

export default {
  components: {
    HeaderBar,
    NavigationBar,
  },
};
</script>
<style scoped>
::v-deep .text {
  width: 100%;
  color: #6600cc;
  font-family: 'Montserrat';
  text-transform: uppercase;
}
h1#titulo {
  font-size: 14px;
  color: #6600cc;
  text-align: center;
  position: relative;
  bottom: 30px;
}
.top {
  position: relative;
  right: 23px;
}
::v-deep .container {
  max-width: 500px;
}
::v-deep .subtext {
  width: 100%;
  margin: 0 auto;
  font-size: 100%;
}
::v-deep .bg {
  width: 100%;
  height: 100%;
  position: fixed;
  background: url('../../assets/paraisopolis.png');
  background-size: cover;
  background-position: center;
}
::v-deep .subtext span {
  font-weight: 700;
}
p ::v-deep .subtext p {
  width: 70%;
  margin: 0 15%;
  margin: 15px;
}
@media (max-width: 375px) {
  .top {
    width: 90%;
    margin: 0 5%;
    text-align: center;
  }
}
</style>



