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
          @click="goToRanking"
        />
        <img
          v-if="notifications.length"
          id="bell"
          class="header_img"
          :src="require(`~/assets/bell-home-active.svg`)"
          @click="goToNotifications"
        />
        <img
          v-else
          id="bell"
          class="header_img"
          :src="require(`~/assets/bell-home.svg`)"
          @click="goToNotifications"
        />
      </v-row>

      <!-- Header-bar -->
      <v-row id="header" align="center">
        <v-avatar class="user__image" size="55">
          <img @click="goToProfile" v-if="user.photo" :src="user.photo" />
          <img
            @click="goToProfile"
            v-else
            :src="require(`~/assets/person.svg`)"
          />
        </v-avatar>

        <v-col>
          <h1 class="welcome-title">
            {{ 'Salve, ' + loadUserName() + '!' }}
          </h1>
          <h1 class="welcome-subtitle">Seja bem-vindo</h1>
        </v-col>

        <h1 class="xp">{{ userPoints || 0 }} NC</h1>
      </v-row>

      <!-- Search Field -->
      <v-row>
        <v-text-field
          v-model="filtro"
          label="Encontre Cursos"
          outlined
          prepend-inner-icon="mdi-magnify"
          autocomplete="off"
        />
      </v-row>

      <!-- Course Title -->
      <v-row>
        <p id="title">Cursos</p>
      </v-row>

      <!-- Course Cards  -->
      <v-row>
        <course-card
          v-for="course in filteredList"
          :key="course.id"
          :title="course.title"
          :description="course.description"
          :teacher="course.authorName"
          :image="course.thumbUrl"
          :slug="course.slug"
        />
      </v-row>
    </v-col>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>

<script>
import Avatar from 'vue-avatar';
import CourseCard from '~/components/CourseCard';
import http from '~/services/http/generic';
import NavigatorBar from '~/components/NavigationBar';

export default {
  components: {
    CourseCard,
    Avatar,
    NavigatorBar,
  },
  asyncData({ store, data, params, $axios }) {
    return http
      .getAll(`${process.env.endpoints.MY_COURSES}${store.state.user.data.id}`)
      .then(response => store.commit('courses/set', response.data));
  },
  data: () => ({
    title: 'Bem-vindo',
    list: [],
    loading: true,
    filtro: '',
    notifications: '',
    userPoints: '',
  }),
  computed: {
    user() {
      return this.$store.state.user.data;
    },
    filteredList() {
      if (this.filtro) {
        const exp = new RegExp(this.filtro.trim(), 'i');
        return this.list.filter(course => exp.test(course.title));
      } else {
        return this.list;
      }
    },
  },
  mounted() {
    return http.getAll(process.env.endpoints.COURSE).then(res => {
      this.getNotifications();
      this.list = res.data;
      this.loading = false;
      this.getUserPositionByYear(this.user.id);
    });
  },
  methods: {
    loadUserName() {
      return this.user.name.split(' ')[0];
    },
    goToRanking() {
      $nuxt._router.push('/aluno/ranking');
    },
    goToNotifications() {
      $nuxt._router.push('/aluno/notificacao');
    },
    goToProfile() {
      $nuxt._router.push('/aluno/perfil');
    },
    getNotifications() {
      http
        .getAll(`${process.env.endpoints.NOTIFICATIONS}/user/${this.user.id}`)
        .then(response => {
          this.notifications = response.data;
          console.log(response.data);
        });
      console.log(this.notifications);
    },
    getUserPositionByYear(userId) {
      http
        .getAll(
          `${process.env.endpoints.RANKING}/user/${userId}?timeRange=YEAR`,
        )
        .then(userRanking => {
          const { points } = userRanking.data;
          this.userPoints = points;
        });
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Seja bem vindo(a) ao aplicativo da New School - Levamos educação de qualidade ' +
            'na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da ' +
            'curadoria de conteúdos baseados nas habilidades do futuro.',
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}

#page {
  display: flex;
  justify-content: center;
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
</style>
