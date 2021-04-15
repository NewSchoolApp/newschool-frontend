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
    <HeaderBar class="mb-7" :title="pilarName" :back-page="true"></HeaderBar>
    <v-col id="main-col">
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
      <!-- <p id="title">Cursos</p> -->

      <!-- Course Cards  -->
      <course-card
        v-for="course in coursesByTrail"
        :key="course.id"
        :course="course"
      />
    </v-col>
    <navigation-bar />
  </div>
</template>
<router>
    path: "/list-de-cursos/:trilha"
</router>
<script>
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import CourseCard from '~/components/CourseCard';
import http from '~/services/http/generic';
import utils from '~/utils/index';
import mockCourses from '~/services/mocks/course/coursesMock.json';

export default {
  components: {
    NavigationBar,
    CourseCard,
    HeaderBar,
  },
  data: () => ({
    title: 'Bem-vindo',
    loading: true,
    filtro: '',
    notifications: '',
    userPoints: '',
    trails: '',
    coursesByTrail: [],
  }),
  computed: {
    courseList() {
      return this.$store.state.courses.all;
    },

    pilarName() {
      return this.$route.params.trilha;
    },
    trailList() {
      const trails = [
        {
          id: 1,
          titulo: 'Socioemocional',
          photo:
            'https://cms-platform-management-dev.s3.us-east-2.amazonaws.com/2_029125dfb7.jpg',
        },
        {
          id: 2,
          titulo: 'Educacional',
          photo:
            'https://cms-platform-management-dev.s3.us-east-2.amazonaws.com/2_029125dfb7.jpg',
        },
        {
          id: 3,
          titulo: 'Profissional',
          photo:
            'https://cms-platform-management-dev.s3.us-east-2.amazonaws.com/2_029125dfb7.jpg',
        },
        {
          id: 4,
          titulo: 'Social',
          photo:
            'https://cms-platform-management-dev.s3.us-east-2.amazonaws.com/2_029125dfb7.jpg',
        },
      ];
      return trails;
    },
    user() {
      return this.$store.state.user.data;
    },
    userName() {
      return this.user.name.split(' ')[0];
    },
    filteredList() {
      if (this.filtro) {
        const exp = new RegExp(
          this.filtro
            .normalize('NFD')
            .replace(/[\u0300-\u036F]/g, '')
            .toLowerCase()
            .replace(' ', '-')
            .trim(),
          'i',
        );
        return this.trailList.filter(trail => exp.test(trail.name));
      } else {
        return this.trailList;
      }
    },
  },

  async mounted() {
    await this.$store.dispatch('courses/refreshAllCourses');
    await this.$store.dispatch('courses/refreshMyCourses');

    await this.getNotifications();
    await this.getUserScore();
    const trail = this.$route.params.trilha;

    this.coursesByTrail = mockCourses.filter(course =>
      course.trilhas.includes(trail),
    );

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
    // async getTrails() {
    //   this.trails = (await http.getAll(`${process.env.endpoints.TRAILS}`)).data;
    // },
    async getUserScore() {
      this.userPoints = (
        await http.getAll(
          `${process.env.endpoints.RANKING}/user/${this.user.id}/total-points`,
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
  object-fit: cover;
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
  right: 5px;
  top: 13px;
}

.notification_high_number {
  height: 12px;
  width: 14px;
  border-radius: 50px;
  background: linear-gradient(
    157.23deg,
    #d63305 8.86%,
    #cf3004 38.81%,
    #bc2602 82.43%,
    #b72401 90.69%
  );
  position: absolute;
  right: 5px;
  top: 13px;
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
.notifications__high {
  color: white;
  font-size: 8px;
  position: absolute;
  top: 0.4px;
  right: 0;
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

.notification__number__container {
  max-width: 700px;
  position: relative;
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
