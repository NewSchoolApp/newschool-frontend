<template>
  <div>
    <div v-show="!loading" id="page">
      <HeaderBar :title="'Meus Cursos'" :back-page="true"></HeaderBar>
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
    <navigation-bar />
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
  }),
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
};
</script>

<style scoped lang="scss">
* {
  transition: 0.2 ease-in;
}
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
.btn-back {
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
