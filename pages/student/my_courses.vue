<template>
  <div id="page-window">
    <div v-show="!loading" id="page">
      <HeaderBar :title="'Meus Cursos'" :back-page="true" />
      <v-tabs v-model="selectedTab" fixed-tabs height="35px">
        <v-tab>
          Em andamento
        </v-tab>
        <v-tab>
          Finalizados
        </v-tab>
      </v-tabs>
      <div v-if="filteredCourses.length > 0">
        <div v-for="(course, index) of filteredCourses" :key="index">
          <course-progress :course="course" />
        </div>
      </div>
      <div v-else class="nothing">
        <div v-if="selectedTab == 0" class="nothing-message">
          Eita, Man@... Você ainda não começou nenhum curso.
        </div>
        <div v-else class="nothing-message">
          Eita, Man@... Você ainda não terminou nenhum curso.
        </div>
        <v-img :src="require('~/assets/nothing.svg')" />
      </div>
    </div>
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
    <navigation-bar />
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import CourseProgress from '~/components/CourseProgress';
import http from '~/services/http/generic';

export default {
  components: {
    NavigationBar,
    HeaderBar,
    CourseProgress,
  },
  transition: 'bounce',
  data: () => ({
    loading: true,
    selectedTab: 0, // (0 == Em andamento, 1 == Finalizados)
    myCourses: [],
  }),
  computed: {
    user() {
      return this.$store.state.user.data;
    },
    courseTaken() {
      return this.$store.state.courses.my;
    },
    allCourses() {
      return this.$store.state.courses.all;
    },
    filteredCourses() {
      return this.myCourses.filter(course => {
        if (this.selectedTab == '1') {
          return course.courseTakenData.completion === 100;
        } else {
          return course.courseTakenData.completion < 100;
        }
      });
    },
  },
  async mounted() {
    await this.getMyCourses();
    this.loading = false;
  },
  methods: {
    async getMyCourses() {
      const myCourses = (
        await http.getAll(`${process.env.endpoints.MY_COURSES}${this.user.id}`)
      ).data;

      // push some info about course
      if (myCourses) {
        myCourses.forEach(myCourse => {
          const courseWithData = this.allCourses.find(
            course => course.id == myCourse.courseId,
          );
          // check if the challenge is done
          if (myCourse.completion === 100 && myCourse.challenge === null) {
            // force completion 99%
            myCourse.completion = 99;
          }

          courseWithData.courseTakenData = myCourse;

          this.myCourses.push(courseWithData);
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
* {
  font-family: 'Roboto', sans-serif;
  transition: 0.2 ease-in;
}

#page {
  height: 100%;
  margin-bottom: 60px;
}
h1 {
  font-size: 0.8rem;
  font-weight: 600;
  width: 55%;
}
.container__list {
  margin-bottom: 5rem;
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
::v-deep .v-tab {
  font-size: 11px !important;
  line-height: 16px;
  font-weight: 500;
  color: grey;
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
.nothing {
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: center;
  color: #484848;
  padding: 124px 44px;
}
.nothing-message {
  padding-bottom: 64px;
}
/*Large devices (desktops, 992px and up)*/
@media (min-width: 992px) {
  #page-window {
    display: flex;
    justify-content: center;
  }
  #page {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-bottom: 60px;
    width: 700px;
    max-width: 700px;
  }
}
</style>
