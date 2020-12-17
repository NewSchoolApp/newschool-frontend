<template>
  <div>
    <HeaderBar :title="'Curso'" :route="'/aluno/home'"></HeaderBar>
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
    <div v-else id="main-col">
      <h1 id="title__course" class="h1__theme pb-2">{{ course.titulo }}</h1>
      <div class="mask__img">
        <img
          v-if="showThumb"
          :src="course.capa.url"
          alt="imagem-curso"
          title="imagem curso"
          @error="imageLoadError"
        />
      </div>
      <div class="info__box">
        <section>
          <div class="course__info pt-2 pb-4">
            <div class="author__info">
              <h1 class="h1__theme">Professor&nbsp;&nbsp;&nbsp;&nbsp;</h1>
              <p id="author__name">{{ course.nomeDoAutor }}</p>
            </div>
            <div class="mural" @click="goToMural">
              <p>Mural</p>
            </div>
          </div>
        </section>
        <p id="description">{{ course.descricao }}</p>
      </div>

      <div class="base">
        <v-btn
          v-if="courseState == 'TAKEN'"
          class="btn-block btn-primary"
          @click="continueCourse()"
        >
          Continuar
        </v-btn>
        <v-btn
          v-else-if="courseState == 'COMPLETED'"
          class="btn-block btn-primary"
          @click="goToCertificate()"
        >
          Certificado
        </v-btn>
        <v-btn v-else class="btn-block btn-primary" @click="startCourse()">
          Iniciar
        </v-btn>
      </div>
    </div>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>
<router>
  {
    path: '/aluno/curso/:courseSlug'
  }
</router>
<script>
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import http from '~/services/http/generic';

export default {
  components: {
    NavigationBar,
    HeaderBar,
  },
  data() {
    return {
      showThumb: true,
      loading: true,
      courseState: 'NOT_TAKEN',
    };
  },
  computed: {
    course() {
      return this.$store.state.courses.current;
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
  },
  mounted() {
    this.checkCourseState();
    this.loading = false;
  },
  methods: {
    checkCourseState() {
      const tryFind = this.$store.state.courses.my.find(
        course => course.courseId == this.course.id,
      );
      if (tryFind) {
        if (!tryFind.challenge) {
          this.courseState = 'TAKEN';
        } else {
          this.courseState = 'COMPLETED';
        }
      }
    },
    imageLoadError() {
      this.showThumb = false;
    },
    goToCertificate() {
      // eslint-disable-next-line no-undef
      $nuxt._router.push(
        `/aluno/certificado-info/${this.$store.state.user.data.id}/${this.course.id}`,
      );
    },
    goToMural() {
      this.$router.push(`/aluno/curso/${this.$route.params.courseSlug}/mural`);
    },
    async startCourse() {
      // send to backend that this course will start
      await http
        .post(process.env.endpoints.INIT_COURSE, {
          userId: this.idUser,
          courseId: this.course.id,
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.$notifier.showMessage({
            type: 'error',
            message: 'Vish algo deu errado, tenta de novo mano!',
          });
        });

      await this.$store.dispatch('courses/refreshMyCourses');

      const currentStep = await this.$store.dispatch(
        'courses/refreshCurrentStep',
      );

      // go to step url
      $nuxt._router.push(currentStep.stepUrl);
    },
    async continueCourse() {
      // check for current step
      const currentStep = await this.$store.dispatch(
        'courses/refreshCurrentStep',
      );

      // go to step url
      $nuxt._router.push(currentStep.stepUrl);
    },
  },
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 1rem;
}

.author__info {
  display: flex;
  align-items: center;
}

.mask__img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin-top: 1%;

  img {
    width: 100%;
  }
}

.course__info {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  margin-top: 1%;
}

.h1__theme {
  font-family: 'Roboto';
  font-weight: 900;
  font-size: 14px;
  line-height: 16px;
  color: #6600cc;
  margin-top: 4px;
}

.mural p {
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #737373;
  cursor: pointer;
}

.info__box {
  display: flex;
  margin-top: -0.4rem;
  flex-direction: column;
}
.info__box section {
  width: 100%;
  display: flex;
  align-items: center;
}
#author__name {
  font-size: 0.8555rem;
  font-weight: 600;
  margin-bottom: -4px;
}
#description {
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 16px;
  color: #1a1a1a;
}
.v-progress-circular {
  color: #b2b2b2;
}
.v-btn__loader {
  background-color: #e9e9e9;
}

::v-deep .v-application p {
  margin-bottom: 0 !important;
}

#main-col {
  position: relative;
  margin: 10px 24px 80px;
  min-height: calc(100vh - 160px);
}

.base {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
