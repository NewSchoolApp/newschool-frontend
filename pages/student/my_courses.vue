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
      <div v-if="myCourses">
        <div v-for="(course, index) of filteredCourses" :key="index">
          <course-progress :course="course" />
        </div>
      </div>
      <NothingToShow
        v-else
        title="Vixe :/"
        message="Você não começou nenhum curso."
      />
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
  </div>
</template>

<script>
import HeaderBar from '~/components/Header.vue';
import NothingToShow from '~/components/NothingToShow';
import CourseProgress from '~/components/CourseProgress';
import http from '~/services/http/generic';

export default {
  components: {
    HeaderBar,
    NothingToShow,
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
          return course.courseTakenData.completion == 100;
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
    getMyCourses() {
      if (this.courseTaken) {
        this.courseTaken.forEach(myCourse => {
          const courseWithData = this.allCourses.find(
            course => course.id == myCourse.courseId,
          );

          console.log('coursewdata', courseWithData);
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
::v-deep .v-tabs-slider-wrapper {
  height: 4px !important;
  color: var(--primary-light);
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
