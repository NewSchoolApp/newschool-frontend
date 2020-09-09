<template>
  <div>
    <div v-show="!loading" id="page">
      <HeaderBar :title="'Meus Cursos'" :backPage="true"></HeaderBar>
      <div v-if="courses.length" class="container__list">
        <div
          class="card"
          v-for="course of courses"
          v-bind:key="course.course.id"
          @click="goToCourse(course)"
        >
          <div class="header__info">
            <h1>{{course.course.title}}</h1>
            <v-btn
              v-if="course.status === 'TAKEN'"
              class="btn-back"
              text
              icon
              @click="continueCourse(course.course)"
            >
              <p id="continue__text">
                CONTINUAR
                <v-icon>mdi-arrow-right</v-icon>
              </p>
            </v-btn>
            <p class="text__success" v-else>CONCLUÍDO</p>
          </div>
          <div class="progress">
            <p id="value__progress">{{course.completion}}%</p>
            <v-progress-linear :value="course.completion" height="7" rounded="true"></v-progress-linear>
          </div>
        </div>
      </div>
      <NothingToShow v-else title="Vixe :/" message="Você não começou nenhum curso." />
    </div>
    <div v-if="loading">
      <div class="container-spinner">
        <v-progress-circular :size="70" :width="5" indeterminate color="#6600cc" />
      </div>
    </div>
    <navigation-bar />
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import http from '~/services/http/generic';
import NothingToShow from '~/components/NothingToShow';

export default {
  data: () => ({
    loading: true,
  }),
  methods: {
    continueCourse(course) {
      this.loading = true;
      http
        .getAll(
          `${process.env.endpoints.STATE_COURSE}/user/${this.user.id}/course/${course.id}`,
        )
        .then(res => {
          // salvando o estado atual
          this.$store.commit('courses/setCurrent', res.data.course);
          delete res.data.user;
          delete res.data.course;
          this.$store.commit('courses/setCurrentState', res.data);

          // Verificando qual o próximo passo
          http
            .getAll(
              `${process.env.endpoints.CURRENT_STEP}/user/${this.user.id}/course/${course.id}`,
            )
            .then(res => {
              if (res.data.type === 'NEW_TEST') {
                this.$store.commit('courses/setCurrentTest', res.data.data);
                $nuxt._router.push(
                  `/aluno/curso/${course.id}/aula/parte/teste`,
                );
              } else {
                this.$store.commit('courses/setCurrentPart', res.data.data);
                $nuxt._router.push(`/aluno/curso/${course.id}/aula/parte`);
              }
            });
        });
    },
    goToCourse(courseAndState) {
      if (courseAndState.status === 'COMPLETED') {
        const url = courseAndState.course.slug
          ? courseAndState.course.slug
          : this.convertToSlug(courseAndState.course.title);
        // eslint-disable-next-line no-undef
        $nuxt._router.push(`/aluno/curso/${url}`);
      } else {
        this.continueCourse(courseAndState.course);
      }
    },

    convertToSlug(str) {
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase();

      const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
      const to = 'aaaaaeeeeeiiiiooooouuuunc------';

      for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
      str = str
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
      return str;
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
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 400);
  },
  components: {
    NavigationBar,
    HeaderBar,
    NothingToShow,
  },
  asyncData({ store, data, params, $axios }) {
    return http
      .getAll(`${process.env.endpoints.MY_COURSES}${store.state.user.data.id}`)
      .then(response => store.commit('courses/set', response.data));
  },
};
</script>

<style scoped lang="scss">
#page {
  height: 100%;
}
h1 {
  font-size: 0.8rem;
  font-weight: 600;
  width: 55%;
}
.container__list {
  margin-bottom: 5rem;
}
.card {
  height: 8rem;
  margin: 1.3rem;
  padding: 0.9rem;
  background: #fff;
  box-shadow: 0px 12px 20px 0px #00000026;
  border-radius: 5px;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.btn-back{
  width: unset !important;
}
.header__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
::v-deep .v-btn--icon.v-size--default {
  height: unset;
  color: #6600cc;
}
.text__success {
  font-weight: 400;
  color: #35de63;
  font-size: 13px;
}
.progress-linear {
  height: 6px;
  border-radius: 50px;
}
#value__progress {
  color: darkgray;
  padding-bottom: 5px;
}
#continue__text {
  font-size: smaller;
}
</style>
