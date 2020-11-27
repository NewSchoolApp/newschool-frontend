<template>
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
  <div v-else id="page">
    <v-col id="main-col">
      <v-row justify="end">
        <img
          class="header_img"
          :src="require(`~/assets/trophy-home.svg`)"
          @click="goTo('ranking')"
        />
        <img
          id="bell"
          class="header_img"
          :src="
            require(`~/assets/bell-home${
              notifications.length ? '-active' : ''
            }.svg`)
          "
          @click="goTo('notificacao')"
        />
      </v-row>

      <!-- Header-bar -->
      <v-row id="header" align="center">
        <v-avatar class="user__image" size="55">
          <img v-if="user.photo" :src="user.photo" @click="goTo('perfil')" />
          <img
            v-else
            :src="require(`~/assets/person.svg`)"
            @click="goTo('perfil')"
          />
        </v-avatar>

        <v-col>
          <h1 class="welcome-title">
            {{ 'Salve, ' + userName + '!' }}
          </h1>
          <h1 class="welcome-subtitle">Seja bem-vindo</h1>
        </v-col>

        <h1 class="xp">{{ userPoints || 0 }} NC</h1>
      </v-row>

      <!-- Search Field -->
      <v-text-field
        v-model="filtro"
        label="Encontre Cursos"
        outlined
        prepend-inner-icon="mdi-magnify"
        autocomplete="off"
      />

      <!-- Course Title -->
      <p id="title">Cursos</p>

      <!-- Course Cards  -->
      <course-card
        v-for="course in filteredList"
        :key="course.id"
        :course="course"
      />
    </v-col>
  </div>
</template>

<script>
import CourseCard from '~/components/CourseCard';
import http from '~/services/http/generic';

export default {
  components: {
    CourseCard,
  },
  data: () => ({
    title: 'Bem-vindo',
    loading: true,
    filtro: '',
    notifications: '',
    userPoints: '',
  }),
  computed: {
    courseList() {
      return this.$store.state.courses.all;
    },
    user() {
      return this.$store.state.user.data;
    },
    userName() {
      return this.user.name.split(' ')[0];
    },
    filteredList() {
      if (this.filtro) {
        const exp = new RegExp(this.filtro.trim(), 'i');
        return this.courseList.filter(course => exp.test(course.title));
      } else {
        return this.courseList;
      }
    },
  },
  mounted() {
    this.getAllCourses();
    this.getNotifications();
    this.getUserScore();
    this.getMyCourses();
  },
  methods: {
    getAllCourses() {
      http.getAll(process.env.endpoints.COURSE).then(({ data }) => {
        this.$store.commit('courses/setAll', data);
        this.loading = false;
      });
    },
    getMyCourses() {
      http
        .getAll(`${process.env.endpoints.MY_COURSES}${this.user.id}`)
        .then(({ data }) => {
          console.log('MYCOURSES: ', data);
          this.$store.commit('courses/setMy', data);
        });
    },
    goTo(path) {
      $nuxt._router.push(`/aluno/${path}`);
    },
    getNotifications() {
      http
        .getAll(`${process.env.endpoints.NOTIFICATIONS}/user/${this.user.id}`)
        .then(response => {
          this.notifications = response.data;
        });
    },
    getUserScore() {
      http
        .getAll(
          `${process.env.endpoints.RANKING}/user/${this.user.id}?timeRange=YEAR`,
        )
        .then(userRanking => {
          const { points } = userRanking.data;
          this.userPoints = points;
        });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}

#main-col {
  padding: 20px 24px 50px 24px;
  max-width: 700px;
}

::v-deep .row {
  width: 100%;
  margin: 0;
}
.user__image {
  cursor: pointer;
}

#title {
  color: var(--primary);
  line-height: 16.4px;
  font-weight: 900;
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.header_img {
  width: 24px;
  height: 24px;
  margin-right: 20px;
}

#bell {
  color: #737373;
  width: 22px;
  height: 22px;
  margin-right: 5px;
  margin-top: 5px;
}

/* especificações gerais da fonte do label e do valor */
::v-deep .v-label,
::v-deep .v-input input {
  font-size: 0.87rem !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.25) !important;
  font-family: 'Montserrat', sans-serif;
}

/* cor especifica do valor */
::v-deep .v-input input {
  color: rgba(0, 0, 0, 0.5) !important;
}

/* tirar a margin inferior */
::v-deep .v-input__slot {
  margin-bottom: 0;
  margin-bottom: 10px !important;
}

/* cor e aspecto da borda */
::v-deep fieldset {
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

/* margin superior */
::v-deep .v-text-field.v-text-field--enclosed {
  margin: 16px 0 0 !important;
}

/* define a altura do campo de input */
::v-deep .v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 48px;
}

/* centraliza o label */
::v-deep
  .v-input:not(.v-input--is-focused)
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > .v-label {
  /* display: contents; */
  line-height: 12px;
}

/* container do icon: tira margin de cima, aplica um distanciamento do label e alinha ao centro do campo */
::v-deep .v-text-field--enclosed .v-input__prepend-inner {
  margin-top: 0;
  /* padding-right: 11.5px; */
  align-self: center;
}

/* margin lateral do conteudo do campo */
::v-deep
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot {
  padding: 0 19px;
}

::v-deep .theme--light.v-icon {
  color: rgba(0, 0, 0, 0.9);
}

/* .theme--light.v-icon {
  color: none;
} */

#header {
  height: auto;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.welcome {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 24px;
}

.xp {
  font-weight: 900;
  font-size: 1rem;
  color: rgba(26, 26, 26, 1);
  flex: center;
}

.welcome-title {
  color: #1a1a1a;
  font-size: 0.87rem;
  font-weight: 900;
}

.welcome-subtitle {
  line-height: 10px;
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}

.article-container {
  display: flex;
  max-width: 100vw;
  padding: 0 2em 56px 1.5em;
}

.max-content {
  max-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}

.title-section {
  font-weight: 900;
  font-size: 0.9rem;
  line-height: 17px;
  color: var(--primary);
  padding: 1.25em 0 0.5em 1.6em;
  text-transform: uppercase;
}
/*Large devices (desktops, 992px and up)*/
@media (min-width: 992px) {
  #page {
    display: flex;
    justify-content: center;
  }
}
</style>
