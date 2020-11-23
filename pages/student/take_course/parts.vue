<template>
  <div>
    <header-bar :title="'Aula'" :back-page="true"></header-bar>
    <v-layout id="page" justify-center>
      <div v-if="loading">
        <div class="container-spinner">
          <v-progress-circular
            :size="70"
            :width="5"
            indeterminate
            color="#6600cc"
          />
        </div>
      </div>
      <v-flex v-else ref="flex" class="main-container">
        <h3>{{ part.lessonTitle }}</h3>
        <h4>{{ description }}</h4>
        <div class="inner-container">
          <div class="video-iframe-container">
            <iframe
              width="300"
              height="250"
              :src="part.videoUrl.replace('watch?v=', 'embed/')"
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="text__information">
            <v-btn class="btn-block btn-primary" @click="advanceCourse">
              PRÓXIMO
            </v-btn>
          </div>
        </div>
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
import CommentCard from '~/components/Comments';
import utils from '~/utils/index';
import http from '~/services/http/generic';
import CertificateCard from '~/components/CertificateCard.vue';

export default {
  components: {
    NavigationBar,
    HeaderBar,
    CommentCard,
    CertificateCard,
  },
  data: () => ({
    urlVideo: '',
    description: '',
    selectedTab: 0,
    loading: true,
  }),
  computed: {
    part() {
      return this.$store.state.courses.currentPart;
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
    courseId() {
      return this.$store.state.courses.current.id;
    },
    user() {
      return this.$store.state.user.data;
    },
  },
  created() {
    this.getCourse();
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    async getCourse() {
      const parts = await http.getAll(
        `${process.env.endpoints.PART_BY_LESSON}/${this.part.id}`,
      );

      const lessons = await http.getAll(
        `${process.env.endpoints.LESSONS_BY_COURSE}${this.courseId}`,
      );
      const currentLessonData = await lessons.data.filter(
        data => data.title === this.part.lessonTitle,
      );
      const responsePart = parts.data.filter(
        part => part.videoUrl === this.part.youtubeUrl,
      );
      console.log(responsePart);
      this.partId = responsePart[0].id;

      console.log(this.partId);
      this.description = currentLessonData[0].description;
      this.getComments();
    },
    async getComments() {
      const comments = await http.getAll(
        `${process.env.endpoints.COMMENT}/${this.partId}`,
      );
      console.log(comments);
    },
    advanceCourse() {
      this.loading = true;
      // avançando no curso
      http
        .post(
          `${process.env.endpoints.ADVANCE_COURSE}/user/${this.idUser}/course/${this.courseId}`,
        )
        .then(() => {
          // Atualizando o estado do curso
          http
            .getAll(
              `${process.env.endpoints.STATE_COURSE}/user/${this.idUser}/course/${this.courseId}`,
            )
            .then(res => {
              // Verificando se já concluiu
              if (res.data.status === 'COMPLETED') {
                delete res.data.user;
                delete res.data.course;
                delete res.data.currentLesson;
                delete res.data.currentPart;
                delete res.data.currentTest;
                this.$store.commit('courses/setCurrentState', res.data);
                $nuxt._router.push(`/aluno/curso/${this.slug}/fim`);
              }

              // caso não houver concluído, salva o estado atual
              this.$store.commit('courses/setCurrent', res.data.course);
              delete res.data.user;
              delete res.data.course;
              this.$store.commit('courses/setCurrentState', res.data);

              // Verificando qual o próximo passo
              http
                .getAll(
                  `${process.env.endpoints.CURRENT_STEP}/user/${this.idUser}/course/${this.courseId}`,
                )
                .then(res => {
                  if (res.data.type === 'NEW_TEST') {
                    this.$store.commit('courses/setCurrentTest', res.data.data);
                    $nuxt._router.push(`parte/teste`);
                  } else {
                    this.$store.commit('courses/setCurrentPart', res.data.data);
                  }
                });
            });
        });
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
* {
  font-family: 'Roboto', sans-serif;
  transition: 0.2 ease-in;
}
h1 {
  font-weight: 900;
  font-size: 1em;
  line-height: 36px;
  color: var(--primary);
}

@media screen and (max-width: 20.625em) {
  h1 {
    font-size: 14px;
  }
}

.comments__number {
  color: black;
  margin-top: 24px;
  font-size: 12px;
  font-weight: 700;
  color: #1a1a1a;
}
.filter__coments {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: #3f3d56;
}

h3 {
  font-weight: 900;
  font-size: 14px;
  line-height: normal;
  line-height: initial;
  text-align: left;
  color: var(--primary);
}

h4 {
  font-weight: 400;
  padding-top: 0.25em;
  padding-bottom: 12px;
  color: #1a1a1a;
  font-size: 12px;
}

.text__information {
  margin-top: 24px;
}

.main-container {
  display: flex;
  flex-direction: column;
  padding: 0em 2em 78px;
}

::v-deep .v-input {
  width: 75%;
}

.inner-container {
  margin-top: 0.5rem;
}
::v-deep ::placeholder {
  color: rgba(26, 26, 26, 0.24) !important;
}

::v-deep.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  min-height: 0 !important;
}
::v-deep .v-tabs-slider-wrapper {
  height: 4px !important;
  color: var(--primary-light);
}
::v-deep .v-tab {
  margin-top: 5px;
  font-size: 11px !important;
  line-height: 16px;
  font-weight: 400;
  color: black;
  text-transform: none;
  border-bottom: 4px solid #f5f5f5;
}
// force initial active tab to be selected
::v-deep .v-tab--active {
  border-bottom: 4px solid var(--primary-light);
}
::v-deep .v-tabs {
  max-height: 32px;
}
/* ::v-deep .v-input__control {
  height: 0 !important;
}
::v-deep .v-input__slot {
  min-height: 32px !important;
}
::v-deep #input-236 {
  top: -9px;
  position: relative;
} */

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
}
</style>
