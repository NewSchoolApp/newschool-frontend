<template>
  <v-card
    class="v-card-body"
    elevation="0"
    color="transparent"
    @click="openCourse()"
  >
    <v-img :src="capa" />
    <v-card-title>{{ course.titulo }}</v-card-title>
    <div class="footer-card">
      <v-card-subtitle class="mt-0">{{ course.nomeDoAutor }}</v-card-subtitle>
    </div>
  </v-card>
</template>

<script>
import { methods } from 'vue-social-sharing';
export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    capa() {
      if (this.course && this.course.capa && this.course.capa.url) {
        return this.course.capa.url;
      }
      return 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35160991368917.5e303bd02c67f.jpg';
    },
  },
  methods: {
    async openCourse() {
      if (this.course.pilar) {
        return $nuxt._router.push(
          `/aluno/lista-de-cursos/${this.course.titulo}`,
        );
      }

      // store this course on VueX
      await this.$store.commit('courses/setCurrent', this.course);
      // go tho course page
      if (this.user.data.role == 'ADMIN') {
        $nuxt._router.push(`/admin/curso/${this.course.slug}`);
      } else {
        $nuxt._router.push(`/aluno/curso/${this.course.slug}`);
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}
.footer-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.v-responsive.v-image {
  padding-top: 45%;
  height: 150px;
  position: relative;
  width: 100%;
  border-radius: 5px;
}
.v-card-body {
  margin-bottom: 20px;
}
.v-card__title {
  font-weight: 700;
  font-size: 0.75rem;
  padding: 8px 0 0;
  line-height: 16px;
  color: #1a1a1a;
}
.theme--light.v-card .v-card__subtitle {
  padding: 0;
  color: #1a1a1a;
  font-size: 10px;
  line-height: 11.72px;
}
</style>
