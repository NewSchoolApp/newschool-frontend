<template>
  <div>
    <HeaderBar :title="'Curso'" :back-page="true"></HeaderBar>
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
    <div v-else>
      <div id="page">
        <main>
          <h1 id="title__course" class="h1__theme">{{ course.title }}</h1>
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
              <h1 class="h1__theme">Professor&nbsp;&nbsp;</h1>
              <p id="author__name">{{ course.authorName }}</p>
            </section>
            <p id="description">{{ course.description }}</p>
          </div>
          <v-btn
            v-if="thisCourseState == 'TAKEN'"
            class="btn-block btn-primary"
            :loading="loadingInit"
            :disabled="loadingInit"
            @click="continueCourse()"
          >
            Continuar
          </v-btn>
          <v-btn
            v-else-if="thisCourseState == 'COMPLETED'"
            class="btn-block btn-primary"
            :loading="loadingInit"
            @click="goToCertificate()"
          >
            Certificado
          </v-btn>
          <v-btn
            v-else
            class="btn-block btn-primary"
            :loading="loadingInit"
            :disabled="loadingInit"
            @click="startCourse()"
          >
            Iniciar
          </v-btn>
        </main>
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
      loadingInit: false,
    };
  },
  computed: {
    course() {
      return this.$store.state.courses.current;
    },
    thisCourseState() {
      console.log(this.$store.state.courses.my);
      console.log(this.course.id);
      const tryFindCourse = this.$store.state.courses.my.find(
        course => course.courseId == this.course.id,
      );
      console.log(tryFindCourse);
      if (tryFindCourse) {
        console.log('foi');
        return tryFindCourse.status;
      } else {
        console.log('não');
        return false;
      }
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    imageLoadError() {
      this.showThumb = false;
    },
    goToCertificate() {
      // eslint-disable-next-line no-undef
      $nuxt._router.push(
        `/certificado-info/${this.$store.state.user.data.id}/${this.course.id}`,
      );
    },
    async startCourse() {
      this.loadingInit = true;

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

      const currentStep = await this.$store.dispatch(
        'courses/refreshCurrentStep',
      );

      // the course will be start by now, so for sure that the first step will be a part of a lesson.
      // go to step url
      $nuxt._router.push(currentStep.stepUrl);
    },
    async continueCourse() {
      this.loadingInit = true;

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
main {
  padding: 0rem 1.6rem;
}
.mask__img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  height: 15rem;
  margin-top: 0.5rem;

  img {
    width: 100%;
  }
}
.info__box {
  display: flex;
  margin-top: 0.6rem;
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
  margin-bottom: 0;
}
#description {
  margin-top: 0.5rem;
  color: gray;
  font-size: smaller;
  text-align: justify;
}
.v-progress-circular {
  color: #b2b2b2;
}
.v-btn__loader {
  background-color: #e9e9e9;
}
#page {
  margin-bottom: 5rem !important;
}
</style>
