<template>
  <div>
    <header-bar :title="'Partes'" :backPage="true"></header-bar>
    <v-layout justify-center id="page">
      <v-flex ref="flex" class="main-container">
        <h1>{{ lessonName || 'Título da Aula' }}</h1>

        <div class="inner-container">
          <h3>{{ part.title }}</h3>
          <h4>{{ part.description }}</h4>

          <div class="video-iframe-container">
            <iframe
              :src="part.youtubeUrl"
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <h4>Youtube</h4>

          <div class="video-iframe-container">
            <iframe :src="part.vimeoUrl" frmeborder="0" allow="fullscreen" allowfullscreen></iframe>
          </div>
          <h4>Vimeo</h4>
        </div>

        <v-btn color="primary" class="save-button" to="parte/teste">Próximo</v-btn>
      </v-flex>
      <client-only>
        <navigation-bar />
      </client-only>
    </v-layout>
  </div>
</template>

<router>
  {
    path: '/aluno/curso/:courseSlug/aula/parte'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar';
import HeaderBar from '~/components/Header.vue';

export default {
  components: {
    NavigationBar,
    HeaderBar,
  },
  computed: {
    part() {
      return this.$store.state.courses.currentPart;
    },
    lessonName() {
      return this.$store.state.courses.currentLesson.title;
    },
  },
  head() {
    return {
      title: this.part.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Assista as video-aulas para conseguir responder ao testes e avançar no curso! - Levamos educação de qualidade ' +
            'na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da ' +
            'curadoria de conteúdos baseados nas habilidades do futuro.',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 900;
  font-size: 1em;
  line-height: 36px;
  color: #6600cc;
}

@media screen and (max-width: 20.625em) {
  h1 {
    font-size: 14px;
  }
}

h3 {
  font-weight: 600;
  font-size: 1em;
  line-height: normal;
  line-height: initial;
  text-align: left;
  color: #6600cc;
}

h4 {
  font-weight: 500;
  padding-top: 0.25em;
  color: #656565;
  font-size: 14px;
}

.main-container {
  display: flex;
  flex-direction: column;
  padding: 0em 2em 78px;
}

.inner-container {
  margin-top: 0.5rem;
}

.video-iframe-container {
  background-color: black;
  margin-top: 0.75em;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  h4 {
    padding-top: 0;
    margin-top: -0.5em;
  }
}

.save-button {
  height: 45px !important;
  width: 100%;
  font-weight: 900;
  font-size: 12px !important;
  margin-top: auto;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
}

.v-button__content {
  font-weight: 900;
  font-size: 12px;
  line-height: 14px;
}

.back-button {
  min-width: 0 !important;
  float: left;
}
</style>
