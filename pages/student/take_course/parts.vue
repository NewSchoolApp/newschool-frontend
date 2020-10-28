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
        <div class="inner-container">
          <h3>{{ part.lessonTitle }}</h3>
          <h4>{{ description }}</h4>

          <div class="video-iframe-container">
            <iframe
              :src="part.videoUrl"
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <h4>Youtube</h4>
        </div>
        <v-btn
        class="btn-block btn-primary"
        @click="advanceCourse">
          Próximo
        </v-btn>
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
import utils from '~/utils/index';
import http from '~/services/http/generic';

export default {
  components: {
    NavigationBar,
    HeaderBar,
  },
  data: () => ({
    urlVideo: '',
    description: '',
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
  },
  created() {
    this.getCourse();
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    async getCourse() {
      const lessons = await http.getAll(
        `${process.env.endpoints.LESSONS_BY_COURSE}${this.courseId}`,
      );
      const currentLessonData = await lessons.data.filter(
        data => data.title === this.part.lessonTitle,
      );
      this.description = currentLessonData[0].description;
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

h3 {
  font-weight: 600;
  font-size: 1em;
  line-height: normal;
  line-height: initial;
  text-align: left;
  color: var(--primary);
}

h4 {
  font-weight: 500;
  padding-top: 0.25em;
  padding-bottom: 12px;
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
}
</style>
