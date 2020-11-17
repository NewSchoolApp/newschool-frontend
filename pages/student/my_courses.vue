<template>
  <div>
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
      <div v-if="courses.length">
        <div v-for="course of courses" :key="course.course.id">
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
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import http from '~/services/http/generic';
import NothingToShow from '~/components/NothingToShow';
import CourseProgress from '~/components/CourseProgress';

export default {
  transition: 'bounce',
  components: {
    NavigationBar,
    HeaderBar,
    NothingToShow,
    CourseProgress,
  },
  asyncData({ store, data, params, $axios }) {
    return http
      .getAll(`${process.env.endpoints.MY_COURSES}${store.state.user.data.id}`)
      .then(response => store.commit('courses/set', response.data));
  },
  data: () => ({
    loading: true,
    selectedTab: 0, // (0 == Em andamento, 1 == Finalizados)
  }),
  computed: {
    courses() {
      return this.$store.state.courses.list.filter(course => {
        if (this.selectedTab == '1') {
          return course.completion == 100;
        } else {
          return course.completion < 100;
        }
      });
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
</style>
