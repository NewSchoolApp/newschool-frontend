<template>
  <div>
    <HeaderBar :title="'Meus Cursos'" :backPage="true"></HeaderBar>

    <div v-if="loading">
      <div class="container-spinner">
        <v-progress-circular :size="70" :width="5" indeterminate color="#6600cc" />
      </div>
    </div>
    <div v-else id="page">
      <div class="card" v-for="course of courses" v-bind:key="course.course.id">
        <div class="header__info">
          <h1>{{course.course.title}}</h1>
          <v-btn
            v-if="course.status === 'TAKEN'"
            class="btn-back"
            text
            icon
            @click="continueCourse(course.course)"
          >
            CONTINUAR
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
          <p class="text__success" v-else>CONCLUÍDO</p>
        </div>
        <div class="progress">
          <p id="value__progress">{{course.completition}}%</p>
          <v-progress-linear :value="course.completition" height="7" rounded="true"></v-progress-linear>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '~/components/Header.vue';
import http from '~/services/http/generic';

export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    continueCourse(course) {
      this.loading = true
      http
        .getAll(
          `${process.env.endpoints.STATE_COURSE}/${this.user.id}/${course.id}`,
        )
        .then(res => {
          this.$store.commit('courses/setCurrent', res.data.course);
          delete res.data.user;
          delete res.data.course;
          this.$store.commit('courses/setCurrentState', res.data);
          http
            .post('api/v1/course-taken/advance-on-course', {
              user: this.user.id,
              course: course.id,
            })
            .then(res => {
              this.$store.commit(
                'courses/setCurrentLesson',
                res.data.currentLesson,
              );
              this.$store.commit(
                'courses/setCurrentPart',
                res.data.currentPart,
              );
              this.$store.commit(
                'courses/setCurrentTest',
                res.data.currentTest,
              );

              $nuxt._router.push(`/aluno/curso/${course.id}/aula/parte`);
            });
        });
    },
  },
  computed: {
    courses() {
      return this.$store.state.courses.list;
    },
    user() {
      return this.$store.state.user.data;
    },
  },
  asyncData({ store, data, params, $axios }) {
    return http
      .getAll(`${process.env.endpoints.MY_COURSES}${store.state.user.data.id}`)
      .then(response => store.commit('courses/set', response.data));
  },
  components: {
    HeaderBar,
  },
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 0.9rem;
}
.card {
  margin: 1.3rem;
  padding: 0.9rem;
  background: #fff;
  box-shadow: 0px 12px 20px 0px #00000026;
  border-radius: 5px;
  height: 6.5rem;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.header__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.v-btn--icon.v-size--default {
  height: unset;
  color: #6600cc;
}
.text__success {
  font-weight: 400;
  color: #35de63;
}
.progress-linear {
  height: 6px;
  border-radius: 50px;
}
#value__progress {
  color: darkgray;
  padding-bottom: 5px;
}
</style>
