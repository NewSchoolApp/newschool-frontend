<template>
  <div>
    <HeaderBar :title="'Apoie a New School'" :back-page="true"></HeaderBar>
    <v-container class="px-8">
      <v-row>
        <h5>Pega a visão</h5>
      </v-row>
      <v-row>
        <video-player
          ref="player"
          class="mt-3"
          :youtube-url="video_url"
          :thumbnail="thumbnail"
        />
      </v-row>
      <v-row class="align-baseline">
        <v-icon color="#FFE470">mdi-star</v-icon>
        <p class="bank__text position__adjutstment">PIX: 33.793.768/0001-19</p>
      </v-row>
      <v-row>
        <h5>Seja um Doador</h5>
      </v-row>
      <v-row>
        <p class="bank__text mt-2">
          Seja um doador e patrocine um aluno, ajudando a ter um futuro de
          qualidade e melhores escolhas.
        </p>
      </v-row>
      <v-row>
        <h5>Seja um Patrocinador</h5>
      </v-row>
      <v-row class="mb-10">
        <p class="bank__text mt-2 ">
          Seja um patrocinador, ajudando a New School com o objetivo de oferecer
          à esses jovens um futuro de qualidade e melhores escolhas.
        </p>
      </v-row>
      <v-row>
        <button class="btn-primary btn-block" @click="sendMessage">
          DOE UM FUTURO
        </button>
      </v-row>
    </v-container>
  </div>
</template>

<router>
  {
    path: '/contribua'
  }
</router>

<script>
import HeaderBar from '~/components/Header.vue';
import VideoPlayer from '~/components/VideoPlayer.vue';

export default {
  components: {
    HeaderBar,

    VideoPlayer,
  },

  data() {
    return {
      thumbnail:
        'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35160991368917.5e303bd02c67f.jpg',
      video_url: 'https://www.youtube.com/embed/E2ao9bjHZlw',
    };
  },
  methods: {
    select(location) {
      window.open(location, '_blank');
    },
    sendMessage() {
      window.location =
        'https://api.whatsapp.com/send?phone=+551195154-4712&text=Olá, Gostaria de saber mais de como posso fazer uma doação para a New School.';
    },
  },
};
</script>

<style scoped>
.bank__text {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
}

.position__adjutstment {
  position: relative;
  left: 13px;
  top: -4px;
}
h5 {
  font-weight: 700;
  color: var(--primary);
}
</style>
