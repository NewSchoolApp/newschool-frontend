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
          :src="require(`~/assets/trophy-home.png`)"
          @click="goTo('ranking')"
        />
        <img
          id="bell"
          :src="
            require(`~/assets/${
              notifications.length ? 'bell' : 'bell-home-colorized'
            }.svg`)
          "
          @click="goTo('notificacao')"
        />
        <div v-if="notifications.length" class="notification__number">
          <p
            :class="
              notifications.length < 10
                ? 'notification__low_text'
                : 'notification__text'
            "
          >
            {{ notifications.length }}
          </p>
        </div>
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
        class="search-field"
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

  async mounted() {
    await this.$store.dispatch('courses/refreshAllCourses');
    await this.$store.dispatch('courses/refreshMyCourses');

    await this.getNotifications();
    await this.getUserScore();

    this.loading = false;
  },
  methods: {
    goTo(path) {
      $nuxt._router.push(`/aluno/${path}`);
    },
    async getNotifications() {
      this.notifications = (
        await http.getAll(
          `${process.env.endpoints.NOTIFICATIONS}/user/${this.user.id}`,
        )
      ).data;
    },
    async getUserScore() {
      this.userPoints = (
        await http.getAll(
          `${process.env.endpoints.RANKING}/user/${this.user.id}?timeRange=YEAR`,
        )
      ).data.points;
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
.notification__number {
  height: 11px;
  width: 11px;
  border-radius: 50px;
  background: linear-gradient(
    157.23deg,
    #d63305 8.86%,
    #cf3004 38.81%,
    #bc2602 82.43%,
    #b72401 90.69%
  );
  position: absolute;
  right: 29px;
  z-index: 9;
  top: 32px;
}

.notification__text {
  color: white;
  font-size: 8px;
  position: absolute;
  top: 0.4px;
  right: 1px;
}

.notification__low_text {
  color: white;
  font-size: 8px;
  position: absolute;
  top: 0.4px;
  right: 3px;
}

#bell {
  color: #737373;
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

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
@media (min-width: 700px) {
  #page {
    display: flex;
    justify-content: center;
  }
}
</style>
