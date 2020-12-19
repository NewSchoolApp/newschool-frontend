<template>
  <div>
    <div class="bg"></div>
    <HeaderBar
      class="top"
      :title="'O que é a New School?'"
      :back-page="true"
    ></HeaderBar>
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
              <span>educação de qualidade</span> traduzida na linguagem da
              quebrada para todo o Brasil através da <span>tecnologia</span> e
              de conteúdos baseados nas novas
              <span>habilidades do futuro.</span>
            </p>
            <p>
              Nosso objetivo é formar
              <span>protagonistas</span> por meio de um conceito diferente de
              educação prática, futurista e
              <span>descolada.</span>
              Criamos experiências transformadoras de aprendizagem para que
              jovens como você encarem melhor os
              <span>desafios da vida.</span>
            </p>
            <div style="position:relative;">
              <video-player
                ref="player"
                class="video__size"
                :youtube-url="urlVideo"
                :thumbnail="thumbnail"
              />
              <br />
              <br />
              <video-player
                ref="player"
                class="video__size"
                :youtube-url="urlVideo2"
                :thumbnail="thumbnail"
              />
            </div>
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
import VideoPlayer from '~/components/VideoPlayer.vue';
export default {
  components: {
    HeaderBar,
    NavigationBar,
    VideoPlayer,
  },
  data: () => ({
    urlVideo: 'https://www.youtube.com/embed/u4O8wE0gYO0',
    urlVideo2: 'https://www.youtube.com/embed/OXxSY4PNr-o',
    thumbnail:
      'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35160991368917.5e303bd02c67f.jpg',
    loading: true,
  }),
};
</script>
<style scoped>
::v-deep .text {
  width: 100%;
  color: var(--primary);
  font-family: 'Montserrat';
  text-transform: uppercase;
}
::v-deep .container {
  max-width: 500px;
  margin: 0 auto 18%;
  padding: 0 24px;
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

::v-deep .h1__theme {
  font-size: 1.3rem;
  width: 80%;
  text-align: center;
}
#header_bar {
  z-index: 9999;
}
.video-iframe-container {
  margin: 0 auto;
  padding: 0 24px;
}

.video__size {
  height: 200px;
}
</style>
