<template>
  <v-layout justify-center id="page">
    <v-flex ref="flex" class="main-container">

      <h1>
        <n-link to="../">
          <v-btn class="back-button" text icon color="primary">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </n-link>
        <!-- {{ lessonName || 'Titúlo da Aula'}} -->
        {{ 'Titúlo da Aula' }}
      </h1>

      <div class="inner-container">
        <h3> {{ part.title }} </h3>
        <h4> {{ part.description }} </h4>

        <div class="video-iframe-container">
            <iframe :src="part.youtubeUrl" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <h4> Youtube </h4>

        <div class="video-iframe-container">
            <iframe :src="part.vimeoUrl" frmeborder="0" allow="fullscreen" allowfullscreen></iframe>
        </div>
        <h4> Vimeo </h4>
      </div>

      <v-btn color="primary" class="save-button" :to="part.id + '/teste'">Próximo</v-btn>
    </v-flex>
    <client-only>
      <navigation-bar />
    </client-only>
  </v-layout>
</template>

<router>
  {
    path: '/aluno/curso/:courseSlug/aula/parte'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar'
import parts from '~/services/http/generic'

export default {
    components: {
      NavigationBar,
    },
    computed: {
        part() {
            return this.$store.state.courses.currentPart
        },
    },
    data: () => ({
        title: 'Título da Aula',
    }),
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              'Ajude a espalhar o conhecimento criando um Teste para uma Parte de um Curso da New School - Levamos educação de qualidade ' +
              'na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da ' + 
              'curadoria de conteúdos baseados nas habilidades do futuro.',
          },
        ],
      }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    font-weight: 900;
    font-size: 1em;
    line-height: 36px;
    text-align: center;
    color: #6600CC;
}

@media screen and (max-width: 20.625em) {
    h1 {
        font-size: 14px;
    }
}

h3 {
    font-weight: 900;
    font-size: 1em;
    line-height: initial;
    text-align: left;
    color: #6600CC;
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
    padding: 2em 2em 0;
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
    color: #FFFFFF;
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

.inner-container {
    margin-top: 1.5em;
}
</style>
